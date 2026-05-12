import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Clock, Target, CheckCircle, ArrowRight, Phone, Mail, MapPin } from 'lucide-react';
import CTASection from '@/components/home/CTASection';
import SectionHeader from '@/components/shared/SectionHeader';

const values = [
  { icon: Target, title: 'Highest Quality', desc: 'Providing the highest quality electrical products at the best possible price.' },
  { icon: Award, title: 'Stay Current', desc: 'Constantly keeping up with the latest technological advancements in the industry.' },
  { icon: Users, title: 'Expert Advice', desc: 'Providing expert advice and giving honest opinions to our clients at all times.' },
  { icon: Clock, title: 'Service Excellence', desc: 'Exceptional 24-hour service as our primary goal - every single day.' },
];

const milestones = [
  { year: '1986', title: 'T.M Engineering Founded', desc: 'Established in Johannesburg, focusing on industrial electrical engineering.' },
  { year: '1994', title: 'Service Department Established', desc: 'Formed a dedicated service department to provide on-site support, maintenance and rapid response to clients across industries.' },
  { year: '2000', title: 'Progression into PLCs', desc: 'Expanded capabilities into PLC programming and commissioning, enabling more advanced machine control and process automation for clients.' },
  { year: '2010', title: 'Factory Automation Expertise', desc: 'Deepened our knowledge and capabilities in full factory automation - designing, building and commissioning complete automated production lines for clients across multiple industries.' },
  { year: '2018', title: 'Projects Division Established', desc: 'Launched a dedicated projects division to manage large-scale turnkey automation and electrical engineering projects from design through to commissioning.' },
  { year: '2023', title: 'Headquarters Expansion & Upgrades', desc: 'Expanded and upgraded the Strijdom Park headquarters with modern facilities, workshop improvements and enhanced capabilities to support growing client demand.' },
  { year: '2026', title: 'Here to Serve', desc: 'Today, T.M Engineering stands ready to serve all your electrical and industrial automation needs - delivering the same commitment to quality, reliability and 24-hour service that has defined us for 40 years.' },
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
                <span className="text-white font-semibold">Specialists in Industrial Automation</span>
                <span className="text-muted-foreground"> and FMCG Servicing & Supply. For over 39 years, T.M Engineering has been providing exceptional 24-hour service and supplying only the highest quality products in the electrical and FMCG industries.</span>
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
                Leading By Example - <span className="text-primary">39 Years Strong</span>
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                T.M. Engineering has been providing exceptional 24-hour service and supplying only the highest quality products in the electrical and FMCG industries for over 39 years. As a leading industrial electrical engineering company, we specialize in industrial electronic products and services that support a range of sectors.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                Throughout these 39 years, we have trained and developed a team of highly skilled professionals dedicated to exceeding expectations and building strong, long-lasting relationships with each client. The owner and management are hands-on at all times to ensure this commitment filters from the very top of the organization.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                <span className="text-foreground font-semibold">"A satisfied customer is the best business strategy of all."</span> - This quote drives everything we do at T.M Engineering. We pride ourselves on consistently exceeding expectations.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>10 Susan Street, Strijdom Park, Randburg</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4 text-primary" />
                  <a href="tel:+27117911562" className="hover:text-primary transition-colors">011 791 1562</a>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4 text-primary" />
                  <a href="mailto:sales@tmeng.co.za" className="hover:text-primary transition-colors">sales@tmeng.co.za</a>
                </div>
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

      <CTASection />
    </div>
  );
}