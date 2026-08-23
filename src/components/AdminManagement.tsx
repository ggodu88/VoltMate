import React, { useState, useRef } from "react";
import {
  Settings2,
  Plus,
  Edit,
  Trash2,
  Download,
  Upload,
  RotateCcw,
  Sparkles,
  Search,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Layers,
  FileCode,
  Check,
  Cloud,
  CloudUpload,
  RefreshCw,
  Database,
} from "lucide-react";
import { ConstructionMethod, ConstructionPhase, PHASE_CONFIG } from "../types";
import {
  exportAllDataAsJSON,
  importAllDataFromJSON,
  resetMethodsToDefault,
  syncAllWithCloud,
  uploadLocalToCloud,
} from "../utils/storage";
import { useTheme } from "../context/ThemeContext";

interface AdminManagementProps {
  methods: ConstructionMethod[];
  onAddMethod: () => void;
  onEditMethod: (method: ConstructionMethod) => void;
  onDeleteMethod: (id: string) => void;
  onRefreshData: () => void;
}

export const AdminManagement: React.FC<AdminManagementProps> = ({
  methods,
  onAddMethod,
  onEditMethod,
  onDeleteMethod,
  onRefreshData,
}) => {
  const { isDark } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPhase, setSelectedPhase] = useState<string>("ALL");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [successToast, setSuccessToast] = useState<string | null>(null);
  const [isCloudSyncing, setIsCloudSyncing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = Array.from(new Set(methods.map((m) => m.category)));

  const showToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 3500);
  };

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

  const customCount = methods.filter((m) => m.isCustom).length;

  const handleExportJSON = () => {
    const json = exportAllDataAsJSON();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `전기공사_시공관리_백업_${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("전체 시공방법 및 현장 데이터가 JSON으로 백업되었습니다.");
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const success = importAllDataFromJSON(content);
        if (success) {
          onRefreshData();
          showToast("백업 데이터가 성공적으로 복원되었습니다.");
        } else {
          alert("올바르지 않은 JSON 데이터 파일 형식입니다.");
        }
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleResetDefaults = () => {
    if (
      window.confirm(
        "기본 전기공사 표준시방서 데이터로 초기화하시겠습니까? 사용자 추가 항목은 재설정됩니다."
      )
    ) {
      resetMethodsToDefault();
      onRefreshData();
      showToast("KEC 표준 시공방법 기본값으로 복원되었습니다.");
    }
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`'${title}' 시공방법을 영구 삭제하시겠습니까?`)) {
      onDeleteMethod(id);
      showToast("시공방법이 삭제되었습니다.");
    }
  };

  // Cloud Firestore Sync Actions
  const handleCloudUpload = async () => {
    setIsCloudSyncing(true);
    try {
      await uploadLocalToCloud();
      showToast("로컬 데이터가 Firebase Firestore 클라우드에 성공적으로 업로드되었습니다.");
    } catch (err: any) {
      alert("클라우드 업로드 실패: " + err.message);
    } finally {
      setIsCloudSyncing(false);
    }
  };

  const handleCloudPull = async () => {
    setIsCloudSyncing(true);
    try {
      await syncAllWithCloud();
      onRefreshData();
      showToast("Firestore 클라우드에서 최신 데이터를 성공적으로 불러왔습니다.");
    } catch (err: any) {
      alert("클라우드 동기화 실패: " + err.message);
    } finally {
      setIsCloudSyncing(false);
    }
  };

  return (
    <div className="space-y-6 pb-24 md:pb-12">
      {/* Toast Notification */}
      {successToast && (
        <div
          className={`fixed top-20 right-4 z-50 px-4 py-3 rounded-sm shadow-2xl border flex items-center gap-2 font-mono ${
            isDark
              ? "bg-[#1E293B] text-slate-100 border-amber-400"
              : "bg-white text-slate-900 border-amber-400"
          }`}
        >
          <CheckCircle2 className="w-5 h-5 text-amber-500" />
          <span className="text-xs font-bold">{successToast}</span>
        </div>
      )}

      {/* Admin Top Banner */}
      <div
        className={`rounded-sm p-6 md:p-8 shadow-sm border transition-colors ${
          isDark
            ? "bg-[#1E293B] border-slate-700 text-slate-100"
            : "bg-white border-slate-200 text-slate-900 shadow-slate-200/50"
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            {/* Single Line Header Meta */}
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="px-2.5 py-0.5 text-[10px] font-black bg-amber-400 text-slate-950 rounded-sm uppercase tracking-wider font-mono">
                ADMIN CONTROL CENTER
              </span>
              <span
                className={`text-xs font-mono font-semibold px-2 py-0.5 rounded-sm border flex items-center gap-1 ${
                  isDark
                    ? "bg-slate-900/80 text-amber-400 border-slate-700"
                    : "bg-slate-100 text-amber-800 border-slate-300"
                }`}
              >
                <Cloud className="w-3.5 h-3.5" /> FIRESTORE CLOUD SYNCED
              </span>
            </div>
            <h1
              className={`text-2xl md:text-3xl font-black tracking-tight uppercase ${
                isDark ? "text-white" : "text-slate-950"
              }`}
            >
              시공방법 관리자 센터
            </h1>
            <p
              className={`text-xs sm:text-sm mt-2 max-w-3xl leading-relaxed ${
                isDark ? "text-slate-300" : "text-slate-600"
              }`}
            >
              착공부터 준공까지의 공정별 시공방법을 신규 등록, 업데이트 및 수정할 수 있으며,
              AI 기반 자동 표준안 작성 및 Firebase Firestore 클라우드 영구 저장/동기화를 제공합니다.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              id="admin-add-method-btn"
              onClick={onAddMethod}
              className="flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-4 py-2.5 rounded-sm text-xs shadow-sm shadow-amber-400/20 active:scale-95 transition-all uppercase tracking-wider"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>신규 시공방법 등록</span>
            </button>
          </div>
        </div>

        {/* Quick Admin Stats in Single Line Format */}
        <div
          className={`grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t text-xs ${
            isDark ? "border-slate-700" : "border-slate-200"
          }`}
        >
          <div
            className={`p-3 rounded-sm border ${
              isDark ? "bg-slate-900/80 border-slate-700" : "bg-slate-50 border-slate-200"
            }`}
          >
            <span className="text-[10px] uppercase font-mono block text-slate-400">TOTAL METHODS</span>
            <span className="text-xl font-black font-mono text-amber-600 dark:text-amber-400">
              {methods.length}건
            </span>
          </div>

          <div
            className={`p-3 rounded-sm border ${
              isDark ? "bg-slate-900/80 border-slate-700" : "bg-slate-50 border-slate-200"
            }`}
          >
            <span className="text-[10px] uppercase font-mono block text-slate-400">CUSTOM/UPDATED</span>
            <span className="text-xl font-black font-mono text-amber-500 dark:text-amber-300">
              {customCount}건
            </span>
          </div>

          <div
            className={`p-3 rounded-sm border ${
              isDark ? "bg-slate-900/80 border-slate-700" : "bg-slate-50 border-slate-200"
            }`}
          >
            <span className="text-[10px] uppercase font-mono block text-slate-400">STANDARD SPEC</span>
            <span
              className={`text-xs font-bold mt-1 block font-mono ${
                isDark ? "text-slate-200" : "text-slate-800"
              }`}
            >
              KEC 2026 Edition
            </span>
          </div>

          <div
            className={`p-3 rounded-sm border ${
              isDark ? "bg-slate-900/80 border-slate-700" : "bg-slate-50 border-slate-200"
            }`}
          >
            <span className="text-[10px] uppercase font-mono block text-slate-400">CLOUD STORAGE</span>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-1 font-mono">
              <Database className="w-3.5 h-3.5" /> FIRESTORE ONLINE
            </span>
          </div>
        </div>
      </div>

      {/* Cloud & Backup System Tools Bar */}
      <div
        className={`p-4 rounded-sm border shadow-sm space-y-3 transition-colors ${
          isDark
            ? "bg-[#1E293B] border-slate-700"
            : "bg-white border-slate-200"
        }`}
      >
        <div
          className={`flex items-center justify-between border-b pb-2 ${
            isDark ? "border-slate-700" : "border-slate-200"
          }`}
        >
          <div className="flex items-center gap-2">
            <Cloud className="w-4 h-4 text-amber-500" />
            <span
              className={`font-bold text-xs uppercase font-mono ${
                isDark ? "text-white" : "text-slate-950"
              }`}
            >
              Firebase Firestore 클라우드 동기화 & 로컬 백업 도구
            </span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">CLOUD AUTO-PERSISTENCE</span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Cloud Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleCloudUpload}
              disabled={isCloudSyncing}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-sm bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition-colors uppercase font-mono disabled:opacity-50 shadow-sm"
            >
              <CloudUpload className="w-4 h-4" />
              <span>{isCloudSyncing ? "동기화 중..." : "클라우드 전체 업로드 (Firestore)"}</span>
            </button>

            <button
              onClick={handleCloudPull}
              disabled={isCloudSyncing}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-sm border font-bold text-xs transition-colors uppercase font-mono disabled:opacity-50 ${
                isDark
                  ? "bg-slate-900 hover:bg-slate-800 border-slate-700 text-amber-300"
                  : "bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800"
              }`}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isCloudSyncing ? "animate-spin" : ""}`} />
              <span>클라우드 데이터 새로고침</span>
            </button>
          </div>

          {/* Local JSON Backup Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleExportJSON}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-sm border font-bold text-xs transition-colors uppercase font-mono ${
                isDark
                  ? "bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-200"
                  : "bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800"
              }`}
            >
              <Download className="w-4 h-4 text-slate-400" />
              <span>JSON 백업</span>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-sm border font-bold text-xs transition-colors uppercase font-mono ${
                isDark
                  ? "bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-200"
                  : "bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800"
              }`}
            >
              <Upload className="w-4 h-4 text-slate-400" />
              <span>JSON 복원</span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImportJSON}
              accept=".json"
              className="hidden"
            />

            <button
              onClick={handleResetDefaults}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-sm text-rose-600 dark:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-300 dark:border-rose-800 font-bold text-xs transition-colors uppercase font-mono"
            >
              <RotateCcw className="w-4 h-4 text-rose-500" />
              <span>표준 초기화</span>
            </button>
          </div>
        </div>
      </div>

      {/* Search and Phase Filters */}
      <div
        className={`p-4 rounded-sm border shadow-sm space-y-3 transition-colors ${
          isDark
            ? "bg-[#1E293B] border-slate-700"
            : "bg-white border-slate-200"
        }`}
      >
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setSelectedPhase("ALL")}
            className={`px-3 py-1.5 rounded-sm text-xs font-bold whitespace-nowrap transition-all uppercase font-mono ${
              selectedPhase === "ALL"
                ? "bg-amber-400 text-slate-950 font-black"
                : isDark
                ? "bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-700"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300"
            }`}
          >
            전체 단계 ({methods.length})
          </button>

          {Object.entries(PHASE_CONFIG).map(([phaseKey, config]) => {
            const count = methods.filter((m) => m.phase === phaseKey).length;
            return (
              <button
                key={phaseKey}
                onClick={() => setSelectedPhase(phaseKey)}
                className={`px-3 py-1.5 rounded-sm text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 border ${
                  selectedPhase === phaseKey
                    ? "bg-amber-400 text-slate-950 border-amber-400 font-black"
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
                  className={`text-[10px] px-1 py-0.2 rounded-sm font-mono ${
                    selectedPhase === phaseKey
                      ? "bg-slate-950 text-amber-300 font-bold"
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
              id="admin-search-method-input"
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

      {/* Methods Management Table */}
      <div
        className={`rounded-sm border shadow-sm overflow-hidden transition-colors ${
          isDark
            ? "bg-[#1E293B] border-slate-700"
            : "bg-white border-slate-200"
        }`}
      >
        <div
          className={`p-4 border-b flex items-center justify-between ${
            isDark
              ? "border-slate-700 bg-slate-900/80"
              : "border-slate-200 bg-slate-50"
          }`}
        >
          <h3
            className={`font-bold text-xs uppercase tracking-wider font-mono ${
              isDark ? "text-white" : "text-slate-950"
            }`}
          >
            METHOD REPOSITORY ({filteredMethods.length} ITEMS)
          </h3>
          <span className="text-xs text-slate-400 font-mono">
            ACTIONS: EDIT / DELETE
          </span>
        </div>

        <div className={`divide-y ${isDark ? "divide-slate-800" : "divide-slate-200"}`}>
          {filteredMethods.length === 0 ? (
            <div className="p-12 text-center text-slate-500">
              <BookOpen className="w-10 h-10 mx-auto mb-2 text-slate-400" />
              <p
                className={`text-sm font-bold uppercase ${
                  isDark ? "text-slate-400" : "text-slate-700"
                }`}
              >
                해당 조건의 시공방법이 없습니다
              </p>
            </div>
          ) : (
            filteredMethods.map((method) => {
              const phaseConfig = PHASE_CONFIG[method.phase];
              return (
                <div
                  key={method.id}
                  id={`admin-method-row-${method.id}`}
                  className={`p-4 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    isDark ? "hover:bg-slate-900/40" : "hover:bg-slate-50"
                  }`}
                >
                  <div className="space-y-1.5 flex-1 pr-4">
                    {/* Single Line Badges & Code */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-sm border uppercase ${phaseConfig.badgeBg}`}
                      >
                        {phaseConfig.shortName} ({phaseConfig.stepNumber}단계)
                      </span>
                      {method.wbsCode && (
                        <span className="text-[10px] font-mono font-black bg-amber-400 text-slate-950 px-2 py-0.5 rounded-sm">
                          WBS {method.wbsCode}
                        </span>
                      )}
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-sm border ${
                          isDark
                            ? "text-slate-300 bg-slate-800 border-slate-700"
                            : "text-slate-700 bg-slate-100 border-slate-300"
                        }`}
                      >
                        {method.category}
                      </span>
                      {method.isCustom && (
                        <span className="text-[10px] font-mono font-black bg-amber-400/20 text-amber-700 dark:text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded-sm uppercase">
                          CUSTOM
                        </span>
                      )}
                      <span className="text-[10px] text-slate-400 font-mono">
                        ID: {method.id}
                      </span>
                    </div>

                    <h4
                      className={`font-bold text-sm leading-snug ${
                        isDark ? "text-white" : "text-slate-950"
                      }`}
                    >
                      {method.title}
                    </h4>

                    <p
                      className={`text-xs line-clamp-1 leading-relaxed ${
                        isDark ? "text-slate-400" : "text-slate-600"
                      }`}
                    >
                      {method.summary}
                    </p>

                    {/* Single Line Metadata Stats */}
                    <div
                      className={`flex flex-wrap items-center gap-3 text-[11px] font-mono ${
                        isDark ? "text-slate-400" : "text-slate-600"
                      }`}
                    >
                      <span>STEPS: {method.steps.length}단계</span>
                      <span>•</span>
                      <span>SPECS: {method.detailSpecs?.length || 0}규격</span>
                      <span>•</span>
                      <span>PHOTOS: {method.fieldPhotos?.length || 0}장</span>
                      <span>•</span>
                      <span className="text-amber-700 dark:text-amber-300 font-semibold">
                        {method.kecStandards.split(",")[0]}
                      </span>
                      <span>•</span>
                      <span>수정: {method.updatedAt}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    <button
                      id={`edit-method-btn-${method.id}`}
                      onClick={() => onEditMethod(method)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-bold transition-all border uppercase font-mono ${
                        isDark
                          ? "bg-slate-800 hover:bg-amber-400 hover:text-slate-950 text-slate-200 border-slate-700"
                          : "bg-slate-100 hover:bg-amber-400 hover:text-slate-950 text-slate-800 border-slate-300"
                      }`}
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>통합 수정</span>
                    </button>

                    <button
                      id={`delete-method-btn-${method.id}`}
                      onClick={() => handleDelete(method.id, method.title)}
                      className="p-1.5 rounded-sm text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors"
                      title="시공방법 삭제"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
