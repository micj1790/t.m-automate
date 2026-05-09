import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Calendar, ArrowRight, Tag } from 'lucide-react';
import { format } from 'date-fns';
import SectionHeader from '@/components/shared/SectionHeader';
import CTASection from '@/components/home/CTASection';

const placeholderPosts = [
  { id: 'b1', title: 'The Future of PLC Programming in South Africa', excerpt: 'How Industry 4.0 is transforming PLC programming practices across South African manufacturing.', cover_image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80', category: 'automation', created_date: '2025-04-15', author: 'T.M Engineering' },
  { id: 'b2', title: '5 Signs Your Factory Needs an Automation Upgrade', excerpt: 'Key indicators that your facility is ready for modern automation technology.', cover_image: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=600&q=80', category: 'tips', created_date: '2025-04-01', author: 'T.M Engineering' },
  { id: 'b3', title: 'SCADA vs DCS: Which Is Right for Your Plant?', excerpt: 'Understanding the differences between SCADA and DCS systems for industrial applications.', cover_image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80', category: 'industry_news', created_date: '2025-03-20', author: 'T.M Engineering' },
  { id: 'b4', title: 'Generator Synchronisation Best Practices', excerpt: 'Essential guidelines for safe and reliable generator synchronisation in industrial facilities.', cover_image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80', category: 'tips', created_date: '2025-03-10', author: 'T.M Engineering' },
];

const categoryLabels = { automation: 'Automation', plc: 'PLC', industry_news: 'Industry News', case_study: 'Case Study', tips: 'Tips & Guides', company_news: 'Company News' };

export default function Blog() {
  const { data: dbPosts } = useQuery({
    queryKey: ['blog-posts'],
    queryFn: () => base44.entities.BlogPost.filter({ status: 'published' }, '-created_date'),
    initialData: [],
  });

  const posts = dbPosts.length > 0 ? dbPosts : placeholderPosts;

  return (
    <div className="pt-20">
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-widest mb-4">Blog & Insights</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground tracking-tight">
              Industry <span className="text-primary">Insights</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">Expert articles on industrial automation, PLC programming, and engineering trends in South Africa.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post, i) => (
              <motion.article key={post.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="group rounded-xl overflow-hidden bg-card border border-border hover:border-primary/30 transition-all">
                <div className="relative h-52 overflow-hidden">
                  <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md bg-primary/90 text-primary-foreground text-xs font-semibold">
                      {categoryLabels[post.category] || post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.created_date ? format(new Date(post.created_date), 'MMM d, yyyy') : ''}</span>
                    <span>•</span>
                    <span>{post.author}</span>
                  </div>
                  <h2 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{post.title}</h2>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{post.excerpt}</p>
                  <span className="text-sm text-primary font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read More <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}