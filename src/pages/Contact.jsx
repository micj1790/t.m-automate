import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Facebook, Youtube, MessageCircle, Send } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useMutation } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const contacts = [
  { icon: Phone, label: 'Phone', value: '011 791 1562', link: 'tel:+27117911562', sub: 'Mon–Fri, 7:30am–5pm' },
  { icon: Mail, label: 'Email', value: 'sales@tmeng.co.za', link: 'mailto:sales@tmeng.co.za', sub: 'We reply within 2 hours' },
  { icon: MapPin, label: 'Address', value: '10 Susan Street, Strijdom Park', link: 'https://maps.google.com/?q=10+Susan+Street+Strijdompark+Randburg', sub: 'Randburg, Johannesburg, SA' },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });

  const submitMutation = useMutation({
    mutationFn: async (data) => {
      await base44.entities.Lead.create({
        ...data,
        source: 'website',
        type: 'general_enquiry',
        status: 'new'
      });
      await base44.integrations.Core.SendEmail({
        to: 'sales@tmeng.co.za',
        subject: `New Contact Enquiry from ${data.name}`,
        body: `New contact form submission:\n\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nCompany: ${data.company}\n\nMessage:\n${data.message}`
      });
    },
    onSuccess: () => {
      toast.success('Thanks! We will get back to you within 2 hours.');
      setFormData({ name: '', email: '', phone: '', company: '', message: '' });
    },
    onError: (error) => {
      toast.error('Failed to send message. Please try again.');
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields.');
      return;
    }
    submitMutation.mutate(formData);
  };

  return (
    <div className="pt-16">
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Get in Touch Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-xl bg-card border border-border mb-8"
          >
            <h2 className="text-xl font-bold text-foreground mb-2">Get in Touch</h2>
            <p className="text-sm text-muted-foreground mb-6">Fill in your details and requirements — we'll get back to you within 2 hours.</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Name *</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    className="bg-background border-border"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Email *</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    className="bg-background border-border"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Phone</label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="011 123 4567"
                    className="bg-background border-border"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Company</label>
                  <Input
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Company name"
                    className="bg-background border-border"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Requirements *</label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your project or requirements..."
                  className="bg-background border-border min-h-[120px]"
                />
              </div>

              <Button
                type="submit"
                disabled={submitMutation.isPending}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
              >
                {submitMutation.isPending ? 'Sending...' : (
                  <>
                    <Send className="w-4 h-4 mr-2" /> Send Message
                  </>
                )}
              </Button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <div className="space-y-4">
            {contacts.map((c, i) => (
              <motion.a key={i} href={c.link} target={c.label === 'Address' ? '_blank' : undefined} rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 + 0.2 }}
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