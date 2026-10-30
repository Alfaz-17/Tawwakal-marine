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
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-12">
          <div className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#0095A8] mb-1.5 sm:mb-2">
            <span>COMMERCIAL &amp; SOURCING DESK</span>
          </div>

          <h2 className="font-sans font-black text-xl sm:text-3xl lg:text-4xl text-white uppercase tracking-tight">
            REQUEST A TECHNICAL QUOTE
          </h2>
          <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Submit your required equipment specifications, OEM part numbers, or vessel requisition lists for structured commercial pricing within 2 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-12 items-start">
          
          {/* Left Column: Direct Business Contacts & Logistics Highlights */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-5">
            <div className="p-4 sm:p-7 rounded-2xl sm:rounded-3xl bg-[#0B1E3F] border border-[#0095A8]/25 shadow-xl space-y-3.5 sm:space-y-5">
              <h3 className="font-sans font-bold text-sm sm:text-base text-white uppercase tracking-wide">
                Direct Procurement Channels
              </h3>

              <div className="space-y-3 sm:space-y-4">
                <div className="flex gap-2.5 sm:gap-3.5 items-start">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-[#0095A8]/20 text-[#0095A8] flex items-center justify-center shrink-0 border border-[#0095A8]/30">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Commercial &amp; Sales Desk</div>
                    <a href="mailto:sales@tawwakalautomation.com" className="text-[11px] sm:text-sm font-bold text-white hover:text-[#0095A8] transition-colors truncate block">
                      sales@tawwakalautomation.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-2.5 sm:gap-3.5 items-start">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-[#0095A8]/20 text-[#0095A8] flex items-center justify-center shrink-0 border border-[#0095A8]/30">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <div className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Direct Requisition Desk</div>
                    <a href="tel:+916356547827" className="text-[11px] sm:text-sm font-bold text-white hover:text-[#0095A8] transition-colors">
                      +91 6356547827
                    </a>
                  </div>
                </div>

                <div className="flex gap-2.5 sm:gap-3.5 items-start">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-[#0095A8]/20 text-[#0095A8] flex items-center justify-center shrink-0 border border-[#0095A8]/30">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <div className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Physical Operations Hub</div>
                    <div className="text-[10.5px] sm:text-xs text-slate-200 leading-relaxed font-medium">
                      Bhavnagar – Alang Maritime Corridor, Gujarat
                    </div>
                  </div>
                </div>

                <div className="flex gap-2.5 sm:gap-3.5 items-start">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-[#0095A8]/20 text-[#0095A8] flex items-center justify-center shrink-0 border border-[#0095A8]/30">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <div className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Enquiry Response</div>
                    <div className="text-[10.5px] sm:text-xs text-slate-200 leading-relaxed font-medium">
                      Mon – Sat: 08:00 – 19:00 IST (24/7 Vessel Emergency)
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quality Checklist Box */}
            <div className="p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#04142B] text-white border border-[#0095A8]/30 shadow-xl">
              <div className="flex items-center gap-1.5 text-[#0095A8] mb-1.5 sm:mb-2">
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider">What to Include in Your RFQ</span>
              </div>
              <ul className="text-[10px] sm:text-xs text-slate-300 space-y-1 sm:space-y-1.5 leading-relaxed">
                <li>• Exact OEM Brand &amp; Part Number (e.g. 6ES7315-2EH14-0AB0)</li>
                <li>• Equipment photograph or nameplate data plate</li>
                <li>• Preferred condition (New Sealed, Surplus, or Tested)</li>
                <li>• Required port/city for airfreight transit calculation</li>
              </ul>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#0B1E3F] border border-[#0095A8]/25 shadow-xl">
              <h3 className="font-sans font-bold text-sm sm:text-base text-white uppercase tracking-wide mb-1">
                Structured Quotation Form
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-300 mb-4 sm:mb-6">
                Fill in your equipment requirement below to receive prompt commercial terms.
              </p>

              {status === "success" ? (
                <div className="text-center py-8 sm:py-10 bg-[#04142B] rounded-2xl border border-[#0095A8]/30 p-4">
                  <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-[#0095A8] mx-auto mb-2 sm:mb-3" />
                  <h4 className="text-sm sm:text-base font-bold text-white uppercase">Enquiry Successfully Transmitted</h4>
                  <p className="text-[11px] sm:text-xs text-slate-300 max-w-sm mx-auto mt-1">
                    Our technical desk is evaluating your equipment parameters and will reply via email shortly.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-4 px-4 sm:px-5 py-2 bg-[#0095A8] text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#007b8a] transition-colors"
                  >
                    Submit Another Requirement
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                  {/* Row 1: 2-column grid on mobile */}
                  <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
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
                        placeholder="David Miller"
                        className="w-full px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-xl border border-[#0095A8]/30 focus:border-[#0095A8] bg-[#04142B] text-white placeholder:text-slate-500 outline-none text-[11px] sm:text-xs transition-colors"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] sm:text-[11px] font-bold text-slate-200 uppercase tracking-wider block">
                        Business Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="procurement@shipping.com"
                        className="w-full px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-xl border border-[#0095A8]/30 focus:border-[#0095A8] bg-[#04142B] text-white placeholder:text-slate-500 outline-none text-[11px] sm:text-xs transition-colors"
                      />
                    </div>
                  </div>

                  {/* Row 2: 2-column grid on mobile */}
                  <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] sm:text-[11px] font-bold text-slate-200 uppercase tracking-wider block">
                        Company / Vessel
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Nordic Marine"
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
                        placeholder="+91 / International"
                        className="w-full px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-xl border border-[#0095A8]/30 focus:border-[#0095A8] bg-[#04142B] text-white placeholder:text-slate-500 outline-none text-[11px] sm:text-xs transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] sm:text-[11px] font-bold text-slate-200 uppercase tracking-wider block">
                      Service Requirement Scope
                    </label>
                    <select
                      name="serviceRequirement"
                      value={formData.serviceRequirement}
                      onChange={handleChange}
                      className="w-full px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-xl border border-[#0095A8]/30 focus:border-[#0095A8] bg-[#04142B] text-white outline-none text-[11px] sm:text-xs transition-colors"
                    >
                      <option value="Marine Automation Spare">Marine Automation Spare</option>
                      <option value="Industrial PLC / HMI Module">Industrial PLC / HMI Module</option>
                      <option value="VFD Inverter / Drive">VFD Inverter / Drive</option>
                      <option value="Instrumentation & Sensors">Instrumentation &amp; Sensors</option>
                      <option value="Obsolete Part Sourcing">Obsolete Part Sourcing</option>
                      <option value="Repair / Bench Calibration">Repair / Bench Calibration</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] sm:text-[11px] font-bold text-slate-200 uppercase tracking-wider block">
                      Equipment Specifications / Part Numbers *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={3}
                      placeholder="Specify part numbers, quantities, port or plant location..."
                      className="w-full px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-xl border border-[#0095A8]/30 focus:border-[#0095A8] bg-[#04142B] text-white placeholder:text-slate-500 outline-none text-[11px] sm:text-xs resize-none transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full py-2.5 sm:py-3.5 bg-[#0095A8] hover:bg-[#008293] text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-md cursor-pointer disabled:opacity-50"
                  >
                    {status === "loading" ? "Transmitting RFQ..." : (
                      <>
                        <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span>Request Official Quotation</span>
                      </>
                    )}
                  </button>

                  {status === "error" && (
                    <p className="text-red-400 text-xs text-center font-medium">
                      Unable to send requirement. Please email us directly at sales@tawwakalautomation.com.
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
