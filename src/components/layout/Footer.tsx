import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-secondary-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-3">
              DE<span className="text-primary-300">HUB</span>
            </h3>
            <p className="text-sm text-slate-400">
              Data Engineering HUB Laboratory
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-primary-300 transition-colors">About</Link></li>
              <li><Link href="/members" className="hover:text-primary-300 transition-colors">Members</Link></li>
              <li><Link href="/publications" className="hover:text-primary-300 transition-colors">Publications</Link></li>
              <li><Link href="/contact" className="hover:text-primary-300 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Contact</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>서울특별시 OO구 OO로 123</li>
              <li>OO대학교 공학관 000호</li>
              <li>Email: dehub@university.ac.kr</li>
              <li>Tel: 02-000-0000</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-secondary-700 text-center text-sm text-slate-500">
          &copy; {new Date().getFullYear()} DEHUB Laboratory. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
