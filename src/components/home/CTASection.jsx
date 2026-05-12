import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&q=80" alt="Industrial automation" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/8 via-transparent to-accent/8" />
        <div className="absolute inset-0 grid-pattern opacity-30" />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-3xl md:text-5xl font-black text-foreground tracking-tight leading-tight mb-5">
            Let's Build Something{' '}
            <span className="text-primary">Together</span>
          </h2>
          <p className="text-base text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed">
            Get a free quote from our engineering team. We'll respond within 24 hours.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/quote">
              <motion.button whileHover={{ scale: 1.03 }} className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-sm uppercase tracking-wide">
                Request a Quote <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
            <a href="tel:+27117911562">
              <motion.button whileHover={{ scale: 1.03 }} className="flex items-center gap-2 px-7 py-3.5 rounded-xl border border-border hover:border-primary/40 hover:bg-primary/5 text-foreground font-semibold text-sm transition-all">
                <Phone className="w-4 h-4" /> 011 791 1562
              </motion.button>
            </a>

          </div>
        </motion.div>
      </div>
    </section>
  );
}