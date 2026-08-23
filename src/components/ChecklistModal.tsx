import React, { useState, useEffect, useMemo } from "react";
import {
  X,
  CheckSquare,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Printer,
  Sparkles,
  Save,
  Layers,
} from "lucide-react";
import { ConstructionPhase, PHASE_CONFIG, PhaseChecklist } from "../types";
import { PhaseGridSelector } from "./PhaseGridSelector";

interface ChecklistModalProps {
  isOpen: boolean;
  onClose: () => void;
  phase: ConstructionPhase;
  checklists: PhaseChecklist[];
  onSaveChecklist: (updated: PhaseChecklist) => void;
  projectName: string;
}

export const ChecklistModal: React.FC<ChecklistModalProps> = ({
  isOpen,
  onClose,
  phase: initialPhase,
  checklists,
  onSaveChecklist,
  projectName,
}) => {
  const [currentPhase, setCurrentPhase] = useState<ConstructionPhase>(initialPhase);
  const [activeChecklist, setActiveChecklist] = useState<PhaseChecklist | null>(null);

  const checklistItemsCountByPhase = useMemo(() => {
    const counts: Record<string, number> = {};
    checklists.forEach((c) => {
      counts[c.phase] = c.items.length;
    });
    return counts;
  }, [checklists]);

  useEffect(() => {
    setCurrentPhase(initialPhase);
  }, [initialPhase, isOpen]);

  useEffect(() => {
    const found = checklists.find((c) => c.phase === currentPhase);
    if (found) {
      setActiveChecklist(JSON.parse(JSON.stringify(found)));
    } else {
      setActiveChecklist(null);
    }
  }, [currentPhase, checklists, isOpen]);

  if (!isOpen) return null;

  const phaseConfig = PHASE_CONFIG[currentPhase];

  const handleResultChange = (
    itemId: string,
    result: "PASS" | "FAIL" | "NA"
  ) => {
    if (!activeChecklist) return;
    const updatedItems = activeChecklist.items.map((item) =>
      item.id === itemId ? { ...item, result } : item
    );
    setActiveChecklist({ ...activeChecklist, items: updatedItems });
  };

  const handleNoteChange = (itemId: string, note: string) => {
    if (!activeChecklist) return;
    const updatedItems = activeChecklist.items.map((item) =>
      item.id === itemId ? { ...item, note } : item
    );
    setActiveChecklist({ ...activeChecklist, items: updatedItems });
  };

  const handleSave = () => {
    if (activeChecklist) {
      onSaveChecklist(activeChecklist);
      alert("검측 체크리스트 결과가 저장되었습니다.");
      onClose();
    }
  };

  // Stats calculation
  const totalCount = activeChecklist?.items.length || 0;
  const passCount =
    activeChecklist?.items.filter((i) => i.result === "PASS").length || 0;
  const failCount =
    activeChecklist?.items.filter((i) => i.result === "FAIL").length || 0;
  const naCount =
    activeChecklist?.items.filter((i) => i.result === "NA").length || 0;
  const complianceRate =
    totalCount > 0 ? Math.round((passCount / (totalCount - naCount || 1)) * 100) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#1E293B] rounded-sm shadow-2xl border border-slate-700 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden my-4 text-slate-200">
        {/* Header */}
        <div className="bg-slate-900/90 px-6 py-4 text-white flex items-center justify-between border-b border-slate-700 shrink-0">
          <div className="flex items-center space-x-2">
            <CheckSquare className="w-5 h-5 text-amber-400" />
            <div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-sm border uppercase ${phaseConfig.badgeBg}`}
                >
                  {phaseConfig.shortName}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {projectName}
                </span>
              </div>
              <h3 className="font-bold text-sm text-white uppercase tracking-wider font-mono">
                공정 단계별 품질 검측 체크리스트 (INSPECTION CHECKLIST)
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-sm text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Phase Selector with 3x4 / 4x3 Grid & Scroll Controls */}
        <div className="bg-slate-900/90 px-4 py-2.5 border-b border-slate-700 shrink-0">
          <PhaseGridSelector
            selectedPhase={currentPhase}
            onSelectPhase={(p) => setCurrentPhase(p as ConstructionPhase)}
            methodsCountByPhase={checklistItemsCountByPhase}
            allowAll={false}
            title="검측 공정 선택"
          />
        </div>

        {/* Inspection Score Banner */}
        <div className="bg-slate-900/60 px-6 py-3 border-b border-slate-700 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div>
            <h4 className="text-xs font-bold text-white uppercase font-mono">
              {activeChecklist?.title || "검측 체크리스트"}
            </h4>
            <p className="text-[11px] text-slate-400 font-mono">
              책임감리원 및 현장대리인 합동 입회 검측 기준
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono font-bold">
            <span className="text-emerald-300 bg-emerald-950/60 border border-emerald-800 px-2.5 py-1 rounded-sm">
              PASS {passCount}건
            </span>
            <span className="text-rose-300 bg-rose-950/60 border border-rose-800 px-2.5 py-1 rounded-sm">
              FAIL {failCount}건
            </span>
            <span className="text-slate-400 bg-slate-900 border border-slate-700 px-2.5 py-1 rounded-sm">
              N/A {naCount}건
            </span>
            <span className="text-amber-300 bg-slate-900 border border-amber-400/50 px-3 py-1 rounded-sm font-black">
              RATE: {complianceRate}%
            </span>
          </div>
        </div>

        {/* Scrollable Checklist Items */}
        <div className="p-6 overflow-y-auto space-y-3 flex-1 text-sm text-slate-200">
          {!activeChecklist || activeChecklist.items.length === 0 ? (
            <div className="py-12 text-center text-slate-500">
              <ShieldCheck className="w-10 h-10 mx-auto mb-2 text-slate-600" />
              <p className="text-sm font-bold text-slate-400 uppercase font-mono">
                해당 공정의 검측 항목이 없습니다
              </p>
            </div>
          ) : (
            activeChecklist.items.map((item, index) => (
              <div
                key={item.id}
                className="p-4 rounded-sm border border-slate-700 bg-slate-900/70 hover:border-slate-600 transition-all space-y-2"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-0.5 flex-1 pr-3">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-sm bg-slate-950 text-amber-300 text-xs font-mono font-bold flex items-center justify-center shrink-0 border border-slate-700">
                        {index + 1}
                      </span>
                      <h4 className="font-bold text-xs text-white">
                        {item.item}
                      </h4>
                    </div>
                    <div className="text-[11px] text-amber-300 font-mono pl-7">
                      기준: {item.criteria}
                    </div>
                  </div>

                  {/* Result Buttons */}
                  <div className="flex items-center gap-1.5 shrink-0 pl-7 sm:pl-0 font-mono">
                    <button
                      type="button"
                      onClick={() => handleResultChange(item.id, "PASS")}
                      className={`px-3 py-1.5 rounded-sm text-xs font-bold transition-all uppercase ${
                        item.result === "PASS"
                          ? "bg-emerald-600 text-white shadow-sm"
                          : "bg-slate-950 text-slate-400 border border-slate-700 hover:bg-emerald-950/40 hover:text-emerald-300"
                      }`}
                    >
                      ✓ 적합
                    </button>

                    <button
                      type="button"
                      onClick={() => handleResultChange(item.id, "FAIL")}
                      className={`px-3 py-1.5 rounded-sm text-xs font-bold transition-all uppercase ${
                        item.result === "FAIL"
                          ? "bg-rose-600 text-white shadow-sm"
                          : "bg-slate-950 text-slate-400 border border-slate-700 hover:bg-rose-950/40 hover:text-rose-300"
                      }`}
                    >
                      ✕ 부적합
                    </button>

                    <button
                      type="button"
                      onClick={() => handleResultChange(item.id, "NA")}
                      className={`px-2.5 py-1.5 rounded-sm text-xs font-bold transition-all uppercase ${
                        item.result === "NA"
                          ? "bg-amber-400 text-slate-900"
                          : "bg-slate-950 text-slate-500 border border-slate-700 hover:bg-slate-800"
                      }`}
                    >
                      제외
                    </button>
                  </div>
                </div>

                {/* Note Field */}
                <div className="pl-7">
                  <input
                    type="text"
                    placeholder="실측값, 측정 수치(Ω, MΩ) 또는 조치 사항 기재"
                    value={item.note || ""}
                    onChange={(e) => handleNoteChange(item.id, e.target.value)}
                    className="w-full px-3 py-1 text-xs bg-slate-950 border border-slate-700 rounded-sm focus:outline-none focus:border-amber-400 text-slate-200 placeholder-slate-500 font-sans"
                  />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-900/90 px-6 py-3 border-t border-slate-700 flex items-center justify-between shrink-0 font-mono">
          <span className="text-xs text-slate-400">
            총 {totalCount}개 검측 항목 중 {passCount}개 적합 판정
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-sm border border-slate-700 text-slate-400 font-bold text-xs hover:bg-slate-800 uppercase"
            >
              닫기
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-900 px-5 py-2 rounded-sm font-bold text-xs shadow-md shadow-amber-400/20 active:scale-95 transition-all uppercase"
            >
              <Save className="w-4 h-4" />
              <span>검측 결과 저장</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
