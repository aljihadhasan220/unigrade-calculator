import React from 'react';
import { motion } from 'motion/react';
import { GlassCard } from '../components/UI';
import { Target, Flag, Lightbulb, Info } from 'lucide-react';
import BackButton from '../components/BackButton';
import { SEO } from '../components/SEO';
import { CalculatorPanel } from '../components/CalculatorPanel';

export default function FinalGradeCalculatorPage() {
  return (
    <div className="pt-24 md:pt-36 pb-12 md:pb-24 px-4 md:px-6 gpu-accelerate">
      <SEO 
        title="Final Grade Calculator | UniGrade"
        description="Calculate the grade you need on your final exam to achieve your target GPA or course score. Plan your success with precision academic targets."
        canonical="/final-grade-calculator"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Final Grade Calculator",
          "description": "Calculate required final exam grades for target goals.",
          "applicationCategory": "EducationalApplication",
          "operatingSystem": "All",
          "url": "https://unigrade.site/final-grade-calculator",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
        }}
      />
      
      <div className="max-w-7xl mx-auto">
        <BackButton />
        
        {/* Hero Section */}
        <div className="mb-16 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 text-primary text-xs font-bold uppercase tracking-wider mb-6">
              <Target size={14} />
              <span>Target Planning</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold font-display mb-6 tracking-tight text-[#111827]">
              Final Grade Calculator
            </h1>
            <p className="text-lg md:text-xl text-gray-500 max-w-2xl font-medium leading-relaxed">
              Find out exactly what score you need on your upcoming finals to hit your target GPA and maintain your honors status.
            </p>
          </motion.div>
        </div>

        {/* Calculator Widget */}
        <section className="mb-24">
          <CalculatorPanel title="Final Grade Planner" subtitle="Goal Setting" />
        </section>

        {/* Informational Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          <GlassCard className="p-10 border-none bg-[#111827] text-white">
            <div className="flex items-start gap-4 mb-8">
               <div className="p-3 bg-primary/20 rounded-xl text-primary">
                  <Flag size={24} />
               </div>
               <div>
                  <h3 className="text-2xl font-extrabold font-display">How to Predict Finals</h3>
                  <p className="text-gray-400 mt-2 text-sm leading-relaxed">Reverse-engineering your grades helps reduce exam stress by providing a clear numerical target.</p>
               </div>
            </div>
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-[10px] font-black uppercase text-primary mb-1 block">Goal Scenario A</span>
                <p className="text-sm font-bold">To maintain a 3.5 GPA, you might need an 88% on your final.</p>
              </div>
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-[10px] font-black uppercase text-secondary mb-1 block">Goal Scenario B</span>
                <p className="text-sm font-bold">To reach a 4.0 GPA, you might require a perfect 100% score.</p>
              </div>
            </div>
          </GlassCard>

          <div className="space-y-8">
            <div className="p-8 rounded-3xl bg-primary/5 border border-primary/10">
              <div className="flex items-center gap-3 mb-4">
                 <Lightbulb className="text-primary" size={24} />
                 <h3 className="text-xl font-extrabold font-display text-[#111827]">Academic Planning Tips</h3>
              </div>
              <p className="text-gray-500 font-medium text-sm leading-relaxed">
                Prioritize studying for courses where a slight grade increase has the most significant impact on your overall GPA. Focus on high-credit courses with upcoming "heavy" finals.
              </p>
            </div>
            
            <div className="p-8 rounded-3xl bg-secondary/5 border border-secondary/10">
              <div className="flex items-center gap-3 mb-4">
                 <Info className="text-secondary" size={24} />
                 <h3 className="text-xl font-extrabold font-display text-[#111827]">Required Score Formula</h3>
              </div>
              <p className="text-gray-500 font-medium text-sm leading-relaxed">
                Required = (Target − (Current × (1 − Final_Weight))) / Final_Weight. Our engine handles this complex math instantly.
              </p>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <section className="mb-24">
          <h2 className="text-3xl font-extrabold font-display text-center text-[#111827] mb-12">Finals FAQ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <GlassCard className="p-8">
                <h4 className="font-bold text-lg mb-2 text-[#111827]">What if I need more than 100%?</h4>
                <p className="text-gray-500 text-sm leading-relaxed">If the calculator shows you need more than 100%, it means your target GPA is mathematically impossible to reach with the remaining weights. Try adjusting your goal or checking for extra credit opportunities.</p>
             </GlassCard>
             <GlassCard className="p-8">
                <h4 className="font-bold text-lg mb-2 text-[#111827]">Are these results 100% accurate?</h4>
                <p className="text-gray-500 text-sm leading-relaxed">The calculator uses standard mathematical formulas. However, please verify with your professor for any specific weighting or rounding rules unique to your course.</p>
             </GlassCard>
          </div>
        </section>

        {/* Bottom CTA / Links */}
        <div className="border-t border-gray-100 pt-12 flex flex-wrap justify-center gap-6 text-sm font-bold text-gray-400">
           <a href="/grade-calculator" className="hover:text-primary transition-colors">Grade Calculator</a>
           <span>•</span>
           <a href="/weighted-grade-calculator" className="hover:text-primary transition-colors">Weighted Calculator</a>
           <span>•</span>
           <a href="/test-grade-calculator" className="hover:text-primary transition-colors">Test Grade Calculator</a>
        </div>
      </div>
    </div>
  );
}
