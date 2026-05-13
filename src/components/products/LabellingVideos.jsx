import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, X } from 'lucide-react';

const videos = [
  { id: 'qJ9wWZXjtmQ', title: 'Single Head Labeller with Ink Jet Printing' },
  { id: 'zCWwsLm76Pc', title: 'Inline Labelling & Wrap Around Machine' },
  { id: 'ZW7jaDQFxLg', title: 'Square Bottle Labelling Machine' },
  { id: '1uNofbWGcs4', title: 'In-Line Accurate Labelling for Tall Containers' },
  { id: 'h-PxaDQO_ZI', title: 'Labelling Machine for Difficult Bottles' },
  { id: 'mbt9wY9gPyM', title: 'Labelling Machine' },
  { id: 'BSdqW9hf9uU', title: 'Bottle Sleeve Labelling Machine' },
  { id: 'SKG8_hT7whU', title: 'Automatic Bottle Labelling Machine' },
  { id: 'oI9yj-Jj4sY', title: 'Automatic Water Bottle Labelling Machine' },
  { id: '5xmad2luU6c', title: 'Labelling Around 2 Sides of a 5L Container' },
  { id: 'dCwktKRQ4Ck', title: 'High Speed Labelling Machine' },
  { id: '4R_4ZvhN8JA', title: 'In Line Labelling' },
];

export default function LabellingVideos() {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <section className="mt-10 pt-8 border-t border-border">
      <div>
        <div className="mb-8">
          <span className="text-[11px] font-bold uppercase tracking-widest text-accent">Video Gallery</span>
          <h2 className="text-xl font-black text-foreground mt-0.5">Labelling Machines in Action</h2>
          <p className="text-sm text-muted-foreground mt-1">Watch our machines performing across a wide range of applications.</p>
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

      {/* Modal */}
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