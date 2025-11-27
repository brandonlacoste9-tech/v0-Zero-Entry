export function FrameworkDiagram() {
  return (
    <div className="bg-card border border-border rounded-lg p-6 my-6 shadow-sm">
      <p className="text-sm text-muted-foreground text-center mb-4">AI-native development framework</p>
      <div className="space-y-3">
        <div className="bg-secondary rounded-lg p-4 text-center">
          <p className="font-medium text-foreground">Spec-driven development & Agent workflows</p>
        </div>
        <div className="flex justify-center">
          <div className="w-0.5 h-4 bg-border" />
        </div>
        <div className="bg-secondary/70 rounded-lg p-4">
          <p className="font-medium text-foreground text-center mb-2">Context Engineering</p>
          <div className="flex flex-wrap justify-center gap-2 text-xs text-muted-foreground">
            <span className="bg-background px-2 py-1 rounded">Roles</span>
            <span className="bg-background px-2 py-1 rounded">Rules</span>
            <span className="bg-background px-2 py-1 rounded">Context</span>
            <span className="bg-background px-2 py-1 rounded">Memory</span>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-0.5 h-4 bg-border" />
        </div>
        <div className="bg-secondary/50 rounded-lg p-4">
          <p className="font-medium text-foreground text-center mb-2">Prompt Engineering</p>
          <div className="flex flex-wrap justify-center gap-2 text-xs text-muted-foreground">
            <span className="bg-background px-2 py-1 rounded">Role activation</span>
            <span className="bg-background px-2 py-1 rounded">Context loading</span>
            <span className="bg-background px-2 py-1 rounded">Tool invocation</span>
            <span className="bg-background px-2 py-1 rounded">Validation gates</span>
          </div>
        </div>
      </div>
      <p className="text-xs text-muted-foreground text-center mt-4">
        Markdown + Agent Primitives + Context Engineering = Reliability
      </p>
    </div>
  )
}
