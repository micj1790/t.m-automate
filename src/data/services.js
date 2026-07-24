import { Cpu, Zap, Settings, Monitor, Activity, Shield, Wrench, Box, Radio, Truck, Cable } from 'lucide-react';

export const services = [
  {
    slug: 'plc-hmi-system-integrators',
    icon: Cpu, title: 'PLC & HMI System Integrators', category: 'Automation',
    short: 'Expert programming, supply and integration of all major PLC and HMI brands.',
    desc: 'T.M Engineering are extreme specialists in PLC & HMI System Integration. We program, supply, install and commission Siemens, Allen-Bradley, Schneider Electric Modicon, Mitsubishi, Delta and all other major brands. From simple conveyor control to complex multi-axis coordinated motion systems.',
    features: ['Siemens TIA Portal', 'Allen-Bradley ControlLogix / CompactLogix', 'Schneider Unity Pro', 'Mitsubishi GX Works', 'Delta PLCs', 'On-site & remote programming', 'PLC Retrofits & Upgrades'],
    img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80'
  },
  {
    slug: 'industrial-automation',
    icon: Zap, title: 'Industrial Automation', category: 'Automation',
    short: 'Complete end-to-end factory automation solutions for all industries.',
    desc: 'We design, build and commission complete industrial automation systems. From concept design through to final commissioning, our team handles every aspect of your automation project including hardware selection, panel building, software development, installation and handover training.',
    features: ['Full turnkey automation', 'Process control systems', 'Motion control', 'Robotics integration', 'Safety systems', 'Factory acceptance testing'],
    img: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80'
  },
  {
    slug: 'control-panels',
    icon: Settings, title: 'Control Panels', category: 'Electrical',
    short: 'Custom control panel design, manufacture and installation to SANS standards.',
    desc: 'We build, write the software, install and commission on site. Our facility has the infrastructure to manufacture heavy control panels and we have transport capacity for delivery. All panels are built to SANS and IEC standards with full documentation. Includes sections with soft starters, VSDs, DOL and star-delta starters with full protection coordination.',
    features: ['Custom design & manufacture', 'SANS/IEC compliant', 'Full electrical drawings', 'FAT/SAT testing', 'Heavy industrial panels', 'IP65/IP66 rated enclosures', 'Motor protection & soft starters', 'and more'],
    img: 'https://images.unsplash.com/photo-1581092162384-8987c1d64926?w=800&q=80'
  },
  {
    slug: 'pcb-repairs',
    icon: Box, title: 'PCB Repairs', category: 'Electronics',
    short: 'Electronic printed circuit board repairs for all industrial equipment.',
    desc: 'A printed circuit board is a device that mechanically supports and electrically connects electronic components. T.M Engineering provides expert PCB repair and refurbishment services for all types of industrial electronics including drive cards, PLC modules, HMI panels and control boards.',
    features: ['Component level repairs', 'Drive and inverter boards', 'PLC CPU modules', 'HMI display repairs', 'Soldering and rework', 'Load testing after repair'],
    img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80'
  },
  {
    slug: 'electrical-wholesalers',
    icon: Radio, title: 'Electrical Wholesalers', category: 'Supply',
    short: 'Quality electrical products from reputable world brands for 39 years.',
    desc: 'We have been supplying quality electrical products from reputable brand names around the world for over 39 years. With immediate delivery, competitive prices and after sale technical support — T.M Engineering is your one stop electrical supplier.',
    features: ['Circuit breakers and MCBs', 'Contactors and relays', 'Cable and conduit', 'Sensors and transducers', 'Immediate delivery', 'Technical support included', 'and more'],
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80'
  },
  {
    slug: 'scada-systems',
    icon: Monitor, title: 'SCADA Systems', category: 'Automation',
    short: 'Wonderware, Ignition and custom SCADA/HMI implementation.',
    desc: 'Real-time monitoring and supervisory control solutions for industrial processes. We implement Wonderware InTouch/System Platform, Ignition, iFix and custom SCADA solutions. Includes historian data logging, alarm management and mobile access.',
    features: ['Wonderware & Ignition', 'Real-time dashboards', 'Historian data logging', 'Alarm management', 'Mobile access', 'and more'],
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80'
  },
  {
    slug: 'power-monitoring',
    icon: Activity, title: 'Power Monitoring', category: 'Power',
    short: 'Energy management and power quality analysis systems.',
    desc: 'Comprehensive power monitoring and energy management systems. We install power meters, power quality analysers and energy management software to help reduce electricity costs, improve power factor and comply with SANS standards.',
    features: ['Power quality analysis', 'Energy metering', 'Power factor correction', 'Harmonic analysis', 'Load profiling', 'and more'],
    img: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80'
  },
  {
    slug: 'conveyor-systems',
    icon: Truck, title: 'Conveyor Systems', category: 'Automation',
    short: 'Custom conveyor design, installation and automation.',
    desc: 'Complete conveyor system solutions from design through commissioning. Belt conveyors, slat conveyors, roller conveyors, overhead conveyors and accumulation systems. PLC controlled with speed monitoring, belt alignment detection and SCADA integration.',
    features: ['Belt and slat conveyors', 'Roller and chain systems', 'Speed and alignment monitoring', 'PLC integration', 'Accumulation and buffering', 'Variable speed control'],
    img: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=800&q=80'
  },
  {
    slug: 'factory-maintenance',
    icon: Wrench, title: 'Factory Maintenance', category: 'Support',
    short: 'Experienced industrial electricians for ongoing factory maintenance.',
    desc: 'Our team of industrial electricians are extremely experienced. We understand the industry and are always willing to go above and beyond to exceed expectations. Planned preventive maintenance programs, fault finding and breakdown repairs.',
    features: ['Planned maintenance programs', 'Fault finding and diagnosis', 'Electrical installations', 'Motor and drive maintenance', 'Panel maintenance', 'Compliance inspections'],
    img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80'
  },
  {
    slug: 'industrial-electrical-installations',
    icon: Cable, title: 'Industrial Electrical Installations', category: 'Electrical',
    short: 'Complete industrial electrical installation and commissioning.',
    desc: 'Full industrial electrical installation services including new factory wiring, equipment installations, distribution boards, cable management and earthing systems. All work complies with SANS 10142 and is accompanied by certificates of compliance.',
    features: ['Factory wiring', 'Distribution boards', 'Cable management', 'Earthing systems', 'SANS 10142 compliant', 'COC certificates'],
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80'
  },
  {
    slug: '24-7-technical-support',
    icon: Shield, title: '24/7 Technical Support', category: 'Support',
    short: 'Round the clock emergency callout service across Gauteng.',
    desc: 'Our primary goal is to constantly provide our clients with exceptional service 24-hours a day. With a team of highly trained employees who are 100% committed to service excellence, we work around the clock to ensure all electrical faults are taken care of quickly and efficiently.',
    features: ['24/7/365 availability', 'Gauteng coverage', 'After-hours: 083 375 7670', 'Remote diagnostics', 'Emergency spare parts', 'and more'],
    img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80'
  },
];

export const categories = ['All', 'Automation', 'Electrical', 'Power', 'Electronics', 'Supply', 'Support'];

export function getServiceBySlug(slug) {
  return services.find(s => s.slug === slug);
}