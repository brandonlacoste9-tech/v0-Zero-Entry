import { ZeroEntryLogo } from "@/components/lelo-logo"
import { Button } from "@/components/ui/button"
import { Code, Copy } from "lucide-react"
import Link from "next/link"

export default function APIPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-white/10 py-4 px-4">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/">
            <ZeroEntryLogo />
          </Link>
          <Link href="/auth/login">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
              Sign In
            </Button>
          </Link>
        </div>
      </header>

      <main className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2 mb-6">
              <Code className="w-4 h-4 text-emerald-500" />
              <span className="text-emerald-500 text-sm font-medium">Developer API</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Build with <span className="text-emerald-500">Zero Entry</span>
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Integrate document processing directly into your applications with our REST API.
            </p>
          </div>

          <div className="space-y-8">
            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
              <div className="bg-white/5 px-4 py-3 border-b border-white/10 flex items-center justify-between">
                <span className="text-sm font-mono text-white/70">Extract data from a document</span>
                <Button variant="ghost" size="sm" className="text-white/50 hover:text-white">
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <pre className="p-4 text-sm overflow-x-auto">
                <code className="text-emerald-400">{`curl -X POST https://api.zeroentry.ai/v1/extract \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "document": "INVOICE #99283\\nDate: Nov 24, 2025\\nTo: Acme Corp...",
    "type": "invoice"
  }'`}</code>
              </pre>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
              <div className="bg-white/5 px-4 py-3 border-b border-white/10">
                <span className="text-sm font-mono text-white/70">Response</span>
              </div>
              <pre className="p-4 text-sm overflow-x-auto">
                <code className="text-white/80">{`{
  "success": true,
  "data": {
    "invoice_number": "99283",
    "date": "2025-11-24",
    "vendor": "Acme Corp",
    "line_items": [
      { "item": "Web Development", "hours": 40, "rate": 150, "total": 6000 },
      { "item": "UI/UX Design", "hours": 12, "rate": 125, "total": 1500 }
    ],
    "subtotal": 8000,
    "tax": 640,
    "total": 8640
  }
}`}</code>
              </pre>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h3 className="font-semibold mb-1">Rate Limits</h3>
                <p className="text-white/70 text-sm">1,000 requests/min on Pro, unlimited on Business</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h3 className="font-semibold mb-1">Webhooks</h3>
                <p className="text-white/70 text-sm">Real-time notifications for async processing</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h3 className="font-semibold mb-1">SDKs</h3>
                <p className="text-white/70 text-sm">Official libraries for Python, Node.js, and Go</p>
              </div>
            </div>

            <div className="text-center pt-8">
              <Link href="/auth/sign-up">
                <Button className="bg-emerald-500 hover:bg-emerald-600 px-8">Get API Key</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
