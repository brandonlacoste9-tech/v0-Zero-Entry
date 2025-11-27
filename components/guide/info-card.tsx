interface InfoCardProps {
  title: string
  description: string
  badge?: string
}

export function InfoCard({ title, description, badge }: InfoCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:border-muted-foreground/50 transition-colors shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h4 className="font-medium text-foreground mb-1">{title}</h4>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        {badge && (
          <span className="shrink-0 text-xs font-mono bg-secondary text-foreground px-2 py-1 rounded">{badge}</span>
        )}
      </div>
    </div>
  )
}
