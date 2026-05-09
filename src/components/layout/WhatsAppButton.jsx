import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, Phone, Mail } from 'lucide-react';

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="bg-card border border-border rounded-2xl shadow-2xl shadow-black/40 p-4 w-72"
          >
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border">
              <div className="w-9 h-9 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                <span className="text-green-400 text-lg">⚡</span>
              </div>
              <div>
                <div className="text-sm font-bold text-foreground">T.M Engineering</div>
                <div className="flex items-center gap-1 text-xs text-green-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  Online – We reply instantly
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mb-4">Hi! How can we help you today? Choose how to reach us:</p>
            <div className="space-y-2">
              <a
                href="https://wa.me/27833757670?text=Hi%20T.M%20Engineering%2C%20I%20would%20like%20to%20enquire%20about%20your%20services."
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-green-500/10 border border-green-500/20 hover:bg-green-500/20 transition-all"
              >
                <MessageCircle className="w-4 h-4 text-green-400" />
                <div>
                  <div className="text-xs font-semibold text-green-300">WhatsApp Chat</div>
                  <div className="text-[10px] text-muted-foreground">083 375 7670</div>
                </div>
              </a>
              <a href="tel:+27117911562" className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 border border-primary/20 hover:bg-primary/10 transition-all">
                <Phone className="w-4 h-4 text-primary" />
                <div>
                  <div className="text-xs font-semibold text-primary">Call Us</div>
                  <div className="text-[10px] text-muted-foreground">011 791 1562</div>
                </div>
              </a>
              <a href="mailto:sales@tmeng.co.za" className="flex items-center gap-3 p-3 rounded-xl bg-secondary border border-border hover:bg-secondary/80 transition-all">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <div>
                  <div className="text-xs font-semibold text-foreground">Email Us</div>
                  <div className="text-[10px] text-muted-foreground">sales@tmeng.co.za</div>
                </div>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 shadow-lg shadow-green-500/30 flex items-center justify-center transition-colors"
      >
        {open
          ? <X className="w-5 h-5 text-white" />
          : <MessageCircle className="w-6 h-6 text-white" />
        }
      </motion.button>
    </div>
  );
}