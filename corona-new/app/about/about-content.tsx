"use client"

import { motion } from 'framer-motion';
import { ShieldCheck, Layers, Users, Globe, CheckCircle2, ArrowRight, FileText, Check } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function AboutContent() {
  const principles = [
    {
      icon: ShieldCheck,
      title: 'Specification Accuracy',
      description: 'We review part numbers, nameplates, and technical documentation before proposing equipment solutions.'
    },
    {
      icon: Layers,
      title: 'Broad Supply Scope',
      description: 'Covering marine machinery, ship spare parts, industrial automation modules, and electrical hardware.'
    },
    {
      icon: Users,
      title: 'B2B Client Focus',
      description: 'Serving procurement officers, chief engineers, and facility maintenance managers with responsive communication.'
    },
    {
      icon: FileText,
      title: 'Structured Quotations',
      description: 'Clear commercial terms, condition descriptions, and dispatch parameters for every verified enquiry.'
    }
  ];

  return (
    <div className="font-sans bg-background pb-20">
      {/* Hero Section */}
      <section className="relative pt-8 sm:pt-10 pb-4 flex items-center justify-center overflow-hidden bg-background">
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="inline-flex items-center gap-2 text-[11px] font-extrabold tracking-[0.2em] uppercase text-accent mb-2">
              <span>Corporate Overview</span>
              </div>
            <h1 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl tracking-tight text-primary uppercase leading-tight mb-2">
              ABOUT US
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Marine &amp; Industrial Equipment Supplier supporting business-critical operations with equipment, spare parts, and automation products.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Profile Section */}
      <section className="py-10 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-5"
          >
            <span className="text-accent text-xs font-bold uppercase tracking-widest block">
              Business Profile
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0B153B] uppercase tracking-tight leading-tight">
              Supplying Marine & Industrial Equipment to Technical Operators
            </h2>
            
            <p className="text-sm sm:text-base text-foreground/80 leading-relaxed">
              Tawwakal Automation operates as a dedicated B2B supplier of marine equipment, ship spare parts, and industrial automation components. We support shipping companies, engineering businesses, industrial facilities, maintenance teams, and procurement professionals who require reliable equipment options and dependable requirement handling.
            </p>

            <p className="text-sm sm:text-base text-foreground/80 leading-relaxed">
              Our business is built around understanding specific customer requirements. Rather than simply listing commodities, our team reviews nameplates, part numbers, and system parameters to confirm suitability before submitting quotations.
            </p>

            <div className="pt-2 space-y-2.5">
              {[
                "Marine machinery, deck equipment, and ship propulsion spares",
                "Industrial automation systems, PLCs, HMIs, and telemetry boards",
                "Process pumps, high-pressure valves, and industrial electric motors",
                "Electrical switchgear, contactors, relays, and circuit breakers",
                "Requirement-based sourcing assistance for discontinued and legacy components"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs text-foreground/85 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white text-xs font-bold uppercase tracking-wider rounded shadow-sm hover:bg-accent/90 transition-colors"
              >
                <span>Submit an Enquiry</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative"
          >
            <div className="aspect-[4/3] relative rounded border border-border overflow-hidden shadow-lg bg-muted">
              <Image
                src="/spare-parts.png"
                alt="Industrial & Marine Spare Parts"
                fill
                className="object-cover"
              />
            </div>
            <div className="mt-4 p-4 rounded bg-[#F4F7FA] border border-border text-xs text-muted-foreground">
              <strong className="text-[#0B153B] block uppercase tracking-wider text-[11px] mb-1">
                Engineering Discipline
              </strong>
              Every product enquiry is matched against manufacturer part numbers to minimize vessel downtime and equipment mismatch.
            </div>
          </motion.div>

        </div>
      </section>

      {/* Core Principles */}
      <section className="py-16 bg-[#0B153B] text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-accent text-xs font-bold uppercase tracking-widest block mb-2">
              Operational Standards
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white">
              Our Core Principles
            </h2>
            <p className="text-xs sm:text-sm text-white/70 mt-2">
              The operational commitments that guide our procurement and quotation workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {principles.map((p, i) => (
              <div key={i} className="p-6 rounded bg-white/5 border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded bg-accent/20 flex items-center justify-center text-accent mb-4">
                    <p.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-2">
                    {p.title}
                  </h3>
                  <p className="text-xs text-white/70 leading-relaxed">
                    {p.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries & Quotation Process Recap */}
      <section className="py-16 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="bg-[#F4F7FA] rounded p-8 sm:p-12 border border-border flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <span className="text-accent text-xs font-bold uppercase tracking-widest block mb-1">
              B2B Engagement
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B153B] uppercase tracking-tight">
              Ready to Discuss a Supply Requirement?
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">
              Whether you are preparing for scheduled vessel drydocking, facility maintenance, or an urgent replacement part, our team is ready to review your specifications.
            </p>
          </div>

          <div className="flex gap-4 shrink-0">
            <Link
              href="/contact"
              className="px-6 py-3 bg-accent hover:bg-accent/90 text-white text-xs font-bold uppercase tracking-wider rounded transition-colors shadow-sm"
            >
              Contact Our Team
            </Link>
            <Link
              href="/products"
              className="px-6 py-3 border border-border text-[#0B153B] hover:bg-white text-xs font-bold uppercase tracking-wider rounded transition-colors"
            >
              View Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
