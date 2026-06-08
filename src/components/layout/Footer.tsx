import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-secondary-700 text-secondary-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-3">
              DE<span className="text-primary-300">HUB</span>
            </h3>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-primary-400 transition-colors">About</Link></li>
              <li><Link href="/members/professor" className="hover:text-primary-400 transition-colors">Members</Link></li>
              <li><Link href="/publications" className="hover:text-primary-400 transition-colors">Publications</Link></li>
              <li><Link href="/contact" className="hover:text-primary-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Contact</h4>
            <ul className="space-y-2 text-sm text-secondary-300">
              <li>(03063) 서울특별시 종로구 성균관로 25-2</li>
              <li>성균관대학교 인문사회과학캠퍼스 국제관 9B302</li>
              <li>
                <a href="mailto:daeho.lee@skku.edu" className="hover:text-primary-400 transition-colors">
                  daeho.lee@skku.edu
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-secondary-600 text-center text-sm text-secondary-400">
          &copy; {new Date().getFullYear()} DEHUB Laboratory. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
