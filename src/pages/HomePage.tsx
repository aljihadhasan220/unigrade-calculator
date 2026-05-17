import React, { useState, useEffect, useRef, useMemo, useCallback, memo } from 'react';
import { 
  Plus, 
  Trash2, 
  GraduationCap, 
  Info, 
  Share2, 
  Download, 
  Copy, 
  Check, 
  Moon, 
  Sun, 
  ChevronDown, 
  Calculator, 
  Globe, 
  Zap, 
  ShieldCheck, 
  Smartphone,
  Trophy,
  Star,
  Activity,
  Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { GRADING_SYSTEMS, type GradingSystem, type Subject, type CalculationResult } from '../types';
import { GlassCard, Button, Input } from '../components/UI';

import { SEO } from '../components/SEO';

const SubjectItem = memo(({ 
  subject, 
  gradingSystem, 
  updateSubject, 
  removeSubject 
}: { 
  subject: Subject; 
  gradingSystem: GradingSystem; 
  updateSubject: (id: string, field: keyof Subject, value: any) => void; 
  removeSubject: (id: string) => void;
}) => (
<motion.div
    initial={{ opacity: 0, scale: 0.98 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.98 }}
    layout="size"
    className="group flex flex-col md:flex-row items-start md:items-center gap-4 bg-white p-5 rounded-2xl border border-gray-100 hover:border-primary/20 transition-all shadow-sm w-full gpu-accelerate"
  >
  {/* Add a hidden aria-label for accessibility on the remove button */}
    <div className="flex-1 w-full grid grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1fr] gap-4">

        <div className="col-span-2 md:col-span-1">
          <Input 
            label="Name" 
            placeholder="Subject Name" 
            value={subject.name} 
            onChange={e => updateSubject(subject.id, 'name', e.target.value)}
            aria-label="Subject name"
          />
        </div>
        <Input 
          label="Credits" 
          type="number" 
          value={subject.credits === 0 ? '' : subject.credits} 
          onChange={e => updateSubject(subject.id, 'credits', e.target.value === '' ? 0 : parseFloat(e.target.value))}
          aria-label="Academic credits"
        />
        <div className="min-w-0">
          <label id={`grade-label-${subject.id}`} className="text-[11px] font-bold text-gray-400 uppercase tracking-tight ml-1 mb-1.5 block">Grade</label>
          <div className="relative">
            <select 
              value={subject.grade}
              onChange={(e) => updateSubject(subject.id, 'grade', e.target.value)}
              className="w-full bg-white border border-gray-100 rounded-xl px-3 py-3 text-sm appearance-none focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary font-bold transition-all cursor-pointer"
              aria-labelledby={`grade-label-${subject.id}`}
            >
              {Object.keys(GRADING_SYSTEMS[gradingSystem].steps).map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none w-4 h-4" />
          </div>
        </div>
        <Input 
          label="Marks %" 
          type="number" 
          value={subject.marks === 0 ? '' : subject.marks} 
          onChange={e => updateSubject(subject.id, 'marks', e.target.value === '' ? 0 : parseFloat(e.target.value))}
          aria-label="Marks percentage"
        />
    </div>
    <button 
      onClick={() => removeSubject(subject.id)}
      className="p-3 rounded-xl bg-gray-50 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all self-end md:self-center cursor-pointer"
      aria-label="Remove subject"
    >
      <Plus size={20} className="rotate-45" />
    </button>
  </motion.div>
));

export default function HomePage() {
  const [gradingSystem, setGradingSystem] = useState<GradingSystem>('USA');
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [previousCgpa, setPreviousCgpa] = useState<number | ''>('');
  const [previousCredits, setPreviousCredits] = useState<number | ''>('');
  const [copied, setCopied] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  // Load from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem('unigrade_data');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setSubjects(data.subjects || []);
        setGradingSystem(data.gradingSystem || 'USA');
        setPreviousCgpa(data.previousCgpa ?? '');
        setPreviousCredits(data.previousCredits ?? '');
      } catch (e) {
        console.error("Error loading saved data", e);
      }
    }
  }, []);

  // Save to LocalStorage - Debounced for performance
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem('unigrade_data', JSON.stringify({
        subjects,
        gradingSystem,
        previousCgpa,
        previousCredits
      }));
    }, 1000);
    return () => clearTimeout(timer);
  }, [subjects, gradingSystem, previousCgpa, previousCredits]);

  const addSubject = useCallback(() => {
    setSubjects(prev => [...prev, {
      id: Math.random().toString(36).substr(2, 9),
      name: '',
      credits: 3,
      grade: Object.keys(GRADING_SYSTEMS[gradingSystem].steps)[0] || 'A',
      marks: 80
    }]);
  }, [gradingSystem]);

  const updateSubject = useCallback((id: string, field: keyof Subject, value: any) => {
    setSubjects(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
  }, []);

  const removeSubject = useCallback((id: string) => {
    setSubjects(prev => prev.filter(s => s.id !== id));
  }, []);

  const calculationResult = useMemo((): CalculationResult | null => {
    if (subjects.length === 0) return null;

    const system = GRADING_SYSTEMS[gradingSystem];
    let totalWeightedPoints = 0;
    let totalCredits = 0;
    let totalMarks = 0;

    subjects.forEach(s => {
      const point = system.steps[s.grade] || 0;
      totalWeightedPoints += point * s.credits;
      totalCredits += s.credits;
      totalMarks += s.marks;
    });

    const gpa = totalCredits > 0 ? totalWeightedPoints / totalCredits : 0;
    
    const prevC = typeof previousCredits === 'number' ? previousCredits : 0;
    const prevG = typeof previousCgpa === 'number' ? previousCgpa : 0;

    const totalCgpaCredits = totalCredits + prevC;
    const currentWeighted = gpa * totalCredits;
    const previousWeighted = Math.min(prevG, system.max) * prevC; 
    const cgpa = Math.min(totalCgpaCredits > 0 ? (currentWeighted + previousWeighted) / totalCgpaCredits : gpa, system.max);

    let percentage = 0;
    if (gradingSystem === 'INDIA') {
      percentage = gpa * 10;
    } else {
      percentage = (gpa / (system.max || 1)) * 100;
    }
    
    let gradeBadge = 'Excellent';
    let status = 'Great Work';
    
    const maxVal = system.max || 4.0;
    const performanceRatio = gpa / maxVal;
    if (performanceRatio >= 0.9) { gradeBadge = 'Outstanding'; status = 'Excellent Performance'; }
    else if (performanceRatio >= 0.8) { gradeBadge = 'Distinction'; status = 'Great Work'; }
    else if (performanceRatio >= 0.7) { gradeBadge = 'Very Good'; status = 'Keep it up'; }
    else if (performanceRatio >= 0.6) { gradeBadge = 'Above Average'; status = 'Good Progress'; }
    else if (performanceRatio >= 0.4) { gradeBadge = 'Passed'; status = 'Needs Improvement'; }
    else { gradeBadge = 'Failed'; status = 'Study Harder'; }

    return { gpa, cgpa, percentage, gradeBadge, status };
  }, [subjects, gradingSystem, previousCgpa, previousCredits]);

  const copyResult = () => {
    if (!calculationResult) return;
    const text = `My Results - GPA: ${calculationResult.gpa.toFixed(2)}, CGPA: ${calculationResult.cgpa.toFixed(2)}\nCalculated with UniGrade`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadAsPDF = async () => {
    if (!calculationResult) return;

    const { jsPDF } = await import('jspdf');
    const { default: autoTable } = await import('jspdf-autotable');
    
    const doc = new jsPDF();
    const system = GRADING_SYSTEMS[gradingSystem];

    doc.setFontSize(22);
    doc.setTextColor(124, 77, 255);
    doc.text('UniGrade Academic Report', 14, 22);

    doc.setFontSize(10);
    doc.setTextColor(156, 163, 175);
    doc.text(`Issued on: ${new Date().toLocaleDateString()}`, 14, 30);

    doc.setFontSize(14);
    doc.setTextColor(17, 24, 39);
    doc.text('Performance Summary', 14, 45);

    const summaryData = [
      ['Grading System', system.name],
      ['Previous CGPA', previousCgpa === '' ? '0.00' : previousCgpa.toFixed(2)],
      ['Previous Credits', previousCredits === '' ? '0' : previousCredits.toString()],
      ['Current GPA', calculationResult.gpa.toFixed(2)],
      ['Final CGPA', calculationResult.cgpa.toFixed(2)],
      ['Overall Percentage', `${calculationResult.percentage.toFixed(1)}%`],
      ['Performance Status', calculationResult.status]
    ];

    autoTable(doc, {
      startY: 50,
      head: [['Metric', 'Value']],
      body: summaryData,
      theme: 'striped',
      headStyles: { fillColor: [124, 77, 255], fontStyle: 'bold' },
      styles: { fontSize: 10 }
    });

    const finalY = (doc as any).lastAutoTable.finalY + 15;
    doc.setFontSize(14);
    doc.text('Academic Records', 14, finalY);

    const subjectsData = subjects.map(s => [
      s.name || 'Unnamed Subject',
      s.credits.toString(),
      s.grade,
      `${s.marks}%`
    ]);

    autoTable(doc, {
      startY: finalY + 5,
      head: [['Subject Name', 'Credits', 'Grade', 'Marks %']],
      body: subjectsData,
      theme: 'grid',
      headStyles: { fillColor: [124, 77, 255], fontStyle: 'bold' },
      styles: { fontSize: 9 }
    });

    const pageCount = (doc as any).internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(9);
      doc.setTextColor(156, 163, 175);
      doc.text('UniGrade - Precision Academic Metrics © 2026', 14, doc.internal.pageSize.height - 10);
      doc.text(`Page ${i} of ${pageCount}`, doc.internal.pageSize.width - 35, doc.internal.pageSize.height - 10);
    }

    doc.save('UniGrade_Report.pdf');
  };

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
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Engine</span>
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
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 items-start">
          
          {/* Left: Input Workspace */}
          <div className="space-y-6 w-full">
            <GlassCard className="p-6 md:p-10">
              <div className="mb-10 text-center md:text-left">
                <h3 className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-2">Workspace</h3>
                <h2 className="text-2xl md:text-3xl font-extrabold font-display leading-none">Subjects Panel</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div className="flex flex-col gap-1.5 w-full">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-tight ml-1">Grading System</label>
                  <div className="relative">
                    <select 
                      value={gradingSystem}
                      onChange={(e) => setGradingSystem(e.target.value as GradingSystem)}
                      className="w-full bg-white border border-gray-100 rounded-xl px-4 py-3 text-sm md:text-base appearance-none focus:outline-none focus:ring-2 focus:ring-primary/10 font-bold text-gray-700 transition-all cursor-pointer"
                    >
                      {Object.entries(GRADING_SYSTEMS).map(([key, value]) => (
                        <option key={key} value={key}>{value.name}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none w-4 h-4" />
                  </div>
                </div>
                <div className="flex gap-4 w-full">
                  <Input 
                    label="Prev. CGPA" 
                    type="number" 
                    step="0.01" 
                    placeholder="0.00" 
                    value={previousCgpa} 
                    onChange={e => setPreviousCgpa(e.target.value === '' ? '' : parseFloat(e.target.value))}
                  />
                  <Input 
                    label="Credits" 
                    type="number" 
                    placeholder="0" 
                    value={previousCredits} 
                    onChange={e => setPreviousCredits(e.target.value === '' ? '' : parseFloat(e.target.value))}
                  />
                </div>
              </div>

              <div className="space-y-4 w-full">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-tight ml-1">Academic Records</h4>
                </div>

                <AnimatePresence mode="popLayout" initial={false}>
                  {subjects.length === 0 ? (
                    <motion.div 
                      key="empty"
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      className="h-40 flex flex-col items-center justify-center border-2 border-dashed border-gray-100 rounded-2xl text-gray-300 bg-gray-50/20"
                    >
                      <Calculator size={32} className="mb-3 opacity-20" />
                      <p className="text-[10px] font-bold uppercase tracking-widest text-center px-4">Start by adding your subjects</p>
                    </motion.div>
                  ) : (
                    subjects.map((subject) => (
                      <SubjectItem 
                        key={subject.id} 
                        subject={subject} 
                        gradingSystem={gradingSystem} 
                        updateSubject={updateSubject} 
                        removeSubject={removeSubject} 
                      />
                    ))
                  )}
                </AnimatePresence>
                
                <button 
                  onClick={addSubject}
                  className="w-full py-4 rounded-2xl border-2 border-dashed border-gray-100 text-gray-400 hover:border-primary/20 hover:text-primary font-bold text-sm transition-all mt-6 flex items-center justify-center gap-2 bg-white/50"
                >
                  <Plus size={18} /> Add New Entry
                </button>
              </div>

              <div className="mt-12 flex flex-col sm:flex-row gap-4">
                  <Button onClick={() => window.print()} className="w-full h-14 uppercase tracking-[0.1em] font-black" variant="primary">
                     Full Performance Report
                  </Button>
              </div>
            </GlassCard>
            
            <GlassCard className="p-8 bg-[#111827] border-none text-white overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/20 rounded-full blur-[80px] group-hover:bg-primary/30 transition-all" />
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h4 className="text-xl font-bold mb-2">Need Help?</h4>
                  <p className="text-gray-400 text-sm max-w-sm">Not sure about your institution's specific weightings? Check out our standards guide or contact support.</p>
                </div>
                <div className="flex gap-4">
                    <a href="/standards" className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl font-bold text-sm transition-all border border-white/10 flex items-center gap-2">
                       <Globe size={16} /> Standards
                    </a>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Right: Results Panel */}
          <div className="space-y-6 lg:sticky lg:top-32 w-full lg:max-w-none">
            <GlassCard className="p-6 md:p-8 border-2 border-primary/5 flex flex-col">
              <div className="flex items-center justify-between mb-10">
                <label className="text-[10px] font-black text-primary/60 uppercase tracking-[0.2em]">Analytical Output</label>
                <div className="flex gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse delay-75" />
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse delay-150" />
                </div>
              </div>
              
              <div ref={resultRef} className="w-full">
                {calculationResult ? (
                  <div className="space-y-8">
                    <div className="flex justify-center items-center py-6">
                      <div className="w-48 h-48 md:w-56 md:h-56 rounded-full bg-white shadow-[0_0_60px_rgba(124,77,255,0.05)] border border-gray-50 flex items-center justify-center relative">
                         <svg className="w-full h-full transform -rotate-90 absolute p-4">
                           <circle cx="50%" cy="50%" r="44%" stroke="#f3f4f6" strokeWidth="8" fill="transparent" />
                            <motion.circle 
                              initial={{ strokeDashoffset: 452.38 }}
                              animate={{ strokeDashoffset: 452.38 - (Math.min(calculationResult.gpa, GRADING_SYSTEMS[gradingSystem].max) / GRADING_SYSTEMS[gradingSystem].max) * 452.38 }}
                              transition={{ duration: 1.5, ease: "circOut" }}
                              cx="50%" cy="50%" r="44%" stroke="url(#gradient-hero)" strokeWidth="10" fill="transparent" 
                              strokeDasharray="452.38"
                              strokeLinecap="round"
                            />
                          <defs>
                            <linearGradient id="gradient-hero" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#7c4dff" />
                              <stop offset="100%" stopColor="#00c2ff" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="flex flex-col items-center z-10">
                          <span className="text-5xl md:text-6xl font-black text-[#111827] leading-none tracking-tighter">{calculationResult.gpa.toFixed(2)}</span>
                          <span className="text-[10px] md:text-[11px] font-bold text-gray-400 uppercase tracking-[0.3em] mt-3">GPA INDEX</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-center">
                      <span className="inline-block px-5 py-2 rounded-full bg-[#ecfdf5] text-[#059669] text-[10px] md:text-[11px] font-black uppercase tracking-widest shadow-sm border border-[#059669]/5">
                        {calculationResult.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                      <div className="flex justify-between items-center p-5 bg-gray-50/70 rounded-2xl border border-gray-100 transition-all hover:bg-gray-100/50">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Cumulative CGPA</span>
                        <span className="font-black text-xl text-[#111827]">{calculationResult.cgpa.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center p-5 bg-gray-50/70 rounded-2xl border border-gray-100 transition-all hover:bg-gray-100/50">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Percentage</span>
                        <span className="font-black text-xl text-[#111827]">{calculationResult.percentage.toFixed(1)}%</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <Button onClick={copyResult} variant="outline" className="w-full text-[11px] font-black tracking-[0.2em] h-14 uppercase">
                        {copied ? 'COPIED!' : 'COPY DATA'}
                      </Button>
                      <Button onClick={downloadAsPDF} variant="secondary" className="w-full text-[11px] font-black tracking-[0.2em] h-14 uppercase shadow-xl shadow-black/10">
                        SAVE PDF
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="py-24 text-center">
                    <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-gray-100 shadow-sm">
                      <Calculator size={24} className="text-gray-300" />
                    </div>
                    <p className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.3em] leading-loose max-w-[180px] mx-auto">
                      Awaiting entry of academic records...
                    </p>
                  </div>
                )}
              </div>
            </GlassCard>

            <GlassCard className="p-6 bg-gradient-to-br from-primary to-secondary border-none text-white flex items-center justify-between group cursor-pointer overflow-hidden relative">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-125 transition-transform" />
               <div className="relative z-10">
                  <label className="text-[9px] font-black text-white/60 uppercase tracking-widest block mb-1">PRO FEATURES</label>
                  <span className="font-black text-sm tracking-tight text-white">Join 10k+ Students</span>
               </div>
               <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center relative z-10 border border-white/30 backdrop-blur-md">
                 <Zap size={18} fill="white" className="text-white" />
               </div>
            </GlassCard>
          </div>
        </div>
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

      {/* Trust Badges */}
      <section className="pt-10 pb-20 px-4 max-w-7xl mx-auto border-t border-gray-100 w-full optimize-scrolling">

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
