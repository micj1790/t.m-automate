import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Cpu, Zap, Settings, Monitor, Shield, Tag, ArrowRight } from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';

const services = [
  { icon: Cpu, title: 'PLC & HMI Programming', desc: 'Siemens, Allen-Bradley, Schneider & Mitsubishi — programmed and commissioned.', color: 'text-primary', bg: 'bg-primary/8 border-primary/15' },
  { icon: Zap, title: 'Industrial Automation', desc: 'End-to-end factory automation for FMCG, mining and manufacturing.', color: 'text-accent', bg: 'bg-accent/8 border-accent/15' },
  { icon: Settings, title: 'Control Panels', desc: 'Custom panels designed, manufactured and installed to SANS standards.', color: 'text-purple-400', bg: 'bg-purple-400/8 border-purple-400/15' },
  { icon: Monitor, title: 'SCADA Systems', desc: 'Real-time process monitoring and control using Wonderware & Ignition.', color: 'text-primary', bg: 'bg-primary/8 border-primary/15' },
  { icon: Tag, title: 'Labelling Machines', desc: 'Custom automatic labelling equipment for FMCG production lines.', color: 'text-yellow-400', bg: 'bg-yellow-400/8 border-yellow-400/15' },
  { icon: Shield, title: '24/7 Breakdown Support', desc: 'Emergency electrical and automation callout across Gauteng.', color: 'text-red-400', bg: 'bg-red-400/8 border-red-400/15' },
];

export default function ServicesPreview() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="What We Do"
          title="Engineering That Powers Industry"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
              <Link to="/services" className={`group block p-5 rounded-xl border ${s.bg} hover:border-current/30 transition-all duration-400 h-full gradient-border`}>
                <div className={`w-11 h-11 rounded-xl border ${s.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <s.icon className={`w-5 h-5 ${s.color}`} />
                </div>
                <h3 className="text-sm font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{s.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
                <div className={`flex items-center gap-1 mt-3 text-xs font-semibold ${s.color} opacity-0 group-hover:opacity-100 transition-opacity`}>
                  Learn more <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/services">
            <motion.button whileHover={{ scale: 1.02 }} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border hover:border-primary/30 hover:bg-primary/5 text-sm font-semibold text-muted-foreground hover:text-primary transition-all">
              View All Services <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
}