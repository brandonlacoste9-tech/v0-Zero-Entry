"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ZeroEntryLogo } from "./lelo-logo"
import { Button } from "./ui/button"
import { Menu, X } from "lucide-react"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      setIsScrolled(currentScrollY > 50)

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault()
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" })
        setIsMobileMenuOpen(false)
      }
    } else {
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <>
      <header
        className={`
          fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ease-in-out
          ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}
        `}
      >
        <div
          className={`
            flex items-center justify-between gap-6 px-4 md:px-6 py-3 rounded-2xl border transition-all duration-300
            ${
              isScrolled
                ? "bg-background/90 backdrop-blur-xl border-border/40 shadow-2xl"
                : "bg-background/95 backdrop-blur-lg border-border/30 shadow-lg"
            }
          `}
        >
          <Link href="/" className="transform transition-transform duration-200 hover:scale-105">
            <ZeroEntryLogo />
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/features"
              className="relative text-foreground/80 hover:text-foreground transition-all duration-300 group px-3 py-1 rounded-lg hover:bg-foreground/5 transform hover:scale-110 hover:rotate-1 hover:skew-x-1"
            >
              Product
              <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-4"></span>
            </Link>
            <Link
              href="/api-docs"
              className="relative text-foreground/80 hover:text-foreground transition-all duration-300 group px-3 py-1 rounded-lg hover:bg-foreground/5 transform hover:scale-110 hover:-rotate-1 hover:-skew-x-1"
            >
              How it Works
              <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-4"></span>
            </Link>
            <Link
              href="#pricing"
              onClick={(e) => handleAnchorClick(e, "#pricing")}
              className="relative text-foreground/80 hover:text-foreground transition-all duration-300 group px-3 py-1 rounded-lg hover:bg-foreground/5 transform hover:scale-110 hover:rotate-1 hover:skew-x-1"
            >
              Pricing
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                className="text-foreground/80 hover:text-foreground hover:bg-foreground/10 transition-all duration-200 rounded-xl"
                asChild
              >
                <Link href="/auth/login">Sign In</Link>
              </Button>
              <Button
                size="sm"
                className="bg-emerald-500 hover:bg-emerald-600 text-white transform transition-all duration-200 hover:scale-105 hover:shadow-lg rounded-xl"
                asChild
              >
                <Link href="/auth/sign-up">Get Started</Link>
              </Button>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-foreground/80 hover:text-foreground hover:bg-foreground/10 transition-all duration-200 rounded-xl"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-20 z-40 md:hidden">
          <div className="bg-background/95 backdrop-blur-xl border-b border-border/40 shadow-2xl">
            <nav className="flex flex-col p-4 space-y-4">
              <Link
                href="/features"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-foreground/80 hover:text-foreground transition-all duration-300 px-3 py-2 rounded-lg hover:bg-foreground/5"
              >
                Product
              </Link>
              <Link
                href="/api-docs"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-foreground/80 hover:text-foreground transition-all duration-300 px-3 py-2 rounded-lg hover:bg-foreground/5"
              >
                How it Works
              </Link>
              <Link
                href="#pricing"
                onClick={(e) => handleAnchorClick(e, "#pricing")}
                className="text-foreground/80 hover:text-foreground transition-all duration-300 px-3 py-2 rounded-lg hover:bg-foreground/5"
              >
                Pricing
              </Link>
              <div className="border-t border-border/40 pt-4 space-y-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-foreground/80 hover:text-foreground hover:bg-foreground/10 transition-all duration-200 rounded-xl"
                  asChild
                >
                  <Link href="/auth/login" onClick={() => setIsMobileMenuOpen(false)}>
                    Sign In
                  </Link>
                </Button>
                <Button
                  size="sm"
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white transform transition-all duration-200 hover:scale-105 hover:shadow-lg rounded-xl"
                  asChild
                >
                  <Link href="/auth/sign-up" onClick={() => setIsMobileMenuOpen(false)}>
                    Get Started
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
