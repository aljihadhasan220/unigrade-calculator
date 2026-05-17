import React, { useState } from 'react';
import { motion } from 'motion/react';
import { GlassCard, Button } from '../components/UI';
import { Info, Globe, Mail, CheckCircle, AlertCircle } from 'lucide-react';
import BackButton from '../components/BackButton';
import { SEO } from '../components/SEO';

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("https://formspree.io/f/maqvggrr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setStatus('success');
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <div className="pt-24 md:pt-36 pb-12 md:pb-24 px-4 md:px-6">
      <SEO 
        title="Contact UniGrade Support"
        description="Get in touch with the UniGrade support team for grading queries, feedback, or enterprise integration requests."
        canonical="/contact"
      />
      <div className="max-w-7xl mx-auto">
        <BackButton />
        <GlassCard className="p-6 md:p-16 border-2 border-primary/5">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-10 md:gap-16">
            <div>
              <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-4 block">Get in Touch</label>
              <h1 className="text-4xl md:text-5xl font-extrabold font-display mb-6 tracking-tight">Have questions or feedback?</h1>
              <p className="text-gray-500 mb-10 font-medium text-lg lg:max-w-md">
                Our support team is always ready to help with grading issues or feature requests. We aim to respond within 24 hours.
              </p>
              
              <div className="space-y-8">
                {[
                  { icon: Mail, title: "Support Email", value: "support@unigrade.com" },
                  { icon: Globe, title: "Global Office", value: "Toronto, Canada" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400">
                      <item.icon size={22} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1.5">{item.title}</p>
                      <p className="font-bold text-gray-800 text-lg">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-tight ml-1">Full Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    required 
                    placeholder="John Doe" 
                    className="w-full bg-white border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all font-medium"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-tight ml-1">Email Address</label>
                  <input 
                    type="email" 
                    name="email" 
                    required 
                    placeholder="john@example.com" 
                    className="w-full bg-white border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all font-medium"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-tight ml-1">Subject</label>
                <input 
                  type="text" 
                  name="subject" 
                  required 
                  placeholder="Grading System Request" 
                  className="w-full bg-white border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all font-medium"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-tight ml-1">Your Message</label>
                <textarea 
                  name="message" 
                  required 
                  placeholder="How can we help you today?" 
                  rows={6}
                  className="w-full bg-white border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all font-medium resize-none text-base"
                />
              </div>

              {status === 'success' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl"
                >
                  <p className="text-emerald-700 text-sm font-bold flex items-center gap-2">
                    <CheckCircle size={16} /> Message sent successfully! We'll get back to you soon.
                  </p>
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-50 border border-red-100 rounded-xl"
                >
                  <p className="text-red-700 text-sm font-bold flex items-center gap-2">
                    <AlertCircle size={16} /> Failed to send message. Please try again.
                  </p>
                </motion.div>
              )}

              <Button 
                type="submit" 
                disabled={status === 'loading'}
                className="w-full h-14 uppercase tracking-widest text-xs font-black disabled:opacity-70"
              >
                {status === 'loading' ? 'Sending...' : 'Send Secure Message'}
              </Button>
            </form>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
