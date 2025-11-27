"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, FileText, CheckCircle, AlertCircle } from "lucide-react"
import { analyzeDocument, type ExtractedData } from "@/app/actions/analyze-document"

interface DashboardUploaderProps {
  credits: number
}

export function DashboardUploader({ credits: initialCredits }: DashboardUploaderProps) {
  const [text, setText] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<ExtractedData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [credits, setCredits] = useState(initialCredits)

  const handleAnalyze = async () => {
    if (!text.trim() || credits <= 0) return

    setIsAnalyzing(true)
    setError(null)
    setResult(null)

    try {
      const response = await analyzeDocument(text)

      if (!response.success) {
        setError(response.error || "Failed to analyze document")
        return
      }

      setResult(response.data!)
      if (response.creditsRemaining !== undefined) {
        setCredits(response.creditsRemaining)
      }
    } catch (err) {
      setError("An error occurred while analyzing the document")
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleReset = () => {
    setText("")
    setResult(null)
    setError(null)
  }

  if (result) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-emerald-500">
          <CheckCircle className="h-5 w-5" />
          <span className="font-medium">Extraction Complete</span>
          <span className="text-muted-foreground text-sm ml-auto">{credits} credits remaining</span>
        </div>

        {/* Results Table */}
        <div className="border border-border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-3 font-medium text-foreground">Item</th>
                <th className="text-center p-3 font-medium text-foreground">Hours</th>
                <th className="text-right p-3 font-medium text-foreground">Rate</th>
                <th className="text-right p-3 font-medium text-foreground">Total</th>
              </tr>
            </thead>
            <tbody>
              {result.lineItems.map((item, i) => (
                <tr key={i} className="border-t border-border">
                  <td className="p-3 text-foreground">{item.item}</td>
                  <td className="p-3 text-center">
                    {item.hours ? (
                      <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 text-xs font-medium">
                        {item.hours}
                      </span>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="p-3 text-right text-muted-foreground">{item.rate}</td>
                  <td className="p-3 text-right font-medium text-foreground">{item.total}</td>
                </tr>
              ))}
              <tr className="border-t border-border bg-emerald-500/5">
                <td colSpan={3} className="p-3 font-medium text-emerald-500">
                  Total Due
                </td>
                <td className="p-3 text-right font-bold text-emerald-500">{result.totalDue}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Metadata */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-muted/30 rounded-lg p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Invoice #</p>
            <p className="text-lg font-bold text-foreground">{result.invoiceNumber}</p>
          </div>
          <div className="bg-muted/30 rounded-lg p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Vendor</p>
            <p className="text-lg font-bold text-foreground">{result.vendor}</p>
          </div>
        </div>

        <Button onClick={handleReset} variant="outline" className="w-full bg-transparent">
          Process Another Document
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="flex items-center gap-2 text-red-500 bg-red-500/10 p-3 rounded-lg">
          <AlertCircle className="h-4 w-4" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      <Textarea
        placeholder={
          credits > 0
            ? "Paste your invoice, receipt, or any unstructured document here..."
            : "You've run out of credits. Please upgrade to continue."
        }
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="min-h-[200px] bg-muted/30 border-border resize-none"
        disabled={credits <= 0}
      />

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          <FileText className="h-4 w-4 inline mr-1" />
          {credits} credit{credits !== 1 ? "s" : ""} remaining
        </p>
        <Button
          onClick={handleAnalyze}
          disabled={!text.trim() || isAnalyzing || credits <= 0}
          className="bg-emerald-500 hover:bg-emerald-600 text-white"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Analyzing...
            </>
          ) : (
            "Analyze Document"
          )}
        </Button>
      </div>
    </div>
  )
}
