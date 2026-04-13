import { ResearchProject } from "@/types";

export const projects: ResearchProject[] = [
  {
    id: "proj-1",
    title: "사용자 중심 설명 가능한 AI 인터페이스 설계",
    description:
      "AI 시스템의 의사결정 과정을 사용자가 이해하고 신뢰할 수 있도록 돕는 설명 인터페이스를 설계합니다. 사용자 실험과 프로토타이핑을 통해 효과적인 XAI 인터랙션 패턴을 탐구합니다.",
    period: "2024.03 - 현재",
    status: "ongoing",
    tags: ["Explainable AI", "User Study", "Trust in AI", "Interface Design"],
  },
  {
    id: "proj-2",
    title: "고령자를 위한 AI 대화 에이전트 디자인",
    description:
      "디지털 소외 계층인 고령자가 AI 기반 대화 시스템을 자연스럽게 사용할 수 있도록 인터랙션 패턴과 인터페이스를 연구합니다. 참여적 디자인 방법론을 적용합니다.",
    period: "2023.09 - 현재",
    status: "ongoing",
    tags: ["Conversational AI", "Accessible Design", "Participatory Design", "Aging"],
  },
  {
    id: "proj-3",
    title: "Human-AI 협업 의사결정 시스템",
    description:
      "사람과 AI가 함께 의사결정을 내리는 과정에서 발생하는 인지적 편향, 의존성, 신뢰 문제를 연구하고 효과적인 협업 인터페이스를 제안합니다.",
    period: "2023.03 - 2024.12",
    status: "completed",
    tags: ["Human-AI Collaboration", "Decision Making", "Cognitive Bias", "Mixed-Methods"],
  },
  {
    id: "proj-4",
    title: "AI 기반 접근성 도구 사용성 평가",
    description:
      "장애인 사용자를 위한 AI 보조 기술의 사용성을 평가하고, 포용적 디자인 가이드라인을 개발합니다.",
    period: "2022.09 - 2024.06",
    status: "completed",
    tags: ["Accessibility", "Assistive Technology", "Usability Evaluation", "Inclusive Design"],
  },
];
