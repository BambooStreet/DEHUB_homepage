import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

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
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Our Vision</h2>
            <p className="text-lg font-medium text-primary-200 mb-8">
              정보화된 환경(Digital Environment) 속에서 인간의 행동(Human Behavior)
            </p>
            <div className="space-y-5 text-secondary-200 leading-relaxed">
              <p>
                스마트폰과 인터넷은 우리로 하여금 언제 어디서든 원하는 콘텐츠를 소비할 수
                있도록 해주었고, AI는 기계를 더 똑똑하게 만들어 인간의 삶을 더 풍요롭게
                만들어주고 있습니다.
              </p>
              <p>
                기술의 발전은 어느덧 우리를 운전기사 없이도 자동차가 운전되고, 어떤
                물건이든 주문하면 하루 이내에 받을 수 있는 세상에 데려다 주었습니다.
              </p>
              <p>
                그런데 인터넷에 올라오는 신문 기사와 그 기사에 달린 댓글들을 보면 과연
                우리는 기술이 발전된 세상에서 &ldquo;행복&rdquo;하게 잘 살고 있는지 의문이
                듭니다.
              </p>
              <p>
                인간의 거리를 가깝게 만들어야 하는 인터넷이라는 커뮤니케이션 기술은 오히려
                인간의 거리를 멀게 만들고 있고, 혹자는 AI가 인간의 일자리를 전부 빼앗아 갈
                것이라고 걱정합니다.
              </p>
              <p className="text-white font-medium">
                우리의 기술은 올바른 방향으로 발전하고 있는 것일까요?
              </p>
              <p className="text-white font-medium">
                우리는 기술을 어떤 방향으로 이끌어야 하는 것일까요?
              </p>
              <p>
                이 문제에 대한 해답은, 기술만 보아서는, 또는 인간만 보아서는 절대로 찾아질
                수 없으며, 어떤 기술(AI, 로봇, 인터넷 등)이 어떤 서비스(온라인 쇼핑, 챗봇,
                OTT 등)를 만들어냈고, 그러한 기술과 서비스가 어떤 사회적 환경(필터버블,
                히키코모리, 긱이코노미 등)을 만들고 있는지를 전체적으로 고려해야만 찾을 수
                있습니다.
              </p>
              <p>
                따라서 DE HuB LAB은 정보화된 환경(Digital Environment) 속에서 인간의
                행동(Human Behavior)을 분석함으로써, 어떻게 해야 인간이 기술을 더 잘
                이용할 수 있고 어떻게 해야 기술이 인간을 더 이롭게 할 것인지를 연구합니다.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
