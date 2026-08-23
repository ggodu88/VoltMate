import React, { useState, useEffect } from "react";
import { X, Building2, Save } from "lucide-react";
import { ConstructionPhase, PHASE_CONFIG, ProjectSite } from "../types";
import { useTheme } from "../context/ThemeContext";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (project: ProjectSite) => void;
  editingProject?: ProjectSite | null;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingProject,
}) => {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState<Partial<ProjectSite>>({
    name: "",
    code: "",
    client: "",
    contractor: "",
    siteManager: "",
    supervisor: "",
    location: "",
    startDate: new Date().toISOString().split("T")[0],
    targetDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    contractPower: "특고압 22.9kV 1,500kVA",
    currentPhase: ConstructionPhase.INITIATION,
    progressPercent: 0,
    status: "IN_PROGRESS",
    notes: "",
  });

  useEffect(() => {
    if (editingProject) {
      setFormData(editingProject);
    } else {
      const codeRandom = `ELEC-2026-${Math.floor(100 + Math.random() * 900)}`;
      setFormData({
        name: "",
        code: codeRandom,
        client: "",
        contractor: "",
        siteManager: "",
        supervisor: "",
        location: "",
        startDate: new Date().toISOString().split("T")[0],
        targetDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        contractPower: "특고압 22.9kV 1,500kVA",
        currentPhase: ConstructionPhase.INITIATION,
        progressPercent: 10,
        status: "IN_PROGRESS",
        notes: "",
      });
    }
  }, [editingProject, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name?.trim()) {
      alert("공사명을 입력해주세요.");
      return;
    }

    const newProject: ProjectSite = {
      id: editingProject?.id || `PROJ-${Date.now()}`,
      name: formData.name || "전기공사 프로젝트",
      code: formData.code || `ELEC-${Date.now().toString().slice(-4)}`,
      client: formData.client || "발주처",
      contractor: formData.contractor || "전기시공사",
      siteManager: formData.siteManager || "현장대리인",
      supervisor: formData.supervisor || "책임감리원",
      location: formData.location || "서울특별시",
      startDate: formData.startDate || new Date().toISOString().split("T")[0],
      targetDate: formData.targetDate || new Date().toISOString().split("T")[0],
      contractPower: formData.contractPower || "저압 380V/220V",
      currentPhase: formData.currentPhase || ConstructionPhase.INITIATION,
      progressPercent: Number(formData.progressPercent) || 0,
      status: formData.status || "IN_PROGRESS",
      notes: formData.notes || "",
      createdAt: editingProject?.createdAt || new Date().toISOString(),
    };

    onSave(newProject);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div
        className={`rounded-sm shadow-2xl border w-full max-w-2xl overflow-hidden my-8 transition-colors ${
          isDark
            ? "bg-[#1E293B] border-slate-700 text-slate-200"
            : "bg-white border-slate-200 text-slate-900"
        }`}
      >
        {/* Modal Header */}
        <div
          className={`px-6 py-4 flex items-center justify-between border-b ${
            isDark
              ? "bg-slate-900/90 text-white border-slate-700"
              : "bg-slate-50 text-slate-900 border-slate-200"
          }`}
        >
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-sm bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
              <Building2 className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sm uppercase tracking-wider font-mono">
              {editingProject ? "공사 프로젝트 정보 수정" : "새 전기공사 프로젝트 등록"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className={`p-1 rounded-sm transition-colors ${
              isDark
                ? "text-slate-400 hover:text-white hover:bg-slate-800"
                : "text-slate-500 hover:text-slate-900 hover:bg-slate-200"
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Project Name & Code */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label
                className={`block text-[11px] font-bold uppercase font-mono mb-1 ${
                  isDark ? "text-slate-400" : "text-slate-600"
                }`}
              >
                공사명 (PROJECT NAME) <span className="text-amber-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="예: 강남 테크타워 신축 전기설비공사"
                value={formData.name || ""}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full px-3 py-2 text-xs border rounded-sm focus:outline-none focus:border-amber-400 font-medium ${
                  isDark
                    ? "bg-slate-900 border-slate-700 text-slate-100"
                    : "bg-slate-50 border-slate-300 text-slate-900"
                }`}
              />
            </div>

            <div>
              <label
                className={`block text-[11px] font-bold uppercase font-mono mb-1 ${
                  isDark ? "text-slate-400" : "text-slate-600"
                }`}
              >
                관리번호 (CODE)
              </label>
              <input
                type="text"
                placeholder="ELEC-2026-01"
                value={formData.code || ""}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                className={`w-full px-3 py-2 text-xs border rounded-sm focus:outline-none focus:border-amber-400 font-mono ${
                  isDark
                    ? "bg-slate-900 border-slate-700 text-amber-300"
                    : "bg-slate-50 border-slate-300 text-amber-700 font-bold"
                }`}
              />
            </div>
          </div>

          {/* Location & Power */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                className={`block text-[11px] font-bold uppercase font-mono mb-1 ${
                  isDark ? "text-slate-400" : "text-slate-600"
                }`}
              >
                현장 위치 (LOCATION)
              </label>
              <input
                type="text"
                placeholder="서울특별시 강남구 테헤란로 123"
                value={formData.location || ""}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className={`w-full px-3 py-2 text-xs border rounded-sm focus:outline-none focus:border-amber-400 ${
                  isDark
                    ? "bg-slate-900 border-slate-700 text-slate-100"
                    : "bg-slate-50 border-slate-300 text-slate-900"
                }`}
              />
            </div>

            <div>
              <label
                className={`block text-[11px] font-bold uppercase font-mono mb-1 ${
                  isDark ? "text-slate-400" : "text-slate-600"
                }`}
              >
                수전설비 용량 (CAPACITY)
              </label>
              <input
                type="text"
                placeholder="예: 특고압 22.9kV 2,500kVA (변압기 2대)"
                value={formData.contractPower || ""}
                onChange={(e) => setFormData({ ...formData, contractPower: e.target.value })}
                className={`w-full px-3 py-2 text-xs border rounded-sm focus:outline-none focus:border-amber-400 ${
                  isDark
                    ? "bg-slate-900 border-slate-700 text-slate-100"
                    : "bg-slate-50 border-slate-300 text-slate-900"
                }`}
              />
            </div>
          </div>

          {/* Client & Contractor */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                className={`block text-[11px] font-bold uppercase font-mono mb-1 ${
                  isDark ? "text-slate-400" : "text-slate-600"
                }`}
              >
                발주처 / 시행사 (CLIENT)
              </label>
              <input
                type="text"
                placeholder="예: 한국자산신탁 / 대한건설"
                value={formData.client || ""}
                onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                className={`w-full px-3 py-2 text-xs border rounded-sm focus:outline-none focus:border-amber-400 ${
                  isDark
                    ? "bg-slate-900 border-slate-700 text-slate-100"
                    : "bg-slate-50 border-slate-300 text-slate-900"
                }`}
              />
            </div>

            <div>
              <label
                className={`block text-[11px] font-bold uppercase font-mono mb-1 ${
                  isDark ? "text-slate-400" : "text-slate-600"
                }`}
              >
                전기시공사 (CONTRACTOR)
              </label>
              <input
                type="text"
                placeholder="예: (주)동일전력이엔씨"
                value={formData.contractor || ""}
                onChange={(e) => setFormData({ ...formData, contractor: e.target.value })}
                className={`w-full px-3 py-2 text-xs border rounded-sm focus:outline-none focus:border-amber-400 ${
                  isDark
                    ? "bg-slate-900 border-slate-700 text-slate-100"
                    : "bg-slate-50 border-slate-300 text-slate-900"
                }`}
              />
            </div>
          </div>

          {/* Site Manager & Supervisor */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                className={`block text-[11px] font-bold uppercase font-mono mb-1 ${
                  isDark ? "text-slate-400" : "text-slate-600"
                }`}
              >
                현장대리인 (SITE MANAGER)
              </label>
              <input
                type="text"
                placeholder="예: 홍길동 (특급기술인)"
                value={formData.siteManager || ""}
                onChange={(e) => setFormData({ ...formData, siteManager: e.target.value })}
                className={`w-full px-3 py-2 text-xs border rounded-sm focus:outline-none focus:border-amber-400 ${
                  isDark
                    ? "bg-slate-900 border-slate-700 text-slate-100"
                    : "bg-slate-50 border-slate-300 text-slate-900"
                }`}
              />
            </div>

            <div>
              <label
                className={`block text-[11px] font-bold uppercase font-mono mb-1 ${
                  isDark ? "text-slate-400" : "text-slate-600"
                }`}
              >
                책임감리원 (SUPERVISOR)
              </label>
              <input
                type="text"
                placeholder="예: 이몽룡 (전기기술사/수석감리)"
                value={formData.supervisor || ""}
                onChange={(e) => setFormData({ ...formData, supervisor: e.target.value })}
                className={`w-full px-3 py-2 text-xs border rounded-sm focus:outline-none focus:border-amber-400 ${
                  isDark
                    ? "bg-slate-900 border-slate-700 text-slate-100"
                    : "bg-slate-50 border-slate-300 text-slate-900"
                }`}
              />
            </div>
          </div>

          {/* Dates & Phase */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                className={`block text-[11px] font-bold uppercase font-mono mb-1 ${
                  isDark ? "text-slate-400" : "text-slate-600"
                }`}
              >
                착공일자 (START DATE)
              </label>
              <input
                type="date"
                value={formData.startDate || ""}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className={`w-full px-3 py-2 text-xs border rounded-sm focus:outline-none focus:border-amber-400 font-mono ${
                  isDark
                    ? "bg-slate-900 border-slate-700 text-slate-100"
                    : "bg-slate-50 border-slate-300 text-slate-900"
                }`}
              />
            </div>

            <div>
              <label
                className={`block text-[11px] font-bold uppercase font-mono mb-1 ${
                  isDark ? "text-slate-400" : "text-slate-600"
                }`}
              >
                준공예정일 (TARGET DATE)
              </label>
              <input
                type="date"
                value={formData.targetDate || ""}
                onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
                className={`w-full px-3 py-2 text-xs border rounded-sm focus:outline-none focus:border-amber-400 font-mono ${
                  isDark
                    ? "bg-slate-900 border-slate-700 text-slate-100"
                    : "bg-slate-50 border-slate-300 text-slate-900"
                }`}
              />
            </div>
          </div>

          {/* Current Phase & Progress */}
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 gap-4 p-3.5 rounded-sm border ${
              isDark
                ? "bg-slate-900/80 border-slate-700"
                : "bg-slate-50 border-slate-200"
            }`}
          >
            <div>
              <label
                className={`block text-[11px] font-bold uppercase font-mono mb-1 ${
                  isDark ? "text-slate-400" : "text-slate-600"
                }`}
              >
                현재 공정 단계 (PHASE)
              </label>
              <select
                value={formData.currentPhase}
                onChange={(e) =>
                  setFormData({ ...formData, currentPhase: e.target.value as ConstructionPhase })
                }
                className={`w-full px-3 py-2 text-xs border rounded-sm font-bold focus:outline-none focus:border-amber-400 font-mono ${
                  isDark
                    ? "bg-slate-950 border-slate-700 text-amber-300"
                    : "bg-white border-slate-300 text-amber-800"
                }`}
              >
                {Object.entries(PHASE_CONFIG).map(([key, config]) => (
                  <option key={key} value={key}>
                    {config.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                className={`block text-[11px] font-bold uppercase font-mono mb-1 ${
                  isDark ? "text-slate-400" : "text-slate-600"
                }`}
              >
                종합 공정률:{" "}
                <span className="text-amber-600 dark:text-amber-400 font-black">
                  {formData.progressPercent}%
                </span>
              </label>
              <input
                type="range"
                min={0}
                max={100}
                value={formData.progressPercent || 0}
                onChange={(e) => setFormData({ ...formData, progressPercent: Number(e.target.value) })}
                className="w-full accent-amber-400 mt-2"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label
              className={`block text-[11px] font-bold uppercase font-mono mb-1 ${
                isDark ? "text-slate-400" : "text-slate-600"
              }`}
            >
              현장 특이사항 및 중점 관리사항 (NOTES)
            </label>
            <textarea
              rows={2}
              placeholder="예: 지하 암반 굴착 접지저항 확보 필요, KESCO 사용전검사 조기 신청 예정 등"
              value={formData.notes || ""}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className={`w-full px-3 py-2 text-xs border rounded-sm focus:outline-none focus:border-amber-400 ${
                isDark
                  ? "bg-slate-900 border-slate-700 text-slate-100"
                  : "bg-slate-50 border-slate-300 text-slate-900"
              }`}
            />
          </div>

          {/* Form Actions */}
          <div
            className={`flex items-center justify-end gap-3 pt-4 border-t font-mono ${
              isDark ? "border-slate-700" : "border-slate-200"
            }`}
          >
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2.5 rounded-sm border font-bold text-xs uppercase ${
                isDark
                  ? "border-slate-700 text-slate-400 hover:bg-slate-800"
                  : "border-slate-300 text-slate-600 hover:bg-slate-100"
              }`}
            >
              취소
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 px-5 py-2.5 rounded-sm font-bold text-xs shadow-sm shadow-amber-400/20 active:scale-95 transition-all uppercase"
            >
              <Save className="w-4 h-4" />
              <span>{editingProject ? "변경사항 저장" : "새 프로젝트 생성"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
