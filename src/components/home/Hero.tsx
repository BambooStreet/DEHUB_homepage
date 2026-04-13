import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-secondary-50 text-secondary-800">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="flex flex-col items-center text-center">
          <Image src="/images/logo9.gif" alt="DEHUB" width={200} height={65} className="h-16 md:h-20 w-auto mb-6" unoptimized />

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-secondary-800">
            Welcome to <span className="text-primary-500">DE HuB LAB</span>
          </h1>

          <p className="mt-6 text-lg text-secondary-400 leading-relaxed max-w-xl">
            연구라는, 미지의 세계에서 진리를 찾아 헤매는 모험<br />
            그 모험을 함께 할 사람들을 찾습니다.
          </p>

          <div className="mt-8 flex gap-4">
            <Link
              href="/about"
              className="px-6 py-3 bg-secondary-800 hover:bg-secondary-700 text-white font-medium rounded-lg transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 border border-secondary-300 hover:bg-white text-secondary-700 font-medium rounded-lg transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
