import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative bg-white text-secondary-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="max-w-3xl">
          <Image src="/images/logo9.gif" alt="DEHUB" width={280} height={90} className="h-20 md:h-24 w-auto" unoptimized />
          <p className="mt-4 text-lg md:text-xl text-primary-600 font-medium">
            Welcome to DE HuB LAB
          </p>
          <p className="mt-6 text-lg text-secondary-400 leading-relaxed max-w-2xl">
            연구라는, 미지의 세계에서 진리를 찾아 헤매는 모험 그 모험을 함께 할 사람들을 찾습니다.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/about"
              className="inline-flex items-center px-6 py-3 bg-secondary-800 hover:bg-secondary-700 text-white font-medium rounded-lg transition-colors"
            >
              연구실 소개
            </Link>
            <Link
              href="/publications"
              className="inline-flex items-center px-6 py-3 border border-secondary-300 hover:bg-secondary-50 text-secondary-700 font-medium rounded-lg transition-colors"
            >
              연구 성과
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
