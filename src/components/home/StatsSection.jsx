import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

function Counter({ target, suffix, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const stats = [
  { value: 39, suffix: '+', label: 'Years of Excellence', sub: 'Since 1986' },
  { value: 500, suffix: '+', label: 'Projects Delivered', sub: 'Across South Africa' },
  { value: 400, suffix: '+', label: 'Clients Served', sub: 'All industries' },
  { value: 24, suffix: '/7', label: 'Support Available', sub: 'Emergency callout' },
];

export default function StatsSection() {
  return (
    <section className="relative py-16 border-y border-border overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/3 via-transparent to-accent/3" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="text-center group">
              <div className="text-4xl md:text-5xl font-black text-primary mb-1 tracking-tight">
                <Counter target={s.value} suffix={s.suffix} />
              </div>
              <div className="text-sm font-bold text-foreground mb-0.5">{s.label}</div>
              <div className="text-xs text-muted-foreground">{s.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}