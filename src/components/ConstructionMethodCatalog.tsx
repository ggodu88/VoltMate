import React, { useState } from "react";
import {
  Search,
  BookOpen,
  ChevronRight,
  ExternalLink,
  Plus,
  Sparkles,
  Layers,
  FileCheck2,
  ShieldAlert,
  Camera,
  Ruler,
} from "lucide-react";
import { ConstructionMethod, PHASE_CONFIG } from "../types";
import { useTheme } from "../context/ThemeContext";

interface ConstructionMethodCatalogProps {
  methods: ConstructionMethod[];
  onSelectMethod: (method: ConstructionMethod) => void;
  onGoToAdmin: () => void;
  onAskAi: (methodTitle: string) => void;
  onOpenLegalStandards?: (initialStandardId?: string) => void;
}

export const ConstructionMethodCatalog: React.FC<
  ConstructionMethodCatalogProps
> = ({ methods, onSelectMethod, onGoToAdmin, onAskAi, onOpenLegalStandards }) => {
  const { isDark } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPhase, setSelectedPhase] = useState<string>("ALL");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const categories = Array.from(new Set(methods.map((m) => m.category)));

  const filteredMethods = methods.filter((m) => {
    const matchesSearch =
      m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.kecStandards.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.materials.some((mat) =>
        mat.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesPhase = selectedPhase === "ALL" || m.phase === selectedPhase;
    const matchesCategory =
      selectedCategory === "ALL" || m.category === selectedCategory;

    return matchesSearch && matchesPhase && matchesCategory;
  });

  return (
    <div className="space-y-6 pb-24 md:pb-12">
      {/* Top Banner Header */}
      <div
        className={`rounded-sm p-6 md:p-8 shadow-sm border relative overflow-hidden transition-colors ${
          isDark
            ? "bg-[#1E293B] border-slate-700 text-slate-100"
            : "bg-white border-slate-200 text-slate-900 shadow-slate-200/50"
        }`}
      >
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            {/* Single Line Header Meta */}
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="px-2.5 py-0.5 text-[10px] font-black bg-amber-400 text-slate-950 rounded-sm uppercase tracking-wider">
                표준 시공 가이드
              </span>
              <span
                className={`text-xs font-mono font-semibold px-2 py-0.5 rounded-sm border ${
                  isDark
                    ? "bg-slate-900/80 text-slate-300 border-slate-700"
                    : "bg-slate-100 text-slate-700 border-slate-300"
                }`}
              >
                표준 공법 {methods.length}건 등록
              </span>
              <span
                className={`text-xs font-mono hidden sm:inline ${
                  isDark ? "text-slate-400" : "text-slate-500"
                }`}
              >
                • KEC 및 KCS 31 표준시방서
              </span>
            </div>

            <h1
              className={`text-2xl md:text-3xl font-black tracking-tight uppercase ${
                isDark ? "text-white" : "text-slate-950"
              }`}
            >
              전기공사 시공방법
            </h1>

            <p
              className={`text-xs sm:text-sm mt-2 max-w-3xl leading-relaxed ${
                isDark ? "text-slate-300" : "text-slate-600"
              }`}
            >
              한국전기설비규정(KEC), KS C IEC 규격 및 건축전기설비 표준시방서(KCS 31)에 따른
              단계별 표준 시공 매뉴얼입니다.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {onOpenLegalStandards && (
              <button
                id="catalog-open-standards-btn"
                onClick={() => onOpenLegalStandards()}
                className={`flex items-center gap-1.5 font-bold px-3.5 py-2.5 rounded-sm text-xs transition-all whitespace-nowrap uppercase font-mono border shadow-sm ${
                  isDark
                    ? "bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 border-amber-400/40"
                    : "bg-amber-50 hover:bg-amber-100 text-amber-950 border-amber-300"
                }`}
              >
                <FileCheck2 className="w-3.5 h-3.5 text-amber-500" />
                <span>17대 법령·기술기준 체계</span>
              </button>
            )}

            <a
              href="https://www.law.go.kr/%ED%96%89%EC%A0%95%EA%B7%9C%EC%B9%99/%ED%95%9C%EA%B5%AD%EC%A0%84%EA%B8%B0%EC%84%A4%EB%B9%84%EA%B7%9C%EC%A0%95"
              target="_blank"
              rel="noreferrer"
              className={`flex items-center gap-1.5 font-bold px-3.5 py-2.5 rounded-sm text-xs transition-all whitespace-nowrap uppercase font-mono border shadow-sm ${
                isDark
                  ? "bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-700"
                  : "bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-300"
              }`}
            >
              <ExternalLink className="w-3.5 h-3.5 text-amber-500" />
              <span>KEC 법령 원문</span>
            </a>

            <button
              id="admin-page-shortcut-btn"
              onClick={onGoToAdmin}
              className="flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-4 py-2.5 rounded-sm text-xs shadow-sm shadow-amber-400/20 active:scale-95 transition-all whitespace-nowrap uppercase tracking-wider"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>시공방법 추가 (관리자)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div
        className={`p-4 rounded-sm border shadow-sm space-y-3 transition-colors ${
          isDark
            ? "bg-[#1E293B] border-slate-700"
            : "bg-white border-slate-200"
        }`}
      >
        {/* Phase Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setSelectedPhase("ALL")}
            className={`px-3 py-1.5 rounded-sm text-xs font-bold whitespace-nowrap transition-all uppercase font-mono ${
              selectedPhase === "ALL"
                ? "bg-amber-400 text-slate-950 font-black shadow-sm"
                : isDark
                ? "bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-700"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300"
            }`}
          >
            전체 단계 ({methods.length})
          </button>

          {Object.entries(PHASE_CONFIG).map(([phaseKey, config]) => {
            const count = methods.filter((m) => m.phase === phaseKey).length;
            const isSelected = selectedPhase === phaseKey;
            return (
              <button
                key={phaseKey}
                onClick={() => setSelectedPhase(phaseKey)}
                className={`px-3 py-1.5 rounded-sm text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 border ${
                  isSelected
                    ? "bg-amber-400 text-slate-950 border-amber-400 shadow-sm font-black"
                    : isDark
                    ? "bg-slate-900/80 text-slate-300 hover:bg-slate-800 border-slate-700"
                    : "bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200"
                }`}
              >
                <span>{config.stepNumber}단계. {config.shortName}</span>
                {config.wbsRange && (
                  <span className="text-[10px] font-mono opacity-80 hidden md:inline">
                    [{config.wbsRange}]
                  </span>
                )}
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-sm font-mono font-bold ${
                    isSelected
                      ? "bg-slate-950 text-amber-300"
                      : isDark
                      ? "bg-slate-950 text-slate-300"
                      : "bg-slate-200 text-slate-700"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search & Category Filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search
              className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${
                isDark ? "text-slate-400" : "text-slate-500"
              }`}
            />
            <input
              id="search-method-input"
              type="text"
              placeholder="시공명, 규정(KEC), 자재명(HFIX, VCB, Tr), 공법 키워드 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 text-xs border rounded-sm focus:outline-none focus:border-amber-400 font-sans transition-colors ${
                isDark
                  ? "bg-slate-900/80 border-slate-700 text-slate-100 placeholder-slate-500"
                  : "bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400"
              }`}
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={`text-xs border font-bold px-3 py-2 rounded-sm focus:outline-none focus:border-amber-400 ${
                isDark
                  ? "bg-slate-900/80 border-slate-700 text-slate-200"
                  : "bg-slate-50 border-slate-300 text-slate-800"
              }`}
            >
              <option value="ALL">전체 세부공종 (ALL)</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Methods Card Grid */}
      {filteredMethods.length === 0 ? (
        <div
          className={`rounded-sm p-12 text-center border shadow-sm ${
            isDark
              ? "bg-[#1E293B] border-slate-700 text-slate-300"
              : "bg-white border-slate-200 text-slate-700"
          }`}
        >
          <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h3
            className={`text-base font-bold uppercase ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            검색 결과와 일치하는 시공방법이 없습니다
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            검색어를 변경하거나 관리자 페이지에서 새로운 시공방법을 등록해보세요.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredMethods.map((method) => {
            const phaseConfig = PHASE_CONFIG[method.phase];
            return (
              <div
                key={method.id}
                id={`method-card-${method.id}`}
                className={`rounded-sm p-5 border shadow-sm transition-all duration-150 flex flex-col justify-between group cursor-pointer ${
                  isDark
                    ? "bg-[#1E293B] border-slate-700 hover:border-amber-400"
                    : "bg-white border-slate-200 hover:border-amber-400"
                }`}
                onClick={() => onSelectMethod(method)}
              >
                <div>
                  {/* Single Line Phase Badge, WBS code & Category */}
                  <div className="flex items-center justify-between gap-2 mb-2.5 flex-wrap">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-sm text-[10px] font-bold border uppercase tracking-wider ${phaseConfig.badgeBg}`}
                      >
                        {phaseConfig.shortName} ({phaseConfig.stepNumber}단계)
                      </span>
                      {method.wbsCode && (
                        <span className="px-2 py-0.5 rounded-sm text-[10px] font-mono font-black bg-amber-400 text-slate-950 shadow-xs">
                          WBS {method.wbsCode}
                        </span>
                      )}
                    </div>
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-sm border ${
                        isDark
                          ? "bg-slate-900 border-slate-700 text-slate-300"
                          : "bg-slate-100 border-slate-300 text-slate-700"
                      }`}
                    >
                      {method.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className={`text-base font-bold group-hover:text-amber-500 transition-colors leading-snug mb-2 ${
                      isDark ? "text-white" : "text-slate-950"
                    }`}
                  >
                    {method.title}
                  </h3>

                  {/* Summary */}
                  <p
                    className={`text-xs line-clamp-2 mb-3.5 leading-relaxed ${
                      isDark ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    {method.summary}
                  </p>

                  {/* Key Highlights in Compact Single Line Format */}
                  <div
                    className={`p-3 rounded-sm border space-y-2 mb-4 text-xs ${
                      isDark
                        ? "bg-slate-900/60 border-slate-800"
                        : "bg-slate-50 border-slate-200"
                    }`}
                  >
                    {/* Single Line Step & Badge Overview */}
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300 uppercase">
                        <Layers className="w-3.5 h-3.5 text-amber-500" />
                        시공 절차 {method.steps.length}단계
                      </span>
                      <div className="flex items-center gap-1.5">
                        {method.fieldPhotos && method.fieldPhotos.length > 0 && (
                          <span className="inline-flex items-center gap-1 text-[10px] text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-1.5 py-0.2 rounded-sm border border-blue-200 dark:border-blue-900/50 font-bold">
                            <Camera className="w-3 h-3" />
                            사진 {method.fieldPhotos.length}
                          </span>
                        )}
                        {method.detailSpecs && method.detailSpecs.length > 0 && (
                          <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-1.5 py-0.2 rounded-sm border border-emerald-200 dark:border-emerald-900/50 font-bold">
                            <Ruler className="w-3 h-3" />
                            규격 {method.detailSpecs.length}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Single Line KEC Standard */}
                    <div className="text-[11px] font-mono truncate text-slate-600 dark:text-slate-400">
                      📜 {method.kecStandards}
                    </div>

                    {method.defectPrevention && method.defectPrevention.length > 0 && (
                      <div
                        className={`text-[10px] font-mono truncate pt-1 border-t ${
                          isDark
                            ? "text-rose-300 border-slate-800"
                            : "text-rose-700 border-slate-200"
                        }`}
                      >
                        🛡️ 하자예방: {method.defectPrevention[0]}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Action */}
                <div
                  className={`pt-2.5 border-t flex items-center justify-between ${
                    isDark ? "border-slate-700" : "border-slate-200"
                  }`}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAskAi(method.title);
                    }}
                    className="flex items-center gap-1 text-[11px] font-bold text-amber-600 dark:text-amber-300 hover:underline transition-colors uppercase font-mono"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>AI 질의</span>
                  </button>

                  <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400 group-hover:translate-x-1 transition-transform uppercase font-mono">
                    상세 시공방법 <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
