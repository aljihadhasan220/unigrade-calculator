import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';

// Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import ContactPage from './pages/ContactPage';
import FAQPage from './pages/FAQPage';
import StandardsPage from './pages/StandardsPage';

const ScrollToTopButton = () => {
  const [show, setShow] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-[60] w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary text-white shadow-2xl shadow-primary/40 flex items-center justify-center hover:opacity-90 transition-all active:scale-95"
        >
          <ChevronDown className="rotate-180" size={24} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

const ScrollToTopOnRoute = () => {
  const { pathname, hash } = useLocation();
  
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={cn(
      "min-h-screen font-sans selection:bg-primary/10 selection:text-primary aurora-bg w-full relative flex flex-col", 
      darkMode && "dark bg-[#111827] text-white"
    )}>
      <div className="aurora-1" />
      <div className="aurora-2" />
      
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      
      <main className="relative z-10 w-full flex-grow">
        {children}
      </main>
      
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTopOnRoute />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/standards" element={<StandardsPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
