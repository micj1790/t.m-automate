import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';

const fallbackProjects = [
  { title: 'High-Speed Labelling Machine', description: 'Custom-built automatic labelling system for bottled water production. Wrap-around labels at 300+ bottles/min.', service_type: 'Labelling Machines', industry: 'food_beverage', image_urls: ['https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80'] },
  { title: 'MCC Panel — Automotive Plant', description: '16-bucket MCC with soft starters, VSDs and full protection for Johannesburg automotive manufacturing plant.', service_type: 'MCC Panels', industry: 'manufacturing', image_urls: ['https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800&q=80'] },
  { title: 'PLC Retrofit — Packaging Line', description: 'Migration from relay logic to Allen-Bradley CompactLogix with PanelView Plus HMI. 60% downtime reduction.', service_type: 'PLC Programming', industry: 'fmcg', image_urls: ['https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80'] },
  { title: 'SCADA — Water Treatment Plant', description: 'Wonderware SCADA for municipal water treatment with remote monitoring and alarm management. 99.9% uptime.', service_type: 'SCADA Systems', industry: 'industrial_processing', image_urls: ['https://images.unsplash.com/photo-1513828583688-c52646db42da?w=800&q=80'] },
];

const industryLabels = { food_beverage: 'Food & Beverage', fmcg: 'FMCG', manufacturing: 'Manufacturing', mining: 'Mining', pharmaceutical: 'Pharmaceutical', data_centres: 'Data Centres', industrial_processing: 'Industrial Processing' };

export default function FeaturedProjects() {
  const { data: projects = [] } = useQuery({
    queryKey: ['projects-featured'],
    queryFn: () => base44.entities.Project.filter({ featured: true }, '-created_date', 6),
  });

  const display = projects.length > 0 ? projects : fallbackProjects;

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <SectionHeader label="Featured Projects" title="Our Work Speaks for Itself" align="left" />
          <Link to="/projects" className="shrink-0 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors mb-4">
            View All Projects <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {display.slice(0, 3).map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Link to="/projects" className="group block relative rounded-2xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-500">
                <div className="aspect-[16/9] relative">
                  <img src={p.image_urls?.[0] || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80'} alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-all duration-500" />

                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-semibold">
                      {p.service_type || 'Engineering'}
                    </span>
                    {(p.industry || p.industry) && (
                      <span className="px-2 py-0.5 rounded-full bg-secondary text-muted-foreground text-[10px]">
                        {industryLabels[p.industry] || p.industry}
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">{p.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{p.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>


      </div>
    </section>
  );
}