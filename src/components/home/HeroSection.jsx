import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Shield, Clock, Award, ChevronDown } from 'lucide-react';

const words = ['Industrial Automation', 'Electrical Engineering', 'PLC Programming', 'SCADA Systems', 'Factory Solutions'];

export default function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const word = words[wordIndex];
    let timeout;
    if (typing) {
      if (displayed.length < word.length) {
        timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 60);
      } else {
        timeout = setTimeout(() => setTyping(false), 2200);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
      } else {
        setWordIndex((i) => (i + 1) % words.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, wordIndex]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Video / image background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&q=90"
          alt="Industrial control panel wiring and machinery"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/92 to-background/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/20" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-pattern opacity-50" />

      {/* Animated scan line */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-scan" />
      </div>

      {/* Corner decorations */}
      <div className="absolute top-24 right-8 hidden xl:block">
        <div className="relative w-64 h-64">
          <div className="absolute inset-0 rounded-full border border-primary/5" />
          <div className="absolute inset-6 rounded-full border border-primary/8 animate-spin" style={{ animationDuration: '20s' }} />
          <div className="absolute inset-12 rounded-full border border-primary/10 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
          <div className="absolute inset-[48px] rounded-full bg-primary/5 flex items-center justify-center">
            <div className="text-center">
              <div className="text-3xl font-display text-primary">39</div>
              <div className="text-[9px] text-muted-foreground uppercase tracking-widest">Years</div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/8 border border-primary/20 text-primary text-[11px] font-bold uppercase tracking-[0.15em] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Trusted Industrial Specialists Since 1986
            </span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-foreground tracking-tight leading-[1.04] mb-4">
            39 Years of Proven<br />
            <span className="text-primary text-glow-blue">{displayed}<span className="animate-pulse">|</span></span>
            <br />Excellence
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mb-8">
            Industrial Automation, Electrical Engineering & Control System Specialists.
            From PLC programming to complete factory automation — we deliver world-class solutions across South Africa.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap gap-3 mb-10">
            <Link to="/quote">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-black text-sm px-7 h-12 glow-blue group uppercase tracking-wide">
                Request a Quote <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/projects">
              <Button size="lg" variant="outline" className="border-border hover:border-primary/40 hover:bg-primary/5 font-semibold text-sm px-7 h-12 uppercase tracking-wide">
                View Projects
              </Button>
            </Link>
            <a href="tel:+27117911562">
              <Button size="lg" variant="ghost" className="text-muted-foreground hover:text-foreground font-semibold text-sm px-7 h-12">
                📞 Call Now
              </Button>
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-5 md:gap-8">
            {[
              { icon: Award, label: '39+ Years Experience' },
              { icon: Clock, label: '24/7 Emergency Support' },
              { icon: Shield, label: 'Certified Engineers' },
            ].map((b, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                <b.icon className="w-4 h-4 text-accent" />
                <span>{b.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
        <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <ChevronDown className="w-4 h-4 text-primary/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}