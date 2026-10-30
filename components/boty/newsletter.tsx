"use client"

import React, { useState } from "react"
import { ArrowUpRight, Check, Mail } from "lucide-react"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail("")
    }
  }

  return (
    <section className="py-20 sm:py-24 bg-background relative overflow-hidden border-t border-black/[0.05]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] uppercase text-accent mb-4">
            <span>Technical Bulletins</span>
            </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl tracking-[-0.035em] text-primary uppercase mb-4">
            EQUIPMENT UPDATES
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mb-8 leading-relaxed max-w-lg mx-auto">
            Receive periodic updates on newly cataloged ship machinery, decommissioned vessel spares, and automation arrivals.
          </p>

          {isSubscribed ? (
            <div className="inline-flex items-center gap-2.5 bg-accent/15 px-6 py-3 rounded-full border border-accent/30 text-accent font-semibold text-xs uppercase tracking-wider">
              <Check className="w-4 h-4" />
              <span>Thank you. Your email has been registered for updates.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter corporate email address..."
                className="flex-1 bg-white border border-black/[0.08] focus:border-accent outline-hidden px-5 py-3 text-foreground placeholder:text-muted-foreground text-xs rounded-full shadow-xs transition-colors"
                required
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-accent text-white px-7 py-3 text-xs font-semibold uppercase tracking-wider rounded-full transition-all duration-300 shadow-sm shrink-0"
              >
                <span>Subscribe</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          <p className="text-[11px] text-muted-foreground mt-4">
            Commercial correspondence only. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  )
}
