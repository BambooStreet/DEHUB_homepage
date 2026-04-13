import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-white text-secondary-800">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-3xl">
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-secondary-800">About</h2>
            <Image src="/images/logo9.gif" alt="DEHUB" width={160} height={50} className="h-14 md:h-14 w-auto" unoptimized />
          </div>
          {/* <p className="text-lg text-secondary-500 leading-relaxed mb-4">
            DEHUB (Design Engineering HUB) 연구실은 사람과 컴퓨터, 사람과 AI 간의
            상호작용을 연구하는 HCI/HAI 연구실입니다. 사용자 중심 설계 철학을 바탕으로
            기술이 사람에게 더 나은 경험을 제공할 수 있도록 연구합니다.
          </p> */}
          <p className="text-lg text-secondary-400 leading-relaxed">
            Welcome to DE HuB LAB <br /><br />
            연구라는, 미지의 세계에서 진리를 찾아 헤매는 모험 <br />
            그 모험을 함께 할 사람들을 찾습니다.
          </p>
        </div>
      </div>
    </section>
  );
}
