import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';

const testimonials = [
  {
    name: 'Johan van der Merwe',
    company: 'Cape Food Processing',
    role: 'Operations Director',
    content: 'T.M Engineering transformed our production line with their automation solutions. Downtime reduced by 60% and output increased significantly.',
    rating: 5,
  },
  {
    name: 'Sarah Ndlovu',
    company: 'Gauteng Mining Corp',
    role: 'Plant Manager',
    content: 'Their 24/7 support and PLC expertise saved us during a critical breakdown. Professional, fast, and highly skilled team.',
    rating: 5,
  },
  {
    name: 'David Pretorius',
    company: 'SA Pharma Industries',
    role: 'Technical Manager',
    content: 'The SCADA system they implemented gives us complete visibility over our operations. Outstanding quality of work and project management.',
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 md:py-28 bg-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Client Testimonials"
          title="Trusted by Industry Leaders"
          description="Hear from our clients across South Africa's most demanding industries."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-xl bg-card border border-border hover:border-primary/20 transition-all"
            >
              <Quote className="w-8 h-8 text-primary/20 mb-4" />
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">"{t.content}"</p>
              <div className="flex items-center gap-1 mb-3">
                {Array(t.rating).fill(0).map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 fill-accent text-accent" />
                ))}
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}, {t.company}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}