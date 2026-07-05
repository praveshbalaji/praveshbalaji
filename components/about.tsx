"use client";

import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";

export function About() {
  return (
    <Reveal>
      <section className="mx-auto max-w-[1160px] border-t border-[#17324a] px-6 py-20 md:px-16 md:py-24">
        <div className="grid grid-cols-1 items-center gap-14 md:grid-cols-[0.8fr_1.2fr]">
          <CardContainer containerClassName="py-0">
            <CardBody>
              <CardItem translateZ={50} className="w-full">
                <div className="group relative w-full max-w-[280px] overflow-hidden rounded-2xl border border-[#22405C] bg-[#101F33] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/avatar-photo.jpg`}
                    alt="Balaji Manokaran"
                    width={560}
                    height={560}
                    className="h-auto w-full object-cover"
                    priority
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A1929] via-transparent to-transparent opacity-70" />
                </div>
              </CardItem>
              <CardItem
                translateZ={70}
                translateY={-24}
                className="absolute bottom-4 left-4 rounded-md border border-[#4FD1C5]/50 bg-[#0a1929]/90 px-3 py-1.5 font-mono text-[0.68rem] uppercase tracking-wide text-[#4FD1C5]"
              >
                Chennai, IN
              </CardItem>
            </CardBody>
          </CardContainer>

          <div>
            <p className="mb-4 font-mono text-[0.78rem] uppercase text-[#4FD1C5]">
              // About
            </p>
           <p className="max-w-[70ch] text-[1.08rem] text-[#C3CFDE]">
            I&apos;m a software engineer based in Chennai with over four years of
            experience building enterprise applications across healthcare, fintech,
            workforce management, and marketplace platforms. I&apos;ve architected the
            Kyber Marketplace frontend from a blank monorepo, led the .NET MAUI rebuild
            of an employee-productivity platform used by 1,000+ daily users, and
            developed OCR-driven KYC solutions for fintech. Alongside product
            development, I build internal engineering automation tools that streamline
            repetitive workflows, automate validation and quality checks, and reduce
            delivery time. Lately, that means combining production .NET and React
            development with MCP-powered workflows, Cursor, and Codex to accelerate
            Figma-to-code implementation, Jira-driven development, and engineering
            productivity&mdash;without compromising code quality.
          </p>
          </div>
        </div>
      </section>
    </Reveal>
  );
}
