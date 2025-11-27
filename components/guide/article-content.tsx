import { CodeBlock } from "./code-block"
import { InfoCard } from "./info-card"
import { FrameworkDiagram } from "./framework-diagram"

export function ArticleContent() {
  return (
    <div className="prose prose-invert max-w-none">
      <section id="introduction" className="mb-12">
        <p className="text-lg text-muted-foreground leading-relaxed">
          Many developers begin their AI explorations with a prompt. Perhaps you started the same way: You opened an AI
          assistant, started asking questions in natural language, and hoped for a usable output. This approach can work
          for simple fixes and code suggestions, but as your needs get more complex—or as your work gets more
          collaborative—you&apos;re going to need a more foolproof strategy.
        </p>
        <p className="text-muted-foreground leading-relaxed mt-4">
          This guide will introduce you to a <strong className="text-foreground">three-part framework</strong> that
          transforms this ad-hoc style of AI experimentation into a repeatable and reliable engineering practice. At its
          core are two concepts:
        </p>
        <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
          <li>
            <strong className="text-foreground">Agentic primitives</strong> — reusable, configurable building blocks
            that enable AI agents to work systematically
          </li>
          <li>
            <strong className="text-foreground">Context engineering</strong> — ensures your AI agents always focus on
            the right information
          </li>
        </ul>
      </section>

      <section id="what-are-agent-primitives" className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">What are agent primitives?</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          The three-layer framework below turns ad-hoc AI experimentation into a reliable, repeatable process. It does
          this by combining the structure of Markdown; the power of agent primitives, simple building blocks that give
          your AI agents clear instructions and capabilities; and smart context management, so your agents always get
          the right information (not just more information).
        </p>
        <FrameworkDiagram />
      </section>

      <section id="layer-1-markdown" className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Layer 1: Use Markdown for strategic prompt engineering
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          The clearer, more precise, more context-rich your prompt, the better and more accurate your outcome. With
          Markdown&apos;s structure (headers, lists, and links), you can naturally guide AI&apos;s reasoning, making
          outputs more predictable and consistent.
        </p>

        <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">Key techniques:</h3>
        <ul className="space-y-3 text-muted-foreground">
          <li className="flex gap-3">
            <span className="text-foreground font-mono text-sm bg-secondary px-2 py-0.5 rounded shrink-0">
              Context loading
            </span>
            <span>
              Review existing patterns. Links become context injection points that pull in relevant information.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-foreground font-mono text-sm bg-secondary px-2 py-0.5 rounded shrink-0">
              Structured thinking
            </span>
            <span>Use headers and bullets to create clear reasoning pathways for the AI to follow.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-foreground font-mono text-sm bg-secondary px-2 py-0.5 rounded shrink-0">
              Role activation
            </span>
            <span>
              Use phrases like &quot;You are an expert [in this role].&quot; This triggers specialized knowledge
              domains.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-foreground font-mono text-sm bg-secondary px-2 py-0.5 rounded shrink-0">
              Validation gates
            </span>
            <span>&quot;Stop and get user approval.&quot; Ensure human oversight at critical decision points.</span>
          </li>
        </ul>

        <p className="text-muted-foreground mt-6 mb-3">
          Instead of saying &quot;Find and fix the bug&quot;, use structured prompts:
        </p>
        <CodeBlock
          language="markdown"
          filename="debug-prompt.md"
          code={`You are an expert debugger, specialized in debugging complex programming issues.

You are particularly great at debugging this project, which architecture and quirks can be consulted in the architecture document.

Follow these steps:

1. Review the error logs and identify the root cause.
2. Use the azmcp-monitor-log-query MCP tool to retrieve infrastructure logs.
3. Once you find the root cause, think about 3 potential solutions with trade-offs.
4. Present your root cause analysis and suggested solutions to the user and seek validation before proceeding - do not change any files.`}
        />
      </section>

      <section id="layer-2-primitives" className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">Layer 2: Agentic primitives</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Now it&apos;s time to implement your strategies systematically, instead of prompting ad hoc. These
          configurable tools help you scale your prompt engineering techniques.
        </p>

        <h3 className="text-lg font-semibold text-foreground mb-4">Core agent primitives</h3>
        <div className="grid gap-4">
          <InfoCard
            title="Instructions files"
            description="Deploy structured guidance through modular .instructions.md files with targeted scope."
            badge=".instructions.md"
          />
          <InfoCard
            title="Chat modes"
            description="Deploy role-based expertise through .chatmode.md files with MCP tool boundaries that prevent security breaches and cross-domain interference."
            badge=".chatmode.md"
          />
          <InfoCard
            title="Agentic workflows"
            description="Deploy reusable prompts through .prompt.md files with built-in validation."
            badge=".prompt.md"
          />
          <InfoCard
            title="Specification files"
            description="Create implementation-ready blueprints through .spec.md files that ensure repeatable results."
            badge=".spec.md"
          />
          <InfoCard
            title="Agent memory files"
            description="Preserve knowledge across sessions through .memory.md files."
            badge=".memory.md"
          />
          <InfoCard
            title="Context helper files"
            description="Optimize information retrieval through .context.md files."
            badge=".context.md"
          />
        </div>

        <h3 className="text-lg font-semibold text-foreground mt-8 mb-4">Transformation example</h3>
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-sm text-muted-foreground mb-4">
            <strong className="text-foreground">Basic prompt:</strong> &quot;Implement secure user authentication
            system&quot;
          </p>
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">With primitives:</strong> Select backend-dev chat mode → Auto-triggers
            security.instructions.md → Loads context from previous auth patterns → Generates user-auth.spec.md →
            Executes implement-from-spec.prompt.md with validation gates.
          </p>
        </div>
      </section>

      <section id="layer-3-context" className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">Layer 3: Context engineering</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Just like people, LLMs have limited memory (context windows) and can sometimes be forgetful. If you can be
          strategic about the context you give them, you can help them focus on what&apos;s relevant and enable them to
          work quicker.
        </p>

        <h3 className="text-lg font-semibold text-foreground mb-4">Context engineering techniques:</h3>
        <ul className="space-y-4 text-muted-foreground">
          <li>
            <strong className="text-foreground">Session splitting</strong> — Use distinct agent sessions for different
            development phases. One session for planning, one for implementation, one for testing.
          </li>
          <li>
            <strong className="text-foreground">Modular rules and instructions</strong> — Apply only relevant
            instructions through targeted .instructions.md files using applyTo YAML frontmatter syntax.
          </li>
          <li>
            <strong className="text-foreground">Memory-driven development</strong> — Leverage agent memory through
            .memory.md files to maintain project knowledge across sessions.
          </li>
          <li>
            <strong className="text-foreground">Cognitive focus optimization</strong> — Use chat modes in .chatmode.md
            files to keep AI attention on relevant domains.
          </li>
        </ul>
      </section>

      <section id="agentic-workflows" className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">Agentic workflows: The complete system</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Now that you understand all three layers, you can see how they combine into agentic workflows—complete,
          systematic processes where all of your agentic primitives work together, understanding your prompts, and using
          only the context they need.
        </p>

        <div className="bg-card border border-border rounded-lg p-6 mb-6">
          <h4 className="font-semibold text-foreground mb-3">Quick recap:</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <strong className="text-foreground">Markdown prompt engineering</strong> provides the structural
              foundation for predictable AI interactions.
            </li>
            <li>
              <strong className="text-foreground">Agent primitives</strong> are your configurable tools that scale and
              systematize these techniques.
            </li>
            <li>
              <strong className="text-foreground">Context engineering</strong> optimizes AI cognitive performance within
              memory constraints.
            </li>
            <li>
              <strong className="text-foreground">Agentic workflows</strong> apply prompt and context engineering that
              leverages agent primitives to implement complete, reliable processes.
            </li>
          </ul>
        </div>
      </section>

      <section id="tooling" className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">Tooling: How to scale agent primitives</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Just like JavaScript evolved from browser scripts to using Node.js runtimes, package managers, and deployment
          tooling, agent primitives need similar infrastructure to reach their full potential.
        </p>

        <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">Inner loop vs. outer loop</h3>
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="font-mono text-sm text-foreground mb-2">Inner loop (IDE)</p>
            <p className="text-sm text-muted-foreground">Interactive development, testing, and workflow refinement</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="font-mono text-sm text-foreground mb-2">Outer loop (CLI)</p>
            <p className="text-sm text-muted-foreground">
              Reproducible execution, CI/CD integration, and production deployment
            </p>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">Runtime management example</h3>
        <CodeBlock
          language="bash"
          filename="terminal"
          code={`# Install APM once
curl -sSL https://example.com/apm/install.sh | sh

# Setup runtime
apm runtime setup copilot

# Install MCP dependencies
apm install

# Compile Agent Primitive files
apm compile

# Run workflows against your chosen runtime
apm run security-review.prompt.md`}
        />
      </section>

      <section id="next-steps" className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">Next steps</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          This framework creates compound intelligence that improves as you continue to iterate. Start by implementing
          structured prompts, then gradually introduce agent primitives as your workflows become more complex.
        </p>
        <div className="bg-secondary/50 border border-border rounded-lg p-6">
          <p className="text-foreground font-medium mb-2">Key takeaway</p>
          <p className="text-muted-foreground">
            By familiarizing yourself with agentic primitives and context engineering, you&apos;ll be able to build AI
            systems that can not only code independently, but do so reliably, predictably, and consistently.
          </p>
        </div>
      </section>
    </div>
  )
}
