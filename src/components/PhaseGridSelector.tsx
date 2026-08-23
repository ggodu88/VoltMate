import React, { useState, useRef } from "react";
import {
  LayoutGrid,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ArrowRightLeft,
  Check,
  Sparkles,
  Layers,
  X,
} from "lucide-react";
import { ConstructionPhase, PHASE_CONFIG } from "../types";
import { useTheme } from "../context/ThemeContext";

interface PhaseGridSelectorProps {
  selectedPhase: string;
  onSelectPhase: (phase: string) => void;
  methodsCountByPhase?: Record<string, number>;
  totalCount?: number;
  allowAll?: boolean;
  title?: string;
  className?: string;
}

export const PhaseGridSelector: React.FC<PhaseGridSelectorProps> = ({
  selectedPhase,
  onSelectPhase,
  methodsCountByPhase = {},
  totalCount,
  allowAll = true,
  title = "시공 단계 선택",
  className = "",
}) => {
  const { isDark } = useTheme();
  const [isGridOpen, setIsGridOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollTabs = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -240 : 240;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const currentConfig =
    selectedPhase !== "ALL"
      ? PHASE_CONFIG[selectedPhase as ConstructionPhase]
      : null;

  const currentCount =
    selectedPhase === "ALL"
      ? totalCount ?? Object.values(methodsCountByPhase).reduce((a: number, b: number) => a + b, 0)
      : methodsCountByPhase[selectedPhase] ?? 0;

  const handleSelect = (phaseKey: string) => {
    onSelectPhase(phaseKey);
    setIsGridOpen(false);
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Top Header & Toggle Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-1 text-xs">
        {/* Left: Current Active Phase Summary */}
        <div className="flex items-center gap-2">
          <span className="font-bold flex items-center gap-1.5 text-slate-800 dark:text-slate-200">
            <Layers className="w-4 h-4 text-amber-500" />
            <span className="font-mono">{title}</span>
          </span>

          {/* Current Selection Pill */}
          <div className="flex items-center gap-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold font-mono bg-amber-400/20 text-amber-700 dark:text-amber-300 border border-amber-400/40 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              <span>
                {selectedPhase === "ALL"
                  ? "전체 단계"
                  : currentConfig?.shortName || selectedPhase}
              </span>
              {typeof currentCount === "number" && (
                <span className="opacity-80 text-[11px]">({currentCount})</span>
              )}
            </span>
          </div>
        </div>

        {/* Right: Grid Expand Button + Horizontal Scroll Arrows */}
        <div className="flex items-center gap-1.5 ml-auto">
          {/* 1~12 바둑판 그리드 펼침 토글 버튼 (핵심) */}
          <button
            type="button"
            onClick={() => setIsGridOpen((prev) => !prev)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-bold transition-all shadow-xs ${
              isGridOpen
                ? "bg-amber-400 text-slate-950 ring-2 ring-amber-400 font-black"
                : isDark
                ? "bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 hover:border-amber-400"
                : "bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 hover:border-amber-400"
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>1~12단계 바둑판 {isGridOpen ? "접기" : "전체 펼치기"}</span>
            {isGridOpen ? (
              <ChevronUp className="w-3.5 h-3.5 stroke-[2.5]" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 stroke-[2.5]" />
            )}
          </button>

          {/* Horizontal Scroll Arrows (Tab Mode) */}
          {!isGridOpen && (
            <div className="flex items-center gap-0.5 ml-1">
              <button
                type="button"
                onClick={() => scrollTabs("left")}
                aria-label="이전 단계 보기"
                title="이전 단계로 스크롤"
                className="p-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-amber-400 hover:text-slate-950 text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-700 transition-colors"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => scrollTabs("right")}
                aria-label="다음 단계 보기"
                title="다음 단계로 스크롤 (12단계까지)"
                className="p-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-amber-400 hover:text-slate-950 text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-700 transition-colors"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* VIEW MODE 1: EXPANDED 1~12 바둑판 그리드 (Option 2 구현) */}
      {isGridOpen ? (
        <div
          className={`p-3.5 sm:p-4 rounded-lg border transition-all duration-200 animate-in fade-in-50 slide-in-from-top-2 ${
            isDark
              ? "bg-slate-950/90 border-amber-400/40 shadow-xl"
              : "bg-amber-50/70 border-amber-300 shadow-md"
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>1~12번 중 원하는 단계를 원터치로 직접 선택하세요</span>
              </span>
            </div>

            {allowAll && (
              <button
                type="button"
                onClick={() => handleSelect("ALL")}
                className={`px-3 py-1 rounded text-xs font-bold transition-all border ${
                  selectedPhase === "ALL"
                    ? "bg-amber-400 text-slate-950 border-amber-400 font-black shadow-xs"
                    : isDark
                    ? "bg-slate-900 text-slate-300 hover:bg-slate-800 border-slate-700"
                    : "bg-white text-slate-700 hover:bg-slate-100 border-slate-300"
                }`}
              >
                ⚡ 전체 단계 보기 {typeof totalCount === "number" ? `(${totalCount})` : ""}
              </button>
            )}
          </div>

          {/* 3×4 또는 4×3 그리드 바둑판 레이아웃 */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-2.5">
            {Object.entries(PHASE_CONFIG).map(([phaseKey, config]) => {
              const count = methodsCountByPhase[phaseKey];
              const isSelected = selectedPhase === phaseKey;
              const stepNum = String(config.stepNumber).padStart(2, "0");

              return (
                <button
                  key={phaseKey}
                  type="button"
                  onClick={() => handleSelect(phaseKey)}
                  className={`p-2.5 sm:p-3 rounded-lg text-left transition-all relative flex flex-col justify-between gap-2 border ${
                    isSelected
                      ? "bg-amber-400 text-slate-950 border-amber-500 shadow-md font-bold ring-2 ring-amber-500/80 scale-[1.02]"
                      : isDark
                      ? "bg-slate-900/90 text-slate-200 border-slate-800 hover:border-amber-400/80 hover:bg-slate-800/90 hover:scale-[1.01]"
                      : "bg-white text-slate-800 border-slate-200 hover:border-amber-400 hover:bg-amber-50/50 hover:scale-[1.01]"
                  }`}
                >
                  {/* Top: Step Number & Count */}
                  <div className="flex items-center justify-between w-full">
                    <span
                      className={`text-xs font-mono font-black px-1.5 py-0.5 rounded ${
                        isSelected
                          ? "bg-slate-950 text-amber-300"
                          : isDark
                          ? "bg-slate-800 text-amber-400"
                          : "bg-slate-100 text-amber-700"
                      }`}
                    >
                      STEP {stepNum}
                    </span>

                    {typeof count === "number" && (
                      <span
                        className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-full ${
                          isSelected
                            ? "bg-slate-950/20 text-slate-950 font-black"
                            : isDark
                            ? "text-slate-400 bg-slate-800"
                            : "text-slate-500 bg-slate-100"
                        }`}
                      >
                        {count}건
                      </span>
                    )}
                  </div>

                  {/* Center: Phase Name */}
                  <div className="space-y-0.5">
                    <div className="text-xs sm:text-sm font-extrabold leading-snug line-clamp-1">
                      {config.shortName}
                    </div>
                    {config.wbsRange && (
                      <div
                        className={`text-[10px] font-mono ${
                          isSelected
                            ? "text-slate-900 font-bold opacity-90"
                            : isDark
                            ? "text-slate-400"
                            : "text-slate-500"
                        }`}
                      >
                        WBS {config.wbsRange}
                      </div>
                    )}
                  </div>

                  {/* Selected Active Checkmark */}
                  {isSelected && (
                    <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-slate-950 text-amber-300 flex items-center justify-center shadow-xs">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        /* VIEW MODE 2: COMPACT HORIZONTAL SCROLL TAB BAR */
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-1.5 overflow-x-auto pb-1.5 pt-0.5 scrollbar-thin scroll-smooth"
        >
          {allowAll && (
            <button
              onClick={() => onSelectPhase("ALL")}
              className={`px-3 py-1.5 rounded-sm text-xs font-bold whitespace-nowrap transition-all uppercase font-mono shrink-0 ${
                selectedPhase === "ALL"
                  ? "bg-amber-400 text-slate-950 font-black shadow-sm"
                  : isDark
                  ? "bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-700"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300"
              }`}
            >
              전체 단계 {typeof totalCount === "number" ? `(${totalCount})` : ""}
            </button>
          )}

          {Object.entries(PHASE_CONFIG).map(([phaseKey, config]) => {
            const count = methodsCountByPhase[phaseKey];
            const isSelected = selectedPhase === phaseKey;
            return (
              <button
                key={phaseKey}
                onClick={() => onSelectPhase(phaseKey)}
                className={`px-3 py-1.5 rounded-sm text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 border shrink-0 ${
                  isSelected
                    ? "bg-amber-400 text-slate-950 border-amber-400 shadow-sm font-black"
                    : isDark
                    ? "bg-slate-900/80 text-slate-300 hover:bg-slate-800 border-slate-700"
                    : "bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200"
                }`}
              >
                <span>{config.shortName}</span>
                {config.wbsRange && (
                  <span className="text-[10px] font-mono opacity-80 hidden md:inline">
                    [{config.wbsRange}]
                  </span>
                )}
                {typeof count === "number" && (
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
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
