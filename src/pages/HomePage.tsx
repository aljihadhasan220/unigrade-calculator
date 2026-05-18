import React, { memo } from 'react';
import { 
  Plus, 
  ChevronDown, 
  Globe, 
  ShieldCheck, 
  Zap, 
  Activity,
} from 'lucide-react';
import { motion } from 'motion/react';
import { GRADING_SYSTEMS } from '../types';
import { GlassCard, Button } from '../components/UI';
import { CalculatorPanel } from '../components/CalculatorPanel';
import { SEO } from '../components/SEO';

export default function HomePage() {
  return (
    <div className="w-full">
      <SEO 
        title="UniGrade - Universal GPA & CGPA Calculator"
        description="Calculate your GPA, CGPA, and grade percentages with UniGrade. The most advanced universal grade calculator supporting 15+ international systems with real-time academic analytics."
        canonical="/"
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "UniGrade",
            "url": "https://unigrade.site",
            "description": "Universal grade calculator for GPA, CGPA, and Percentage conversions across international grading systems.",
            "applicationCategory": "EducationalApplication",
            "operatingSystem": "All",
            "offers": { "@type": "Offer", "price": "0" }
          },
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "UniGrade",
            "url": "https://unigrade.site",
            "logo": "https://unigrade.site/logo.png"
          }
        ]}
      />
      {/* Hero Section */}
      <section id="home" className="relative pt-32 md:pt-48 pb-16 px-4 md:px-6 w-full gpu-accelerate">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left max-w-2xl"
          >
            <h1 className="text-[2.3rem] sm:text-5xl md:text-7xl font-extrabold text-[#111827] leading-[1.15] mb-6 font-display tracking-tight px-1 sm:px-0">
              Universal Grade <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Calculator</span>
            </h1>
            <p className="text-base md:text-lg text-gray-500 mb-8 max-w-lg mx-auto lg:mx-0 font-medium leading-normal px-4 sm:px-0">
              Worldwide GPA & Percentage conversion engine with real-time academic analytics. Precision-built for global education systems.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <Button onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth', block: 'start' })} className="h-12 px-8 text-sm w-full sm:w-auto">
                Open Calculator
              </Button>
              <Button 
                onClick={() => document.getElementById('global-standards')?.scrollIntoView({ behavior: 'smooth', block: 'start' })} 
                variant="outline" 
                className="h-12 px-8 text-sm w-full sm:w-auto"
              >
                View Standards
              </Button>
            </div>
          </motion.div>

          <div className="hidden lg:flex gap-4 pr-6 shrink-0">
            <div className="flex flex-col gap-4 translate-y-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <GlassCard className="p-4 w-40 text-center animate-bounce-slow gpu-accelerate">
                   <div className="text-2xl font-bold">4.0</div>
                   <div className="text-[10px] font-bold text-gray-400 uppercase">USA System</div>
                </GlassCard>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <GlassCard className="p-4 w-40 text-center gpu-accelerate">
                   <div className="text-2xl font-bold">1st</div>
                   <div className="text-[10px] font-bold text-gray-400 uppercase">UK System</div>
                </GlassCard>
              </motion.div>
            </div>
            <div className="flex flex-col gap-4">
               <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                 <GlassCard className="p-4 w-40 text-center gpu-accelerate">
                   <div className="text-2xl font-bold">A</div>
                   <div className="text-[10px] font-bold text-gray-400 uppercase">ECTS</div>
                </GlassCard>
              </motion.div>
               <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                 <GlassCard className="p-4 w-40 text-center translate-y-10 gpu-accelerate">
                   <div className="text-2xl font-bold">10.0</div>
                   <div className="text-[10px] font-bold text-gray-400 uppercase">India</div>
                </GlassCard>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      {/* Main Calculator Section */}
      <section id="calculator" className="py-12 md:px-6 max-w-7xl mx-auto relative z-10 w-full px-4 gpu-accelerate">
        <CalculatorPanel />
      </section>
      {/* Standards Teaser */}
      <section id="global-standards" className="py-24 px-4 md:px-6 max-w-7xl mx-auto scroll-mt-24 w-full optimize-scrolling">
         <div className="text-center mb-16 px-4">
            <label className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-4 block">Engine Benchmarks</label>
            <h2 className="text-3xl md:text-5xl font-extrabold font-display mb-4 tracking-tight">Worldwide Grading Index</h2>
            <p className="text-gray-500 max-w-2xl mx-auto font-medium text-base md:text-lg">
               Compare precision benchmarks across international systems used for official conversions in 2026.
            </p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(GRADING_SYSTEMS).slice(0, 3).map(([key, system]) => (
               <GlassCard key={key} className="p-8 hover:border-primary/30 transition-all group overflow-hidden h-full flex flex-col gpu-accelerate">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                      <Globe size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-0.5">{system.name}</h4>
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none">Standardized</p>
                    </div>
                  </div>
                  <div className="space-y-3 flex-1">
                     {Object.entries(system.steps).slice(0, 4).map(([grade, point]) => (
                        <div key={grade} className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
                           <span className="font-bold text-gray-700 text-sm">Grade {grade}</span>
                           <span className="font-mono font-black text-xs text-primary">{point.toFixed(key === 'UK' ? 0 : 1)}</span>
                        </div>
                     ))}
                  </div>
                  <a href="/standards" className="mt-6 text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                     Explore Scale <Plus size={12} />
                  </a>
               </GlassCard>
            ))}
         </div>
      </section>

      {/* SEO Optimized Content Sections */}
      <section className="py-24 px-4 md:px-6 max-w-7xl mx-auto w-full optimize-scrolling border-t border-gray-100/50 gpu-accelerate">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <GlassCard className="p-8 h-full">
              <h2 className="text-2xl font-extrabold mb-4 font-display text-gray-900">Grade Calculator</h2>
              <p className="text-gray-500 text-sm leading-relaxed font-medium">
                Our universal grade calculator is designed for students worldwide to track and manage their academic results with precision. Convert letter grades into numerical GPA values instantly across 15+ different international standards.
              </p>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <GlassCard className="p-8 h-full">
              <h2 className="text-2xl font-extrabold mb-4 font-display text-gray-900">Weighted Grade Calculator</h2>
              <p className="text-gray-500 text-sm leading-relaxed font-medium">
                Use the weighted grade calculator to account for varying course credits and importance. By inputting the specific weight of each assignment or exam, you get a reflective data point of your semester's true performance.
              </p>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <GlassCard className="p-8 h-full">
              <h2 className="text-2xl font-extrabold mb-4 font-display text-gray-900">Final Grade Calculator</h2>
              <p className="text-gray-500 text-sm leading-relaxed font-medium">
                Plan your success with the UniGrade final grade calculator. Reverse-engineer your targets to find out exactly what marks you need on your upcoming finals to achieve your desired GPA goal or maintain your honors status.
              </p>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <GlassCard className="p-8 h-full">
              <h2 className="text-2xl font-extrabold mb-4 font-display text-gray-900">Test Grade Calculator</h2>
              <p className="text-gray-500 text-sm leading-relaxed font-medium">
                Our test grade calculator allows you to log individual scores for quizzes, midterms, and lab reports. Gain real-time insights into how each specific testing metric influences your overall grade percentage throughout the term.
              </p>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="pt-10 pb-20 px-4 max-w-7xl mx-auto border-t border-gray-100 w-full optimize-scrolling gpu-accelerate">

         <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 items-center opacity-50 grayscale hover:grayscale-0 transition-all">
            <div className="flex items-center gap-3">
               <ShieldCheck size={24} className="text-gray-400" />
               <span className="font-black text-xs uppercase tracking-widest">Secure Calc</span>
            </div>
            <div className="flex items-center gap-3">
               <Globe size={24} className="text-gray-400" />
               <span className="font-black text-xs uppercase tracking-widest">Global Ready</span>
            </div>
            <div className="flex items-center gap-3">
               <Zap size={24} className="text-gray-400" />
               <span className="font-black text-xs uppercase tracking-widest">Real-time</span>
            </div>
            <div className="flex items-center gap-3">
               <Activity size={24} className="text-gray-400" />
               <span className="font-black text-xs uppercase tracking-widest">Verified Math</span>
            </div>
         </div>
      </section>
    </div>
  );
}
