import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronLeft, ChevronRight, X } from 'lucide-react';
import ClientsBanner from '@/components/home/ClientsBanner';

const BRANDS = ['Siemens', 'Mitsubishi', 'Allen-Bradley', 'Delta'];

function ProjectModal({ project, onClose }) {
  const [imgIndex, setImgIndex] = useState(0);
  const images = project.image_urls || [];

  const captionedVideos = (() => {
    if (!project.case_study?.startsWith('videos_captioned:')) return null;
    return project.case_study.replace('videos_captioned:', '').split('|').filter(Boolean).map(part => {
      const [url, caption] = part.split('~~');
      return { url, caption: caption || '' };
    });
  })();

  const extraVideos = (() => {
    if (!project.case_study?.startsWith('videos:')) return [];
    return project.case_study.replace('videos:', '').split('|').filter(Boolean);
  })();

  const allVideos = captionedVideos ? captionedVideos.map(v => v.url) : [project.video_url, ...extraVideos].filter(Boolean);

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

        {images.length > 0 && (
          <div className="relative bg-black rounded-t-2xl overflow-hidden" style={{ maxHeight: '70vh', minHeight: '260px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={images[imgIndex]} alt={project.title} className="max-w-full max-h-[70vh] w-auto h-auto object-contain" />
            {images.length > 1 && (
              <>
                <button onClick={() => setImgIndex((imgIndex - 1 + images.length) % images.length)} className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 flex items-center justify-center hover:bg-black/80 transition-colors">
                  <ChevronLeft className="w-4 h-4 text-white" />
                </button>
                <button onClick={() => setImgIndex((imgIndex + 1) % images.length)} className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 flex items-center justify-center hover:bg-black/80 transition-colors">
                  <ChevronRight className="w-4 h-4 text-white" />
                </button>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {images.map((_, i) => (
                    <button key={i} onClick={() => setImgIndex(i)} className={`w-1.5 h-1.5 rounded-full transition-all ${i === imgIndex ? 'bg-white scale-125' : 'bg-white/50'}`} />
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {images.length > 1 && (
          <div className="flex gap-2 px-5 pt-3 overflow-x-auto no-scrollbar">
            {images.map((img, i) => (
              <button key={i} onClick={() => setImgIndex(i)} className={`shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${i === imgIndex ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100'}`}>
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {allVideos.length > 0 && (
          <div className="px-5 pt-4 space-y-4">
            {allVideos.map((url, i) => (
              <div key={i}>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">{allVideos.length > 1 ? `Video ${i + 1}` : 'Video'}</p>
                <video controls className="w-full rounded-xl bg-black max-h-48" src={url} />
                {captionedVideos?.[i]?.caption && (
                  <p className="text-xs text-muted-foreground leading-relaxed mt-2">{captionedVideos[i].caption}</p>
                )}
              </div>
            ))}
          </div>
        )}

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

export default function ServicesByBrand() {
  const [selectedProject, setSelectedProject] = useState(null);

  const { data: projects = [] } = useQuery({
    queryKey: ['projects-all'],
    queryFn: () => base44.entities.Project.list('-year', 50),
  });

  return (
    <div className="pt-16">
      <AnimatePresence>
        {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      </AnimatePresence>

      {/* Hero — matches Projects page */}
      <section className="relative overflow-hidden" style={{ height: 'calc(100vh - 64px)', maxHeight: '700px', minHeight: '400px' }}>
        <div className="absolute inset-0">
          <img
            src="https://media.base44.com/images/public/69fefc1890408637f331f461/f89c5ba22_man-electrical-working-switchboard-with-fuses-uses-tablet.jpg"
            alt="Services by Brand"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-background/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background" />
        </div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pb-32">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary text-[11px] font-bold uppercase tracking-widest mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> By Manufacturer
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-4">Services by Brand</h1>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Browse our repair, fault-finding and commissioning work organised by manufacturer.
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
          <ClientsBanner />
        </div>
      </section>

      {/* Sticky brand tabs — matches Projects sticky tab bar */}
      <div className="sticky top-16 z-30 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-0 overflow-x-auto no-scrollbar">
            {BRANDS.map(brand => (
              <a
                key={brand}
                href={`#brand-${brand.replace(/\s+/g, '-').toLowerCase()}`}
                className="px-6 py-4 text-sm font-bold uppercase tracking-widest transition-colors border-b-2 border-transparent text-muted-foreground hover:text-foreground shrink-0"
              >
                {brand}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Brand sections */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/8 border border-primary/15 text-primary text-[11px] font-bold uppercase tracking-widest mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> By Brand
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight">Services by Brand</h2>
            <p className="text-sm text-muted-foreground mt-2">Browse our repair and fault-finding work by manufacturer.</p>
          </div>
          <div className="space-y-3 max-w-3xl">
            {BRANDS.map(brand => (
              <div key={brand} id={`brand-${brand.replace(/\s+/g, '-').toLowerCase()}`}>
                <BrandAccordion brand={brand} projects={projects} onSelect={setSelectedProject} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}