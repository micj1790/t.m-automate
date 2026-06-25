import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
  'https://media.base44.com/images/public/69fefc1890408637f331f461/c383cdc80_IMG_2950.jpg',
  'https://media.base44.com/images/public/69fefc1890408637f331f461/ff4b7063f_IMG_2903.jpg',
  'https://media.base44.com/images/public/69fefc1890408637f331f461/eae608694_IMG_2983.jpg',
  'https://media.base44.com/images/public/69fefc1890408637f331f461/16954b0e0_IMG_2907.jpg',
];

const description = "TM Engineering successfully executed the migration of an existing Siemens S7-300 PLC control system to the latest Siemens S7-1500 platform. The project scope included PLC hardware replacement, software migration and optimization, HMI modifications, I/O testing, commissioning, and site acceptance testing. Existing Danfoss variable speed drives were integrated and recommissioned to ensure full compatibility and reliable operation with the new control system. The migration was completed with minimal downtime, providing improved system performance, enhanced diagnostics, increased reliability, and long-term maintainability for the plant.";

const highlights = [
  'PLC hardware replacement',
  'Software migration & optimization',
  'HMI modifications',
  'I/O testing & commissioning',
  'Site acceptance testing',
  'Danfoss VSD integration',
];

export default function MigrationSection() {
  const [activeImg, setActiveImg] = useState(0);

  return (
    <section className="py-16 md:py-20 border-y border-border bg-gradient-to-b from-background to-card/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-bold uppercase tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> Featured Case Study
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight mb-4">
            Siemens S7-300 to S7-1500 Migration
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Image gallery */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            {/* Main image */}
            <div className="relative rounded-2xl overflow-hidden bg-black border border-border" style={{ minHeight: '20rem' }}>
              <img
                src={images[activeImg]}
                alt={`Migration project image ${activeImg + 1}`}
                className="w-full h-full object-contain"
                style={{ maxHeight: '30rem', minHeight: '20rem' }}
              />
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImg((activeImg - 1 + images.length) % images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 flex items-center justify-center hover:bg-black/80 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4 text-white" />
                  </button>
                  <button
                    onClick={() => setActiveImg((activeImg + 1) % images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 flex items-center justify-center hover:bg-black/80 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 text-white" />
                  </button>
                </>
              )}
            </div>
            {/* Thumbnails */}
            <div className="flex gap-2 mt-3 overflow-x-auto no-scrollbar">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                    i === activeImg ? 'border-primary' : 'border-transparent opacity-50 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Description */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="px-2.5 py-1 rounded-lg bg-primary/10 border border-primary/15 text-primary text-[10px] font-bold uppercase tracking-wide">
                PLC Migration
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-accent/10 border border-accent/15 text-accent text-[10px] font-bold uppercase tracking-wide">
                Siemens
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-green-500/10 border border-green-500/15 text-green-400 text-[10px] font-bold uppercase tracking-wide">
                Completed
              </span>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed mb-6">{description}</p>

            {/* Highlights */}
            <div className="space-y-2.5">
              <p className="text-[11px] font-bold text-foreground uppercase tracking-wider">Project Scope</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-sm text-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    {h}
                  </div>
                ))}
              </div>
            </div>

            {/* Results banner */}
            <div className="mt-6 p-4 rounded-xl bg-green-500/5 border border-green-500/15">
              <p className="text-[10px] font-bold text-green-400 uppercase tracking-wider mb-1.5">Outcomes</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Completed with minimal downtime — delivering improved system performance, enhanced diagnostics,
                increased reliability, and long-term maintainability for the plant.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}