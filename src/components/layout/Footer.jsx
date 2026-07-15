import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Zap, Phone, Mail, MapPin, Facebook, Youtube, Linkedin, ArrowRight } from 'lucide-react';

const services = [
  'PLC & HMI Programming', 'Industrial Automation', 'Control Panels', 'SCADA Systems',
  'Power Monitoring', 'Machine Refurbishments', 'PCB Repairs',
];
const industries = ['FMCG', 'Pharmaceutical', 'Mining', 'Manufacturing', 'Food & Beverage'];
const company = [
  { label: 'About Us', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Products', path: '/products' },
  { label: 'Projects', path: '/projects' },
  { label: 'Contact', path: '/contact' },
];

export default function Footer() {
  const location = useLocation();
  const hideCTA = location.pathname === '/catalogue';

  return (
    <footer className="relative bg-card/50 border-t border-border overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />

      {/* CTA Banner */}
      {!hideCTA && <div className="relative border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl md:text-2xl font-black text-foreground">Ready to automate your operations?</h3>
            <p className="text-sm text-muted-foreground mt-1">Contact our expert team for a free consultation.</p>
          </div>
          <div className="flex gap-3">
            <Link to="/quote">
              <button className="px-6 py-2.5 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-bold transition-all glow-blue flex items-center gap-2">
                Get a Quote <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </Link>
            <a href="tel:+27117911562">
              <button className="px-6 py-2.5 rounded-lg border border-border hover:border-primary/40 text-foreground text-sm font-semibold transition-all flex items-center gap-2">
                <Phone className="w-3.5 h-3.5" /> Call Now
              </button>
            </a>
          </div>
        </div>
      </div>}

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="lg:col-span-1">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
              <Zap className="w-4 h-4 text-primary" />
            </div>
            <div>
              <div className="text-sm font-black text-foreground tracking-wider">T.M Engineering</div>
              <div className="text-[9px] text-primary/60 tracking-widest uppercase">Since 1986</div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed mb-5">
            South Africa's leading industrial automation specialists. 39 years of proven excellence in electrical engineering, PLC systems, and factory automation.
          </p>
          <div className="space-y-2 text-xs text-muted-foreground">
            <a href="https://maps.google.com/?q=10+Susan+Street+Strijdom+Park+Randburg" target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 hover:text-foreground transition-colors">
              <MapPin className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
              10 Susan Street, Strijdom Park, Randburg, JHB
            </a>
            <a href="https://maps.google.com/?q=Plot+106+Modderfontein+Rustenburg+0300" target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 hover:text-foreground transition-colors">
              <MapPin className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
              Plot 106, Modderfontein, Rustenburg, 0300
            </a>
            <a href="tel:+27117911562" className="flex items-center gap-2 hover:text-foreground transition-colors">
              <Phone className="w-3.5 h-3.5 text-primary" /> 011 791 1562
            </a>
            <a href="mailto:sales@tmeng.co.za" className="flex items-center gap-2 hover:text-foreground transition-colors">
              <Mail className="w-3.5 h-3.5 text-primary" /> sales@tmeng.co.za
            </a>
          </div>
          <div className="flex gap-2.5 mt-5">
            {[
              { icon: Facebook, url: 'https://www.facebook.com/tmengineeringptyltd/', label: 'Facebook' },
              { icon: Youtube, url: 'https://www.youtube.com/channel/UC4-3DeJMQVVApm9GhNI4TBg', label: 'YouTube' },
              { icon: Linkedin, url: '#', label: 'LinkedIn' },
            ].map(s => (
              <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">
                <s.icon className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-xs font-bold text-foreground uppercase tracking-widest mb-4">Services</h4>
          <ul className="space-y-2">
            {services.map(s => (
              <li key={s}>
                <Link to="/services" className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 group">
                  <span className="w-1 h-1 rounded-full bg-border group-hover:bg-primary transition-colors" />{s}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Industries */}
        <div>
          <h4 className="text-xs font-bold text-foreground uppercase tracking-widest mb-4">Industries</h4>
          <ul className="space-y-2">
            {industries.map(i => (
              <li key={i}>
                <Link to="/industries" className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 group">
                  <span className="w-1 h-1 rounded-full bg-border group-hover:bg-primary transition-colors" />{i}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-xs font-bold text-foreground uppercase tracking-widest mb-4">Company</h4>
          <ul className="space-y-2 mb-6">
            {company.map(c => (
              <li key={c.path}>
                <Link to={c.path} className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 group">
                  <span className="w-1 h-1 rounded-full bg-border group-hover:bg-primary transition-colors" />{c.label}
                </Link>
              </li>
            ))}
          </ul>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} T.M Engineering (Pty) Ltd. All rights reserved.</p>
          <p className="text-xs text-muted-foreground">
            Industrial Automation · PLC Programming · MCC Panels · Johannesburg, South Africa
          </p>
        </div>
      </div>
    </footer>
  );
}