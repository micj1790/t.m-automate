import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Cpu, Zap, Settings, Monitor, Activity, Shield, Wrench, Box, Radio, Truck, Cable, ChevronRight, ArrowRight } from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';
import ClientsBanner from '@/components/home/ClientsBanner';

const services = [
  {
    icon: Cpu, title: 'PLC & HMI System Integrators', category: 'Automation',
    short: 'Expert programming, supply and integration of all major PLC and HMI brands.',
    desc: 'T.M Engineering are extreme specialists in PLC & HMI System Integration. We program, supply, install and commission Siemens S7/S5, Allen-Bradley, Schneider Electric Modicon, Mitsubishi and all other major brands. From simple conveyor control to complex multi-axis coordinated motion systems.',
    features: ['Siemens TIA Portal & Step 7', 'Allen-Bradley ControlLogix / CompactLogix', 'Schneider Unity Pro', 'Mitsubishi GX Works', 'On-site & remote programming', 'PLC Retrofits & Upgrades'],
    img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80'
  },
  {
    icon: Zap, title: 'Industrial Automation', category: 'Automation',
    short: 'Complete end-to-end factory automation solutions for all industries.',
    desc: 'We design, build and commission complete industrial automation systems. From concept design through to final commissioning, our team handles every aspect of your automation project including hardware selection, panel building, software development, installation and handover training.',
    features: ['Full turnkey automation', 'Process control systems', 'Motion control', 'Robotics integration', 'Safety systems (SIL rated)', 'Factory acceptance testing'],
    img: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80'
  },
  {
    icon: Settings, title: 'Control Panels', category: 'Electrical',
    short: 'Custom control panel design, manufacture and installation to SANS standards.',
    desc: 'We build, write the software, install and commission on site. Our facility has the infrastructure to manufacture heavy control panels and we have transport capacity for delivery. All panels are built to SANS and IEC standards with full documentation. Includes MCC sections with soft starters, VSDs, DOL and star-delta starters with full protection coordination.',
    features: ['Custom design & manufacture', 'SANS/IEC compliant', 'Full electrical drawings', 'FAT/SAT testing', 'Heavy industrial panels', 'IP65/IP66 rated enclosures', 'MCC sections & motor protection', 'Up to 6,600V systems', 'ATEX rated for hazardous areas'],
    img: 'https://images.unsplash.com/photo-1581092162384-8987c1d64926?w=800&q=80'
  },
  {
    icon: Box, title: 'PCB Repairs', category: 'Electronics',
    short: 'Electronic printed circuit board repairs for all industrial equipment.',
    desc: 'A printed circuit board is a device that mechanically supports and electrically connects electronic components. T.M Engineering provides expert PCB repair and refurbishment services for all types of industrial electronics including drive cards, PLC modules, HMI panels and control boards.',
    features: ['Component level repairs', 'Drive and inverter boards', 'PLC CPU modules', 'HMI display repairs', 'Soldering and rework', 'Load testing after repair'],
    img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80'
  },
  {
    icon: Radio, title: 'Electrical Wholesalers', category: 'Supply',
    short: 'Best quality electrical products from reputable world brands for 39 years.',
    desc: 'We have been supplying the best quality electrical products from the most reputable brand names around the world for over 39 years. With immediate delivery, the best prices and after sale technical support — T.M Engineering is your one stop electrical supplier.',
    features: ['Circuit breakers and MCBs', 'Contactors and relays', 'Cable and conduit', 'Sensors and transducers', 'Immediate delivery', 'Technical support included'],
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80'
  },
  {
    icon: Monitor, title: 'SCADA Systems', category: 'Automation',
    short: 'Wonderware, Ignition and custom SCADA/HMI implementation.',
    desc: 'Real-time monitoring and supervisory control solutions for industrial processes. We implement Wonderware InTouch/System Platform, Ignition, iFix and custom SCADA solutions. Includes historian data logging, alarm management and mobile access.',
    features: ['Wonderware & Ignition', 'Real-time dashboards', 'Historian data logging', 'Alarm management', 'Mobile access', 'OPC-UA connectivity'],
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80'
  },
  {
    icon: Activity, title: 'Power Monitoring', category: 'Power',
    short: 'Energy management and power quality analysis systems.',
    desc: 'Comprehensive power monitoring and energy management systems. We install power meters, power quality analysers and energy management software to help reduce electricity costs, improve power factor and comply with SANS standards. Full Eskom reporting capability.',
    features: ['Power quality analysis', 'Energy metering', 'Power factor correction', 'Harmonic analysis', 'Load profiling', 'Eskom reporting'],
    img: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80'
  },
  {
    icon: Truck, title: 'Conveyor Systems', category: 'Automation',
    short: 'Custom conveyor design, installation and automation.',
    desc: 'Complete conveyor system solutions from design through commissioning. Belt conveyors, slat conveyors, roller conveyors, overhead conveyors and accumulation systems. PLC controlled with speed monitoring, belt alignment detection and SCADA integration.',
    features: ['Belt and slat conveyors', 'Roller and chain systems', 'Speed and alignment monitoring', 'PLC integration', 'Accumulation and buffering', 'Variable speed control'],
    img: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=800&q=80'
  },
  {
    icon: Wrench, title: 'Factory Maintenance', category: 'Support',
    short: 'Experienced industrial electricians for ongoing factory maintenance.',
    desc: 'Our team of industrial electricians are extremely experienced. We understand the industry and are always willing to go above and beyond to exceed expectations. Planned preventive maintenance programs, fault finding and breakdown repairs.',
    features: ['Planned maintenance programs', 'Fault finding and diagnosis', 'Electrical installations', 'Motor and drive maintenance', 'Panel maintenance', 'Compliance inspections'],
    img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80'
  },
  {
    icon: Cable, title: 'Industrial Electrical Installations', category: 'Electrical',
    short: 'Complete industrial electrical installation and commissioning.',
    desc: 'Full industrial electrical installation services including new factory wiring, equipment installations, distribution boards, cable management and earthing systems. All work complies with SANS 10142 and is accompanied by certificates of compliance.',
    features: ['Factory wiring', 'Distribution boards', 'Cable management', 'Earthing systems', 'SANS 10142 compliant', 'COC certificates'],
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80'
  },
  {
    icon: Shield, title: '24/7 Technical Support', category: 'Support',
    short: 'Round the clock emergency callout service across Gauteng.',
    desc: 'Our primary goal is to constantly provide our clients with exceptional service 24-hours a day. With a team of highly trained employees who are 100% committed to service excellence, we work around the clock to ensure all electrical faults are taken care of quickly and efficiently.',
    features: ['24/7/365 availability', '90 minute response target', 'Gauteng coverage', 'After-hours: 083 375 7670', 'Remote diagnostics', 'Emergency spare parts'],
    img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80'
  },
];

const categories = ['All', 'Automation', 'Electrical', 'Power', 'Electronics', 'Supply', 'Support'];

export default function Services() {
  const [active, setActive] = useState('All');
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('');

  const filtered = services.filter(s => {
    const matchesCategory = active === 'All' || s.category === active;
    const matchesSearch = search === '' || s.title.toLowerCase().includes(search.toLowerCase()) || s.short.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ height: 'calc(100vh - 64px)', maxHeight: '700px', minHeight: '400px' }}>
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=1920&q=90" alt="Services" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-background/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background" />
          <div className="absolute inset-0 grid-pattern opacity-30" />
        </div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pb-32">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary text-[11px] font-bold uppercase tracking-widest mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> What We Do
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-5">Our Services</h1>
            <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto">
              Specialist engineering services covering industrial automation, electrical engineering, custom machines and 24/7 technical support.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <ClientsBanner />
        </div>
      </section>

      {/* Filter bar */}
      <section className="sticky top-16 z-30 bg-background/95 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-3 py-3">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar flex-1">
              {categories.map(cat => (
                <button key={cat} onClick={() => setActive(cat)}
                  className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    active === cat ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80'
                  }`}>
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search services..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full sm:w-64 px-4 py-1.5 rounded-full bg-secondary border border-border text-xs text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((s, i) => (
                <motion.div key={s.title} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ delay: i * 0.04 }}>
                  <div onClick={() => setSelected(selected?.title === s.title ? null : s)}
                    className="group cursor-pointer rounded-xl bg-card border border-border hover:border-primary/30 transition-all p-5">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/8 border border-primary/15 flex items-center justify-center shrink-0">
                        <s.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{s.title}</h3>
                        </div>
                        <span className="text-[10px] font-semibold text-primary/70 uppercase tracking-wider">{s.category}</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-3">{s.short}</p>
                    <AnimatePresence>
                      {selected?.title === s.title && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden">
                          <p className="text-xs text-muted-foreground leading-relaxed mb-3 border-t border-border pt-3">{s.desc}</p>
                          <ul className="space-y-1.5 mb-3">
                            {s.features.map(f => (
                              <li key={f} className="flex items-center gap-2 text-xs text-foreground">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />{f}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <button className="flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80 transition-colors">
                      {selected?.title === s.title ? 'Show less' : 'Learn more'} <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

    </div>
  );
}