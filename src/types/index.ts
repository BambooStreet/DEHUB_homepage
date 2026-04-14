export interface Member {
  id: string;
  name: string;
  nameEn: string;
  role: "professor" | "phd" | "master" | "undergraduate" | "alumni";
  position: string;
  email?: string;
  image?: string;
  research?: string[];
  homepage?: string;
  graduationYear?: number;
}


export interface NewsItem {
  id: string;
  title: string;
  date: string;
  content: string;
  category: "announcement" | "award" | "event" | "media";
  image?: string;
}

