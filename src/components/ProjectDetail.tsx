import React, { useState, useRef } from "react";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Zap,
  HardHat,
  ChevronRight,
  Bot,
  UserCheck,
  CheckCircle2,
} from "lucide-react";
import {
  ConstructionLog,
  ConstructionMethod,
  ConstructionPhase,
  PHASE_CONFIG,
  ProjectSite,
} from "../types";
import { useTheme } from "../context/ThemeContext";

interface ProjectDetailProps {
  project: ProjectSite;
  logs: ConstructionLog[];
  methods: ConstructionMethod[];
  onBack: () => void;
  onOpenLogModal: (log?: ConstructionLog) => void;
  onOpenChecklistModal?: (phase: ConstructionPhase) => void;
  onOpenMethodDetail: (method: ConstructionMethod) => void;
  onPrintReport?: (project: ProjectSite, logs: ConstructionLog[]) => void;
  onUpdateProjectPhase: (newPhase: ConstructionPhase, newProgress: number) => void;
  onOpenAiConsultant: (context?: string) => void;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({
  project,
  methods,
  onBack,
  onOpenMethodDetail,
  onUpdateProjectPhase,
  onOpenAiConsultant,
}) => {
  const { isDark } = useTheme();
  const [activePhaseTab, setActivePhaseTab] = useState<ConstructionPhase>(
    project.currentPhase
  );
  const methodsSectionRef = useRef<HTMLDivElement>(null);

  const phaseMethods = methods.filter((m) => m.phase === activePhaseTab);
  const currentPhaseConfig = PHASE_CONFIG[project.currentPhase];
  const activeTabConfig = PHASE_CONFIG[activePhaseTab];

  const scrollToMethods = () => {
    setTimeout(() => {
      if (methodsSectionRef.current) {
        // Scroll so the construction method section header is directly at the top
        const yOffset = -70; // Offset for sticky top navbar height
        const elementPosition = methodsSectionRef.current.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset + yOffset;
        window.scrollTo({ top: Math.max(0, offsetPosition), behavior: "smooth" });
      }
    }, 50);
  };

  const handleSelectPhase = (phase: ConstructionPhase) => {
    setActivePhaseTab(phase);
    scrollToMethods();
  };

  return (
    <div className="space-y-6 pb-24 md:pb-12">
      {/* Top Breadcrumb & Header */}
      <div
        className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-sm border shadow-sm transition-colors ${
          isDark
            ? "bg-[#1E293B] border-slate-700 text-slate-100"
            : "bg-white border-slate-200 text-slate-900 shadow-slate-200/50"
        }`}
      >
        <div className="flex items-center gap-3">
          <button
            id="back-to-projects-btn"
            onClick={onBack}
            className={`p-2 rounded-sm border transition-colors ${
              isDark
                ? "border-slate-700 hover:bg-slate-800 text-slate-300"
                : "border-slate-300 hover:bg-slate-100 text-slate-700"
            }`}
            title="프로젝트 목록으로 돌아가기"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            {/* Project Name on Top */}
            <h1
              className={`text-lg sm:text-xl font-bold tracking-tight ${
                isDark ? "text-white" : "text-slate-950"
              }`}
            >
              {project.name}
            </h1>
            {/* Project Info below */}
            <div className="flex items-center gap-2 flex-wrap mt-1">
              <span
                className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-sm border ${
                  isDark
                    ? "bg-slate-900 border-slate-700 text-amber-400"
                    : "bg-slate-100 border-slate-300 text-amber-700"
                }`}
              >
                {project.code}
              </span>
              <span
                className={`px-2 py-0.5 rounded-sm text-[10px] font-bold border uppercase tracking-wider ${currentPhaseConfig.badgeBg}`}
              >
                {currentPhaseConfig.shortName}
              </span>
              <span
                className={`text-xs font-mono ${
                  isDark ? "text-slate-400" : "text-slate-500"
                }`}
              >
                • {project.location} • {project.contractPower}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Project Overview Card (Single-line Compact Grid) */}
      <div
        className={`rounded-sm p-5 border shadow-sm transition-colors ${
          isDark
            ? "bg-[#1E293B] border-slate-700 text-slate-200"
            : "bg-white border-slate-200 text-slate-800"
        }`}
      >
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 divide-y sm:divide-y-0 sm:divide-x text-xs ${
            isDark ? "divide-slate-700" : "divide-slate-200"
          }`}
        >
          <div className="space-y-1 pb-3 sm:pb-0 sm:pr-4">
            <span
              className={`text-[10px] uppercase font-mono block ${
                isDark ? "text-slate-400" : "text-slate-500"
              }`}
            >
              현장위치 & 수전용량
            </span>
            <p className="font-semibold flex items-center gap-1.5 truncate">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              {project.location}
            </p>
            <p className="font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1.5 font-mono">
              <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              {project.contractPower}
            </p>
          </div>

          <div className="space-y-1 py-3 sm:py-0 sm:px-4">
            <span
              className={`text-[10px] uppercase font-mono block ${
                isDark ? "text-slate-400" : "text-slate-500"
              }`}
            >
              공사기간 & 진척도
            </span>
            <p className="font-medium flex items-center gap-1.5 font-mono text-[11px]">
              <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              {project.startDate} ~ {project.targetDate}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <div
                className={`flex-1 h-1.5 rounded-full overflow-hidden ${
                  isDark ? "bg-slate-800" : "bg-slate-200"
                }`}
              >
                <div
                  className="h-full bg-amber-400 rounded-full"
                  style={{ width: `${project.progressPercent}%` }}
                />
              </div>
              <span className="font-bold text-amber-600 dark:text-amber-400 font-mono text-xs">
                {project.progressPercent}%
              </span>
            </div>
          </div>

          <div className="space-y-1 py-3 sm:py-0 sm:px-4">
            <span
              className={`text-[10px] uppercase font-mono block ${
                isDark ? "text-slate-400" : "text-slate-500"
              }`}
            >
              시공사 & 현장대리인
            </span>
            <p className="font-semibold truncate">
              {project.contractor}
            </p>
            <p className="flex items-center gap-1 text-[11px] font-mono">
              <HardHat className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              대리인: {project.siteManager}
            </p>
          </div>

          <div className="space-y-1 pt-3 sm:pt-0 sm:pl-4">
            <span
              className={`text-[10px] uppercase font-mono block ${
                isDark ? "text-slate-400" : "text-slate-500"
              }`}
            >
              발주처 & 책임감리원
            </span>
            <p className="font-semibold truncate">
              {project.client}
            </p>
            <p className="flex items-center gap-1 text-[11px] font-mono">
              <UserCheck className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              감리원: {project.supervisor}
            </p>
          </div>
        </div>
      </div>

      {/* 12-Phase Milestone Workflow Timeline */}
      <div
        className={`rounded-sm p-5 border shadow-sm transition-colors ${
          isDark
            ? "bg-[#1E293B] border-slate-700 text-slate-200"
            : "bg-white border-slate-200 text-slate-800"
        }`}
      >
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div>
            <h2
              className={`text-sm font-bold flex items-center gap-2 uppercase tracking-wider ${
                isDark ? "text-white" : "text-slate-950"
              }`}
            >
              <span>착공부터 준공까지 12단계 공정 체계 (KEC·17대 법령 기준)</span>
            </h2>
            <p className={`text-xs mt-0.5 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
              단계를 클릭하여 공종별 시공방법을 확인하세요.
            </p>
          </div>
          <button
            onClick={() => onOpenAiConsultant(`${activeTabConfig.label} 시공 기준 및 KEC 규정`)}
            className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-sm font-bold border transition-all uppercase ${
              isDark
                ? "bg-slate-800 hover:bg-slate-700 text-amber-300 border-slate-600"
                : "bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-300"
            }`}
          >
            <Bot className="w-3.5 h-3.5 text-amber-500" />
            <span>이 공정 KEC AI 자문</span>
          </button>
        </div>

        {/* Stepper Tabs - Single Line per Phase */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {Object.entries(PHASE_CONFIG).map(([phaseKey, config]) => {
            const phase = phaseKey as ConstructionPhase;
            const isCurrentActive = project.currentPhase === phase;
            const isTabSelected = activePhaseTab === phase;
            const isPassed = config.stepNumber <= currentPhaseConfig.stepNumber;

            return (
              <div
                key={phase}
                id={`phase-step-${phase}`}
                onClick={() => handleSelectPhase(phase)}
                className={`px-2.5 py-2 rounded-sm cursor-pointer border transition-all text-left relative flex flex-col justify-between ${
                  isTabSelected
                    ? "bg-amber-400 text-slate-950 border-amber-400 shadow-md font-bold"
                    : isCurrentActive
                    ? isDark
                    ? "bg-slate-800 border-amber-400/60 text-amber-300"
                    : "bg-amber-50 border-amber-400 text-amber-900"
                    : isDark
                    ? "bg-slate-900/60 border-slate-700 hover:bg-slate-800 text-slate-300"
                    : "bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700"
                }`}
              >
                {/* Single Line: Step Number + Phase Name + Status Badge */}
                <div className="flex items-center justify-between gap-1.5 min-w-0">
                  <div className="flex items-center gap-1.5 min-w-0 flex-1">
                    <span
                      className={`w-4 h-4 shrink-0 rounded-xs flex items-center justify-center text-[10px] font-mono font-bold ${
                        isTabSelected
                          ? "bg-slate-950 text-amber-300"
                          : isPassed
                          ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30"
                          : isDark
                          ? "bg-slate-800 text-slate-400"
                          : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      {config.stepNumber}
                    </span>
                    <h4 className="font-bold text-xs truncate leading-none">
                      {config.shortName}
                    </h4>
                  </div>

                  {isCurrentActive && (
                    <span
                      className={`text-[9px] font-black px-1 py-0.2 rounded-xs uppercase shrink-0 whitespace-nowrap ${
                        isTabSelected
                          ? "bg-slate-950 text-amber-300"
                          : "bg-amber-400 text-slate-950"
                      }`}
                    >
                      진행중
                    </span>
                  )}
                </div>

                {/* Mark as Current Step Action */}
                {isTabSelected && !isCurrentActive && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const approxPercent = Math.round((config.stepNumber / 12) * 100);
                      onUpdateProjectPhase(phase, approxPercent);
                      scrollToMethods();
                    }}
                    className="mt-1.5 text-[9px] font-black bg-slate-950 hover:bg-slate-900 text-amber-300 py-0.5 px-1.5 rounded-xs text-center transition-colors uppercase font-mono"
                  >
                    현재 공정으로 설정
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Phase Construction Methods (시공방법) */}
      <div
        ref={methodsSectionRef}
        id="methods-section"
        className={`rounded-sm p-5 border shadow-sm transition-colors space-y-4 ${
          isDark
            ? "bg-[#1E293B] border-slate-700 text-slate-200"
            : "bg-white border-slate-200 text-slate-800"
        }`}
      >
        <div
          className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b ${
            isDark ? "border-slate-700" : "border-slate-200"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-amber-400 rounded-sm" />
            <div>
              <h3
                className={`font-bold text-sm uppercase tracking-wider ${
                  isDark ? "text-white" : "text-slate-950"
                }`}
              >
                {activeTabConfig.label} 시공방법
              </h3>
              <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                KEC 및 기술기준에 의거한 표준 시공 절차
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {project.currentPhase !== activePhaseTab && (
              <button
                id="set-active-phase-current-btn"
                onClick={() => {
                  const approxPercent = Math.round((activeTabConfig.stepNumber / 12) * 100);
                  onUpdateProjectPhase(activePhaseTab, approxPercent);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 transition-colors shadow-sm font-mono uppercase"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>이 단계를 현재 공정으로 설정</span>
              </button>
            )}

            <span
              className={`text-xs font-mono font-bold px-2.5 py-1.5 rounded-sm ${
                isDark ? "bg-slate-800 text-slate-300 border border-slate-700" : "bg-slate-100 text-slate-700 border border-slate-200"
              }`}
            >
              {phaseMethods.length}개 시공방법
            </span>
          </div>
        </div>

        {/* Methods Card Grid */}
        {phaseMethods.length === 0 ? (
          <div className="py-12 text-center text-slate-500">
            <p className="text-sm font-bold">등록된 시공방법이 없습니다</p>
            <p className="text-xs text-slate-400 mt-1">
              상단 메뉴의 [시공방법 DB 관리]에서 시공방법을 등록하거나 관리할 수 있습니다.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {phaseMethods.map((method) => (
              <div
                key={method.id}
                id={`method-card-${method.id}`}
                onClick={() => onOpenMethodDetail(method)}
                className={`p-4 rounded-sm border transition-all cursor-pointer group flex flex-col justify-between ${
                  isDark
                    ? "border-slate-700 hover:border-amber-400 bg-slate-900/60 hover:bg-slate-900 shadow-sm"
                    : "border-slate-200 hover:border-amber-400 bg-slate-50 hover:bg-white shadow-sm hover:shadow-md"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-sm border ${
                        isDark
                          ? "bg-slate-800 text-slate-300 border-slate-700"
                          : "bg-slate-100 text-slate-700 border-slate-300"
                      }`}
                    >
                      {method.category}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {method.steps.length}단계 시공절차
                    </span>
                  </div>

                  <h4
                    className={`text-sm font-bold group-hover:text-amber-500 transition-colors leading-snug ${
                      isDark ? "text-white" : "text-slate-950"
                    }`}
                  >
                    {method.title}
                  </h4>
                </div>

                <div
                  className={`mt-3 flex items-center justify-end text-[11px] font-mono ${
                    isDark ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  <span className="text-amber-600 dark:text-amber-400 font-bold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform uppercase text-xs">
                    상세 절차 <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
