"use client"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"

export function SignOutButton() {
  const router = useRouter()

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()

    document.cookie = "sb-access-token=; path=/; max-age=0"
    document.cookie = "sb-refresh-token=; path=/; max-age=0"

    router.push("/")
    router.refresh()
  }

  return (
    <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-muted-foreground hover:text-foreground">
      <LogOut className="h-4 w-4 mr-2" />
      Sign out
    </Button>
  )
}
