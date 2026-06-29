import { useEffect } from 'react';

function upsertMeta(name, content) {
  let el = document.head.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertMetaProp(prop, content) {
  let el = document.head.querySelector(`meta[property="${prop}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('property', prop);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export default function SEO({ title, description }) {
  useEffect(() => {
    if (title) {
      document.title = title;
      upsertMetaProp('og:title', title);
      upsertMeta('twitter:title', title);
    }
    if (description) {
      upsertMeta('description', description);
      upsertMetaProp('og:description', description);
      upsertMeta('twitter:description', description);
    }
  }, [title, description]);

  return null;
}