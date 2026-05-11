import React from 'react';
import { motion } from 'framer-motion';

export default function SectionHeader({ label, title, description, align = 'center' }) {
  const isCenter = align === 'center';
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6 }}
      className={`mb-12 md:mb-14 ${isCenter ? 'text-center' : 'text-left'}`}
    >
      {label && (
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-primary/10 border-l-2 border-primary text-primary text-[11px] font-bold uppercase tracking-[0.15em] mb-4">
          {label}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground tracking-tight leading-tight">
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-muted-foreground text-base md:text-lg leading-relaxed ${isCenter ? 'max-w-2xl mx-auto' : 'max-w-2xl'}`}>
          {description}
        </p>
      )}
    </motion.div>
  );
}