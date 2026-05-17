/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
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
import html2canvas from 'html2canvas';
import { cn } from './lib/utils';
import { GRADING_SYSTEMS, type GradingSystem, type Subject, type CalculationResult } from './types';

// --- Sub-components (internal to keep one-file feel as requested) ---

const GlassCard = ({ children, className, id }: { children: React.ReactNode; className?: string; id?: string }) => (
  <div 
    id={id}
    className={cn(
      "bg-white/70 backdrop-blur-xl border border-primary/10 rounded-[24px] shadow-xl shadow-primary/5",
      className
    )}
  >
    {children}
  </div>
);

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  className,
  disabled
}: { 
  children: React.ReactNode; 
  onClick?: () => void; 
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  className?: string;
  disabled?: boolean;
}) => {
  const variants = {
    primary: "bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 shadow-lg shadow-primary/10",
    secondary: "bg-[#111827] text-white hover:bg-gray-800",
    outline: "border-2 border-primary/10 text-primary hover:bg-primary/5",
    ghost: "bg-transparent text-gray-500 hover:bg-gray-100",
    danger: "bg-red-50 text-red-500 hover:bg-red-100"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "px-6 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        className
      )}
    >
      {children}
    </motion.button>
  );
};

const Input = ({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div className="flex flex-col gap-1.5 w-full min-w-0">
    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-tight ml-1">{label}</label>
    <input 
      {...props}
      className="bg-white border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all placeholder:text-gray-200 w-full min-w-0"
    />
  </div>
);

const Navbar = ({ darkMode, setDarkMode }: { darkMode: boolean; setDarkMode: (v: boolean) => void }) => (
  <nav className="fixed top-8 left-4 right-4 md:left-6 md:right-6 z-50 bg-white/40 backdrop-blur-2xl rounded-[20px] shadow-2xl shadow-primary/10 border border-white/60">
    <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-18 flex items-center justify-between gap-2">
      <div className="flex items-center gap-2 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
          <span className="text-white font-black text-lg">✦</span>
        </div>
        <span className="text-lg md:text-xl font-extrabold tracking-tight text-text font-display">UniGrade</span>
      </div>
      
      <div className="hidden lg:flex items-center gap-8 text-sm font-bold text-gray-600">
        <a href="#calculator" className="hover:text-primary transition-colors">Calculator</a>
        <a href="#features" className="hover:text-primary transition-colors">Features</a>
        <a href="#faq" className="hover:text-primary transition-colors">FAQ</a>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-xl text-gray-400 hover:bg-gray-100 transition-all shrink-0"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <Button className="py-2 px-3 md:px-4 shadow-none text-[10px] md:text-xs tracking-tight whitespace-nowrap" variant="secondary">Join Now</Button>
      </div>
    </div>
  </nav>
);

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-gray-100 rounded-xl bg-white overflow-hidden transition-all shadow-sm">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-all font-bold text-sm text-gray-800"
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
            className="px-6 pb-4 text-sm text-gray-500 leading-relaxed"
          >
            {answer}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Main App Component ---

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
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
      const data = JSON.parse(saved);
      setSubjects(data.subjects || []);
      setGradingSystem(data.gradingSystem || 'USA');
      setPreviousCgpa(data.previousCgpa ?? '');
      setPreviousCredits(data.previousCredits ?? '');
    }
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem('unigrade_data', JSON.stringify({
      subjects,
      gradingSystem,
      previousCgpa,
      previousCredits
    }));
  }, [subjects, gradingSystem, previousCgpa, previousCredits]);

  const addSubject = () => {
    const newSubject: Subject = {
      id: Math.random().toString(36).substr(2, 9),
      name: '',
      credits: 3,
      grade: Object.keys(GRADING_SYSTEMS[gradingSystem].steps)[0] || 'A',
      marks: 80
    };
    setSubjects([...subjects, newSubject]);
  };

  const updateSubject = (id: string, field: keyof Subject, value: any) => {
    setSubjects(subjects.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const removeSubject = (id: string) => {
    setSubjects(subjects.filter(s => s.id !== id));
  };

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

    // CGPA Calculation (weighted average of previous and current)
    const totalCgpaCredits = totalCredits + prevC;
    const currentWeighted = gpa * totalCredits;
    const previousWeighted = Math.min(prevG, system.max) * prevC; // Cap previous CGPA to system max
    const cgpa = Math.min(totalCgpaCredits > 0 ? (currentWeighted + previousWeighted) / totalCgpaCredits : gpa, system.max);

    // Percentage logic (scale-aware)
    let percentage = 0;
    if (gradingSystem === 'INDIA') {
      percentage = gpa * 10;
    } else {
      percentage = (gpa / (system.max || 1)) * 100;
    }
    
    // If user provided custom marks, we can blend or prefer them if they are non-zero
    const averageMarks = subjects.reduce((acc, s) => acc + (s.marks || 0), 0) / (subjects.length || 1);
    // If average marks is significantly far from GPA percentage, we might want to respect it
    // But usually GPA to Percentage is a formula. We'll use the formula for "Result Dashboard" consistency.
    
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

  const downloadAsImage = async () => {
    if (!resultRef.current) return;
    const canvas = await html2canvas(resultRef.current, {
      backgroundColor: '#f5f7ff',
      scale: 2
    });
    const link = document.createElement('a');
    link.download = 'unigrade-results.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className={cn("min-h-screen font-sans selection:bg-primary/10 selection:text-primary aurora-bg", darkMode && "dark bg-[#111827] text-white")}>
      <div className="aurora-1" />
      <div className="aurora-2" />
      
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Hero Section */}
      <section className="relative pt-40 pb-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold text-[#111827] leading-[1] mb-6 font-display tracking-tight">
              Universal Grade <br />
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Engine</span>
            </h1>
            <p className="text-lg text-gray-500 mb-8 max-w-lg font-medium leading-normal">
              Worldwide GPA & Percentage conversion engine with real-time academic analytics.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })} className="h-12 px-8 text-sm">
                Open Calculator
              </Button>
              <Button variant="outline" className="h-12 px-8 text-sm">
                View Global Standards
              </Button>
            </div>
          </motion.div>

          <div className="hidden lg:flex gap-4">
            <div className="flex flex-col gap-4 translate-y-10">
              <GlassCard className="p-4 w-40 text-center animate-bounce-slow">
                 <div className="text-2xl font-bold">4.0</div>
                 <div className="text-[10px] font-bold text-gray-400 uppercase">USA System</div>
              </GlassCard>
              <GlassCard className="p-4 w-40 text-center">
                 <div className="text-2xl font-bold">1st</div>
                 <div className="text-[10px] font-bold text-gray-400 uppercase">UK System</div>
              </GlassCard>
            </div>
            <div className="flex flex-col gap-4">
               <GlassCard className="p-4 w-40 text-center">
                 <div className="text-2xl font-bold">A</div>
                 <div className="text-[10px] font-bold text-gray-400 uppercase">ECTS</div>
              </GlassCard>
               <GlassCard className="p-4 w-40 text-center translate-y-10">
                 <div className="text-2xl font-bold">10.0</div>
                 <div className="text-[10px] font-bold text-gray-400 uppercase">India</div>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      {/* Main Calculator Section */}
      <section id="calculator" className="py-12 px-6 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 items-start">
          
          {/* Left: Input Workspace */}
          <div className="space-y-6">
            <GlassCard className="p-8">
              <div className="mb-10">
                <h3 className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-2">Workspace</h3>
                <h2 className="text-3xl font-extrabold font-display leading-none">Subjects Panel</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-tight ml-1">Grading System</label>
                  <div className="relative">
                    <select 
                      value={gradingSystem}
                      onChange={(e) => setGradingSystem(e.target.value as GradingSystem)}
                      className="w-full bg-white border border-gray-100 rounded-xl px-4 py-3 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-primary/10 font-bold text-gray-700"
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

              <div className="space-y-3">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-tight">Academic Records</h4>
                </div>

                <AnimatePresence mode="popLayout">
                  {subjects.length === 0 ? (
                    <motion.div 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      className="h-32 flex flex-col items-center justify-center border-2 border-dashed border-gray-100 rounded-2xl text-gray-300"
                    >
                      <p className="text-xs font-bold uppercase tracking-widest">Entry your subjects</p>
                    </motion.div>
                  ) : (
                    subjects.map((subject, index) => (
                      <motion.div
                        key={subject.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        layout
                        className="group flex flex-col md:flex-row items-center gap-4 bg-white/50 p-4 rounded-2xl border border-gray-50 hover:border-primary/20 transition-all"
                      >
                        <div className="flex-1 w-full grid grid-cols-2 sm:grid-cols-[2fr_1fr_1fr_1fr] gap-3">
                            <div className="col-span-2 sm:col-span-1">
                              <Input 
                                label="Name" 
                                placeholder="Advanced Algorithms" 
                                value={subject.name} 
                                onChange={e => updateSubject(subject.id, 'name', e.target.value)}
                              />
                            </div>
                            <Input 
                              label="Credits" 
                              type="number" 
                              value={subject.credits === 0 ? '' : subject.credits} 
                              onChange={e => updateSubject(subject.id, 'credits', e.target.value === '' ? 0 : parseFloat(e.target.value))}
                            />
                            <div className="min-w-0">
                              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-tight ml-1 mb-1.5 block">Grade</label>
                              <div className="relative">
                                <select 
                                  value={subject.grade}
                                  onChange={(e) => updateSubject(subject.id, 'grade', e.target.value)}
                                  className="w-full bg-white border border-gray-100 rounded-xl px-3 py-3 text-sm appearance-none focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary font-bold transition-all"
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
                            />
                        </div>
                        <button 
                          onClick={() => removeSubject(subject.id)}
                          className="p-2 rounded-lg bg-gray-50 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all shrink-0"
                        >
                          <Plus size={18} className="rotate-45" />
                        </button>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
                
                <button 
                  onClick={addSubject}
                  className="w-full py-4 rounded-2xl border-2 border-dashed border-gray-100 text-gray-400 hover:border-primary/20 hover:text-primary font-bold text-sm transition-all mt-4 flex items-center justify-center gap-2"
                >
                  <Plus size={16} /> New Subject Record
                </button>
              </div>

              <Button onClick={() => window.print()} className="w-full mt-10 h-14 uppercase tracking-[0.1em]" variant="primary">
                Generate Full Performance Report
              </Button>
            </GlassCard>
          </div>

          {/* Right: Results Panel */}
          <div className="space-y-6 lg:sticky lg:top-28">
            <GlassCard className="p-8 border-2 border-primary/5">
              <div className="flex items-center justify-between mb-8">
                <label className="text-[10px] font-black text-primary/60 uppercase tracking-[0.2em]">Real-time Analysis</label>
                <div className="flex gap-1">
                  <div className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                  <div className="w-1 h-1 rounded-full bg-primary animate-pulse delay-75" />
                  <div className="w-1 h-1 rounded-full bg-primary animate-pulse delay-150" />
                </div>
              </div>
              
              <div ref={resultRef}>
                {calculationResult ? (
                  <div className="space-y-6">
                    <div className="flex justify-center py-4 scale-110">
                      <div className="w-40 h-40 rounded-full bg-white shadow-inner flex items-center justify-center relative">
                         <svg className="w-full h-full transform -rotate-90 absolute">
                          <circle cx="80" cy="80" r="72" stroke="rgba(0,0,0,0.02)" strokeWidth="10" fill="transparent" />
                            <motion.circle 
                              initial={{ strokeDashoffset: 452.38 }}
                              animate={{ strokeDashoffset: 452.38 - (Math.min(calculationResult.gpa, GRADING_SYSTEMS[gradingSystem].max) / GRADING_SYSTEMS[gradingSystem].max) * 452.38 }}
                              transition={{ duration: 1.5, ease: "circOut" }}
                              cx="80" cy="80" r="72" stroke="url(#gradient)" strokeWidth="10" fill="transparent" 
                              strokeDasharray="452.38"
                              strokeLinecap="round"
                            />
                          <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#7c4dff" />
                              <stop offset="100%" stopColor="#00c2ff" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="flex flex-col items-center">
                          <span className="text-5xl font-black text-text leading-none tracking-tighter">{calculationResult.gpa.toFixed(2)}</span>
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">GPA INDEX</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-center pt-2">
                      <span className="inline-block px-4 py-1.5 rounded-full bg-[#ecfdf5] text-[#059669] text-[11px] font-black uppercase tracking-tight shadow-sm border border-[#059669]/5">
                        {calculationResult.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 gap-2 pt-4">
                      <div className="flex justify-between items-center p-4 bg-gray-50/50 rounded-2xl border border-gray-100/50">
                        <span className="text-[11px] font-bold text-gray-400 uppercase">Cumulative CGPA</span>
                        <span className="font-extrabold text-lg">{calculationResult.cgpa.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-gray-50/50 rounded-2xl border border-gray-100/50">
                        <span className="text-[11px] font-bold text-gray-400 uppercase">Total Percentage</span>
                        <span className="font-extrabold text-lg">{calculationResult.percentage.toFixed(1)}%</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-4">
                      <Button onClick={copyResult} variant="outline" className="text-[11px] py-4 h-auto font-black shadow-none border-gray-100 tracking-wider">
                        {copied ? 'COPIED!' : 'COPY RESULT'}
                      </Button>
                      <Button onClick={downloadAsImage} variant="secondary" className="text-[11px] py-4 h-auto font-black tracking-wider shadow-xl shadow-black/10">
                        SAVE REPORT
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="py-24 text-center">
                    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
                      <Calculator size={20} className="text-gray-200" />
                    </div>
                    <p className="text-[11px] font-bold text-gray-300 uppercase tracking-widest leading-loose">
                      Awaiting entry of<br/>academic data
                    </p>
                  </div>
                )}
              </div>
            </GlassCard>

            <GlassCard className="p-6 flex justify-between items-center bg-[#111827] border-none text-white overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-all" />
              <div className="relative z-10">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] block mb-1">Standard Weight</label>
                <span className="font-extrabold text-sm tracking-tight">UK High Distinction</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center relative z-10 border border-white/10">
                <Globe size={18} className="text-secondary" />
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Features Strip */}
      <section id="features" className="py-20 px-6 max-w-7xl mx-auto border-t border-gray-50">
        <div className="flex flex-wrap justify-center gap-12">
          {[
            { icon: Check, text: 'Fast Cloud Calculation' },
            { icon: Check, text: 'Auto-Save LocalStorage' },
            { icon: Check, text: 'Global Standards' },
            { icon: Check, text: 'Ad-Free Forever' }
          ].map((f, i) => (
            <div key={i} className="flex items-center gap-2 text-[11px] font-black text-gray-400 uppercase tracking-widest">
              <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <Check size={12} />
              </div>
              {f.text}
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-6 bg-white/50 border-t border-gray-50">
        <div className="max-w-xl mx-auto space-y-4 text-center mb-10">
           <h2 className="text-3xl font-extrabold font-display leading-[0.9]">Common Questions</h2>
           <p className="text-sm text-gray-400">Everything you need to know about our precision calc engine.</p>
        </div>
        <div className="max-w-2xl mx-auto space-y-3">
          <FAQItem 
            question="Is UniGrade free for personal use?" 
            answer="Yes, UniGrade is and will always be free for personal academic use. All calculations happen locally in your browser."
          />
          <FAQItem 
            question="Which grading systems are supported?" 
            answer="We support all major global benchmarks including USA (4.0), UK Classification, ECTS (Europe), India (10.0), and more."
          />
          <FAQItem 
            question="Can I export my performance reports?" 
            answer="Absolutely. You can generate a full academic summary including GPA, CGPA, and Percentage as an image or print to PDF."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 text-center border-t border-gray-50 relative z-10">
        <div className="flex flex-col items-center gap-4">
           <span className="font-extrabold text-sm tracking-tight text-gray-500">&copy; 2026 UniGrade Systems Corporation.</span>
           <p className="text-[10px] font-medium text-gray-300 max-w-md text-center leading-loose">
            Precision GPA metrics for global education systems. This tool is designed for academic tracking purposes only.
           </p>
        </div>
      </footer>
    </div>
  );
}
