import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.dehublab.com"),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "디허브랩 (DEHuB Lab) - 성균관대학교",
    template: "%s | 디허브랩 (DEHuB Lab)",
  },
  description:
    "성균관대학교 디허브랩(DEHuB Lab) - 인터랙션사이언스 기반 HCI·생성형 AI 연구실. 지도교수 이대호. 사람과 AI 시스템 간의 상호작용을 연구합니다.",
  keywords: [
    "디허브랩",
    "디허브",
    "DEHuB Lab",
    "DEHUB",
    "성균관대학교",
    "성균관대 디허브랩",
    "인터랙션사이언스",
    "이대호",
    "지도교수 이대호",
    "HCI",
    "생성형 AI",
  ],
  openGraph: {
    title: "디허브랩 (DEHuB Lab) - 성균관대학교",
    description:
      "성균관대학교 디허브랩(DEHuB Lab) - 인터랙션사이언스 기반 HCI·생성형 AI 연구실. 지도교수 이대호.",
    url: "https://www.dehublab.com",
    siteName: "디허브랩 (DEHuB Lab)",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
