import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, CheckCircle, ChevronDown, Phone, MapPin } from 'lucide-react';
import { services, getServiceBySlug } from '@/data/services';
import BrandsBanner from '@/components/home/BrandsBanner';
import SEO from '@/components/SEO';

export default function ServiceDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const service = getServiceBySlug(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!service) {
    return (
      <div className="pt-32 pb-20 text-center">
        <SEO title="Service Not Found | T.M Engineering" />
        <h1 className="text-3xl font-black text-foreground mb-4">Service Not Found</h1>
        <p className="text-muted-foreground mb-6">The service you're looking for doesn't exist.</p>
        <Link to="/services" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to All Services
        </Link>
      </div>
    );
  }

  const related = services.filter(s => s.category === service.category && s.slug !== service.slug).slice(0, 3);
  const Icon = service.icon;

  return (
    <div className="pt-16">
      <SEO
        title={`${service.title} | T.M Engineering`}
        description={service.short}
      />

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ height: 'calc(100vh - 64px)', maxHeight: '600px', minHeight: '400px' }}>
        <div className="absolute inset-0">
          <img src={service.img} alt={service.title} className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-background/70" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/50 to-background" />
          <div className="absolute inset-0 grid-pattern opacity-30" />
        </div>
        <div className="relative z-10 h-full flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link to="/services" className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors mb-5">
              <ArrowLeft className="w-3.5 h-3.5" /> All Services
            </Link>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0">
                <Icon className="w-7 h-7 text-primary" />
              </div>
              <span className="text-[11px] font-bold text-primary uppercase tracking-widest">{service.category}</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-5 max-w-3xl">{service.title}</h1>
            <p className="text-base md:text-lg text-white/80 max-w-2xl">{service.short}</p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-2xl md:text-3xl font-black text-foreground mb-5">Overview</h2>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-10">{service.desc}</p>

                <h3 className="text-xl font-bold text-foreground mb-5">Key Capabilities</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.features.map(f => (
                    <li key={f} className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border">
                      <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                      <span className="text-sm text-foreground">{f}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="sticky top-24 rounded-2xl bg-card border border-border p-6"
              >
                <h3 className="text-lg font-bold text-foreground mb-4">Enquire About This Service</h3>
                <p className="text-sm text-muted-foreground mb-5">
                  Need help with {service.title.toLowerCase()}? Get a free, no-obligation quote from our engineering team.
                </p>
                <Link
                  to="/quote"
                  className="flex items-center justify-center gap-2 w-full bg-primary hover:bg-primary/90 text-primary-foreground font-black h-12 rounded-lg uppercase tracking-wide transition-colors mb-3"
                >
                  Request a Quote <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="tel:+27117911562"
                  className="flex items-center justify-center gap-2 w-full border border-border hover:border-primary/50 text-foreground font-semibold h-11 rounded-lg transition-colors mb-4"
                >
                  <Phone className="w-4 h-4 text-primary" /> 011 791 1562
                </a>
                <div className="flex items-start gap-2 text-xs text-muted-foreground pt-4 border-t border-border">
                  <MapPin className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <span>10 Susan Street, Strijdom Park, Randburg &middot; Rustenburg branch also available</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Related services */}
      {related.length > 0 && (
        <section className="py-16 border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-foreground mb-8">Related Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((s, i) => {
                const RIcon = s.icon;
                return (
                  <motion.div key={s.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                    <Link
                      to={`/services/${s.slug}`}
                      className="group block rounded-2xl bg-card border border-border hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-200 overflow-hidden"
                    >
                      <div className="p-6">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                          <RIcon className="w-6 h-6 text-primary" />
                        </div>
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-1">{s.category}</span>
                        <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors mb-2">{s.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{s.short}</p>
                      </div>
                      <div className="px-6 py-3 border-t border-border bg-secondary/30 flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-xs font-semibold text-primary">Learn more <ArrowRight className="w-3.5 h-3.5" /></span>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <BrandsBanner />
    </div>
  );
}