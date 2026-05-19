import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Professor",
};

const education = [
  "Seoul National University, Ph.D., Economics, 2011.8.",
  "Seoul National University, B.S., Electrical Engineering, 2001.2.",
];

const experience = [
  "Full Professor, Sungkyunkwan University, Department of Interaction Science, 2025.3-",
  "Associate Professor, Sungkyunkwan University, Department of Interaction Science, 2019.3-2025.2",
  "Assistant Professor, Sungkyunkwan University, Department of Interaction Science, 2015.3.-2019.2.",
  "Research Fellow, Korea Information Society Development Institute, 2013.9.-2015.2.",
  "Research Professor, Seoul National University, 2012.6.-2013.8.",
  "Visiting Scholar, University of Pittsburgh, 2011.9.-2012.5.",
];

const majorFields = [
  "Human-computer interaction in Internet services (online shopping, web-toon, OTT, etc.)",
  "Value estimation of user experience",
];

const societies = [
  "한국정보사회학회, 편집위원장",
  "한국혁신학회, 부편집위원장",
  "한국정보사회학회, 편집위원",
  "한국기술혁신학회, 편집위원",
  "사이버커뮤니케이션학회, 총무이사",
  "한국인터넷정보학회, 이사",
  "정보통신정책학회, 이사",
  "한국미디어경영학회, 연구이사",
  "한국아시아혁신학회, 이사",
];

export default function ProfessorPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-secondary-800 mb-12">
          Professor
        </h1>

        <header className="mb-16 pb-12 border-b border-secondary-100">
          <p className="text-sm font-medium text-primary-600 mb-1">Professor Daeho Lee</p>
          <h2 className="text-2xl md:text-3xl font-bold text-secondary-800 mb-3">
            이대호 교수님
          </h2>
          <p className="text-secondary-500 text-sm leading-relaxed">
            Sungkyunkwan University, Department of Interaction Science
          </p>
          <a
            href="mailto:daeho.lee@skku.edu"
            className="inline-block mt-4 text-primary-600 hover:text-primary-700 text-sm"
          >
            daeho.lee@skku.edu
          </a>
        </header>

        <Section title="Biography">
          <Subsection title="Education">
            <ul className="space-y-2 text-secondary-600 text-sm leading-relaxed">
              {education.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-primary-400 shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Subsection>

          <Subsection title="Professional Experience">
            <ul className="space-y-2 text-secondary-600 text-sm leading-relaxed">
              {experience.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-primary-400 shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Subsection>

          <Subsection title="Major Field of Study">
            <ul className="space-y-2 text-secondary-600 text-sm leading-relaxed">
              {majorFields.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-primary-400 shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Subsection>

          <Subsection title="Professional Society Member">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-secondary-600 text-sm leading-relaxed">
              {societies.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-primary-400 shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Subsection>
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-secondary-800 mb-8">{title}</h2>
      <div className="space-y-10">{children}</div>
    </section>
  );
}

function Subsection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-secondary-700 mb-4 pb-2 border-b border-secondary-100">
        {title}
      </h3>
      {children}
    </div>
  );
}
