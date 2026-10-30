"use client"

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, Calendar, ArrowRight, BookOpen } from 'lucide-react';
import api from '@/lib/api';
import { MarineLoader } from '@/components/common/marine-loader';

export default function BlogContent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await api.get('/blogs');
        if (Array.isArray(data)) {
          setBlogs(data);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const filteredBlogs = useMemo(() => {
    return blogs.filter(blog =>
      blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, blogs]);

  if (loading) return <MarineLoader />;

  return (
    <main className="min-h-screen pb-16">
      {/* Page Hero Header */}
      <div className="pt-8 sm:pt-10 pb-4 text-center relative overflow-hidden bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 text-[11px] font-extrabold tracking-[0.2em] uppercase text-accent mb-2"
          >
            <span>Knowledge Base</span>
            </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl tracking-tight text-primary uppercase leading-tight mb-2 max-w-4xl mx-auto"
          >
            TECHNICAL INSIGHTS &amp; GUIDES
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed"
          >
            Practical articles, equipment sourcing guides, and maintenance considerations for marine and industrial operations.
          </motion.p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-xl mx-auto px-4 sm:px-6 mt-2 relative z-20">
        <div className="bg-white rounded-2xl shadow-2xs p-1.5 border border-[#E2E8F0]">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text"
              placeholder="Search technical articles or guides..."
              className="w-full pl-9 pr-3.5 py-2 outline-none text-xs font-medium bg-[#FAF8F5]/60 focus:bg-white rounded-xl transition-colors"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {filteredBlogs.length > 0 ? (
          <div className="space-y-8">
            {/* Featured Post */}
            <motion.article 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid lg:grid-cols-2 gap-6 sm:gap-8 items-center bg-white rounded-2xl border border-[#E2E8F0] p-5 sm:p-7 shadow-2xs"
            >
              <div className="aspect-[16/10] relative overflow-hidden rounded-xl bg-muted">
                {filteredBlogs[0].image ? (
                  <img src={filteredBlogs[0].image} alt={filteredBlogs[0].title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[#FAF8F5] text-muted-foreground">
                    <BookOpen className="w-10 h-10 text-accent" />
                  </div>
                )}
              </div>
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-wider">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(filteredBlogs[0].date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-[#0B153B] uppercase tracking-tight">
                  {filteredBlogs[0].title}
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {filteredBlogs[0].excerpt}
                </p>
                <div className="pt-2">
                  <Link 
                    href={`/blog/${filteredBlogs[0].slug || filteredBlogs[0]._id}`} 
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0B153B] hover:bg-accent text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors"
                  >
                    <span>Read Full Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.article>

            {/* Post Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBlogs.slice(1).map((blog, index) => (
                <motion.article 
                  key={blog._id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden hover:border-[#008C95] hover:shadow-md transition-all flex flex-col justify-between shadow-2xs"
                >
                  <div>
                    <div className="aspect-[16/10] relative overflow-hidden bg-muted">
                      {blog.image ? (
                        <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-[#FAF8F5]">
                          <BookOpen className="w-8 h-8 text-accent" />
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-1.5 text-accent text-[11px] font-bold uppercase tracking-wider mb-2">
                        <Calendar className="w-3 h-3" />
                        {new Date(blog.date).toLocaleDateString()}
                      </div>
                      <h3 className="text-xs sm:text-sm font-bold text-[#0B153B] uppercase tracking-tight line-clamp-2 mb-2">
                        <Link href={`/blog/${blog.slug || blog._id}`} className="hover:text-accent transition-colors">
                          {blog.title}
                        </Link>
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                        {blog.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <Link 
                      href={`/blog/${blog.slug || blog._id}`} 
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#008C95] hover:text-[#0B153B] transition-colors"
                    >
                      <span>Read Guide</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-16 border border-dashed border-[#E2E8F0] rounded-2xl bg-white p-6 sm:p-8">
            <h3 className="text-sm sm:text-base font-bold text-[#0B153B] uppercase mb-2">No Articles Found</h3>
            <p className="text-xs text-muted-foreground">Technical publications will be listed here as they are published.</p>
          </div>
        )}
      </section>
    </main>
  );
}
