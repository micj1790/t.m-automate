import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Cpu, Zap, Settings, Monitor, Activity, Shield, ArrowRight, Wrench, Factory, RefreshCw, Power, Cable, Gauge, Cog } from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';
import CTASection from '@/components/home/CTASection';

const services = [
  { icon: Cpu, title: 'PLC & HMI Programming', desc: 'Expert programming for Siemens S7, Allen-Bradley, Schneider, Mitsubishi, and Omron PLCs. Custom HMI development for intuitive operator interfaces.', features: ['Siemens S7-1200/1500', 'Allen-Bradley ControlLogix', 'Schneider M340/M580', 'Custom HMI screens'] },
  { icon: Zap, title: 'Industrial Automation', desc: 'Complete automation solutions from concept to commissioning. We design, build, program, and commission automated systems for any industry.', features: ['Process automation', 'Machine automation', 'Robotics integration', 'Industry 4.0'] },
  { icon: Settings, title: 'MCC Panels', desc: 'Custom motor control centre design, manufacture, and installation. Fully type-tested and compliant with SANS standards.', features: ['Custom design & manufacture', 'SANS compliant', 'Type-tested assemblies', 'Soft starter integration'] },
  { icon: Cable, title: 'Electrical Control Panels', desc: 'Bespoke control panel design and manufacture for industrial applications. From small machine panels to large distribution boards.', features: ['Custom panel design', 'PLC integration', 'Power distribution', 'Testing & certification'] },
  { icon: Power, title: 'Generator Synchronisation', desc: 'Synchronisation systems for standby and prime generators. Load sharing, auto-transfer, and parallel operation.', features: ['Auto-sync systems', 'Load sharing', 'Auto-transfer switches', 'Remote monitoring'] },
  { icon: Monitor, title: 'SCADA Systems', desc: 'Real-time supervisory control and data acquisition systems. Web-based and traditional SCADA platforms.', features: ['Wonderware/AVEVA', 'Ignition', 'WinCC', 'Web-based dashboards'] },
  { icon: Activity, title: 'Power Monitoring', desc: 'Energy management and power quality analysis. Monitor consumption, identify waste, and optimise efficiency.', features: ['Energy metering', 'Power quality', 'Load profiling', 'Cost allocation'] },
  { icon: Gauge, title: 'LV Distribution', desc: 'Low voltage distribution board design, manufacture, and installation for commercial and industrial applications.', features: ['DB design & manufacture', 'Load calculations', 'Protection coordination', 'Arc flash studies'] },
  { icon: Factory, title: 'Industrial Installations', desc: 'Complete electrical installations for industrial facilities. Cable installation, containment, and termination.', features: ['Cable installation', 'Cable management', 'Earthing systems', 'Lightning protection'] },
  { icon: Cog, title: 'Conveyor Systems', desc: 'Design, installation, and control of conveyor systems for material handling across all industries.', features: ['Belt conveyors', 'Screw conveyors', 'Pneumatic conveying', 'VSD speed control'] },
  { icon: RefreshCw, title: 'Machine Refurbishments', desc: 'Upgrade and modernise legacy equipment with new control systems, drives, and automation technology.', features: ['Control system upgrades', 'Drive replacements', 'PLC migrations', 'Safety upgrades'] },
  { icon: Wrench, title: 'Factory Upgrades', desc: 'Comprehensive factory upgrade solutions. Modernise infrastructure, controls, and power distribution.', features: ['Electrical infrastructure', 'Control system upgrades', 'Energy optimisation', 'Compliance upgrades'] },
  { icon: Settings, title: 'VSD/VFD Integration', desc: 'Variable speed drive installation and commissioning. Energy savings and precise motor control for any application.', features: ['ABB drives', 'Siemens drives', 'Schneider drives', 'Energy savings'] },
  { icon: Shield, title: '24/7 Breakdown Support', desc: 'Emergency industrial electrical and automation services. Our engineers are on standby 24/7 for critical breakdowns.', features: ['24/7 call-out', 'Rapid response', 'Fault diagnosis', 'Emergency repairs'] },
];

export default function Services() {
  return (
    <div className="pt-20">
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&q=80" alt="Services" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/70" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-widest mb-4">Our Services</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground tracking-tight">
              Complete <span className="text-primary">Engineering</span> Solutions
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">From concept to commissioning — we deliver world-class industrial automation and electrical engineering services.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 4) * 0.08 }}
                className="group p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-500">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-all">
                    <s.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{s.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{s.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {s.features.map((f, j) => (
                        <span key={j} className="px-2.5 py-1 rounded-md bg-secondary text-xs text-secondary-foreground font-medium">{f}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}