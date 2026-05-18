import React, { memo } from 'react';
import { Link } from 'react-router-dom';

export const Footer = memo(() => {
  const scrollToSection = (id: string|undefined) => {
    if (!id) return;
    const isHome = window.location.pathname === '/';
    if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = `/#${id}`;
    }
  };

  return (
    <footer className="py-8 md:py-20 px-4 md:px-6 text-center relative z-10 bg-white w-full border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center gap-2 mb-6 md:mb-8">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-md">
            <span className="text-white font-black text-lg">✦</span>
          </div>
          <span className="text-xl font-extrabold tracking-tight text-[#111827] font-display">UniGrade</span>
        </div>
        
        <div className="flex flex-wrap justify-center gap-x-6 md:gap-x-12 gap-y-4 mb-12 text-[10px] md:text-sm font-bold text-gray-400 uppercase tracking-widest px-4">
          <button onClick={() => scrollToSection('home')} className="hover:text-primary transition-colors cursor-pointer">Home</button>
          <button onClick={() => scrollToSection('calculator')} className="hover:text-primary transition-colors cursor-pointer">Calculator</button>
          <Link to="/about" className="hover:text-primary transition-colors">About</Link>
          <Link to="/blog" className="hover:text-primary transition-colors">Blog</Link>
          <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
          <Link to="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
          <Link to="/terms" className="hover:text-primary transition-colors">Terms</Link>
        </div>

        <div className="flex flex-col items-center gap-4 border-t border-gray-100 pt-12">
            <span className="font-extrabold text-[10px] md:text-xs tracking-tight text-gray-400">&copy; 2026 UniGrade Systems Corporation. All Rights Reserved.</span>
            <p className="text-[9px] md:text-[10px] font-medium text-gray-300 max-w-lg text-center leading-loose px-4">
            Unified Academic Metric Engine for global students. Built with precision and privacy at its core.
            </p>
        </div>
      </div>
    </footer>
  );
});
