import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const refurbs = [
  {
    id: 1,
    title: 'VFFS Sachet Machine Refurbishment',
    description: 'Complete electrical refurbishment of a high-speed vertical form fill seal sachet machine. Full rewire, new PLC, updated HMI and control panel rebuild.',
    before: [
      'https://media.base44.com/images/public/69fefc1890408637f331f461/ed17f78a3_ChatGPTImageMay13202605_17_19PM.png',
      'https://media.base44.com/images/public/69fefc1890408637f331f461/1ec44c8d1_ChatGPTImageMay13202605_15_47PM.png',
    ],
    after: [], // To be added
  },
  // Project 2 and 3 to be added
];

function BeforeAfterSlider({ before, after }) {
  const [sliderPos, setSliderPos] = useState(50);
  const [imgIndex, setImgIndex] = useState(0);
  const containerRef = useRef(null);
  const dragging = useRef(false);

  const hasAfter = after && after.length > 0;

  const handleMove = useCallback((clientX) => {
    if (!dragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  }, []);

  const onMouseDown = () => { dragging.current = true; };
  const onMouseUp = () => { dragging.current = false; };
  const onMouseMove = (e) => handleMove(e.clientX);
  const onTouchMove = (e) => handleMove(e.touches[0].clientX);

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

      <div
        ref={containerRef}
        className="relative w-full rounded-xl overflow-hidden select-none cursor-col-resize"
        style={{ aspectRatio: '4/3' }}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onMouseMove={onMouseMove}
        onTouchStart={onMouseDown}
        onTouchEnd={onMouseUp}
        onTouchMove={onTouchMove}
      >
        {/* Before image (full width base) */}
        <img src={beforeImg} alt="Before" className="absolute inset-0 w-full h-full object-cover" draggable={false} />

        {/* Before label */}
        <div className="absolute top-3 left-3 z-20 px-2.5 py-1 rounded-lg bg-black/70 text-white text-[11px] font-bold uppercase tracking-wider">
          Before
        </div>

        {hasAfter ? (
          <>
            {/* After image clipped */}
            <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}>
              <img src={afterImg} alt="After" className="absolute inset-0 w-full h-full object-cover" draggable={false} />
            </div>

            {/* After label */}
            <div className="absolute top-3 right-3 z-20 px-2.5 py-1 rounded-lg bg-green-500/80 text-white text-[11px] font-bold uppercase tracking-wider">
              After
            </div>

            {/* Divider line */}
            <div className="absolute top-0 bottom-0 z-10 flex items-center" style={{ left: `calc(${sliderPos}% - 1px)` }}>
              <div className="w-0.5 h-full bg-white/80 shadow-lg" />
              <div className="absolute w-8 h-8 rounded-full bg-white shadow-xl flex items-center justify-center -translate-x-1/2 border-2 border-primary">
                <div className="flex gap-0.5">
                  <ChevronLeft className="w-3 h-3 text-primary" />
                  <ChevronRight className="w-3 h-3 text-primary" />
                </div>
              </div>
            </div>
          </>
        ) : (
          /* No after yet — show "After Coming Soon" overlay */
          <div className="absolute inset-0 flex items-end justify-end p-3 pointer-events-none">
            <span className="px-2.5 py-1 rounded-lg bg-primary/80 text-white text-[11px] font-bold uppercase tracking-wider">
              After Coming Soon
            </span>
          </div>
        )}
      </div>

      {!hasAfter && (
        <p className="text-xs text-muted-foreground text-center italic">Drag the slider to compare once after images are added</p>
      )}
      {hasAfter && (
        <p className="text-xs text-muted-foreground text-center">← Drag to compare before & after →</p>
      )}
    </div>
  );
}

export default function MachineRefurbishments() {
  return (
    <section className="py-16 md:py-20 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-accent/10 border-l-2 border-accent text-accent text-[11px] font-bold uppercase tracking-[0.15em] mb-4">
            Before & After
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight mb-4">
            Machine Refurbishments
          </h2>
          <p className="text-muted-foreground text-base max-w-2xl mx-auto">
            We take aging, fault-prone machines and bring them back to full production capability — new wiring, new control systems, new life.
          </p>
        </motion.div>

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
    </section>
  );
}