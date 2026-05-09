import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Tag } from 'lucide-react';
import CTASection from '@/components/home/CTASection';
import SectionHeader from '@/components/shared/SectionHeader';

const fallbackPosts = [
  { title: 'The Future of Industrial Automation in South Africa', excerpt: 'How Industry 4.0 and IIoT are transforming manufacturing and processing plants across South Africa.', category: 'industry_news', author: 'T.M Engineering', created_date: '2025-03-01', cover_image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80', status: 'published' },
  { title: 'PLC vs DCS: Which Control System is Right for Your Plant?', excerpt: 'A comprehensive guide to choosing between PLCs and distributed control systems for industrial applications.', category: 'automation', author: 'T.M Engineering', created_date: '2025-02-15', cover_image: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800&q=80', status: 'published' },
  { title: 'How to Reduce Downtime with Preventive Maintenance', excerpt: 'Practical strategies for FMCG and manufacturing plants to minimise unplanned stoppages and maximise OEE.', category: 'tips', author: 'T.M Engineering', created_date: '2025-01-20', cover_image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80', status: 'published' },
  { title: 'SCADA Systems: A Complete Guide for South African Manufacturers', excerpt: 'Everything you need to know about implementing SCADA systems in your South African manufacturing facility.', category: 'automation', author: 'T.M Engineering', created_date: '2025-01-05', cover_image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80', status: 'published' },
  { title: 'MCC Panels: Design Best Practices and SANS Standards', excerpt: 'A technical deep-dive into motor control centre design, protection coordination and compliance with South African standards.', category: 'plc', author: 'T.M Engineering', created_date: '2024-12-10', cover_image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', status: 'published' },
  { title: 'Case Study: 60% Downtime Reduction at Cape Food Processing', excerpt: 'How T.M Engineering transformed a food processing production line with modern PLC automation and SCADA monitoring.', category: 'case_study', author: 'T.M Engineering', created_date: '2024-11-22', cover_image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80', status: 'published' },
];

const catLabels = { automation: 'Automation', plc: 'PLC', industry_news: 'Industry News', case_study: 'Case Study', tips: 'Tips & Guides', company_news: 'Company News' };
const catColors = { automation: 'bg-primary/8 text-primary border-primary/15', plc: 'bg-purple-400/8 text-purple-400 border-purple-400/15', industry_news: 'bg-accent/8 text-accent border-accent/15', case_study: 'bg-green-400/8 text-green-400 border-green-400/15', tips: 'bg-yellow-400/8 text-yellow-400 border-yellow-400/15', company_news: 'bg-blue-400/8 text-blue-400 border-blue-400/15' };
const cats = ['All', 'Automation', 'PLC', 'Industry News', 'Case Study', 'Tips & Guides'];

export default function Blog() {
  const [filter, setFilter] = useState('All');
  const { data: posts = [] } = useQuery({
    queryKey: ['blog-published'],
    queryFn: () => base44.entities.BlogPost.filter({ status: 'published' }, '-created_date'),
  });

  const display = (posts.length > 0 ? posts : fallbackPosts).filter(p =>
    filter === 'All' || catLabels[p.category] === filter
  );

  return (
    <div className="pt-16">
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=80" alt="Blog" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-background/88" />
          <div className="absolute inset-0 grid-pattern opacity-40" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/8 border border-primary/15 text-primary text-[11px] font-bold uppercase tracking-widest mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> Industry Insights
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-foreground tracking-tight mb-5">Blog & Insights</h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Expert insights on industrial automation, PLC programming, SCADA systems and the latest trends in South African manufacturing.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar mb-10 pb-1">
            {cats.map(c => (
              <button key={c} onClick={() => setFilter(c)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${filter === c ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground'}`}>
                {c}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {display.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
                <div className="group rounded-2xl bg-card border border-border hover:border-primary/25 transition-all overflow-hidden gradient-border h-full flex flex-col">
                  <div className="aspect-[16/9] relative overflow-hidden">
                    <img src={p.cover_image || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80'} alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-card/60 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className={`px-2.5 py-1 rounded-full border text-[10px] font-semibold ${catColors[p.category] || 'bg-primary/8 text-primary border-primary/15'}`}>
                        {catLabels[p.category] || p.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-sm font-bold text-foreground mb-2 group-hover:text-primary transition-colors leading-snug">{p.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 flex-1 mb-4">{p.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" />
                        {p.created_date ? new Date(p.created_date).toLocaleDateString('en-ZA', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}
                      </div>
                      <span className="text-primary font-semibold flex items-center gap-1">Read <ArrowRight className="w-3 h-3" /></span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}