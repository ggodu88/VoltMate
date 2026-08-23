import React, { useState, useMemo, useRef } from "react";
import {
  Calendar,
  MapPin,
  Camera,
  Plus,
  Search,
  Building2,
  Edit,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  FileText,
  Printer,
  Sparkles,
  Bot,
  HardHat,
  Tag,
  CheckCircle2,
  Repeat,
  Handshake,
  ShieldAlert,
  Wrench,
  Clock,
  ExternalLink,
  BookOpen,
  X,
  Filter,
  CheckCircle,
  HelpCircle,
  ZoomIn,
  ChevronLeft,
  ChevronRight,
  ArrowRightLeft,
} from "lucide-react";
import {
  ConstructionLog,
  ConstructionMethod,
  ConstructionPhase,
  LogPhoto,
  NoteCategory,
  NoteStatus,
  NOTE_CATEGORY_CONFIG,
  PHASE_CONFIG,
  ProjectSite,
} from "../types";
import { useTheme } from "../context/ThemeContext";

interface LogFeedProps {
  logs: ConstructionLog[];
  projects: ProjectSite[];
  methods: ConstructionMethod[];
  selectedProjectId?: string | null;
  onOpenLogModal: (log?: ConstructionLog) => void;
  onPrintReport: (project: ProjectSite, logs: ConstructionLog[]) => void;
  onOpenAiConsultant: (context?: string) => void;
  onOpenMethodDetail?: (method: ConstructionMethod) => void;
}

export const LogFeed: React.FC<LogFeedProps> = ({
  logs,
  projects,
  methods,
  selectedProjectId,
  onOpenLogModal,
  onPrintReport,
  onOpenAiConsultant,
  onOpenMethodDetail,
}) => {
  const { isDark } = useTheme();

  // Filters State
  const [filterProjectId, setFilterProjectId] = useState<string>(
    selectedProjectId || "ALL"
  );
  const [filterCategory, setFilterCategory] = useState<string>("ALL");
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [filterPhase, setFilterPhase] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // UI state
  const [expandedLogIds, setExpandedLogIds] = useState<Record<string, boolean>>({});
  const [lightboxPhoto, setLightboxPhoto] = useState<LogPhoto | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [expandAll, setExpandAll] = useState<boolean>(false);
  const scrollCategoryRef = useRef<HTMLDivElement>(null);

  const scrollCategoryTabs = (direction: "left" | "right") => {
    if (scrollCategoryRef.current) {
      const scrollAmount = direction === "left" ? -180 : 180;
      scrollCategoryRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Toggle card expand/collapse (default to collapsed summary mode for high mobile scanning efficiency)
  const toggleExpand = (id: string) => {
    setExpandedLogIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleToggleAllExpand = () => {
    const nextState = !expandAll;
    setExpandAll(nextState);
    const newExpanded: Record<string, boolean> = {};
    filteredLogs.forEach((l) => {
      newExpanded[l.id] = nextState;
    });
    setExpandedLogIds(newExpanded);
  };

  // Helper to get project info
  const getProjectName = (pId: string) => {
    const p = projects.find((item) => item.id === pId);
    return p ? p.name : "현장 미지정";
  };

  const getProjectObj = (pId: string) => {
    return projects.find((item) => item.id === pId);
  };

  // Helper for Category Icon
  const renderCategoryIcon = (category?: NoteCategory) => {
    switch (category) {
      case "FIELD_DISCREPANCY":
        return <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />;
      case "METHOD_CHANGE":
        return <Repeat className="w-3.5 h-3.5 text-purple-500" />;
      case "SUPERVISOR_AGREEMENT":
        return <Handshake className="w-3.5 h-3.5 text-blue-500" />;
      case "KEC_CAUTION":
        return <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />;
      case "SPECIAL_MATERIAL":
        return <Wrench className="w-3.5 h-3.5 text-emerald-500" />;
      default:
        return <FileText className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  // Status Badge Helper
  const renderStatusBadge = (status?: NoteStatus) => {
    switch (status) {
      case "RESOLVED":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-bold font-mono bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-400/40">
            <CheckCircle className="w-3 h-3 text-emerald-500" />
            조치완료
          </span>
        );
      case "IN_PROGRESS":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-bold font-mono bg-blue-500/15 text-blue-700 dark:text-blue-300 border border-blue-400/40">
            <Clock className="w-3 h-3 text-blue-500 animate-spin" />
            조치중
          </span>
        );
      case "PENDING_REVIEW":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-bold font-mono bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-400/40">
            <HelpCircle className="w-3 h-3 text-amber-500" />
            협의대기
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-bold font-mono bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-400/40">
            <CheckCircle className="w-3 h-3 text-emerald-500" />
            조치완료
          </span>
        );
    }
  };

  // Filtered Notes
  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      // Project filter
      if (filterProjectId !== "ALL" && log.projectId !== filterProjectId) {
        return false;
      }
      // Category filter
      if (filterCategory !== "ALL" && log.category !== filterCategory) {
        return false;
      }
      // Status filter
      if (filterStatus !== "ALL") {
        const logStatus = log.status || "RESOLVED";
        if (logStatus !== filterStatus) return false;
      }
      // Phase filter
      if (filterPhase !== "ALL" && log.phase !== filterPhase) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const titleMatch = (log.title || "").toLowerCase().includes(q);
        const descMatch = (log.workDescription || "").toLowerCase().includes(q);
        const issueMatch = (log.issueDescription || "").toLowerCase().includes(q);
        const actionMatch = (log.actionTaken || "").toLowerCase().includes(q);
        const locMatch = (log.workLocation || "").toLowerCase().includes(q);
        const authorMatch = (log.signedBy || "").toLowerCase().includes(q);
        const methodMatch = (log.methodTitle || "").toLowerCase().includes(q);
        return (
          titleMatch ||
          descMatch ||
          issueMatch ||
          actionMatch ||
          locMatch ||
          authorMatch ||
          methodMatch
        );
      }
      return true;
    });
  }, [logs, filterProjectId, filterCategory, filterStatus, filterPhase, searchQuery]);

  // Statistics calculation for KPI cards
  const stats = useMemo(() => {
    const total = filteredLogs.length;
    const resolved = filteredLogs.filter((l) => (l.status || "RESOLVED") === "RESOLVED").length;
    const inProgress = filteredLogs.filter((l) => l.status === "IN_PROGRESS").length;
    const pending = filteredLogs.filter((l) => l.status === "PENDING_REVIEW").length;
    const withPhotos = filteredLogs.filter((l) => l.photos && l.photos.length > 0).length;

    // Categories breakdown
    const discrepancyCount = filteredLogs.filter((l) => (l.category || "FIELD_DISCREPANCY") === "FIELD_DISCREPANCY").length;
    const agreementCount = filteredLogs.filter((l) => l.category === "SUPERVISOR_AGREEMENT").length;
    const methodChangeCount = filteredLogs.filter((l) => l.category === "METHOD_CHANGE").length;
    const kecCautionCount = filteredLogs.filter((l) => l.category === "KEC_CAUTION").length;

    return {
      total,
      resolved,
      inProgress,
      pending,
      withPhotos,
      discrepancyCount,
      agreementCount,
      methodChangeCount,
      kecCautionCount,
    };
  }, [filteredLogs]);

  return (
    <div className="space-y-6 pb-24 md:pb-12">
      {/* Top Header & Action Controls */}
      <div
        className={`flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-sm border shadow-sm transition-colors ${
          isDark
            ? "bg-[#1E293B] border-slate-700 text-slate-100"
            : "bg-white border-slate-200 text-slate-900 shadow-slate-200/50"
        }`}
      >
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span
              className={`px-2 py-0.5 text-[10px] font-mono font-bold rounded-sm border uppercase ${
                isDark
                  ? "bg-amber-400/10 text-amber-300 border-amber-400/30"
                  : "bg-amber-50 text-amber-800 border-amber-300"
              }`}
            >
              Field Note & Technical Discrepancy
            </span>
            <span
              className={`text-xs font-mono font-bold ${
                isDark ? "text-slate-400" : "text-slate-500"
              }`}
            >
              총 {logs.length}건 등록됨 (조회 {filteredLogs.length}건)
            </span>
          </div>
          <h1
            className={`text-xl sm:text-2xl font-bold tracking-tight ${
              isDark ? "text-white" : "text-slate-950"
            }`}
          >
            현장 시공노트 (기술 메모 & 특이사항)
          </h1>
          <p className={`text-xs mt-1 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
            표준 시공방법과 다른 현장 돌발상황, 도면 불일치, 감리·발주처 협의, KEC 기술기준 검토 및 대체공법 아카이브
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap shrink-0">
          {projects.length > 0 && (
            <button
              id="print-feed-report-btn"
              onClick={() => {
                const targetProj =
                  filterProjectId !== "ALL"
                    ? getProjectObj(filterProjectId)
                    : projects[0];
                if (targetProj) {
                  onPrintReport(
                    targetProj,
                    logs.filter((l) =>
                      filterProjectId !== "ALL" ? l.projectId === filterProjectId : true
                    )
                  );
                }
              }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-sm border text-xs font-bold font-mono transition-all uppercase ${
                isDark
                  ? "border-slate-700 hover:bg-slate-800 text-slate-300"
                  : "border-slate-300 hover:bg-slate-100 text-slate-700"
              }`}
            >
              <Printer className="w-3.5 h-3.5" />
              <span>시공노트 보고서 인쇄</span>
            </button>
          )}

          <button
            id="write-new-log-btn"
            onClick={() => onOpenLogModal()}
            className="flex items-center gap-1.5 px-4 py-2 rounded-sm bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black shadow-md shadow-amber-400/20 active:scale-95 transition-all uppercase font-mono"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>새 시공노트 작성</span>
          </button>
        </div>
      </div>

      {/* Compact KPI & Fast Overview Bar */}
      <div
        className={`p-3 rounded-sm border shadow-sm flex flex-wrap items-center justify-between gap-3 text-xs font-mono ${
          isDark
            ? "bg-[#1E293B] border-slate-700 text-slate-200"
            : "bg-white border-slate-200 text-slate-800"
        }`}
      >
        <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
          <div className="flex items-center gap-1.5 font-bold">
            <span className="text-slate-400">전체</span>
            <span className="px-2 py-0.5 rounded-xs bg-slate-100 dark:bg-slate-800 text-amber-500 font-bold border border-slate-300 dark:border-slate-700">
              {stats.total}건
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-emerald-500 font-bold flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" /> 조치완료
            </span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">
              {stats.resolved}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-blue-400 font-bold flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> 진행/대기
            </span>
            <span className="font-bold text-blue-500 dark:text-blue-300">
              {stats.inProgress + stats.pending}
            </span>
          </div>

          {stats.withPhotos > 0 && (
            <div className="hidden sm:flex items-center gap-1.5">
              <span className="text-purple-400 font-bold flex items-center gap-1">
                <Camera className="w-3.5 h-3.5" /> 사진첨부
              </span>
              <span className="font-bold text-purple-400">
                {stats.withPhotos}
              </span>
            </div>
          )}
        </div>

        {/* Global Expand/Collapse Toggle & Filter Toggle Button */}
        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={handleToggleAllExpand}
            className={`px-2.5 py-1 rounded-xs border text-[11px] font-bold font-mono transition-colors flex items-center gap-1 ${
              isDark
                ? "border-slate-700 hover:bg-slate-800 text-slate-300"
                : "border-slate-300 hover:bg-slate-100 text-slate-700"
            }`}
          >
            {expandAll ? (
              <>
                <ChevronUp className="w-3 h-3 text-amber-500" />
                <span>모두 요약접기</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-3 h-3 text-amber-500" />
                <span>모두 펼쳐보기</span>
              </>
            )}
          </button>

          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`px-2.5 py-1 rounded-xs border text-[11px] font-bold font-mono transition-colors flex items-center gap-1.5 ${
              isFilterOpen || filterProjectId !== "ALL" || filterStatus !== "ALL" || filterPhase !== "ALL" || searchQuery
                ? "bg-amber-400 text-slate-950 border-amber-400"
                : isDark
                ? "border-slate-700 hover:bg-slate-800 text-slate-300"
                : "border-slate-300 hover:bg-slate-100 text-slate-700"
            }`}
          >
            <Filter className="w-3 h-3" />
            <span>상세검색/필터</span>
            {(filterProjectId !== "ALL" || filterStatus !== "ALL" || filterPhase !== "ALL" || searchQuery) && (
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            )}
          </button>
        </div>
      </div>

      {/* Category Quick Chips & Collapsible Detailed Filters */}
      <div
        className={`p-3 rounded-sm border shadow-sm space-y-2.5 ${
          isDark ? "bg-[#1E293B] border-slate-700" : "bg-white border-slate-200"
        }`}
      >
        {/* Quick Category Horizontal Chips with Scroll Controls */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
            <span className="font-bold flex items-center gap-1 text-slate-700 dark:text-slate-300">
              <Tag className="w-3 h-3 text-amber-500" />
              <span>노트 유형별 빠른 필터</span>
            </span>
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-amber-600 dark:text-amber-400 bg-amber-400/10 px-1.5 py-0.2 rounded border border-amber-400/20 flex items-center gap-0.5 sm:hidden">
                <ArrowRightLeft className="w-2.5 h-2.5" />
                <span>스크롤</span>
              </span>
              <div className="flex items-center gap-0.5">
                <button
                  type="button"
                  onClick={() => scrollCategoryTabs("left")}
                  aria-label="이전 분류"
                  className="p-0.5 rounded bg-slate-100 dark:bg-slate-800 hover:bg-amber-400 hover:text-slate-950 text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-700 transition-colors"
                >
                  <ChevronLeft className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollCategoryTabs("right")}
                  aria-label="다음 분류"
                  className="p-0.5 rounded bg-slate-100 dark:bg-slate-800 hover:bg-amber-400 hover:text-slate-950 text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-700 transition-colors"
                >
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          <div
            ref={scrollCategoryRef}
            className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin scroll-smooth"
          >
            <button
              onClick={() => setFilterCategory("ALL")}
              className={`px-2.5 py-1 rounded-xs text-xs font-mono font-bold shrink-0 transition-all border ${
                filterCategory === "ALL"
                  ? "bg-amber-400 text-slate-950 border-amber-400 shadow-xs"
                  : isDark
                  ? "bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200"
                  : "bg-slate-100 text-slate-600 border-slate-200 hover:text-slate-900"
              }`}
            >
              전체 ({logs.length})
            </button>
            {(Object.keys(NOTE_CATEGORY_CONFIG) as NoteCategory[]).map((catKey) => {
              const conf = NOTE_CATEGORY_CONFIG[catKey];
              const isSelected = filterCategory === catKey;
              const count = logs.filter((l) => l.category === catKey).length;
              return (
                <button
                  key={catKey}
                  onClick={() => setFilterCategory(catKey)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-xs text-xs font-mono shrink-0 transition-all border ${
                    isSelected
                      ? "bg-amber-400 text-slate-950 border-amber-400 font-bold shadow-xs"
                      : isDark
                      ? "bg-slate-900/80 text-slate-300 border-slate-700 hover:bg-slate-800"
                      : "bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100"
                  }`}
                >
                  {renderCategoryIcon(catKey)}
                  <span>{conf.short}</span>
                  <span className="text-[10px] opacity-75 font-bold">({count})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Collapsible Filter Panel */}
        {isFilterOpen && (
          <div className="pt-2 border-t border-slate-200 dark:border-slate-700/70 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {/* Project Filter */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                  현장 프로젝트
                </label>
                <select
                  value={filterProjectId}
                  onChange={(e) => setFilterProjectId(e.target.value)}
                  className={`w-full px-2 py-1.5 rounded-xs border text-xs font-mono font-bold ${
                    isDark
                      ? "bg-slate-900 border-slate-700 text-slate-200"
                      : "bg-slate-50 border-slate-300 text-slate-800"
                  }`}
                >
                  <option value="ALL">전체 현장 ({projects.length}개소)</option>
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      [{p.code}] {p.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Action Status Filter */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                  조치 상태
                </label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className={`w-full px-2 py-1.5 rounded-xs border text-xs font-mono font-bold ${
                    isDark
                      ? "bg-slate-900 border-slate-700 text-slate-200"
                      : "bg-slate-50 border-slate-300 text-slate-800"
                  }`}
                >
                  <option value="ALL">전체 상태</option>
                  <option value="RESOLVED">✅ 조치 완료</option>
                  <option value="IN_PROGRESS">🔄 조치 진행 중</option>
                  <option value="PENDING_REVIEW">⏳ 감리/발주처 협의 대기</option>
                </select>
              </div>

              {/* Phase Filter */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                  공정 단계 (PHASE)
                </label>
                <select
                  value={filterPhase}
                  onChange={(e) => setFilterPhase(e.target.value)}
                  className={`w-full px-2 py-1.5 rounded-xs border text-xs font-mono font-bold ${
                    isDark
                      ? "bg-slate-900 border-slate-700 text-slate-200"
                      : "bg-slate-50 border-slate-300 text-slate-800"
                  }`}
                >
                  <option value="ALL">전체 12단계 공정</option>
                  {Object.entries(PHASE_CONFIG).map(([pKey, config]) => (
                    <option key={pKey} value={pKey}>
                      {config.stepNumber}. {config.shortName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Search Query */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                  기술 키워드 검색
                </label>
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-2 top-2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="도면, 감리, KEC, 위치..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full pl-7 pr-3 py-1.5 rounded-xs border text-xs font-mono ${
                      isDark
                        ? "bg-slate-900 border-slate-700 text-slate-200 focus:border-amber-400"
                        : "bg-slate-50 border-slate-300 text-slate-800 focus:border-amber-400"
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Active Filter Badges */}
        {(filterProjectId !== "ALL" ||
          filterCategory !== "ALL" ||
          filterStatus !== "ALL" ||
          filterPhase !== "ALL" ||
          searchQuery) && (
          <div className="flex items-center gap-1.5 flex-wrap pt-1.5 border-t border-slate-200 dark:border-slate-700/60 text-[11px] font-mono">
            <span className="text-slate-400 font-bold">적용:</span>
            {filterProjectId !== "ALL" && (
              <span className="px-2 py-0.5 rounded-xs bg-amber-400/20 text-amber-700 dark:text-amber-300 border border-amber-400/30 flex items-center gap-1">
                현장: {getProjectName(filterProjectId)}
                <X
                  className="w-3 h-3 cursor-pointer hover:text-rose-500"
                  onClick={() => setFilterProjectId("ALL")}
                />
              </span>
            )}
            {filterCategory !== "ALL" && (
              <span className="px-2 py-0.5 rounded-xs bg-purple-400/20 text-purple-700 dark:text-purple-300 border border-purple-400/30 flex items-center gap-1">
                유형: {NOTE_CATEGORY_CONFIG[filterCategory as NoteCategory]?.short}
                <X
                  className="w-3 h-3 cursor-pointer hover:text-rose-500"
                  onClick={() => setFilterCategory("ALL")}
                />
              </span>
            )}
            {filterStatus !== "ALL" && (
              <span className="px-2 py-0.5 rounded-xs bg-emerald-400/20 text-emerald-700 dark:text-emerald-300 border border-emerald-400/30 flex items-center gap-1">
                상태: {filterStatus === "RESOLVED" ? "조치완료" : filterStatus === "IN_PROGRESS" ? "조치중" : "협의대기"}
                <X
                  className="w-3 h-3 cursor-pointer hover:text-rose-500"
                  onClick={() => setFilterStatus("ALL")}
                />
              </span>
            )}
            {filterPhase !== "ALL" && (
              <span className="px-2 py-0.5 rounded-xs bg-blue-400/20 text-blue-700 dark:text-blue-300 border border-blue-400/30 flex items-center gap-1">
                공정: {PHASE_CONFIG[filterPhase as ConstructionPhase]?.shortName}
                <X
                  className="w-3 h-3 cursor-pointer hover:text-rose-500"
                  onClick={() => setFilterPhase("ALL")}
                />
              </span>
            )}
            {searchQuery && (
              <span className="px-2 py-0.5 rounded-xs bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 flex items-center gap-1">
                검색: "{searchQuery}"
                <X
                  className="w-3 h-3 cursor-pointer hover:text-rose-500"
                  onClick={() => setSearchQuery("")}
                />
              </span>
            )}
            <button
              onClick={() => {
                setFilterProjectId("ALL");
                setFilterCategory("ALL");
                setFilterStatus("ALL");
                setFilterPhase("ALL");
                setSearchQuery("");
              }}
              className="text-amber-600 dark:text-amber-400 hover:underline font-bold ml-auto text-[10px]"
            >
              전체 초기화
            </button>
          </div>
        )}
      </div>

      {/* Note Cards List */}
      {filteredLogs.length === 0 ? (
        <div
          className={`p-12 text-center rounded-sm border shadow-sm ${
            isDark
              ? "bg-[#1E293B] border-slate-700 text-slate-400"
              : "bg-white border-slate-200 text-slate-500"
          }`}
        >
          <FileText className="w-10 h-10 mx-auto text-slate-400 mb-3 opacity-50" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-1">
            해당 조건의 현장 시공노트가 없습니다
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto mb-4">
            필터 조건을 변경하거나 우측 상단의 '+ 새 시공노트 작성' 버튼을 눌러 도면 불일치나 현장 특이사항을 기록하세요.
          </p>
          <button
            onClick={() => onOpenLogModal()}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-sm text-xs font-bold uppercase font-mono shadow-sm"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span>새 시공노트 작성하기</span>
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredLogs.map((log) => {
            const phaseConfig =
              PHASE_CONFIG[log.phase] ||
              PHASE_CONFIG[ConstructionPhase.PHASE_01_PREPARATION];
            // Default to expanded only if expandAll is true or individual card was toggled
            const isExpanded = expandedLogIds[log.id] === true;
            const projectName = getProjectName(log.projectId);
            const methodObj = log.methodId
              ? methods.find((m) => m.id === log.methodId)
              : null;
            const categoryConfig = log.category
              ? NOTE_CATEGORY_CONFIG[log.category]
              : NOTE_CATEGORY_CONFIG.FIELD_DISCREPANCY;

            const noteTitle =
              log.title ||
              (log.workDescription
                ? log.workDescription.split("\n")[0]
                : "현장 시공 특이사항 메모");

            const issueSnippet = log.issueDescription || log.workDescription || "";
            const actionSnippet = log.actionTaken || log.specialNotes || "";

            return (
              <div
                key={log.id}
                id={`note-card-${log.id}`}
                className={`rounded-sm border shadow-xs transition-all overflow-hidden ${
                  isDark
                    ? "bg-[#1E293B] border-slate-700 hover:border-slate-600"
                    : "bg-white border-slate-200 hover:border-slate-300 shadow-slate-200/40"
                }`}
              >
                {/* Note Header / Summary Bar (Click to Toggle) */}
                <div
                  onClick={() => toggleExpand(log.id)}
                  className={`p-3 sm:p-3.5 cursor-pointer transition-colors select-none ${
                    isExpanded
                      ? isDark
                        ? "bg-slate-900/90 border-b border-slate-700/80"
                        : "bg-slate-50 border-b border-slate-200"
                      : isDark
                      ? "hover:bg-slate-800/60"
                      : "hover:bg-slate-50/80"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2.5">
                    <div className="min-w-0 flex-1 space-y-1.5">
                      {/* Top Badges Row */}
                      <div className="flex items-center gap-1.5 flex-wrap text-xs">
                        {/* Category Badge */}
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-xs text-[11px] font-bold border font-mono ${categoryConfig.bg} ${categoryConfig.border}`}
                        >
                          {renderCategoryIcon(log.category)}
                          <span>{categoryConfig.short}</span>
                        </span>

                        {/* Status Badge */}
                        {renderStatusBadge(log.status)}

                        {/* Phase Step */}
                        <span
                          className={`px-1.5 py-0.5 rounded-xs text-[10px] font-mono font-bold border uppercase tracking-wider ${phaseConfig.badgeBg}`}
                        >
                          {phaseConfig.stepNumber}. {phaseConfig.shortName}
                        </span>

                        {/* Project Name */}
                        <span
                          className={`flex items-center gap-1 text-[11px] font-mono px-1.5 py-0.5 rounded-xs border ${
                            isDark
                              ? "bg-slate-800 border-slate-700 text-slate-300"
                              : "bg-white border-slate-300 text-slate-700"
                          }`}
                        >
                          <Building2 className="w-3 h-3 text-slate-400" />
                          <span className="truncate max-w-[120px] sm:max-w-none">{projectName}</span>
                        </span>

                        {/* Date */}
                        <div className="flex items-center gap-1 font-mono text-[11px] text-slate-400 ml-auto sm:ml-0">
                          <Calendar className="w-3 h-3 text-amber-500 shrink-0" />
                          <span>{log.date}</span>
                        </div>
                      </div>

                      {/* Title - Full Title Display without truncate */}
                      <div className="flex items-baseline gap-2 pt-0.5">
                        <h3
                          className={`text-sm sm:text-base font-bold leading-snug break-words ${
                            isDark ? "text-white" : "text-slate-950"
                          }`}
                        >
                          {noteTitle}
                        </h3>
                        {log.photos && log.photos.length > 0 && (
                          <span className="shrink-0 flex items-center gap-1 text-[10px] font-mono font-bold text-purple-500 bg-purple-500/10 px-1.5 py-0.5 rounded-xs border border-purple-500/20">
                            <Camera className="w-3 h-3" />
                            {log.photos.length}
                          </span>
                        )}
                      </div>

                      {/* Collapsed Preview Snippets (2-Line Dual-Tone Preview) */}
                      {!isExpanded && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1 text-[11px]">
                          {issueSnippet && (
                            <div className="flex items-center gap-1 text-slate-400 truncate">
                              <span className="shrink-0 font-mono font-bold text-rose-500 px-1 py-0.2 bg-rose-500/10 rounded-xs">
                                문제
                              </span>
                              <span className="truncate text-slate-500 dark:text-slate-400">{issueSnippet}</span>
                            </div>
                          )}
                          {actionSnippet && (
                            <div className="flex items-center gap-1 text-slate-400 truncate">
                              <span className="shrink-0 font-mono font-bold text-emerald-500 px-1 py-0.2 bg-emerald-500/10 rounded-xs">
                                조치
                              </span>
                              <span className="truncate text-slate-500 dark:text-slate-400">{actionSnippet}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Actions & Expand Chevron */}
                    <div className="flex items-center gap-1.5 shrink-0 self-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenLogModal(log);
                        }}
                        className={`p-1.5 rounded-xs border text-xs font-mono transition-colors ${
                          isDark
                            ? "border-slate-700 hover:bg-slate-800 text-slate-300"
                            : "border-slate-300 hover:bg-slate-100 text-slate-700"
                        }`}
                        title="시공노트 수정"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>

                      <div
                        className={`p-1.5 rounded-xs border text-xs transition-colors flex items-center justify-center ${
                          isExpanded
                            ? "bg-amber-400 text-slate-950 border-amber-400 font-bold"
                            : isDark
                            ? "border-slate-700 text-slate-400"
                            : "border-slate-300 text-slate-600"
                        }`}
                      >
                        {isExpanded ? (
                          <ChevronUp className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Detailed Content */}
                {isExpanded && (
                  <div className="p-4 sm:p-5 space-y-4 text-xs">
                    {/* Method Link Pill & Location */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-1">
                      {log.workLocation ? (
                        <span
                          className={`flex items-center gap-1 text-xs ${
                            isDark ? "text-slate-400" : "text-slate-600"
                          }`}
                        >
                          <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                          <strong className="font-mono">{log.workLocation}</strong>
                        </span>
                      ) : (
                        <div />
                      )}

                      {log.methodTitle && (
                        <button
                          onClick={() => {
                            if (methodObj && onOpenMethodDetail) {
                              onOpenMethodDetail(methodObj);
                            }
                          }}
                          className={`text-[11px] font-mono font-bold px-2.5 py-1 rounded-xs border shrink-0 flex items-center gap-1.5 transition-all ${
                            isDark
                              ? "bg-amber-400/10 text-amber-300 border-amber-400/30 hover:bg-amber-400/20"
                              : "bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100"
                          }`}
                          title="해당 표준 시공방법 열기"
                        >
                          <BookOpen className="w-3.5 h-3.5 text-amber-500" />
                          <span className="truncate max-w-[200px] sm:max-w-none">
                            표준공법: {log.methodTitle}
                          </span>
                          <ExternalLink className="w-3 h-3 opacity-70" />
                        </button>
                      )}
                    </div>

                    {/* Core 2-Column: Issue Description vs Action Taken */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {/* 🔴 Problem / Situation */}
                      <div
                        className={`p-3.5 rounded-sm border ${
                          isDark
                            ? "bg-rose-950/20 border-rose-900/40 text-slate-200"
                            : "bg-rose-50/70 border-rose-200 text-slate-800"
                        }`}
                      >
                        <div className="flex items-center gap-1.5 mb-2 font-bold text-rose-600 dark:text-rose-400">
                          <AlertTriangle className="w-4 h-4 shrink-0" />
                          <span className="text-xs uppercase font-mono tracking-wide">
                            현장 상황 및 발생 원인 (문제점)
                          </span>
                        </div>
                        <p className="text-xs leading-relaxed whitespace-pre-wrap font-sans">
                          {log.issueDescription ||
                            log.workDescription ||
                            "구체적인 간섭/돌발 상황이 기록되지 않았습니다."}
                        </p>
                      </div>

                      {/* 🟢 Action Taken & Solution */}
                      <div
                        className={`p-3.5 rounded-sm border ${
                          isDark
                            ? "bg-emerald-950/20 border-emerald-900/40 text-slate-200"
                            : "bg-emerald-50/70 border-emerald-200 text-slate-800"
                        }`}
                      >
                        <div className="flex items-center gap-1.5 mb-2 font-bold text-emerald-600 dark:text-emerald-400">
                          <CheckCircle2 className="w-4 h-4 shrink-0" />
                          <span className="text-xs uppercase font-mono tracking-wide">
                            실제 적용 조치 및 대체 시공 방법 (감리협의)
                          </span>
                        </div>
                        <p className="text-xs leading-relaxed whitespace-pre-wrap font-sans">
                          {log.actionTaken ||
                            log.specialNotes ||
                            "현장 조치 내역이 기록되지 않았습니다."}
                        </p>
                      </div>
                    </div>

                    {/* Follow-up Note */}
                    {log.followUpNote && (
                      <div
                        className={`p-3 rounded-sm border flex items-start gap-2 ${
                          isDark
                            ? "bg-slate-900/80 border-slate-800 text-slate-300"
                            : "bg-slate-50 border-slate-200 text-slate-700"
                        }`}
                      >
                        <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-amber-600 dark:text-amber-400 text-[11px] font-mono block mb-0.5">
                            후속 공정 연계 및 주의사항:
                          </span>
                          <p className="text-xs leading-relaxed">{log.followUpNote}</p>
                        </div>
                      </div>
                    )}

                    {/* Photos Gallery */}
                    {log.photos && log.photos.length > 0 && (
                      <div className="space-y-2 pt-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-bold uppercase text-slate-400 flex items-center gap-1">
                            <Camera className="w-3.5 h-3.5 text-amber-500" />
                            현장 시공 사진 및 도면 스케치 ({log.photos.length}장)
                          </span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                          {log.photos.map((p) => (
                            <div
                              key={p.id}
                              className="relative group border border-slate-700/80 rounded-sm overflow-hidden aspect-video bg-black cursor-pointer shadow-xs"
                              onClick={() => setLightboxPhoto(p)}
                            >
                              <img
                                src={p.url}
                                alt={p.caption}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                referrerPolicy="no-referrer"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-1.5 flex flex-col justify-between">
                                <div className="flex justify-end">
                                  <span className="p-1 bg-black/60 text-white rounded-xs">
                                    <ZoomIn className="w-3 h-3" />
                                  </span>
                                </div>
                                <p className="text-[10px] text-white truncate font-mono">
                                  {p.caption || "현장 사진"}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* AI Technical Analysis Card */}
                    {log.aiAnalysis && (
                      <div
                        className={`p-3.5 rounded-sm border ${
                          isDark
                            ? "bg-slate-900/90 border-slate-800 text-slate-300"
                            : "bg-slate-50 border-slate-200 text-slate-700"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[11px] font-mono font-bold uppercase text-amber-500 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5" />
                            AI 기술기준 & KEC 적합성 검토 결과
                          </span>
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-xs bg-amber-400/20 text-amber-700 dark:text-amber-300">
                            품질 지수 {log.aiAnalysis.qualityScore}점 / 100점
                          </span>
                        </div>
                        <p className="text-xs mb-2 leading-relaxed text-slate-200">
                          {log.aiAnalysis.summary}
                        </p>
                        {log.aiAnalysis.complianceCheck && (
                          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono bg-emerald-500/10 p-2 rounded-xs mb-2 border border-emerald-500/20">
                            <strong>규정 적합성:</strong> {log.aiAnalysis.complianceCheck}
                          </div>
                        )}
                        {log.aiAnalysis.riskFactors && log.aiAnalysis.riskFactors.length > 0 && (
                          <div className="text-[11px] space-y-1">
                            <span className="text-slate-400 font-bold block font-mono">
                              주의 관리 요인:
                            </span>
                            <ul className="list-disc list-inside space-y-0.5 text-slate-300">
                              {log.aiAnalysis.riskFactors.map((rf, i) => (
                                <li key={i}>{rf}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Signatures & Footer Meta */}
                    <div
                      className={`pt-3 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-[11px] ${
                        isDark
                          ? "border-slate-800 text-slate-400"
                          : "border-slate-200 text-slate-500"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <HardHat className="w-3.5 h-3.5 text-amber-500" />
                          기록자: <strong className="text-slate-200">{log.signedBy}</strong>
                        </span>
                        {log.approvedBy && (
                          <span className="flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            협의/승인 감리원:{" "}
                            <strong className="text-slate-200">{log.approvedBy}</strong>
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const p = getProjectObj(log.projectId);
                            if (p) onPrintReport(p, [log]);
                          }}
                          className={`flex items-center gap-1 px-2.5 py-1 rounded-xs border uppercase text-[10px] font-bold ${
                            isDark
                              ? "border-slate-700 hover:bg-slate-800 text-slate-300"
                              : "border-slate-300 hover:bg-slate-100 text-slate-700"
                          }`}
                        >
                          <Printer className="w-3 h-3" />
                          <span>노트 인쇄</span>
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenLogModal(log);
                          }}
                          className="flex items-center gap-1 px-3 py-1 rounded-xs bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold uppercase text-[10px]"
                        >
                          <Edit className="w-3 h-3" />
                          <span>노트 수정</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-md"
          onClick={() => setLightboxPhoto(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] bg-slate-900 rounded-sm border border-slate-700 overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-300">
              <span>{lightboxPhoto.caption || "시공 현장 사진 뷰어"}</span>
              <button
                type="button"
                onClick={() => setLightboxPhoto(null)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="max-h-[80vh] overflow-auto flex items-center justify-center bg-black p-2">
              <img
                src={lightboxPhoto.url}
                alt={lightboxPhoto.caption}
                className="max-w-full max-h-[75vh] object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
