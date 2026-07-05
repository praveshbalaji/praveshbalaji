import { Reveal } from "@/components/reveal";

const ROLES = [
  {
    date: "MAR 2026 — JUL 2026",
    title: "Associate Software Developer",
    org: "Axentra Corp Limited",
    body: "Allocated to client Kerner Norland, continuing the Kyber Marketplace Phase 2 frontend engagement (Next.js 14 monorepo) through project handover. Built AI-assisted sprint estimation tooling, including a 21-column AI Project Planner workbook for calibrated effort estimation across 21 epics.",
  },
  {
    date: "APR 2025 — FEB 2026",
    title: "Software Analyst",
    org: "Agilysys Technologies India Pvt. Ltd.",
    body: "Worked across ASP.NET, MVC and API modules following established process models. Built and maintained C# background services, application trackers and validation systems. Owned bug analysis, debugging and root-cause work, plus console apps, Windows Forms tools and .NET MAUI contributions.",
  },
  {
    date: "DEC 2023 — MAR 2025",
    title: "Associate Software Developer",
    org: "Kerner Norland",
    body: "Set up the Kyber Marketplace frontend monorepo from scratch — three Next.js 14 apps (customer, vendor, admin) sharing types, an API client, UI and auth packages. Delivered TEEBO TV3's full frontend in one month using an AI-accelerated workflow, then produced 160 test cases from 32 Jira tickets. Led the .NET MAUI revamp of Workshiftly, an employee-productivity platform on AWS now serving 1,000+ active users. Built NorthLark's OCR-based KYC extraction tool.",
  },
  {
    date: "DEC 2022 — DEC 2023",
    title: "Software Engineer",
    org: "Enable Healthcare (EHI)",
    body: "Built a React portal (EhiFHIRPortal) and Node.js backend (EhiFHIRServer) for FHIR-compliant healthcare data interoperability. Developed C# console tools for claims-data conversion and a React-based payment portal, alongside MVC client-configuration tooling.",
  },
  {
    date: "APR 2022 — DEC 2022",
    title: ".NET Developer",
    org: "CMOTS Internet Technologies Pvt. Ltd.",
    body: "Independently revamped the Chola Wealth Direct ASP.NET application. Built ASP.NET/jQuery applications for financial-sector clients including IFIN, GWCIndia, Muthoot Securities and Skicapital.",
  },
  {
    date: "DEC 2021 — APR 2022",
    title: "Software Developer, Intern",
    org: "Shiash Info Solutions Pvt. Ltd.",
    body: "Developed the core logic for \"Impregnable,\" maximizing cloud revenue through dynamic pricing of multi-class virtual machines.",
  },
];

export function Experience() {
  return (
    <Reveal>
      <section id="experience" className="mx-auto max-w-[1160px] border-t border-[#17324a] px-6 py-20 md:px-16 md:py-24">
        <p className="mb-2 font-mono text-[0.78rem] uppercase text-[#4FD1C5]">
          // Log — reverse chronological
        </p>
        <h2 className="mb-10 font-display text-[clamp(1.7rem,3vw,2.2rem)] font-semibold">
          Experience
        </h2>
        <div className="border-l border-[#22405C] pl-7">
          {ROLES.map((r, i) => (
            <article key={r.org} className={`relative ${i === ROLES.length - 1 ? "" : "pb-11"}`}>
              <span className="absolute -left-[33px] top-1.5 h-[9px] w-[9px] rounded-full border-2 border-[#4FD1C5] bg-[#0A1929]" />
              <p className="mb-2 font-mono text-[0.74rem] tracking-wide text-[#FFB454]">
                {r.date}
              </p>
              <h3 className="mb-2.5 text-[1.12rem] font-semibold">
                {r.title} <span className="font-normal text-[#8CA0BC]">— {r.org}</span>
              </h3>
              <p className="max-w-[68ch] text-[0.96rem] text-[#B9C6D8]">{r.body}</p>
            </article>
          ))}
        </div>
      </section>
    </Reveal>
  );
}
