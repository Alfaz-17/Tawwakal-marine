'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { FileText, CheckCircle2 } from 'lucide-react';

export function EnquiryModal({ productName }: { productName?: string }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      company: formData.get('company'),
      message: formData.get('message'),
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => {
          setOpen(false);
          setSuccess(false);
        }, 2200);
      } else {
        alert('Failed to send enquiry. Please try again.');
      }
    } catch (error) {
      console.error(error);
      alert('Error sending enquiry.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="w-full md:w-auto bg-primary hover:bg-accent text-white font-semibold uppercase text-xs tracking-wider rounded-full px-7 py-3 transition-all duration-300">
          <FileText className="w-4 h-4 mr-2" />
          Enquire Now
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px] bg-white border border-black/[0.08] rounded-[32px] p-6 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-base font-bold text-[#0B153B] uppercase tracking-wider">
            Enquire About {productName || 'Equipment & Spares'}
          </DialogTitle>
        </DialogHeader>
        {success ? (
          <div className="text-center py-8">
            <CheckCircle2 className="w-12 h-12 text-accent mx-auto mb-3" />
            <p className="font-bold text-[#0B153B] uppercase text-sm">Enquiry Submitted</p>
            <p className="text-xs text-muted-foreground mt-1">Our technical team will review your requirement and follow up.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5 mt-2">
            <div className="space-y-1">
              <Label htmlFor="name" className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Full Name *</Label>
              <Input id="name" name="name" required placeholder="Contact name" className="text-xs bg-[#F4F7FA]" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email" className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Business Email *</Label>
              <Input id="email" name="email" type="email" required placeholder="procurement@company.com" className="text-xs bg-[#F4F7FA]" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="phone" className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Phone Number</Label>
                <Input id="phone" name="phone" type="tel" placeholder="+971 XX XXX XXXX" className="text-xs bg-[#F4F7FA]" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="company" className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Company Name</Label>
                <Input id="company" name="company" placeholder="Business Name" className="text-xs bg-[#F4F7FA]" />
              </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="message" className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Requirement Details *</Label>
              <Textarea 
                id="message" 
                name="message" 
                required 
                rows={3}
                placeholder="Include specifications, required quantity, or delivery port..." 
                defaultValue={productName ? `I am interested in ${productName}. Please share availability and commercial quotation.` : ''}
                className="text-xs bg-[#F4F7FA] resize-none"
              />
            </div>
            <Button type="submit" className="w-full bg-[#0B153B] hover:bg-accent text-white font-bold uppercase text-xs tracking-wider" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Enquiry'}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
