import React from 'react';
import { motion } from 'motion/react';
import { GlassCard } from '../components/UI';
import { Globe, ShieldCheck } from 'lucide-react';
import BackButton from '../components/BackButton';
import { SEO } from '../components/SEO';

export default function AboutPage() {
  return (
    <div className="pt-24 md:pt-36 pb-12 md:pb-24 px-4 md:px-6">
      <SEO 
        title="About UniGrade | Global Academic Analytics"
        description="Learn about UniGrade's mission to provide students with precision academic tools and worldwide grading standards visibility."
        canonical="/about"
      />
      <div className="max-w-7xl mx-auto">
        <BackButton />
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-12">
          <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex-1"
        >
          <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-4 block">Our Mission</label>
          <h1 className="text-4xl md:text-6xl font-extrabold font-display mb-8">Precision Academic Analytics for Everyone.</h1>
          <div className="space-y-6 text-gray-500 font-medium text-lg leading-relaxed">
            <p>
              UniGrade was born out of a simple need: a reliable, universal way for students to track their academic progress without complex spreadsheets or restricted institutional software.
            </p>
            <p>
              Whether you're studying in the USA, UK, India, or Europe, our platform provides instant <a href="/grade-calculator" className="text-primary hover:underline font-bold">GPA</a>, <a href="/weighted-grade-calculator" className="text-primary hover:underline font-bold">CGPA</a>, and percentage conversion following international benchmarks.
            </p>
            <p>
              We prioritize accuracy and simplicity, ensuring your data stays private and accessible. All calculations happen locally in your browser, keeping your academic records secure. If you have questions, feel free to <a href="/contact" className="text-primary hover:underline font-bold">contact our support team</a>.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
            <GlassCard className="p-8">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                <Globe size={24} />
              </div>
              <h3 className="font-bold text-xl mb-2">Global Standards</h3>
              <p className="text-sm text-gray-400">Supporting over 10+ international grading benchmarks updated for 2026.</p>
            </GlassCard>
            <GlassCard className="p-8">
              <div className="w-12 h-12 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center mb-6">
                <ShieldCheck size={24} />
              </div>
              <h3 className="font-bold text-xl mb-2">Privacy First</h3>
              <p className="text-sm text-gray-400">Zero server-side data storage. Your academic journey remains your own.</p>
            </GlassCard>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex-1 w-full"
        >
           <GlassCard className="p-2 overflow-hidden border-2 border-primary/5">
              <img 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1470&auto=format&fit=crop" 
                alt="Students collaborating" 
                className="w-full h-[280px] md:h-[600px] object-cover rounded-[18px]"
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
              />
            </GlassCard>
        </motion.div>
      </div>
    </div>
  </div>
  );
}
