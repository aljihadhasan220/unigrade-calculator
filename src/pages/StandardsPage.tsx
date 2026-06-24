import React from 'react';
import { motion } from 'motion/react';
import { GlassCard } from '../components/UI';
import { Globe } from 'lucide-react';
import { GRADING_SYSTEMS } from '../types';
import BackButton from '../components/BackButton';
import { SEO } from '../components/SEO';

export default function StandardsPage() {
  return (
    <div className="pt-24 md:pt-36 pb-12 md:pb-24 px-4 md:px-6 gpu-accelerate">
      <SEO 
        title="Global Grading Standards"
        description="Comprehensive index of international grading systems including USA, UK, India, and ECTS benchmarks supported by the UniGrade engine."
        canonical="/standards"
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "Standards", item: "/standards" }
        ]}
      />
      <div className="max-w-7xl mx-auto">
        <BackButton />
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="text-center mb-16"
        >
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <Globe size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold font-display mb-4">Global Grading Standards</h1>
          <p className="text-gray-500 font-medium max-w-2xl mx-auto text-lg">
            A comprehensive index of international academic evaluation benchmarks supported by the UniGrade engine.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(GRADING_SYSTEMS).filter(([key]) => key !== 'CUSTOM').map(([key, system]) => (
            <GlassCard key={key} className="p-8 hover:border-primary/30 transition-all group overflow-hidden relative h-full flex flex-col">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 group-hover:bg-primary/10 transition-all" />
              
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                  <Globe size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-xl leading-none mb-1.5">{system.name}</h3>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Standardized Scale (Max {system.max})</p>
                </div>
              </div>

              <div className="space-y-4 flex-1">
                <div className="flex items-center justify-between text-[10px] font-black text-gray-400 uppercase tracking-widest pb-3 border-b border-gray-100">
                  <span>Grade Symbol</span>
                  <span>Point Value</span>
                </div>
                <div className="space-y-1.5 pt-2">
                  {Object.entries(system.steps).map(([grade, point]) => (
                    <div key={grade} className="flex items-center justify-between py-3 rounded-xl hover:bg-gray-50/50 px-3 -mx-2 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center font-black text-sm text-[#111827] shadow-sm group-hover:border-primary/20">
                          {grade}
                        </div>
                        <span className="font-bold text-gray-700 text-base">{grade.length > 2 ? grade : `Grade ${grade}`}</span>
                      </div>
                      <span className="font-mono font-black text-primary bg-primary/5 px-3 py-1.5 rounded-lg text-sm">
                        {point.toFixed(key === 'UK' ? 0 : 1)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}
