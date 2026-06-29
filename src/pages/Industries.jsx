import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeader from '@/components/shared/SectionHeader';
import ClientsBanner from '@/components/home/ClientsBanner';
import SEO from '@/components/SEO';

const industries = [
  {
    name: 'FMCG', sub: 'Fast Moving Consumer Goods',
    img: 'https://media.base44.com/images/public/69fefc1890408637f331f461/954c789f3_fmcg2.webp',
    desc: 'T.M Engineering has been the preferred automation partner for FMCG manufacturers for 39 years. We understand the demanding 24/7 production environments and the critical importance of minimal downtime.',
    services: ['Labelling Machines', 'Liquid Fillers', 'Conveyor Systems', 'Packaging Line Automation', 'PLC Programming', 'VSD & Drive Systems'],
  },
  {
    name: 'Food & Beverage', sub: 'Production & Packaging',
    img: 'https://media.base44.com/images/public/69fefc1890408637f331f461/3d3506004_fandb.jpg',
    desc: 'From bottling plants to food processing facilities, we deliver hygienic automation solutions that meet food safety standards while maximising throughput and efficiency.',
    services: ['Filling & Capping Machines', 'Shrink Tunnel Systems', 'Checkweighers', 'SCADA Monitoring', 'CIP compatible equipment', 'Stainless steel construction'],
  },
  {
    name: 'Pharmaceutical', sub: 'GMP Compliant Solutions',
    img: 'https://media.base44.com/images/public/69fefc1890408637f331f461/329377a66_pharma2.png',
    desc: 'We provide GMP compliant automation solutions for pharmaceutical manufacturers, with full IQ/OQ/PQ documentation, 21 CFR Part 11 compliance and FDA acceptable designs.',
    services: ['Tube Fillers & Sealers', 'Tablet Counters', 'Vial Filling Systems', 'Serialisation Integration', 'GMP Documentation', 'Validated Systems'],
  },
  {
    name: 'Mining', sub: 'Heavy Industrial Solutions',
    img: 'https://media.base44.com/images/public/69fefc1890408637f331f461/883dde3fb_mining2.jpg',
    desc: 'Mining applications demand rugged, reliable automation that performs in harsh environments. We deliver explosion proof controls, conveyor automation and comprehensive SCADA monitoring.',
    services: ['Conveyor Belt Control', 'Explosion Proof Panels', 'Control and MCC Panels for Pumps & Fans', 'SCADA & Historian', 'Generator Synchronisation'],
  },
  {
    name: 'Manufacturing', sub: 'Production Line Automation',
    img: 'https://media.base44.com/images/public/69fefc1890408637f331f461/eee7278bf_manufctauring2.png',
    desc: 'From automotive assembly to discrete manufacturing, we provide complete production line automation solutions that increase throughput, improve quality and reduce costs.',
    services: ['Assembly Line Automation', 'Robot Integration', 'Quality Control Systems', 'OEE Monitoring', 'MES Integration', 'Machine Refurbishments'],
  },
  {
    name: 'Cosmetics', sub: 'Filling, Labelling & Packaging',
    img: 'https://media.base44.com/images/public/69fefc1890408637f331f461/e273fb242_cosmteics2.jpg',
    desc: 'Cosmetics and personal care manufacturers trust T.M Engineering for precision filling, labelling and packaging automation. Our machines handle creams, lotions, gels and liquids with accuracy.',
    services: ['Precision Liquid Fillers', 'Tube Fillers', 'Labelling Systems', 'Capping Machines', 'Tamper Evidence', 'Serialisation'],
  },
];

export default function Industries() {
  return (
    <div className="pt-16">
      <SEO title="Industries We Serve | FMCG, Mining, Pharmaceutical | T.M Engineering" description="T.M Engineering serves FMCG, Food & Beverage, Pharmaceutical, Mining, Manufacturing and Cosmetics industries with tailored automation solutions. 39 years of industry expertise across South Africa." />
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ height: 'calc(100vh - 64px)', maxHeight: '700px', minHeight: '400px' }}>
        <div className="absolute inset-0">
          <img
            src="https://img.magnific.com/free-photo/male-engineer-analyzed-industry-40-system-smart-manufacturing-plant_482257-126802.jpg?semt=ais_hybrid&w=1600&q=80"
            alt="Industries background"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-background/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background" />
        </div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pb-32">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary text-[11px] font-bold uppercase tracking-widest mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> Sectors We Serve
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-4">Industries We Serve</h1>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Deep expertise across 6 major industries. 39 years of delivering reliable automation solutions to South Africa's most demanding sectors.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-36 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1">
          <span className="text-[11px] font-semibold text-white/70 uppercase tracking-widest">Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}>
            <ChevronDown className="w-6 h-6 text-white/70" />
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <ClientsBanner />
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {industries.map((ind, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="rounded-xl border border-border bg-card overflow-hidden">
                <img src={ind.img} alt={ind.name} className="w-full h-24 object-cover" />
                <div className="p-2.5">
                  <h2 className="text-xs font-black text-foreground mb-0.5">{ind.name}</h2>
                  <p className="text-[10px] text-muted-foreground leading-relaxed mb-1.5 line-clamp-2">{ind.desc}</p>
                  <div className="grid grid-cols-2 gap-0.5 mb-2">
                    {ind.services.slice(0, 4).map(s => (
                      <div key={s} className="flex items-center gap-1 text-[9px] text-foreground">
                        <CheckCircle className="w-2 h-2 text-primary shrink-0" />{s}
                      </div>
                    ))}
                  </div>
                  <Link to="/quote" className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-primary hover:bg-primary/90 text-primary-foreground text-[10px] font-bold transition-all">
                    Get a Quote <ArrowRight className="w-2.5 h-2.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}