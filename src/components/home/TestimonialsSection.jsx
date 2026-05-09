import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';

const testimonials = [
  { name: 'Johan van der Merwe', role: 'Operations Director', company: 'Cape Food Processing', content: 'T.M Engineering transformed our production line. Downtime reduced by 60% and our output has increased significantly. Their team is professional, fast and incredibly skilled.', rating: 5, industry: 'Food & Beverage' },
  { name: 'Sarah Ndlovu', role: 'Plant Manager', company: 'Gauteng Mining Corp', content: 'Their 24/7 support saved us during a critical conveyor breakdown at 2am. On-site within 90 minutes. These guys are the real deal in industrial automation.', rating: 5, industry: 'Mining' },
  { name: 'David Pretorius', role: 'Technical Manager', company: 'SA Pharma Industries', content: 'The SCADA system they implemented gives us complete real-time visibility of our GMP production processes. Outstanding quality and exceptional project management.', rating: 5, industry: 'Pharmaceutical' },
  { name: 'Priya Naidoo', role: 'Factory Manager', company: 'FMCG Beverages SA', content: 'We\'ve been working with T.M Engineering for 8 years. Their labelling machines and liquid fillers have never let us down. Truly a world-class South African engineering company.', rating: 5, industry: 'FMCG' },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 md:py-28 bg-card/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader label="Client Reviews" title="Trusted by South Africa's Industry Leaders" description="Don't take our word for it — here's what our clients say about working with T.M Engineering." />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {testimonials.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="relative p-6 rounded-2xl bg-card border border-border hover:border-primary/20 transition-all gradient-border">
              <Quote className="w-8 h-8 text-primary/20 mb-3" />
              <div className="flex mb-3">
                {Array(t.rating).fill(0).map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5 italic">"{t.content}"</p>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}, {t.company}</div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-primary/8 border border-primary/15 text-primary text-[10px] font-semibold">{t.industry}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}