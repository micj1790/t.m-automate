import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Search, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';

const ytVideos = [
  { id: 'cmfQPh0OZOQ', title: 'Clever Machine', sub: 'High Speed Vertical Sleeving Machine' },
  { id: 'xJnWPhd8txU', title: 'TM Labelling Machine', sub: 'Wrap-around labeller for bottled water' },
  { id: 'dCwktKRQ4Ck', title: 'High Speed Labelling', sub: 'High speed labelling system' },
  { id: 'b7EY71ckx-0', title: 'Liquid Filler Machine', sub: 'Automatic liquid filler' },
  { id: 'ach8vrJQ-jY', title: 'Automatic Shrink Tunnel', sub: 'Full automatic shrink tunnel' },
  { id: '7uRvWpIYDdY', title: 'Pick & Place Capper', sub: 'Fully automatic with torque control' },
];

const fallback = [
  { title: 'VFFS Sachet Machine Refurbishment', description: 'Complete electrical refurbishment of a high-speed vertical form fill seal sachet machine. Full rewire, new PLC, updated HMI and control panel rebuild.', client: 'Industrial Packaging', industry: 'food_beverage', service_type: 'Machine Refurbishments', location: 'South Africa', year: 2024, status: 'completed', image_urls: ['https://media.base44.com/images/public/69fefc1890408637f331f461/ed17f78a3_ChatGPTImageMay13202605_17_19PM.png', 'https://media.base44.com/images/public/69fefc1890408637f331f461/1ec44c8d1_ChatGPTImageMay13202605_15_47PM.png', 'https://media.base44.com/images/public/69fefc1890408637f331f461/f171cee8a_ChatGPTImageMay13202605_20_46PM.png', 'https://media.base44.com/images/public/69fefc1890408637f331f461/b9d247aa1_ChatGPTImageMay13202605_21_25PM.png'], results: 'Fully operational equipment with modern controls.' },
  { title: 'Vacuum Sealer Refurbishment', description: 'Complete control system upgrade for industrial vacuum sealing machines. Replaced legacy relay logic with Siemens S7-1200 PLC and KTP700 HMI.', client: 'SA Food Processing', industry: 'food_beverage', service_type: 'Machine Refurbishments', location: 'Cape Town', year: 2024, status: 'completed', image_urls: ['https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80'], results: '50% reduction in downtime, 30% increase in production speed.' },
  { title: 'MCC Installation — Automotive Plant', description: 'Design, manufacture and installation of a 16-bucket MCC panel with soft starters, VSDs and full protection coordination.', client: 'Johannesburg Automotive', industry: 'manufacturing', service_type: 'MCC Panels', location: 'Johannesburg', year: 2024, status: 'completed', image_urls: ['https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800&q=80'] },
  { title: 'Conveyor Belt Control System', description: 'Automated conveyor belt system with PLC control, speed monitoring, belt alignment detection and centralised SCADA monitoring.', client: 'Gauteng Mining Corp', industry: 'mining', service_type: 'Conveyor Systems', location: 'Gauteng', year: 2023, status: 'completed', image_urls: ['https://images.unsplash.com/photo-1513828583688-c52646db42da?w=800&q=80'], results: 'Real-time monitoring of 12 conveyor belts from central control room.' },
];

const industryLabels = { food_beverage: 'Food & Beverage', fmcg: 'FMCG', manufacturing: 'Manufacturing', mining: 'Mining', pharmaceutical: 'Pharmaceutical', data_centres: 'Data Centres', industrial_processing: 'Industrial Processing' };

const industries = ['All', 'Food & Beverage', 'FMCG', 'Manufacturing', 'Mining', 'Pharmaceutical', 'Data Centres', 'Industrial Processing'];

function ProjectModal({ project, onClose }) {
  const [imgIndex, setImgIndex] = useState(0);
  const [videoIndex, setVideoIndex] = useState(0);
  const images = project.image_urls || [];

  // Parse extra videos stored in case_study as "videos:url1|url2|..."
  const extraVideos = (() => {
    if (!project.case_study?.startsWith('videos:')) return [];
    return project.case_study.replace('videos:', '').split('|').filter(Boolean);
  })();
  const allVideos = [project.video_url, ...extraVideos].filter(Boolean);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        onClick={e => e.stopPropagation()}
        className="relative bg-card border border-border rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
      >
        <button onClick={onClose} className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-border transition-colors">
          <X className="w-4 h-4" />
        </button>

        {/* Image gallery */}
        {images.length > 0 && (
          <div className="relative bg-black rounded-t-2xl overflow-hidden" style={{ maxHeight: '70vh', minHeight: '260px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={images[imgIndex]} alt={project.title} className="max-w-full max-h-[70vh] w-auto h-auto object-contain" style={{ display: 'block' }} />
            {images.length > 1 && (
              <>
                <button onClick={() => setImgIndex((imgIndex - 1 + images.length) % images.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 flex items-center justify-center hover:bg-black/80 transition-colors">
                  <ChevronLeft className="w-4 h-4 text-white" />
                </button>
                <button onClick={() => setImgIndex((imgIndex + 1) % images.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 flex items-center justify-center hover:bg-black/80 transition-colors">
                  <ChevronRight className="w-4 h-4 text-white" />
                </button>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {images.map((_, i) => (
                    <button key={i} onClick={() => setImgIndex(i)}
                      className={`w-1.5 h-1.5 rounded-full transition-all ${i === imgIndex ? 'bg-white scale-125' : 'bg-white/50'}`} />
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Thumbnail strip */}
        {images.length > 1 && (
          <div className="flex gap-2 px-5 pt-3 overflow-x-auto no-scrollbar">
            {images.map((img, i) => (
              <button key={i} onClick={() => setImgIndex(i)}
                className={`shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${i === imgIndex ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100'}`}>
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Videos */}
        {allVideos.length > 0 && (
          <div className="px-5 pt-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {allVideos.length > 1 ? `Video ${videoIndex + 1} of ${allVideos.length}` : 'Video'}
              </p>
              {allVideos.length > 1 && (
                <div className="flex gap-2">
                  <button onClick={() => setVideoIndex((videoIndex - 1 + allVideos.length) % allVideos.length)}
                    className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center hover:bg-border transition-colors">
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => setVideoIndex((videoIndex + 1) % allVideos.length)}
                    className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center hover:bg-border transition-colors">
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
            <video key={videoIndex} controls className="w-full rounded-xl bg-black" src={allVideos[videoIndex]} />
          </div>
        )}

        {/* Details */}
        <div className="p-5">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            {project.service_type && <span className="px-2.5 py-1 rounded-lg bg-primary/10 border border-primary/15 text-primary text-[10px] font-bold uppercase tracking-wide">{project.service_type}</span>}
            {project.year && <span className="text-[10px] text-muted-foreground font-medium">{project.year}</span>}
            {project.client && <span className="text-[10px] text-muted-foreground">· {project.client}</span>}
          </div>
          <h2 className="text-xl font-black text-foreground mb-3">{project.title}</h2>
          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{project.description}</p>
          {project.results && (
            <div className="mt-4 p-3 rounded-xl bg-green-500/5 border border-green-500/15 text-sm text-green-400">
              <span className="font-bold">Result: </span>{project.results}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  const { data: projects = [] } = useQuery({
    queryKey: ['projects-all'],
    queryFn: () => base44.entities.Project.list('-year', 50),
  });

  const display = fallback.filter(p => {
    const industryMatch = filter === 'All' || (industryLabels[p.industry] === filter || p.industry === filter);
    const searchMatch = !search || p.title?.toLowerCase().includes(search.toLowerCase()) || p.description?.toLowerCase().includes(search.toLowerCase());
    return industryMatch && searchMatch;
  });

  return (
    <div className="pt-16">
      <AnimatePresence>
        {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      </AnimatePresence>
      {/* Hero */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/8 border border-primary/15 text-primary text-[11px] font-bold uppercase tracking-widest mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> Our Portfolio
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-4">Projects</h1>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              500+ completed projects across all major industries. From labelling machines to complete factory automation — our work speaks for itself.
            </p>
          </motion.div>
        </div>
      </section>



      {/* Projects gallery */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="mb-10">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/8 border border-primary/15 text-primary text-[11px] font-bold uppercase tracking-widest mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> All Projects
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight">Projects</h2>
          </div>

          {/* Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search projects..." className="pl-11 pr-4 py-2.5 rounded-xl bg-secondary border-border text-sm" />
            </div>
            <div className="flex gap-2 overflow-x-auto no-scrollbar w-full sm:w-auto pb-2 sm:pb-0">
              {industries.map(i => (
                <button key={i} onClick={() => setFilter(i)}
                  className={`shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${filter === i ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : 'bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80'}`}>
                  {i}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {display.map((p, i) => (
                <motion.div key={p.id || p.title} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: i * 0.04 }}>
                  <div onClick={() => setSelectedProject(p)} className="group rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all overflow-hidden cursor-pointer">
                    <div className="aspect-[16/9] relative overflow-hidden">
                      <img src={p.image_urls?.[0] || 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800&q=80'} alt={p.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                      {p.results && (
                        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-green-500/15 backdrop-blur-sm border border-green-500/25 text-green-400 text-[10px] font-bold">
                          ✓ Success
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        {p.service_type && <span className="px-2.5 py-1 rounded-lg bg-primary/10 border border-primary/15 text-primary text-[10px] font-bold uppercase tracking-wide">{p.service_type}</span>}
                        {p.year && <span className="text-[10px] text-muted-foreground font-medium">{p.year}</span>}
                      </div>
                      <h3 className="text-base font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">{p.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-3">{p.description}</p>
                      {p.results && (
                        <div className="p-2.5 rounded-lg bg-green-500/5 border border-green-500/15 text-xs text-green-400 mb-3">
                          <span className="font-semibold">Result: </span>{p.results}
                        </div>
                      )}
                      <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border/50">
                        <span className="font-medium">{p.client || p.location || ''}</span>
                        <span className="px-2.5 py-1 rounded-lg bg-secondary font-medium">{industryLabels[p.industry] || p.industry || 'Engineering'}</span>
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
    </div>
  );
}