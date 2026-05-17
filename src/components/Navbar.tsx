import React, { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import { Button } from './UI';

export const Navbar = memo(({ darkMode, setDarkMode }: { darkMode: boolean; setDarkMode: (v: boolean) => void }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  const scrollToSection = (id: string) => {
    if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = `/#${id}`;
    }
  };

  return (
    <header className="fixed top-4 md:top-8 left-4 right-4 md:left-6 md:right-6 z-50">
      <nav 
        aria-label="Main Navigation"
        className="bg-white/40 backdrop-blur-2xl rounded-[16px] md:rounded-[20px] shadow-2xl shadow-primary/10 border border-white/60"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-14 md:h-18 flex items-center justify-between gap-2">
          <Link to="/" className="flex items-center gap-2 shrink-0" aria-label="UniGrade Home">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="text-white font-black text-lg">✦</span>
            </div>
            <span className="text-lg md:text-xl font-extrabold tracking-tight text-[#111827] font-display lg:block hidden">UniGrade</span>
          </Link>
          
          <div className="hidden lg:flex items-center gap-8 text-sm font-bold text-gray-600">
            <button onClick={() => scrollToSection('home')} className="hover:text-primary transition-colors cursor-pointer" aria-label="Scroll to home">Home</button>
            <button onClick={() => scrollToSection('calculator')} className="hover:text-primary transition-colors cursor-pointer" aria-label="Scroll to calculator">Calculator</button>
            <button onClick={() => scrollToSection('global-standards')} className="hover:text-primary transition-colors cursor-pointer" aria-label="Scroll to standards">Standards</button>
            <Link to="/about" className="hover:text-primary transition-colors">About</Link>
            <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
          </div>
  
          <div className="flex items-center gap-2 shrink-0">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xl text-gray-400 hover:bg-gray-100 transition-all shrink-0"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <Button className="py-2 px-3 md:px-4 shadow-none text-[10px] md:text-xs tracking-tight whitespace-nowrap" variant="secondary">Join Now</Button>
          </div>
        </div>
      </nav>
    </header>
  );
});
