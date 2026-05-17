import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { cn } from '../lib/utils';
import { GlassCard } from '../components/UI';

const FAQItem = ({ question, answer }: { question: string; answer: string; key?: React.Key }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-gray-100 rounded-xl bg-white overflow-hidden transition-all shadow-sm">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-all font-bold text-sm md:text-base text-gray-800"
      >
        {question}
        <ChevronDown className={cn("text-gray-400 transition-transform w-4 h-4", isOpen && "rotate-180")} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-6 pb-4 text-sm md:text-base text-gray-500 leading-relaxed"
          >
            {answer}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function FAQPage() {
  const faqs = [
    {
      question: "Is UniGrade free for personal use?",
      answer: "Yes, UniGrade is and will always be free for personal academic use. We believe in providing students with precision tools without cost barriers."
    },
    {
      question: "Which grading systems are supported?",
      answer: "We support a wide range of global standards including USA (4.0), UK Degree Classification, ECTS (Europe), India (10.0 CGPA), and several others. We are constantly updating our engine to include more regional standards."
    },
    {
      question: "How do I save my results?",
      answer: "UniGrade automatically saves your progress to your browser's local storage. Additionally, you can use the 'SAVE REPORT' button in the Results Panel to generate a professional PDF summary."
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely. UniGrade uses a 'Privacy-First' model. Your academic data is never uploaded to any server; it stays strictly on your own device."
    },
    {
      question: "Can I use UniGrade for official applications?",
      answer: "While UniGrade provides high math accuracy, it is intended as a tracking and estimation tool. For official university or job applications, you should always use the transcripts provided by your institution."
    },
    {
       question: "How do I calculate cumulative CGPA?",
       answer: "In the Subjects Panel, you'll find fields for 'Prev. CGPA' and 'Credits'. Enter your cumulative CGPA from previous semesters and the total number of credits completed to see your updated overall CGPA."
    }
  ];

  return (
    <div className="pt-24 md:pt-36 pb-12 md:pb-24 px-4 md:px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="text-center mb-16"
        >
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <HelpCircle size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold font-display mb-4">Common Questions</h1>
          <p className="text-gray-500 font-medium">Everything you need to know about the UniGrade engine.</p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>

        <GlassCard className="mt-16 p-8 bg-[#111827] border-none text-white text-center">
          <h3 className="text-xl font-bold mb-2">Still have questions?</h3>
          <p className="text-gray-400 mb-6 font-medium">Our support team is here to help with specialized grading queries.</p>
          <div className="flex justify-center">
            <a 
              href="/contact" 
              className="px-8 py-3 bg-white text-[#111827] rounded-xl font-black text-sm hover:bg-gray-100 transition-all"
            >
              Contact Support
            </a>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
