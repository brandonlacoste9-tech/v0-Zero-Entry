"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    quote:
      "Zero Entry transformed our invoice processing workflow. What used to take our team 20 hours per week now takes 30 minutes. The accuracy is incredible.",
    author: "Sarah Chen",
    role: "CFO",
    company: "TechCorp Industries",
    avatar: "/placeholder-user.jpg",
    rating: 5,
  },
  {
    quote:
      "As a freelancer, I process dozens of invoices monthly. Zero Entry saves me hours of manual data entry and eliminates errors. Best investment I've made.",
    author: "Marcus Rodriguez",
    role: "Independent Consultant",
    company: "Rodriguez Consulting",
    avatar: "/placeholder-user.jpg",
    rating: 5,
  },
  {
    quote:
      "The API integration was seamless. We've automated our entire accounts payable process. ROI was achieved in the first month.",
    author: "Emily Watson",
    role: "Operations Director",
    company: "ScaleUp Solutions",
    avatar: "/placeholder-user.jpg",
    rating: 5,
  },
  {
    quote:
      "Finally, a tool that understands context. It handles our complex multi-currency invoices perfectly. The support team is also incredibly responsive.",
    author: "David Kim",
    role: "Finance Manager",
    company: "Global Ventures",
    avatar: "/placeholder-user.jpg",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-black">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Trusted by Thousands of Professionals
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Join 10,000+ accountants, analysts, and finance professionals who save hours every week
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-card/50 border border-border/20 rounded-xl p-6 backdrop-blur-sm relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, borderColor: "rgba(16, 185, 129, 0.3)" }}
            >
              <Quote className="absolute top-4 right-4 h-8 w-8 text-emerald-500/20" />
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed relative z-10">{testimonial.quote}</p>
              <div className="flex items-center gap-4">
                <div className="relative h-12 w-12 rounded-full overflow-hidden bg-emerald-500/20">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div>
                  <p className="font-semibold text-white">{testimonial.author}</p>
                  <p className="text-sm text-gray-400">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 mb-4">
            <span className="text-emerald-400 font-semibold">4.9/5</span> average rating from 2,500+ reviews
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <span>⭐ Trusted by companies like:</span>
            <span className="text-emerald-400">Nvidia</span>
            <span>•</span>
            <span className="text-emerald-400">Nike</span>
            <span>•</span>
            <span className="text-emerald-400">OpenAI</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

