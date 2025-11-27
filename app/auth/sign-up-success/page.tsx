import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { LeloLogo } from "@/components/lelo-logo"
import { Mail } from "lucide-react"

export default function SignUpSuccessPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-background p-6">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <div className="flex justify-center">
            <Link href="/">
              <LeloLogo />
            </Link>
          </div>
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10">
                <Mail className="h-6 w-6 text-emerald-500" />
              </div>
              <CardTitle className="text-2xl text-foreground">Check your email</CardTitle>
              <CardDescription>We&apos;ve sent you a confirmation link</CardDescription>
            </CardHeader>
            <CardContent className="text-center text-sm text-muted-foreground">
              <p>Click the link in your email to confirm your account and start using ZeroEntry.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
