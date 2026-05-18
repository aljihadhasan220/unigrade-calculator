import React from 'react';
import { motion } from 'motion/react';
import { GlassCard, Button } from '../components/UI';
import { BookOpen, ArrowRight, Clock, User, ChevronRight } from 'lucide-react';
import BackButton from '../components/BackButton';
import { SEO } from '../components/SEO';

const blogPosts = [
  {
    title: "How to Calculate GPA",
    description: "A comprehensive guide on understanding Grade Point Average (GPA) using our <a href='/grade-calculator' class='text-primary font-bold'>Universal Grade Calculator</a> for precise results.",
    category: "Guides",
    readTime: "5 min read",
    author: "Academic Team",
    url: "/blog/calculate-gpa"
  },
  {
    title: "Weighted Grade Explained",
    description: "Learn how weighted grades differ from standard averages and why they provide a more accurate picture of your academic standing. Check our <a href='/weighted-grade-calculator' class='text-primary font-bold'>Weighted Calculator</a>.",
    category: "Education",
    readTime: "4 min read",
    author: "UniGrade Experts",
    url: "/blog/weighted-grade-calculator"
  },
  {
    title: "Final Grade Calculator Guide",
    description: "Not sure what you need on your final exam? We break down the math behind our <a href='/final-grade-calculator' class='text-primary font-bold'>Final Grade Planner</a> to help you hit your goals.",
    category: "Tools",
    readTime: "6 min read",
    author: "Academic Team",
    url: "/blog/final-grade-calculator"
  },
  {
    title: "GPA vs CGPA",
    description: "Understand the subtle but critical differences between GPA and Cumulative GPA (CGPA) in international grading standards.",
    category: "Comparison",
    readTime: "3 min read",
    author: "UniGrade Experts",
    url: "/blog/gpa-vs-cgpa"
  },
  {
    title: "US Grading System",
    description: "An in-depth look at the 4.0 scale used in the United States, including honors/AP weighting and letter grade conversions supported in our <a href='/grade-calculator' class='text-primary font-bold'>Grade Engine</a>.",
    category: "Standards",
    readTime: "7 min read",
    author: "Academic Team",
    url: "/blog/us-grading-scale"
  },
  {
    title: "Percentage to GPA Conversion",
    description: "Converting percentage marks to GPA can be tricky. This guide provides reliable formulas for global standards compatibility.",
    category: "Math",
    readTime: "5 min read",
    author: "UniGrade Experts",
    url: "/blog/percentage-to-gpa"
  },
  {
    title: "Test Grade Calculator Guide",
    description: "How to use our <a href='/test-grade-calculator' class='text-primary font-bold'>Test Grade Calculator</a> to track individual quiz, midterm, and lab performances throughout the semester.",
    category: "Guides",
    readTime: "4 min read",
    author: "Academic Team",
    url: "/blog/test-grade-calculator"
  },
  {
    title: "Academic Performance Tips",
    description: "Best practices for students to monitor their grades, stay organized, and use data-driven insights to improve their results.",
    category: "Student Tips",
    readTime: "5 min read",
    author: "UniGrade Experts",
    url: "/blog/performance-tips"
  }
];

export default function BlogPage() {
  return (
    <div className="pt-24 md:pt-36 pb-12 md:pb-24 px-4 md:px-6 gpu-accelerate">
      <SEO 
        title="UniGrade Blog | GPA, CGPA & Grade Calculator Guides"
        description="Explore UniGrade academic guides, GPA calculation tutorials, weighted grade explanations, grading systems, and student resources."
        canonical="/blog"
        schema={{
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "UniGrade Academic Blog",
          "description": "Guides and resources for students on GPA calculation and academic performance.",
          "publisher": {
            "@type": "Organization",
            "name": "UniGrade",
            "logo": {
              "@type": "ImageObject",
              "url": "https://unigrade.site/og-image.png"
            }
          },
          "blogPost": blogPosts.map(post => ({
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.description,
            "author": { "@type": "Person", "name": post.author },
            "publisher": { "@type": "Organization", "name": "UniGrade" },
            "url": `https://unigrade.site${post.url}`
          }))
        }}
      />
      
      <div className="max-w-7xl mx-auto">
        <BackButton />
        
        {/* Hero Section */}
        <div className="mb-16 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 text-primary text-xs font-bold uppercase tracking-wider mb-6">
              <BookOpen size={14} />
              <span>Academic Blog</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold font-display mb-6 tracking-tight text-[#111827]">
              UniGrade Academic Blog
            </h1>
            <p className="text-lg md:text-xl text-gray-500 max-w-2xl font-medium leading-relaxed">
              Guides, grading insights, GPA tips, and academic resources for global students.
            </p>
          </motion.div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <GlassCard className="group h-full flex flex-col hover:border-primary/20 transition-all duration-300">
                <div className="p-8 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-lg bg-gray-50 text-[10px] font-bold uppercase tracking-wider text-gray-400 group-hover:bg-primary/5 group-hover:text-primary transition-colors">
                      {post.category}
                    </span>
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-300">
                      <Clock size={12} />
                      {post.readTime}
                    </div>
                  </div>
                  
                  <h2 className="text-xl font-extrabold font-display text-[#111827] mb-4 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  
                  <div 
                    className="text-sm text-gray-500 font-medium leading-relaxed mb-8 line-clamp-4"
                    dangerouslySetInnerHTML={{ __html: post.description }}
                  />
                  
                  <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-50">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                        <User size={14} />
                      </div>
                      <span className="text-[11px] font-bold text-gray-400">{post.author}</span>
                    </div>
                    
                    <button className="flex items-center gap-1 text-primary text-xs font-bold group/btn hover:opacity-80 transition-opacity">
                      <span>Read More</span>
                      <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Newsletter / CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <GlassCard className="p-8 md:p-12 text-center bg-gradient-to-br from-white/70 to-primary/5">
            <h2 className="text-2xl md:text-3xl font-extrabold font-display text-[#111827] mb-4">
              Get Academic Tips in Your Inbox
            </h2>
            <p className="text-gray-500 font-medium mb-8 max-w-xl mx-auto">
              Join 50,000+ students receiving monthly grading insights and academic productivity tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-6 py-4 rounded-xl bg-white border border-gray-100 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all font-medium"
              />
              <Button>Subscribe</Button>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
