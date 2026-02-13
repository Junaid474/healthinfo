'use client';

import React, { useEffect } from 'react';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    adsbygoogle: any[];
  }
}

type AdSensePlaceholderProps = {
  slot: string;
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  responsive?: boolean;
  className?: string;
  label?: string;
  clientId?: string;
};

const AdSensePlaceholder: React.FC<AdSensePlaceholderProps> = ({
  slot,
  format = 'auto',
  responsive = true,
  className = '',
  label = 'Advertisement',
  clientId = 'ca-pub-0000000000000000', // Placeholder
}) => {
  const isDev = process.env.NODE_ENV === 'development';

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && !isDev) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error('AdSense error', err);
    }
  }, [isDev]);

  if (isDev) {
    return (
      <div
        className={`bg-gray-100 border border-dashed border-gray-400 flex flex-col items-center justify-center text-gray-500 p-4 my-6 w-full ${className}`}
        style={{ minHeight: '150px' }}
      >
        <span className="font-bold text-sm uppercase tracking-wider">{label}</span>
        <span className="text-xs mt-1">Slot ID: {slot}</span>
        <span className="text-xs">Format: {format}</span>
      </div>
    );
  }

  return (
    <div className={`ad-container my-6 overflow-hidden ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_ID || clientId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
};

export default AdSensePlaceholder;
