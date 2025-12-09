"use client"

import { Shield, Lock, CheckCircle, Zap } from "lucide-react"

const badges = [
  {
    icon: Shield,
    text: "SOC 2 Compliant",
    description: "Enterprise-grade security",
  },
  {
    icon: Lock,
    text: "AES-256 Encryption",
    description: "Bank-level data protection",
  },
  {
    icon: CheckCircle,
    text: "GDPR Ready",
    description: "EU data compliance",
  },
  {
    icon: Zap,
    text: "99.9% Uptime SLA",
    description: "Reliable infrastructure",
  },
]

export function TrustBadges() {
  return (
    <div className="py-12 px-4 bg-black/50 border-y border-white/10">
      <div className="container mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {badges.map((badge, index) => {
            const Icon = badge.icon
            return (
              <div key={index} className="flex items-center gap-3 group">
                <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors">
                  <Icon className="h-5 w-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{badge.text}</p>
                  <p className="text-xs text-gray-400">{badge.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

