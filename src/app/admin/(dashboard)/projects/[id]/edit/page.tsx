import { notFound } from "next/navigation";
import { getPartnerLogoLibrary, getProjectById } from "@/lib/db/queries";
import { updateProjectAction } from "../../../../actions";
import { FileInput } from "../../../../_components/FileInput";
import { PartnerLogoField } from "../../../../_components/PartnerLogoField";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [project, library] = await Promise.all([
    getProjectById(id),
    getPartnerLogoLibrary(),
  ]);
  if (!project) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-secondary-800 mb-6">Edit Project</h1>
      <form action={updateProjectAction} className="max-w-2xl bg-white rounded-lg shadow p-6 space-y-4">
        <input type="hidden" name="id" value={project.id} />
        <input type="hidden" name="existingImage" value={project.image || ""} />
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">제목 (Title)</label>
          <input name="title" required defaultValue={project.title} className="w-full px-3 py-2 border border-secondary-300 rounded-md text-sm" />
        </div>
        <PartnerLogoField
          library={library}
          initialPartner={project.partner}
          initialLogoUrl={project.partnerLogo}
        />
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">부제 (Subtitle)</label>
          <input name="subtitle" defaultValue={project.subtitle || ""} placeholder="예: 보복 심리와 라이브 커머스" className="w-full px-3 py-2 border border-secondary-300 rounded-md text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">프로젝트 목적 (Purpose)</label>
          <textarea name="purpose" rows={3} defaultValue={project.purpose || ""} placeholder="이 프로젝트가 무엇을 달성하고자 하는지" className="w-full px-3 py-2 border border-secondary-300 rounded-md text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">프로젝트 내용 (Description)</label>
          <textarea name="description" required rows={8} defaultValue={project.description} className="w-full px-3 py-2 border border-secondary-300 rounded-md text-sm font-mono" />
          <p className="text-xs text-secondary-400 mt-1">줄바꿈은 그대로 유지됩니다. (1), (2), (3) 형식 권장.</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">프로젝트 기간 (Period)</label>
            <input name="period" required defaultValue={project.period} className="w-full px-3 py-2 border border-secondary-300 rounded-md text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">상태 (Status)</label>
            <select name="status" required defaultValue={project.status} className="w-full px-3 py-2 border border-secondary-300 rounded-md text-sm">
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="upcoming">Upcoming</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">태그 (선택, 쉼표 구분)</label>
          <input name="tags" defaultValue={project.tags.join(", ")} className="w-full px-3 py-2 border border-secondary-300 rounded-md text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">대표 이미지 (선택)</label>
          <FileInput name="image" label="이미지 업로드" existingUrl={project.image} />
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit" className="px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-md hover:bg-primary-700">Save</button>
          <a href="/admin/projects" className="px-4 py-2 bg-secondary-100 text-secondary-700 text-sm font-medium rounded-md hover:bg-secondary-200">Cancel</a>
        </div>
      </form>
    </div>
  );
}
