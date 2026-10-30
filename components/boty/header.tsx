"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, Search, ChevronDown, ArrowRight, FileText, HelpCircle, Phone, Mail, ShieldCheck } from "lucide-react"
import api from "@/lib/api"
import { motion, AnimatePresence } from "framer-motion"
import { Logo } from "@/components/common/logo"

export function Header() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [categories, setCategories] = useState<any[]>([])
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileOpenSector, setMobileOpenSector] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    
    const fetchCategories = async () => {
      try {
        const catRes = await api.get("/categories")
        if (Array.isArray(catRes.data)) {
          setCategories(catRes.data)
        }
      } catch (err) {
        console.error("Navigation data fetch failed:", err)
      }
    }
    
    fetchCategories()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Scroll locking for mobile menu
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const query = formData.get('q')
    if (query) {
      window.location.href = `/products?q=${encodeURIComponent(query.toString())}`
    }
  }

  if (pathname?.startsWith("/admin")) return null

  const industrialAutomationDropdown = [
    { 
      name: "PLC Systems & Modules", 
      href: "/products?category=plc-systems", 
      image: "/categories/plc-systems.png",
      desc: "Siemens Simatic, Allen-Bradley, Omron, Mitsubishi" 
    },
    { 
      name: "HMI Touch Panels & Displays", 
      href: "/products?category=hmi-panels", 
      image: "/categories/hmi.png",
      desc: "Pro-face, Siemens Comfort, Beijer, Hakko" 
    },
    { 
      name: "VFD & Inverters", 
      href: "/products?category=vfd-inverters", 
      image: "/categories/vfd.png",
      desc: "Danfoss VLT, ABB ACS, Yaskawa, Siemens Sinamics" 
    },
    { 
      name: "Industrial AC & DC Drives", 
      href: "/products?category=ac-dc-drives", 
      image: "/categories/drives.png",
      desc: "Modular frequency drives & heavy-duty motor control" 
    },
    { 
      name: "Servo Drives & Amplifiers", 
      href: "/products?category=servo-drives", 
      image: "/categories/servo-drive.png",
      desc: "Multi-axis motion & precision servo controllers" 
    },
    { 
      name: "Servo Motors & Encoders", 
      href: "/products?category=servo-motors", 
      image: "/categories/servo-motor.png",
      desc: "AC synchronous servo motors & resolvers" 
    },
    { 
      name: "Controllers & Control Units", 
      href: "/products?category=controllers", 
      image: "/categories/controller.png",
      desc: "PID controllers, embedded & process units" 
    },
    { 
      name: "I/O Modules & Expansion", 
      href: "/products?category=io-modules", 
      image: "/categories/i-o-modules.png",
      desc: "Digital, analog, communication & rack cards" 
    },
    { 
      name: "Circuit Breakers & Switchgear", 
      href: "/products?category=circuit-breakers", 
      image: "/categories/circuit-breaker.png",
      desc: "Molded case, vacuum & air circuit breakers" 
    },
    { 
      name: "Power Supplies & Relays", 
      href: "/products?category=power-supplies", 
      image: "/categories/power-supply.png",
      desc: "24V DC DIN-rail supplies & safety relays" 
    },
  ]

  const marineAutomationDropdown = [
    { 
      name: "Engine Room Controls & AMS", 
      href: "/products?category=engine-room-controls", 
      image: "/categories/marine-automation.png",
      desc: "Alarm monitoring systems (AMS) & telemetry" 
    },
    { 
      name: "Bridge Navigation & Telecom", 
      href: "/products?category=bridge-navigation", 
      image: "/categories/telecom-and-communication.png",
      desc: "VHF/MF transceivers, GPS, AIS & gyro spares" 
    },
    { 
      name: "Marine Radar Systems", 
      href: "/products?category=marine-radar", 
      image: "/categories/radar.png",
      desc: "S-Band & X-Band scanners, displays & magnetrons" 
    },
    { 
      name: "Oil Mist Detectors (OMD)", 
      href: "/products?category=oil-mist-detectors", 
      image: "/categories/oil-mist-detector.png",
      desc: "Graviner, Daihatsu & Schaller crankcase safety" 
    },
    { 
      name: "Pressure & Level Transmitters", 
      href: "/products?category=transmitters", 
      image: "/categories/transmitter.png",
      desc: "Danfoss, Rosemount 4-20mA marine sensors" 
    },
    { 
      name: "Flame & Heat Detectors", 
      href: "/products?category=flame-detectors", 
      image: "/categories/detector.png",
      desc: "Boiler burner scanners & combustion safeties" 
    },
    { 
      name: "Control Valves & Actuators", 
      href: "/products?category=control-valves", 
      image: "/categories/control-valve.png",
      desc: "Pneumatic, motorized & hydraulic throttle valves" 
    },
    { 
      name: "Solenoid Valves", 
      href: "/products?category=solenoid-valves", 
      image: "/categories/solenoid-valve.png",
      desc: "Danfoss, ASCO marine high-pressure valves" 
    },
    { 
      name: "Marine Fire Alarm Systems", 
      href: "/products?category=alarm", 
      image: "/categories/alarm.png",
      desc: "Consilium, Salwico marine smoke/fire units" 
    },
    { 
      name: "Marine Sensors & Pickups", 
      href: "/products?category=sensors", 
      image: "/categories/sensors.png",
      desc: "Danfoss KPI/KPS series & RPM sensors" 
    },
  ]

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { 
      name: "Industrial Automation", 
      href: "/products?division=industrial-automation",
      dropdown: industrialAutomationDropdown
    },
    { 
      name: "Marine Automation", 
      href: "/products?division=marine-automation",
      dropdown: marineAutomationDropdown
    },
    { name: "All Brands", href: "/brands" },
    { name: "Contact Us", href: "/contact" }
  ]

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-white border-b border-[#CBD5E1] shadow-xs">
      
      {/* Top Announcement & Direct Commercial Contact Bar */}
      <div className="bg-[#061D45] text-white text-[11px] sm:text-xs border-b border-white/10 py-1.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          
          {/* Left Contact Details: Phone & Email */}
          <div className="flex items-center gap-3 sm:gap-6 flex-nowrap overflow-x-auto no-scrollbar py-0.5">
            <a 
              href="tel:+916356547827" 
              className="inline-flex items-center gap-1.5 text-white/90 hover:text-[#0095A8] transition-colors font-semibold shrink-0"
            >
              <Phone className="w-3.5 h-3.5 text-[#0095A8] shrink-0" />
              <span>+91 6356547827</span>
            </a>

            <a 
              href="mailto:sales@tawwakalautomation.com" 
              className="inline-flex items-center gap-1.5 text-white/90 hover:text-[#0095A8] transition-colors font-semibold shrink-0"
            >
              <Mail className="w-3.5 h-3.5 text-[#0095A8] shrink-0" />
              <span>sales@tawwakalautomation.com</span>
            </a>
          </div>

          {/* Right Announcement & Logistics Badge */}
          <div className="hidden md:flex items-center gap-4 text-white/70">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0095A8] animate-pulse" />
              <span>Direct Alang &amp; Bhavnagar Stockist · 24-48h Worldwide Dispatch</span>
            </span>
            <span className="text-white/30">|</span>
            <Link 
              href="/contact" 
              className="text-[#0095A8] hover:text-white font-bold transition-colors uppercase tracking-wider text-[10.5px]"
            >
              Instant RFQ →
            </Link>
          </div>

        </div>
      </div>

      {/* Top Main Bar: Logo, Central Search Box, and Request for Quotes CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3">
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center shrink-0 max-h-14 overflow-hidden" aria-label="Tawwakal Automation Home">
            <Logo variant="dark" size="md" />
          </Link>

          {/* Central Live Search Bar (Exact layout from reference screenshot) */}
          <form 
            onSubmit={handleSearch} 
            className="hidden md:flex flex-1 max-w-xl mx-4 lg:mx-8 relative"
          >
            <input
              type="text"
              name="q"
              placeholder="Search by Part Number/Model/Brand..."
              className="w-full bg-[#F4F7FA] border border-[#DDE4EC] focus:border-[#008C95] focus:bg-white text-xs sm:text-sm text-[#0B153B] placeholder:text-muted-foreground rounded-full py-2.5 pl-5 pr-12 outline-hidden transition-all shadow-2xs"
            />
            <button
              type="submit"
              className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#008C95] hover:bg-[#00767E] text-white flex items-center justify-center transition-colors shadow-2xs"
              aria-label="Submit search"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Right Action Group */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Request for Quotes Pill Button */}
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-[#0B153B] hover:bg-[#008C95] text-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-xs"
            >
              <FileText className="w-3.5 h-3.5 text-[#008C95]" />
              <span>Request for Quotes</span>
            </Link>

            {/* Help / Contact link */}
            <Link
              href="/contact"
              className="hidden lg:inline-flex items-center gap-1.5 text-xs font-semibold text-[#0B153B] hover:text-[#008C95] transition-colors px-2 py-1"
            >
              <HelpCircle className="w-4 h-4 text-[#008C95]" />
              <span>Help Center</span>
            </Link>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden w-10 h-10 rounded-full border border-black/[0.08] bg-[#F4F7FA] flex items-center justify-center text-primary"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Sub-Navigation Links Row (Exact layout from reference screenshot) */}
      <nav className="border-t border-white/10 bg-[#0B153B] hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-7 lg:gap-9 h-9 lg:h-10">
            {navLinks.map((link) => {
              const isActive = link.href === "/" 
                ? pathname === "/" 
                : pathname === link.href || (link.href !== "/#industries" && pathname.startsWith(link.href))

              return (
                <div 
                  key={link.name}
                  className="relative group py-2"
                  onMouseEnter={() => link.dropdown && setActiveDropdown(link.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className={`text-xs font-bold transition-colors flex items-center gap-1 uppercase tracking-wider ${
                      isActive
                        ? "text-[#008C95]"
                        : "text-white/80 hover:text-[#008C95]"
                    }`}
                  >
                    {link.name}
                    {link.dropdown && (
                      <ChevronDown className="w-3 h-3 opacity-60 group-hover:rotate-180 transition-transform duration-200" />
                    )}
                  </Link>

                  {/* Active bottom line */}
                  {isActive && (
                    <motion.div 
                      layoutId="activeSubNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#008C95]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}

                  {/* Mega Dropdown with Category Icons & Descriptions */}
                  {link.dropdown && activeDropdown === link.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.99 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.99 }}
                      transition={{ duration: 0.16 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[640px] lg:w-[680px] z-50 pointer-events-auto"
                    >
                      <div className="bg-white rounded-2xl border border-[#DDE4EC] shadow-2xl overflow-hidden text-left">
                        {/* Dropdown Header */}
                        <div className="bg-[#FAF8F5] px-4 py-2.5 border-b border-[#E6E2D8] flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#008C95] animate-pulse" />
                            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0B153B]">
                              {link.name} Stock & Categories
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 text-[10px] font-semibold text-[#008C95] bg-[#008C95]/10 px-2.5 py-0.5 rounded-full border border-[#008C95]/20">
                            <ShieldCheck className="w-3 h-3" />
                            <span>Ready Stock &bull; Tested Spares</span>
                          </div>
                        </div>

                        {/* 2-Column Grid with Category Image Icons */}
                        <div className="p-3 grid grid-cols-2 gap-2 max-h-[460px] overflow-y-auto">
                          {link.dropdown.map((item: any, idx: number) => (
                            <Link 
                              key={`${link.name}-${idx}-${item.name}`} 
                              href={item.href}
                              className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#F4F7FA] border border-transparent hover:border-[#DDE4EC] transition-all group/item"
                            >
                              <div className="w-11 h-11 rounded-xl bg-[#FAF8F5] border border-black/[0.06] p-1.5 shrink-0 flex items-center justify-center group-hover/item:border-[#008C95]/40 group-hover/item:bg-white group-hover/item:shadow-2xs transition-all">
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  width={36}
                                  height={36}
                                  className="w-full h-full object-contain transition-transform duration-200 group-hover/item:scale-110"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-xs font-bold text-[#0B153B] group-hover/item:text-[#008C95] truncate transition-colors flex items-center gap-1">
                                  <span>{item.name}</span>
                                </div>
                                <div className="text-[11px] text-[#64748B] group-hover/item:text-[#0B153B]/70 truncate leading-snug">
                                  {item.desc}
                                </div>
                              </div>
                              <ArrowRight className="w-3.5 h-3.5 text-[#008C95] opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all shrink-0 ml-auto" />
                            </Link>
                          ))}
                        </div>

                        {/* Dropdown Footer CTA */}
                        <div className="bg-[#FAF8F5] px-4 py-2.5 border-t border-[#E6E2D8] flex items-center justify-between">
                          <span className="text-[11px] text-muted-foreground hidden sm:inline">
                            Direct surplus from Alang Ship Breaking Yard & OEM Overstock
                          </span>
                          <Link 
                            href={link.href} 
                            className="text-xs font-bold text-[#008C95] hover:text-[#00767E] flex items-center gap-1.5 ml-auto group/btn"
                          >
                            <span>View All {link.name} Inventory</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-black/[0.08] px-5 py-6 shadow-xl max-h-[85vh] overflow-y-auto"
          >
            <div className="space-y-4">
              <form onSubmit={handleSearch} className="relative mb-4">
                <input
                  type="text"
                  name="q"
                  placeholder="Search by Part Number/Model/Brand..."
                  className="w-full bg-[#F4F7FA] border border-black/[0.06] rounded-full px-4 py-2.5 pl-10 text-xs focus:outline-hidden focus:border-[#008C95]"
                />
                <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-3" />
              </form>

              {navLinks.map((link) => (
                <div key={link.name} className="py-1 border-b border-black/[0.04] pb-2">
                  <div className="flex items-center justify-between">
                    <Link
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-sm font-bold text-[#0B153B] hover:text-[#008C95] uppercase tracking-wide py-1"
                    >
                      {link.name}
                    </Link>
                    {link.dropdown && (
                      <button
                        type="button"
                        onClick={() => setMobileOpenSector(mobileOpenSector === link.name ? null : link.name)}
                        className="p-2 text-[#0B153B]/70 hover:text-[#008C95]"
                        aria-label={`Toggle ${link.name} categories`}
                      >
                        <ChevronDown 
                          className={`w-4 h-4 transition-transform duration-200 ${
                            mobileOpenSector === link.name ? "rotate-180 text-[#008C95]" : ""
                          }`} 
                        />
                      </button>
                    )}
                  </div>

                  {link.dropdown && mobileOpenSector === link.name && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-2.5 space-y-1.5 pl-1"
                    >
                      {link.dropdown.map((cat: any) => (
                        <Link
                          key={cat.name}
                          href={cat.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="flex items-center gap-2.5 p-2 rounded-xl bg-[#FAF8F5] hover:bg-[#F4F7FA] border border-black/[0.04] transition-colors"
                        >
                          <div className="w-9 h-9 rounded-lg bg-white border border-black/[0.06] p-1 shrink-0 flex items-center justify-center">
                            <Image
                              src={cat.image}
                              alt={cat.name}
                              width={32}
                              height={32}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-semibold text-[#0B153B] truncate">
                              {cat.name}
                            </div>
                            <div className="text-[10px] text-muted-foreground truncate">
                              {cat.desc}
                            </div>
                          </div>
                        </Link>
                      ))}
                      <Link
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="block py-2 text-xs font-bold text-[#008C95] hover:underline"
                      >
                        View All {link.name} &rarr;
                      </Link>
                    </motion.div>
                  )}
                </div>
              ))}

              <div className="pt-4 border-t border-black/[0.08]">
                <Link
                  href="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-center rounded-full bg-[#0B153B] text-white py-3 text-xs font-bold tracking-wider uppercase hover:bg-[#008C95] transition-colors shadow-xs"
                >
                  Request for Quotes
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  )
}
