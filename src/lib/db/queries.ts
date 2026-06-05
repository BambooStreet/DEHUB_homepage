import { getDb } from "./index";
import type { Member, Publication, NewsItem, Project, Award } from "@/types";

function toDateString(value: unknown): string {
  if (value instanceof Date) return value.toISOString().split("T")[0];
  if (typeof value === "string") return value.split("T")[0];
  return String(value);
}

// --- Members ---
export async function getMembers(): Promise<Member[]> {
  const sql = getDb();
  const rows = await sql`
    SELECT id, name, name_en, role, position, email, image, research, homepage, graduation_year, received, work_at
    FROM members ORDER BY sort_order, created_at
  `;
  return rows.map(mapMember);
}

export async function getMemberById(id: string): Promise<Member | null> {
  const sql = getDb();
  const rows = await sql`
    SELECT id, name, name_en, role, position, email, image, research, homepage, graduation_year, received, work_at
    FROM members WHERE id = ${id}
  `;
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
    received: (row.received as string[]) || [],
    workAt: (row.work_at as string) || undefined,
  };
}

// --- Publications ---
export async function getPublications(): Promise<Publication[]> {
  const sql = getDb();
  const rows = await sql`
    SELECT id, title, authors, venue, year, type, region, indexing, link, doi
    FROM publications ORDER BY year DESC, sort_order, created_at DESC
  `;
  return rows.map(mapPublication);
}

export async function getPublicationById(id: string): Promise<Publication | null> {
  const sql = getDb();
  const rows = await sql`
    SELECT id, title, authors, venue, year, type, region, indexing, link, doi
    FROM publications WHERE id = ${id}
  `;
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
    region: (row.region as Publication["region"]) || "international",
    indexing: (row.indexing as string) || undefined,
    link: (row.link as string) || undefined,
    doi: (row.doi as string) || undefined,
  };
}

// --- News ---
export async function getNews(): Promise<NewsItem[]> {
  const sql = getDb();
  const rows = await sql`
    SELECT id, title, date::text AS date, content, category, image
    FROM news ORDER BY date DESC, created_at DESC
  `;
  return rows.map(mapNews);
}

export async function getNewsById(id: string): Promise<NewsItem | null> {
  const sql = getDb();
  const rows = await sql`
    SELECT id, title, date::text AS date, content, category, image
    FROM news WHERE id = ${id}
  `;
  return rows.length > 0 ? mapNews(rows[0]) : null;
}

function mapNews(row: Record<string, unknown>): NewsItem {
  return {
    id: row.id as string,
    title: row.title as string,
    date: toDateString(row.date),
    content: row.content as string,
    category: row.category as NewsItem["category"],
    image: (row.image as string) || undefined,
  };
}

// --- Projects ---
export async function getProjects(): Promise<Project[]> {
  const sql = getDb();
  const rows = await sql`
    SELECT id, title, partner, partner_logo, subtitle, purpose, description, period, status, tags, image
    FROM projects ORDER BY sort_order, created_at DESC
  `;
  return rows.map(mapProject);
}

export async function getPartnerLogoLibrary(): Promise<Array<{ partner: string; logoUrl: string }>> {
  const sql = getDb();
  const rows = await sql`
    SELECT DISTINCT ON (LOWER(TRIM(partner))) partner, partner_logo
    FROM projects
    WHERE partner IS NOT NULL AND TRIM(partner) <> ''
      AND partner_logo IS NOT NULL AND partner_logo <> ''
    ORDER BY LOWER(TRIM(partner)), created_at DESC
  `;
  return rows.map((r) => ({
    partner: r.partner as string,
    logoUrl: r.partner_logo as string,
  }));
}

export async function getProjectById(id: string): Promise<Project | null> {
  const sql = getDb();
  const rows = await sql`
    SELECT id, title, partner, partner_logo, subtitle, purpose, description, period, status, tags, image
    FROM projects WHERE id = ${id}
  `;
  return rows.length > 0 ? mapProject(rows[0]) : null;
}

function mapProject(row: Record<string, unknown>): Project {
  return {
    id: row.id as string,
    title: row.title as string,
    partner: (row.partner as string) || undefined,
    partnerLogo: (row.partner_logo as string) || undefined,
    subtitle: (row.subtitle as string) || undefined,
    purpose: (row.purpose as string) || undefined,
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
  const rows = await sql`
    SELECT id, title, recipient, date::text AS date, description, image
    FROM awards ORDER BY date DESC, sort_order, created_at DESC
  `;
  return rows.map(mapAward);
}

export async function getAwardById(id: string): Promise<Award | null> {
  const sql = getDb();
  const rows = await sql`
    SELECT id, title, recipient, date::text AS date, description, image
    FROM awards WHERE id = ${id}
  `;
  return rows.length > 0 ? mapAward(rows[0]) : null;
}

function mapAward(row: Record<string, unknown>): Award {
  return {
    id: row.id as string,
    title: row.title as string,
    recipient: row.recipient as string,
    date: toDateString(row.date),
    description: (row.description as string) || undefined,
    image: (row.image as string) || undefined,
  };
}
