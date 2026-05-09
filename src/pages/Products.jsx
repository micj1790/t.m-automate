import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Tag, Package, Beaker, Factory, Radio, Box, ArrowRight, Play, ExternalLink } from 'lucide-react';
import CTASection from '@/components/home/CTASection';
import SectionHeader from '@/components/shared/SectionHeader';

const products = [
  {
    icon: Tag, category: 'Labelling Machines', tag: 'Made in SA',
    img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80',
    desc: 'T.M Engineering has been designing and manufacturing automatic labelling equipment since 1994. Our range covers all FMCG labelling requirements.',
    items: [
      { name: 'Wrap-Around Labeller', desc: 'For round bottles and containers. Speeds up to 300+ BPM.' },
      { name: 'Top & Bottom Labeller', desc: 'Dual-head application for top and bottom labels simultaneously.' },
      { name: 'Overhead Labeller', desc: 'For sauces, small packs and flat containers.' },
      { name: 'Sleeve Labeller', desc: 'Automatic shrink sleeve labelling machine.' },
      { name: 'High-Speed Labeller', desc: 'Single-head high-speed wrap-around system.' },
      { name: 'Tub Labeller', desc: 'Purpose-built for margarine tubs and similar containers.' },
    ],
    ytId: 'xJnWPhd8txU'
  },
  {
    icon: Package, category: 'Liquid Fillers', tag: 'Custom Built',
    img: 'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=800&q=80',
    desc: 'Wide range of automatic liquid filling machines for all viscosities. From water to thick creams, we have the right filler for your product.',
    items: [
      { name: 'Single Head Filler', desc: 'Compact, accurate filling for low-volume production.' },
      { name: 'Multi-Head Filler', desc: '2-8 head configurations for high-speed production lines.' },
      { name: 'Gear Pump Filler with Loadcell', desc: 'Accurate to ±0.5% with real-time weight feedback.' },
      { name: 'Gravity Filler', desc: 'For thin liquids and water-based products.' },
      { name: 'Pharmaceutical Filler', desc: '316 stainless steel, GMP compliant for pharma liquids.' },
      { name: 'Vape/E-Liquid Filler', desc: 'Specialist filler for vaping products and e-liquids.' },
    ],
    ytId: 'b7EY71ckx-0'
  },
  {
    icon: Beaker, category: 'Pharmaceutical Equipment', tag: 'GMP Certified',
    img: 'https://images.unsplash.com/photo-1559757175-7cb056fba93c?w=800&q=80',
    desc: 'GMP-compliant pharmaceutical packaging and processing equipment. Full IQ/OQ/PQ documentation support for validated environments.',
    items: [
      { name: 'Tube Filler & Sealer', desc: 'Semi & fully automatic with ultrasonic sealing.' },
      { name: 'Dual Tablet Counter', desc: 'High-speed counting with indexing for accurate dosing.' },
      { name: 'Vial Filling System', desc: 'For injectable and liquid pharmaceutical products.' },
      { name: 'Bottle Capper', desc: 'Pick and place or inline with torque control.' },
      { name: 'Infeed Bottle Unscrambler', desc: 'Automatic bottle orientation and feeding.' },
      { name: 'Form Fill & Seal', desc: 'Vertical form fill and seal for sachets and pouches.' },
    ],
    ytId: '7uRvWpIYDdY'
  },
  {
    icon: Box, category: 'PCB Repairs', tag: 'Expert Service',
    img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
    desc: 'Expert electronic printed circuit board repair and refurbishment. All industrial electronics repaired at component level by qualified technicians.',
    items: [
      { name: 'PLC CPU Modules', desc: 'Siemens, Allen-Bradley, Mitsubishi CPU repairs.' },
      { name: 'VSD Drive Cards', desc: 'Power and control card repairs for all drive brands.' },
      { name: 'HMI Display Repairs', desc: 'Touchscreen and panel repair and refurbishment.' },
      { name: 'Servo Drive PCBs', desc: 'Servo amplifier and drive card component repairs.' },
      { name: 'Industrial I/O Modules', desc: 'Analogue and digital I/O module repairs.' },
      { name: 'Custom Control Boards', desc: 'Obsolete and custom board reverse engineering.' },
    ]
  },
  {
    icon: Factory, category: 'Industrial Vacuum Pumps', tag: 'PUMPVAC Brand',
    img: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800&q=80',
    desc: 'PUMPVAC oil-flooded sliding vane vacuum pumps built to the highest rotary vane vacuum technology. Ideal for food packaging and industrial applications.',
    items: [
      { name: 'PUMPVAC Sliding Vane Pump', desc: 'Oil-flooded design for reliable, continuous operation.' },
      { name: 'Food Grade Vacuum Pump', desc: 'NSF-approved for direct food contact applications.' },
      { name: 'Pharmaceutical Grade', desc: 'Clean room compatible vacuum systems.' },
      { name: 'High Vacuum Systems', desc: 'For deep vacuum applications in processing.' },
      { name: 'Pump Service & Repair', desc: 'Full overhaul and repair service for all makes.' },
      { name: 'Spare Parts Supply', desc: 'Genuine and OEM spare parts for all PUMPVAC models.' },
    ]
  },
  {
    icon: Radio, category: 'Electrical Wholesale', tag: '39 Years Supply',
    img: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80',
    desc: 'Comprehensive range of electrical products from the world\'s most reputable brands. Immediate delivery, best prices, technical support included.',
    items: [
      { name: 'Circuit Breakers & MCBs', desc: 'Schneider, ABB, Siemens, Legrand ranges.' },
      { name: 'Contactors & Relays', desc: 'All major brands, all ratings available.' },
      { name: 'Cable & Conduit', desc: 'Full range of industrial cable and conduit systems.' },
      { name: 'Sensors & Transducers', desc: 'Proximity, photoelectric, temperature and pressure.' },
      { name: 'Lighting Products', desc: 'Industrial LED and fluorescent lighting solutions.' },
      { name: 'Switchgear Products', desc: 'Isolators, change-over switches and busbars.' },
    ]
  },
];

export default function Products() {
  const [active, setActive] = useState(null);

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&q=80" alt="Products" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-background/88" />
          <div className="absolute inset-0 grid-pattern opacity-40" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/8 border border-primary/15 text-primary text-[11px] font-bold uppercase tracking-widest mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> Product Range
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-foreground tracking-tight mb-5">Our Products</h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              From custom-built labelling machines to pharmaceutical equipment — a comprehensive product range backed by 39 years of engineering expertise.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {products.map((prod, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="rounded-2xl bg-card border border-border overflow-hidden gradient-border">
              <div className={`grid grid-cols-1 lg:grid-cols-2 ${i % 2 !== 0 ? '' : ''}`}>
                {/* Image */}
                <div className={`relative ${i % 2 !== 0 ? 'lg:order-2' : ''}`}>
                  <div className="aspect-[16/10] lg:aspect-auto lg:h-full relative overflow-hidden">
                    <img src={prod.img} alt={prod.category} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-card/60 to-transparent" />
                    {prod.ytId && (
                      <a href={`https://www.youtube.com/watch?v=${prod.ytId}`} target="_blank" rel="noopener noreferrer"
                        className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold hover:bg-red-500/20 transition-colors">
                        <Play className="w-3.5 h-3.5" /> Watch Video
                      </a>
                    )}
                    <div className="absolute top-4 right-4">
                      <span className="px-2.5 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-bold">{prod.tag}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={`p-6 md:p-8 ${i % 2 !== 0 ? 'lg:order-1' : ''}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/8 border border-primary/15 flex items-center justify-center">
                      <prod.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-xl font-black text-foreground">{prod.category}</h2>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">{prod.desc}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-5">
                    {prod.items.map(item => (
                      <div key={item.name} className="p-3 rounded-lg bg-secondary/50 border border-border hover:border-primary/20 transition-colors">
                        <div className="text-xs font-bold text-foreground mb-0.5">{item.name}</div>
                        <div className="text-[10px] text-muted-foreground">{item.desc}</div>
                      </div>
                    ))}
                  </div>
                  <Link to="/quote" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary/8 border border-primary/20 text-primary text-sm font-bold hover:bg-primary/15 transition-all">
                    Get a Quote <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <CTASection />
    </div>
  );
}