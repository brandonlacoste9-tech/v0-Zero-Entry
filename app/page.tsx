import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { DemoSection } from "@/components/demo-section"
import { PricingSection } from "@/components/pricing-section"
import { TrustBadges } from "@/components/trust-badges"
import { TestimonialsSection } from "@/components/testimonials-section"
import { FAQSection } from "@/components/faq-section"
import { AnimatedCTASection } from "@/components/animated-cta-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <HeroSection />
        <TrustBadges />
        <DemoSection />
        <PricingSection />
        <TestimonialsSection />
        <FAQSection />
        <AnimatedCTASection />
      </main>
      <Footer />
    </div>
  )
}
