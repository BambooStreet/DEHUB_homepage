import { ResearchProject } from "@/types";

export const projects: ResearchProject[] = [
  {
    id: "proj-1",
    title: "대규모 실시간 데이터 파이프라인 최적화",
    description:
      "분산 환경에서의 대규모 스트림 데이터 처리를 위한 효율적인 파이프라인 아키텍처를 연구합니다. Apache Kafka, Flink 등의 기술을 활용하여 실시간 데이터 처리 성능을 극대화합니다.",
    period: "2024.03 - 현재",
    status: "ongoing",
    tags: ["Stream Processing", "Apache Kafka", "Apache Flink", "Distributed Systems"],
  },
  {
    id: "proj-2",
    title: "지식 그래프 자동 구축 시스템",
    description:
      "비정형 텍스트 데이터로부터 자동으로 지식 그래프를 구축하는 시스템을 개발합니다. NLP 기술과 그래프 데이터베이스를 결합하여 대규모 지식 베이스를 구축합니다.",
    period: "2023.09 - 현재",
    status: "ongoing",
    tags: ["Knowledge Graph", "NLP", "Neo4j", "Information Extraction"],
  },
  {
    id: "proj-3",
    title: "IoT 센서 데이터 시각화 플랫폼",
    description:
      "IoT 환경에서 수집되는 센서 데이터를 실시간으로 시각화하고 분석하는 웹 기반 플랫폼을 개발합니다.",
    period: "2023.03 - 2024.12",
    status: "completed",
    tags: ["IoT", "Data Visualization", "React", "D3.js"],
  },
  {
    id: "proj-4",
    title: "분산 데이터베이스 쿼리 최적화",
    description:
      "분산 데이터베이스 환경에서 복잡한 쿼리의 실행 성능을 최적화하는 기법을 연구합니다. 쿼리 플래닝, 인덱싱, 캐싱 전략을 포함합니다.",
    period: "2022.09 - 2024.06",
    status: "completed",
    tags: ["Database", "Query Optimization", "Distributed Systems"],
  },
];
