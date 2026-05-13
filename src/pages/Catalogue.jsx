import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { ArrowLeft, ArrowRight, ChevronRight, ImageOff } from 'lucide-react';
import LabellingVideos from '@/components/products/LabellingVideos';
import LiquidFillerVideos from '@/components/products/LiquidFillerVideos';
import HeatTunnelVideos from '@/components/products/HeatTunnelVideos';
import LiddingCapperVideos from '@/components/products/LiddingCapperVideos';


const CATEGORY_META = {
  switchgear: { label: 'Switchgear', section: 'parts', desc: 'Circuit breakers, isolators, contactors and busbars from top global brands.' },
  sensors: { label: 'Sensors', section: 'parts', desc: 'Proximity, photoelectric, temperature and pressure sensors for industrial applications.' },
  gear_motors: { label: 'Industrial Gear Motors & Gearboxes', section: 'parts', desc: 'Heavy-duty gear motors and gearboxes for conveyor and process applications.' },
  solenoid_valves: { label: 'Solenoid Valves', section: 'parts', desc: 'Pneumatic and hydraulic solenoid valves for fluid and air control.' },
  ac_dc_drives: { label: 'AC & DC Drives', section: 'parts', desc: 'Variable speed drives from ABB, Siemens, Danfoss, Yaskawa and more.' },
  plcs_hmis: { label: 'PLCs & HMIs', section: 'parts', desc: 'Siemens, Allen-Bradley, Mitsubishi and Schneider PLC and HMI systems.' },
  temperature_controllers: { label: 'Temperature Controllers', section: 'parts', desc: 'PID and on/off temperature controllers for process and machine control.' },
  valves: { label: 'Valves', section: 'parts', desc: 'Ball, butterfly, gate and globe valves for industrial pipework systems.' },
  regulators: { label: 'Regulators', section: 'parts', desc: 'Pressure regulators and air treatment units for pneumatic systems.' },
  cylinders: { label: 'Cylinders', section: 'parts', desc: 'Pneumatic and hydraulic cylinders in standard and custom configurations.' },
  labelling_machines: { label: 'Labelling Machines', section: 'machines', desc: 'Automatic labelling equipment designed and manufactured since 1994.' },
  liquid_fillers: { label: 'Liquid Fillers', section: 'machines', desc: 'Automatic liquid filling machines for all viscosities and container types.' },
  heat_tunnels: { label: 'Heat Tunnels', section: 'machines', desc: 'Shrink sleeve and heat tunnel systems for label and packaging applications.' },
  bottle_capping: { label: 'Bottle Capping Machines', section: 'machines', desc: 'Inline and rotary capping machines with torque control for all cap types.' },
  lidding_machines: { label: 'Lidding Machines', section: 'machines', desc: 'Tray lidding and sealing machines for food and pharmaceutical packaging.' },
  vffs_machines: { label: 'Vertical Form Fill & Seal Machines', section: 'machines', desc: 'VFFS machines for sachet, pouch and pillow pack applications.' },
};

function ProductCard({ item, onSelect }) {
  const img = item.image_urls?.[0];
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="group rounded-xl bg-card border border-border hover:border-primary/40 transition-all overflow-hidden cursor-pointer"
      onClick={() => onSelect(item)}
    >
      <div className="h-48 bg-secondary/30 flex items-center justify-center overflow-hidden">
        {img ? (
          <img src={img} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <ImageOff className="w-10 h-10 text-muted-foreground/30" />
        )}
      </div>
      <div className="p-4">
        {item.brand && <span className="text-[10px] font-bold uppercase tracking-widest text-primary">{item.brand}</span>}
        <h3 className="text-sm font-bold text-foreground mt-0.5 mb-1">{item.name}</h3>
        {item.model && <p className="text-[11px] text-muted-foreground mb-2">Model: {item.model}</p>}
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{item.description}</p>
        <button className="mt-3 flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80 transition-colors">
          View Details <ChevronRight className="w-3 h-3" />
        </button>
      </div>
    </motion.div>
  );
}

function ProductModal({ item, onClose }) {
  const [imgIdx, setImgIdx] = useState(0);
  const imgs = item.image_urls || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-card border border-border rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative h-56 bg-secondary/30 overflow-hidden rounded-t-2xl">
          {imgs.length > 0 ? (
            <>
              <img src={imgs[imgIdx]} alt={item.name} className="w-full h-full object-cover" />
              {imgs.length > 1 && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                  {imgs.map((_, i) => (
                    <button key={i} onClick={() => setImgIdx(i)}
                      className={`w-2 h-2 rounded-full transition-all ${i === imgIdx ? 'bg-white scale-125' : 'bg-white/40'}`} />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ImageOff className="w-12 h-12 text-muted-foreground/30" />
            </div>
          )}
          <button onClick={onClose} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/70 backdrop-blur flex items-center justify-center text-foreground hover:bg-background transition-all">✕</button>
        </div>

        <div className="p-6">
          {item.brand && <span className="text-[10px] font-bold uppercase tracking-widest text-primary">{item.brand}</span>}
          <h2 className="text-xl font-black text-foreground mt-0.5 mb-1">{item.name}</h2>
          {item.model && <p className="text-xs text-muted-foreground mb-4">Model: {item.model}</p>}

          {item.description && (
            <div className="mb-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Description</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          )}

          {item.specifications && (
            <div className="mb-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Specifications</h4>
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{item.specifications}</p>
            </div>
          )}

          {item.features?.length > 0 && (
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Features</h4>
              <ul className="space-y-1.5">
                {item.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />{f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Link to="/quote"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-sm uppercase tracking-wide transition-all">
            Request a Quote <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default function Catalogue() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const category = params.get('category');
  const [selected, setSelected] = useState(null);

  const meta = CATEGORY_META[category];

  const { data: items = [], isLoading } = useQuery({
    queryKey: ['catalogue', category],
    queryFn: () => base44.entities.CatalogueItem.filter({ category }),
    enabled: !!category,
  });

  if (!meta) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Category not found.</p>
      </div>
    );
  }

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="py-14 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/products" className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors mb-6">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Products
          </Link>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/8 border border-primary/15 text-primary text-[11px] font-bold uppercase tracking-widest mb-4 block w-fit">
            {meta.section === 'parts' ? 'Parts & Components' : 'Machines'}
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-foreground tracking-tight mb-3">{meta.label}</h1>
          <p className="text-base text-muted-foreground max-w-2xl">{meta.desc}</p>

          {category === 'labelling_machines' && (
            <div className="mt-10">
              <LabellingVideos />
            </div>
          )}
          {category === 'liquid_fillers' && (
            <div className="mt-10">
              <LiquidFillerVideos />
            </div>
          )}
          {category === 'heat_tunnels' && (
            <div className="mt-10">
              <HeatTunnelVideos />
            </div>
          )}
          {category === 'lidding_machines' && (
            <div className="mt-10">
              <LiddingCapperVideos />
            </div>
          )}
        </div>
      </section>

      {/* Grid */}
      <section className="pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="rounded-xl bg-card border border-border h-72 animate-pulse" />
              ))}
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-muted-foreground text-sm mb-2">No products listed yet in this category.</p>
              <p className="text-muted-foreground/60 text-xs">Products can be added via the admin panel.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {items.map(item => (
                <ProductCard key={item.id} item={item} onSelect={setSelected} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Request a Quote */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex flex-col items-center gap-4 p-8 rounded-2xl bg-card border border-border">
            <p className="text-lg font-black text-foreground">Interested in our {meta.label}?</p>
            <p className="text-sm text-muted-foreground max-w-md">Get in touch with our team for pricing, availability and custom configurations.</p>
            <Link to="/quote" className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-sm transition-all">
              Request a Quote <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selected && <ProductModal item={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  );
}