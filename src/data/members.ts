import { Member } from "@/types";

export const members: Member[] = [
  {
    id: "prof-hong",
    name: "홍길동",
    nameEn: "Gildong Hong",
    role: "professor",
    position: "교수 (Professor)",
    email: "professor@university.ac.kr",
    research: ["Human-Computer Interaction", "Human-AI Interaction", "UX Design"],
    homepage: "https://university.ac.kr/~professor",
  },
  {
    id: "student-kim",
    name: "김철수",
    nameEn: "Cheolsu Kim",
    role: "phd",
    position: "박사과정 (Ph.D. Student)",
    email: "cheolsu@university.ac.kr",
    research: ["Conversational AI", "Explainable AI", "Human-AI Collaboration"],
  },
  {
    id: "student-lee",
    name: "이영희",
    nameEn: "Younghee Lee",
    role: "phd",
    position: "박사과정 (Ph.D. Student)",
    email: "younghee@university.ac.kr",
    research: ["Accessible Computing", "Inclusive Design", "Assistive Technology"],
  },
  {
    id: "student-park",
    name: "박민수",
    nameEn: "Minsu Park",
    role: "master",
    position: "석사과정 (M.S. Student)",
    email: "minsu@university.ac.kr",
    research: ["Interactive Visualization", "Tangible Interface", "Prototyping"],
  },
  {
    id: "student-choi",
    name: "최지은",
    nameEn: "Jieun Choi",
    role: "master",
    position: "석사과정 (M.S. Student)",
    email: "jieun@university.ac.kr",
    research: ["AI-mediated Communication", "Social Computing", "User Study"],
  },
  {
    id: "alumni-jung",
    name: "정수현",
    nameEn: "Suhyun Jung",
    role: "alumni",
    position: "네이버 UX리서치 (Naver UX Research)",
    graduationYear: 2024,
    research: ["Usability Evaluation", "User Research"],
  },
];

export const getRoleLabel = (role: Member["role"]): string => {
  const labels: Record<Member["role"], string> = {
    professor: "지도교수",
    phd: "박사과정",
    master: "석사과정",
    undergraduate: "학부연구생",
    alumni: "졸업생",
  };
  return labels[role];
};
