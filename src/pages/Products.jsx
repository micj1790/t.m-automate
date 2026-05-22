import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Tag, Package, Beaker, Factory, Radio, Box, ArrowRight, Play, Zap, Settings, Thermometer, Gauge, Droplets, Flame, Wrench, Cpu } from 'lucide-react';
import CTASection from '@/components/home/CTASection';
import SectionHeader from '@/components/shared/SectionHeader';
import BrandsBanner from '@/components/home/BrandsBanner';

const partsCategories = [
  { icon: Zap, label: 'Switchgear', key: 'switchgear', desc: 'Circuit breakers, isolators, contactors & busbars for industrial power distribution.' },
  { icon: Radio, label: 'Sensors', key: 'sensors', desc: 'Proximity, photoelectric, temperature & pressure sensors for automation.' },
  { icon: Settings, label: 'Gear Motors & Gearboxes', key: 'gear_motors', desc: 'Heavy-duty gear motors & gearboxes for conveyor systems.' },
  { icon: Cpu, label: 'AC & DC Drives', key: 'ac_dc_drives', desc: 'Variable speed drives from ABB, Siemens, Danfoss & more.' },
  { icon: Box, label: 'PLCs & HMIs', key: 'plcs_hmis', desc: 'Programmable logic controllers & operator interfaces.' },
  { icon: Thermometer, label: 'Temperature Controllers', key: 'temperature_controllers', desc: 'PID & on/off temperature controllers for process control.' },
  { icon: Gauge, label: 'Pneumatics', key: 'valves', desc: 'Valves, regulators, cylinders & air treatment units for pneumatic systems.' },
];

const machinesCategories = [
  { icon: Tag, label: 'Labelling Machines', key: 'labelling_machines', desc: 'Automatic labelling equipment designed since 1994.' },
  { icon: Droplets, label: 'Liquid & Powder Fillers', key: 'liquid_fillers', desc: 'Fillers for liquids, powders and all viscosities.' },
  { icon: Flame, label: 'Heat Tunnels', key: 'heat_tunnels', desc: 'Shrink sleeve & heat tunnel systems.' },
  { icon: Package, label: 'Bottle Capping & Lidding Machines', key: 'bottle_capping', desc: 'Inline & rotary cappers, tray lidding and sealing machines for all container types.' },
  { icon: Box, label: 'Boxing Machines', key: 'boxing_machines', desc: 'Automatic boxing and carton erecting machines for end-of-line packaging.' },
];

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
    icon: Package, category: 'Lidding & Capper Machines', tag: 'Packaging Solutions',
    img: 'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=800&q=80',
    desc: 'Tray lidding and capping machines for food, beverage and pharmaceutical packaging. Precision sealing for all container types.',
    items: [
      { name: 'Tray Lidding Machine', desc: 'Automatic tray sealing with film or foil lids.' },
      { name: 'Inline Capper', desc: 'Continuous motion capping for all cap styles.' },
      { name: 'Rotary Capper', desc: 'High-speed rotary capping with torque control.' },
      { name: 'Pick & Place Capper', desc: 'Servo-driven pick and place for precision capping.' },
      { name: 'Foil Sealer', desc: 'Induction and heat foil sealing for bottles and jars.' },
      { name: 'ROPP Capper', desc: 'Roll-on pilfer-proof aluminium cap applicator.' },
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
      {/* Two Columns: Parts + Machines */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Bar */}
          <div className="mb-10">
            <div className="relative max-w-xl mx-auto">
              <input
                type="text"
                placeholder="Search products, parts or machines..."
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-card border border-border text-sm focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">

            {/* Parts Column */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="flex items-center justify-between mb-5">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-primary">Parts & Components</span>
                  <h2 className="text-2xl font-black text-foreground mt-0.5">Industrial Parts</h2>
                </div>
                <Link to="/parts" className="flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80 transition-colors shrink-0">
                  View All <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
              <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                Comprehensive range of industrial automation parts from the world's most trusted brands. All components in stock for immediate delivery.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {partsCategories.map((cat, i) => (
                  <Link key={cat.key} to={`/catalogue?category=${cat.key}`}
                    className="group flex items-start gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary/50 hover:bg-primary/5 transition-all h-full">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                      <cat.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors leading-snug mb-1">{cat.label}</h3>
                      <p className="text-[10px] text-muted-foreground leading-relaxed">{cat.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Machines Column */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="flex items-center justify-between mb-5">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-accent">Manufactured Machines</span>
                  <h2 className="text-2xl font-black text-foreground mt-0.5">Our Machines</h2>
                </div>
                <Link to="/machines" className="flex items-center gap-1 text-xs font-semibold text-accent hover:text-accent/80 transition-colors shrink-0">
                  View All <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
              <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                Engineered and manufactured solutions for packaging, labelling, filling and processing across diverse industries.
              </p>
              <div className="grid grid-cols-1 gap-3">
                {machinesCategories.map((cat, i) => (
                  <Link key={cat.key} to={`/catalogue?category=${cat.key}`}
                    className="group flex items-start gap-4 p-4 rounded-xl bg-card border border-border hover:border-accent/50 hover:bg-accent/5 transition-all h-full">
                    <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                      <cat.icon className="w-5 h-5 text-accent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-foreground group-hover:text-accent transition-colors mb-0.5">{cat.label}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{cat.desc}</p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-accent transition-colors shrink-0 mt-0.5" />
                  </Link>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      <BrandsBanner />

      {/* Sensors Section */}
      <section className="py-16 md:py-20 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-bold uppercase tracking-widest mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> Sensors
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight">Sensor Products</h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-2xl">We supply a comprehensive range of industrial sensors from leading brands including Banner, Baumer, IFM Electronic, SICK and Turck.</p>
          </div>

          <div className="rounded-2xl overflow-hidden border border-border mb-10">
            <img
              src="https://media.base44.com/images/public/69fefc1890408637f331f461/2db98f6b4_sensors-banner.jpg"
              alt="Sensor brands — Banner, Baumer, IFM Electronic, SICK, Turck"
              className="w-full object-cover"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {[
              'Miniature Photoelectric Sensors',
              'Compact Photoelectric Sensors',
              'Midsize Photoelectric Sensors',
              'Full-Size Photoelectric Sensors',
              'Fiber Optic Sensors',
              'Ultrasonic Sensors',
              'Laser Sensors',
              'Temperature Controllers',
              'Part-Sensing Sensors',
              'Measuring Array Sensors',
              'Slot Sensors',
              'Analog Output Sensors',
              'Vehicle Detection Sensors',
              'Radar Sensors',
              'Temperature Sensors',
              'High-Pressure Wash Down Rated Sensors',
            ].map((type) => (
              <div key={type} className="flex items-center gap-2.5 p-3 rounded-xl bg-card border border-border hover:border-primary/30 hover:bg-primary/5 transition-all">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                <span className="text-xs font-medium text-foreground leading-snug">{type}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}