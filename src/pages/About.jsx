import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Target, Shield, CheckCircle, Zap } from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';
import CTASection from '@/components/home/CTASection';

const values = [
  { icon: Shield, title: 'Safety First', desc: 'Zero compromise on safety standards across all projects.' },
  { icon: Target, title: 'Precision Engineering', desc: 'Meticulous attention to detail in every solution we deliver.' },
  { icon: Users, title: 'Client Partnership', desc: 'We build lasting relationships through trust and excellence.' },
  { icon: Zap, title: 'Innovation', desc: 'Leveraging cutting-edge technology for optimal solutions.' },
];

const milestones = [
  { year: '1986', title: 'Founded', desc: 'T.M Engineering established in Johannesburg.' },
  { year: '1995', title: 'PLC Division', desc: 'Expanded into PLC programming and automation.' },
  { year: '2005', title: 'SCADA Integration', desc: 'Added SCADA and monitoring systems to our portfolio.' },
  { year: '2015', title: 'National Reach', desc: 'Serving clients across all nine provinces of South Africa.' },
  { year: '2025', title: 'Digital Future', desc: 'Leading Industry 4.0 transformation for SA manufacturing.' },
];

export default function About() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&q=80" alt="Engineering" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/70" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-widest mb-4">
              About Us
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground tracking-tight leading-tight">
              Engineering <span className="text-primary">Excellence</span> Since 1986
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              For nearly four decades, T.M Engineering has been at the forefront of industrial automation in South Africa. Based in Johannesburg, we serve clients nationwide with world-class control systems and electrical engineering solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Our Values" title="What Drives Us" description="Our core values define every project we undertake." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="p-6 rounded-xl bg-card border border-border text-center">
                <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
                  <v.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-base font-bold text-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 md:py-28 bg-card/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Our Journey" title="39 Years of Growth" />
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />
            {milestones.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`relative flex items-center mb-10 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div className={`flex-1 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'} pl-12 md:pl-0`}>
                  <span className="text-sm font-mono text-primary font-bold">{m.year}</span>
                  <h3 className="text-lg font-bold text-foreground">{m.title}</h3>
                  <p className="text-sm text-muted-foreground">{m.desc}</p>
                </div>
                <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-primary border-2 border-background md:-translate-x-1.5 -translate-x-1.5" />
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Why T.M Engineering" title="The T.M Difference" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {[
              'Over 39 years of proven industry experience',
              '24/7 emergency breakdown support',
              'Certified PLC and SCADA engineers',
              'Full-service electrical and automation solutions',
              'National coverage across South Africa',
              'ISO-compliant project management',
              'Competitive pricing with quality assurance',
              'Long-term maintenance and support contracts',
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-card transition-colors">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm text-foreground">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}