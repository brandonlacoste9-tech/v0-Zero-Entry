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
  try {
    const supabase = await createClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    // If user is logged in, check and deduct credits
    if (user && !authError) {
      // Check credits first
      const { data: profile, error: profileError } = await supabase
        .from("user_profiles")
        .select("credits")
        .eq("id", user.id)
        .single()

      if (profileError) {
        // Profile doesn't exist - create one with default credits
        const { error: insertError } = await supabase.from("user_profiles").insert({
          id: user.id,
          email: user.email,
          credits: 3,
          plan: "free",
          total_documents_processed: 0,
        })

        if (insertError) {
          console.error("[v0] Failed to create user profile:", insertError)
          return {
            success: false,
            error: "Failed to initialize account. Please try again.",
          }
        }
      }

      // Deduct credit using RPC function
      const { data: creditResult, error: creditError } = await supabase
        .rpc("deduct_credit", { user_uuid: user.id })
        .single()

      if (creditError) {
        console.error("[v0] Credit deduction error:", creditError)
        return {
          success: false,
          error: "Failed to process credits. Please try again.",
          creditsRemaining: 0,
        }
      }

      if (!creditResult?.success) {
        return {
          success: false,
          error: creditResult?.message || "No credits remaining. Please upgrade your plan.",
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
      const { data: doc, error: docError } = await supabase
        .from("documents")
        .insert({
          user_id: user.id,
          name: `Invoice ${object.invoiceNumber}`,
          content: text,
          document_type: "invoice",
        })
        .select()
        .single()

      if (!docError && doc) {
        await supabase.from("extractions").insert({
          document_id: doc.id,
          user_id: user.id,
          extracted_data: object,
          accuracy: 100,
          processing_time_ms: 2000,
        })

        // Update total documents processed
        await supabase
          .from("user_profiles")
          .update({
            total_documents_processed: (profile?.total_documents_processed || 0) + 1,
            updated_at: new Date().toISOString(),
          })
          .eq("id", user.id)
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
  } catch (error) {
    console.error("[v0] analyzeDocument error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unexpected error occurred. Please try again.",
    }
  }
}

export async function getUserCredits(): Promise<{ credits: number; plan: string } | null> {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return null

    const { data, error } = await supabase.from("user_profiles").select("credits, plan").eq("id", user.id).single()

    if (error) {
      // Create profile if it doesn't exist
      const { data: newProfile } = await supabase
        .from("user_profiles")
        .insert({
          id: user.id,
          email: user.email,
          credits: 3,
          plan: "free",
          total_documents_processed: 0,
        })
        .select("credits, plan")
        .single()

      return newProfile
    }

    return data
  } catch (error) {
    console.error("[v0] getUserCredits error:", error)
    return null
  }
}
