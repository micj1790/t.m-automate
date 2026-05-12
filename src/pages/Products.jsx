import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Tag, Package, Beaker, Factory, Radio, Box, ArrowRight, Play, Zap, Settings, Thermometer, Gauge, Cylinder, Droplets, Flame, Wind, Wrench, Cpu, ToggleLeft } from 'lucide-react';
import CTASection from '@/components/home/CTASection';
import SectionHeader from '@/components/shared/SectionHeader';
import BrandsBanner from '@/components/home/BrandsBanner';

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

const machinesCategories = [
  { icon: Tag, label: 'Labelling Machines', key: 'labelling_machines', desc: 'Automatic labelling equipment designed since 1994.' },
  { icon: Droplets, label: 'Liquid Fillers', key: 'liquid_fillers', desc: 'Fillers for all viscosities and container types.' },
  { icon: Flame, label: 'Heat Tunnels', key: 'heat_tunnels', desc: 'Shrink sleeve & heat tunnel systems.' },
  { icon: Package, label: 'Bottle Capping Machines', key: 'bottle_capping', desc: 'Inline & rotary cappers with torque control.' },
  { icon: Wind, label: 'Vacuum Pumps', key: 'vacuum_pumps', desc: 'PUMPVAC oil-flooded sliding vane vacuum pumps.' },
  { icon: Beaker, label: 'Vertical Form Fill & Seal Machines', key: 'vffs_machines', desc: 'VFFS for sachets, pouches & pillow packs.' },
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
      {/* Two Columns: Parts + Machines */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <div className="grid grid-cols-2 gap-3">
                {partsCategories.map((cat, i) => (
                  <Link key={cat.key} to={`/catalogue?category=${cat.key}`}
                    className="group flex items-start gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary/50 hover:bg-primary/5 transition-all">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                      <cat.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors leading-snug">{cat.label}</h3>
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
              <div className="grid grid-cols-1 gap-3">
                {machinesCategories.map((cat, i) => (
                  <Link key={cat.key} to={`/catalogue?category=${cat.key}`}
                    className="group flex items-start gap-4 p-4 rounded-xl bg-card border border-border hover:border-accent/50 hover:bg-accent/5 transition-all">
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
    </div>
  );
}