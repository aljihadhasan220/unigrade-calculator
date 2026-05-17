import React from 'react';
import { motion } from 'motion/react';
import { GlassCard } from '../components/UI';
import { ShieldCheck, Lock, EyeOff } from 'lucide-react';
import BackButton from '../components/BackButton';
import { SEO } from '../components/SEO';

export default function PrivacyPage() {
  return (
    <div className="pt-24 md:pt-36 pb-12 md:pb-24 px-4 md:px-6">
      <SEO 
        title="Privacy Policy | UniGrade"
        description="Our commitment to academic data privacy. Learn how UniGrade keeps your data strictly on your device using a local-only storage model."
        canonical="/privacy"
      />
      <div className="max-w-4xl mx-auto">
        <BackButton />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold font-display mb-4">Privacy Policy</h1>
          <p className="text-gray-500 font-medium max-w-lg mx-auto">Learn how we protect your academic data and personal information.</p>
        </motion.div>

        <div className="space-y-8">
          <GlassCard className="p-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <Lock className="text-primary" size={24} />
              Data Sovereignty
            </h2>
            <div className="space-y-4 text-gray-500 font-medium leading-relaxed">
              <p>UniGrade operates on a "Zero-Server" architecture. This means your academic data—grades, subject names, credits—never leaves your browser. We do not store your data on our servers.</p>
              <p>Everything is stored locally on your device via LocalStorage. If you clear your browser's site data, your UniGrade records will be removed as well, further ensuring that we have no way to access your files.</p>
            </div>
          </GlassCard>

          <GlassCard className="p-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <EyeOff className="text-secondary" size={24} />
              No Tracking
            </h2>
            <div className="space-y-4 text-gray-500 font-medium leading-relaxed">
              <p>We do not use invasive tracking cookies or third-party analytics that profile you. This platform is built for students, not for data brokers.</p>
              <p>Your interaction with our calculator is private. We don't see what grades you input or what grading systems you use most often.</p>
            </div>
          </GlassCard>

          <div className="bg-gray-50/50 rounded-[24px] p-8 border border-gray-100">
            <h3 className="font-bold text-lg mb-4 text-[#111827]">Policy Updates</h3>
            <p className="text-sm text-gray-400">This policy is effective as of May 2026. While we may update it from time to time to clarify our practices, our commitment to zero server-side storage will remain unchanged.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
