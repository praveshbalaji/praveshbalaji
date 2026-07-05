import { Reveal } from "@/components/reveal";

const LINKS = [
  { label: "EMAIL", value: "praveshbalaji144@gmail.com", href: "mailto:praveshbalaji144@gmail.com" },
  { label: "PHONE", value: "+91 63792 98916", href: "tel:+916379298916" },
  { label: "LINKEDIN", value: "/in/praveshbalaji ↗", href: "https://www.linkedin.com/in/praveshbalaji" },
  { label: "GITHUB", value: "/praveshbalaji ↗", href: "https://github.com/praveshbalaji" },
];

export function Contact() {
  return (
    <Reveal>
      <section id="contact" className="mx-auto max-w-[1160px] border-t border-[#17324a] px-6 py-20 md:px-16 md:py-24">
        <div className="max-w-[640px]">
          <p className="mb-2 font-mono text-[0.78rem] uppercase text-[#4FD1C5]">// Open to work</p>
          <h2 className="mb-4 font-display text-[clamp(1.9rem,4vw,2.6rem)] font-semibold">
            Let&apos;s build something.
          </h2>
          <p className="max-w-[50ch] text-[#8CA0BC]">
            Open to full-stack, .NET/React, and AI-accelerated development roles — remote,
            Chennai, or Gulf-based.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel={l.href.startsWith("http") ? "noopener" : undefined}
                className="flex flex-col gap-1.5 rounded-md border border-[#22405C] px-5 py-4.5 transition-colors hover:border-[#4FD1C5] hover:bg-[#4FD1C5]/5"
              >
                <span className="font-mono text-[0.68rem] tracking-wide text-[#5D7592]">
                  {l.label}
                </span>
                <span className="text-[0.95rem]">{l.value}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </Reveal>
  );
}
