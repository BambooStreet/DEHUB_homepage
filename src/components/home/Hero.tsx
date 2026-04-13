import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-800 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            DE<span className="text-primary-200">HUB</span>
          </h1>
          <p className="mt-2 text-lg md:text-xl text-primary-100 font-medium">
            Data Engineering HUB Laboratory
          </p>
          <p className="mt-6 text-lg text-slate-300 leading-relaxed max-w-2xl">
            데이터 엔지니어링의 핵심 기술을 연구하고, 대규모 데이터 처리,
            지식 그래프, 분산 시스템 등 다양한 분야에서 혁신적인 연구를 수행합니다.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/about"
              className="inline-flex items-center px-6 py-3 bg-primary-500 hover:bg-primary-400 text-white font-medium rounded-lg transition-colors"
            >
              연구실 소개
            </Link>
            <Link
              href="/publications"
              className="inline-flex items-center px-6 py-3 border border-primary-300 hover:bg-white/10 text-white font-medium rounded-lg transition-colors"
            >
              연구 성과
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-10" />
    </section>
  );
}
