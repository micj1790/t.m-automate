import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Cpu, Zap, Settings, Monitor, Activity, Shield, ArrowRight } from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';

const services = [
  { icon: Cpu, title: 'PLC & HMI Programming', desc: 'Expert programming for Siemens, Allen-Bradley, Schneider and more.' },
  { icon: Zap, title: 'Industrial Automation', desc: 'Complete automation solutions for manufacturing and processing.' },
  { icon: Settings, title: 'MCC Panels', desc: 'Custom motor control centre design, manufacture and installation.' },
  { icon: Monitor, title: 'SCADA Systems', desc: 'Real-time monitoring and supervisory control solutions.' },
  { icon: Activity, title: 'Power Monitoring', desc: 'Energy management and power quality analysis systems.' },
  { icon: Shield, title: '24/7 Breakdown Support', desc: 'Emergency industrial electrical and automation services.' },
];

export default function ServicesPreview() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Our Services"
          title="Engineering Solutions That Power Industry"
          description="From PLC programming to complete factory automation, we deliver world-class industrial engineering solutions."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                to="/services"
                className="group block p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-500 h-full"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <service.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{service.desc}</p>
                <span className="text-xs font-semibold text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn More <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/services">
            <motion.button
              whileHover={{ scale: 1.02 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border hover:border-primary/30 text-foreground hover:text-primary font-semibold text-sm transition-all"
            >
              View All Services <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
}