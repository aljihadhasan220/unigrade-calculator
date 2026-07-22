import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ChevronDown, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';

// Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Pages - Lazy loaded for performance
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const StandardsPage = lazy(() => import('./pages/StandardsPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogDetailPage = lazy(() => import('./pages/BlogDetailPage'));
const GradeCalculatorPage = lazy(() => import('./pages/GradeCalculatorPage'));
const WeightedGradeCalculatorPage = lazy(() => import('./pages/WeightedGradeCalculatorPage'));
const FinalGradeCalculatorPage = lazy(() => import('./pages/FinalGradeCalculatorPage'));
const TestGradeCalculatorPage = lazy(() => import('./pages/TestGradeCalculatorPage'));
const JobLandingPage = lazy(() => import('./pages/JobLandingPage'));

const PageLoader = () => (
  <div className="min-h-[60vh] w-full flex items-center justify-center">
    <Loader2 className="w-8 h-8 text-primary animate-spin" />
  </div>
);

const ScrollToTopButton = () => {
  const [show, setShow] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
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
      "font-sans selection:bg-primary/10 selection:text-primary aurora-bg w-full relative flex flex-col", 
      darkMode && "dark bg-[#111827] text-white"
    )}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="aurora-1" />
        <div className="aurora-2" />
      </div>
      
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
  const [isJobDomain, setIsJobDomain] = useState(() => {
    if (typeof window === 'undefined') return false;
    const hostname = window.location.hostname.toLowerCase();
    const pathname = window.location.pathname.toLowerCase();
    return hostname.startsWith('job.') || pathname === '/job' || pathname.startsWith('/job/');
  });

  useEffect(() => {
    const checkJobDomain = () => {
      const hostname = window.location.hostname.toLowerCase();
      const pathname = window.location.pathname.toLowerCase();
      setIsJobDomain(hostname.startsWith('job.') || pathname === '/job' || pathname.startsWith('/job/'));
    };
    checkJobDomain();
    window.addEventListener('popstate', checkJobDomain);
    return () => window.removeEventListener('popstate', checkJobDomain);
  }, []);

  if (isJobDomain) {
    return (
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="*" element={<JobLandingPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <ScrollToTopOnRoute />
      <Layout>
        <Routes>
          <Route path="/" element={<Suspense fallback={<PageLoader />}><HomePage /></Suspense>} />
          <Route path="/about" element={<Suspense fallback={<PageLoader />}><AboutPage /></Suspense>} />
          <Route path="/privacy" element={<Suspense fallback={<PageLoader />}><PrivacyPage /></Suspense>} />
          <Route path="/terms" element={<Suspense fallback={<PageLoader />}><TermsPage /></Suspense>} />
          <Route path="/contact" element={<Suspense fallback={<PageLoader />}><ContactPage /></Suspense>} />
          <Route path="/faq" element={<Suspense fallback={<PageLoader />}><FAQPage /></Suspense>} />
          <Route path="/standards" element={<Suspense fallback={<PageLoader />}><StandardsPage /></Suspense>} />
          <Route path="/blog" element={<Suspense fallback={<PageLoader />}><BlogPage /></Suspense>} />
          <Route path="/blog/:slug" element={<Suspense fallback={<PageLoader />}><BlogDetailPage /></Suspense>} />
          <Route path="/grade-calculator" element={<Suspense fallback={<PageLoader />}><GradeCalculatorPage /></Suspense>} />
          <Route path="/weighted-grade-calculator" element={<Suspense fallback={<PageLoader />}><WeightedGradeCalculatorPage /></Suspense>} />
          <Route path="/final-grade-calculator" element={<Suspense fallback={<PageLoader />}><FinalGradeCalculatorPage /></Suspense>} />
          <Route path="/test-grade-calculator" element={<Suspense fallback={<PageLoader />}><TestGradeCalculatorPage /></Suspense>} />
          <Route path="/job" element={<Suspense fallback={<PageLoader />}><JobLandingPage /></Suspense>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
