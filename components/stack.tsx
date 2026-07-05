import { Reveal } from "@/components/reveal";

const GROUPS = [
  {
    title: "LANGUAGES & FRAMEWORKS",
    items: ["C#", ".NET / .NET Core", ".NET MAUI", "ASP.NET / MVC", "TypeScript", "Java"],
  },
  {
    title: "FRONTEND",
    items: ["React.js", "Next.js 14", "Angular.js", "XAML", "Zustand", "shadcn/ui", "Bootstrap"],
  },
  {
    title: "BACKEND & APIS",
    items: ["REST APIs", "Node.js", "Windows Services", "JWT", "OCR pipelines"],
  },
  {
    title: "CLOUD & DEVOPS",
    items: [
      "AWS Cognito", "API Gateway", "Lambda", "DynamoDB", "S3", "CloudFront",
      "WAF & Shield", "EC2", "Azure", "Git / CI-CD",
    ],
  },
  { title: "DATA", items: ["SQL Server", "MySQL", "HeidiSQL", "DBeaver"] },
  {
    title: "WORKFLOW",
    items: ["Cursor", "Claude", "Visual Studio", "Postman", "Jira", "Figma", "MVVM"],
  },
];

export function Stack() {
  return (
    <Reveal>
      <section id="stack" className="mx-auto max-w-[1160px] border-t border-[#17324a] px-6 py-20 md:px-16 md:py-24">
        <p className="mb-2 font-mono text-[0.78rem] uppercase text-[#4FD1C5]">
          // Stack — what I build with
        </p>
        <h2 className="mb-10 font-display text-[clamp(1.7rem,3vw,2.2rem)] font-semibold">
          Core skills
        </h2>
        <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 lg:grid-cols-3">
          {GROUPS.map((g) => (
            <div key={g.title}>
              <h3 className="mb-4 font-mono text-[0.74rem] tracking-wide text-[#5D7592]">
                {g.title}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <li
                    key={item}
                    className="rounded border border-[#22405C] bg-[#101F33] px-3 py-1.5 font-mono text-[0.8rem] transition-all hover:-translate-y-0.5 hover:border-[#4FD1C5]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </Reveal>
  );
}
