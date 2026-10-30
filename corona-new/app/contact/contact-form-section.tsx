"use client"

import React, { useState } from "react";
import { motion } from "framer-motion"
import Image from "next/image"
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, FileText, Check } from "lucide-react";
import api from "@/lib/api";

export default function ContactFormSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle"); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await api.post("/contact", formData);
      if (res.status === 200 || res.status === 201) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", company: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("error");
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Commercial & Sourcing Enquiries",
      details: ["info@tawwakalautomation.com", "sales@tawwakalautomation.com"],
      action: "mailto:info@tawwakalautomation.com",
    },
    {
      icon: Phone,
      title: "Technical Sourcing Desk",
      details: ["+971 XX XXX XXXX (Primary Operations)"],
      action: null,
    },
    {
      icon: MapPin,
      title: "Operating Location",
      details: ["Marine & Industrial Procurement Hub"],
      action: null,
    },
    {
      icon: Clock,
      title: "Enquiry Response Hours",
      details: [
        "Monday – Friday: 08:00 – 18:00",
        "Saturday: 09:00 – 14:00",
        "Urgent vessel enquiries: Monitored continuously",
      ],
      action: null,
    },
  ];

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative pt-8 sm:pt-10 pb-4 flex items-center justify-center bg-background overflow-hidden">
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#008C95] mb-2">
              <span>Direct Technical Communication</span>
              </div>
            <h1 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#0B153B] uppercase tracking-tight leading-tight mb-2">
              CONTACT US
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Submit your required equipment specifications, spare parts lists, or automation requirements for structured quotation assistance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Form & Contact Info */}
      <section className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#008C95] block mb-1">
                Reach Our Team
              </span>
              <h2 className="font-sans text-xl sm:text-2xl font-bold text-[#0B153B] uppercase tracking-tight">
                Enquiry Information
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1 leading-relaxed">
                We handle B2B procurement for marine operators, industrial facilities, and engineering maintenance teams.
              </p>
            </div>

            <div className="space-y-3 pt-1">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex gap-4 p-4 sm:p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-[#0B153B] text-[#008C95] flex items-center justify-center shrink-0">
                    <info.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0B153B] uppercase text-xs mb-1">{info.title}</h3>
                    <div className="space-y-0.5 text-xs text-muted-foreground">
                      {info.details.map((detail, idx) => (
                        <p key={idx}>
                          {info.action && idx === 0 ? (
                            <a href={info.action} className="text-[#008C95] hover:underline font-medium">
                              {detail}
                            </a>
                          ) : detail}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Sourcing Guidance Box */}
            <div className="p-5 rounded-2xl bg-[#0B153B] text-white border border-white/10">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#008C95] mb-2">
                What to Include in Your RFQ:
              </h4>
              <ul className="text-xs text-white/80 space-y-1.5 leading-relaxed">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#008C95] shrink-0" />
                  <span>Equipment manufacturer & model number</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#008C95] shrink-0" />
                  <span>Exact part number, serial number, or nameplate photo</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#008C95] shrink-0" />
                  <span>Required quantity and preferred delivery timeframe</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form Column */}
          <div id="contact-form" className="lg:col-span-7 scroll-mt-24">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E2E8F0] shadow-sm">
              <div className="mb-6 pb-4 border-b border-[#E2E8F0]">
                <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#008C95] block mb-1">
                  Submission Portal
                </span>
                <h2 className="font-sans text-xl sm:text-2xl font-bold text-[#0B153B] uppercase tracking-tight">
                  Send Your Technical Requirement
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  Complete the fields below and our team will evaluate your equipment enquiry.
                </p>
              </div>
              
              {status === "success" ? (
                <div className="text-center py-12 bg-[#F4F7FA] rounded-2xl border border-[#E2E8F0]">
                  <CheckCircle2 className="w-14 h-14 text-[#008C95] mx-auto mb-3" />
                  <h3 className="text-base font-bold text-[#0B153B] uppercase tracking-wide mb-2">
                    Enquiry Successfully Received
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
                    Thank you for contacting Tawwakal Automation. Our technical desk will review your details and respond with suitable supply options.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-5 px-5 py-2.5 bg-[#008C95] text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#007077] transition-colors"
                  >
                    Submit Another Requirement
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-[#0B153B] uppercase tracking-wider">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 border border-[#E2E8F0] focus:border-[#008C95] outline-none bg-[#FAF8F5]/50 focus:bg-white text-xs rounded-xl transition-colors"
                        required
                        placeholder="e.g. David Miller"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-[#0B153B] uppercase tracking-wider">
                        Business Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 border border-[#E2E8F0] focus:border-[#008C95] outline-none bg-[#FAF8F5]/50 focus:bg-white text-xs rounded-xl transition-colors"
                        required
                        placeholder="procurement@company.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-[#0B153B] uppercase tracking-wider">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 border border-[#E2E8F0] focus:border-[#008C95] outline-none bg-[#FAF8F5]/50 focus:bg-white text-xs rounded-xl transition-colors"
                        placeholder="+971 XX XXX XXXX"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-[#0B153B] uppercase tracking-wider">
                        Company / Vessel Name
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 border border-[#E2E8F0] focus:border-[#008C95] outline-none bg-[#FAF8F5]/50 focus:bg-white text-xs rounded-xl transition-colors"
                        placeholder="e.g. Apex Marine / Industrial Plant"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-[#0B153B] uppercase tracking-wider">
                      Requirement Details & Specifications *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 border border-[#E2E8F0] focus:border-[#008C95] outline-none bg-[#FAF8F5]/50 focus:bg-white text-xs rounded-xl h-32 resize-none transition-colors"
                      required
                      placeholder="Please specify product name, part numbers, quantities, condition requirements, or delivery location..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#0B153B] hover:bg-[#008C95] text-white font-semibold uppercase tracking-wider text-xs rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-md cursor-pointer"
                    disabled={status === "loading"}
                  >
                    {status === "loading" ? "Submitting RFQ..." : (
                      <>
                        <Send className="w-4 h-4" />
                        Submit Quotation Request
                      </>
                    )}
                  </button>

                  {status === "error" && (
                    <p className="text-red-600 font-medium text-center text-xs mt-2">
                      Submission could not be completed. Please verify your connection or email us directly at info@tawwakalautomation.com.
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
