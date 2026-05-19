import { Member } from "@/types";

function research(s: string): string[] {
  return s.split("/").map((x) => x.trim()).filter(Boolean);
}

export const members: Member[] = [
  // --- Doctoral Course ---
  {
    id: "phd-haeyoon-lee",
    name: "이해윤",
    nameEn: "Haeyoon Lee",
    role: "phd",
    position: "Doctoral Course",
    email: "haileysunny@naver.com",
    research: research("UX / HCI / Consumer Behavior / Media Psychology / Generative AI"),
    received: [
      "Master of Science in Interaction Science",
      "Bachelor of Arts in Confucian and Oriental Studies",
      "Bachelor of Data Science",
    ],
  },
  {
    id: "phd-soobin-jang",
    name: "장수빈",
    nameEn: "Soobin Jang",
    role: "phd",
    position: "Doctoral Course",
    email: "111usion@g.skku.edu",
    research: research("HAI / LLM Reasoning / UX / Behavioral Economics"),
    received: [
      "Master of Science in Applied Artificial Intelligence",
      "Bachelor of Engineering in Computer Science and Technology",
    ],
  },
  {
    id: "phd-somi-joo",
    name: "주소미",
    nameEn: "Somi Joo",
    role: "phd",
    position: "Doctoral Course",
    email: "joosomi1@g.skku.edu",
    research: research("AI / HCI"),
    received: [
      "Master of Science in Interaction Science",
      "Bachelor of Applied Artificial Intelligence",
    ],
  },
  {
    id: "phd-yongki-baek",
    name: "백용기",
    nameEn: "Yongki Baek",
    role: "phd",
    position: "Doctoral Course",
    email: "grint.kermit@gmail.com",
    research: research("Blockchain-based payment systems / AI agents"),
    received: [
      "Master of Science in Interaction Science",
      "Bachelor of Engineering in Industrial Management Engineering",
    ],
  },
  {
    id: "phd-dongwook-shin",
    name: "신동욱",
    nameEn: "Dongwook Shin",
    role: "phd",
    position: "Doctoral Course",
    email: "webpd725@gmail.com",
    research: research("User experience / Strategic Marketing / Blockchain-based mobile survey platform"),
    workAt: "(주)미디어리얼리서치",
  },
  {
    id: "phd-jungmin-choi",
    name: "최정민",
    nameEn: "Jungmin Choi",
    role: "phd",
    position: "Doctoral Course",
    email: "jm.choi@g.skku.edu",
    research: research("Human behavior / Behavior Economics / Cognitive Science / Data Visualization"),
    workAt: "VizLab",
  },

  // --- Master's Course ---
  {
    id: "master-hyerin-park",
    name: "박혜린",
    nameEn: "Hyerin Park",
    role: "master",
    position: "Master's Course",
    email: "hrp0112@g.skku.edu",
    research: research("Virtual Reality / Metaverse / UX / UI"),
    received: ["Bachelor of Information Technology Engineering"],
  },
  {
    id: "master-sehyun-kim",
    name: "김세현",
    nameEn: "Sehyun Kim",
    role: "master",
    position: "Master's Course",
    email: "kimjeena94@naver.com",
    research: research("UX / User Research / Customer Behavior / Ecommerce / Business Value"),
    received: ["Bachelor of Business Administration"],
  },
  {
    id: "master-minseo-kim",
    name: "김민서",
    nameEn: "Minseo Kim",
    role: "master",
    position: "Master's Course",
    email: "dia777mond@skku.edu",
    research: research("HCI / HAI / Digital Health Care / Behavioral Analytics"),
    received: ["Bachelor of Data Science"],
  },
  {
    id: "master-seokjoo-hong",
    name: "홍석주",
    nameEn: "Seokjoo Hong",
    role: "master",
    position: "Master's Course",
    email: "ohmyhong1@skku.edu",
    research: research("HAI / HCI / Generative Agent"),
    received: ["Bachelor of Data Science"],
  },
  {
    id: "master-sujung-lim",
    name: "임수정",
    nameEn: "Sujung Lim",
    role: "master",
    position: "Master's Course",
    email: "zzz90zzz@skku.edu",
    research: research("AI / Content Business"),
    received: ["Bachelor of Economics"],
  },
  {
    id: "master-yeojin-yang",
    name: "양여진",
    nameEn: "Yeojin Yang",
    role: "master",
    position: "Master's Course",
    email: "yyj4357@skku.edu",
    research: research("HCI / HAI / UX / Conversational AI"),
    received: ["Bachelor of Arts in Media"],
  },
  {
    id: "master-hyojae-kim",
    name: "김효재",
    nameEn: "Hyojae Kim",
    role: "master",
    position: "Master's Course",
    email: "rlagywo0722@g.skku.edu",
    research: research("HCI / HAI / UX / User Behavioral Analytics"),
    received: ["Bachelor of Engineering in Industrial and Information Systems Engineering"],
  },
  {
    id: "master-hyejung-ko",
    name: "고혜정",
    nameEn: "Hyejung Ko",
    role: "master",
    position: "Master's Course",
    email: "helenko1@skku.edu",
    research: research("HCI / AI / UX"),
    received: ["Bachelor of Intelligent Systems / Internet of Things"],
  },
];

export const getRoleLabel = (role: Member["role"]): string => {
  const labels: Record<Member["role"], string> = {
    professor: "Professor",
    phd: "Doctoral Course",
    master: "Master's Course",
    undergraduate: "Undergraduate",
    alumni: "Alumni",
  };
  return labels[role];
};
