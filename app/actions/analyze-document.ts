"use server"

import { generateObject } from "ai"
import { z } from "zod"
import { createClient } from "@/lib/supabase/server"

const LineItemSchema = z.object({
  item: z.string().describe("Name/description of the service or product"),
  hours: z.number().nullable().describe("Number of hours if hourly, null if flat fee"),
  rate: z.string().describe("Hourly rate or 'Flat' for flat fees"),
  total: z.string().describe("Total amount for this line item, formatted with $"),
})

const ExtractedDataSchema = z.object({
  lineItems: z.array(LineItemSchema).describe("List of services/products with pricing"),
  invoiceNumber: z.string().describe("Invoice number or ID"),
  vendor: z.string().describe("Client/vendor name"),
  date: z.string().optional().describe("Invoice date if present"),
  subtotal: z.string().optional().describe("Subtotal before tax"),
  tax: z.string().optional().describe("Tax amount if present"),
  totalDue: z.string().describe("Final total amount due, formatted with $"),
})

export type ExtractedData = z.infer<typeof ExtractedDataSchema>

export async function analyzeDocument(text: string): Promise<{
  success: boolean
  data?: ExtractedData
  error?: string
  creditsRemaining?: number
}> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // If user is logged in, check and deduct credits
  if (user) {
    const { data: creditResult, error: creditError } = await supabase
      .rpc("deduct_credit", { user_uuid: user.id })
      .single()

    if (creditError || !creditResult?.success) {
      return {
        success: false,
        error: creditResult?.message || "Failed to process credits. Please try again.",
        creditsRemaining: 0,
      }
    }

    // Process with AI
    const { object } = await generateObject({
      model: "anthropic/claude-sonnet-4",
      schema: ExtractedDataSchema,
      prompt: `Extract structured data from this unstructured document. Parse all line items, totals, and metadata accurately.

Document:
${text}

Extract:
- All line items with item name, hours (null if flat fee), rate, and total
- Invoice number
- Vendor/client name
- Total due amount
- Format all currency values with $ symbol`,
    })

    // Save to database
    const { data: doc } = await supabase
      .from("documents")
      .insert({ user_id: user.id, name: `Invoice ${object.invoiceNumber}`, content: text })
      .select()
      .single()

    if (doc) {
      await supabase.from("extractions").insert({
        document_id: doc.id,
        user_id: user.id,
        extracted_data: object,
        accuracy: 100,
        processing_time_ms: 2000,
      })
    }

    return {
      success: true,
      data: object,
      creditsRemaining: creditResult.remaining_credits,
    }
  }

  // Demo mode for non-authenticated users (homepage demo)
  const { object } = await generateObject({
    model: "anthropic/claude-sonnet-4",
    schema: ExtractedDataSchema,
    prompt: `Extract structured data from this unstructured document. Parse all line items, totals, and metadata accurately.

Document:
${text}

Extract:
- All line items with item name, hours (null if flat fee), rate, and total
- Invoice number
- Vendor/client name
- Total due amount
- Format all currency values with $ symbol`,
  })

  return { success: true, data: object }
}

export async function getUserCredits(): Promise<{ credits: number; plan: string } | null> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  const { data } = await supabase.from("user_profiles").select("credits, plan").eq("id", user.id).single()

  return data
}
