import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LeloLogo } from "@/components/lelo-logo"
import Link from "next/link"
import { FileText, Coins, BarChart3, Sparkles } from "lucide-react"
import { SignOutButton } from "@/components/sign-out-button"
import { DashboardUploader } from "@/components/dashboard-uploader"

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase
    .from("user_profiles")
    .select("credits, plan, total_documents_processed")
    .eq("id", data.user.id)
    .single()

  const credits = profile?.credits ?? 0
  const plan = profile?.plan ?? "free"
  const totalProcessed = profile?.total_documents_processed ?? 0

  // Plan limits for display
  const planLimits: Record<string, number> = { free: 3, pro: 500, business: 2000 }
  const maxCredits = planLimits[plan] || 3

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <LeloLogo />
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-500 capitalize">
              {plan} Plan
            </span>
            <span className="text-sm text-muted-foreground">{data.user.email}</span>
            <SignOutButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Upload documents and extract structured data instantly</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <Card className="border-border/50 bg-card/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Credits Remaining</CardTitle>
              <Coins className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{credits}</div>
              <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 transition-all"
                  style={{ width: `${(credits / maxCredits) * 100}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {credits} of {maxCredits} credits
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Documents Processed</CardTitle>
              <FileText className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{totalProcessed}</div>
              <p className="text-xs text-muted-foreground">Total all time</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Accuracy Rate</CardTitle>
              <BarChart3 className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-500">100%</div>
              <p className="text-xs text-muted-foreground">AI-powered extraction</p>
            </CardContent>
          </Card>
        </div>

        {credits <= 1 && credits > 0 && (
          <Card className="border-amber-500/50 bg-amber-500/10 mb-8">
            <CardContent className="flex items-center justify-between py-4">
              <div className="flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-amber-500" />
                <p className="text-sm text-amber-200">You're running low on credits!</p>
              </div>
              <Link href="/#pricing" className="text-sm font-medium text-emerald-500 hover:underline">
                Upgrade Plan →
              </Link>
            </CardContent>
          </Card>
        )}

        {credits === 0 && (
          <Card className="border-red-500/50 bg-red-500/10 mb-8">
            <CardContent className="flex items-center justify-between py-4">
              <div className="flex items-center gap-3">
                <Coins className="h-5 w-5 text-red-500" />
                <p className="text-sm text-red-200">
                  You've used all your credits. Upgrade to continue processing documents.
                </p>
              </div>
              <Link href="/#pricing" className="text-sm font-medium text-emerald-500 hover:underline">
                Upgrade Plan →
              </Link>
            </CardContent>
          </Card>
        )}

        {/* Upload Section */}
        <Card className="border-border/50 bg-card/50">
          <CardHeader>
            <CardTitle className="text-foreground">Process a Document</CardTitle>
            <CardDescription>
              Paste unstructured text to extract clean, structured data (1 credit per document)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DashboardUploader credits={credits} />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
