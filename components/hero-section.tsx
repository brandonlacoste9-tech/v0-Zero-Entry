import { Button } from "./ui/button"
import { ArrowRight, Play } from "lucide-react"
import { ParticleTextEffect } from "./particle-text-effect"
import { InfiniteSlider } from "./ui/infinite-slider"
import { ProgressiveBlur } from "./ui/progressive-blur"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="py-20 px-4 relative overflow-hidden min-h-screen flex flex-col justify-between">
      <div className="flex-1 flex items-start justify-center pt-20">
        <ParticleTextEffect words={["ZeroEntry", "PDF→DATA", "AI AGENTS", "ACCURATE"]} />
      </div>

      <div className="container mx-auto text-center relative z-10 pb-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-balance">
            Stop Typing. <span className="text-emerald-400">Start Analyzing.</span>
          </h2>
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            The first AI agent that turns any unstructured document into clean, actionable data. No templates. No
            training. Just drag, drop, and done.
          </p>

          <div className="group relative m-auto max-w-6xl mb-8">
            <div className="flex flex-col items-center md:flex-row">
              <div className="md:max-w-44 md:border-r md:border-gray-600 md:pr-6 mb-4 md:mb-0">
                <p className="text-end text-sm text-gray-400">Trusted by 10,000+ analysts</p>
              </div>
              <div className="relative py-6 md:w-[calc(100%-11rem)]">
                <InfiniteSlider durationOnHover={20} duration={40} gap={112}>
                  <div className="flex">
                    <img
                      className="mx-auto h-5 w-fit invert opacity-60 hover:opacity-100 transition-opacity"
                      src="/images/design-mode-images-nvidia.svg"
                      alt="Nvidia Logo"
                      height="20"
                      width="auto"
                    />
                  </div>

                  <div className="flex">
                    <img
                      className="mx-auto h-4 w-fit invert opacity-60 hover:opacity-100 transition-opacity"
                      src="/images/design-mode-images-column.svg"
                      alt="Column Logo"
                      height="16"
                      width="auto"
                    />
                  </div>
                  <div className="flex">
                    <img
                      className="mx-auto h-4 w-fit invert opacity-60 hover:opacity-100 transition-opacity"
                      src="/images/design-mode-images-github.svg"
                      alt="GitHub Logo"
                      height="16"
                      width="auto"
                    />
                  </div>
                  <div className="flex">
                    <img
                      className="mx-auto h-5 w-fit invert opacity-60 hover:opacity-100 transition-opacity"
                      src="/images/design-mode-images-nike.svg"
                      alt="Nike Logo"
                      height="20"
                      width="auto"
                    />
                  </div>
                  <div className="flex">
                    <img
                      className="mx-auto h-5 w-fit invert opacity-60 hover:opacity-100 transition-opacity"
                      src="/images/design-mode-images-lemonsqueezy.svg"
                      alt="Lemon Squeezy Logo"
                      height="20"
                      width="auto"
                    />
                  </div>
                  <div className="flex">
                    <img
                      className="mx-auto h-4 w-fit invert opacity-60 hover:opacity-100 transition-opacity"
                      src="/images/design-mode-images-laravel.svg"
                      alt="Laravel Logo"
                      height="16"
                      width="auto"
                    />
                  </div>
                  <div className="flex">
                    <img
                      className="mx-auto h-7 w-fit invert opacity-60 hover:opacity-100 transition-opacity"
                      src="/images/design-mode-images-lilly.svg"
                      alt="Lilly Logo"
                      height="28"
                      width="auto"
                    />
                  </div>

                  <div className="flex">
                    <img
                      className="mx-auto h-6 w-fit invert opacity-60 hover:opacity-100 transition-opacity"
                      src="/images/design-mode-images-openai.svg"
                      alt="OpenAI Logo"
                      height="24"
                      width="auto"
                    />
                  </div>
                </InfiniteSlider>

                <ProgressiveBlur
                  className="pointer-events-none absolute left-0 top-0 h-full w-20"
                  direction="left"
                  blurIntensity={1}
                />
                <ProgressiveBlur
                  className="pointer-events-none absolute right-0 top-0 h-full w-20"
                  direction="right"
                  blurIntensity={1}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white group" asChild>
              <Link href="/auth/sign-up">
                Start for Free
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-gray-600 text-white hover:bg-gray-800 bg-transparent group"
              asChild
            >
              <Link href="#demo">
                <Play className="mr-2 h-4 w-4" />
                Watch Demo
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
