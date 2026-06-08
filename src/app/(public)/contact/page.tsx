import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-secondary-800 mb-12">
          Contact
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-xl font-semibold text-secondary-800 mb-6">
              연락처 정보
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center text-primary-600 shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-secondary-800">주소</h3>
                  <p className="text-secondary-500 mt-1">
                    (03063) 서울특별시 종로구 성균관로 25-2<br />
                    성균관대학교 인문사회과학캠퍼스 국제관 9B302
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center text-primary-600 shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div className="space-y-4">
                  <h3 className="font-medium text-secondary-800">이메일</h3>
                  <div>
                    <p className="text-sm text-secondary-600">이대호 교수님</p>
                    <a href="mailto:daeho.lee@skku.edu" className="text-primary-600 hover:text-primary-700 text-sm">
                      daeho.lee@skku.edu
                    </a>
                  </div>
                  <div>
                    <p className="text-sm text-secondary-600">이해윤 랩장</p>
                    <a href="mailto:haileysunny@naver.com" className="text-primary-600 hover:text-primary-700 text-sm">
                      haileysunny@naver.com
                    </a>
                  </div>
                  <div>
                    <p className="text-sm text-secondary-600">장수빈 랩실 조교</p>
                    <a href="mailto:111usion@g.skku.edu" className="text-primary-600 hover:text-primary-700 text-sm">
                      111usion@g.skku.edu
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-secondary-800 mb-6">
              찾아오는 길
            </h2>
            <div className="aspect-[4/3] rounded-xl border border-secondary-100 overflow-hidden">
              <iframe
                src="https://maps.google.com/maps?q=%EC%84%B1%EA%B7%A0%EA%B4%80%EB%8C%80%ED%95%99%EA%B5%90%20%EC%9D%B8%EB%AC%B8%EC%82%AC%ED%9A%8C%EA%B3%BC%ED%95%99%EC%BA%A0%ED%8D%BC%EC%8A%A4%20%EA%B5%AD%EC%A0%9C%EA%B4%80&hl=ko&z=17&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="성균관대학교 인문사회과학캠퍼스 국제관 위치"
              />
            </div>
            <a
              href="https://maps.google.com/?q=%EC%84%B1%EA%B7%A0%EA%B4%80%EB%8C%80%ED%95%99%EA%B5%90%20%EC%9D%B8%EB%AC%B8%EC%82%AC%ED%9A%8C%EA%B3%BC%ED%95%99%EC%BA%A0%ED%8D%BC%EC%8A%A4%20%EA%B5%AD%EC%A0%9C%EA%B4%80"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 text-sm text-primary-600 hover:text-primary-700"
            >
              Google Maps에서 크게 보기 &rarr;
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
