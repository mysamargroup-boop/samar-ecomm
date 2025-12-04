
import * as React from "react";

export function LoggedInUserIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <defs>
        <linearGradient id="green-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: 'hsl(var(--buy-now-start))', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: 'hsl(var(--buy-now-end))', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <polyline points="16 11 18 13 22 9" stroke="url(#green-gradient)" strokeWidth="2.5" fill="none"/>
    </svg>
  );
}
