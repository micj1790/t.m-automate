import React, { useState, useEffect, useRef } from 'react';
import { base44 } from '@/api/base44Client';

let scriptPromise = null;

function loadRecaptchaScript() {
  if (window.grecaptcha) return Promise.resolve(window.grecaptcha);
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise((resolve) => {
    window.__recaptchaOnLoad = () => resolve(window.grecaptcha);
    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js?render=explicit&onload=__recaptchaOnLoad';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  });
  return scriptPromise;
}

export default function ReCaptcha({ onVerify, theme = 'dark' }) {
  const [siteKey, setSiteKey] = useState(null);
  const containerRef = useRef(null);
  const widgetIdRef = useRef(null);
  const onVerifyRef = useRef(onVerify);
  onVerifyRef.current = onVerify;

  useEffect(() => {
    base44.functions.invoke('recaptcha', {})
      .then(res => setSiteKey(res.data?.site_key))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!siteKey || !containerRef.current) return;
    let cancelled = false;
    loadRecaptchaScript().then((grecaptcha) => {
      if (cancelled || !containerRef.current || widgetIdRef.current !== null) return;
      widgetIdRef.current = grecaptcha.render(containerRef.current, {
        sitekey: siteKey,
        theme,
        callback: (token) => onVerifyRef.current(token),
        'expired-callback': () => onVerifyRef.current(null),
        'error-callback': () => onVerifyRef.current(null),
      });
    });
    return () => { cancelled = true; };
  }, [siteKey, theme]);

  if (!siteKey) return <div className="h-[78px] rounded-md bg-muted/30 animate-pulse" />;
  return <div ref={containerRef} />;
}