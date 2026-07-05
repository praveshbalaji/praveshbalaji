"use client";

import { useState } from "react";

const LINKS = [
  { href: "#stack", label: "Stack" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#credentials", label: "Credentials" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-[#17324a] bg-[#0a1929]/70 px-6 py-4 backdrop-blur-md md:px-16">
      <a href="#top" className="flex items-center gap-2.5">
        <svg viewBox="0 0 60 52" className="h-8 w-auto shrink-0">
          <path
            d="M30 3 L54.9 17 L54.9 35 L30 49 L5.1 35 L5.1 17 Z"
            fill="#101F33"
            stroke="#4FD1C5"
            strokeWidth="2"
          />
          <circle cx="30" cy="10.5" r="1.8" fill="#FFB454" />
          <text
            x="30"
            y="31"
            textAnchor="middle"
            className="font-mono"
            style={{ fill: "#E7ECF3", fontWeight: 700, fontSize: 15 }}
          >
            BM
          </text>
        </svg>
        <span className="hidden font-display text-base font-semibold sm:inline">
          Balaji Manokaran
        </span>
      </a>

      <nav className="hidden items-center gap-8 font-mono text-[0.82rem] uppercase tracking-wider text-[#8CA0BC] md:flex">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} className="transition-colors hover:text-[#E7ECF3]">
            {l.label}
          </a>
        ))}
        <a
          href="#contact"
          className="rounded border border-[#22405C] px-4 py-2 text-[#E7ECF3] transition-colors hover:border-[#4FD1C5] hover:bg-[#4FD1C5]/10"
        >
          Contact
        </a>
      </nav>

      <button
        aria-label="Toggle menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex flex-col gap-[5px] p-1.5 md:hidden"
      >
        <span className="block h-[2px] w-[22px] bg-[#E7ECF3]" />
        <span className="block h-[2px] w-[22px] bg-[#E7ECF3]" />
        <span className="block h-[2px] w-[22px] bg-[#E7ECF3]" />
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full flex flex-col gap-5 border-b border-[#17324a] bg-[#0d1f33] px-6 py-6 font-mono text-sm uppercase tracking-wide text-[#8CA0BC] md:hidden">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)} className="text-[#E7ECF3]">
            Contact
          </a>
        </div>
      )}
    </header>
  );
}
