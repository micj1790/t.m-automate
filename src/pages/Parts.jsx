import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Zap, Radio, Settings, ToggleLeft, Cpu, Box, Thermometer, Gauge, Wrench, ArrowRight } from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';
import BrandsBanner from '@/components/home/BrandsBanner';
import SEO from '@/components/SEO';

const partsCategories = [
  { icon: Zap, label: 'Switchgear', key: 'switchgear', desc: 'Circuit breakers, isolators, contactors & busbars.' },
  { icon: Radio, label: 'Sensors', key: 'sensors', desc: 'Proximity, photoelectric, temperature & pressure sensors.' },
  { icon: Settings, label: 'Industrial Gear Motors & Gearboxes', key: 'gear_motors', desc: 'Heavy-duty gear motors & gearboxes for conveyors.' },
  { icon: ToggleLeft, label: 'Solenoid Valves', key: 'solenoid_valves', desc: 'Pneumatic & hydraulic solenoid valves.' },
  { icon: Cpu, label: 'AC & DC Drives', key: 'ac_dc_drives', desc: 'VSDs & drives from ABB, Siemens, Danfoss & more.' },
  { icon: Box, label: 'PLCs & HMIs', key: 'plcs_hmis', desc: 'Siemens, Allen-Bradley, Mitsubishi & Schneider systems.' },
  { icon: Thermometer, label: 'Temperature Controllers', key: 'temperature_controllers', desc: 'PID & on/off temperature controllers.' },
  { icon: Gauge, label: 'Valves', key: 'valves', desc: 'Ball, butterfly, gate & globe valves.' },
  { icon: Gauge, label: 'Regulators', key: 'regulators', desc: 'Pressure regulators & air treatment units.' },
  { icon: Wrench, label: 'Cylinders', key: 'cylinders', desc: 'Pneumatic & hydraulic cylinders in all configurations.' },
];

export default function Parts() {
  return (
    <div className="pt-16">
      <SEO title="Industrial Automation Parts | Switchgear, Sensors, Drives, PLCs | T.M Engineering" description="Browse industrial automation parts from T.M Engineering — switchgear, sensors, gear motors, AC/DC drives, PLCs & HMIs, temperature controllers, valves, regulators and cylinders from top global brands." />
      <BrandsBanner />

      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/8 border border-primary/15 text-primary text-[11px] font-bold uppercase tracking-widest mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> Parts & Components
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-foreground tracking-tight mb-5">Industrial Parts</h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              A comprehensive range of electrical and mechanical components from the world's leading brands — in stock and ready to deliver.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {partsCategories.map((cat, i) => (
              <motion.div key={cat.key} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <Link to={`/catalogue?category=${cat.key}`}
                  className="group flex flex-col gap-3 p-6 rounded-xl bg-card border border-border hover:border-primary/50 hover:bg-primary/5 transition-all h-full">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <cat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors leading-snug mb-1">{cat.label}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{cat.desc}</p>
                  </div>
                  <div className="mt-auto flex items-center gap-1 text-xs font-semibold text-primary">
                    View Catalogue <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}