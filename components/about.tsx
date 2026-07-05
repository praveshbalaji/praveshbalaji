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
              I&apos;m a software engineer based in Chennai, currently between engagements
              after Axentra Corp&apos;s restructuring wound down its client-services model.
              Over the last four years I&apos;ve moved across healthcare, fintech and
              workforce-management platforms — usually landing wherever a product needs
              someone comfortable on both sides of the stack. I set up the Kyber
              Marketplace frontend monorepo from a blank repo, led the .NET MAUI rebuild of
              an employee-productivity platform now used by 1,000+ people daily, and built
              an OCR-driven KYC pipeline for a fintech client. Lately that means pairing
              production .NET/React work with Cursor and Claude to move faster without
              cutting corners — and I&apos;m looking for the next team that wants that
              combination.
            </p>
          </div>
        </div>
      </section>
    </Reveal>
  );
}
