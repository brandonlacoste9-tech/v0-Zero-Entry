"use client"

import { useState } from "react"
import { FileText, Grid3X3, Loader2 } from "lucide-react"
import { Button } from "./ui/button"
import { analyzeDocument, type ExtractedData } from "@/app/actions/analyze-document"

const sampleInvoice = `INVOICE #99283
Date: Nov 24, 2025
To: Acme Corp

Services Rendered:
1. Web Development - 40hrs @ $150/hr = $6,000
   - Frontend implementation
   - React components
2. UI/UX Design - 12hrs @ $125/hr = $1,500
   - Dashboard sketches
   - User flow diagrams
3. Server Maintenance - Flat fee = $500

Subtotal: $8,000
Tax (8%): $640
Total Due: $8,640`

export function DocumentAnalyzerDemo() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleAnalyze = async () => {
    setIsAnalyzing(true)
    setExtractedData(null)
    setError(null)

    try {
      const result = await analyzeDocument(sampleInvoice)
      setExtractedData(result)
    } catch (err) {
      setError("Failed to analyze document. Please try again.")
      console.error(err)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleReset = () => {
    setExtractedData(null)
    setError(null)
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Window frame */}
      <div className="rounded-lg overflow-hidden shadow-2xl border border-gray-700">
        {/* Title bar */}
        <div className="bg-slate-800 px-2.5 py-1.5 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <div className="w-2 h-2 rounded-full bg-yellow-500" />
            <div className="w-2 h-2 rounded-full bg-green-500" />
          </div>
          <span className="text-gray-400 text-[10px] font-mono">ZeroEntry_Agent_v4.2.exe</span>
          <div className="w-10" />
        </div>

        {/* Content area */}
        <div className="bg-slate-900 p-3">
          <div className="grid md:grid-cols-2 gap-3">
            {/* Left panel - Unstructured Input */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <h3 className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
                  Unstructured Input
                </h3>
                <FileText className="h-3 w-3 text-slate-500" />
              </div>
              <div className="bg-white rounded p-2 h-40 overflow-auto">
                <pre className="text-[10px] text-slate-700 font-mono whitespace-pre-wrap leading-relaxed">
                  {sampleInvoice}
                </pre>
              </div>
            </div>

            {/* Right panel - Structured Data */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <h3 className="text-[10px] font-semibold tracking-wider text-emerald-400 uppercase">Structured Data</h3>
                <Grid3X3 className="h-3 w-3 text-emerald-500" />
              </div>
              <div className="bg-white rounded p-2 h-40 overflow-auto">
                {!isAnalyzing && !extractedData && !error && (
                  <div className="h-full flex flex-col items-center justify-center text-slate-400">
                    <div className="w-8 h-8 rounded-full border-2 border-slate-200 mb-2" />
                    <span className="text-[10px]">Waiting for analysis...</span>
                  </div>
                )}

                {isAnalyzing && (
                  <div className="h-full flex flex-col items-center justify-center text-slate-400">
                    <Loader2 className="w-8 h-8 animate-spin text-emerald-500 mb-2" />
                    <span className="text-[10px]">AI extracting data...</span>
                  </div>
                )}

                {error && (
                  <div className="h-full flex flex-col items-center justify-center text-red-400">
                    <span className="text-[10px]">{error}</span>
                  </div>
                )}

                {extractedData && (
                  <div className="animate-in fade-in duration-500">
                    {/* Data table */}
                    <table className="w-full text-[10px]">
                      <thead>
                        <tr className="border-b border-slate-200">
                          <th className="text-left py-1 font-medium text-slate-600">Item</th>
                          <th className="text-center py-1 font-medium text-slate-600">Hrs</th>
                          <th className="text-right py-1 font-medium text-slate-600">Rate</th>
                          <th className="text-right py-1 font-medium text-slate-600">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {extractedData.lineItems.map((row, i) => (
                          <tr key={i} className="border-b border-slate-100">
                            <td className="py-1 text-slate-700">{row.item}</td>
                            <td className="py-1 text-center">
                              {row.hours ? (
                                <span className="inline-flex items-center justify-center w-5 h-4 bg-emerald-50 text-emerald-600 rounded text-[9px] font-medium">
                                  {row.hours}
                                </span>
                              ) : (
                                <span className="text-slate-400">-</span>
                              )}
                            </td>
                            <td className="py-1 text-right text-slate-600">{row.rate}</td>
                            <td className="py-1 text-right text-slate-700 font-medium">{row.total}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {/* Total row */}
                    <div className="flex justify-between items-center mt-1.5 pt-1.5 border-t border-slate-200 bg-emerald-50 -mx-2 px-2 py-1">
                      <span className="font-semibold text-emerald-600 text-[10px]">Total Due</span>
                      <span className="font-bold text-emerald-600 text-xs">{extractedData.totalDue}</span>
                    </div>

                    {/* Extracted metadata */}
                    <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-200">
                      <div>
                        <span className="text-[9px] text-slate-400 uppercase tracking-wide">Invoice #</span>
                        <p className="font-semibold text-slate-700 text-xs">{extractedData.invoiceNumber}</p>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-400 uppercase tracking-wide">Vendor</span>
                        <p className="font-semibold text-slate-700 text-xs">{extractedData.vendor}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Analyze button */}
          <div className="flex justify-center mt-3">
            <Button
              onClick={extractedData ? handleReset : handleAnalyze}
              disabled={isAnalyzing}
              className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-full text-xs font-medium"
            >
              {isAnalyzing ? (
                <Loader2 className="mr-1.5 h-3 w-3 animate-spin" />
              ) : (
                <div className="mr-1.5 w-3 h-3 rounded-full border-2 border-current" />
              )}
              {extractedData ? "Reset Demo" : "Analyze Document"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
