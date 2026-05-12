import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Tag, Package, Beaker, Droplets, Flame, Wind, ArrowRight } from 'lucide-react';
import BrandsBanner from '@/components/home/BrandsBanner';

const machinesCategories = [
  { icon: Tag, label: 'Labelling Machines', key: 'labelling_machines', desc: 'Automatic labelling equipment designed and manufactured since 1994. Wrap-around, top/bottom, sleeve and overhead labellers.' },
  { icon: Droplets, label: 'Liquid Fillers', key: 'liquid_fillers', desc: 'Automatic liquid filling machines for all viscosities — from water to thick creams, gravity to gear pump with loadcell.' },
  { icon: Flame, label: 'Heat Tunnels', key: 'heat_tunnels', desc: 'Shrink sleeve and heat tunnel systems for label and packaging shrink applications.' },
  { icon: Package, label: 'Bottle Capping Machines', key: 'bottle_capping', desc: 'Inline and rotary capping machines with torque control for screw caps, press-on caps and more.' },
  { icon: Wind, label: 'Vacuum Pumps', key: 'vacuum_pumps', desc: 'PUMPVAC oil-flooded sliding vane vacuum pumps for food packaging, pharmaceutical and industrial applications.' },
  { icon: Beaker, label: 'Vertical Form Fill & Seal Machines', key: 'vffs_machines', desc: 'VFFS machines for sachets, pouches and pillow pack applications across FMCG and food industries.' },
];

export default function Machines() {
  return (
    <div className="pt-16">
      <BrandsBanner />

      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[11px] font-bold uppercase tracking-widest mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" /> Manufactured Machines
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-foreground tracking-tight mb-5">Our Machines</h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Custom-built FMCG and industrial machines designed and manufactured by T.M Engineering since 1994.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {machinesCategories.map((cat, i) => (
              <motion.div key={cat.key} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
                <Link to={`/catalogue?category=${cat.key}`}
                  className="group flex items-start gap-4 p-6 rounded-xl bg-card border border-border hover:border-accent/50 hover:bg-accent/5 transition-all h-full">
                  <div className="w-14 h-14 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                    <cat.icon className="w-7 h-7 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-foreground group-hover:text-accent transition-colors mb-2">{cat.label}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-3">{cat.desc}</p>
                    <span className="flex items-center gap-1 text-xs font-semibold text-accent">
                      View Catalogue <ArrowRight className="w-3 h-3" />
                    </span>
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