import { neon } from "@neondatabase/serverless";

async function migrate() {
  const sql = neon(process.env.DATABASE_URL!);

  console.log("Adding region column if missing...");
  await sql`
    ALTER TABLE publications
      ADD COLUMN IF NOT EXISTS region TEXT NOT NULL DEFAULT 'international'
      CHECK (region IN ('domestic','international'))
  `;

  console.log("Adding indexing column if missing...");
  await sql`
    ALTER TABLE publications
      ADD COLUMN IF NOT EXISTS indexing TEXT
  `;

  console.log("Adding received column to members if missing...");
  await sql`
    ALTER TABLE members
      ADD COLUMN IF NOT EXISTS received TEXT[] NOT NULL DEFAULT '{}'
  `;

  console.log("Adding work_at column to members if missing...");
  await sql`
    ALTER TABLE members
      ADD COLUMN IF NOT EXISTS work_at TEXT
  `;

  console.log("Adding partner column to projects if missing...");
  await sql`ALTER TABLE projects ADD COLUMN IF NOT EXISTS partner TEXT`;

  console.log("Adding partner_logo column to projects if missing...");
  await sql`ALTER TABLE projects ADD COLUMN IF NOT EXISTS partner_logo TEXT`;

  console.log("Adding subtitle column to projects if missing...");
  await sql`ALTER TABLE projects ADD COLUMN IF NOT EXISTS subtitle TEXT`;

  console.log("Adding purpose column to projects if missing...");
  await sql`ALTER TABLE projects ADD COLUMN IF NOT EXISTS purpose TEXT`;

  console.log("Inserting past projects (idempotent via ON CONFLICT)...");
  const pastProjects: Array<{
    id: string;
    title: string;
    partner: string | null;
    subtitle: string | null;
    purpose: string;
    description: string;
    period: string;
    sort_order: number;
  }> = [
    {
      id: "samsung-multimodal-2024",
      title: "스크린 멀티모달 인터랙션 연구",
      partner: "삼성전자",
      subtitle: null,
      purpose: "멀티모달리티를 활용한 인터랙션 대원칙 수립",
      description: [
        "(1) 디스플레이 체화 형태에 부합하는 멀티모달 인터랙션 구현 원칙 마련",
        "(2) 이용자 인터랙션 의도 및 목적에 따른 멀티모달 인터랙션 디자인 원칙 도출",
        "(3) 이용자의 상황적 특성에 따른 멀티모달 인터랙션 디자인 원칙 도출",
      ].join("\n"),
      period: "2024.06 - 2025.03",
      sort_order: 1,
    },
    {
      id: "naver-ecommerce-2024",
      title: "소비자 보호 관점에서 글로벌 이커머스 사업자들의 정성적 비교분석 연구",
      partner: "Naver",
      subtitle: null,
      purpose: "글로벌 이커머스 사업자들의 소비자 보호에 대해 분석하고 네이버의 소비자 보호 정책과 비교 분석",
      description: [
        "(1) 글로벌 이커머스 사업자들의 소비자 보호 현황 분석",
        "(2) 글로벌 이커머스 사업자들의 소비자 보호 비교 및 시사점 도출",
        "비교 대상: 네이버, 아마존, 징동닷컴, 알리바바, 핀둬둬, 쿠팡, 11번가, G마켓 등",
      ].join("\n"),
      period: "2024.09 - 2024.11",
      sort_order: 2,
    },
    {
      id: "kt-iptv-tving-wavve-2024",
      title: "TVing과 WAVVE의 인수합병에 따른 KT IPTV 가입자수 변화 예측 연구",
      partner: "KT",
      subtitle: null,
      purpose:
        "TVING과 WAVVE가 인수합병 하게 될 경우 KT IPTV 사용자에게 미치는 영향을 분석함으로써 KT IPTV 가입자수의 변화를 예측함",
      description: [
        "(1) KT IPTV 가입자수의 변화를 예측하기 위한 실험을 설계",
        "(2) TVING 서비스와 WAVVE 서비스 특성을 분석하고 합병 이후 가능한 시나리오를 예측하여 이를 실험 설계에 반영",
        "(3) 시나리오 분석(Computational Experiment)을 통한 KT IPTV 가입자수 변화 예측",
      ].join("\n"),
      period: "2024.09 - 2024.11",
      sort_order: 3,
    },
    {
      id: "ai-counseling-chatbot-2023",
      title: "AI Psychological Counseling Chatbot",
      partner: null,
      subtitle: "커뮤니케이션과 인간공학이 만나는 심리 상담 챗봇: 자기노출 증진과 효율적인 상담을 위한 모델 개발",
      purpose:
        "구현한 상담 챗봇을 통한 실험 연구 결과에 기반하여, 상담 챗봇의 장점을 극대화하고 약점을 보완하여 실제 사람 상담자의 보조 역할로서 활용성을 높이는 방안을 제시",
      description: [
        "(1) 인공지능 심리 상담에 대한 사용자 선호도를 도출",
        "(2) 상담 효율성을 높이기 위한 AI 심리 상담에 적합한 챗봇의 내적·외적 디자인을 개발",
        "(3) 실제 상담 전문가 및 그룹상담을 연계하여 AI 상담에 대한 입체적인 상담 효과를 확인",
      ].join("\n"),
      period: "2023.06 - 2026.02",
      sort_order: 4,
    },
    {
      id: "kakao-financial-info-2023",
      title: "Financial information provision method",
      partner: "KAKAO",
      subtitle: "금융 정보 메시지 전달 방식에 따른 소비자 선호와 소비자 후생 효과",
      purpose: "금융 정보 제공 형태에 대한 소비자 선호와 소비자 후생 효과를 알아보고자 한다.",
      description:
        "금융 정보 제공 플랫폼의 속성들을 소비자가 선호하는 양상을 분석하였다. 이를 통해 해당 플랫폼이 가져다주는 소비자 후생 효과를 파악하고, 금융 정보 제공 플랫폼이 나아갈 방향에 대한 제언한다.",
      period: "2023.09 - 2023.11",
      sort_order: 5,
    },
    {
      id: "naver-network-separation-2021",
      title: "Network Separation & Fintech",
      partner: "Naver & 스타트업얼라이언스",
      subtitle: "망분리 정책이 핀테크 기업의 개발환경에 미치는 영향",
      purpose: "본 연구는 망분리 정책이 핀테크 기업의 개발환경에 미치는 영향을 분석하고자 한다.",
      description:
        "망분리란 해킹으로부터 데이터 자원을 보호하기 위한 보안 방법으로 현재 국내 핀테크 산업을 포함한 공공·민간·금융 분야는 망분리를 의무화하는 규정을 따르고 있다. 본 연구는 망분리 정책이 핀테크 기업의 개발환경에 미치는 영향을 분석해 망분리 정책이 개발자의 만족과 이탈에 영향을 주는 요인을 분석하고자 한다.",
      period: "2021.07 - 2021.09",
      sort_order: 6,
    },
    {
      id: "kakao-transparency-2021",
      title: "Transparency & User Utility",
      partner: "KAKAO",
      subtitle: "투명성과 사용자 효용의 상관관계",
      purpose:
        "본 연구는 네트워크 운영에서 투명성에 도달하기 위한 필수 조건과, 사용자의 효용을 만족시킬 수 있는 투명성 요소들이 무엇인지를 알아보고자 한다.",
      description:
        "네트워크 운영에 있어서 사용자들에게 관련 정보들을 공개하는 것을 투명성이라고 부른다. 투명성에 도달하고 사용자의 효용을 높일 수 있는 방법에는 무엇이 있는지와 실무에서 공개하고 있는 네크워크 운영 정보들이 실제로 사용자들의 효용을 높이는데 도움이 되는지를 검증하고자 한다.",
      period: "2021.01 - 2021.03",
      sort_order: 7,
    },
    {
      id: "naver-revenge-livecommerce-2020",
      title: "Revenge Behavior and live commerce",
      partner: "NAVER",
      subtitle: "보복 심리와 라이브 커머스",
      purpose:
        "본 연구는 코로나 19라는 외부 요인으로 인해 사회적 거리두기와 같은 제한적인 생활을 하고 있는 상황 속에서 소비자들의 소비 행태 변화를 연구하고자 한다.",
      description:
        "코로나 19로 생긴 부정적인 감정과 그 감정들을 지닌 상태에서의 쇼핑 동기, 그리고 실질적으로 소비자의 부정적인 감정이 쇼핑 행동으로 이어지는지를 연구하고자 한다.",
      period: "2020.05 -",
      sort_order: 8,
    },
    {
      id: "ai-commenting-2020",
      title: "AI Commenting",
      partner: null,
      subtitle: "딥러닝(deep learning), 감정분석(Sentiment analysis)을 통한 청자 감정의 시각화",
      purpose:
        "본 연구는 상대방에 대한 단서를 쉽게 인지하기 힘든 온라인 환경에서 상대의 존재를 지각하는데 도움이 되는 효과적인 시각적 단서를 개발하고자 한다.",
      description:
        "온라인 환경에서 상대에 대해 인지가 잘 안 될 경우 화자는 상대의 반응을 예상하며 의견을 표현하기 어려울 수도 있고, 익명화된 대상에 대해 상대가 존재하지 않는 것처럼 여겨 부적절하거나 반사회적인 언행을 쉽게 하게 될 수 있다. 상대를 효과적으로 인지하게 만들 수 있는 다양한 단서들을 개발하고 단서들의 적합성을 비교하여 실험을 통해 시각적 단서 제공의 효과를 검증하고자 한다.",
      period: "2020.02 -",
      sort_order: 9,
    },
    {
      id: "conversational-agent-education-2020",
      title: "Conversational Agent in Education",
      partner: null,
      subtitle: "교육용 인공지능 대화 에이전트",
      purpose:
        "본 연구는 온라인 학습의 상호작용 및 지속적 사용에 대한 부족한 점을 보완하기 위하여 개별 학습자의 성격 및 학습 동기에 맞춰주는 친구같은 존재인 교육용 인공지능 대화 에이전트를 개발하고자 한다.",
      description:
        "학습자는 온라인 학습 상황에서 자신의 성향과 일치하는 에이전트와 상호작용하며 유대감을 형성하고 학습에 긍정적인 영향을 주는 자아 효능감을 향상시킬 수 있을 것으로 기대된다. 궁긍적으로 사용자는 교육용 인공지능 대화 에이전트의 어시스턴트로 온라인 학습에 대한 지속적 사용 태도를 지니게 될 것이다.",
      period: "2020.02 -",
      sort_order: 10,
    },
  ];

  for (const p of pastProjects) {
    await sql`
      INSERT INTO projects (id, title, partner, subtitle, purpose, description, period, status, tags, sort_order)
      VALUES (${p.id}, ${p.title}, ${p.partner}, ${p.subtitle}, ${p.purpose},
              ${p.description}, ${p.period}, 'completed', '{}', ${p.sort_order})
      ON CONFLICT (id) DO NOTHING
    `;
  }

  console.log(`Inserted ${pastProjects.length} past projects.`);
  console.log("Migration complete. Run `npm run db:seed` next.");
}

migrate().catch((err) => {
  console.error(err);
  process.exit(1);
});
