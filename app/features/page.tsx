import { ZeroEntryLogo } from "@/components/lelo-logo"
import { Button } from "@/components/ui/button"
import { FileText, Zap, Shield, BarChart3, Layers, RefreshCw } from "lucide-react"
import Link from "next/link"

const features = [
  {
    icon: FileText,
    title: "Universal Document Support",
    description:
      "Process invoices, receipts, bank statements, contracts, and any unstructured document format with ease.",
  },
  {
    icon: Zap,
    title: "Instant Extraction",
    description: "Get structured data in seconds, not hours. Our AI processes documents 100x faster than manual entry.",
  },
  {
    icon: Shield,
    title: "99.9% Accuracy",
    description: "Enterprise-grade AI ensures near-perfect data extraction every time, reducing costly errors.",
  },
  {
    icon: BarChart3,
    title: "Smart Analytics",
    description: "Automatically categorize expenses, detect anomalies, and generate insights from your documents.",
  },
  {
    icon: Layers,
    title: "Batch Processing",
    description: "Upload hundreds of documents at once. Our system handles bulk processing with the same precision.",
  },
  {
    icon: RefreshCw,
    title: "API Integration",
    description: "Connect Zero Entry to your existing workflows with our REST API and webhook support.",
  },
]

export default function FeaturesPage() {
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
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Powerful <span className="text-emerald-500">Features</span>
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Everything you need to eliminate manual data entry and transform documents into actionable data.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-emerald-500/50 transition-colors"
              >
                <feature.icon className="w-10 h-10 text-emerald-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-white/70">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link href="/auth/sign-up">
              <Button className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3">Start Free Trial</Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
