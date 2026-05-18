import React from 'react';
import { motion } from 'motion/react';
import { GlassCard } from '../components/UI';
import { Calculator, CheckCircle2, HelpCircle } from 'lucide-react';
import BackButton from '../components/BackButton';
import { SEO } from '../components/SEO';
import { CalculatorPanel } from '../components/CalculatorPanel';

export default function GradeCalculatorPage() {
  return (
    <div className="pt-24 md:pt-36 pb-12 md:pb-24 px-4 md:px-6 gpu-accelerate">
      <SEO 
        title="Grade Calculator | UniGrade"
        description="A complete online grade calculator for GPA, CGPA, grades, and percentages. Supporting international systems with precision analytics."
        canonical="/grade-calculator"
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
              <Calculator size={14} />
              <span>Universal Engine</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold font-display mb-6 tracking-tight text-[#111827]">
              Universal Grade Calculator
            </h1>
            <p className="text-lg md:text-xl text-gray-500 max-w-2xl font-medium leading-relaxed">
              Plan, track, and optimize your academic journey with our precision-engineered grade calculation system.
            </p>
          </motion.div>
        </div>

        {/* Calculator Widget */}
        <section className="mb-24">
          <CalculatorPanel title="Grade Calculator" subtitle="Main Engine" />
        </section>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-extrabold font-display text-[#111827] mb-6">How to use the Grade Calculator</h2>
            <div className="space-y-4 text-gray-500 font-medium leading-relaxed">
              <p>Using UniGrade is simple and intuitive. Follow these steps to get your results:</p>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <CheckCircle2 className="text-primary shrink-0" size={20} />
                  <span>Select your institutional <strong>Grading System</strong> (e.g., USA 4.0, India 10.0, UK Classification).</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="text-primary shrink-0" size={20} />
                  <span>Add your <strong>Previous CGPA</strong> and total credits if you want to see your cumulative standing.</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="text-primary shrink-0" size={20} />
                  <span>Click "Add New Entry" to log each subject, its <strong>Credit Weight</strong>, and your current grade.</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="text-primary shrink-0" size={20} />
                  <span>View your real-time <strong>GPA Index</strong> and detailed performance analysis in the right panel.</span>
                </li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
             <GlassCard className="p-8 bg-gray-50/50 border-none">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <HelpCircle className="text-primary" size={20} />
                  Common Questions
                </h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2 whitespace-normal flex items-start gap-2">
                       <span className="text-primary">Q:</span> Is my data saved?
                    </h4>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      Yes! UniGrade uses secure local browser storage to keep your subjects saved for your next visit. We never upload your data to our servers.
                    </p>
                  </div>
                  <hr className="border-gray-100" />
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2 whitespace-normal flex items-start gap-2">
                       <span className="text-primary">Q:</span> Can I export my results?
                    </h4>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      Absolutely. You can generate a "Full Performance Report" in PDF format containing all your logged subjects and conversion metrics.
                    </p>
                  </div>
                </div>
             </GlassCard>
          </motion.div>
        </div>

        {/* Bottom CTA / Links */}
        <div className="border-t border-gray-100 pt-12 flex flex-wrap justify-center gap-6 text-sm font-bold text-gray-400">
           <a href="/weighted-grade-calculator" className="hover:text-primary transition-colors">Weighted Calculator</a>
           <span>•</span>
           <a href="/final-grade-calculator" className="hover:text-primary transition-colors">Final Grade Calculator</a>
           <span>•</span>
           <a href="/test-grade-calculator" className="hover:text-primary transition-colors">Test Grade Calculator</a>
           <span>•</span>
           <a href="/standards" className="hover:text-primary transition-colors">Grading Standards</a>
        </div>
      </div>
    </div>
  );
}
