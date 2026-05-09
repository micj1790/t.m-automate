import React from 'react';

const brands = [
  { name: 'Emerson', url: 'https://media.base44.com/images/public/69fefc1890408637f331f461/5c42351b1_emerson.png' },
  { name: 'Control Techniques', url: 'https://media.base44.com/images/public/69fefc1890408637f331f461/5cebb5383_contorltehcqies.png' },
  { name: 'Nidec', url: 'https://media.base44.com/images/public/69fefc1890408637f331f461/2c4754754_nidec.png' },
  { name: 'Danfoss', url: 'https://media.base44.com/images/public/69fefc1890408637f331f461/dfc403b25_danfoss.png' },
  { name: 'Allen-Bradley', url: 'https://media.base44.com/images/public/69fefc1890408637f331f461/cd9d0cecd_allenbradley.png' },
  { name: 'Omron', url: 'https://media.base44.com/images/public/69fefc1890408637f331f461/da373e8a9_omron.png' },
  { name: 'Festo', url: 'https://media.base44.com/images/public/69fefc1890408637f331f461/1b587b4e3_festo.png' },
  { name: 'Klockner Moeller', url: 'https://media.base44.com/images/public/69fefc1890408637f331f461/2467d2bc5_koclermoeelr.png' },
  { name: 'Yaskawa', url: 'https://media.base44.com/images/public/69fefc1890408637f331f461/6f61793b0_yaskawaw.png' },
  { name: 'ABB', url: 'https://media.base44.com/images/public/69fefc1890408637f331f461/dda6c4e67_abb.png' },
  { name: 'Turck Banner', url: 'https://media.base44.com/images/public/69fefc1890408637f331f461/385a894f5_banner.png' },
  { name: 'Delta', url: 'https://media.base44.com/images/public/69fefc1890408637f331f461/89ec5a7fc_delta.jpg' },
  { name: 'Siemens', url: 'https://media.base44.com/images/public/69fefc1890408637f331f461/96a7e6fdf_siemens.png' },
];

// Duplicate for seamless loop
const allBrands = [...brands, ...brands];

export default function BrandsBanner() {
  return (
    <section className="py-12 border-y border-border bg-card/40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-6 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
          Trusted Partners & Brands We Work With
        </p>
      </div>

      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, hsl(220 20% 7%), transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, hsl(220 20% 7%), transparent)' }} />

        <div
          className="flex items-center gap-12"
          style={{
            width: 'max-content',
            animation: 'ticker 35s linear infinite',
          }}
        >
          {allBrands.map((brand, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex items-center justify-center bg-white rounded-xl px-6 py-3"
              style={{ width: 160, height: 72 }}
            >
              <img
                src={brand.url}
                alt={brand.name}
                className="max-w-full max-h-full object-contain"
                style={{ width: 120, height: 48, objectFit: 'contain' }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}