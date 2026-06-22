import React, { useState, useEffect, useRef } from 'react';

const SITE_KEY = '6LdfQi0tAAAAACIKW9j6qZQGOb_bKh6p8mUDOJB9';

export default function ReCaptcha({ onChange }) {
  const containerRef = useRef(null);
  const [widgetId, setWidgetId] = useState(null);
  const callbackName = useRef(`recaptchaCb_${Date.now()}`);

  useEffect(() => {
    // Register callback so reCAPTCHA can call it when user solves the challenge
    window[callbackName.current] = (token) => {
      if (onChange) onChange(token);
    };

    const tryRender = () => {
      if (window.grecaptcha && window.grecaptcha.render && containerRef.current) {
        try {
          const id = window.grecaptcha.render(containerRef.current, {
            sitekey: SITE_KEY,
            callback: window[callbackName.current],
            'expired-callback': () => { if (onChange) onChange(''); },
            'error-callback': () => { if (onChange) onChange(''); },
          });
          setWidgetId(id);
        } catch (e) {
          // Already rendered
        }
      } else {
        setTimeout(tryRender, 300);
      }
    };

    tryRender();

    return () => {
      delete window[callbackName.current];
    };
  }, [onChange]);

  return <div ref={containerRef} className="recaptcha-container" />;
}