import { FileText } from "lucide-react"

export function ZeroEntryLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <FileText className="w-4 h-4 text-background" />
        </div>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full" />
      </div>
      <span className="text-xl font-bold text-foreground">
        Zero<span className="text-muted-foreground">Entry</span>
      </span>
    </div>
  )
}

export { ZeroEntryLogo as LeLoLogo, ZeroEntryLogo as LeloLogo }
