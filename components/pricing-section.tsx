"use client"

import { motion } from "framer-motion"
import { Button } from "./ui/button"
import { Check, ArrowRight } from "lucide-react"
import Link from "next/link"
import { trackPricingClick } from "@/lib/analytics"

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    description: "Try Zero Entry with no commitment",
    features: ["3 document conversions/month", "PDF, invoices, receipts", "Excel & CSV export", "Email support"],
    popular: false,
    paymentLink: "/auth/sign-up",
    isExternal: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "/month",
    description: "For professionals and freelancers",
    features: [
      "500 conversions/month",
      "Batch processing (up to 50 files)",
      "All document types",
      "Priority support",
      "Data validation reports",
      "Custom column mapping",
    ],
    popular: true,
    paymentLink: "https://buy.stripe.com/test_5kQ5kE70vcaqh0V1T01kA02",
    isExternal: true,
  },
  {
    name: "Business",
    price: "$49",
    period: "/month",
    description: "For teams and automation",
    features: [
      "2000 conversions/month",
      "Full API access",
      "Team collaboration (5 seats)",
      "Webhook integrations",
      "SSO authentication",
      "Dedicated support",
      "SLA guarantee",
    ],
    popular: false,
    paymentLink: "https://buy.stripe.com/test_bJe3cwfx10rI11X7dk1kA03",
    isExternal: true,
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 px-4 bg-black">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Simple, Transparent Pricing
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Start free, upgrade when you need more. No hidden fees.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={`relative bg-card border rounded-lg p-8 ${
                plan.popular ? "border-emerald-500/50 bg-emerald-500/5" : "border-border/20 bg-background/50"
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-emerald-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400">{plan.period}</span>
                </div>
                <p className="text-gray-300">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-emerald-500 mr-3 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${
                  plan.popular
                    ? "bg-emerald-500 text-white hover:bg-emerald-600"
                    : "bg-transparent border border-white/20 text-white hover:bg-white/10"
                } group`}
                size="lg"
                asChild
              >
                {plan.isExternal ? (
                  <a
                    href={plan.paymentLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackPricingClick(plan.name.toLowerCase() as "pro" | "business", "pricing_section")}
                  >
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                ) : (
                  <Link
                    href={plan.paymentLink}
                    onClick={() => trackPricingClick("free", "pricing_section")}
                  >
                    Get Started Free
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                )}
              </Button>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 mb-4">All paid plans include 14-day free trial</p>
          <p className="text-sm text-gray-500">
            Need enterprise volume?{" "}
            <Link href="/contact" className="text-emerald-400 hover:underline">
              Contact our sales team
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
