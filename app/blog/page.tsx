import { ZeroEntryLogo } from "@/components/lelo-logo"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const posts = [
  {
    slug: "introducing-zero-entry",
    title: "Introducing Zero Entry: AI Document Processing for Everyone",
    excerpt:
      "Today we're launching Zero Entry, a new way to transform unstructured documents into clean, actionable data.",
    date: "Nov 20, 2025",
    category: "Announcement",
  },
  {
    slug: "invoice-processing-guide",
    title: "The Complete Guide to Automated Invoice Processing",
    excerpt: "Learn how AI is transforming accounts payable and reducing processing costs by up to 80%.",
    date: "Nov 15, 2025",
    category: "Guide",
  },
  {
    slug: "accuracy-benchmarks",
    title: "How We Achieved 99.9% Extraction Accuracy",
    excerpt:
      "A deep dive into our multi-model approach and validation pipeline that ensures near-perfect data extraction.",
    date: "Nov 10, 2025",
    category: "Engineering",
  },
  {
    slug: "api-v1-release",
    title: "Zero Entry API v1 is Now Available",
    excerpt: "Integrate document processing directly into your applications with our new REST API and webhooks.",
    date: "Nov 5, 2025",
    category: "Product",
  },
]

export default function BlogPage() {
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Zero Entry <span className="text-emerald-500">Blog</span>
          </h1>
          <p className="text-white/70 text-lg mb-12">
            Product updates, engineering insights, and document processing best practices.
          </p>

          <div className="space-y-6">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-emerald-500/50 transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-medium bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded">
                    {post.category}
                  </span>
                  <span className="text-sm text-white/50">{post.date}</span>
                </div>
                <h2 className="text-xl font-semibold mb-2 hover:text-emerald-500 transition-colors cursor-pointer">
                  {post.title}
                </h2>
                <p className="text-white/70">{post.excerpt}</p>
              </article>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
