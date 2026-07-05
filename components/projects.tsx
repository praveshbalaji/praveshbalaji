"use client";

import { Reveal } from "@/components/reveal";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";

const PROJECTS = [
  {
    tag: ".NET MAUI / Background Service / MSIX",
    title: "Workshiftly",
    body: "Cross-platform employee productivity desktop app with automated screenshots, idle detection, location tracking, activity monitoring, secure auth, and cloud sync. Packaged the background service with MSIX for installer automation and enterprise rollout.",
    stat: "Enterprise workforce platform",
  },
  {
    tag: "Next.js 14 / shadcn/ui / Tailwind CSS",
    title: "Kyber Marketplace",
    body: "Marketplace frontend built from scratch across Customer, Vendor, and Admin portals. Created shared UI, reusable API-client patterns, responsive layouts, authentication flows, and multi-step vendor onboarding for the MVP.",
    stat: "Multi-portal marketplace frontend",
  },
  {
    tag: "React / TypeScript / SaaS",
    title: "TEEBO TV3",
    body: "Production-ready multi-tenant SaaS frontend delivered in a one-month timeline. Built authentication, OCR document ingestion, cloud integration, reusable components, and responsive screens from Figma and Jira workflows.",
    stat: "One-month SaaS delivery",
  },
  {
    tag: "AWS / ASP.NET",
    title: "Anagram",
    body: "Cloud security platform for managing WAF, CloudFront, and S3 configuration through an ASP.NET Web Forms interface, including Stripe-based subscription and payment integration.",
    stat: "Cloud security management",
  },
  {
    tag: "React / Node.js / FHIR",
    title: "EHI FHIR Portal",
    body: "Healthcare interoperability portal with a React frontend and Node.js backend for FHIR-compliant data exchange, patient-data workflows, and integration-ready API communication.",
    stat: "Healthcare data interoperability",
  },
  {
    tag: "C# Console Application",
    title: "EHI Claim Logger RCM",
    body: "C# console tool for processing deeply nested healthcare claim JSON. Implemented data flattening, claim comparison, payer and CPT change detection, and automated CSV reports for RCM auditing.",
    stat: "Automated RCM reconciliation",
  },
  {
    tag: "MVC / OCR",
    title: "NorthLark Confluence",
    body: "Responsive MVC application that extracts user details from government ID images using OCR, supports intelligent form-fill, and improves secure KYC validation workflows.",
    stat: "OCR-driven KYC automation",
  },
  {
    tag: "ASP.NET",
    title: "Muthoot Securities",
    body: "ASP.NET web application work with jQuery, JavaScript, Bootstrap, Slick.js, HTML, and CSS. Improved interface behavior, page structure, and overall frontend performance.",
    stat: "Financial services web app",
  },
  {
    tag: "ASP.NET",
    title: "Chola WealthDirect",
    body: "Independently developed an ASP.NET web application using SQL, jQuery, JavaScript, Bootstrap, Slick.js, HTML, and CSS, delivering a robust financial-sector web solution.",
    stat: "Independently delivered ASP.NET app",
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
        <div className="grid auto-rows-fr grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p) => (
            <CardContainer
              key={p.title}
              className="h-full w-full"
              containerClassName="h-full w-full items-stretch py-0"
            >
              <CardBody className="h-full w-full">
                <CardItem
                  translateZ={30}
                  className="flex h-full min-h-[292px] w-full flex-col rounded-lg border border-[#17324a] bg-[#101F33] p-6 transition-colors hover:border-[#4FD1C5]"
                >
                  <CardItem
                    translateZ={45}
                    className="mb-3 min-h-[2rem] w-full font-mono text-[0.68rem] uppercase leading-4 text-[#4FD1C5]"
                  >
                    {p.tag}
                  </CardItem>
                  <CardItem
                    translateZ={55}
                    as="h3"
                    className="mb-3 min-h-[3.1rem] w-full text-[1.08rem] font-semibold leading-[1.35]"
                  >
                    {p.title}
                  </CardItem>
                  <CardItem
                    translateZ={35}
                    as="p"
                    className="line-clamp-6 w-full text-[0.9rem] leading-6 text-[#8CA0BC]"
                  >
                    {p.body}
                  </CardItem>
                  <CardItem
                    translateZ={45}
                    as="p"
                    className="mt-auto w-full pt-5 font-mono text-[0.72rem] uppercase leading-4 text-[#FFB454]"
                  >
                    {p.stat}
                  </CardItem>
                </CardItem>
              </CardBody>
            </CardContainer>
          ))}
        </div>
      </section>
    </Reveal>
  );
}
