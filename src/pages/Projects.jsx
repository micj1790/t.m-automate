import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Filter, Search, ArrowRight, ExternalLink } from 'lucide-react';
import { Input } from '@/components/ui/input';
import CTASection from '@/components/home/CTASection';
import SectionHeader from '@/components/shared/SectionHeader';

const ytVideos = [
  { id: 'cmfQPh0OZOQ', title: 'Clever Machine', sub: 'High Speed Vertical Sleeving Machine' },
  { id: 'xJnWPhd8txU', title: 'TM Labelling Machine', sub: 'Wrap-around labeller for bottled water' },
  { id: 'dCwktKRQ4Ck', title: 'High Speed Labelling', sub: 'High speed labelling system' },
  { id: 'b7EY71ckx-0', title: 'Liquid Filler Machine', sub: 'Automatic liquid filler' },
  { id: 'ach8vrJQ-jY', title: 'Automatic Shrink Tunnel', sub: 'Full automatic shrink tunnel' },
  { id: '7uRvWpIYDdY', title: 'Pick & Place Capper', sub: 'Fully automatic with torque control' },
];

const fallback = [
  { title: 'Vacuum Sealer Refurbishment', description: 'Complete control system upgrade for industrial vacuum sealing machines. Replaced legacy relay logic with Siemens S7-1200 PLC and KTP700 HMI.', client: 'SA Food Processing', industry: 'food_beverage', service_type: 'Machine Refurbishments', location: 'Cape Town', year: 2024, status: 'completed', image_urls: ['https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80'], results: '50% reduction in downtime, 30% increase in production speed.' },
  { title: 'MCC Installation — Automotive Plant', description: 'Design, manufacture and installation of a 16-bucket MCC panel with soft starters, VSDs and full protection coordination.', client: 'Johannesburg Automotive', industry: 'manufacturing', service_type: 'MCC Panels', location: 'Johannesburg', year: 2024, status: 'completed', image_urls: ['https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800&q=80'] },
  { title: 'Conveyor Belt Control System', description: 'Automated conveyor belt system with PLC control, speed monitoring, belt alignment detection and centralised SCADA monitoring.', client: 'Gauteng Mining Corp', industry: 'mining', service_type: 'Conveyor Systems', location: 'Gauteng', year: 2023, status: 'completed', image_urls: ['https://images.unsplash.com/photo-1513828583688-c52646db42da?w=800&q=80'], results: 'Real-time monitoring of 12 conveyor belts from central control room.' },
  { title: 'PLC Retrofit — Packaging Line', description: 'Migration from legacy relay logic to Allen-Bradley CompactLogix with PanelView Plus HMI for high-speed packaging line.', client: 'National Beverages', industry: 'food_beverage', service_type: 'PLC Programming', location: 'Durban', year: 2023, status: 'completed', image_urls: ['https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80'] },
  { title: 'SCADA — Water Treatment Plant', description: 'Wonderware SCADA implementation for municipal water treatment with remote monitoring and alarm management.', client: 'Municipal Water Authority', industry: 'industrial_processing', service_type: 'SCADA Systems', location: 'Pretoria', year: 2024, status: 'completed', image_urls: ['https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80'], results: '24/7 remote monitoring with 99.9% system uptime.' },
  { title: 'Generator Synchronisation System', description: 'Automatic synchronisation and load sharing system for three 1MW diesel generators at a data centre.', client: 'DataCentre SA', industry: 'data_centres', service_type: 'Generator Control', location: 'Johannesburg', year: 2024, status: 'completed', image_urls: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80'] },
];

const industryLabels = { food_beverage: 'Food & Beverage', fmcg: 'FMCG', manufacturing: 'Manufacturing', mining: 'Mining', pharmaceutical: 'Pharmaceutical', data_centres: 'Data Centres', industrial_processing: 'Industrial Processing' };

const industries = ['All', 'Food & Beverage', 'FMCG', 'Manufacturing', 'Mining', 'Pharmaceutical', 'Data Centres', 'Industrial Processing'];

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [activeVideo, setActiveVideo] = useState(null);

  const { data: projects = [] } = useQuery({
    queryKey: ['projects-all'],
    queryFn: () => base44.entities.Project.list('-year', 50),
  });

  const display = (projects.length > 0 ? projects : fallback).filter(p => {
    const industryMatch = filter === 'All' || (industryLabels[p.industry] === filter || p.industry === filter);
    const searchMatch = !search || p.title?.toLowerCase().includes(search.toLowerCase()) || p.description?.toLowerCase().includes(search.toLowerCase());
    return industryMatch && searchMatch;
  });

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80" alt="Projects" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-background/88" />
          <div className="absolute inset-0 grid-pattern opacity-40" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/8 border border-primary/15 text-primary text-[11px] font-bold uppercase tracking-widest mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> Our Portfolio
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-foreground tracking-tight mb-5">Projects & Case Studies</h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              500+ completed projects across all major industries. From labelling machines to complete factory automation — our work speaks for itself.
            </p>
          </motion.div>
        </div>
      </section>

      {/* YouTube Video Showcase */}
      <section className="py-16 bg-card/20 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Watch Live" title="Machines in Action" description="See our actual machines running on YouTube — labelling, filling, capping and more." />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {ytVideos.map(v => (
              <motion.div key={v.id} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                className="group relative cursor-pointer rounded-xl overflow-hidden border border-border hover:border-primary/30 transition-all"
                onClick={() => setActiveVideo(activeVideo === v.id ? null : v.id)}
                >
                <div className="aspect-video relative">
                  {activeVideo === v.id ? (
                    <iframe src={`https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0`} title={v.title} className="w-full h-full" allow="autoplay; encrypted-media; fullscreen" allowFullScreen />
                  ) : (
                    <>
                      <img src={`https://img.youtube.com/vi/${v.id}/maxresdefault.jpg`} alt={v.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Play className="w-5 h-5 text-white ml-1" />
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div className="p-3">
                  <div className="text-xs font-bold text-foreground">{v.title}</div>
                  <div className="text-[10px] text-muted-foreground">{v.sub}</div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-6">
            <a href="https://www.youtube.com/channel/UC4-3DeJMQVVApm9GhNI4TBg" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-red-500/30 bg-red-500/5 text-red-400 text-sm font-semibold hover:bg-red-500/10 transition-colors">
              <Play className="w-4 h-4" /> View All Videos on YouTube <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* Projects gallery */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search projects..." className="pl-10 bg-secondary border-border" />
            </div>
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              {industries.map(i => (
                <button key={i} onClick={() => setFilter(i)}
                  className={`shrink-0 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${filter === i ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground'}`}>
                  {i}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {display.map((p, i) => (
                <motion.div key={p.id || p.title} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: i * 0.05 }}>
                  <div className="group rounded-2xl bg-card border border-border hover:border-primary/25 transition-all overflow-hidden gradient-border">
                    <div className="aspect-[16/10] relative overflow-hidden">
                      <img src={p.image_urls?.[0] || 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800&q=80'} alt={p.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent" />
                      {p.results && (
                        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-semibold">
                          ✓ Success
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-2">
                        {p.service_type && <span className="px-2 py-0.5 rounded-full bg-primary/8 border border-primary/15 text-primary text-[10px] font-semibold">{p.service_type}</span>}
                        {p.year && <span className="text-[10px] text-muted-foreground">{p.year}</span>}
                      </div>
                      <h3 className="text-sm font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{p.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-3">{p.description}</p>
                      {p.results && (
                        <div className="p-2.5 rounded-lg bg-green-500/5 border border-green-500/15 text-xs text-green-400 mb-3">
                          <span className="font-semibold">Result: </span>{p.results}
                        </div>
                      )}
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{p.client || p.location || ''}</span>
                        <span className="px-2 py-0.5 rounded-full bg-secondary">{industryLabels[p.industry] || p.industry || 'Engineering'}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {display.length === 0 && (
            <div className="text-center py-20 text-muted-foreground text-sm">No projects match your filter. Try a different category.</div>
          )}
        </div>
      </section>

      <CTASection />
    </div>
  );
}