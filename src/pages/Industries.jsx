import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';
import CTASection from '@/components/home/CTASection';

const industries = [
  { name: 'Food & Beverage', img: 'https://images.unsplash.com/photo-1567446537708-ac4aa75c9c28?w=800&q=80', desc: 'Hygienic automation solutions for food processing, packaging, and beverage production. HACCP-compliant control systems and clean-in-place automation.', services: ['Process automation', 'Packaging lines', 'CIP systems', 'Temperature control', 'SCADA monitoring'] },
  { name: 'Mining', img: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=800&q=80', desc: 'Robust automation systems for harsh mining environments. Conveyor control, crushing plants, and mineral processing automation.', services: ['Conveyor systems', 'Crushing plants', 'Process control', 'Power distribution', 'Safety systems'] },
  { name: 'Pharmaceutical', img: 'https://images.unsplash.com/photo-1559757175-7cb056fba93c?w=800&q=80', desc: 'GMP-compliant automation for pharmaceutical manufacturing. Batch processing, environmental control, and validated systems.', services: ['Batch control', 'Environmental monitoring', 'Clean rooms', 'Validation', 'Data integrity'] },
  { name: 'Manufacturing', img: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800&q=80', desc: 'Full-spectrum automation for manufacturing facilities. From discrete manufacturing to continuous process control.', services: ['Assembly lines', 'Machine control', 'Quality systems', 'MES integration', 'Energy management'] },
  { name: 'Data Centres', img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80', desc: 'Critical power and cooling systems for data centres. Redundant control systems, BMS integration, and power monitoring.', services: ['Power monitoring', 'Cooling control', 'BMS integration', 'Generator control', 'UPS systems'] },
  { name: 'Industrial Processing', img: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=800&q=80', desc: 'Advanced process control for chemical, petrochemical, and industrial processing plants.', services: ['Process control', 'Instrumentation', 'SIS systems', 'DCS integration', 'Plant upgrades'] },
];

export default function Industries() {
  return (
    <div className="pt-20">
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-widest mb-4">Industries</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground tracking-tight">
              Industries <span className="text-primary">We Serve</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">Delivering industrial automation excellence across South Africa's most demanding sectors.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {industries.map((ind, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center`}>
              <div className="lg:w-1/2">
                <div className="rounded-xl overflow-hidden border border-border">
                  <img src={ind.img} alt={ind.name} className="w-full h-64 lg:h-80 object-cover" />
                </div>
              </div>
              <div className="lg:w-1/2">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">{ind.name}</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">{ind.desc}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {ind.services.map((s, j) => (
                    <span key={j} className="px-3 py-1.5 rounded-md bg-secondary text-xs text-secondary-foreground font-medium">{s}</span>
                  ))}
                </div>
                <Link to="/quote" className="inline-flex items-center gap-2 text-primary text-sm font-semibold hover:gap-3 transition-all">
                  Get a Quote <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <CTASection />
    </div>
  );
}