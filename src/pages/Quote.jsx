import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle, Award, Clock, Shield, Zap } from 'lucide-react';

const serviceOptions = [
  'PLC & HMI Programming', 'Industrial Automation', 'Electrical Control Panels', 'MCC Panels',
  'PCB Repairs', 'Electrical Wholesale', 'Switchgear', 'VSD & Drive Systems',
  'Generator Control & Synchronisation', 'Power Monitoring', 'Labelling Machines',
  'Liquid Fillers', 'Pharmaceutical Equipment', 'Conveyor Systems', 'Industrial Vacuum Pumps',
  'Factory Maintenance', 'Industrial Electrical Installations', 'Machine Refurbishments', '24/7 Technical Support',
];
const industryOptions = ['FMCG', 'Food & Beverage', 'Pharmaceutical', 'Mining', 'Manufacturing', 'Data Centres', 'Industrial Processing', 'Cosmetics', 'Other'];

export default function Quote() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', service_interest: '', industry: '', message: '' });
  const [success, setSuccess] = useState(false);

  const mutation = useMutation({
    mutationFn: async (data) => {
      await base44.entities.Lead.create({ ...data, source: 'website', status: 'new', type: 'quote_request' });
      await base44.functions.invoke('sendEnquiryEmail', {
        subject: `New Quote Request from ${data.name}`,
        body: `New quote request received:\n\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nCompany: ${data.company || 'N/A'}\nService: ${data.service_interest || 'N/A'}\nIndustry: ${data.industry || 'N/A'}\n\nProject Details:\n${data.message}`,
        replyTo: data.email
      });
    },
    onSuccess: () => setSuccess(true),
  });

  return (
    <div className="pt-16">
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&q=80" alt="Quote" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/85 to-background" />
          <div className="absolute inset-0 grid-pattern opacity-40" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/8 border border-primary/15 text-primary text-[11px] font-bold uppercase tracking-widest mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> Free Consultation
              </span>
              <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight leading-tight mb-5">
                Request a<br /><span className="text-primary text-glow-blue">Free Quote</span>
              </h1>
              <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                Tell us about your project and our engineering team will prepare a detailed, competitive quotation.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Award, label: '39 Years Experience', color: 'text-primary' },
                  { icon: Clock, label: 'Fast Response Time', color: 'text-accent' },
                  { icon: Shield, label: 'Quality Guaranteed', color: 'text-green-400' },
                  { icon: Zap, label: '24/7 Support', color: 'text-yellow-400' },
                ].map((b, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-card/60 border border-border">
                    <b.icon className={`w-4 h-4 ${b.color}`} />
                    <span className="text-xs font-semibold text-foreground">{b.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Form */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}>
              <div className="p-6 md:p-8 rounded-2xl bg-card/40 backdrop-blur-xl border border-border gradient-border">
                {success ? (
                  <div className="flex flex-col items-center justify-center py-10 text-center">
                    <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-5">
                      <CheckCircle className="w-8 h-8 text-green-400" />
                    </div>
                    <h3 className="text-xl font-black text-foreground mb-2">Quote Request Received!</h3>
                    <p className="text-sm text-muted-foreground max-w-sm mb-2">
                      Thank you! Our team will prepare your quotation and be in touch shortly.
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Urgent? Call <a href="tel:+27117911562" className="text-primary">011 791 1562</a>
                    </p>
                  </div>
                ) : (
                  <form onSubmit={e => { e.preventDefault(); mutation.mutate(form); }} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-xs">Full Name *</Label>
                        <Input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Your name" className="mt-1.5 bg-card/50 border-border h-10" />
                      </div>
                      <div>
                        <Label className="text-xs">Email *</Label>
                        <Input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="you@company.co.za" className="mt-1.5 bg-card/50 border-border h-10" />
                      </div>
                      <div>
                        <Label className="text-xs">Phone *</Label>
                        <Input required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="011 xxx xxxx" className="mt-1.5 bg-card/50 border-border h-10" />
                      </div>
                      <div>
                        <Label className="text-xs">Company</Label>
                        <Input value={form.company} onChange={e => setForm({...form, company: e.target.value})} placeholder="Company name" className="mt-1.5 bg-card/50 border-border h-10" />
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs">Service Required *</Label>
                      <Select value={form.service_interest} onValueChange={v => setForm({...form, service_interest: v})}>
                        <SelectTrigger className="mt-1.5 bg-card/50 border-border h-10"><SelectValue placeholder="Select a service" /></SelectTrigger>
                        <SelectContent>{serviceOptions.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-xs">Industry</Label>
                      <Select value={form.industry} onValueChange={v => setForm({...form, industry: v})}>
                        <SelectTrigger className="mt-1.5 bg-card/50 border-border h-10"><SelectValue placeholder="Select your industry" /></SelectTrigger>
                        <SelectContent>{industryOptions.map(i => <SelectItem key={i} value={i}>{i}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-xs">Project Details *</Label>
                      <Textarea required value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="Describe your project, requirements, timeline..." rows={4} className="mt-1.5 bg-card/50 border-border resize-none" />
                    </div>
                    <Button type="submit" disabled={mutation.isPending} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-black h-12 uppercase tracking-wide glow-blue">
                      {mutation.isPending ? 'Submitting...' : 'Request Free Quote'}
                    </Button>
                    <p className="text-center text-xs text-muted-foreground">No commitment required. Free consultation.</p>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}