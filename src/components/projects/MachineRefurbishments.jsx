import React, { useState } from 'react';
import { motion } from 'framer-motion';

const refurbs = [
  {
    id: 1,
    title: 'VFFS Sachet Machine Refurbishment',
    description: 'Complete electrical refurbishment of a high-speed vertical form fill seal sachet machine. Full rewire, new PLC, updated HMI and control panel rebuild.',
    before: [
      'https://media.base44.com/images/public/69fefc1890408637f331f461/ed17f78a3_ChatGPTImageMay13202605_17_19PM.png',
      'https://media.base44.com/images/public/69fefc1890408637f331f461/1ec44c8d1_ChatGPTImageMay13202605_15_47PM.png',
    ],
    after: [
      'https://media.base44.com/images/public/69fefc1890408637f331f461/f171cee8a_ChatGPTImageMay13202605_20_46PM.png',
      'https://media.base44.com/images/public/69fefc1890408637f331f461/b9d247aa1_ChatGPTImageMay13202605_21_25PM.png',
    ],
  },
  // Project 2 and 3 to be added
];

function BeforeAfterSlider({ before, after }) {
  const [imgIndex, setImgIndex] = useState(0);
  const hasAfter = after && after.length > 0;

  const beforeImg = before[imgIndex] || before[0];
  const afterImg = hasAfter ? (after[imgIndex] || after[after.length - 1]) : null;

  return (
    <div className="space-y-3">
      {/* Image navigation dots */}
      {before.length > 1 && (
        <div className="flex gap-2 justify-center">
          {before.map((_, i) => (
            <button key={i} onClick={() => setImgIndex(i)}
              className={`w-2 h-2 rounded-full transition-all ${i === imgIndex ? 'bg-primary scale-125' : 'bg-border hover:bg-muted-foreground'}`} />
          ))}
        </div>
      )}

      {/* Side-by-side before & after */}
      <div className="grid grid-cols-2 gap-1.5">
        {/* Before */}
        <div className="relative rounded-xl overflow-hidden border-2 border-destructive">
          <img src={beforeImg} alt="Before" className="w-full object-cover" style={{ aspectRatio: '4/3', objectFit: 'cover', filter: 'grayscale(0.6) brightness(0.8)' }} draggable={false} />
          <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-destructive/90 to-transparent px-3 py-2">
            <span className="text-white text-[11px] font-black uppercase tracking-widest">Before</span>
          </div>
          <div className="absolute inset-0 bg-destructive/10 pointer-events-none" />
        </div>

        {/* After */}
        <div className="relative rounded-xl overflow-hidden border-2 border-green-500">
          {afterImg ? (
            <img src={afterImg} alt="After" className="w-full object-cover" style={{ aspectRatio: '4/3', objectFit: 'cover' }} draggable={false} />
          ) : (
            <div className="w-full flex items-center justify-center text-xs text-muted-foreground italic bg-secondary/50" style={{ aspectRatio: '4/3' }}>
              After coming soon
            </div>
          )}
          <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-green-600/90 to-transparent px-3 py-2">
            <span className="text-white text-[11px] font-black uppercase tracking-widest">After</span>
          </div>
          <div className="absolute inset-0 bg-green-500/5 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}

export default function MachineRefurbishments() {
  return (
    <div>
      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {refurbs.map((r, i) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-card border border-border rounded-2xl overflow-hidden"
          >
            <div className="p-4 pb-0">
              <BeforeAfterSlider before={r.before} after={r.after} />
            </div>
            <div className="p-5">
              <h3 className="text-base font-bold text-foreground mb-2">{r.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{r.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}