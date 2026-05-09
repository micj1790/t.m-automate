import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';

const industries = [
  { name: 'FMCG', sub: 'Fast-Moving Consumer Goods', img: 'https://images.unsplash.com/photo-1567446537708-ac4aa75c9c28?w=800&q=80', count: '60+ Projects' },
  { name: 'Food & Beverage', sub: 'Production & Packaging', img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80', count: '80+ Projects' },
  { name: 'Pharmaceutical', sub: 'GMP Compliant Systems', img: 'https://images.unsplash.com/photo-1559757175-7cb056fba93c?w=800&q=80', count: '40+ Projects' },
  { name: 'Mining', sub: 'Heavy Industrial', img: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=800&q=80', count: '50+ Projects' },
  { name: 'Manufacturing', sub: 'Production Lines', img: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800&q=80', count: '120+ Projects' },
  { name: 'Data Centres', sub: 'Power & Monitoring', img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80', count: '25+ Projects' },
  { name: 'Industrial Processing', sub: 'Plant Automation', img: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=800&q=80', count: '90+ Projects' },
  { name: 'Cosmetics', sub: 'Filling & Labelling', img: 'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=800&q=80', count: '30+ Projects' },
];

export default function IndustriesSection() {
  return (
    <section className="py-20 md:py-28 bg-card/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader label="Industries We Serve" title="Powering Every Sector" description="Delivering precision automation and electrical engineering expertise across South Africa's most demanding industries." />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {industries.map((ind, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
              <Link to="/industries" className="group relative block rounded-xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-500">
                <div className="aspect-[4/3] relative">
                  <img src={ind.img} alt={ind.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="text-sm font-bold text-foreground">{ind.name}</div>
                    <div className="text-[10px] text-muted-foreground">{ind.sub}</div>
                    <div className="text-[10px] text-primary font-semibold mt-1">{ind.count}</div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/industries" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-medium">
            Explore all industries <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}