import React, { useState } from "react";
import {
  Plus,
  Building2,
  MapPin,
  Calendar,
  Zap,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  Search,
  User,
  ShieldCheck,
} from "lucide-react";
import { ConstructionPhase, PHASE_CONFIG, ProjectSite } from "../types";
import { useTheme } from "../context/ThemeContext";

interface ProjectListProps {
  projects: ProjectSite[];
  selectedProjectId: string;
  onSelectProject: (projectId: string) => void;
  onOpenNewProjectModal: () => void;
  onOpenEditProjectModal: (project: ProjectSite) => void;
}

export const ProjectList: React.FC<ProjectListProps> = ({
  projects,
  selectedProjectId,
  onSelectProject,
  onOpenNewProjectModal,
  onOpenEditProjectModal,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [phaseFilter, setPhaseFilter] = useState<string>("ALL");
  const { isDark } = useTheme();

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.contractor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPhase = phaseFilter === "ALL" || p.currentPhase === phaseFilter;

    return matchesSearch && matchesPhase;
  });

  return (
    <div className="space-y-6 pb-24 md:pb-12">
      {/* Top Banner Header */}
      <div
        className={`p-6 md:p-8 relative overflow-hidden rounded-sm border transition-colors shadow-sm ${
          isDark
            ? "bg-[#1E293B] border-slate-700 text-slate-100"
            : "bg-white border-slate-200 text-slate-900 shadow-slate-200/50"
        }`}
      >
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            {/* Single Line Header Meta */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-block px-2.5 py-0.5 bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider rounded-sm">
                ENGINEERING CONTROL
              </span>
              <span
                className={`text-xs font-mono font-semibold px-2 py-0.5 rounded-sm border ${
                  isDark
                    ? "bg-slate-900/80 text-slate-300 border-slate-700"
                    : "bg-slate-100 text-slate-700 border-slate-300"
                }`}
              >
                등록 현장 {projects.length}개소
              </span>
            </div>

            <h1
              className={`text-2xl md:text-3xl font-black tracking-tight uppercase ${
                isDark ? "text-white" : "text-slate-950"
              }`}
            >
              프로젝트 관리
            </h1>

            <p
              className={`text-xs sm:text-sm max-w-2xl leading-relaxed ${
                isDark ? "text-slate-300" : "text-slate-600"
              }`}
            >
              현장관리 및 12단계 공정별 시공방법을 지원합니다.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              id="create-project-btn"
              onClick={onOpenNewProjectModal}
              className="flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 px-5 py-3 rounded-sm font-black text-xs uppercase tracking-wider shadow-md shadow-amber-400/20 active:scale-95 transition-all w-full md:w-auto shrink-0"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>새 공사 프로젝트 등록</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div
        className={`flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between p-4 rounded-sm border transition-colors ${
          isDark
            ? "bg-[#1E293B] border-slate-700"
            : "bg-white border-slate-200 shadow-sm"
        }`}
      >
        <div className="relative flex-1">
          <Search
            className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${
              isDark ? "text-slate-400" : "text-slate-500"
            }`}
          />
          <input
            id="search-project-input"
            type="text"
            placeholder="공사명, 관리번호, 발주처, 시공사, 현장위치 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 text-xs border rounded-sm focus:outline-none focus:border-amber-400 font-sans transition-colors ${
              isDark
                ? "bg-slate-900/90 border-slate-700 text-slate-100 placeholder-slate-500"
                : "bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400"
            }`}
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            id="phase-filter-select"
            value={phaseFilter}
            onChange={(e) => setPhaseFilter(e.target.value)}
            className={`text-xs border font-medium px-3 py-2 rounded-sm focus:outline-none focus:border-amber-400 transition-colors ${
              isDark
                ? "bg-slate-900/90 border-slate-700 text-slate-200"
                : "bg-slate-50 border-slate-300 text-slate-800"
            }`}
          >
            <option value="ALL">전체 공정 보기</option>
            {Object.entries(PHASE_CONFIG).map(([key, config]) => (
              <option key={key} value={key}>
                {config.shortName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div
          className={`rounded-sm p-12 text-center border shadow-sm ${
            isDark
              ? "bg-[#1E293B] border-slate-700 text-slate-300"
              : "bg-white border-slate-200 text-slate-700"
          }`}
        >
          <Building2 className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h3
            className={`text-base font-bold uppercase ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            조건에 맞는 공사 프로젝트가 없습니다
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            새 프로젝트를 등록하거나 검색 필터를 재설정하세요.
          </p>
          <button
            onClick={onOpenNewProjectModal}
            className="mt-4 inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 px-4 py-2 rounded-sm font-bold text-xs uppercase"
          >
            <Plus className="w-4 h-4 stroke-[3]" /> 새 프로젝트 등록
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProjects.map((project) => {
            const phaseConfig = PHASE_CONFIG[project.currentPhase];
            const isSelected = project.id === selectedProjectId;

            return (
              <div
                key={project.id}
                id={`project-card-${project.id}`}
                className={`rounded-sm p-5 border transition-all duration-150 relative flex flex-col justify-between shadow-md ${
                  isSelected
                    ? "border-amber-400 ring-2 ring-amber-400 shadow-amber-400/10"
                    : isDark
                    ? "bg-[#1E293B] border-slate-700 hover:border-slate-500"
                    : "bg-white border-slate-200 hover:border-slate-400"
                }`}
              >
                <div>
                  {/* Top Phase Badge & Code (Single Line) */}
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm text-[10px] font-bold border uppercase tracking-wider ${phaseConfig.badgeBg}`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {phaseConfig.shortName}
                    </span>

                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-sm border ${
                        isDark
                          ? "bg-slate-900 text-slate-300 border-slate-700"
                          : "bg-slate-100 text-slate-700 border-slate-200"
                      }`}
                    >
                      {project.code}
                    </span>
                  </div>

                  {/* Project Title */}
                  <h2
                    className={`text-base font-bold leading-snug tracking-tight mb-2.5 hover:text-amber-500 transition-colors ${
                      isDark ? "text-white" : "text-slate-950"
                    }`}
                  >
                    {project.name}
                  </h2>

                  {/* Single Line Clean Summary Meta Row */}
                  <div
                    className={`text-[11px] p-2.5 rounded-sm border mb-3 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono ${
                      isDark
                        ? "bg-slate-900/60 border-slate-800 text-slate-300"
                        : "bg-slate-50 border-slate-200 text-slate-700"
                    }`}
                  >
                    <span className="flex items-center gap-1 font-semibold text-amber-600 dark:text-amber-300 whitespace-nowrap">
                      <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      {project.contractPower}
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="flex items-center gap-1 text-slate-600 dark:text-slate-300 truncate max-w-[170px] whitespace-nowrap">
                      <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                      {project.location}
                    </span>
                  </div>

                  {/* Date & Client Single Line */}
                  <div
                    className={`text-[11px] font-mono flex items-center justify-between gap-1 mb-3 px-1 ${
                      isDark ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    <span className="flex items-center gap-1 whitespace-nowrap">
                      <Calendar className="w-3 h-3 text-slate-400 shrink-0" />
                      {project.startDate} ~ {project.targetDate}
                    </span>
                    <span className="truncate max-w-[110px] text-right font-medium">
                      {project.client}
                    </span>
                  </div>

                  {/* Progress Bar with High Visibility */}
                  <div
                    className={`p-2.5 rounded-sm border mb-3.5 ${
                      isDark
                        ? "bg-slate-900/80 border-slate-800"
                        : "bg-slate-100 border-slate-200"
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] font-semibold mb-1 uppercase font-mono">
                      <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1 tracking-wider">
                        <TrendingUp className="w-3 h-3 text-amber-500" />
                        진척률
                      </span>
                      <span className="text-amber-600 dark:text-amber-400 font-bold">
                        {project.progressPercent}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-300 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-400 rounded-full transition-all duration-300"
                        style={{ width: `${project.progressPercent}%` }}
                      />
                    </div>
                  </div>

                  {/* Contractor, Manager & Supervisor in Single Organized Row */}
                  <div
                    className={`text-[11px] pt-1 pb-3 mb-3 border-b flex items-center justify-between gap-2 font-mono ${
                      isDark
                        ? "border-slate-700/80 text-slate-400"
                        : "border-slate-200 text-slate-600"
                    }`}
                  >
                    <span className="truncate max-w-[130px]" title={project.contractor}>
                      시공: <strong className="text-slate-800 dark:text-slate-200">{project.contractor}</strong>
                    </span>
                    <span className="text-right whitespace-nowrap">
                      소장: <strong className="text-slate-800 dark:text-slate-200">{project.siteManager.split(" ")[0]}</strong> • 감리: <strong className="text-slate-800 dark:text-slate-200">{project.supervisor.split(" ")[0]}</strong>
                    </span>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    id={`manage-project-btn-${project.id}`}
                    onClick={() => onSelectProject(project.id)}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 py-2.5 px-3 rounded-sm font-black text-xs uppercase tracking-wider active:scale-95 transition-all shadow-sm"
                  >
                    <span>공정별 시공방법 확인</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>

                  <button
                    id={`edit-project-btn-${project.id}`}
                    onClick={() => onOpenEditProjectModal(project)}
                    className={`px-3 py-2.5 rounded-sm border text-xs font-bold transition-colors uppercase font-mono ${
                      isDark
                        ? "border-slate-700 hover:bg-slate-800 text-slate-300"
                        : "border-slate-300 hover:bg-slate-100 text-slate-700"
                    }`}
                    title="프로젝트 정보 수정"
                  >
                    수정
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
