import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useMutation } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle, FileText, Shield, Clock } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const serviceOptions = [
  'PLC & HMI Programming', 'Industrial Automation', 'MCC Panels', 'Electrical Control Panels',
  'Generator Synchronisation', 'SCADA Systems', 'Power Monitoring', 'LV Distribution',
  'Industrial Installations', 'Conveyor Systems', 'Machine Refurbishments', 'Factory Upgrades',
  'VSD/VFD Integration', '24/7 Breakdown Support', 'Other',
];

const industryOptions = [
  'Food & Beverage', 'Mining', 'Pharmaceutical', 'Manufacturing', 'Data Centres', 'Industrial Processing', 'Other',
];

export default function Quote() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', service_interest: '', industry: '', message: '' });

  const mutation = useMutation({
    mutationFn: (data) => base44.entities.Lead.create({ ...data, source: 'website', type: 'quote_request', status: 'new' }),
    onSuccess: () => {
      setSubmitted(true);
      toast({ title: 'Quote Request Sent!', description: 'Our team will prepare your quote within 48 hours.' });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  return (
    <div className="pt-20">
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold uppercase tracking-widest mb-4">Free Quote</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground tracking-tight">
              Request a <span className="text-primary">Quote</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">Fill in the form below and our engineering team will prepare a detailed quotation for your project.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-4 mb-10">
            {[
              { icon: FileText, label: 'Detailed Quote', sub: 'Within 48 hours' },
              { icon: Shield, label: 'No Obligation', sub: 'Free consultation' },
              { icon: Clock, label: 'Fast Response', sub: 'Priority handling' },
            ].map((b, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="text-center p-4 rounded-xl bg-card border border-border">
                <b.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                <div className="text-sm font-semibold text-foreground">{b.label}</div>
                <div className="text-xs text-muted-foreground">{b.sub}</div>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="p-6 md:p-8 rounded-xl bg-card border border-border">
            {submitted ? (
              <div className="text-center py-12">
                <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-foreground mb-2">Quote Request Received!</h3>
                <p className="text-muted-foreground">Our engineering team will review your requirements and send you a detailed quotation within 48 hours.</p>
                <Button className="mt-6" onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', company: '', service_interest: '', industry: '', message: '' }); }}>Submit Another Request</Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-xl font-bold text-foreground mb-1">Your Details</h3>
                <p className="text-sm text-muted-foreground mb-4">All fields marked with * are required.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label>Full Name *</Label>
                    <Input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="John Smith" className="mt-1.5 bg-secondary border-border" />
                  </div>
                  <div>
                    <Label>Email *</Label>
                    <Input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="john@company.co.za" className="mt-1.5 bg-secondary border-border" />
                  </div>
                  <div>
                    <Label>Phone *</Label>
                    <Input required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+27 XX XXX XXXX" className="mt-1.5 bg-secondary border-border" />
                  </div>
                  <div>
                    <Label>Company</Label>
                    <Input value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} placeholder="Company name" className="mt-1.5 bg-secondary border-border" />
                  </div>
                  <div>
                    <Label>Service Required *</Label>
                    <Select required value={form.service_interest} onValueChange={v => setForm({ ...form, service_interest: v })}>
                      <SelectTrigger className="mt-1.5 bg-secondary border-border"><SelectValue placeholder="Select a service" /></SelectTrigger>
                      <SelectContent>
                        {serviceOptions.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Industry</Label>
                    <Select value={form.industry} onValueChange={v => setForm({ ...form, industry: v })}>
                      <SelectTrigger className="mt-1.5 bg-secondary border-border"><SelectValue placeholder="Select your industry" /></SelectTrigger>
                      <SelectContent>
                        {industryOptions.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label>Project Description *</Label>
                  <Textarea required value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Describe your project requirements, scope, and any specific needs..." rows={5} className="mt-1.5 bg-secondary border-border" />
                </div>
                <Button type="submit" disabled={mutation.isPending} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-12 glow-blue">
                  {mutation.isPending ? 'Submitting...' : 'Submit Quote Request'}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}