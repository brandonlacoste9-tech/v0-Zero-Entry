import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArticleHeader } from "@/components/guide/article-header"
import { ArticleContent } from "@/components/guide/article-content"
import { TableOfContents } from "@/components/guide/table-of-contents"

export const metadata: Metadata = {
  title: "How to Build Reliable AI Workflows with Agentic Primitives | Zero Entry",
  description:
    "See how this three-part framework will turn AI into a repeatable and reliable engineering practice using agentic primitives and context engineering.",
}

export default function AgenticWorkflowsGuidePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <ArticleHeader />
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
            <aside className="hidden lg:block lg:w-64 shrink-0">
              <TableOfContents />
            </aside>
            <article className="flex-1 max-w-3xl">
              <ArticleContent />
            </article>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
