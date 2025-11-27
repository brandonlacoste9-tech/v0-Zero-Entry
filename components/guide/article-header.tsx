import { Calendar, Clock, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ArticleHeader() {
  return (
    <header className="border-b border-border pb-8 mb-8">
      <div className="container mx-auto px-4 max-w-3xl lg:max-w-7xl">
        <div className="lg:pl-72">
          <p className="text-sm font-mono text-muted-foreground mb-4">AI Engineering Guide</p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight text-balance mb-6">
            How to build reliable AI workflows with agentic primitives and context engineering
          </h1>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl">
            See how this three-part framework will turn AI into a repeatable and reliable engineering practice.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-foreground font-medium">
                DM
              </div>
              <span>Daniel Meppiel</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>October 13, 2025</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>16 min read</span>
            </div>
            <Button variant="ghost" size="sm" className="ml-auto">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
