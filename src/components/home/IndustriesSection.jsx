import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SectionHeader from '@/components/shared/SectionHeader';

const industries = [
  { name: 'Food & Beverage', img: 'https://images.unsplash.com/photo-1567446537708-ac4aa75c9c28?w=600&q=80', count: '50+ Projects' },
  { name: 'Mining', img: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=600&q=80', count: '30+ Projects' },
  { name: 'Pharmaceutical', img: 'https://images.unsplash.com/photo-1559757175-7cb056fba93c?w=600&q=80', count: '25+ Projects' },
  { name: 'Manufacturing', img: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=600&q=80', count: '100+ Projects' },
  { name: 'Data Centres', img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80', count: '20+ Projects' },
  { name: 'Industrial Processing', img: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=600&q=80', count: '80+ Projects' },
];

export default function IndustriesSection() {
  return (
    <section className="py-20 md:py-28 bg-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Industries We Serve"
          title="Powering Every Sector"
          description="We deliver automation solutions across South Africa's most demanding industries."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link to="/industries" className="group relative block rounded-xl overflow-hidden h-56 border border-border hover:border-primary/30 transition-all">
                <img src={industry.img} alt={industry.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-lg font-bold text-foreground mb-1">{industry.name}</h3>
                  <span className="text-xs text-primary font-semibold">{industry.count}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}