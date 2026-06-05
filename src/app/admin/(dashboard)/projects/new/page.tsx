import { createProjectAction } from "../../../actions";

export default function NewProjectPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-secondary-800 mb-6">Add Project</h1>
      <form action={createProjectAction} className="max-w-2xl bg-white rounded-lg shadow p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">제목 (Title)</label>
          <input name="title" required className="w-full px-3 py-2 border border-secondary-300 rounded-md text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">협업 기관 (Partner)</label>
          <input name="partner" placeholder="삼성전자 / Naver / KAKAO 등" className="w-full px-3 py-2 border border-secondary-300 rounded-md text-sm" />
          <p className="text-xs text-secondary-400 mt-1">제목 옆에 “with ___” 형태로 표시됩니다.</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">파트너 로고 (선택)</label>
          <input name="partnerLogo" type="file" accept="image/*" className="w-full text-sm" />
          <p className="text-xs text-secondary-400 mt-1">없으면 비워두세요. 텍스트만 표시됩니다.</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">부제 (Subtitle)</label>
          <input name="subtitle" placeholder="예: 보복 심리와 라이브 커머스" className="w-full px-3 py-2 border border-secondary-300 rounded-md text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">프로젝트 목적 (Purpose)</label>
          <textarea name="purpose" rows={3} placeholder="이 프로젝트가 무엇을 달성하고자 하는지" className="w-full px-3 py-2 border border-secondary-300 rounded-md text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">프로젝트 내용 (Description)</label>
          <textarea name="description" required rows={8} placeholder={"(1) ...\n(2) ...\n(3) ..."} className="w-full px-3 py-2 border border-secondary-300 rounded-md text-sm font-mono" />
          <p className="text-xs text-secondary-400 mt-1">줄바꿈은 그대로 유지됩니다. (1), (2), (3) 형식 권장.</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">프로젝트 기간 (Period)</label>
            <input name="period" required placeholder="2024.06 - 2025.03" className="w-full px-3 py-2 border border-secondary-300 rounded-md text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">상태 (Status)</label>
            <select name="status" required defaultValue="completed" className="w-full px-3 py-2 border border-secondary-300 rounded-md text-sm">
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="upcoming">Upcoming</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">태그 (선택, 쉼표 구분)</label>
          <input name="tags" placeholder="HCI, AI, UX" className="w-full px-3 py-2 border border-secondary-300 rounded-md text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">대표 이미지 (선택)</label>
          <input name="image" type="file" accept="image/*" className="w-full text-sm" />
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit" className="px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-md hover:bg-primary-700">Create</button>
          <a href="/admin/projects" className="px-4 py-2 bg-secondary-100 text-secondary-700 text-sm font-medium rounded-md hover:bg-secondary-200">Cancel</a>
        </div>
      </form>
    </div>
  );
}
