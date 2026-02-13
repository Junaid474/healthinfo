'use client';

import { useState, useEffect } from 'react';

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setTimeout(() => setShow(true), 0);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50 flex flex-col sm:flex-row justify-between items-center shadow-lg border-t border-gray-700">
      <div className="text-sm mb-4 sm:mb-0 mr-4 max-w-2xl">
        <p className="font-bold mb-1">We value your privacy</p>
        <p>
          We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking &quot;Accept&quot;, you consent to our use of cookies.
        </p>
      </div>
      <div className="flex space-x-4">
        <button
          onClick={() => setShow(false)}
          className="text-gray-300 hover:text-white px-4 py-2 text-sm"
        >
          Decline
        </button>
        <button
          onClick={accept}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition-colors font-medium text-sm"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
