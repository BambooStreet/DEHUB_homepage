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

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  type: "journal" | "conference" | "workshop" | "thesis";
  link?: string;
  doi?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  content: string;
  category: "announcement" | "award" | "event" | "media";
  image?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  period: string;
  status: "active" | "completed" | "upcoming";
  tags: string[];
  image?: string;
}

export interface Award {
  id: string;
  title: string;
  recipient: string;
  date: string;
  description?: string;
  image?: string;
}
