import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Phone, Mail, Menu, X, ChevronDown, ArrowRight } from 'lucide-react';

const navLinks = [
  { label: 'About', path: '/about' },
  {
    label: 'Services', path: '/services',
    sub: ['PLC & HMI Programming', 'Industrial Automation', 'Control Panels', 'SCADA Systems', 'Power Monitoring', 'Machine Refurbishments']
  },
  {
    label: 'Products', path: '/products',
    sub: ['Labelling Machines', 'Liquid Fillers', 'Pharmaceutical Equipment', 'Vacuum Pumps', 'Switchgear & VSDs', 'Electrical Wholesale']
  },
  { label: 'Industries', path: '/industries' },
  { label: 'Projects', path: '/projects' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-background/95 backdrop-blur-xl border-b border-border shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        {/* Top bar */}
        <div className={`border-b border-white/5 transition-all duration-300 ${scrolled ? 'h-0 overflow-hidden opacity-0' : 'h-9 opacity-100'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
            <div className="flex items-center gap-5 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1.5">📍 10 Susan Street, Strijdom Park, Randburg</span>
              <span className="hidden sm:flex items-center gap-1.5 border-l border-white/10 pl-5">
                <Phone className="w-3 h-3 text-primary" />
                <a href="tel:+27117911562" className="hover:text-primary transition-colors">011 791 1562</a>
              </span>
              <span className="hidden md:flex items-center gap-1.5 border-l border-white/10 pl-5">
                <Mail className="w-3 h-3 text-primary" />
                <a href="mailto:sales@tmeng.co.za" className="hover:text-primary transition-colors">sales@tmeng.co.za</a>
              </span>
            </div>

          </div>
        </div>

        {/* Main nav */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <img
                src="https://media.base44.com/images/public/69fefc1890408637f331f461/5d822c512_tmlogo.png"
                alt="T.M Engineering"
                className="h-14 w-auto object-contain"
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {navLinks.map(link => (
                <div
                  key={link.path}
                  className="relative"
                  onMouseEnter={() => link.sub && setHoveredItem(link.label)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <Link
                    to={link.path}
                    className={`flex items-center gap-1 px-3 py-2 text-[13px] font-medium rounded-lg transition-all ${
                      location.pathname === link.path || location.pathname.startsWith(link.path + '/')
                        ? 'text-primary bg-primary/5'
                        : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                    {link.sub && <ChevronDown className="w-3 h-3" />}
                  </Link>
                  {link.sub && (
                    <AnimatePresence>
                      {hoveredItem === link.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.97 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 mt-1 w-56 bg-card/98 backdrop-blur-xl border border-border rounded-xl shadow-2xl shadow-black/40 overflow-hidden"
                        >
                          {link.sub.map(s => (
                            <Link key={s} to={link.path} className="flex items-center gap-2 px-4 py-2.5 text-xs text-muted-foreground hover:text-foreground hover:bg-primary/5 transition-colors group">
                              <span className="w-1 h-1 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                              {s}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a href="tel:+27117911562" className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
                <Phone className="w-3.5 h-3.5" />
                011 791 1562
              </a>
              <Link to="/quote">
                <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs px-4 h-8 glow-blue">
                  Request Quote <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </Link>
            </div>

            {/* Mobile toggle */}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-secondary transition-all">
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-40 bg-background lg:hidden pt-16"
          >
            <div className="p-6 space-y-1 overflow-y-auto h-full">
              {navLinks.map(link => (
                <Link key={link.path} to={link.path} className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-all">
                  {link.label}
                  <ArrowRight className="w-3.5 h-3.5 opacity-40" />
                </Link>
              ))}
              <div className="pt-4 space-y-3">
                <a href="tel:+27117911562" className="flex items-center gap-2 px-4 py-3 rounded-xl bg-secondary text-sm font-medium text-foreground">
                  <Phone className="w-4 h-4 text-primary" /> 011 791 1562
                </a>
                <Link to="/quote">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold">Request a Quote</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}