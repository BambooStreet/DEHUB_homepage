import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

const researchAreas = [
  {
    title: "Human-Computer Interaction",
    description:
      "사용자 경험을 중심으로 인터랙티브 시스템을 설계하고 평가합니다. 사용자 연구, 프로토타이핑, 사용성 평가 등 다양한 방법론을 활용합니다.",
    icon: "🖥️",
  },
  {
    title: "Human-AI Interaction",
    description:
      "사람과 AI 시스템 간의 효과적인 상호작용을 연구합니다. AI의 설명 가능성, 신뢰, 공정성 등 사용자 관점의 AI 설계를 탐구합니다.",
    icon: "🤖",
  },
  {
    title: "Accessible & Inclusive Design",
    description:
      "다양한 사용자를 포용하는 기술과 인터페이스를 설계합니다. 고령자, 장애인 등 소외 계층을 위한 보조 기술을 연구합니다.",
    icon: "♿",
  },
  {
    title: "Social Computing & CSCW",
    description:
      "기술이 매개하는 사회적 상호작용과 협업을 연구합니다. AI 시대의 커뮤니케이션, 온라인 커뮤니티, 협업 도구를 탐구합니다.",
    icon: "👥",
  },
];

export default function AboutPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Introduction */}
        <section className="max-w-3xl mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            About DEHUB
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed mb-4">
            DEHUB (Design Engineering HUB) 연구실은 사람과 컴퓨터, 사람과 AI 간의
            상호작용을 연구하는 HCI/HAI 연구실입니다. 사용자 중심 설계 철학을 바탕으로
            기술이 사람에게 더 나은 경험을 제공할 수 있도록 연구합니다.
          </p>
          <p className="text-lg text-slate-600 leading-relaxed">
            우리 연구실은 사용자 연구, 인터랙션 디자인, 프로토타이핑, 실험 평가 등
            다양한 방법론을 활용하며, 학제간 협력을 통해 실제 사용자 문제를 해결하는
            연구를 지향합니다.
          </p>
        </section>

        {/* Vision */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-primary-800 to-secondary-800 text-white rounded-2xl p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Vision</h2>
            <p className="text-lg text-slate-200 leading-relaxed max-w-2xl">
              AI 시대에 사람 중심의 기술을 설계하고, 모든 사용자가 기술의 혜택을
              누릴 수 있는 포용적 인터랙션을 만들어가는 글로벌 수준의 HCI 연구
              그룹이 되는 것을 목표로 합니다.
            </p>
          </div>
        </section>

        {/* Research Areas */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">
            Research Areas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {researchAreas.map((area) => (
              <div
                key={area.title}
                className="p-6 rounded-xl border border-slate-200 hover:border-primary-200 hover:shadow-md transition-all"
              >
                <span className="text-3xl mb-3 block">{area.icon}</span>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {area.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {area.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
