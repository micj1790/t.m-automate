import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';

const SITE_KEY = '6LdaRy0tAAAAACR86xAfnWiqVl2WdPaIc8C6JQ9-';

let scriptLoaded = false;
const ensureScript = () => {
  if (scriptLoaded || document.querySelector('script[src*="recaptcha/api.js"]')) {
    scriptLoaded = true;
    return;
  }
  const s = document.createElement('script');
  s.src = 'https://www.google.com/recaptcha/api.js';
  s.async = true;
  s.defer = true;
  document.head.appendChild(s);
  scriptLoaded = true;
};

const ReCaptcha = forwardRef(({ onVerify }, ref) => {
  const containerRef = useRef(null);
  const callbackRef = useRef(onVerify);
  callbackRef.current = onVerify;
  const widgetIdRef = useRef(null);

  useImperativeHandle(ref, () => ({
    reset: () => {
      if (window.grecaptcha && widgetIdRef.current !== null) {
        try { window.grecaptcha.reset(widgetIdRef.current); } catch(e) {}
      }
    },
  }));

  useEffect(() => {
    window.__recaptchaVerify = (token) => callbackRef.current(token);
    window.__recaptchaExpired = () => callbackRef.current('');

    if (containerRef.current) {
      containerRef.current.innerHTML = '';
      const div = document.createElement('div');
      div.className = 'g-recaptcha';
      div.setAttribute('data-sitekey', SITE_KEY);
      div.setAttribute('data-callback', '__recaptchaVerify');
      div.setAttribute('data-expired-callback', '__recaptchaExpired');
      containerRef.current.appendChild(div);
    }

    ensureScript();

    let interval = setInterval(() => {
      if (window.grecaptcha && window.grecaptcha.render && containerRef.current) {
        const widget = containerRef.current.querySelector('.g-recaptcha');
        if (widget && !widget.dataset.rendered) {
          try {
            widgetIdRef.current = window.grecaptcha.render(widget, {
              sitekey: SITE_KEY,
              callback: (token) => callbackRef.current(token),
              'expired-callback': () => callbackRef.current(''),
            });
            widget.dataset.rendered = 'true';
            clearInterval(interval);
          } catch(e) {
            // Already auto-rendered by the script — try to use it
            widget.dataset.rendered = 'true';
            clearInterval(interval);
          }
        }
      }
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return <div ref={containerRef} />;
});

ReCaptcha.displayName = 'ReCaptcha';
export default ReCaptcha;