import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';

const SITE_KEY = '6LdaRy0tAAAAACR86xAfnWiqVI2WdPalc8C6JQ9-';

const ReCaptcha = forwardRef(({ onVerify }, ref) => {
  const containerRef = useRef(null);
  const widgetIdRef = useRef(null);
  const callbackRef = useRef(onVerify);
  callbackRef.current = onVerify;

  useImperativeHandle(ref, () => ({
    reset: () => {
      if (widgetIdRef.current !== null && window.grecaptcha) {
        window.grecaptcha.reset(widgetIdRef.current);
      }
    },
  }));

  useEffect(() => {
    let interval;

    const renderWidget = () => {
      if (window.grecaptcha && window.grecaptcha.render && containerRef.current && widgetIdRef.current === null) {
        widgetIdRef.current = window.grecaptcha.render(containerRef.current, {
          sitekey: SITE_KEY,
          callback: (token) => callbackRef.current(token),
          'expired-callback': () => callbackRef.current(''),
        });
        return true;
      }
      return false;
    };

    if (!renderWidget()) {
      interval = setInterval(() => {
        if (renderWidget()) clearInterval(interval);
      }, 300);
    }

    return () => { if (interval) clearInterval(interval); };
  }, []);

  return <div ref={containerRef} />;
});

ReCaptcha.displayName = 'ReCaptcha';
export default ReCaptcha;