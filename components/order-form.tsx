"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, FileText, Check, Loader2 } from "lucide-react"
import api from "@/lib/api"

interface OrderFormProps {
  productId: string
  productTitle: string
  onClose?: () => void
}

export function OrderForm({ productId, productTitle, onClose }: OrderFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  
  const [formData, setFormData] = useState({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    quantity: 1,
    notes: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      await api.post("/orders", {
        customerName: formData.customerName,
        customerPhone: formData.customerPhone,
        customerEmail: formData.customerEmail,
        items: [{
          product: productId,
          productTitle: productTitle,
          quantity: formData.quantity
        }],
        notes: formData.notes
      })

      setSuccess(true)
      setTimeout(() => {
        setIsOpen(false)
        setSuccess(false)
        setFormData({
          customerName: "",
          customerPhone: "",
          customerEmail: "",
          quantity: 1,
          notes: ""
        })
      }, 2500)
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to submit quotation request. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full py-4 bg-primary hover:bg-accent text-white font-semibold uppercase tracking-wider text-xs transition-all duration-300 flex items-center justify-center gap-2 rounded-full shadow-md hover:shadow-lg"
      >
        <FileText className="w-4 h-4" />
        Request a Quote for this Item
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-primary/70 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => !loading && setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white w-full max-w-md p-6 sm:p-8 rounded-[32px] border border-black/[0.08] shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => !loading && setIsOpen(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-primary transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              {success ? (
                <div className="text-center py-8">
                  <div className="w-14 h-14 bg-accent/20 text-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0B153B] mb-2 uppercase tracking-wide">
                    Quotation Request Received
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Our team will review your requirement for <strong>{productTitle}</strong> and follow up with commercial terms.
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-5 pb-3 border-b border-border">
                    <span className="text-accent text-[10px] font-bold uppercase tracking-widest block mb-1">B2B RFQ</span>
                    <h2 className="text-lg font-bold text-[#0B153B] uppercase tracking-tight">Request Quotation</h2>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{productTitle}</p>
                  </div>

                  {error && (
                    <div className="mb-4 p-3 bg-red-50 text-red-600 text-xs border border-red-200 rounded">
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-3.5">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                        Contact / Company Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.customerName}
                        onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#F4F7FA] border border-border focus:border-accent focus:outline-none text-xs rounded"
                        placeholder="e.g. Acme Marine Services"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.customerPhone}
                          onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-[#F4F7FA] border border-border focus:border-accent focus:outline-none text-xs rounded"
                          placeholder="+971 XX XXX XXXX"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                          Business Email
                        </label>
                        <input
                          type="email"
                          value={formData.customerEmail}
                          onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-[#F4F7FA] border border-border focus:border-accent focus:outline-none text-xs rounded"
                          placeholder="procurement@company.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                        Required Quantity
                      </label>
                      <div className="flex items-center border border-border rounded overflow-hidden">
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, quantity: Math.max(1, formData.quantity - 1) })}
                          className="w-10 h-9 flex items-center justify-center text-primary bg-[#F4F7FA] hover:bg-muted text-base font-bold"
                        >
                          −
                        </button>
                        <span className="flex-1 text-center text-xs font-bold text-primary">
                          {formData.quantity} unit(s)
                        </span>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, quantity: formData.quantity + 1 })}
                          className="w-10 h-9 flex items-center justify-center text-primary bg-[#F4F7FA] hover:bg-muted text-base font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                        Requirement Details / Delivery Notes
                      </label>
                      <textarea
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#F4F7FA] border border-border focus:border-accent focus:outline-none text-xs rounded resize-none"
                        rows={2}
                        placeholder="Mention serial numbers, voltage, vessel details, or port of delivery..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 bg-accent text-white font-bold uppercase tracking-wider text-xs hover:bg-accent/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 rounded shadow-sm"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Submitting Enquiry...
                        </>
                      ) : (
                        "Submit Quotation Request"
                      )}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
