"use server";

import { login, logout, verifyAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import * as mutations from "@/lib/db/mutations";
import { uploadImage } from "@/lib/upload";

// --- Auth ---
export async function loginAction(
  _prev: { error: string } | null,
  formData: FormData
) {
  const password = formData.get("password") as string;
  const success = await login(password);
  if (!success) return { error: "비밀번호가 올바르지 않습니다." };
  redirect("/admin");
}

export async function logoutAction() {
  await logout();
  redirect("/admin/login");
}

// --- Helpers ---
async function requireAuth() {
  if (!(await verifyAuth())) redirect("/admin/login");
}

async function handleImage(formData: FormData, fieldName = "image"): Promise<string | undefined> {
  const file = formData.get(fieldName) as File | null;
  if (file && file.size > 0) {
    return await uploadImage(file);
  }
  // Keep existing image if provided as hidden field
  const existing = formData.get("existingImage") as string | null;
  return existing || undefined;
}

function parseArray(value: string): string[] {
  return value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

// --- Members ---
export async function createMemberAction(formData: FormData) {
  await requireAuth();
  const image = await handleImage(formData);
  const id = crypto.randomUUID();
  await mutations.createMember({
    id,
    name: formData.get("name") as string,
    nameEn: formData.get("nameEn") as string,
    role: formData.get("role") as "professor" | "phd" | "master" | "undergraduate" | "alumni",
    position: formData.get("position") as string,
    email: (formData.get("email") as string) || undefined,
    image,
    research: parseArray(formData.get("research") as string || ""),
    homepage: (formData.get("homepage") as string) || undefined,
    graduationYear: formData.get("graduationYear") ? Number(formData.get("graduationYear")) : undefined,
  });
  revalidatePath("/admin/members");
  revalidatePath("/members");
  redirect("/admin/members");
}

export async function updateMemberAction(formData: FormData) {
  await requireAuth();
  const id = formData.get("id") as string;
  const image = await handleImage(formData);
  await mutations.updateMember(id, {
    name: formData.get("name") as string,
    nameEn: formData.get("nameEn") as string,
    role: formData.get("role") as "professor" | "phd" | "master" | "undergraduate" | "alumni",
    position: formData.get("position") as string,
    email: (formData.get("email") as string) || undefined,
    image,
    research: parseArray(formData.get("research") as string || ""),
    homepage: (formData.get("homepage") as string) || undefined,
    graduationYear: formData.get("graduationYear") ? Number(formData.get("graduationYear")) : undefined,
  });
  revalidatePath("/admin/members");
  revalidatePath("/members");
  redirect("/admin/members");
}

export async function deleteMemberAction(formData: FormData) {
  await requireAuth();
  const id = formData.get("id") as string;
  await mutations.deleteMember(id);
  revalidatePath("/admin/members");
  revalidatePath("/members");
  redirect("/admin/members");
}

// --- News ---
export async function createNewsAction(formData: FormData) {
  await requireAuth();
  const image = await handleImage(formData);
  const id = crypto.randomUUID();
  await mutations.createNews({
    id,
    title: formData.get("title") as string,
    date: formData.get("date") as string,
    content: formData.get("content") as string,
    category: formData.get("category") as "announcement" | "award" | "event" | "media",
    image,
  });
  revalidatePath("/admin/news");
  revalidatePath("/news");
  revalidatePath("/");
  redirect("/admin/news");
}

export async function updateNewsAction(formData: FormData) {
  await requireAuth();
  const id = formData.get("id") as string;
  const image = await handleImage(formData);
  await mutations.updateNews(id, {
    title: formData.get("title") as string,
    date: formData.get("date") as string,
    content: formData.get("content") as string,
    category: formData.get("category") as "announcement" | "award" | "event" | "media",
    image,
  });
  revalidatePath("/admin/news");
  revalidatePath("/news");
  revalidatePath("/");
  redirect("/admin/news");
}

export async function deleteNewsAction(formData: FormData) {
  await requireAuth();
  const id = formData.get("id") as string;
  await mutations.deleteNews(id);
  revalidatePath("/admin/news");
  revalidatePath("/news");
  revalidatePath("/");
  redirect("/admin/news");
}

// --- Publications ---
export async function createPublicationAction(formData: FormData) {
  await requireAuth();
  const id = crypto.randomUUID();
  await mutations.createPublication({
    id,
    title: formData.get("title") as string,
    authors: parseArray(formData.get("authors") as string || ""),
    venue: formData.get("venue") as string,
    year: Number(formData.get("year")),
    type: formData.get("type") as "journal" | "conference" | "workshop" | "thesis",
    link: (formData.get("link") as string) || undefined,
    doi: (formData.get("doi") as string) || undefined,
  });
  revalidatePath("/admin/publications");
  revalidatePath("/publications");
  revalidatePath("/");
  redirect("/admin/publications");
}

export async function updatePublicationAction(formData: FormData) {
  await requireAuth();
  const id = formData.get("id") as string;
  await mutations.updatePublication(id, {
    title: formData.get("title") as string,
    authors: parseArray(formData.get("authors") as string || ""),
    venue: formData.get("venue") as string,
    year: Number(formData.get("year")),
    type: formData.get("type") as "journal" | "conference" | "workshop" | "thesis",
    link: (formData.get("link") as string) || undefined,
    doi: (formData.get("doi") as string) || undefined,
  });
  revalidatePath("/admin/publications");
  revalidatePath("/publications");
  revalidatePath("/");
  redirect("/admin/publications");
}

export async function deletePublicationAction(formData: FormData) {
  await requireAuth();
  const id = formData.get("id") as string;
  await mutations.deletePublication(id);
  revalidatePath("/admin/publications");
  revalidatePath("/publications");
  revalidatePath("/");
  redirect("/admin/publications");
}

// --- Projects ---
export async function createProjectAction(formData: FormData) {
  await requireAuth();
  const image = await handleImage(formData);
  const id = crypto.randomUUID();
  await mutations.createProject({
    id,
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    period: formData.get("period") as string,
    status: formData.get("status") as "active" | "completed" | "upcoming",
    tags: parseArray(formData.get("tags") as string || ""),
    image,
  });
  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  redirect("/admin/projects");
}

export async function updateProjectAction(formData: FormData) {
  await requireAuth();
  const id = formData.get("id") as string;
  const image = await handleImage(formData);
  await mutations.updateProject(id, {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    period: formData.get("period") as string,
    status: formData.get("status") as "active" | "completed" | "upcoming",
    tags: parseArray(formData.get("tags") as string || ""),
    image,
  });
  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  redirect("/admin/projects");
}

export async function deleteProjectAction(formData: FormData) {
  await requireAuth();
  const id = formData.get("id") as string;
  await mutations.deleteProject(id);
  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  redirect("/admin/projects");
}

// --- Awards ---
export async function createAwardAction(formData: FormData) {
  await requireAuth();
  const image = await handleImage(formData);
  const id = crypto.randomUUID();
  await mutations.createAward({
    id,
    title: formData.get("title") as string,
    recipient: formData.get("recipient") as string,
    date: formData.get("date") as string,
    description: (formData.get("description") as string) || undefined,
    image,
  });
  revalidatePath("/admin/awards");
  revalidatePath("/awards");
  redirect("/admin/awards");
}

export async function updateAwardAction(formData: FormData) {
  await requireAuth();
  const id = formData.get("id") as string;
  const image = await handleImage(formData);
  await mutations.updateAward(id, {
    title: formData.get("title") as string,
    recipient: formData.get("recipient") as string,
    date: formData.get("date") as string,
    description: (formData.get("description") as string) || undefined,
    image,
  });
  revalidatePath("/admin/awards");
  revalidatePath("/awards");
  redirect("/admin/awards");
}

export async function deleteAwardAction(formData: FormData) {
  await requireAuth();
  const id = formData.get("id") as string;
  await mutations.deleteAward(id);
  revalidatePath("/admin/awards");
  revalidatePath("/awards");
  redirect("/admin/awards");
}
