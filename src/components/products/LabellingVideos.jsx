import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, X } from 'lucide-react';

const videos = [
  { id: 'qJ9wWZXjtmQ', title: 'Labelling Machine 1' },
  { id: 'zCWwsLm76Pc', title: 'Labelling Machine 2' },
  { id: 'ZW7jaDQFxLg', title: 'Labelling Machine 3' },
  { id: '1uNofbWGcs4', title: 'Labelling Machine 4' },
  { id: 'h-PxaDQO_ZI', title: 'Labelling Machine 5' },
  { id: 'mbt9wY9gPyM', title: 'Labelling Machine 6' },
  { id: 'BSdqW9hf9uU', title: 'Labelling Machine 7' },
  { id: 'SKG8_hT7whU', title: 'Labelling Machine 8' },
  { id: 'oI9yj-Jj4sY', title: 'Labelling Machine 9' },
  { id: '5xmad2luU6c', title: 'Labelling Machine 10' },
  { id: 'dCwktKRQ4Ck', title: 'Labelling Machine 11' },
  { id: '4R_4ZvhN8JA', title: 'Labelling Machine 12' },
];

export default function LabellingVideos() {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <section className="py-16 md:py-20 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <span className="text-[11px] font-bold uppercase tracking-widest text-accent">Video Gallery</span>
          <h2 className="text-2xl font-black text-foreground mt-0.5">Labelling Machines in Action</h2>
          <p className="text-sm text-muted-foreground mt-2">Watch our labelling machines performing across a wide range of applications.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {videos.map((v, i) => (
            <motion.div
              key={v.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="group relative rounded-xl overflow-hidden cursor-pointer bg-black aspect-video border border-border hover:border-accent/50 transition-all"
              onClick={() => setActiveVideo(v)}
            >
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