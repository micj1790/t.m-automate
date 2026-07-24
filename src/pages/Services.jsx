import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronDown, ArrowRight } from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';
import BrandsBanner from '@/components/home/BrandsBanner';
import SEO from '@/components/SEO';
import { services, categories } from '@/data/services';

export default function Services() {
  const [active, setActive] = useState('All');
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('');

  const filtered = services.filter(s => {
    const matchesCategory = active === 'All' || s.category === active;
    const matchesSearch = search === '' || s.title.toLowerCase().includes(search.toLowerCase()) || s.short.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-16">
      <SEO title="PLC & HMI System Integrators | Industrial Automation Services | T.M Engineering" description="T.M Engineering are extreme specialists in PLC & HMI system integration. We program, supply and commission Siemens, Allen-Bradley, Schneider, Mitsubishi and all major brands. 24/7 support across South Africa." />
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ height: 'calc(100vh - 64px)', maxHeight: '700px', minHeight: '400px' }}>
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=1920&q=90" alt="Services" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-background/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background" />
          <div className="absolute inset-0 grid-pattern opacity-30" />
        </div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pb-32">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary text-[11px] font-bold uppercase tracking-widest mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> What We Do
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-5">Our Services</h1>
            <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto">
              Specialist engineering services covering industrial automation, electrical engineering, custom machines and 24/7 technical support.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-36 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1">
          <span className="text-[11px] font-semibold text-white/70 uppercase tracking-widest">Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}>
            <ChevronDown className="w-6 h-6 text-white/70" />
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <BrandsBanner />
        </div>
      </section>

      {/* Filter bar */}
      <section className="sticky top-16 z-30 bg-background/95 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-3 py-3">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar flex-1">
              {categories.map(cat => (
               <button key={cat} onClick={() => setActive(cat)}
                 className={`shrink-0 w-28 py-2 rounded-full text-xs font-semibold transition-all text-center ${
                   active === cat ? 'bg-primary text-white' : 'bg-secondary text-foreground hover:bg-secondary/80'
                 }`}>
                 {cat}
               </button>
              ))}
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search services..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full sm:w-64 px-4 py-1.5 rounded-full bg-secondary border border-border text-xs text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((s, i) => (
                <motion.div key={s.title} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ delay: i * 0.04 }}>
                  <div onClick={() => setSelected(selected?.title === s.title ? null : s)}
                    className="group cursor-pointer rounded-2xl bg-card border border-border hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-200 overflow-hidden h-full">
                    {/* Card header */}
                    <div className="p-6 pb-4">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                          <s.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-0.5">{s.category}</span>
                          <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors leading-tight">{s.title}</h3>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{s.short}</p>
                    </div>

                    {/* Expanded content */}
                    <AnimatePresence>
                      {selected?.title === s.title && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden">
                          <div className="px-6 pb-4 border-t border-border pt-4">
                            <p className="text-sm text-muted-foreground leading-relaxed mb-4">{s.desc}</p>
                            <ul className="grid grid-cols-1 gap-2">
                              {s.features.map(f => (
                                <li key={f} className="flex items-center gap-2.5 text-sm text-foreground">
                                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />{f}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Footer */}
                    <div className="px-6 py-3 border-t border-border bg-secondary/30 flex items-center justify-between">
                      <Link to={`/services/${s.slug}`} onClick={e => e.stopPropagation()} className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors">
                        {selected?.title === s.title ? 'Show less' : 'Learn more'} <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                      <Link to="/quote" onClick={e => e.stopPropagation()} className="text-[10px] font-bold text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider">
                        Get Quote →
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

    </div>
  );
}