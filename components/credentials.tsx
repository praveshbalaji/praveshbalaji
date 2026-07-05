import { Reveal } from "@/components/reveal";

const CERTS = [
  "Getting Started with AI on Jetson Nano — NVIDIA",
  "Claude 101 — Certificate of Completion",
  "UI/UX for Beginners — Great Learning",
  "Web Development (HTML, CSS, JS, jQuery, Node.js) — Udemy",
  "CCNA Routing & Switching: Introduction to Networks — Cisco",
  "Java Fundamentals — Oracle Academy",
];

export function Credentials() {
  return (
    <Reveal>
      <section id="credentials" className="mx-auto max-w-[1160px] border-t border-[#17324a] px-6 py-20 md:px-16 md:py-24">
        <p className="mb-2 font-mono text-[0.78rem] uppercase text-[#4FD1C5]">// Credentials</p>
        <h2 className="mb-10 font-display text-[clamp(1.7rem,3vw,2.2rem)] font-semibold">
          Education &amp; certifications
        </h2>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div>
            <h3 className="mb-5 font-mono text-[0.74rem] tracking-wide text-[#5D7592]">
              EDUCATION
            </h3>
            <div className="mb-4">
              <p className="mb-1 font-medium">M.Sc. Computer Science</p>
              <p className="text-[0.88rem] text-[#8CA0BC]">
                Anna University, Chennai (Distance Education) · 2023 – Present
              </p>
            </div>
            <div>
              <p className="mb-1 font-medium">B.Tech, Computer Science Engineering</p>
              <p className="text-[0.88rem] text-[#8CA0BC]">
                Dr. M.G.R. Educational and Research Institute, Chennai · 2017 – 2021
              </p>
            </div>
          </div>
          <div>
            <h3 className="mb-5 font-mono text-[0.74rem] tracking-wide text-[#5D7592]">
              CERTIFICATIONS &amp; COURSES
            </h3>
            <ul>
              {CERTS.map((c, i) => (
                <li
                  key={c}
                  className={`py-2.5 text-[0.92rem] text-[#C3CFDE] ${
                    i === CERTS.length - 1 ? "" : "border-b border-[#17324a]"
                  }`}
                >
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </Reveal>
  );
}
