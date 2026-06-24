import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { GlassCard, Button } from '../components/UI';
import { BookOpen, ArrowRight, Clock, User, Calendar } from 'lucide-react';
import BackButton from '../components/BackButton';
import { SEO } from '../components/SEO';
import { blogPosts } from '../data/blogData';

export default function BlogPage() {
  // Sort blog posts with newest first (publish date descending)
  const sortedBlogPosts = [...blogPosts].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="pt-24 md:pt-36 pb-12 md:pb-24 px-4 md:px-6 gpu-accelerate">
      <SEO 
        title="UniGrade Blog | GPA, CGPA & Grade Calculator Guides"
        description="Explore UniGrade academic guides, GPA calculation tutorials, weighted grade explanations, grading systems, and student resources."
        canonical="/blog"
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "Blog", item: "/blog" }
        ]}
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
              "url": "https://unigrade.site/logo.svg"
            }
          },
          "blogPost": sortedBlogPosts.map(post => ({
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.description,
            "author": { "@type": "Person", "name": post.author },
            "publisher": { "@type": "Organization", "name": "UniGrade" },
            "url": `https://unigrade.site/blog/${post.slug}`
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
          {sortedBlogPosts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <GlassCard className="group h-full flex flex-col overflow-hidden hover:border-primary/20 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-gray-100/30">
                <Link to={`/blog/${post.slug}`} className="block relative aspect-video overflow-hidden bg-gray-50">
                  <img 
                    src={post.imageUrl} 
                    alt={post.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-lg bg-white/95 backdrop-blur-sm text-[10px] font-extrabold uppercase tracking-wider text-primary shadow-sm">
                      {post.category}
                    </span>
                  </div>
                </Link>
                
                <div className="p-6 md:p-8 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-4 text-[10px] font-bold text-gray-400">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={12} className="text-gray-300" />
                      {post.date}
                    </span>
                    <div className="flex items-center gap-1.5 text-gray-400">
                      <Clock size={12} className="text-gray-300" />
                      {post.readTime}
                    </div>
                  </div>
                  
                  <Link to={`/blog/${post.slug}`}>
                    <h2 className="text-xl font-extrabold font-display text-[#111827] mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </h2>
                  </Link>
                  
                  <p className="text-sm text-gray-500 font-medium leading-relaxed mb-6 line-clamp-3">
                    {post.description}
                  </p>
                  
                  <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-50">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors border border-gray-100">
                        <User size={14} />
                      </div>
                      <span className="text-[11px] font-bold text-gray-400">{post.author}</span>
                    </div>
                    
                    <Link to={`/blog/${post.slug}`} className="flex items-center gap-1 text-primary text-xs font-bold group/btn hover:opacity-80 transition-opacity">
                      <span>Read More</span>
                      <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
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
