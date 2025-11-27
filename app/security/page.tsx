import { ZeroEntryLogo } from "@/components/lelo-logo"
import { Button } from "@/components/ui/button"
import { Shield, Lock, Server, Eye, FileCheck, Globe } from "lucide-react"
import Link from "next/link"

const securityFeatures = [
  {
    icon: Lock,
    title: "End-to-End Encryption",
    description:
      "All documents are encrypted in transit (TLS 1.3) and at rest (AES-256). Your data never leaves our secure infrastructure unprotected.",
  },
  {
    icon: Server,
    title: "SOC 2 Type II Compliant",
    description: "We maintain rigorous security controls audited annually by independent third parties.",
  },
  {
    icon: Eye,
    title: "Zero Data Retention",
    description:
      "Documents are processed in memory and immediately deleted. We never store your source files longer than necessary.",
  },
  {
    icon: FileCheck,
    title: "GDPR & CCPA Ready",
    description: "Full compliance with global privacy regulations. Export or delete your data anytime.",
  },
  {
    icon: Shield,
    title: "Role-Based Access",
    description: "Granular permissions let you control who can view, edit, or process documents in your organization.",
  },
  {
    icon: Globe,
    title: "Regional Data Centers",
    description: "Choose where your data is processed: US, EU, or Asia-Pacific regions available.",
  },
]

export default function SecurityPage() {
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
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2 mb-6">
              <Shield className="w-4 h-4 text-emerald-500" />
              <span className="text-emerald-500 text-sm font-medium">Enterprise-Grade Security</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Your Data, <span className="text-emerald-500">Protected</span>
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              We take security seriously. Zero Entry is built from the ground up to protect your sensitive financial
              documents.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {securityFeatures.map((feature) => (
              <div key={feature.title} className="bg-white/5 border border-white/10 rounded-xl p-6">
                <feature.icon className="w-10 h-10 text-emerald-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-white/70">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-gradient-to-r from-emerald-500/10 to-transparent border border-emerald-500/20 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-2">Need a Security Assessment?</h2>
            <p className="text-white/70 mb-6">
              Our team is happy to provide detailed security documentation for your compliance needs.
            </p>
            <Link href="/contact">
              <Button className="bg-emerald-500 hover:bg-emerald-600">Contact Security Team</Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
