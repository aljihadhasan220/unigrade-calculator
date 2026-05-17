import React from 'react';
import { motion } from 'motion/react';
import { GlassCard } from '../components/UI';
import { FileText, CheckCircle2, AlertCircle } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="w-16 h-16 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold font-display mb-4">Terms of Service</h1>
          <p className="text-gray-500 font-medium">Agreement for using UniGrade's academic engine.</p>
        </motion.div>

        <div className="space-y-8">
          <GlassCard className="p-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <CheckCircle2 className="text-emerald-500" size={24} />
              Educational Use
            </h2>
            <div className="space-y-4 text-gray-500 font-medium leading-relaxed">
              <p>UniGrade is provided as a free educational tool for personal use. It is designed to assist students and educators in tracking academic progress across various global standards.</p>
              <p>Users are encouraged to verify results with their official academic institutions. UniGrade results are for guidance only and do not constitute official certification.</p>
            </div>
          </GlassCard>

          <GlassCard className="p-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <AlertCircle className="text-amber-500" size={24} />
              Disclaimer of Accuracy
            </h2>
            <div className="space-y-4 text-gray-500 font-medium leading-relaxed">
              <p>While we strive for absolute mathematical precision based on the latest grading benchmarks, UniGrade is provided "as is". We are not responsible for errors in user input or discrepancies between our engine and specific local institutional variations.</p>
              <p>The PDF and Image reports generated are summaries for personal archiving and should not be used as official forged transcripts.</p>
            </div>
          </GlassCard>

          <div className="bg-[#111827] text-white rounded-[24px] p-8">
            <h3 className="font-bold text-lg mb-2">Acceptance</h3>
            <p className="text-sm text-gray-400">By using UniGrade, you agree to these terms. If you do not agree, please discontinue use of the application. Last updated: May 2026.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
