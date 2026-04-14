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
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Introduction */}
        <section className="max-w-3xl mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-secondary-800 mb-6">
            Welcome
          </h1>
          <p className="text-lg text-secondary-500 leading-relaxed mb-4">
          연구를 하고자 한다면 거쳐야 하는 단계들이 있습니다.
          <br />
          <br />
          지금까지 수많은 사람들이 블록처럼 차곡차곡 쌓아놓은 방대하고도 견고한 지식들이 담겨 있는 논문들을 읽어보고, 가설을 세우고, 다양한 방법을 통해 데이터를 모으고, 데이터를 분석하고 해석하여, 마침내 나의 주장을 뒷받침하고 시사점을 찾아내는 일련의 과정들을 거쳐야 합니다.
          <br />
          <br />
          물론 나열해 놓은 단계들로 넘어가기 위해서는 수많은 시행착오를 거치고 나 자신의 한계를 여러 번 만나게 될 것입니다.
          <br />
          <br />
          분명 어려운 일이고, 많이 노력해야 하는 일입니다.
          <br />
          <br />
          하지만 지금의 이 여정이 우리를 들뜨게 하는 만큼, 노력하고 싶게 만드는 만큼,
          <br />
          <br />
          앞으로 성장하게 될 당신과 우리들의 모습이 조금이라도 기대가 된다면 DE HuB LAB에서 성장의 여정을 함께 하시길 바랍니다. 
          <br />
          <br />
          어제보다 오늘 더 나은 사람이 되어있을 거라 믿으면서 앞으로 나아가다 보면, 전문가가 된 스스로를 만날 수 있기를 희망합니다.
          
          <br />
          <br />
          <br />
          <br />
          DE HuB LAB 일동   
          <br />
          <br />
          </p>
        </section>

        {/* Vision */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-secondary-800 to-secondary-700 text-white rounded-2xl p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Vision</h2>
            <p className="text-lg text-secondary-200 leading-relaxed max-w-2xl">
              AI 시대에 사람 중심의 기술을 설계하고, 모든 사용자가 기술의 혜택을
              누릴 수 있는 포용적 인터랙션을 만들어가는 글로벌 수준의 HCI 연구
              그룹이 되는 것을 목표로 합니다.
            </p>
          </div>
        </section>

        {/* Research Areas */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-secondary-800 mb-8">
            Research Areas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {researchAreas.map((area) => (
              <div
                key={area.title}
                className="p-6 rounded-xl border border-secondary-100 hover:border-primary-300 hover:shadow-md transition-all"
              >
                <span className="text-3xl mb-3 block">{area.icon}</span>
                <h3 className="text-lg font-semibold text-secondary-800 mb-2">
                  {area.title}
                </h3>
                <p className="text-sm text-secondary-500 leading-relaxed">
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
