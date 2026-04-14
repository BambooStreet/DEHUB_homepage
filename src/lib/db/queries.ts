import { getDb } from "./index";
import type { Member, Publication, NewsItem, Project, Award } from "@/types";

// --- Members ---
export async function getMembers(): Promise<Member[]> {
  const sql = getDb();
  const rows = await sql`SELECT * FROM members ORDER BY sort_order, created_at`;
  return rows.map(mapMember);
}

export async function getMemberById(id: string): Promise<Member | null> {
  const sql = getDb();
  const rows = await sql`SELECT * FROM members WHERE id = ${id}`;
  return rows.length > 0 ? mapMember(rows[0]) : null;
}

function mapMember(row: Record<string, unknown>): Member {
  return {
    id: row.id as string,
    name: row.name as string,
    nameEn: row.name_en as string,
    role: row.role as Member["role"],
    position: row.position as string,
    email: (row.email as string) || undefined,
    image: (row.image as string) || undefined,
    research: (row.research as string[]) || [],
    homepage: (row.homepage as string) || undefined,
    graduationYear: (row.graduation_year as number) || undefined,
  };
}

// --- Publications ---
export async function getPublications(): Promise<Publication[]> {
  const sql = getDb();
  const rows = await sql`SELECT * FROM publications ORDER BY year DESC, sort_order, created_at DESC`;
  return rows.map(mapPublication);
}

export async function getPublicationById(id: string): Promise<Publication | null> {
  const sql = getDb();
  const rows = await sql`SELECT * FROM publications WHERE id = ${id}`;
  return rows.length > 0 ? mapPublication(rows[0]) : null;
}

function mapPublication(row: Record<string, unknown>): Publication {
  return {
    id: row.id as string,
    title: row.title as string,
    authors: (row.authors as string[]) || [],
    venue: row.venue as string,
    year: row.year as number,
    type: row.type as Publication["type"],
    link: (row.link as string) || undefined,
    doi: (row.doi as string) || undefined,
  };
}

// --- News ---
export async function getNews(): Promise<NewsItem[]> {
  const sql = getDb();
  const rows = await sql`SELECT * FROM news ORDER BY date DESC, created_at DESC`;
  return rows.map(mapNews);
}

export async function getNewsById(id: string): Promise<NewsItem | null> {
  const sql = getDb();
  const rows = await sql`SELECT * FROM news WHERE id = ${id}`;
  return rows.length > 0 ? mapNews(rows[0]) : null;
}

function mapNews(row: Record<string, unknown>): NewsItem {
  return {
    id: row.id as string,
    title: row.title as string,
    date: row.date as string,
    content: row.content as string,
    category: row.category as NewsItem["category"],
    image: (row.image as string) || undefined,
  };
}

// --- Projects ---
export async function getProjects(): Promise<Project[]> {
  const sql = getDb();
  const rows = await sql`SELECT * FROM projects ORDER BY sort_order, created_at DESC`;
  return rows.map(mapProject);
}

export async function getProjectById(id: string): Promise<Project | null> {
  const sql = getDb();
  const rows = await sql`SELECT * FROM projects WHERE id = ${id}`;
  return rows.length > 0 ? mapProject(rows[0]) : null;
}

function mapProject(row: Record<string, unknown>): Project {
  return {
    id: row.id as string,
    title: row.title as string,
    description: row.description as string,
    period: row.period as string,
    status: row.status as Project["status"],
    tags: (row.tags as string[]) || [],
    image: (row.image as string) || undefined,
  };
}

// --- Awards ---
export async function getAwards(): Promise<Award[]> {
  const sql = getDb();
  const rows = await sql`SELECT * FROM awards ORDER BY date DESC, sort_order, created_at DESC`;
  return rows.map(mapAward);
}

export async function getAwardById(id: string): Promise<Award | null> {
  const sql = getDb();
  const rows = await sql`SELECT * FROM awards WHERE id = ${id}`;
  return rows.length > 0 ? mapAward(rows[0]) : null;
}

function mapAward(row: Record<string, unknown>): Award {
  return {
    id: row.id as string,
    title: row.title as string,
    recipient: row.recipient as string,
    date: row.date as string,
    description: (row.description as string) || undefined,
    image: (row.image as string) || undefined,
  };
}
