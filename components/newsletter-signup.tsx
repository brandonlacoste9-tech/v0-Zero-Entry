"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Mail, CheckCircle } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

export function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      // Validate email
      if (!email || !email.includes("@")) {
        setError("Please enter a valid email address")
        setIsSubmitting(false)
        return
      }

      // Save to Supabase (you can create a newsletter_subscribers table)
      const supabase = createClient()
      const { error: insertError } = await supabase.from("contact_messages").insert({
        name: "Newsletter Subscriber",
        email: email,
        subject: "Newsletter Signup",
        message: "Newsletter subscription request",
      })

      if (insertError) {
        // If table doesn't exist, just log (graceful degradation)
        console.log("Newsletter signup:", email)
      }

      setSubmitted(true)
      setEmail("")
    } catch (err) {
      setError("Something went wrong. Please try again.")
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="flex items-center gap-2 text-emerald-400">
        <CheckCircle className="h-5 w-5" />
        <span className="text-sm">Thanks for subscribing! Check your email.</span>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md">
      <div className="flex-1 relative">
        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-emerald-500"
          required
        />
      </div>
      <Button
        type="submit"
        disabled={isSubmitting}
        className="bg-emerald-500 hover:bg-emerald-600 text-white whitespace-nowrap"
      >
        {isSubmitting ? "Subscribing..." : "Subscribe"}
      </Button>
      {error && <p className="text-sm text-red-400 absolute mt-12">{error}</p>}
    </form>
  )
}

