"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A small original mascot — a glowing "system" companion for the site.
 * Its eyes track the cursor (parallax pupils) whenever the pointer moves
 * anywhere on the page. Pure SVG + JS, no external image dependency.
 */
export function MascotAvatar({ size = 120 }: { size?: number }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [pupil, setPupil] = useState({ lx: 0, ly: 0, rx: 0, ry: 0 });

  useEffect(() => {
    const maxShift = 3.4;

    const handleMove = (e: PointerEvent) => {
      if (!svgRef.current) return;
      const rect = svgRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy) || 1;
      const shiftX = (dx / dist) * maxShift;
      const shiftY = (dy / dist) * maxShift;

      setPupil({ lx: shiftX, ly: shiftY, rx: shiftX, ry: shiftY });
    };

    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  return (
    <svg
      ref={svgRef}
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className="drop-shadow-[0_0_24px_rgba(79,209,197,0.35)]"
    >
      <defs>
        <radialGradient id="mascotBody" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#2E4A66" />
          <stop offset="55%" stopColor="#16273C" />
          <stop offset="100%" stopColor="#0C1B2C" />
        </radialGradient>
        <radialGradient id="mascotGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#4FD1C5" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#4FD1C5" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="60" cy="62" r="52" fill="url(#mascotGlow)" />

      {/* body: rounded hex-ish blob, matching the site's chip motif */}
      <path
        d="M60 10
           C86 10 104 26 106 50
           C108 74 96 100 60 108
           C24 100 12 74 14 50
           C16 26 34 10 60 10 Z"
        fill="url(#mascotBody)"
        stroke="#4FD1C5"
        strokeWidth="1.6"
      />

      {/* two small antenna nubs, echoing the circuit "pins" elsewhere on the site */}
      <circle cx="42" cy="16" r="2.4" fill="#FFB454" />
      <circle cx="78" cy="16" r="2.4" fill="#4FD1C5" />

      {/* eyes */}
      <g>
        <rect x="34" y="48" width="20" height="26" rx="8" fill="#081521" stroke="#2E4A66" strokeWidth="1" />
        <rect x="66" y="48" width="20" height="26" rx="8" fill="#081521" stroke="#2E4A66" strokeWidth="1" />
        <circle
          cx={44 + pupil.lx}
          cy={61 + pupil.ly}
          r="5.5"
          fill="#4FD1C5"
          style={{ transition: "cx 0.08s linear, cy 0.08s linear" }}
        />
        <circle
          cx={76 + pupil.rx}
          cy={61 + pupil.ry}
          r="5.5"
          fill="#4FD1C5"
          style={{ transition: "cx 0.08s linear, cy 0.08s linear" }}
        />
      </g>
    </svg>
  );
}
