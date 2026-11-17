"use client"

import React, { useState } from "react"
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, ShieldCheck } from "lucide-react"
import api from "@/lib/api"
import TawakkalBackground from "@/components/TawakkalBackground"

export function HomeContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    serviceRequirement: "Marine Automation Spare",
    message: ""
  })

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        message: `[Requirement: ${formData.serviceRequirement}]\n${formData.message}`
      }

      const res = await api.post("/contact", payload)
      if (res.status === 200 || res.status === 201) {
        setStatus("success")
        setFormData({ name: "", email: "", phone: "", company: "", serviceRequirement: "Marine Automation Spare", message: "" })
      } else {
        setStatus("error")
      }
    } catch (err) {
      console.error("Submission failed:", err)
      setStatus("error")
    }
  }

  return (
    <section className="py-8 sm:py-20 bg-[#061D45] text-white border-b border-[#0095A8]/25 relative overflow-hidden" id="contact">
      {/* Reusable Tawakkal Dark Marine Background */}
      <TawakkalBackground variant="dark" />

      <div className="ta-content relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-4 sm:mb-8">
          <div className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#0095A8] mb-1.5 sm:mb-2">
            <span>FAST RESPONSE</span>
          </div>

          <h2 className="font-sans font-black text-xl sm:text-3xl lg:text-4xl text-white uppercase tracking-tight">
            REQUEST A QUICK QUOTE
          </h2>
        </div>

        {/* Centered Clean Form Card */}
        <div className="max-w-2xl mx-auto">
          <div className="p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#0B1E3F] border border-[#0095A8]/25 shadow-xl">
            {status === "success" ? (
              <div className="text-center py-8 sm:py-10 bg-[#04142B] rounded-2xl border border-[#0095A8]/30 p-4">
                <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-[#0095A8] mx-auto mb-2 sm:mb-3" />
                <h4 className="text-sm sm:text-base font-bold text-white uppercase">Quote Request Sent!</h4>
                <p className="text-[11px] sm:text-xs text-slate-300 max-w-sm mx-auto mt-1">
                  We received your part requirement and our team will reply via email or WhatsApp shortly.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-4 px-4 sm:px-5 py-2 bg-[#0095A8] text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#007b8a] transition-colors"
                >
                  Submit Another Part Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                {/* Row 1: Name & Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] sm:text-[11px] font-bold text-slate-200 uppercase tracking-wider block">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your Name"
                      className="w-full px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-xl border border-[#0095A8]/30 focus:border-[#0095A8] bg-[#04142B] text-white placeholder:text-slate-500 outline-none text-[11px] sm:text-xs transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] sm:text-[11px] font-bold text-slate-200 uppercase tracking-wider block">
                      Company / Vessel (Optional)
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Company or Ship Name"
                      className="w-full px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-xl border border-[#0095A8]/30 focus:border-[#0095A8] bg-[#04142B] text-white placeholder:text-slate-500 outline-none text-[11px] sm:text-xs transition-colors"
                    />
                  </div>
                </div>

                {/* Row 2: Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] sm:text-[11px] font-bold text-slate-200 uppercase tracking-wider block">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your.email@company.com"
                      className="w-full px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-xl border border-[#0095A8]/30 focus:border-[#0095A8] bg-[#04142B] text-white placeholder:text-slate-500 outline-none text-[11px] sm:text-xs transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] sm:text-[11px] font-bold text-slate-200 uppercase tracking-wider block">
                      WhatsApp / Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 / International number"
                      className="w-full px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-xl border border-[#0095A8]/30 focus:border-[#0095A8] bg-[#04142B] text-white placeholder:text-slate-500 outline-none text-[11px] sm:text-xs transition-colors"
                    />
                  </div>
                </div>

                {/* Category Dropdown */}
                <div className="space-y-1">
                  <label className="text-[10px] sm:text-[11px] font-bold text-slate-200 uppercase tracking-wider block">
                    Part Type
                  </label>
                  <select
                    name="serviceRequirement"
                    value={formData.serviceRequirement}
                    onChange={handleChange}
                    className="w-full px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-xl border border-[#0095A8]/30 focus:border-[#0095A8] bg-[#04142B] text-white outline-none text-[11px] sm:text-xs transition-colors"
                  >
                    <option value="Marine Automation Spare">Marine Spare Part</option>
                    <option value="Industrial PLC / HMI Module">PLC / HMI Module</option>
                    <option value="VFD Drive / Inverter">VFD Drive / Inverter</option>
                    <option value="Navigation / Radar Electronics">Navigation &amp; Radar</option>
                    <option value="Other Spare Part">Other Equipment</option>
                  </select>
                </div>

                {/* Part details / Message */}
                <div className="space-y-1">
                  <label className="text-[10px] sm:text-[11px] font-bold text-slate-200 uppercase tracking-wider block">
                    Part Number, Brand &amp; Details *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={3}
                    placeholder="Enter Part Number, Brand (e.g. Siemens 6ES7..., ABB ACS800...), Quantity, or Delivery Port"
                    className="w-full px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-xl border border-[#0095A8]/30 focus:border-[#0095A8] bg-[#04142B] text-white placeholder:text-slate-500 outline-none text-[11px] sm:text-xs transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full mt-2 py-2.5 sm:py-3 px-4 rounded-xl bg-[#0095A8] hover:bg-[#007b8a] text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>{status === "loading" ? "Submitting..." : "Send Quote Request"}</span>
                </button>

                {status === "error" && (
                  <p className="text-red-400 text-xs text-center font-medium">
                    Unable to send request. Please email us directly at sales@tawwakalautomation.com.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  )
}
