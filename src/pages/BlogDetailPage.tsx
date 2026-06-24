import React, { useState, memo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { blogPosts, BlogPost } from '../data/blogData';
import { SEO } from '../components/SEO';
import { GlassCard } from '../components/UI';
import BackButton from '../components/BackButton';
import { Calendar, User, Clock, ChevronRight, BookOpen, ChevronDown, CheckCircle } from 'lucide-react';

const FAQAccordionItem = memo(({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-gray-100 rounded-xl bg-white overflow-hidden transition-all shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
      >
        <span className="font-extrabold text-gray-900 text-sm md:text-base leading-snug">
          {question}
        </span>
        <ChevronDown 
          className={`text-gray-400 shrink-0 transition-transform duration-300 ml-4 ${isOpen ? 'rotate-180 text-primary' : ''}`} 
          size={18} 
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <div className="px-6 pb-5 text-sm text-gray-500 leading-relaxed border-t border-gray-50 pt-3">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="pt-32 pb-24 px-4 text-center">
        <h1 className="text-3xl font-extrabold mb-4 font-display text-gray-900">Article Not Found</h1>
        <p className="text-gray-500 mb-8 font-medium">The academic guide you are looking for does not exist.</p>
        <Link to="/blog">
          <button className="px-6 py-3 rounded-xl bg-primary text-white font-bold hover:opacity-95 transition-all">
            Back to Blog
          </button>
        </Link>
      </div>
    );
  }

  // Generate Schemas dynamically
  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "image": post.imageUrl,
    "datePublished": "2026-06-23T10:28:45-07:00",
    "dateModified": "2026-06-23T10:28:45-07:00",
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "UniGrade",
      "logo": {
        "@type": "ImageObject",
        "url": "https://unigrade.site/og-image.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://unigrade.site/blog/${post.slug}`
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": post.faqs.map(f => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer
      }
    }))
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://unigrade.site"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://unigrade.site/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": `https://unigrade.site/blog/${post.slug}`
      }
    ]
  };

  const combinedSchema = {
    "@graph": [blogPostingSchema, faqSchema, breadcrumbSchema]
  };

  return (
    <div className="pt-24 md:pt-36 pb-12 md:pb-24 px-4 md:px-6 gpu-accelerate">
      <SEO 
        title={post.metaTitle}
        description={post.metaDescription}
        canonical={`/blog/${post.slug}`}
        type="article"
        schema={combinedSchema}
      />

      <div className="max-w-7xl mx-auto">
        <BackButton />

        {/* Breadcrumb Navigation for SEO */}
        <nav aria-label="Breadcrumb" className="mb-8 mt-4">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs font-bold text-gray-400">
            <li>
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            </li>
            <li className="flex items-center gap-1.5">
              <ChevronRight size={12} className="text-gray-300" />
              <Link to="/blog" className="hover:text-primary transition-colors">Blog</Link>
            </li>
            <li className="flex items-center gap-1.5 text-gray-500 truncate max-w-[200px] sm:max-w-xs md:max-w-md">
              <ChevronRight size={12} className="text-gray-300" />
              <span aria-current="page">{post.title}</span>
            </li>
          </ol>
        </nav>

        {/* Hero Area */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 text-primary text-xs font-bold uppercase tracking-wider mb-6">
            <BookOpen size={14} />
            <span>{post.category}</span>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold font-display mb-6 tracking-tight text-[#111827] leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-xs font-bold text-gray-400 mb-8 border-b border-gray-100 pb-8">
            <div className="flex items-center gap-1.5">
              <User size={14} className="text-gray-300" />
              <span>By {post.author}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar size={14} className="text-gray-300" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={14} className="text-gray-300" />
              <span>{post.readTime}</span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="rounded-3xl overflow-hidden shadow-xl shadow-gray-100/40 relative aspect-video max-h-[500px] w-full bg-gray-50">
            <img 
              src={post.imageUrl} 
              alt={post.title}
              loading="lazy"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Main Content & Sidebar Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Article body */}
          <article className="lg:col-span-8 space-y-8">
            
            {/* Table of Contents Box */}
            <GlassCard className="p-6 md:p-8 border border-primary/5">
              <h2 className="text-lg font-extrabold font-display text-gray-950 mb-4 flex items-center gap-2">
                <span>Table of Contents</span>
              </h2>
              <ul className="space-y-2.5">
                {post.toc.map(item => (
                  <li 
                    key={item.id} 
                    className={`font-bold text-sm ${item.level === 3 ? 'pl-4 text-xs' : ''}`}
                  >
                    <a 
                      href={`#${item.id}`} 
                      className="text-gray-500 hover:text-primary transition-colors flex items-center gap-1.5 group"
                    >
                      <ChevronRight size={12} className="text-gray-300 group-hover:text-primary transition-colors shrink-0" />
                      <span>{item.text}</span>
                    </a>
                  </li>
                ))}
                <li className="font-bold text-sm">
                  <a 
                    href="#faqs-section" 
                    className="text-gray-500 hover:text-primary transition-colors flex items-center gap-1.5 group"
                  >
                    <ChevronRight size={12} className="text-gray-300 group-hover:text-primary transition-colors shrink-0" />
                    <span>Frequently Asked Questions (FAQ)</span>
                  </a>
                </li>
              </ul>
            </GlassCard>

            {/* Dynamic Article Sections Content */}
            <div className="space-y-8 text-gray-600 leading-relaxed text-sm md:text-base font-medium">
              {post.sections.map((section, idx) => {
                switch (section.type) {
                  case 'paragraph':
                    return (
                      <p key={idx} className="leading-relaxed">
                        {section.text}
                      </p>
                    );
                  
                  case 'h2':
                    const h2Id = post.toc.find(item => item.text.includes(section.text || ''))?.id || '';
                    return (
                      <h2 
                        key={idx} 
                        id={h2Id}
                        className="text-2xl md:text-3xl font-extrabold font-display text-gray-900 pt-6 scroll-mt-28"
                      >
                        {section.text}
                      </h2>
                    );

                  case 'h3':
                    const h3Id = post.toc.find(item => item.text.includes(section.text || ''))?.id || '';
                    return (
                      <h3 
                        key={idx} 
                        id={h3Id}
                        className="text-xl md:text-2xl font-extrabold font-display text-gray-900 pt-4 scroll-mt-28"
                      >
                        {section.text}
                      </h3>
                    );

                  case 'list':
                    return (
                      <ul key={idx} className="space-y-3.5 pl-6 list-disc text-gray-500">
                        {section.items?.map((item, lIdx) => (
                          <li key={lIdx}>
                            {item}
                          </li>
                        ))}
                      </ul>
                    );

                  case 'table':
                    return (
                      <div key={idx} className="overflow-x-auto my-6 border border-gray-100 rounded-2xl shadow-sm bg-white">
                        <table className="min-w-full divide-y divide-gray-100">
                          <thead className="bg-gray-50">
                            <tr>
                              {section.headers?.map((header, hIdx) => (
                                <th 
                                  key={hIdx} 
                                  className="px-6 py-4 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider"
                                >
                                  {header}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100 bg-white text-xs md:text-sm">
                            {section.rows?.map((row, rIdx) => (
                              <tr key={rIdx} className="hover:bg-gray-50/50 transition-colors">
                                {row.map((cell, cIdx) => (
                                  <td key={cIdx} className="px-6 py-4 text-gray-600 font-medium">
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    );

                  case 'formula':
                    return (
                      <div key={idx} className="my-6 p-6 md:p-8 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl border border-primary/10 text-center relative overflow-hidden">
                        <span className="absolute -right-6 -bottom-6 text-9xl text-primary/5 font-extrabold select-none pointer-events-none">f(x)</span>
                        <div className="font-mono font-bold text-base md:text-lg text-primary mb-2">
                          {section.text}
                        </div>
                        {section.subText && (
                          <p className="text-xs text-gray-400 font-bold max-w-lg mx-auto">
                            {section.subText}
                          </p>
                        )}
                      </div>
                    );

                  case 'callout':
                    return (
                      <div key={idx} className="my-6 p-6 bg-primary/[0.03] border-l-4 border-primary rounded-r-2xl flex gap-4 items-start">
                        <CheckCircle size={20} className="text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-700 font-bold leading-relaxed">
                            {section.text}
                          </p>
                        </div>
                      </div>
                    );

                  case 'image':
                    return (
                      <div key={idx} className="my-8 space-y-2 text-center">
                        <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-lg relative bg-gray-50 aspect-video max-h-[380px] w-full mx-auto">
                          <img 
                            src={section.imageUrl} 
                            alt={section.text || "Illustration"} 
                            loading="lazy"
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        {section.subText && (
                          <p className="text-xs text-gray-400 font-bold italic pt-1 max-w-xl mx-auto">
                            {section.subText}
                          </p>
                        )}
                      </div>
                    );

                  default:
                    return null;
                }
              })}
            </div>

            {/* Accessible FAQ Section */}
            <div id="faqs-section" className="pt-12 border-t border-gray-100 scroll-mt-28">
              <h2 className="text-2xl md:text-3xl font-extrabold font-display text-gray-900 mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {post.faqs.map((faq, fIdx) => (
                  <FAQAccordionItem 
                    key={fIdx}
                    question={faq.question}
                    answer={faq.answer}
                  />
                ))}
              </div>
            </div>

          </article>

          {/* Sticky Interactive Sidebar */}
          <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-28">
            
            {/* Quick Calculator Tool Widget */}
            <GlassCard className="p-6 md:p-8 border border-primary/5 bg-gradient-to-b from-white to-primary/[0.01]">
              <h3 className="text-lg font-extrabold font-display text-[#111827] mb-3">
                Calculators & Analytics
              </h3>
              <p className="text-xs text-gray-400 font-bold mb-6">
                Calculate, plan, and analyze your scores instantly with our universal tools:
              </p>
              
              <div className="space-y-3.5">
                <Link to="/grade-calculator" className="block group">
                  <div className="p-3.5 rounded-xl border border-gray-100 bg-white hover:border-primary/20 hover:shadow-md transition-all flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-extrabold text-gray-900 group-hover:text-primary transition-colors">GPA Grade Calculator</h4>
                      <p className="text-[10px] text-gray-400 font-medium mt-0.5">Primary GPA tracking engine</p>
                    </div>
                    <ChevronRight size={14} className="text-gray-300 group-hover:text-primary transition-colors group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>

                <Link to="/weighted-grade-calculator" className="block group">
                  <div className="p-3.5 rounded-xl border border-gray-100 bg-white hover:border-primary/20 hover:shadow-md transition-all flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-extrabold text-gray-900 group-hover:text-primary transition-colors">Weighted Grade Calculator</h4>
                      <p className="text-[10px] text-gray-400 font-medium mt-0.5">For categories & weighted terms</p>
                    </div>
                    <ChevronRight size={14} className="text-gray-300 group-hover:text-primary transition-colors group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>

                <Link to="/final-grade-calculator" className="block group">
                  <div className="p-3.5 rounded-xl border border-gray-100 bg-white hover:border-primary/20 hover:shadow-md transition-all flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-extrabold text-gray-900 group-hover:text-primary transition-colors">Final Grade Planner</h4>
                      <p className="text-[10px] text-gray-400 font-medium mt-0.5">Reverse-engineer required scores</p>
                    </div>
                    <ChevronRight size={14} className="text-gray-300 group-hover:text-primary transition-colors group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>

                <Link to="/test-grade-calculator" className="block group">
                  <div className="p-3.5 rounded-xl border border-gray-100 bg-white hover:border-primary/20 hover:shadow-md transition-all flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-extrabold text-gray-900 group-hover:text-primary transition-colors">Test & Quiz Calculator</h4>
                      <p className="text-[10px] text-gray-400 font-medium mt-0.5">Track midterms, tests and labs</p>
                    </div>
                    <ChevronRight size={14} className="text-gray-300 group-hover:text-primary transition-colors group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              </div>
            </GlassCard>

            {/* Other resources and articles */}
            <GlassCard className="p-6 md:p-8 border border-primary/5">
              <h3 className="text-lg font-extrabold font-display text-[#111827] mb-4">
                Other Guides
              </h3>
              <div className="space-y-4">
                {blogPosts.filter(bp => bp.slug !== post.slug).slice(0, 3).map(bp => (
                  <Link key={bp.slug} to={`/blog/${bp.slug}`} className="block group">
                    <div className="flex gap-4">
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-50 shrink-0 border border-gray-100">
                        <img 
                          src={bp.imageUrl} 
                          alt={bp.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-extrabold text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
                          {bp.title}
                        </h4>
                        <span className="text-[10px] text-gray-400 font-bold mt-1 block">
                          {bp.readTime}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </GlassCard>

          </aside>

        </div>

      </div>
    </div>
  );
}
