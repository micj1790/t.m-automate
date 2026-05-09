import React from 'react';

const clients = [
  { name: 'SAB', url: 'https://media.base44.com/images/public/69fefc1890408637f331f461/39f819618_sab.png' },
  { name: 'Sibanye Stillwater', url: 'https://media.base44.com/images/public/69fefc1890408637f331f461/c453a3269_sibanye.jpg' },
  { name: 'Aspen Pharmacare', url: 'https://media.base44.com/images/public/69fefc1890408637f331f461/91b5b75d3_aspen.png' },
  { name: 'PepsiCo', url: 'https://media.base44.com/images/public/69fefc1890408637f331f461/3374046a8_pepsico.png' },
  { name: 'Adcock Ingram', url: 'https://media.base44.com/images/public/69fefc1890408637f331f461/32a584e06_adcock.png' },
  { name: 'SASKO', url: 'https://media.base44.com/images/public/69fefc1890408637f331f461/bb85a25bf_sasko.jpg' },
  { name: 'Tiger Brands', url: 'https://media.base44.com/images/public/69fefc1890408637f331f461/b93cf69cf_tigerbrands.png' },
  { name: 'Coca-Cola', url: 'https://media.base44.com/images/public/69fefc1890408637f331f461/bfa7ea67a_cocacola.png' },
];

const ITEM_WIDTH = 172;
const TOTAL_WIDTH = clients.length * ITEM_WIDTH;

export default function ClientsBanner() {
  return (
    <section className="py-12 border-y border-border bg-card/40 overflow-hidden">
      <style>{`
        @keyframes scroll-clients {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-${TOTAL_WIDTH}px); }
        }
        .clients-track {
          animation: scroll-clients 28s linear infinite;
        }
        .clients-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 mb-6 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
          Trusted By Industry Leaders
        </p>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, hsl(220 20% 7%), transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, hsl(220 20% 7%), transparent)' }} />

        <div className="clients-track flex items-center" style={{ width: 'max-content', gap: '12px' }}>
          {[...clients, ...clients, ...clients].map((client, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex items-center justify-center bg-white rounded-xl px-5 py-3"
              style={{ width: 160, height: 72 }}
            >
              <img
                src={client.url}
                alt={client.name}
                style={{ width: 120, height: 48, objectFit: 'contain' }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}