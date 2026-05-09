import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Phone } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold uppercase tracking-widest mb-6">
            Start Your Project
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-foreground tracking-tight leading-tight mb-6">
            Ready to Automate Your{' '}
            <span className="text-primary">Operations?</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Contact our expert team today for a free consultation. From PLC programming to complete factory automation, we have you covered.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/quote">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 h-12 glow-blue group">
                Request a Quote <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-border hover:border-primary/50 font-semibold px-8 h-12">
                <Phone className="mr-2 w-4 h-4" /> Contact Us
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}