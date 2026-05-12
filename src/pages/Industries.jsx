import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import CTASection from '@/components/home/CTASection';
import SectionHeader from '@/components/shared/SectionHeader';
import ClientsBanner from '@/components/home/ClientsBanner';

const industries = [
  {
    name: 'FMCG', sub: 'Fast-Moving Consumer Goods',
    img: 'https://media.base44.com/images/public/69fefc1890408637f331f461/954c789f3_fmcg2.webp',
    desc: 'T.M Engineering has been the preferred automation partner for FMCG manufacturers for 39 years. We understand the demanding 24/7 production environments and the critical importance of minimal downtime.',
    services: ['Labelling Machines', 'Liquid Fillers', 'Conveyor Systems', 'Packaging Line Automation', 'PLC Programming', 'VSD & Drive Systems'],
    stat: '150+ Projects'
  },
  {
    name: 'Food & Beverage', sub: 'Production & Packaging',
    img: 'https://media.base44.com/images/public/69fefc1890408637f331f461/3d3506004_fandb.jpg',
    desc: 'From bottling plants to food processing facilities, we deliver hygienic automation solutions that meet food safety standards while maximising throughput and efficiency.',
    services: ['Filling & Capping Machines', 'Shrink Tunnel Systems', 'Checkweighers', 'SCADA Monitoring', 'CIP-compatible equipment', 'Stainless steel construction'],
    stat: '80+ Projects'
  },
  {
    name: 'Pharmaceutical', sub: 'GMP Compliant Solutions',
    img: 'https://media.base44.com/images/public/69fefc1890408637f331f461/329377a66_pharma2.png',
    desc: 'We provide GMP-compliant automation solutions for pharmaceutical manufacturers, with full IQ/OQ/PQ documentation, 21 CFR Part 11 compliance and FDA-acceptable designs.',
    services: ['Tube Fillers & Sealers', 'Tablet Counters', 'Vial Filling Systems', 'Serialisation Integration', 'GMP Documentation', 'Validated Systems'],
    stat: '40+ Projects'
  },
  {
    name: 'Mining', sub: 'Heavy Industrial Solutions',
    img: 'https://media.base44.com/images/public/69fefc1890408637f331f461/883dde3fb_mining2.jpg',
    desc: 'Mining applications demand rugged, reliable automation that performs in harsh environments. We deliver explosion-proof controls, conveyor automation and comprehensive SCADA monitoring.',
    services: ['Conveyor Belt Control', 'Explosion-Proof Panels', 'MCC for Pumps & Fans', 'SCADA & Historian', 'Generator Synchronisation', '24/7 Breakdown Support'],
    stat: '50+ Projects'
  },
  {
    name: 'Manufacturing', sub: 'Production Line Automation',
    img: 'https://media.base44.com/images/public/69fefc1890408637f331f461/eee7278bf_manufctauring2.png',
    desc: 'From automotive assembly to discrete manufacturing, we provide complete production line automation solutions that increase throughput, improve quality and reduce costs.',
    services: ['Assembly Line Automation', 'Robot Integration', 'Quality Control Systems', 'OEE Monitoring', 'MES Integration', 'Machine Refurbishments'],
    stat: '120+ Projects'
  },
  {
    name: 'Cosmetics', sub: 'Filling, Labelling & Packaging',
    img: 'https://media.base44.com/images/public/69fefc1890408637f331f461/e273fb242_cosmteics2.jpg',
    desc: 'Cosmetics and personal care manufacturers trust T.M Engineering for precision filling, labelling and packaging automation. Our machines handle creams, lotions, gels and liquids with accuracy.',
    services: ['Precision Liquid Fillers', 'Tube Fillers', 'Labelling Systems', 'Capping Machines', 'Tamper Evidence', 'Serialisation'],
    stat: '30+ Projects'
  },
];

export default function Industries() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/8 border border-primary/15 text-primary text-[11px] font-bold uppercase tracking-widest mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> Sectors We Serve
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-foreground tracking-tight mb-5">Industries We Serve</h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Deep expertise across 6 major industries. 39 years of delivering reliable automation solutions to South Africa's most demanding sectors.
            </p>
          </motion.div>
        </div>
      </section>

      <ClientsBanner />

      {/* Industries */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {industries.map((ind, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${i % 2 !== 0 ? 'lg:grid-flow-col-dense' : ''}`}>
              <div className={i % 2 !== 0 ? 'lg:col-start-2' : ''}>
                <div className="relative rounded-2xl overflow-hidden border border-border group">
                  <img src={ind.img} alt={ind.name} className="w-full aspect-[16/10] object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute bottom-4 right-4">
                    <span className="px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold backdrop-blur-sm">{ind.stat}</span>
                  </div>
                </div>
              </div>
              <div className={i % 2 !== 0 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/8 border border-primary/15 text-primary text-[10px] font-bold uppercase tracking-widest mb-4">
                  {ind.sub}
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-foreground mb-3">{ind.name}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{ind.desc}</p>
                <div className="grid grid-cols-2 gap-2 mb-5">
                  {ind.services.map(s => (
                    <div key={s} className="flex items-center gap-2 text-xs text-foreground">
                      <CheckCircle className="w-3.5 h-3.5 text-primary shrink-0" />{s}
                    </div>
                  ))}
                </div>
                <Link to="/quote" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-bold transition-all glow-blue">
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