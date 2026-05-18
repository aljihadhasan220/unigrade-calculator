import React from 'react';
import { motion } from 'motion/react';
import { GlassCard } from '../components/UI';
import { Percent, TrendingUp, HelpCircle, BookOpen } from 'lucide-react';
import BackButton from '../components/BackButton';
import { SEO } from '../components/SEO';
import { CalculatorPanel } from '../components/CalculatorPanel';

export default function WeightedGradeCalculatorPage() {
  return (
    <div className="pt-24 md:pt-36 pb-12 md:pb-24 px-4 md:px-6 gpu-accelerate">
      <SEO 
        title="Weighted Grade Calculator | UniGrade"
        description="Calculate weighted grades, weighted GPA, and academic performance accurately. Support for custom credit weightings and grading scales."
        canonical="/weighted-grade-calculator"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Weighted Grade Calculator",
          "description": "Advanced weighted grade and GPA calculation engine.",
          "applicationCategory": "EducationalApplication",
          "operatingSystem": "All",
          "url": "https://unigrade.site/weighted-grade-calculator",
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
              <Percent size={14} />
              <span>Weighting Engine</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold font-display mb-6 tracking-tight text-[#111827]">
              Weighted Grade Calculator
            </h1>
            <p className="text-lg md:text-xl text-gray-500 max-w-2xl font-medium leading-relaxed">
              Factor in the true importance of your courses and assignments with our advanced weighted averaging engine.
            </p>
          </motion.div>
        </div>

        {/* Calculator Widget */}
        <section className="mb-24">
          <CalculatorPanel title="Weighted Calculator" subtitle="Advanced Weighting" />
        </section>

        {/* Educational Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <GlassCard className="p-8">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
              <BookOpen size={24} />
            </div>
            <h3 className="font-bold text-xl mb-4 text-[#111827]">What is Weighting?</h3>
            <p className="text-sm text-gray-500 leading-relaxed font-medium">
              A weighted grade rewards the difficulty or length of a course. In most systems, a 4-credit course counts for more in your GPA than a 1-credit lab.
            </p>
          </GlassCard>

          <GlassCard className="p-8">
            <div className="w-12 h-12 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center mb-6">
              <TrendingUp size={24} />
            </div>
            <h3 className="font-bold text-xl mb-4 text-[#111827]">Weighted GPA</h3>
            <p className="text-sm text-gray-500 leading-relaxed font-medium">
              Schools often scale grades for Honors or AP courses (e.g., A = 5.0 instead of 4.0). Use our custom settings to reflect these specific scales.
            </p>
          </GlassCard>

          <GlassCard className="p-8">
            <div className="w-12 h-12 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center mb-6">
              <HelpCircle size={24} />
            </div>
            <h3 className="font-bold text-xl mb-4 text-[#111827]">Calculation Method</h3>
            <p className="text-sm text-gray-500 leading-relaxed font-medium">
              We use the (Sum of Grade Points × Credits) / (Sum of Total Credits) formula used by 99% of global universities.
            </p>
          </GlassCard>
        </div>

        {/* FAQ Section */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="max-w-3xl mx-auto mb-24"
        >
          <h2 className="text-3xl font-extrabold font-display text-center text-[#111827] mb-12">General Questions</h2>
          <div className="space-y-4">
             <GlassCard className="p-6">
                <h4 className="font-bold text-lg mb-2 text-[#111827]">How do I calculate weighted grades manually?</h4>
                <p className="text-gray-500 text-sm leading-relaxed">Multiply your grade for each task by its weight (percentage of total grade). Add these results together to find your current total score.</p>
             </GlassCard>
             <GlassCard className="p-6">
                <h4 className="font-bold text-lg mb-2 text-[#111827]">What is the difference between unweighted and weighted GPA?</h4>
                <p className="text-gray-500 text-sm leading-relaxed">Unweighted GPA treats all courses equally on a 4.0 scale. Weighted GPA adds extra points for more challenging coursework like AP classes.</p>
             </GlassCard>
          </div>
        </motion.div>

        {/* Bottom CTA / Links */}
        <div className="border-t border-gray-100 pt-12 flex flex-wrap justify-center gap-6 text-sm font-bold text-gray-400">
           <a href="/grade-calculator" className="hover:text-primary transition-colors">Standard Calculator</a>
           <span>•</span>
           <a href="/final-grade-calculator" className="hover:text-primary transition-colors">Final Grade Calculator</a>
           <span>•</span>
           <a href="/test-grade-calculator" className="hover:text-primary transition-colors">Test Grade Calculator</a>
        </div>
      </div>
    </div>
  );
}
