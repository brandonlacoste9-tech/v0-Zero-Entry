/**
 * Analytics utility for tracking user events
 * Supports multiple analytics providers
 */

// Event types
export type AnalyticsEvent =
  | "page_view"
  | "button_click"
  | "form_submit"
  | "signup_start"
  | "signup_complete"
  | "pricing_button_click"
  | "demo_start"
  | "document_processed"
  | "upgrade_click"
  | "newsletter_signup"

export interface AnalyticsProperties {
  [key: string]: string | number | boolean | undefined
}

/**
 * Track an analytics event
 */
export function trackEvent(event: AnalyticsEvent, properties?: AnalyticsProperties) {
  if (typeof window === "undefined") return

  // Google Analytics 4
  if (window.gtag) {
    window.gtag("event", event, properties)
  }

  // Vercel Analytics
  if (window.va) {
    window.va("track", event, properties)
  }

  // Custom analytics endpoint (optional)
  if (process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT) {
    fetch(process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event, properties, timestamp: new Date().toISOString() }),
    }).catch((err) => console.error("Analytics error:", err))
  }

  // Console log in development
  if (process.env.NODE_ENV === "development") {
    console.log("📊 Analytics:", event, properties)
  }
}

/**
 * Track page views
 */
export function trackPageView(path: string) {
  trackEvent("page_view", { path })
}

/**
 * Track button clicks
 */
export function trackButtonClick(buttonName: string, location?: string) {
  trackEvent("button_click", { button_name: buttonName, location })
}

/**
 * Track pricing plan clicks
 */
export function trackPricingClick(plan: "free" | "pro" | "business", location: string) {
  trackEvent("pricing_button_click", { plan, location })
}

/**
 * Track signup events
 */
export function trackSignup(method: "email" | "google" | "github", step: "start" | "complete") {
  trackEvent(step === "start" ? "signup_start" : "signup_complete", { method })
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    gtag?: (...args: any[]) => void
    va?: (method: string, event: string, properties?: AnalyticsProperties) => void
  }
}

