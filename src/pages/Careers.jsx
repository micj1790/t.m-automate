import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Briefcase, MapPin, Clock, ArrowRight, Users, Award, Zap } from 'lucide-react';
import CTASection from '@/components/home/CTASection';

const openings = [
  { title: 'PLC Programmer / Systems Engineer', type: 'Full-Time', location: 'Randburg, Johannesburg', desc: 'Experienced PLC programmer for Siemens, Allen-Bradley and Mitsubishi systems. SCADA development experience a bonus.' },
  { title: 'Electrical Control Panel Technician', type: 'Full-Time', location: 'Randburg, Johannesburg', desc: 'Panel building and wiring to drawings. SANS standards knowledge essential. Minimum 3 years experience.' },
  { title: 'Industrial Electrician', type: 'Full-Time', location: 'Gauteng (Site-based)', desc: 'Trade-tested electrician with industrial experience. Must be available for after-hours call-outs.' },
  { title: 'Mechanical Technician', type: 'Full-Time', location: 'Randburg, Johannesburg', desc: 'Experience with FMCG machinery, labelling machines and packaging equipment. Fault-finding skills essential.' },
];

const benefits = [
  { icon: Award, title: '39 Years of Stability', desc: 'Work for one of South Africa\'s most established engineering companies.' },
  { icon: Zap, title: 'Cutting-Edge Technology', desc: 'Work with the latest Siemens, ABB and Rockwell automation platforms.' },
  { icon: Users, title: 'Expert Team', desc: 'Learn from South Africa\'s best industrial automation engineers.' },
  { icon: Clock, title: 'Growth Opportunities', desc: 'Clear career progression paths with training and development support.' },
];

export default function Careers() {
  return (
    <div className="pt-16">
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&q=80" alt="Careers" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-background/88" />
          <div className="absolute inset-0 grid-pattern opacity-40" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/8 border border-primary/15 text-primary text-[11px] font-bold uppercase tracking-widest mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> Join Our Team
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-foreground tracking-tight mb-5">Careers at T.M Engineering</h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Join South Africa's leading industrial automation company. We're always looking for talented engineers and technicians to join our growing team.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-card/20 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {benefits.map((b, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="p-5 rounded-xl bg-card border border-border text-center gradient-border">
                <div className="w-11 h-11 rounded-xl bg-primary/8 border border-primary/15 flex items-center justify-center mx-auto mb-3">
                  <b.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-sm font-bold text-foreground mb-1">{b.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Openings */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-foreground mb-8">Current Openings</h2>
          <div className="space-y-4">
            {openings.map((job, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="p-5 rounded-xl bg-card border border-border hover:border-primary/25 transition-all gradient-border">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="text-sm font-bold text-foreground">{job.title}</h3>
                      <span className="px-2 py-0.5 rounded-full bg-primary/8 border border-primary/15 text-primary text-[10px] font-semibold">{job.type}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{job.desc}</p>
                  </div>
                  <Link to="/contact" className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/8 border border-primary/20 text-primary text-xs font-bold hover:bg-primary/15 transition-colors">
                    Apply Now <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 p-5 rounded-xl bg-card border border-border text-center">
            <h3 className="text-sm font-bold text-foreground mb-2">Don't see your role?</h3>
            <p className="text-xs text-muted-foreground mb-4">We're always interested in talented engineers. Send your CV to <a href="mailto:sales@tmeng.co.za" className="text-primary hover:underline">sales@tmeng.co.za</a></p>
            <a href="mailto:sales@tmeng.co.za" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-bold transition-all">
              Send Your CV <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}