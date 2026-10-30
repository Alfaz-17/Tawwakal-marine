"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/components/contexts/auth-context';
import Link from 'next/link';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { Logo } from '@/components/common/logo';

export default function AdminLoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const { user, login } = useAuth();

  React.useEffect(() => {
    if (user) {
      router.push('/admin');
    }
  }, [user, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      router.push('/admin');
    } else {
      setError(result.error || 'Login failed. Please check credentials.');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0B153B] flex items-center justify-center p-6 relative">
      <div className="absolute inset-0 bg-[#0B153B]/90 backdrop-blur-sm" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white p-8 sm:p-10 rounded border border-border shadow-2xl">
          <div className="text-center mb-8 flex flex-col items-center">
            <Logo variant="dark" size="lg" className="mb-4" />
            <p className="text-[11px] font-bold text-accent tracking-[0.25em] uppercase">
              Administrative Control Panel
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs font-semibold rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#0B153B] uppercase tracking-wider">
                Admin Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="admin@tawwakalautomation.com"
                  className="w-full px-3.5 py-2.5 pl-10 border border-border focus:border-accent outline-none text-xs rounded transition-colors bg-[#F4F7FA]"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-accent" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#0B153B] uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter secure password"
                  className="w-full px-3.5 py-2.5 pl-10 pr-10 border border-border focus:border-accent outline-none text-xs rounded transition-colors bg-[#F4F7FA]"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-accent" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-accent transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-[#0B153B] hover:bg-accent text-white font-bold text-xs uppercase tracking-wider rounded transition-colors shadow-sm disabled:opacity-50 mt-2"
            >
              {isLoading ? 'Authenticating...' : 'Sign In to Dashboard'}
            </button>
          </form>
          
          <div className="mt-6 pt-6 border-t border-border text-center">
            <Link href="/" className="text-xs font-semibold text-muted-foreground hover:text-accent transition-colors">
              &larr; Return to Public Website
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
