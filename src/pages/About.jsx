import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Clock, Target, CheckCircle, ArrowRight, Phone, Mail, MapPin } from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';

const values = [
  { icon: Target, title: 'Highest Quality', desc: 'Providing the highest quality electrical products at the best possible price.' },
  { icon: Award, title: 'Stay Current', desc: 'Constantly keeping up with the latest technological advancements in the industry.' },
  { icon: Users, title: 'Expert Advice', desc: 'Providing expert advice and giving honest opinions to our clients at all times.' },
  { icon: Clock, title: 'Service Excellence', desc: 'Exceptional 24-hour service as our primary goal - every single day.' },
];

const milestones = [
  { year: '1986', title: 'Founded', desc: 'Industrial electrical engineering established in Johannesburg.' },
  { year: '1994', title: 'Service Department', desc: '24-hour support & maintenance across industries.' },
  { year: '2000', title: 'PLC Expertise', desc: 'Added PLC programming & automation capabilities.' },
  { year: '2010', title: 'Factory Automation', desc: 'Full automation solutions & production line design.' },
  { year: '2018', title: 'Projects Division', desc: 'Dedicated team for large-scale turnkey projects.' },
  { year: '2023', title: 'Expansion', desc: 'Upgraded headquarters with modern facilities.' },
  { year: '2026', title: 'Here to Serve', desc: '40 years of quality, reliability & excellence.' },
];

export default function About() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://media.base44.com/images/public/69fefc1890408637f331f461/981829911_generated_image.png" alt="About T.M Engineering" className="w-full h-full object-cover object-right" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/20" />
          <div className="absolute inset-0 grid-pattern opacity-40" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/8 border border-primary/15 text-primary text-[11px] font-bold uppercase tracking-widest mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> Trusted Since 1986
              </span>
              <h1 className="text-4xl md:text-6xl font-black text-foreground tracking-tight leading-tight mb-5">
                About T.M<br /><span className="text-primary text-glow-blue">Engineering</span>
              </h1>
              <p className="text-base md:text-lg leading-relaxed max-w-2xl">
                <span className="text-white font-semibold">Specialists in Industrial Automation and Electrical Engineering</span>
                <span className="text-muted-foreground">. For over 39 years, T.M Engineering has been providing exceptional 24-hour service and supplying only the highest quality products in the electrical and automation industries.</span>
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company story */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/8 border border-primary/15 text-primary text-[11px] font-bold uppercase tracking-widest mb-5">
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-5 tracking-tight leading-tight">
                <span className="text-primary">39 Years</span> of Excellence
              </h2>
              <div className="p-6 rounded-xl bg-card border border-border mb-8">
                <p className="text-base text-muted-foreground leading-relaxed italic">
                  "A customer is the most important visitor to our premises. He is not dependent on us; we are dependent on him. He is not an interruption to our business, and he is the purpose of it. He is not an outsider to our business, and he is part of it. We are not doing him a favour by serving him, and he is doing us a favour by giving us the opportunity to do so."
                </p>
                <p className="text-sm font-bold text-primary mt-4">— Director, T.M Engineering</p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
              <img src="https://media.base44.com/images/public/69fefc1890408637f331f461/788b29c79_generated_image.png" alt="T.M Engineering facility" className="rounded-2xl border border-border" />
              <div className="absolute -bottom-4 -left-4 bg-card border border-border rounded-xl p-4 shadow-xl">
                <div className="text-3xl font-display text-primary">39+</div>
                <div className="text-xs text-muted-foreground font-semibold">Years of Excellence</div>
              </div>
              <div className="absolute -top-4 -right-4 bg-card border border-border rounded-xl p-4 shadow-xl">
                <div className="text-3xl font-display text-accent">500+</div>
                <div className="text-xs text-muted-foreground font-semibold">Projects Completed</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-card/20 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Our Values" title="What Drives Us Every Day" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="p-5 rounded-xl bg-card border border-border gradient-border text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/8 border border-primary/15 flex items-center justify-center mx-auto mb-4">
                  <v.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-sm font-bold text-foreground mb-2">{v.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Company History" title="39 Years of Growth & Innovation" />
          <div className="relative">
            <div className="absolute left-12 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/30 via-border to-transparent" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className={`relative flex items-start gap-6 md:gap-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`md:w-1/2 ${i % 2 === 0 ? 'md:pr-10 md:text-right' : 'md:pl-10 md:text-left'} pl-20 md:pl-0`}>
                    <div className="p-4 rounded-xl bg-card border border-border hover:border-primary/20 transition-all gradient-border">
                      <span className="text-xs font-mono text-primary font-bold">{m.year}</span>
                      <h3 className="text-sm font-bold text-foreground mt-1 mb-1">{m.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{m.desc}</p>
                    </div>
                  </div>
                  <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 w-8 h-8 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}