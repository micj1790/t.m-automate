import React, { useState } from 'react';
import { Play } from 'lucide-react';

export default function LazyVideo({ src, poster, label }) {
  const [activated, setActivated] = useState(false);

  if (activated) {
    return <video controls autoPlay className="w-full rounded-xl bg-black max-h-48" src={src} />;
  }

  return (
    <button
      onClick={() => setActivated(true)}
      className="relative w-full rounded-xl bg-black max-h-48 overflow-hidden group"
      style={{ minHeight: '12rem' }}
    >
      {poster ? (
        <img src={poster} alt={label || 'Video thumbnail'} className="w-full h-full object-cover opacity-70" />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Play className="w-5 h-5 text-white ml-0.5" fill="currentColor" />
          </div>
        </div>
      )}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform">
          <Play className="w-5 h-5 text-white ml-0.5" fill="currentColor" />
        </div>
      </div>
      <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/70 text-[10px] text-white font-semibold uppercase tracking-wider">Tap to load</span>
    </button>
  );
}