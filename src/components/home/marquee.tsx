
'use client';

import { Gem } from 'lucide-react';
import React from 'react';

const marqueeItems = [
    "Build Your Winter Shield, Naturally!",
    "Claim 15% OFF with WIN15",
    "18% OFF only for Members",
    "Perks await! Membership now LIVE",
]

export function Marquee() {
  return (
    <div className="bg-primary text-primary-foreground relative flex overflow-x-hidden">
        <div className="animate-marquee whitespace-nowrap py-3">
            {marqueeItems.map((item, index) => (
                <React.Fragment key={index}>
                    <span className="mx-4 text-sm font-medium">{item}</span>
                    {index < marqueeItems.length - 1 && <Gem className="inline-block h-4 w-4 text-white/50" />}
                </React.Fragment>
            ))}
        </div>

        <div className="absolute top-0 animate-marquee2 whitespace-nowrap py-3">
            {marqueeItems.map((item, index) => (
                <React.Fragment key={index}>
                    <span className="mx-4 text-sm font-medium">{item}</span>
                    {index < marqueeItems.length - 1 && <Gem className="inline-block h-4 w-4 text-white/50" />}
                </React.Fragment>
            ))}
        </div>
    </div>
  );
}
