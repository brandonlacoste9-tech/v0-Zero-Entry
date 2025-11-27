import { ZeroEntryLogo } from "@/components/lelo-logo"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
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
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">
            About <span className="text-emerald-500">Zero Entry</span>
          </h1>

          <div className="prose prose-invert prose-lg max-w-none space-y-6 text-white/80">
            <p>
              Zero Entry was founded in 2024 with a simple mission: eliminate the tedious, error-prone process of manual
              data entry from documents.
            </p>

            <p>
              We watched finance teams spend countless hours copying numbers from invoices into spreadsheets. We saw the
              frustration of reconciling bank statements manually. We knew there had to be a better way.
            </p>

            <p>
              Our AI-powered platform transforms any unstructured document—invoices, receipts, contracts,
              statements—into clean, structured data in seconds. No templates. No training. Just drag, drop, and done.
            </p>

            <h2 className="text-2xl font-bold text-white mt-12 mb-4">Our Values</h2>

            <div className="grid gap-4">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="font-semibold text-white mb-2">Accuracy First</h3>
                <p className="text-white/70">
                  We obsess over precision. Every extraction is validated to ensure your data is correct.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="font-semibold text-white mb-2">Privacy by Design</h3>
                <p className="text-white/70">
                  Your documents contain sensitive information. We process them securely and never retain data longer
                  than necessary.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="font-semibold text-white mb-2">Developer-Friendly</h3>
                <p className="text-white/70">
                  We build tools that integrate seamlessly into your existing workflows via API.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
