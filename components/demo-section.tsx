import { DocumentAnalyzerDemo } from "./document-analyzer-demo"

export function DemoSection() {
  return (
    <section id="demo" className="py-16 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h2
            className="text-2xl md:text-3xl font-bold text-foreground mb-3"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            See It In Action
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Watch how Zero Entry transforms unstructured documents into clean, structured data in seconds
          </p>
        </div>
        <div className="max-w-md mx-auto">
          <DocumentAnalyzerDemo />
        </div>
      </div>
    </section>
  )
}
