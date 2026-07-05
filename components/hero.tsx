"use client";

import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { MascotAvatar } from "@/components/mascot-avatar";
import { MascotGame } from "@/components/mascot-game";

export function Hero() {
  return (
    <section
      id="top"
      className="mx-auto grid max-w-[1160px] min-h-[82vh] grid-cols-1 items-center gap-10 px-6 pb-16 pt-16 md:grid-cols-[1.05fr_0.95fr] md:px-16 md:pt-24"
    >
      <div>
        <p className="mb-4 font-mono text-[0.78rem] uppercase text-[#4FD1C5]">
          Schematic — Software Engineer — Chennai, IN
        </p>
        <h1 className="max-w-[12ch] font-display text-[clamp(2.4rem,4.6vw,3.6rem)] font-semibold leading-[1.08] tracking-tight">
          I turn specifications into{" "}
          <span className="text-[#FFB454]">shipped systems</span>.
        </h1>
        <p className="mt-6 max-w-[46ch] text-[1.02rem] text-[#8CA0BC]">
          Balaji Manokaran — full-stack engineer working across .NET, React, Next.js and
          AWS. Four-plus years wiring backend services to production interfaces, currently
          compressing delivery timelines with AI-accelerated workflows built on Cursor and
          Claude.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="#contact"
            className="rounded border border-[#4FD1C5] bg-[#4FD1C5] px-6 py-3 font-mono text-[0.85rem] text-[#061018] transition-transform hover:-translate-y-0.5 hover:bg-[#6adfd4]"
          >
            Get in touch
          </a>
          <a
            href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/Balaji_Manokaran_Resume.pdf`}
            download
            className="rounded border border-[#22405C] px-6 py-3 font-mono text-[0.85rem] transition-colors hover:border-[#FFB454] hover:text-[#FFB454]"
          >
            Download résumé ↓
          </a>
        </div>
        <div className="mt-12 flex flex-wrap gap-10 font-mono">
          <div className="flex flex-col gap-1">
            <span className="text-2xl font-semibold">4+</span>
            <span className="text-[0.72rem] uppercase tracking-wide text-[#5D7592]">
              years shipping
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-2xl font-semibold">1,000+</span>
            <span className="text-[0.72rem] uppercase tracking-wide text-[#5D7592]">
              users on Workshiftly
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-2xl font-semibold">6</span>
            <span className="text-[0.72rem] uppercase tracking-wide text-[#5D7592]">
              companies, one stack
            </span>
          </div>
        </div>
      </div>

      {/* Signature diagram: circuit wires radiating to a 3D-tiltable mascot hub */}
      <div className="relative flex items-center justify-center">
        <svg viewBox="0 0 560 560" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <g stroke="#3a5c7c" strokeWidth="1.5" fill="none" opacity="0.6">
            <path strokeDasharray="4 5" d="M280 280 L280 90" />
            <path strokeDasharray="4 5" d="M280 280 L458 165" />
            <path strokeDasharray="4 5" d="M280 280 L458 395" />
            <path strokeDasharray="4 5" d="M280 280 L280 470" />
            <path strokeDasharray="4 5" d="M280 280 L102 395" />
            <path strokeDasharray="4 5" d="M280 280 L102 165" />
          </g>
          {[
            { x: 280, y: 90, label: ".NET" },
            { x: 458, y: 165, label: "React" },
            { x: 458, y: 395, label: "AWS" },
            { x: 280, y: 470, label: "Next.js" },
            { x: 102, y: 395, label: "MAUI" },
            { x: 102, y: 165, label: "AI-Dev" },
          ].map((n) => (
            <g key={n.label}>
              <circle cx={n.x} cy={n.y} r="34" fill="#101F33" stroke="#22405C" strokeWidth="1.5" />
              <text
                x={n.x}
                y={n.y + 5}
                textAnchor="middle"
                className="font-mono"
                style={{ fill: "#8CA0BC", fontSize: 13 }}
              >
                {n.label}
              </text>
            </g>
          ))}
        </svg>

        <div className="relative z-10 flex flex-col items-center">
          {/* Mascot hub, lifted above the diagram with real 3D tilt */}
          <CardContainer containerClassName="py-0">
            <CardBody>
              <CardItem translateZ={40}>
                <div className="flex h-[124px] w-[124px] items-center justify-center rounded-2xl border border-[#4FD1C5]/70 bg-[#14273D] shadow-[0_0_30px_rgba(79,209,197,0.25)]">
                  <MascotAvatar size={90} />
                </div>
              </CardItem>
            </CardBody>
          </CardContainer>
          <MascotGame />
        </div>
      </div>
    </section>
  );
}
