import Image from "next/image";

const researchAreas = [
  {
    title: "Human-Computer Interaction",
    description:
      "사용자 경험을 중심으로 인터랙티브 시스템을 설계하고 평가합니다.",
    icon: "🖥️",
  },
  {
    title: "Human-AI Interaction",
    description:
      "사람과 AI 시스템 간의 효과적인 상호작용을 연구합니다.",
    icon: "🤖",
  },
  {
    title: "Accessible & Inclusive Design",
    description:
      "다양한 사용자를 포용하는 기술과 인터페이스를 설계합니다.",
    icon: "♿",
  },
  {
    title: "Social Computing & CSCW",
    description:
      "기술이 매개하는 사회적 상호작용과 협업을 연구합니다.",
    icon: "👥",
  },
];

export default function Hero() {
  return (
    <section className="bg-white text-secondary-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* About */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Image src="/images/logo9.gif" alt="DEHUB" width={160} height={50} className="h-12 w-auto" unoptimized />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-secondary-800 mb-4">About</h2>
          <p className="text-lg text-secondary-500 leading-relaxed mb-4">
            DEHUB (Design Engineering HUB) 연구실은 사람과 컴퓨터, 사람과 AI 간의
            상호작용을 연구하는 HCI/HAI 연구실입니다. 사용자 중심 설계 철학을 바탕으로
            기술이 사람에게 더 나은 경험을 제공할 수 있도록 연구합니다.
          </p>
          <p className="text-lg text-secondary-400 leading-relaxed">
            연구라는, 미지의 세계에서 진리를 찾아 헤매는 모험 그 모험을 함께 할 사람들을 찾습니다.
          </p>
        </div>

        {/* Research Areas */}
        <div>
          <h3 className="text-xl font-semibold text-secondary-700 mb-6">Research Areas</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {researchAreas.map((area) => (
              <div
                key={area.title}
                className="p-5 rounded-xl border border-secondary-100 hover:border-primary-300 hover:shadow-md transition-all"
              >
                <span className="text-2xl mb-2 block">{area.icon}</span>
                <h4 className="font-semibold text-secondary-800 mb-1 text-sm">
                  {area.title}
                </h4>
                <p className="text-xs text-secondary-400 leading-relaxed">
                  {area.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
