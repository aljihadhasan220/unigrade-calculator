import React from 'react';
import { motion } from 'motion/react';
import { GlassCard } from '../components/UI';
import { ClipboardCheck, PieChart, Info, BookOpen } from 'lucide-react';
import BackButton from '../components/BackButton';
import { SEO } from '../components/SEO';
import { CalculatorPanel } from '../components/CalculatorPanel';

export default function TestGradeCalculatorPage() {
  return (
    <div className="pt-24 md:pt-36 pb-12 md:pb-24 px-4 md:px-6 gpu-accelerate">
      <SEO 
        title="Test Grade Calculator | UniGrade"
        description="Quickly calculate quiz, assignment, and test grades with real-time academic analysis. Convert raw scores to percentages and letter grades."
        canonical="/test-grade-calculator"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Test Grade Calculator",
          "description": "Instantly convert raw quiz/test scores to grades.",
          "applicationCategory": "EducationalApplication",
          "operatingSystem": "All",
          "url": "https://unigrade.site/test-grade-calculator",
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
              <ClipboardCheck size={14} />
              <span>Assessment Analysis</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold font-display mb-6 tracking-tight text-[#111827]">
              Test Grade Calculator
            </h1>
            <p className="text-lg md:text-xl text-gray-500 max-w-2xl font-medium leading-relaxed">
              Instantly convert quiz scores, raw marks, and assignment results into standardized percentages and letter grades.
            </p>
          </motion.div>
        </div>

        {/* Calculator Widget */}
        <section className="mb-24">
          <CalculatorPanel title="Test Grade Logger" subtitle="Quick Assessment" />
        </section>

        {/* Informational Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          <div className="p-6 rounded-2xl bg-white border border-gray-100 flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
               <PieChart size={20} />
            </div>
            <h4 className="font-bold text-[#111827] mb-2 text-sm">Percentage Scoring</h4>
            <p className="text-xs text-gray-400 leading-relaxed font-medium">Convert (Correct / Total) into a percentage score instantly.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-gray-100 flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full bg-secondary/10 text-secondary flex items-center justify-center mb-4">
               <BookOpen size={20} />
            </div>
            <h4 className="font-bold text-[#111827] mb-2 text-sm">Letter Conversions</h4>
            <p className="text-xs text-gray-400 leading-relaxed font-medium">See how your raw score translates to A, B, C, or D grades.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-gray-100 flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center mb-4">
               <Info size={20} />
            </div>
            <h4 className="font-bold text-[#111827] mb-2 text-sm">Grade Interpretation</h4>
            <p className="text-xs text-gray-400 leading-relaxed font-medium">Understand what your score means for your overall course trajectory.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-gray-100 flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center mb-4">
               <ClipboardCheck size={20} />
            </div>
            <h4 className="font-bold text-[#111827] mb-2 text-sm">Historical Tracking</h4>
            <p className="text-xs text-gray-400 leading-relaxed font-medium">Save your quiz history to see how you're improving over time.</p>
          </div>
        </div>

        {/* Content Section */}
        <motion.div
           initial={{ opacity: 0, scale: 0.98 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="mb-24"
        >
          <GlassCard className="p-10 md:p-12">
            <h2 className="text-3xl font-extrabold font-display text-[#111827] mb-6">Test Scoring Examples</h2>
            <div className="overflow-hidden rounded-2xl border border-gray-100">
               <table className="w-full text-left text-sm">
                 <thead className="bg-gray-50 text-[10px] font-black uppercase tracking-widest text-gray-400">
                   <tr>
                     <th className="px-6 py-4">Score Range</th>
                     <th className="px-6 py-4">Percentage</th>
                     <th className="px-6 py-4">Letter Grade</th>
                     <th className="px-6 py-4">Status</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50 font-medium text-gray-500">
                   <tr>
                     <td className="px-6 py-4">90 - 100</td>
                     <td className="px-6 py-4">90% - 100%</td>
                     <td className="px-6 py-4 text-primary font-bold">A</td>
                     <td className="px-6 py-4">Outstanding</td>
                   </tr>
                   <tr>
                     <td className="px-6 py-4">80 - 89</td>
                     <td className="px-6 py-4">80% - 89%</td>
                     <td className="px-6 py-4 text-primary font-bold">B</td>
                     <td className="px-6 py-4">Commendable</td>
                   </tr>
                   <tr>
                     <td className="px-6 py-4">70 - 79</td>
                     <td className="px-6 py-4">70% - 79%</td>
                     <td className="px-6 py-4 text-primary font-bold">C</td>
                     <td className="px-6 py-4">Satisfactory</td>
                   </tr>
                   <tr>
                     <td className="px-6 py-4">Below 60</td>
                     <td className="px-6 py-4">&lt; 60%</td>
                     <td className="px-6 py-4 text-red-500 font-bold">F</td>
                     <td className="px-6 py-4 text-red-400">Failure</td>
                   </tr>
                 </tbody>
               </table>
            </div>
          </GlassCard>
        </motion.div>

        {/* Bottom CTA / Links */}
        <div className="border-t border-gray-100 pt-12 flex flex-wrap justify-center gap-6 text-sm font-bold text-gray-400">
           <a href="/grade-calculator" className="hover:text-primary transition-colors">Grade Calculator</a>
           <span>•</span>
           <a href="/weighted-grade-calculator" className="hover:text-primary transition-colors">Weighted Calculator</a>
           <span>•</span>
           <a href="/final-grade-calculator" className="hover:text-primary transition-colors">Final Grade Calculator</a>
        </div>
      </div>
    </div>
  );
}
