import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useMutation } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MapPin, Phone, Mail, Clock, Linkedin, Send, CheckCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const contactInfo = [
  { icon: MapPin, label: 'Location', value: 'Johannesburg, South Africa', sub: 'Serving clients nationwide' },
  { icon: Phone, label: 'Phone', value: '24/7 Support Available', sub: 'Emergency breakdown service' },
  { icon: Mail, label: 'Email', value: 'info@tmengineering.co.za', sub: 'We respond within 24 hours' },
  { icon: Clock, label: 'Business Hours', value: 'Mon-Fri: 07:00 - 17:00', sub: '24/7 Emergency call-outs' },
];

export default function Contact() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', message: '' });

  const mutation = useMutation({
    mutationFn: (data) => base44.entities.Lead.create({ ...data, source: 'website', type: 'general_enquiry', status: 'new' }),
    onSuccess: () => {
      setSubmitted(true);
      toast({ title: 'Message Sent!', description: 'We\'ll get back to you within 24 hours.' });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  return (
    <div className="pt-20">
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-widest mb-4">Contact Us</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground tracking-tight">
              Get In <span className="text-primary">Touch</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">Have a project in mind? Contact our engineering team for expert advice and a free consultation.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              {contactInfo.map((c, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                    <c.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">{c.label}</div>
                    <div className="text-sm text-foreground">{c.value}</div>
                    <div className="text-xs text-muted-foreground">{c.sub}</div>
                  </div>
                </motion.div>
              ))}

              {/* Map placeholder */}
              <div className="rounded-xl overflow-hidden border border-border h-48 bg-secondary flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <MapPin className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium">Johannesburg, South Africa</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                className="p-6 md:p-8 rounded-xl bg-card border border-border">
                {submitted ? (
                  <div className="text-center py-12">
                    <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-foreground mb-2">Thank You!</h3>
                    <p className="text-muted-foreground">Your message has been received. Our team will contact you within 24 hours.</p>
                    <Button className="mt-6" onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', company: '', message: '' }); }}>Send Another Message</Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <h3 className="text-xl font-bold text-foreground mb-2">Send Us a Message</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input id="name" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="John Smith" className="mt-1.5 bg-secondary border-border" />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input id="email" type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="john@company.co.za" className="mt-1.5 bg-secondary border-border" />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+27 XX XXX XXXX" className="mt-1.5 bg-secondary border-border" />
                      </div>
                      <div>
                        <Label htmlFor="company">Company</Label>
                        <Input id="company" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} placeholder="Company name" className="mt-1.5 bg-secondary border-border" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea id="message" required value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Tell us about your project or requirements..." rows={5} className="mt-1.5 bg-secondary border-border" />
                    </div>
                    <Button type="submit" disabled={mutation.isPending} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-12 glow-blue">
                      {mutation.isPending ? 'Sending...' : <><Send className="w-4 h-4 mr-2" /> Send Message</>}
                    </Button>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}