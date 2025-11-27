import { ZeroEntryLogo } from "@/components/lelo-logo"
import { Button } from "@/components/ui/button"
import { MapPin, Clock } from "lucide-react"
import Link from "next/link"

const jobs = [
  {
    title: "Senior ML Engineer",
    department: "Engineering",
    location: "Remote (US)",
    type: "Full-time",
    description: "Build and improve our document understanding models.",
  },
  {
    title: "Full Stack Developer",
    department: "Engineering",
    location: "San Francisco, CA",
    type: "Full-time",
    description: "Work on our Next.js dashboard and Node.js API services.",
  },
  {
    title: "Product Designer",
    department: "Design",
    location: "Remote (US/EU)",
    type: "Full-time",
    description: "Design intuitive experiences for complex document workflows.",
  },
  {
    title: "Customer Success Manager",
    department: "Operations",
    location: "New York, NY",
    type: "Full-time",
    description: "Help enterprise customers get the most from Zero Entry.",
  },
]

export default function CareersPage() {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Join <span className="text-emerald-500">Zero Entry</span>
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Help us eliminate manual data entry for millions of businesses worldwide.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-8 mb-12">
            <h2 className="text-xl font-semibold mb-4">Why Work With Us?</h2>
            <ul className="grid md:grid-cols-2 gap-3 text-white/70">
              <li>• Competitive salary + equity</li>
              <li>• Remote-first culture</li>
              <li>• Unlimited PTO</li>
              <li>• Health, dental, vision</li>
              <li>• $2,000 home office budget</li>
              <li>• Annual team retreats</li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold mb-6">Open Positions</h2>
          <div className="space-y-4">
            {jobs.map((job) => (
              <div
                key={job.title}
                className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-emerald-500/50 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <span className="text-xs font-medium text-emerald-500 mb-1 block">{job.department}</span>
                    <h3 className="text-xl font-semibold mb-1">{job.title}</h3>
                    <p className="text-white/70 text-sm mb-2">{job.description}</p>
                    <div className="flex items-center gap-4 text-sm text-white/50">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" /> {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" /> {job.type}
                      </span>
                    </div>
                  </div>
                  <Button className="bg-emerald-500 hover:bg-emerald-600 shrink-0">Apply Now</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
