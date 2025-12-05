
'use client';

import { Gem } from 'lucide-react';
import React from 'react';
import { marqueeData } from '@/lib/placeholder-data';

export function Marquee() {
  const marqueeItems = marqueeData.text.split('|').map(item => item.trim());
  const style = {
    '--marquee-bg-color': `hsl(${marqueeData.backgroundColor})`,
    '--marquee-text-color': `hsl(${marqueeData.textColor})`,
  } as React.CSSProperties;

  return (
    <div style={style} className="bg-[--marquee-bg-color] text-[--marquee-text-color] relative flex overflow-x-hidden">
        <div className="animate-marquee whitespace-nowrap py-3">
            {marqueeItems.map((item, index) => (
                <React.Fragment key={index}>
                    <span className="mx-4 text-sm font-medium">{item}</span>
                    {index < marqueeItems.length - 1 && <Gem className="inline-block h-4 w-4 opacity-50" />}
                </React.Fragment>
            ))}
        </div>

        <div className="absolute top-0 animate-marquee2 whitespace-nowrap py-3">
            {marqueeItems.map((item, index) => (
                <React.Fragment key={index}>
                    <span className="mx-4 text-sm font-medium">{item}</span>
                    {index < marqueeItems.length - 1 && <Gem className="inline-block h-4 w-4 opacity-50" />}
                </React.Fragment>
            ))}
        </div>
    </div>
  );
}
