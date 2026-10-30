"use client"

import React, { useState, useRef, useEffect } from "react"
import { Headset, X, Send, Bot, User as UserIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import Link from "next/link"

type Message = {
  role: "user" | "model"
  content: string
}

function parseTextWithLinks(text: string) {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
  const parts = []
  let lastIndex = 0
  let match

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index))
    }

    parts.push(
      <Link
        key={`link-${match.index}`}
        href={match[2]}
        className="text-accent underline hover:text-accent/80 font-medium"
      >
        {match[1]}
      </Link>
    )
    lastIndex = match.index + match[0].length
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex))
  }

  return parts.length > 0 ? parts : text
}

export function AiChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      content: "Hello! I'm the Tawwakal Automation Assistant. I can help you find marine equipment, ship spare parts, industrial automation products, or guide you in submitting a quote request. How can I assist you today?"
    }
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isOpen])

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput("")
    setMessages(prev => [...prev, { role: "user", content: userMessage }])
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          messages: [...messages, { role: "user", content: userMessage }] 
        })
      })

      if (!response.ok) throw new Error("Failed to send message")
      
      const data = await response.json()
      
      setMessages(prev => [...prev, { role: "model", content: data.content }])
    } catch (error) {
      console.error("Chat Error:", error)
      setMessages(prev => [
        ...prev, 
        { role: "model", content: "Sorry, I'm having trouble connecting right now. Please submit your enquiry through our Contact page or try again later." }
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-24 right-6 z-50 p-3.5 bg-accent text-white rounded-full shadow-xl hover:scale-105 transition-all duration-300",
          isOpen ? "scale-0 opacity-0 pointer-events-none" : "scale-100 opacity-100"
        )}
        aria-label="Open AI Assistant"
      >
        <Headset size={24} />
      </button>

      {/* Chat Window */}
      <div
        className={cn(
          "fixed bottom-24 right-6 z-50 w-[90vw] max-w-[400px] h-[550px] max-h-[75vh] flex flex-col shadow-2xl transition-all duration-300 transform origin-bottom-right rounded-lg overflow-hidden border border-border bg-white",
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="bg-[#0B153B] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Bot size={22} className="text-accent" />
            <div>
              <h3 className="font-bold text-sm leading-tight text-white uppercase tracking-wider">Tawwakal Assistant</h3>
              <p className="text-[10px] text-white/60">Marine & Industrial Sourcing Support</p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="hover:bg-white/10 p-1 rounded transition-colors text-white/80 hover:text-white"
            aria-label="Close assistant"
          >
            <X size={18} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#F4F7FA]">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={cn(
                "flex gap-2.5 max-w-[85%]",
                msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
              )}
            >
              <div className={cn(
                "w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs",
                msg.role === "user" ? "bg-[#0B153B] text-white" : "bg-white text-[#0B153B] border border-border"
              )}>
                {msg.role === "user" ? <UserIcon size={14} /> : <Bot size={14} className="text-accent" />}
              </div>
              <div className={cn(
                "p-3 rounded text-xs whitespace-pre-wrap shadow-sm leading-relaxed",
                msg.role === "user" 
                  ? "bg-[#0B153B] text-white" 
                  : "bg-white border border-border text-foreground"
              )}>
                {parseTextWithLinks(msg.content)}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-2.5 max-w-[85%] mr-auto">
              <div className="w-7 h-7 rounded-full bg-white text-[#0B153B] border border-border flex items-center justify-center shrink-0">
                <Bot size={14} className="text-accent" />
              </div>
              <div className="p-3 rounded bg-white border border-border flex items-center gap-1.5 h-[38px] px-3">
                <div className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 bg-white border-t border-border">
          <form onSubmit={handleSend} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about products, parts, or RFQ..."
              className="flex-1 text-xs bg-[#F4F7FA] border-border"
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              size="icon" 
              disabled={!input.trim() || isLoading}
              className="bg-accent hover:bg-accent/90 text-white shrink-0 h-9 w-9"
            >
              <Send size={15} />
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
