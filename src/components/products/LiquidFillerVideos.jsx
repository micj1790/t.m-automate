import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, X } from 'lucide-react';

const videos = [
  { id: 'a-oBNBMdyr4', title: '50ML Plastic Bottle Filling, Capping, Sealing & Labelling' },
  { id: 'Y1n4wwG6etU', title: '5L IMC Liquid Filling Line' },
  { id: 'py9c5AxuIPQ', title: 'Gravity Filling Machines' },
  { id: 'd1lRUD14eZY', title: 'Automatic Perfume Bottle Filling Capping Machine' },
  { id: 'csr0JRJpzTM', title: 'IMC Perfume Filling & Crimping Machine' },
  { id: 'bohbIaI6Qa8', title: 'Semi-Automatic Tube Filler and Ultrasonic Sealer' },
  { id: 'qrnKB9EmitI', title: 'Tube Filler Repair & Maintenance' },
  { id: 'b7EY71ckx-0', title: 'Liquid Filler Machine' },
  { id: 'RNgcgxEVwFk', title: 'Multi Head Accurate Automatic Liquid Filling Machine' },
  { id: 'i83602ftai8', title: 'Auger Talcum Powder Filling Machine' },
  { id: '5h95p5zJVx8', title: 'Complete Tablet / Capsule Filling Machine' },
];

export default function LiquidFillerVideos() {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <section className="mt-0 pt-0">
      <div>
        <div className="mb-8">
          <span className="text-[11px] font-bold uppercase tracking-widest text-accent">Video Gallery</span>
          <h2 className="text-xl font-black text-foreground mt-0.5">Liquid & Powder Fillers in Action</h2>
          <p className="text-sm text-muted-foreground mt-1">Watch our liquid and powder filling machines across a wide range of applications.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {videos.map((v, i) => (
            <motion.div
              key={v.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="group cursor-pointer"
              onClick={() => setActiveVideo(v)}
            >
              <div className="relative rounded-xl overflow-hidden bg-black aspect-video border border-border group-hover:border-accent/50 transition-all mb-2">
                <img
                  src={`https://img.youtube.com/vi/${v.id}/mqdefault.jpg`}
                  alt={v.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-accent/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-4 h-4 text-white fill-white ml-0.5" />
                  </div>
                </div>
              </div>
              <p className="text-xs font-semibold text-foreground group-hover:text-accent transition-colors leading-snug line-clamp-2">{v.title}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm" onClick={() => setActiveVideo(null)}>
          <div className="relative w-full max-w-3xl" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute -top-10 right-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </button>
            <div className="aspect-video rounded-xl overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1`}
                className="w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}