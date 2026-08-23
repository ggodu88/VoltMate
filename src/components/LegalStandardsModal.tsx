import React, { useState, useMemo } from "react";
import {
  X,
  Search,
  BookOpen,
  Scale,
  ShieldAlert,
  FileCheck2,
  Building2,
  Layers,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Copy,
  Check,
  AlertTriangle,
  Zap,
} from "lucide-react";
import { LEGAL_STANDARDS_SYSTEM } from "../data/legalStandardsSystem";
import { LegalStandardItem, ConstructionPhase, PHASE_CONFIG } from "../types";
import { useTheme } from "../context/ThemeContext";

interface LegalStandardsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDark?: boolean;
  onSelectPhase?: (phase: ConstructionPhase) => void;
  initialStandardId?: string;
  initialSelectedId?: string;
}

export const LegalStandardsModal: React.FC<LegalStandardsModalProps> = ({
  isOpen,
  onClose,
  isDark: propIsDark,
  onSelectPhase,
  initialStandardId,
  initialSelectedId,
}) => {
  const { isDark: themeIsDark } = useTheme();
  const isDark = propIsDark !== undefined ? propIsDark : themeIsDark;
  const targetInitialId = initialStandardId || initialSelectedId;

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [selectedStandard, setSelectedStandard] = useState<LegalStandardItem>(
    LEGAL_STANDARDS_SYSTEM.find((s) => s.id === targetInitialId) ||
      LEGAL_STANDARDS_SYSTEM[0]
  );
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Update selected standard if targetInitialId changes
  React.useEffect(() => {
    if (targetInitialId) {
      const found = LEGAL_STANDARDS_SYSTEM.find((s) => s.id === targetInitialId);
      if (found) setSelectedStandard(found);
    }
  }, [targetInitialId]);

  const categories = ["ALL", "법률/시행령", "기술기준/고시", "국가표준/지침", "안전/인허가"];

  const filteredStandards = useMemo(() => {
    return LEGAL_STANDARDS_SYSTEM.filter((item) => {
      const matchCategory =
        selectedCategory === "ALL" || item.category === selectedCategory;
      const matchSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.code.includes(searchTerm) ||
        item.authority.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.keyPurposes.some((p) =>
          p.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        item.coreRegulations.some(
          (r) =>
            r.article.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.fieldApplication.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        item.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchCategory && matchSearch;
    });
  }, [searchTerm, selectedCategory]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div
        className={`w-full max-w-6xl h-[92vh] max-h-[950px] flex flex-col rounded-lg shadow-2xl overflow-hidden border transition-colors ${
          isDark
            ? "bg-slate-900 border-slate-700 text-slate-100"
            : "bg-white border-slate-200 text-slate-900"
        }`}
      >
        {/* MODAL HEADER */}
        <div
          className={`px-5 py-4 flex items-center justify-between border-b shrink-0 ${
            isDark
              ? "bg-slate-950/95 border-slate-800 text-white"
              : "bg-slate-50 border-slate-200 text-slate-900"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-slate-950 shadow-md shrink-0">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-sm border ${
                  isDark
                    ? "bg-amber-400/20 text-amber-400 border-amber-400/40"
                    : "bg-amber-100 text-amber-900 border-amber-300"
                }`}>
                  LEGAL & TECHNICAL STANDARDS (17 체계)
                </span>
                <span className={`text-[11px] font-mono flex items-center gap-1 font-semibold ${
                  isDark ? "text-emerald-400" : "text-emerald-700"
                }`}>
                  <Check className="w-3.5 h-3.5" /> 최신 공인 기준 완벽 반영
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold tracking-tight mt-0.5">
                전기시공 관련 법령 및 공인 기술기준 17가지 종합 체계
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-2 rounded-md transition-colors ${
              isDark
                ? "hover:bg-slate-800 text-slate-400 hover:text-slate-200"
                : "hover:bg-slate-200 text-slate-500 hover:text-slate-900"
            }`}
            title="닫기 (ESC)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* SEARCH & CATEGORY BAR */}
        <div
          className={`px-5 py-3 border-b flex flex-wrap items-center justify-between gap-3 shrink-0 ${
            isDark
              ? "bg-slate-900/60 border-slate-800"
              : "bg-slate-100/70 border-slate-200"
          }`}
        >
          <div className="flex items-center gap-2 flex-1 min-w-[280px]">
            <div className="relative w-full">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="법령명, 조항, KEC 규정, 키워드(예: 감전, 접지, 소방, 전기차, 방화구획) 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-9 pr-4 py-2 text-xs rounded-md border focus:outline-none transition-all ${
                  isDark
                    ? "bg-slate-950 border-slate-700 text-slate-100 placeholder-slate-500 focus:border-amber-400"
                    : "bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-amber-500 shadow-xs"
                }`}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-200"
                >
                  지우기
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs rounded-md font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-amber-400 text-slate-950 font-bold shadow-xs"
                    : isDark
                    ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
                    : "bg-white text-slate-700 hover:bg-slate-200 border border-slate-200 shadow-xs"
                }`}
              >
                {cat === "ALL" ? "전체 (17종)" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* MODAL BODY (TWO COLUMN LAYOUT) */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* LEFT LIST PANEL */}
          <div
            className={`w-full md:w-80 lg:w-96 border-b md:border-b-0 md:border-r flex flex-col overflow-hidden shrink-0 ${
              isDark ? "bg-slate-950/40 border-slate-800" : "bg-slate-50 border-slate-200"
            }`}
          >
            <div className={`p-3 border-b text-[11px] font-mono font-bold flex items-center justify-between ${
              isDark ? "text-slate-400 border-slate-800" : "text-slate-600 border-slate-200"
            }`}>
              <span>법령 목록 ({filteredStandards.length}개)</span>
              <span className={isDark ? "text-amber-400" : "text-amber-600 font-bold"}>선택 시 상세 규정 표출</span>
            </div>

            <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
              {filteredStandards.length === 0 ? (
                <div className={`p-8 text-center text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                  일치하는 법령 또는 기술기준이 없습니다.
                </div>
              ) : (
                filteredStandards.map((std) => {
                  const isSelected = selectedStandard.id === std.id;
                  return (
                    <button
                      key={std.id}
                      onClick={() => setSelectedStandard(std)}
                      className={`w-full text-left p-3 rounded-lg transition-all flex items-start gap-3 border ${
                        isSelected
                          ? isDark
                            ? "bg-slate-800/90 border-amber-400/60 shadow-md text-slate-100"
                            : "bg-amber-50/90 border-amber-400 shadow-sm text-slate-900"
                          : isDark
                          ? "hover:bg-slate-900/80 border-transparent text-slate-300"
                          : "hover:bg-white border-transparent text-slate-700 shadow-xs bg-white/60"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-md shrink-0 flex items-center justify-center font-mono font-black text-xs ${
                          isSelected
                            ? "bg-amber-400 text-slate-950 font-bold"
                            : isDark
                            ? "bg-slate-800 text-slate-400"
                            : "bg-slate-200 text-slate-700"
                        }`}
                      >
                        {std.code}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-xs ${
                            isDark ? "bg-slate-800 text-slate-300" : "bg-slate-200 text-slate-700"
                          }`}>
                            {std.category}
                          </span>
                          <span className={`text-[10px] truncate ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                            {std.authority}
                          </span>
                        </div>
                        <h4
                          className={`text-xs font-bold truncate ${
                            isSelected
                              ? isDark
                                ? "text-amber-300"
                                : "text-amber-950"
                              : isDark
                              ? "text-slate-200"
                              : "text-slate-900"
                          }`}
                        >
                          {std.title}
                        </h4>
                        <p className={`text-[11px] line-clamp-1 mt-0.5 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                          {std.keyPurposes[0]}
                        </p>
                      </div>

                      <ChevronRight
                        className={`w-4 h-4 shrink-0 mt-2 transition-transform ${
                          isSelected ? "text-amber-500 translate-x-1" : isDark ? "text-slate-600" : "text-slate-400"
                        }`}
                      />
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* RIGHT DETAIL PANEL */}
          <div
            className={`flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 ${
              isDark ? "bg-slate-900/90 text-slate-100" : "bg-white text-slate-900"
            }`}
          >
            {/* DETAIL HEADER */}
            <div
              className={`p-5 rounded-lg border relative overflow-hidden ${
                isDark
                  ? "bg-gradient-to-br from-slate-950 to-slate-900 border-slate-700"
                  : "bg-gradient-to-br from-slate-50 to-amber-50/50 border-slate-200 shadow-xs"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-1 rounded-sm bg-amber-400 text-slate-950 font-mono font-black text-xs">
                    체계 번호 {selectedStandard.code}
                  </span>
                  <span
                    className={`text-xs font-mono font-bold px-2 py-0.5 rounded-sm border ${
                      isDark
                        ? "bg-slate-800 text-slate-300 border-slate-700"
                        : "bg-white text-slate-700 border-slate-300 shadow-xs"
                    }`}
                  >
                    {selectedStandard.category}
                  </span>
                  <span className={`text-xs font-semibold flex items-center gap-1 ${
                    isDark ? "text-amber-400" : "text-amber-700"
                  }`}>
                    <Building2 className="w-3.5 h-3.5" /> 소관: {selectedStandard.authority}
                  </span>
                </div>

                <div className={`text-[11px] font-mono flex items-center gap-1 ${
                  isDark ? "text-slate-400" : "text-slate-600"
                }`}>
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  {selectedStandard.latestVersionInfo}
                </div>
              </div>

              <h1 className="text-xl sm:text-2xl font-black tracking-tight mb-3">
                {selectedStandard.title}
              </h1>

              {/* KEY PURPOSES */}
              <div className="space-y-1.5">
                <h4 className={`text-xs font-bold uppercase tracking-wider font-mono ${
                  isDark ? "text-slate-400" : "text-slate-600"
                }`}>
                  주요 제정 목적 및 관리 영역
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {selectedStandard.keyPurposes.map((purpose, idx) => (
                    <li
                      key={idx}
                      className={`flex items-start gap-2 p-2.5 rounded-md ${
                        isDark ? "bg-slate-900/80 text-slate-200 border border-slate-800" : "bg-white text-slate-800 border border-slate-200 shadow-xs"
                      }`}
                    >
                      <span className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold mt-0.5 ${
                        isDark ? "bg-amber-400/20 text-amber-400" : "bg-amber-100 text-amber-800"
                      }`}>
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{purpose}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CORE REGULATIONS & FIELD PRACTICES */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-wider font-mono flex items-center gap-2">
                  <Scale className="w-4 h-4 text-amber-500" />
                  핵심 법적 조항 및 현장 실무 적용 지침
                </h3>
                <span className={`text-[11px] font-mono ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                  총 {selectedStandard.coreRegulations.length}개 핵심 조항
                </span>
              </div>

              <div className="space-y-4">
                {selectedStandard.coreRegulations.map((reg, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-lg border transition-all ${
                      isDark
                        ? "bg-slate-950/60 border-slate-800 hover:border-slate-700"
                        : "bg-slate-50/80 border-slate-200 hover:border-slate-300 shadow-xs"
                    }`}
                  >
                    <div className={`flex flex-wrap items-center justify-between gap-2 mb-2 pb-2 border-b ${
                      isDark ? "border-slate-800" : "border-slate-200"
                    }`}>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded-sm text-[11px] font-mono font-bold border ${
                          isDark
                            ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                            : "bg-amber-100 text-amber-900 border-amber-300"
                        }`}>
                          {reg.article}
                        </span>
                        <h4 className={`text-xs font-bold ${isDark ? "text-slate-200" : "text-slate-900"}`}>
                          {reg.title}
                        </h4>
                      </div>

                      <button
                        onClick={() =>
                          handleCopy(
                            `[${selectedStandard.title} - ${reg.article} (${reg.title})]\n규정: ${reg.content}\n현장실무: ${reg.fieldApplication}\n벌칙: ${reg.violationPenalty || "해당없음"}`,
                            `${selectedStandard.id}-${idx}`
                          )
                        }
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-sm text-[10px] font-mono transition-colors ${
                          copiedText === `${selectedStandard.id}-${idx}`
                            ? "bg-emerald-500 text-slate-950 font-bold"
                            : isDark
                            ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
                            : "bg-white text-slate-700 hover:bg-slate-200 border border-slate-200 shadow-xs"
                        }`}
                      >
                        {copiedText === `${selectedStandard.id}-${idx}` ? (
                          <>
                            <Check className="w-3 h-3 text-white" /> 복사 완료!
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" /> 조항 복사
                          </>
                        )}
                      </button>
                    </div>

                    <div className="space-y-2.5 text-xs">
                      <div>
                        <span className={`font-bold block mb-0.5 font-mono text-[11px] ${
                          isDark ? "text-slate-400" : "text-slate-600"
                        }`}>
                          [법정 규정 내용]
                        </span>
                        <p className={`leading-relaxed pl-2.5 border-l-2 ${
                          isDark ? "text-slate-300 border-amber-400/60" : "text-slate-800 border-amber-500"
                        }`}>
                          {reg.content}
                        </p>
                      </div>

                      <div
                        className={`p-3 rounded-md ${
                          isDark ? "bg-slate-900/90 border border-slate-800" : "bg-white border border-slate-200 shadow-xs"
                        }`}
                      >
                        <span className={`font-bold flex items-center gap-1.5 mb-1 font-mono text-[11px] ${
                          isDark ? "text-amber-400" : "text-amber-800"
                        }`}>
                          <FileCheck2 className="w-3.5 h-3.5" /> 현장 시공 및 감리 검측 실무 지침:
                        </span>
                        <p className={`leading-relaxed text-xs ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                          {reg.fieldApplication}
                        </p>
                      </div>

                      {reg.violationPenalty && (
                        <div className="flex items-center gap-2 text-[11px] text-rose-600 dark:text-rose-400 font-mono bg-rose-500/10 px-2.5 py-1.5 rounded-sm border border-rose-500/20">
                          <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-rose-500" />
                          <span>
                            <strong>위반 시 행정처분/벌칙:</strong> {reg.violationPenalty}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RELATED PHASES & WBS CODE LINKAGE */}
            <div
              className={`p-4 rounded-lg border ${
                isDark ? "bg-slate-950/80 border-slate-800" : "bg-slate-50 border-slate-200"
              }`}
            >
              <h4 className={`text-xs font-bold uppercase tracking-wider font-mono mb-3 flex items-center gap-2 ${
                isDark ? "text-slate-400" : "text-slate-600"
              }`}>
                <Layers className="w-4 h-4 text-amber-500" />
                연계 공정 단계 및 마이크로 WBS 범위
              </h4>

              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`text-xs font-mono ${isDark ? "text-slate-400" : "text-slate-600"}`}>적용 WBS 코드:</span>
                  <span className="px-2 py-0.5 rounded-sm font-mono font-black text-xs bg-amber-400 text-slate-950 shadow-xs">
                    WBS {selectedStandard.relatedWbsRange}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  {selectedStandard.relatedPhases.map((phase) => {
                    const phaseInfo = PHASE_CONFIG[phase];
                    if (!phaseInfo) return null;
                    return (
                      <button
                        key={phase}
                        onClick={() => {
                          if (onSelectPhase) {
                            onSelectPhase(phase);
                            onClose();
                          }
                        }}
                        className={`text-left p-2.5 rounded-md border transition-all flex items-center justify-between ${
                          isDark
                            ? "bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-200"
                            : "bg-white hover:bg-slate-100 border-slate-200 text-slate-900 shadow-xs"
                        }`}
                      >
                        <div>
                          <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-xs border uppercase ${phaseInfo.badgeBg}`}>
                            {phaseInfo.stepNumber}단계
                          </span>
                          <h5 className={`text-xs font-bold mt-1 truncate ${isDark ? "text-slate-200" : "text-slate-900"}`}>
                            {phaseInfo.shortName}
                          </h5>
                          <span className={`text-[10px] font-mono ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                            WBS [{phaseInfo.wbsRange}]
                          </span>
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 text-amber-500" />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* TAGS */}
            <div className="flex flex-wrap items-center gap-1.5 pt-2">
              <span className={`text-[11px] font-mono ${isDark ? "text-slate-400" : "text-slate-500"}`}>연관 키워드:</span>
              {selectedStandard.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className={`px-2 py-0.5 rounded-xs text-[10px] font-mono border ${
                    isDark
                      ? "bg-slate-800 text-slate-300 border-slate-700"
                      : "bg-slate-100 text-slate-700 border-slate-200"
                  }`}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* MODAL FOOTER */}
        <div
          className={`px-5 py-3 border-t flex items-center justify-between shrink-0 ${
            isDark ? "bg-slate-950 border-slate-800" : "bg-slate-50 border-slate-200"
          }`}
        >
          <div className={`flex items-center gap-2 text-xs ${isDark ? "text-slate-400" : "text-slate-600"}`}>
            <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0" />
            <span className="truncate">
              본 기술기준 체계는 국가법령정보센터 및 공인 고시를 100% 반영합니다.
            </span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-md text-xs font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 transition-colors shadow-xs shrink-0"
          >
            확인 및 닫기
          </button>
        </div>
      </div>
    </div>
  );
};

