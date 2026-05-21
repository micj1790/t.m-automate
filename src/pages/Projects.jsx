import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Search, X, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import ClientsBanner from '@/components/home/ClientsBanner';
import { Input } from '@/components/ui/input';

const BRAND_TITLES = ['Siemens', 'Mitsubishi', 'Allen-Bradley', 'Delta'];

function BrandAccordion({ brand, projects, onSelect }) {
  const [open, setOpen] = useState(false);
  const brandProjects = projects.filter(p => p.title === brand);

  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 bg-card hover:bg-secondary/40 transition-colors text-left"
      >
        <span className="text-base font-bold text-foreground">{brand}</span>
        <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-4 space-y-3 bg-secondary/10">
              {brandProjects.length === 0 ? (
                <p className="text-sm text-muted-foreground italic px-1">No projects yet.</p>
              ) : (
                brandProjects.map(p => (
                  <div
                    key={p.id || p.title}
                    onClick={() => onSelect(p)}
                    className="group flex gap-4 p-3 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all cursor-pointer"
                  >
                    {p.image_urls?.[0] && (
                      <img src={p.image_urls[0]} alt={p.title} className="w-20 h-16 rounded-lg object-cover shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{p.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{p.description}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const ytVideos = [
  { id: 'cmfQPh0OZOQ', title: 'Clever Machine', sub: 'High Speed Vertical Sleeving Machine' },
  { id: 'xJnWPhd8txU', title: 'TM Labelling Machine', sub: 'Wrap-around labeller for bottled water' },
  { id: 'dCwktKRQ4Ck', title: 'High Speed Labelling', sub: 'High speed labelling system' },
  { id: 'b7EY71ckx-0', title: 'Liquid Filler Machine', sub: 'Automatic liquid filler' },
  { id: 'ach8vrJQ-jY', title: 'Automatic Shrink Tunnel', sub: 'Full automatic shrink tunnel' },
  { id: '7uRvWpIYDdY', title: 'Pick & Place Capper', sub: 'Fully automatic with torque control' },
];

const fallback = [
  { title: 'VFFS Spice Filling Machine Refurbishment', description: 'Complete mechanical and electrical refurbishment of a VFFS spice filling machine — new servo drives, PLC upgrade, updated HMI, rewire and control panel rebuild. Machine returned to full production spec.', client: 'Spice Manufacturer', industry: 'food_beverage', service_type: 'Machine Refurbishments', location: 'Johannesburg', year: 2025, status: 'completed', image_urls: ['https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=800&q=80'], results: 'Machine fully restored to OEM spec with modern controls and improved reliability.' },
  { title: 'VFFS Sachet Machine Refurbishment', description: 'Full electrical refurbishment — rewire, new PLC, updated HMI and control panel rebuild.', client: 'Industrial Packaging', industry: 'food_beverage', service_type: 'Machine Refurbishments', location: 'South Africa', year: 2024, status: 'completed', image_urls: ['https://media.base44.com/images/public/69fefc1890408637f331f461/ed17f78a3_ChatGPTImageMay13202605_17_19PM.png', 'https://media.base44.com/images/public/69fefc1890408637f331f461/1ec44c8d1_ChatGPTImageMay13202605_15_47PM.png', 'https://media.base44.com/images/public/69fefc1890408637f331f461/f171cee8a_ChatGPTImageMay13202605_20_46PM.png', 'https://media.base44.com/images/public/69fefc1890408637f331f461/b9d247aa1_ChatGPTImageMay13202605_21_25PM.png'], results: 'Fully operational with modern controls.' },
  { title: 'Vacuum Sealer Refurbishment', description: 'Replaced legacy relay logic with Siemens S7-1200 PLC and KTP700 HMI.', client: 'SA Food Processing', industry: 'food_beverage', service_type: 'Machine Refurbishments', location: 'Cape Town', year: 2024, status: 'completed', image_urls: ['https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80'], results: '50% less downtime, 30% faster production.' },
  { title: 'MCC Installation — Automotive Plant', description: '16-bucket MCC panel with soft starters, VSDs and full protection coordination.', client: 'Johannesburg Automotive', industry: 'manufacturing', service_type: 'MCC Panels', location: 'Johannesburg', year: 2024, status: 'completed', image_urls: ['https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800&q=80'] },
  { title: 'Conveyor Belt Control System', description: 'PLC-controlled conveyor system with speed monitoring, belt alignment detection and SCADA integration.', client: 'Gauteng Mining Corp', industry: 'mining', service_type: 'Conveyor Systems', location: 'Gauteng', year: 2023, status: 'completed', image_urls: ['https://images.unsplash.com/photo-1513828583688-c52646db42da?w=800&q=80'], results: 'Real-time monitoring of 12 conveyors from central control room.' },
  { title: 'PLC Retrofit — Packaging Line', description: 'Migrated legacy relay logic to Allen-Bradley CompactLogix with PanelView Plus HMI.', client: 'National Beverages', industry: 'food_beverage', service_type: 'PLC Programming', location: 'Durban', year: 2023, status: 'completed', image_urls: ['https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80'] },
  { title: 'SCADA — Water Treatment Plant', description: 'Wonderware SCADA for municipal water treatment with remote monitoring and alarm management.', client: 'Municipal Water Authority', industry: 'industrial_processing', service_type: 'SCADA Systems', location: 'Pretoria', year: 2024, status: 'completed', image_urls: ['https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80'], results: '24/7 remote monitoring, 99.9% uptime.' },
  { title: 'Generator Synchronisation System', description: 'Auto sync and load sharing for three 1MW diesel generators at a data centre.', client: 'DataCentre SA', industry: 'data_centres', service_type: 'Generator Control', location: 'Johannesburg', year: 2024, status: 'completed', image_urls: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80'] },
];

const industryLabels = { food_beverage: 'Food & Beverage', fmcg: 'FMCG', manufacturing: 'Manufacturing', mining: 'Mining', pharmaceutical: 'Pharmaceutical', data_centres: 'Data Centres', industrial_processing: 'Industrial Processing' };

const industries = ['All', 'Food & Beverage', 'FMCG', 'Manufacturing', 'Mining', 'Pharmaceutical', 'Data Centres', 'Industrial Processing'];

function ProjectModal({ project, onClose }) {
  const [imgIndex, setImgIndex] = useState(0);
  const [videoIndex, setVideoIndex] = useState(0);
  const images = project.image_urls || [];

  // Parse videos_captioned format: "videos_captioned:url~~caption|url~~caption"
  const captionedVideos = (() => {
    if (!project.case_study?.startsWith('videos_captioned:')) return null;
    return project.case_study.replace('videos_captioned:', '').split('|').filter(Boolean).map(part => {
      const [url, caption] = part.split('~~');
      return { url, caption: caption || '' };
    });
  })();

  // Legacy "videos:" format
  const extraVideos = (() => {
    if (!project.case_study?.startsWith('videos:')) return [];
    return project.case_study.replace('videos:', '').split('|').filter(Boolean);
  })();
  const allVideos = captionedVideos ? captionedVideos.map(v => v.url) : [project.video_url, ...extraVideos].filter(Boolean);

  // Parse before/after images stored as "before_after:beforeUrl1|beforeUrl2>afterUrl1|afterUrl2"
  const beforeAfter = (() => {
    if (!project.case_study?.startsWith('before_after:')) return null;
    const raw = project.case_study.replace('before_after:', '');
    const [beforePart, afterPart] = raw.split('>');
    const before = beforePart?.split('|').filter(Boolean) || [];
    const after = afterPart?.split('|').filter(Boolean) || [];
    return (before.length || after.length) ? { before, after } : null;
  })();

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
          <div className="px-5 pt-4 space-y-4">
            {allVideos.map((url, i) => (
              <div key={i}>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  {allVideos.length > 1 ? `Video ${i + 1}` : 'Video'}
                </p>
                <video controls className="w-full rounded-xl bg-black max-h-48" src={url} />
                {captionedVideos?.[i]?.caption && (
                  <p className="text-xs text-muted-foreground leading-relaxed mt-2">{captionedVideos[i].caption}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Before / After Section */}
        {beforeAfter && (
          <div className="px-5 pt-4 pb-2">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Before &amp; After</p>
            <div className="grid grid-cols-2 gap-3">
              {/* Before */}
              <div>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="w-2 h-2 rounded-full bg-destructive" />
                  <span className="text-[11px] font-bold text-destructive uppercase tracking-wider">Before</span>
                </div>
                <div className="space-y-2">
                  {beforeAfter.before.length > 0
                    ? beforeAfter.before.map((url, i) => (
                        <img key={i} src={url} alt={`Before ${i + 1}`} className="w-full rounded-xl object-cover border border-destructive/20" style={{ maxHeight: 220, objectFit: 'cover' }} />
                      ))
                    : <div className="h-32 rounded-xl bg-secondary/50 flex items-center justify-center text-xs text-muted-foreground">No image</div>
                  }
                </div>
              </div>
              {/* After */}
              <div>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-[11px] font-bold text-green-400 uppercase tracking-wider">After</span>
                </div>
                <div className="space-y-2">
                  {beforeAfter.after.length > 0
                    ? beforeAfter.after.map((url, i) => (
                        <img key={i} src={url} alt={`After ${i + 1}`} className="w-full rounded-xl object-cover border border-green-500/20" style={{ maxHeight: 220, objectFit: 'cover' }} />
                      ))
                    : <div className="h-32 rounded-xl bg-secondary/50 flex items-center justify-center text-xs text-muted-foreground italic">After images coming soon</div>
                  }
                </div>
              </div>
            </div>
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
            <div className="mt-4 p-3 rounded-xl bg-green-500/5 border border-green-500/15">
              <p className="text-[10px] font-bold text-green-400 uppercase tracking-wider mb-1">Results</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{project.results}</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default function Projects() {
  const [activeTab, setActiveTab] = useState('projects');
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

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
      <AnimatePresence>
        {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      </AnimatePresence>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ height: 'calc(100vh - 64px)', maxHeight: '700px', minHeight: '400px' }}>
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://media.base44.com/images/public/69fefc1890408637f331f461/f89c5ba22_man-electrical-working-switchboard-with-fuses-uses-tablet.jpg"
            alt="Projects background"
            className="w-full h-full object-cover object-top"
            style={{ imageRendering: 'auto' }}
          />
          <div className="absolute inset-0 bg-background/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background" />
        </div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pb-32">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary text-[11px] font-bold uppercase tracking-widest mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> Our Portfolio
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-4">Projects</h1>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Over 2000+ completed jobs across all major industries. From labelling machines to complete factory automation - our work speaks for itself.
            </p>
          </motion.div>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-36 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1">
          <span className="text-[11px] font-semibold text-white/70 uppercase tracking-widest">Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}>
            <ChevronDown className="w-6 h-6 text-white/70" />
          </motion.div>
        </div>
        {/* Banner pinned to bottom of hero */}
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <ClientsBanner />
        </div>
      </section>

      {/* Tab switcher */}
      <div className="sticky top-16 z-30 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-0">
            {['projects', 'services'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-sm font-bold uppercase tracking-widest transition-colors border-b-2 ${activeTab === tab ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
              >
                {tab === 'projects' ? 'Projects' : 'Services'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Services tab */}
      {activeTab === 'services' && (
        <section className="py-16 md:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/8 border border-primary/15 text-primary text-[11px] font-bold uppercase tracking-widest mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> By Brand
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight">Services by Brand</h2>
              <p className="text-sm text-muted-foreground mt-2">Browse our repair and fault-finding work by manufacturer.</p>
            </div>
            <div className="space-y-3">
              {BRAND_TITLES.map(brand => (
                <BrandAccordion key={brand} brand={brand} projects={projects.length > 0 ? projects : fallback} onSelect={setSelectedProject} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects gallery */}
      {activeTab === 'projects' && <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="mb-10">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/8 border border-primary/15 text-primary text-[11px] font-bold uppercase tracking-widest mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> Recent Projects
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight">Recent Projects</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {display.map((p, i) => (
                <motion.div key={p.id || p.title} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: i * 0.04 }}>
                  <div onClick={() => setSelectedProject(p)} className="group h-80 flex flex-col rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all overflow-hidden cursor-pointer">
                    <div className="h-44 relative overflow-hidden shrink-0">
                      <img src={p.image_urls?.[0] || 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800&q=80'} alt={p.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                    </div>
                    <div className="p-4 flex flex-col flex-1 overflow-hidden">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        {p.service_type && <span className="px-2.5 py-1 rounded-lg bg-primary/10 border border-primary/15 text-primary text-[10px] font-bold uppercase tracking-wide whitespace-nowrap">{p.service_type}</span>}
                      </div>
                      <h3 className="text-base font-bold text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-2">{p.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{p.description}</p>
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
      </section>}
    </div>
  );
}