"use client";

import { Reveal } from "@/components/reveal";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";

const PROJECTS = [
  {
    tag: ".NET MAUI · AWS",
    title: "Workshiftly",
    body: "Cross-platform employee-productivity platform: screen capture, geolocation, idle detection and analytics, backed by Cognito, API Gateway, Lambda, DynamoDB and S3.",
    stat: "1,000+ active users · ~5 days/mo saved",
  },
  {
    tag: "Next.js 14 · Monorepo",
    title: "Kyber Marketplace",
    body: "Marketplace frontend built as a Next.js 14 monorepo from scratch — customer, vendor and admin apps sharing a common auth, UI and API-client layer. Multi-step vendor onboarding with country-specific validation.",
  },
  {
    tag: "React · Multi-tenant SaaS",
    title: "TEEBO TV3",
    body: "Full SaaS frontend delivered in a one-month timeline using an AI-accelerated development workflow. Followed by 160 QA test cases generated from 32 Jira tickets.",
  },
  {
    tag: "AWS · ASP.NET",
    title: "Anagram",
    body: "Cloud security platform managing WAF, CloudFront and S3, with an ASP.NET Web Forms UI and Stripe payment integration.",
  },
  {
    tag: "React · Node.js · FHIR",
    title: "EHI FHIR Portal",
    body: "React portal (EhiFHIRPortal) with a Node.js backend (EhiFHIRServer) for FHIR-compliant healthcare data interoperability.",
  },
  {
    tag: "MVC · OCR",
    title: "NorthLark Confluence",
    body: "Responsive MVC application automating user-detail extraction from government ID images via OCR, with intelligent form-fill and secure KYC validation.",
  },
];

export function Projects() {
  return (
    <Reveal>
      <section id="projects" className="mx-auto max-w-[1160px] border-t border-[#17324a] px-6 py-20 md:px-16 md:py-24">
        <p className="mb-2 font-mono text-[0.78rem] uppercase text-[#4FD1C5]">// Builds</p>
        <h2 className="mb-10 font-display text-[clamp(1.7rem,3vw,2.2rem)] font-semibold">
          Selected projects
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p) => (
            <CardContainer key={p.title} containerClassName="py-0">
              <CardBody className="h-full w-full">
                <CardItem
                  translateZ={30}
                  className="h-full w-full rounded-xl border border-[#17324a] bg-[#101F33] p-6 transition-colors hover:border-[#4FD1C5]"
                >
                  <CardItem translateZ={45} className="mb-3.5 font-mono text-[0.7rem] text-[#4FD1C5]">
                    {p.tag}
                  </CardItem>
                  <CardItem translateZ={55} as="h3" className="mb-2.5 text-[1.15rem] font-semibold">
                    {p.title}
                  </CardItem>
                  <CardItem translateZ={35} as="p" className="text-[0.92rem] text-[#8CA0BC]">
                    {p.body}
                  </CardItem>
                  {p.stat && (
                    <CardItem
                      translateZ={45}
                      as="p"
                      className="mt-3.5 font-mono text-[0.75rem] text-[#FFB454]"
                    >
                      {p.stat}
                    </CardItem>
                  )}
                </CardItem>
              </CardBody>
            </CardContainer>
          ))}
        </div>
      </section>
    </Reveal>
  );
}
