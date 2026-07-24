import { Tag, Package, Beaker, Box, Radio, Zap, Settings, Thermometer, Gauge, Droplets, Flame, Cpu } from 'lucide-react';

// Unified list of all product categories with slugs for routing
export const productCategories = [
  // Parts & Components
  { slug: 'switchgear', section: 'parts', icon: Zap, label: 'Switchgear', short: 'Circuit breakers, isolators, contactors & busbars for industrial power distribution.', img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80' },
  { slug: 'sensors', section: 'parts', icon: Radio, label: 'Sensors', short: 'Proximity, photoelectric, temperature & pressure sensors for automation.', img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80' },
  { slug: 'gear-motors', section: 'parts', icon: Settings, label: 'Gear Motors & Gearboxes', short: 'Heavy-duty gear motors & gearboxes for conveyor systems.', img: 'https://images.unsplash.com/photo-1581092162384-8987c1d64926?w=800&q=80' },
  { slug: 'ac-dc-drives', section: 'parts', icon: Cpu, label: 'AC & DC Drives', short: 'Variable speed drives from ABB, Siemens, Danfoss & more.', img: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80' },
  { slug: 'plcs-hmis', section: 'parts', icon: Box, label: 'PLCs & HMIs', short: 'Programmable logic controllers & operator interfaces from all major brands.', img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80' },
  { slug: 'temperature-controllers', section: 'parts', icon: Thermometer, label: 'Temperature Controllers', short: 'PID & on/off temperature controllers for process control.', img: 'https://images.unsplash.com/photo-1581092162384-8987c1d64926?w=800&q=80' },
  { slug: 'pneumatics', section: 'parts', icon: Gauge, label: 'Pneumatics', short: 'Valves, regulators, cylinders & air treatment units for pneumatic systems.', img: 'https://images.unsplash.com/photo-1581092162384-8987c1d64926?w=800&q=80' },

  // Manufactured Machines
  { slug: 'labelling-machines', section: 'machines', icon: Tag, label: 'Labelling Machines', short: 'T.M Engineering has been designing and manufacturing automatic labelling equipment since 1994. Our range covers all FMCG labelling requirements.', img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80',
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
  { slug: 'liquid-fillers', section: 'machines', icon: Droplets, label: 'Liquid & Powder Fillers', short: 'Wide range of automatic liquid filling machines for all viscosities. From water to thick creams, we have the right filler for your product.', img: 'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=800&q=80',
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
  { slug: 'heat-tunnels', section: 'machines', icon: Flame, label: 'Heat Tunnels', short: 'Shrink sleeve & heat tunnel systems for packaging and labelling applications.', img: 'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=800&q=80' },
  { slug: 'bottle-capping-lidding', section: 'machines', icon: Package, label: 'Bottle Capping & Lidding Machines', short: 'Tray lidding and capping machines for food, beverage and pharmaceutical packaging. Precision sealing for all container types.', img: 'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=800&q=80',
    items: [
      { name: 'Tray Lidding Machine', desc: 'Automatic tray sealing with film or foil lids.' },
      { name: 'Inline Capper', desc: 'Continuous motion capping for all cap styles.' },
      { name: 'Rotary Capper', desc: 'High-speed rotary capping with torque control.' },
      { name: 'Pick & Place Capper', desc: 'Servo-driven pick and place for precision capping.' },
      { name: 'Foil Sealer', desc: 'Induction and heat foil sealing for bottles and jars.' },
      { name: 'ROPP Capper', desc: 'Roll-on pilfer-proof aluminium cap applicator.' },
    ]
  },
  { slug: 'boxing-machines', section: 'machines', icon: Box, label: 'Boxing Machines', short: 'Automatic boxing and carton erecting machines for end-of-line packaging.', img: 'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=800&q=80' },
];

export function getProductBySlug(slug) {
  return productCategories.find(p => p.slug === slug);
}