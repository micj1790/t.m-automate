import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Phone, Mail, MapPin, Clock, CheckCircle, Facebook, Youtube, Linkedin, MessageCircle } from 'lucide-react';

const contacts = [
  { icon: Phone, label: 'Phone', value: '011 791 1562', link: 'tel:+27117911562', sub: 'Mon–Fri, 7:30am–5pm' },
  { icon: Clock, label: 'After Hours', value: '083 375 7670', link: 'tel:+27833757670', sub: '24/7 Emergency Support' },
  { icon: Mail, label: 'Email', value: 'sales@tmeng.co.za', link: 'mailto:sales@tmeng.co.za', sub: 'We reply within 2 hours' },
  { icon: MapPin, label: 'Address', value: '10 Susan Street, Strijdom Park', link: 'https://maps.google.com/?q=10+Susan+Street+Strijdompark+Randburg', sub: 'Randburg, Johannesburg, SA' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', service_interest: '', message: '' });
  const [success, setSuccess] = useState(false);

  const mutation = useMutation({
    mutationFn: data => base44.entities.Lead.create({ ...data, source: 'website', status: 'new', type: 'general_enquiry' }),
    onSuccess: () => { setSuccess(true); setForm({ name: '', email: '', phone: '', company: '', service_interest: '', message: '' }); }
  });

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="py-16 md:py-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-6xl font-black text-foreground tracking-tight mb-5">Get In Touch</h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Ready to start your project? Our engineering team is available 24/7 to assist with quotes, technical enquiries and emergency breakdowns.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact info */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-foreground mb-6">Contact Details</h2>
              {contacts.map((c, i) => (
                <motion.a key={i} href={c.link} target={c.label === 'Address' ? '_blank' : undefined} rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/25 transition-all group">
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

              {/* Social */}
              <div className="pt-2">
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

              {/* Map embed placeholder */}
              <div className="rounded-xl overflow-hidden border border-border h-44 mt-4">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3582.5!2d27.97685!3d-26.08466!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e9574ff3aae611d%3A0xd62a7ab768cb0970!2s10%20Susan%20St%2C%20Strydompark%2C%20Randburg%2C%202169!5e0!3m2!1sen!2sza!4v1620000000000!5m2!1sen!2sza"
                  width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" title="T.M Engineering location"
                />
              </div>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-2">
              <div className="p-6 md:p-8 rounded-2xl bg-card border border-border gradient-border">
                {success ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-5">
                      <CheckCircle className="w-8 h-8 text-green-400" />
                    </div>
                    <h3 className="text-xl font-black text-foreground mb-2">Message Sent!</h3>
                    <p className="text-sm text-muted-foreground max-w-sm">
                      Thank you for contacting T.M Engineering. Our team will respond within 2 business hours. For urgent enquiries, call <a href="tel:+27117911562" className="text-primary">011 791 1562</a>.
                    </p>
                    <button onClick={() => setSuccess(false)} className="mt-5 text-xs text-primary hover:underline">Send another message</button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-lg font-bold text-foreground mb-6">Send Us a Message</h2>
                    <form onSubmit={e => { e.preventDefault(); mutation.mutate(form); }} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-xs">Full Name *</Label>
                          <Input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="John Smith" className="mt-1.5 bg-secondary border-border" />
                        </div>
                        <div>
                          <Label className="text-xs">Email Address *</Label>
                          <Input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="john@company.co.za" className="mt-1.5 bg-secondary border-border" />
                        </div>
                        <div>
                          <Label className="text-xs">Phone Number</Label>
                          <Input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="011 xxx xxxx" className="mt-1.5 bg-secondary border-border" />
                        </div>
                        <div>
                          <Label className="text-xs">Company</Label>
                          <Input value={form.company} onChange={e => setForm({...form, company: e.target.value})} placeholder="Your company name" className="mt-1.5 bg-secondary border-border" />
                        </div>
                      </div>
                      <div>
                        <Label className="text-xs">Service of Interest</Label>
                        <Input value={form.service_interest} onChange={e => setForm({...form, service_interest: e.target.value})} placeholder="e.g. PLC Programming, MCC Panels, Labelling Machine" className="mt-1.5 bg-secondary border-border" />
                      </div>
                      <div>
                        <Label className="text-xs">Message *</Label>
                        <Textarea required value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="Describe your project requirements..." rows={5} className="mt-1.5 bg-secondary border-border resize-none" />
                      </div>
                      <Button type="submit" disabled={mutation.isPending} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-black h-12 text-sm uppercase tracking-wide glow-blue">
                        {mutation.isPending ? 'Sending...' : 'Send Message'}
                      </Button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}