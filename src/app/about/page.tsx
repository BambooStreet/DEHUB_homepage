import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

const researchAreas = [
  {
    title: "Data Pipeline & Stream Processing",
    description:
      "대규모 실시간 데이터를 효율적으로 수집, 처리, 저장하기 위한 파이프라인 아키텍처를 연구합니다.",
    icon: "🔄",
  },
  {
    title: "Knowledge Graph",
    description:
      "비정형 데이터로부터 지식을 추출하고 그래프 구조로 표현하여 활용하는 기술을 연구합니다.",
    icon: "🕸️",
  },
  {
    title: "Distributed Database Systems",
    description:
      "분산 환경에서의 데이터 관리, 쿼리 최적화, 트랜잭션 처리 기술을 연구합니다.",
    icon: "🗄️",
  },
  {
    title: "Data Visualization & Analytics",
    description:
      "대규모 데이터를 직관적으로 시각화하고 인사이트를 도출하는 기술을 연구합니다.",
    icon: "📊",
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
            DEHUB (Data Engineering HUB) 연구실은 데이터 엔지니어링의 핵심 기술을 연구하는
            연구실입니다. 대규모 데이터의 효율적인 처리, 저장, 분석을 위한 시스템과
            알고리즘을 개발하고 있습니다.
          </p>
          <p className="text-lg text-slate-600 leading-relaxed">
            우리 연구실은 이론적 기반과 실용적 시스템 개발을 함께 추구하며,
            산업체와의 협력을 통해 실제 문제를 해결하는 연구를 지향합니다.
          </p>
        </section>

        {/* Vision */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-primary-800 to-secondary-800 text-white rounded-2xl p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Vision</h2>
            <p className="text-lg text-slate-200 leading-relaxed max-w-2xl">
              데이터 중심 사회에서 핵심이 되는 데이터 엔지니어링 기술을 선도하고,
              차세대 데이터 시스템을 설계하는 글로벌 수준의 연구 그룹이 되는 것을
              목표로 합니다.
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
