import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Phone, MessageCircle } from 'lucide-react';

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
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[11px] font-bold uppercase tracking-[0.12em] mb-6">
            Start Your Project Today
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-foreground tracking-tight leading-tight mb-5">
            Ready to Automate Your{' '}
            <span className="text-primary text-glow-blue">Operations?</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Contact our expert engineering team today. From a single PLC upgrade to complete factory automation — we deliver on time, on budget, every time.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/quote">
              <motion.button whileHover={{ scale: 1.03 }} className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-sm uppercase tracking-wide glow-blue">
                Request a Quote <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
            <a href="tel:+27117911562">
              <motion.button whileHover={{ scale: 1.03 }} className="flex items-center gap-2 px-7 py-3.5 rounded-xl border border-border hover:border-primary/40 hover:bg-primary/5 text-foreground font-semibold text-sm transition-all">
                <Phone className="w-4 h-4" /> 011 791 1562
              </motion.button>
            </a>
            <a href="https://wa.me/27833757670?text=Hi%20T.M%20Engineering" target="_blank" rel="noopener noreferrer">
              <motion.button whileHover={{ scale: 1.03 }} className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 font-semibold text-sm hover:bg-green-500/20 transition-all">
                <MessageCircle className="w-4 h-4" /> WhatsApp Us
              </motion.button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}