import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { ArrowRight, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import SectionHeader from '@/components/shared/SectionHeader';
import CTASection from '@/components/home/CTASection';

const industryFilters = ['All', 'Food & Beverage', 'Mining', 'Pharmaceutical', 'Manufacturing', 'Data Centres', 'Industrial Processing'];
const industryMap = { 'Food & Beverage': 'food_beverage', 'Mining': 'mining', 'Pharmaceutical': 'pharmaceutical', 'Manufacturing': 'manufacturing', 'Data Centres': 'data_centres', 'Industrial Processing': 'industrial_processing' };

const placeholderProjects = [
  { id: 'p1', title: 'Vacuum Sealer Refurbishment', industry: 'food_beverage', description: 'Complete control system upgrade for industrial vacuum sealing machines. New PLC, HMI, and VSD integration.', image_urls: ['https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80'], service_type: 'Machine Refurbishments', year: 2024 },
  { id: 'p2', title: 'MCC Installation — Gauteng Plant', industry: 'manufacturing', description: 'Design, manufacture, and installation of a 12-bucket MCC panel with soft starters and VSD drives.', image_urls: ['https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=600&q=80'], service_type: 'MCC Panels', year: 2024 },
  { id: 'p3', title: 'Conveyor Control System', industry: 'mining', description: 'Automated conveyor belt system with PLC control, speed monitoring, and belt alignment detection.', image_urls: ['https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=600&q=80'], service_type: 'Conveyor Systems', year: 2023 },
  { id: 'p4', title: 'PLC Retrofit — Packaging Line', industry: 'food_beverage', description: 'Migration from legacy relay logic to Siemens S7-1500 PLC with Comfort Panel HMI.', image_urls: ['https://images.unsplash.com/photo-1567446537708-ac4aa75c9c28?w=600&q=80'], service_type: 'PLC & HMI Programming', year: 2023 },
  { id: 'p5', title: 'Factory Power Upgrade', industry: 'manufacturing', description: 'Complete LV distribution upgrade including new main switchboard and distribution boards.', image_urls: ['https://images.unsplash.com/photo-1513828583688-c52646db42da?w=600&q=80'], service_type: 'Factory Upgrades', year: 2024 },
  { id: 'p6', title: 'SCADA System — Water Treatment', industry: 'industrial_processing', description: 'Wonderware SCADA implementation for a municipal water treatment plant with remote monitoring.', image_urls: ['https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80'], service_type: 'SCADA Systems', year: 2024 },
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');

  const { data: dbProjects } = useQuery({
    queryKey: ['projects'],
    queryFn: () => base44.entities.Project.list('-created_date'),
    initialData: [],
  });

  const allProjects = dbProjects.length > 0 ? dbProjects : placeholderProjects;

  const filtered = allProjects.filter(p => {
    const industryMatch = activeFilter === 'All' || p.industry === industryMap[activeFilter];
    const searchMatch = !search || p.title?.toLowerCase().includes(search.toLowerCase()) || p.description?.toLowerCase().includes(search.toLowerCase());
    return industryMatch && searchMatch;
  });

  return (
    <div className="pt-20">
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-widest mb-4">Portfolio</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground tracking-tight">
              Our <span className="text-primary">Projects</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">Explore our portfolio of industrial automation and electrical engineering projects across South Africa.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-10">
            <div className="flex flex-wrap gap-2">
              {industryFilters.map(f => (
                <button key={f} onClick={() => setActiveFilter(f)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeFilter === f ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}>
                  {f}
                </button>
              ))}
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search projects..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10 bg-secondary border-border" />
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="wait">
              {filtered.map((p, i) => (
                <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ delay: i * 0.05 }}
                  className="group rounded-xl overflow-hidden bg-card border border-border hover:border-primary/30 transition-all">
                  <div className="relative h-48 overflow-hidden">
                    <img src={p.image_urls?.[0] || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80'} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-background/80 backdrop-blur text-xs font-medium text-foreground">{p.service_type}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-base font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{p.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{p.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{p.year}</span>
                      <span className="text-xs text-primary font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        View Details <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">No projects found matching your criteria.</div>
          )}
        </div>
      </section>

      <CTASection />
    </div>
  );
}