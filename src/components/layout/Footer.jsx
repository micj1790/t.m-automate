import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, MapPin, Phone, Mail, Linkedin, Facebook, Instagram, ArrowRight } from 'lucide-react';

const footerLinks = {
  Services: [
    { label: 'PLC & HMI Programming', path: '/services' },
    { label: 'Industrial Automation', path: '/services' },
    { label: 'MCC Panels', path: '/services' },
    { label: 'SCADA Systems', path: '/services' },
    { label: 'Generator Synchronisation', path: '/services' },
  ],
  Company: [
    { label: 'About Us', path: '/about' },
    { label: 'Projects', path: '/projects' },
    { label: 'Blog & Insights', path: '/blog' },
    { label: 'Careers', path: '/careers' },
    { label: 'Contact', path: '/contact' },
  ],
  Industries: [
    { label: 'Food & Beverage', path: '/industries' },
    { label: 'Mining', path: '/industries' },
    { label: 'Pharmaceutical', path: '/industries' },
    { label: 'Manufacturing', path: '/industries' },
    { label: 'Data Centres', path: '/industries' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <div>
                <span className="text-lg font-bold text-foreground">T.M Engineering</span>
              </div>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-sm">
              39 years of proven industrial automation excellence. Control systems, electrical engineering & industrial automation solutions across South Africa.
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                <span>Johannesburg, South Africa</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <span>24/7 Breakdown Support Available</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <span>info@tmengineering.co.za</span>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-6">
              <a href="#" className="w-9 h-9 rounded-lg bg-secondary hover:bg-primary/20 border border-border hover:border-primary/30 flex items-center justify-center transition-all">
                <Linkedin className="w-4 h-4 text-muted-foreground hover:text-primary" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-secondary hover:bg-primary/20 border border-border hover:border-primary/30 flex items-center justify-center transition-all">
                <Facebook className="w-4 h-4 text-muted-foreground hover:text-primary" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-secondary hover:bg-primary/20 border border-border hover:border-primary/30 flex items-center justify-center transition-all">
                <Instagram className="w-4 h-4 text-muted-foreground hover:text-primary" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map(link => (
                  <li key={link.label}>
                    <Link to={link.path} className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group">
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity -ml-4 group-hover:ml-0" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} T.M Engineering. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>Industrial Automation South Africa</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">PLC Programming Johannesburg</span>
          </div>
        </div>
      </div>
    </footer>
  );
}