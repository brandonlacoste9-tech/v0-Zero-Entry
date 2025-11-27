"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

const sections = [
  { id: "introduction", title: "Introduction" },
  { id: "what-are-agent-primitives", title: "What are agent primitives?" },
  { id: "layer-1-markdown", title: "Layer 1: Markdown prompt engineering" },
  { id: "layer-2-primitives", title: "Layer 2: Agentic primitives" },
  { id: "layer-3-context", title: "Layer 3: Context engineering" },
  { id: "agentic-workflows", title: "Agentic workflows" },
  { id: "tooling", title: "Tooling: How to scale" },
  { id: "next-steps", title: "Next steps" },
]

export function TableOfContents() {
  const [activeSection, setActiveSection] = useState("introduction")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: "-100px 0px -80% 0px" },
    )

    sections.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <nav className="sticky top-28">
      <p className="text-sm font-medium text-foreground mb-4">On this page</p>
      <ul className="space-y-2">
        {sections.map(({ id, title }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={cn(
                "block text-sm py-1 border-l-2 pl-3 transition-colors",
                activeSection === id
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground",
              )}
            >
              {title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
