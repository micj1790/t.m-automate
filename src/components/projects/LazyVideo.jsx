import React, { useState } from 'react';
import { Play, Download, AlertCircle } from 'lucide-react';

export default function LazyVideo({ src, poster, label }) {
  const [activated, setActivated] = useState(false);
  const [error, setError] = useState(false);

  const isMov = src?.toLowerCase().endsWith('.mov');

  if (activated) {
    if (error) {
      return (
        <div className="w-full rounded-xl bg-black max-h-48 flex flex-col items-center justify-center gap-3 p-4" style={{ minHeight: '12rem' }}>
          <AlertCircle className="w-8 h-8 text-amber-400" />
          <p className="text-xs text-muted-foreground text-center leading-relaxed">
            This video format isn't supported by your browser.
          </p>
          <a
            href={src}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors"
          >
            <Download className="w-3.5 h-3.5" /> Download Video
          </a>
        </div>
      );
    }
    return (
      <div className="space-y-2">
        <video
          controls
          autoPlay
          className="w-full rounded-xl bg-black max-h-48"
          src={src}
          onError={() => setError(true)}
        />
        {isMov && (
          <a
            href={src}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[11px] font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            <Download className="w-3 h-3" /> Can't play? Download video
          </a>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={() => setActivated(true)}
      className="relative w-full rounded-xl bg-black max-h-48 overflow-hidden group"
      style={{ minHeight: '12rem' }}
    >
      {poster ? (
        <img src={poster} alt={label || 'Video thumbnail'} className="w-full h-full object-cover opacity-70" />
      ) : null}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform">
          <Play className="w-5 h-5 text-white ml-0.5" fill="currentColor" />
        </div>
      </div>
      <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/70 text-[10px] text-white font-semibold uppercase tracking-wider">Tap to load</span>
    </button>
  );
}