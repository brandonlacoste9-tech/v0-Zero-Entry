"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "What is Zero Entry and how does it work?",
    answer:
      "Zero Entry is an AI-powered document processing platform that converts unstructured documents like PDFs, invoices, and bank statements into clean, editable spreadsheet data. Our AI agents intelligently identify document types, extract table data, validate accuracy, and output perfectly formatted Excel or CSV files.",
  },
  {
    question: "What types of documents can Zero Entry process?",
    answer:
      "Zero Entry handles bank statements, invoices, receipts, purchase orders, financial reports, and most tabular PDF documents. Our AI adapts to different formats automatically—no templates or training required.",
  },
  {
    question: "How accurate is the data extraction?",
    answer:
      "Our AI agents achieve 99%+ accuracy through a multi-step validation process. The system cross-checks extracted values, verifies totals match row sums, and flags any discrepancies for human review before final export.",
  },
  {
    question: "Can I try Zero Entry before committing to a paid plan?",
    answer:
      "Yes! Our Free plan includes 3 document conversions per month—no credit card required. This lets you test the accuracy and speed of our AI extraction on your actual documents.",
  },
  {
    question: "How secure is my data with Zero Entry?",
    answer:
      "Security is our top priority. All documents are encrypted in transit and at rest using AES-256 encryption. We're SOC 2 Type II compliant, and documents are automatically deleted after processing unless you choose to store them.",
  },
  {
    question: "Does Zero Entry offer an API for automation?",
    answer:
      "Yes! Our Business plan includes full API access for automating document processing workflows. Integrate Zero Entry into your existing accounting software, ERP systems, or custom applications.",
  },
  {
    question: "What file formats can I export to?",
    answer:
      "Zero Entry exports to Excel (.xlsx), CSV, and JSON formats. All exports maintain proper data types, formatting, and structure for immediate use in your analysis tools.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "We offer a 30-day money-back guarantee for all paid plans. If Zero Entry doesn't meet your needs within the first 30 days, contact our support team for a full refund.",
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Everything you need to know about Zero Entry. Can't find what you're looking for? Contact our support team.
          </motion.p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="border border-border/20 rounded-lg bg-card/50 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/5 transition-colors rounded-lg"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg font-medium text-white pr-4">{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 text-gray-400 transition-transform shrink-0 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <motion.div
                initial={false}
                animate={{
                  height: openIndex === index ? "auto" : 0,
                  opacity: openIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-4">
                  <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        ></motion.div>
      </div>
    </section>
  )
}
