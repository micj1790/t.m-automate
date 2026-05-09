import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Briefcase, MapPin, Clock, ArrowRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CTASection from '@/components/home/CTASection';

const openings = [
  { title: 'PLC Programmer', type: 'Full-time', location: 'Johannesburg', desc: 'Experienced PLC programmer for Siemens and Allen-Bradley platforms. Minimum 5 years experience.' },
  { title: 'Electrical Engineer', type: 'Full-time', location: 'Johannesburg', desc: 'Registered electrical engineer for industrial project design and management.' },
  { title: 'Automation Technician', type: 'Full-time', location: 'Johannesburg', desc: 'Hands-on automation technician for site installations and commissioning.' },
  { title: 'SCADA Developer', type: 'Full-time', location: 'Johannesburg', desc: 'SCADA developer with experience in Wonderware/AVEVA or Ignition platforms.' },
];

export default function Careers() {
  return (
    <div className="pt-20">
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-widest mb-4">Careers</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground tracking-tight">
              Join Our <span className="text-primary">Team</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">Build your career with one of South Africa's leading industrial automation companies.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {openings.map((job, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all group">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">{job.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{job.desc}</p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" />{job.type}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
                  </div>
                </div>
                <Link to="/contact">
                  <Button variant="outline" className="border-border hover:border-primary/50 text-sm whitespace-nowrap">
                    Apply Now <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}

          <div className="text-center pt-8">
            <p className="text-muted-foreground mb-4">Don't see your role? Send us your CV anyway.</p>
            <Link to="/contact">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                Send Your CV
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}