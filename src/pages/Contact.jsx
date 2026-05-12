import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Facebook, Youtube, MessageCircle } from 'lucide-react';

const contacts = [
  { icon: Phone, label: 'Phone', value: '011 791 1562', link: 'tel:+27117911562', sub: 'Mon–Fri, 7:30am–5pm' },
  { icon: Clock, label: 'After Hours', value: '083 375 7670', link: 'tel:+27833757670', sub: '24/7 Emergency Support' },
  { icon: Mail, label: 'Email', value: 'sales@tmeng.co.za', link: 'mailto:sales@tmeng.co.za', sub: 'We reply within 2 hours' },
  { icon: MapPin, label: 'Address', value: '10 Susan Street, Strijdom Park', link: 'https://maps.google.com/?q=10+Susan+Street+Strijdompark+Randburg', sub: 'Randburg, Johannesburg, SA' },
];

export default function Contact() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="py-16 md:py-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-6xl font-black text-foreground tracking-tight mb-5">Contact Us</h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Our engineering team is available 24/7 to assist with quotes, technical enquiries and emergency breakdowns.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {contacts.map((c, i) => (
              <motion.a key={i} href={c.link} target={c.label === 'Address' ? '_blank' : undefined} rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 p-5 rounded-xl bg-card border border-border hover:border-primary/25 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-primary/8 border border-primary/15 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <c.icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">{c.label}</div>
                  <div className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{c.value}</div>
                  <div className="text-xs text-muted-foreground">{c.sub}</div>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Social */}
          <div className="pt-8">
            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-3">Follow Us</p>
            <div className="flex gap-3">
              {[
                { icon: Facebook, url: 'https://www.facebook.com/tmengineeringptyltd/', color: 'text-blue-400', bg: 'bg-blue-400/8 border-blue-400/15' },
                { icon: Youtube, url: 'https://www.youtube.com/channel/UC4-3DeJMQVVApm9GhNI4TBg', color: 'text-red-400', bg: 'bg-red-400/8 border-red-400/15' },
                { icon: MessageCircle, url: 'https://wa.me/27833757670', color: 'text-green-400', bg: 'bg-green-400/8 border-green-400/15' },
              ].map((s, i) => (
                <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-xl ${s.bg} border flex items-center justify-center ${s.color} hover:scale-110 transition-all`}>
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Map */}
          <div className="rounded-xl overflow-hidden border border-border h-64 mt-8">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3582.5!2d27.97685!3d-26.08466!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e9574ff3aae611d%3A0xd62a7ab768cb0970!2s10%20Susan%20St%2C%20Strydompark%2C%20Randburg%2C%202169!5e0!3m2!1sen!2sza!4v1620000000000!5m2!1sen!2sza"
              width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" title="T.M Engineering location"
            />
          </div>
        </div>
      </section>
    </div>
  );
}