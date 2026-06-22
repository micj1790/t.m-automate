import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';

const SITE_KEY = '6LdaRy0tAAAAACR86xAfnWiqVl2WdPaIc8C6JQ9-';

const ensureScript = () => {
  if (document.querySelector('script[src*="recaptcha/api.js"]')) return;
  const s = document.createElement('script');
  s.src = 'https://www.google.com/recaptcha/api.js';
  s.async = true;
  s.defer = true;
  document.head.appendChild(s);
};

const ReCaptcha = forwardRef(({ onVerify }, ref) => {
  const containerRef = useRef(null);

  useImperativeHandle(ref, () => ({
    reset: () => {
      if (window.grecaptcha) {
        try { window.grecaptcha.reset(); } catch(e) {}
      }
    },
  }));

  useEffect(() => {
    ensureScript();
    const handler = (e) => onVerify(e.detail);
    window.addEventListener('recaptcha-verify', handler);
    return () => window.removeEventListener('recaptcha-verify', handler);
  }, [onVerify]);

  return (
    <div
      ref={containerRef}
      className="g-recaptcha"
      data-sitekey={SITE_KEY}
      data-callback="onReCaptchaVerify"
      data-expired-callback="onReCaptchaExpired"
    />
  );
});

window.onReCaptchaVerify = (token) => {
  window.dispatchEvent(new CustomEvent('recaptcha-verify', { detail: token }));
};
window.onReCaptchaExpired = () => {
  window.dispatchEvent(new CustomEvent('recaptcha-verify', { detail: '' }));
};

ReCaptcha.displayName = 'ReCaptcha';
export default ReCaptcha;