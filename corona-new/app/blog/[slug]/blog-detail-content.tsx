"use client"

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeft, Calendar, User, Share2, Mail } from 'lucide-react';

export default function BlogDetailContent({ blog }: { blog: any }) {
  return (
    <main className="min-h-screen pb-16">
      {/* Blog Hero Header */}
      <header className="relative pt-8 sm:pt-10 pb-6 bg-[#0B153B] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#008C95] uppercase tracking-wider mb-4 hover:text-white transition-colors">
            <ChevronLeft className="w-4 h-4" /> Back to Articles
          </Link>
          <h1 className="font-sans font-black text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight leading-tight mb-4">
            {blog.title}
          </h1>
          <div className="flex flex-wrap items-center gap-5 text-white/70 text-xs font-semibold uppercase tracking-wider border-t border-white/10 pt-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#008C95]" />
              {new Date(blog.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-[#008C95]" />
              Tawwakal Technical Desk
            </div>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8">
        {blog.image && (
          <div className="aspect-[16/9] relative rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-sm mb-8 bg-muted">
            <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="prose max-w-none text-foreground/85 leading-relaxed text-xs sm:text-sm space-y-4">
          <div className="p-5 rounded-2xl bg-[#FAF8F5] border-l-4 border-[#008C95] text-sm sm:text-base font-medium text-[#0B153B]">
            {blog.excerpt}
          </div>
          
          <div 
            className="space-y-4 text-xs sm:text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ 
              __html: blog.content || `<p>${blog.excerpt}</p><p>For further technical guidance regarding this equipment topic or specific spare parts availability, contact the Tawwakal Automation sourcing team.</p>` 
            }} 
          />
        </div>
        
        {/* Author & CTA Footer */}
        <div className="mt-12 p-5 sm:p-6 rounded-2xl bg-[#FAF8F5] border border-[#E2E8F0] flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0B153B] text-[#008C95] flex items-center justify-center font-bold text-xs shrink-0">
              TA
            </div>
            <div>
              <h4 className="font-bold text-[#0B153B] uppercase text-xs">Tawwakal Automation</h4>
              <p className="text-[11px] text-muted-foreground">Marine &amp; Industrial Equipment Supplier</p>
            </div>
          </div>
          <Link 
            href="/contact" 
            className="px-5 py-2.5 bg-[#008C95] hover:bg-[#007077] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow-sm shrink-0"
          >
            Enquire About This Subject
          </Link>
        </div>
      </article>
    </main>
  );
}
