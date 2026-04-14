import { getDb } from "./index";
import type { Member, Publication, NewsItem, Project, Award } from "@/types";

// --- Members ---
export async function createMember(data: Omit<Member, "id"> & { id: string }) {
  const sql = getDb();
  await sql`
    INSERT INTO members (id, name, name_en, role, position, email, image, research, homepage, graduation_year)
    VALUES (${data.id}, ${data.name}, ${data.nameEn}, ${data.role}, ${data.position},
            ${data.email ?? null}, ${data.image ?? null}, ${data.research ?? []},
            ${data.homepage ?? null}, ${data.graduationYear ?? null})
  `;
}

export async function updateMember(id: string, data: Partial<Member>) {
  const sql = getDb();
  await sql`
    UPDATE members SET
      name = COALESCE(${data.name ?? null}, name),
      name_en = COALESCE(${data.nameEn ?? null}, name_en),
      role = COALESCE(${data.role ?? null}, role),
      position = COALESCE(${data.position ?? null}, position),
      email = ${data.email ?? null},
      image = ${data.image ?? null},
      research = COALESCE(${data.research ?? null}, research),
      homepage = ${data.homepage ?? null},
      graduation_year = ${data.graduationYear ?? null},
      updated_at = NOW()
    WHERE id = ${id}
  `;
}

export async function deleteMember(id: string) {
  const sql = getDb();
  await sql`DELETE FROM members WHERE id = ${id}`;
}

// --- Publications ---
export async function createPublication(data: Publication) {
  const sql = getDb();
  await sql`
    INSERT INTO publications (id, title, authors, venue, year, type, link, doi)
    VALUES (${data.id}, ${data.title}, ${data.authors}, ${data.venue}, ${data.year},
            ${data.type}, ${data.link ?? null}, ${data.doi ?? null})
  `;
}

export async function updatePublication(id: string, data: Partial<Publication>) {
  const sql = getDb();
  await sql`
    UPDATE publications SET
      title = COALESCE(${data.title ?? null}, title),
      authors = COALESCE(${data.authors ?? null}, authors),
      venue = COALESCE(${data.venue ?? null}, venue),
      year = COALESCE(${data.year ?? null}, year),
      type = COALESCE(${data.type ?? null}, type),
      link = ${data.link ?? null},
      doi = ${data.doi ?? null},
      updated_at = NOW()
    WHERE id = ${id}
  `;
}

export async function deletePublication(id: string) {
  const sql = getDb();
  await sql`DELETE FROM publications WHERE id = ${id}`;
}

// --- News ---
export async function createNews(data: NewsItem) {
  const sql = getDb();
  await sql`
    INSERT INTO news (id, title, date, content, category, image)
    VALUES (${data.id}, ${data.title}, ${data.date}, ${data.content},
            ${data.category}, ${data.image ?? null})
  `;
}

export async function updateNews(id: string, data: Partial<NewsItem>) {
  const sql = getDb();
  await sql`
    UPDATE news SET
      title = COALESCE(${data.title ?? null}, title),
      date = COALESCE(${data.date ?? null}, date),
      content = COALESCE(${data.content ?? null}, content),
      category = COALESCE(${data.category ?? null}, category),
      image = ${data.image ?? null},
      updated_at = NOW()
    WHERE id = ${id}
  `;
}

export async function deleteNews(id: string) {
  const sql = getDb();
  await sql`DELETE FROM news WHERE id = ${id}`;
}

// --- Projects ---
export async function createProject(data: Project) {
  const sql = getDb();
  await sql`
    INSERT INTO projects (id, title, description, period, status, tags, image)
    VALUES (${data.id}, ${data.title}, ${data.description}, ${data.period},
            ${data.status}, ${data.tags}, ${data.image ?? null})
  `;
}

export async function updateProject(id: string, data: Partial<Project>) {
  const sql = getDb();
  await sql`
    UPDATE projects SET
      title = COALESCE(${data.title ?? null}, title),
      description = COALESCE(${data.description ?? null}, description),
      period = COALESCE(${data.period ?? null}, period),
      status = COALESCE(${data.status ?? null}, status),
      tags = COALESCE(${data.tags ?? null}, tags),
      image = ${data.image ?? null},
      updated_at = NOW()
    WHERE id = ${id}
  `;
}

export async function deleteProject(id: string) {
  const sql = getDb();
  await sql`DELETE FROM projects WHERE id = ${id}`;
}

// --- Awards ---
export async function createAward(data: Award) {
  const sql = getDb();
  await sql`
    INSERT INTO awards (id, title, recipient, date, description, image)
    VALUES (${data.id}, ${data.title}, ${data.recipient}, ${data.date},
            ${data.description ?? null}, ${data.image ?? null})
  `;
}

export async function updateAward(id: string, data: Partial<Award>) {
  const sql = getDb();
  await sql`
    UPDATE awards SET
      title = COALESCE(${data.title ?? null}, title),
      recipient = COALESCE(${data.recipient ?? null}, recipient),
      date = COALESCE(${data.date ?? null}, date),
      description = ${data.description ?? null},
      image = ${data.image ?? null},
      updated_at = NOW()
    WHERE id = ${id}
  `;
}

export async function deleteAward(id: string) {
  const sql = getDb();
  await sql`DELETE FROM awards WHERE id = ${id}`;
}
