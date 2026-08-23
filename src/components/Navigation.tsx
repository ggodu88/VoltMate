import React, { useState, useEffect } from "react";
import {
  Building2,
  BookOpen,
  FileCheck2,
  Bot,
  Settings2,
  HardHat,
  Zap,
  Sun,
  Moon,
  Scale,
  Key,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { getUserApiKey } from "../utils/apiKeyStorage";

interface NavigationProps {
  activeTab: "PROJECTS" | "METHODS" | "LOGS" | "ADMIN";
  onTabChange: (tab: "PROJECTS" | "METHODS" | "LOGS" | "ADMIN") => void;
  onOpenAiConsultant: (query?: string) => void;
  onOpenLegalStandards?: () => void;
  onOpenApiKeyModal?: () => void;
  selectedProjectName?: string;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onTabChange,
  onOpenAiConsultant,
  onOpenLegalStandards,
  onOpenApiKeyModal,
  selectedProjectName,
}) => {
  const { isDark, toggleTheme } = useTheme();
  const [hasApiKey, setHasApiKey] = useState(false);

  useEffect(() => {
    const checkKey = () => setHasApiKey(!!getUserApiKey());
    checkKey();
    window.addEventListener("voltmate-apikey-updated", checkKey);
    return () => window.removeEventListener("voltmate-apikey-updated", checkKey);
  }, []);

  return (
    <>
      {/* 1. Top Clean Header (Mobile, Tablet, PC) */}
      <header
        className={`sticky top-0 z-30 transition-colors duration-150 border-b backdrop-blur-md ${
          isDark
            ? "bg-[#1E293B]/95 text-slate-100 border-slate-700 shadow-lg"
            : "bg-white/95 text-slate-900 border-slate-200 shadow-xs"
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 gap-2 sm:gap-3">
            {/* Brand Logo & Current Project Badge (Desktop) */}
            <div className="flex items-center gap-2 sm:gap-3 select-none min-w-0">
              <div
                className="flex items-center gap-2 cursor-pointer group shrink-0"
                onClick={() => onTabChange("PROJECTS")}
                title="현장 프로젝트 목록으로 이동"
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 bg-amber-400 rounded-md flex items-center justify-center shadow-md shadow-amber-400/25 text-slate-950 shrink-0 group-hover:scale-105 transition-transform">
                  <Zap className="w-5 h-5 fill-slate-950 stroke-[2.5]" />
                </div>
                <div className="flex items-baseline gap-1">
                  <span
                    className={`text-base sm:text-lg font-black tracking-tight ${
                      isDark ? "text-white" : "text-slate-950"
                    }`}
                  >
                    VoltMate <span className="text-amber-500 font-normal">Pro</span>
                  </span>
                </div>
              </div>

              {/* Sub-slogan on larger screens */}
              <span className="hidden lg:inline-block text-[11px] font-medium text-slate-400 dark:text-slate-500 pl-2.5 border-l border-slate-300 dark:border-slate-700 select-none">
                스마트 전기시공 통합 파트너
              </span>

              {/* Active Project Indicator Badge (Visible on Tablet & PC) */}
              {selectedProjectName && (
                <div
                  onClick={() => onTabChange("PROJECTS")}
                  className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-amber-400/15 dark:bg-amber-400/10 border border-amber-500/30 rounded-md cursor-pointer hover:border-amber-500/60 transition-colors max-w-[200px] md:max-w-[280px] truncate"
                  title={`현재 활성 현장: ${selectedProjectName}`}
                >
                  <HardHat className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span className="text-[10px] text-amber-600 dark:text-amber-400 font-mono font-bold shrink-0">
                    현장:
                  </span>
                  <span className="text-xs font-bold text-slate-900 dark:text-amber-300 truncate">
                    {selectedProjectName}
                  </span>
                </div>
              )}
            </div>

            {/* Right Action Tools: ONLY API Key & Day/Night Mode Switcher */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
              {/* Google Gemini API Key Settings Button */}
              {onOpenApiKeyModal && (
                <button
                  id="header-api-key-btn"
                  type="button"
                  onClick={onOpenApiKeyModal}
                  className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-md text-[11px] sm:text-xs font-mono font-bold transition-all border shadow-xs ${
                    hasApiKey
                      ? isDark
                        ? "bg-emerald-950/50 hover:bg-emerald-900/60 text-emerald-300 border-emerald-500/40"
                        : "bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-300"
                      : isDark
                      ? "bg-slate-800 hover:bg-slate-700 text-amber-300 border-slate-600"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300"
                  }`}
                  title="Google Gemini AI API 키 설정 (BYOK)"
                >
                  <Key className={`w-3.5 h-3.5 shrink-0 ${hasApiKey ? "text-emerald-400" : "text-amber-500"}`} />
                  <span className="whitespace-nowrap">
                    {hasApiKey ? "API키 연결됨" : "API키 설정"}
                  </span>
                </button>
              )}

              {/* Day / Night Theme Switcher */}
              <button
                id="theme-toggle-btn"
                type="button"
                onClick={toggleTheme}
                className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-md text-[11px] sm:text-xs font-mono font-bold transition-all border shadow-xs ${
                  isDark
                    ? "bg-slate-800 hover:bg-slate-700 text-amber-300 border-slate-600"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300"
                }`}
                title={isDark ? "주간(라이트) 모드로 전환" : "야간(다크) 모드로 전환"}
              >
                {isDark ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="whitespace-nowrap">주간</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    <span className="whitespace-nowrap">야간</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Active Project Sub-bar (Only on small screens when a project is selected) */}
        {selectedProjectName && (
          <div
            onClick={() => onTabChange("PROJECTS")}
            className="sm:hidden flex items-center justify-between px-3 py-1 bg-amber-400/10 dark:bg-amber-400/5 border-t border-amber-500/20 text-xs cursor-pointer active:bg-amber-400/20 transition-colors"
          >
            <div className="flex items-center gap-1.5 min-w-0">
              <HardHat className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span className="text-[10px] text-amber-600 dark:text-amber-400 font-mono font-bold shrink-0">
                선택 현장:
              </span>
              <span className="font-bold text-slate-900 dark:text-amber-300 truncate">
                {selectedProjectName}
              </span>
            </div>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 shrink-0 ml-2">
              변경 탭하기 &gt;
            </span>
          </div>
        )}
      </header>

      {/* 2. Unified Bottom Navigation Dock Bar (PC, Tablet, Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none pb-1 sm:pb-3 px-2 sm:px-4">
        <nav
          className={`pointer-events-auto max-w-2xl mx-auto rounded-xl sm:rounded-2xl p-1.5 backdrop-blur-xl border shadow-2xl transition-all ${
            isDark
              ? "bg-[#1E293B]/92 border-slate-700/90 text-slate-200 shadow-black/60"
              : "bg-white/95 border-slate-200/90 text-slate-900 shadow-slate-400/25"
          }`}
        >
          <div className="grid grid-cols-6 gap-1 sm:gap-1.5">
            {/* 1. 현장 */}
            <button
              id="dock-nav-projects"
              onClick={() => onTabChange("PROJECTS")}
              className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 py-1.5 sm:py-2 px-1 sm:px-2.5 rounded-lg text-[10px] sm:text-xs font-bold transition-all ${
                activeTab === "PROJECTS"
                  ? "bg-amber-400 text-slate-950 font-black shadow-md shadow-amber-400/30"
                  : isDark
                  ? "text-slate-300 hover:text-white hover:bg-slate-800/80"
                  : "text-slate-700 hover:text-slate-950 hover:bg-slate-100"
              }`}
            >
              <Building2 className="w-4 h-4 shrink-0" />
              <span className="whitespace-nowrap">현장</span>
            </button>

            {/* 2. 시공노트 */}
            <button
              id="dock-nav-logs"
              onClick={() => onTabChange("LOGS")}
              className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 py-1.5 sm:py-2 px-1 sm:px-2.5 rounded-lg text-[10px] sm:text-xs font-bold transition-all ${
                activeTab === "LOGS"
                  ? "bg-amber-400 text-slate-950 font-black shadow-md shadow-amber-400/30"
                  : isDark
                  ? "text-slate-300 hover:text-white hover:bg-slate-800/80"
                  : "text-slate-700 hover:text-slate-950 hover:bg-slate-100"
              }`}
            >
              <FileCheck2 className="w-4 h-4 shrink-0" />
              <span className="whitespace-nowrap">시공노트</span>
            </button>

            {/* 3. 시공방법 */}
            <button
              id="dock-nav-methods"
              onClick={() => onTabChange("METHODS")}
              className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 py-1.5 sm:py-2 px-1 sm:px-2.5 rounded-lg text-[10px] sm:text-xs font-bold transition-all ${
                activeTab === "METHODS"
                  ? "bg-amber-400 text-slate-950 font-black shadow-md shadow-amber-400/30"
                  : isDark
                  ? "text-slate-300 hover:text-white hover:bg-slate-800/80"
                  : "text-slate-700 hover:text-slate-950 hover:bg-slate-100"
              }`}
            >
              <BookOpen className="w-4 h-4 shrink-0" />
              <span className="whitespace-nowrap">시공방법</span>
            </button>

            {/* 4. 법령 (17종 사전) */}
            <button
              id="dock-nav-standards"
              onClick={onOpenLegalStandards}
              className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 py-1.5 sm:py-2 px-1 sm:px-2.5 rounded-lg text-[10px] sm:text-xs font-bold transition-all relative ${
                isDark
                  ? "text-amber-400 hover:text-amber-300 hover:bg-amber-400/10"
                  : "text-amber-700 hover:text-amber-900 hover:bg-amber-50"
              }`}
              title="전기공사 17대 기술기준 및 법령 사전"
            >
              <Scale className="w-4 h-4 shrink-0 text-amber-500" />
              <span className="whitespace-nowrap">법령</span>
              <span className="hidden sm:inline-block text-[9px] px-1 py-0.2 rounded-xs bg-amber-500/20 text-amber-600 dark:text-amber-400 font-mono font-bold">
                17종
              </span>
            </button>

            {/* 5. AI 기술자문관 */}
            <button
              id="dock-nav-ai"
              onClick={() => onOpenAiConsultant()}
              className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 py-1.5 sm:py-2 px-1 sm:px-2.5 rounded-lg text-[10px] sm:text-xs font-bold transition-all relative ${
                isDark
                  ? "text-indigo-300 hover:text-white hover:bg-indigo-950/60"
                  : "text-indigo-700 hover:text-indigo-950 hover:bg-indigo-50"
              }`}
              title="KEC 실시간 AI 기술자문관"
            >
              <div className="relative shrink-0">
                <Bot className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-amber-400 rounded-full animate-ping" />
              </div>
              <span className="whitespace-nowrap">AI자문</span>
            </button>

            {/* 6. 관리자 */}
            <button
              id="dock-nav-admin"
              onClick={() => onTabChange("ADMIN")}
              className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 py-1.5 sm:py-2 px-1 sm:px-2.5 rounded-lg text-[10px] sm:text-xs font-bold transition-all ${
                activeTab === "ADMIN"
                  ? "bg-amber-400 text-slate-950 font-black shadow-md shadow-amber-400/30"
                  : isDark
                  ? "text-slate-300 hover:text-white hover:bg-slate-800/80"
                  : "text-slate-700 hover:text-slate-950 hover:bg-slate-100"
              }`}
            >
              <Settings2 className="w-4 h-4 shrink-0" />
              <span className="whitespace-nowrap">관리자</span>
            </button>
          </div>
        </nav>
      </div>
    </>
  );
};


