import React, { useState } from "react";
import {
  X,
  BookOpen,
  Layers,
  Wrench,
  Package,
  ShieldCheck,
  AlertTriangle,
  FileCheck,
  Sparkles,
  Zap,
  Camera,
  Ruler,
  Compass,
  FileText,
  CheckCircle2,
  ZoomIn,
  Eye,
  Info,
  Scale,
  ExternalLink,
} from "lucide-react";
import { ConstructionMethod, PHASE_CONFIG } from "../types";
import { LEGAL_STANDARDS_SYSTEM } from "../data/legalStandardsSystem";

interface ConstructionMethodDetailModalProps {
  method: ConstructionMethod | null;
  isOpen: boolean;
  onClose: () => void;
  onAskAi: (title: string) => void;
  onApplyToLog?: (method: ConstructionMethod) => void;
  onOpenLegalStandards?: (initialStandardId?: string) => void;
}

export const ConstructionMethodDetailModal: React.FC<ConstructionMethodDetailModalProps> = ({
  method,
  isOpen,
  onClose,
  onAskAi,
  onApplyToLog,
  onOpenLegalStandards,
}) => {
  const [activeTab, setActiveTab] = useState<
    "PROCEDURE" | "SPECS_DRAWING" | "PHOTOS" | "QA_STANDARDS"
  >("PROCEDURE");
  const [selectedPhotoPreview, setSelectedPhotoPreview] = useState<string | null>(null);

  if (!isOpen || !method) return null;

  const phaseConfig = PHASE_CONFIG[method.phase];

  // Find related legal standards from the 17 system
  const relatedStandards = LEGAL_STANDARDS_SYSTEM.filter(
    (std) =>
      std.relatedPhases.includes(method.phase) ||
      std.tags.some(
        (t) =>
          method.title.includes(t) ||
          method.category.includes(t) ||
          method.kecStandards.includes(t)
      )
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#1E293B] rounded-sm shadow-2xl border border-slate-700 w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden my-2 text-slate-200">
        {/* Header */}
        <div className="bg-slate-900 px-5 py-4 text-white flex items-center justify-between border-b border-slate-700 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-sm bg-amber-400 text-slate-950 flex items-center justify-center font-bold shrink-0">
              <Zap className="w-5 h-5 fill-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`px-2 py-0.5 rounded-sm text-[10px] font-bold border uppercase ${phaseConfig.badgeBg}`}
                >
                  {phaseConfig.shortName} ({phaseConfig.stepNumber}단계)
                </span>
                {method.wbsCode && (
                  <span className="px-2 py-0.5 rounded-sm text-[10px] font-mono font-black bg-amber-400 text-slate-950">
                    WBS {method.wbsCode}
                  </span>
                )}
                <span className="text-xs text-slate-400 font-mono">
                  {method.category}
                </span>
                <span className="text-[10px] text-amber-400/80 font-mono px-1.5 py-0.2 bg-amber-400/10 rounded-sm border border-amber-400/20">
                  {method.id}
                </span>
              </div>
              <h2 className="text-sm sm:text-lg font-black text-white leading-snug mt-0.5">
                {method.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="method-modal-ai-ask-btn"
              onClick={() => onAskAi(method.title)}
              className="hidden sm:flex items-center gap-1.5 bg-slate-800 hover:bg-amber-400 hover:text-slate-950 text-slate-200 border border-slate-700 px-3 py-1.5 rounded-sm text-xs font-bold transition-colors uppercase font-mono"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI 질의</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-sm text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-slate-950/80 px-4 pt-2 border-b border-slate-700 flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0">
          <button
            onClick={() => setActiveTab("PROCEDURE")}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold uppercase tracking-wider transition-all border-b-2 font-mono whitespace-nowrap ${
              activeTab === "PROCEDURE"
                ? "border-amber-400 text-amber-400 bg-slate-900/60"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>1. 표준 시공절차</span>
          </button>

          <button
            onClick={() => setActiveTab("SPECS_DRAWING")}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold uppercase tracking-wider transition-all border-b-2 font-mono whitespace-nowrap ${
              activeTab === "SPECS_DRAWING"
                ? "border-amber-400 text-amber-400 bg-slate-900/60"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Ruler className="w-3.5 h-3.5" />
            <span>2. 시공 상세도 & 치수규격</span>
            {method.detailSpecs && method.detailSpecs.length > 0 && (
              <span className="text-[10px] px-1 py-0.2 bg-amber-400/20 text-amber-300 rounded-sm">
                {method.detailSpecs.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("PHOTOS")}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold uppercase tracking-wider transition-all border-b-2 font-mono whitespace-nowrap ${
              activeTab === "PHOTOS"
                ? "border-amber-400 text-amber-400 bg-slate-900/60"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>3. 현장 실물 사진 & 핵심 검사항목</span>
            {method.fieldPhotos && method.fieldPhotos.length > 0 && (
              <span className="text-[10px] px-1 py-0.2 bg-blue-500/20 text-blue-300 rounded-sm">
                {method.fieldPhotos.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("QA_STANDARDS")}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold uppercase tracking-wider transition-all border-b-2 font-mono whitespace-nowrap ${
              activeTab === "QA_STANDARDS"
                ? "border-amber-400 text-amber-400 bg-slate-900/60"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>4. KEC 규정 & 품질·안전</span>
          </button>
        </div>

        {/* Content Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 text-sm text-slate-200 flex-1">
          {/* Summary Box (Always Top) */}
          <div className="bg-slate-900/90 p-4 rounded-sm border border-slate-700 space-y-2">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
              시공 개요 및 핵심 목적 (SUMMARY)
            </h4>
            <p className="text-xs sm:text-sm font-medium text-slate-200 leading-relaxed">
              {method.summary}
            </p>
            <div className="pt-2 border-t border-slate-700 text-xs text-amber-300 font-mono flex items-center gap-1.5 flex-wrap">
              <span className="font-bold text-amber-400 uppercase">KEC & STANDARD:</span>
              <span>{method.kecStandards}</span>
            </div>
          </div>

          {/* TAB 1: PROCEDURE */}
          {activeTab === "PROCEDURE" && (
            <div className="space-y-6">
              {/* Step-by-Step Procedures */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2 uppercase tracking-wider font-mono">
                    <Layers className="w-4 h-4 text-amber-400" />
                    <span>공정별 표준 시공 절차 ({method.steps.length}단계)</span>
                  </h3>
                </div>

                <div className="space-y-3">
                  {method.steps.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-sm border border-slate-700 bg-slate-900/70 hover:border-slate-600 transition-colors space-y-2 relative"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-sm bg-slate-950 text-amber-300 text-xs font-mono font-bold flex items-center justify-center shrink-0 border border-slate-700">
                          {step.stepNumber}
                        </span>
                        <h4 className="font-bold text-xs sm:text-sm text-white">
                          {step.name}
                        </h4>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-8">
                        {step.description}
                      </p>

                      {step.caution && (
                        <div className="ml-8 bg-amber-950/30 text-amber-200 p-2.5 rounded-sm border border-amber-800/60 text-xs flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          <div>
                            <strong className="font-bold uppercase font-mono">CAUTION:</strong>{" "}
                            {step.caution}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Materials & Tools Two-Column */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Required Materials */}
                <div className="p-4 rounded-sm border border-slate-700 bg-slate-900/80 space-y-2">
                  <h4 className="font-bold text-xs text-white flex items-center gap-2 uppercase font-mono">
                    <Package className="w-4 h-4 text-amber-400" />
                    <span>필요 주요 자재</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {method.materials.map((mat, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                        <span>{mat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Required Tools & Instruments */}
                <div className="p-4 rounded-sm border border-slate-700 bg-slate-900/80 space-y-2">
                  <h4 className="font-bold text-xs text-white flex items-center gap-2 uppercase font-mono">
                    <Wrench className="w-4 h-4 text-amber-400" />
                    <span>사용 공구 및 정밀 계측기</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {method.tools.map((tool, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                        <span>{tool}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SPECS & DRAWING */}
          {activeTab === "SPECS_DRAWING" && (
            <div className="space-y-6">
              {/* Detailed Schematic / Cross-Section Diagram */}
              {method.schematic ? (
                <div className="p-4 sm:p-5 rounded-sm border border-slate-700 bg-slate-900/90 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                    <div className="flex items-center gap-2">
                      <Compass className="w-4 h-4 text-amber-400" />
                      <h4 className="font-bold text-xs sm:text-sm text-white font-mono uppercase">
                        {method.schematic.title}
                      </h4>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 bg-amber-400/10 text-amber-300 border border-amber-400/30 rounded-sm">
                      {method.schematic.type}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {method.schematic.description}
                  </p>

                  {/* Key Dimensions Quick Bar */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {method.schematic.keyDimensions.map((dim, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-sm bg-slate-950 border border-slate-800 flex flex-col justify-between"
                      >
                        <span className="text-[10px] text-slate-400 font-mono uppercase truncate">
                          {dim.label}
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-amber-400 font-mono mt-1">
                          {dim.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Component Element Cards */}
                  <div className="space-y-2 pt-2">
                    <span className="text-[11px] font-bold text-slate-400 uppercase font-mono block">
                      주요 부재별 시공 규격 및 사양 (ELEMENTS)
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {method.schematic.elements.map((el, i) => (
                        <div
                          key={i}
                          className="p-3 rounded-sm bg-slate-950/70 border border-slate-800 text-xs space-y-1"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-200">{el.name}</span>
                            <span className="font-mono text-[10px] text-amber-300 font-bold bg-slate-900 px-1.5 py-0.5 rounded-sm">
                              {el.spec}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 leading-relaxed">
                            {el.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6 text-center rounded-sm bg-slate-900/60 border border-slate-800 text-slate-400 text-xs">
                  <Compass className="w-8 h-8 mx-auto mb-2 text-slate-600" />
                  <span>등록된 시공 도해/단면도가 없습니다. 아래 상세 수치 가이드를 확인하세요.</span>
                </div>
              )}

              {/* Detail Specification Table */}
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono mb-3 flex items-center gap-2">
                  <Ruler className="w-4 h-4 text-amber-400" />
                  <span>주요 시공 상세 치수 & 엔지니어링 규격 기준</span>
                </h4>

                {method.detailSpecs && method.detailSpecs.length > 0 ? (
                  <div className="overflow-x-auto rounded-sm border border-slate-700 bg-slate-900/80">
                    <table className="w-full text-left text-xs font-sans">
                      <thead className="bg-slate-950 text-slate-400 font-mono text-[10px] uppercase border-b border-slate-700">
                        <tr>
                          <th className="p-3">분류 (Category)</th>
                          <th className="p-3">검측 항목 (Parameter)</th>
                          <th className="p-3">표준 규격치 (Standard Value)</th>
                          <th className="p-3">적용 근거 (KEC/KCS)</th>
                          <th className="p-3">비고 / 주의사항</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800">
                        {method.detailSpecs.map((spec, i) => (
                          <tr key={i} className="hover:bg-slate-800/40">
                            <td className="p-3 font-mono font-bold text-amber-400">
                              {spec.category}
                            </td>
                            <td className="p-3 text-slate-200 font-medium">
                              {spec.parameter}
                            </td>
                            <td className="p-3 font-mono font-bold text-emerald-400">
                              {spec.standardValue}
                            </td>
                            <td className="p-3 font-mono text-slate-400 text-[11px]">
                              {spec.kecOrStandard}
                            </td>
                            <td className="p-3 text-slate-400 text-[11px]">
                              {spec.notes || "-"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="p-4 rounded-sm bg-slate-900 border border-slate-800 text-xs text-slate-400">
                    KEC 및 표준시방서 기본 기준이 적용됩니다. (치수 규격 추가 필요 시 관리자 센터에서 등록 가능)
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: PHOTOS & INSPECTION */}
          {activeTab === "PHOTOS" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                  <Camera className="w-4 h-4 text-amber-400" />
                  <span>현장 실물 시공 사진 & 감리 검측 핵심 포인트</span>
                </h4>
              </div>

              {method.fieldPhotos && method.fieldPhotos.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {method.fieldPhotos.map((photo) => (
                    <div
                      key={photo.id}
                      className="rounded-sm border border-slate-700 bg-slate-900/90 overflow-hidden group hover:border-slate-600 transition-all flex flex-col"
                    >
                      {/* Photo Thumbnail */}
                      <div className="relative aspect-video bg-slate-950 overflow-hidden">
                        <img
                          src={photo.url}
                          alt={photo.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-2 left-2 px-2 py-0.5 bg-slate-950/80 backdrop-blur-sm text-[10px] font-bold text-amber-300 font-mono rounded-sm border border-slate-700">
                          {photo.tag}
                        </div>
                        <button
                          onClick={() => setSelectedPhotoPreview(photo.url)}
                          className="absolute bottom-2 right-2 p-1.5 bg-slate-900/90 hover:bg-amber-400 hover:text-slate-950 text-slate-200 rounded-sm transition-colors text-xs font-bold flex items-center gap-1 border border-slate-700"
                        >
                          <ZoomIn className="w-3.5 h-3.5" />
                          <span>확대</span>
                        </button>
                      </div>

                      {/* Photo Info & Inspection Point */}
                      <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                        <div>
                          <h5 className="font-bold text-xs sm:text-sm text-white">
                            {photo.title}
                          </h5>
                          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                            {photo.caption}
                          </p>
                        </div>

                        {photo.inspectionPoint && (
                          <div className="mt-3 p-2.5 rounded-sm bg-blue-950/30 border border-blue-800/60 text-xs text-blue-200 flex items-start gap-2">
                            <Eye className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                            <div>
                              <strong className="font-bold font-mono text-blue-300 uppercase">
                                감리 검측 포인트:
                              </strong>{" "}
                              {photo.inspectionPoint}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center rounded-sm bg-slate-900/60 border border-slate-800 text-slate-400 text-xs">
                  <Camera className="w-8 h-8 mx-auto mb-2 text-slate-600" />
                  <span>등록된 현장 사진이 없습니다. 시공일지 작성 시 촬영한 사진이 자동으로 연동됩니다.</span>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: QA & STANDARDS */}
          {activeTab === "QA_STANDARDS" && (
            <div className="space-y-6">
              {/* Quality Checkpoints & Safety Guidelines */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Quality Inspection Checkpoints */}
                <div className="p-4 rounded-sm border border-emerald-800 bg-emerald-950/30 space-y-2">
                  <h4 className="font-bold text-xs text-emerald-300 flex items-center gap-2 uppercase font-mono">
                    <FileCheck className="w-4 h-4 text-emerald-400" />
                    <span>품질 검측 및 감리 확인 항목</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-emerald-200">
                    {method.qualityInspection.map((chk, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="font-bold text-emerald-400">✓</span>
                        <span>{chk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Safety & Accident Prevention */}
                <div className="p-4 rounded-sm border border-rose-800 bg-rose-950/30 space-y-2">
                  <h4 className="font-bold text-xs text-rose-300 flex items-center gap-2 uppercase font-mono">
                    <ShieldCheck className="w-4 h-4 text-rose-400" />
                    <span>핵심 안전 수칙 및 위험성평가</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-rose-200">
                    {method.safetyPoints.map((safe, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="font-bold text-rose-400">⚠️</span>
                        <span>{safe}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Defect Prevention */}
              {method.defectPrevention && method.defectPrevention.length > 0 && (
                <div className="p-4 rounded-sm border border-amber-800/60 bg-amber-950/20 space-y-2">
                  <h4 className="font-bold text-xs text-amber-300 flex items-center gap-2 uppercase font-mono">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    <span>주요 하자 발생 사례 및 사전 예방 대책</span>
                  </h4>
                  <ul className="space-y-1 text-xs text-amber-200">
                    {method.defectPrevention.map((def, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="font-bold text-amber-400">•</span>
                        <span>{def}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Related 17 Legal Standards Reference Section */}
              <div className="p-4 rounded-sm border border-amber-500/40 bg-slate-900/90 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs text-amber-300 flex items-center gap-2 uppercase font-mono">
                    <Scale className="w-4 h-4 text-amber-400" />
                    <span>연계 공인 법령 및 기술기준 (17대 종합 체계)</span>
                  </h4>
                  {onOpenLegalStandards && (
                    <button
                      onClick={() => onOpenLegalStandards()}
                      className="text-[11px] text-amber-400 hover:text-amber-300 font-mono font-bold flex items-center gap-1"
                    >
                      <span>17대 체계 전체보기</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {relatedStandards.slice(0, 6).map((std) => (
                    <div
                      key={std.id}
                      onClick={() => onOpenLegalStandards && onOpenLegalStandards(std.id)}
                      className="p-3 rounded-sm bg-slate-950/80 border border-slate-800 hover:border-amber-400/60 cursor-pointer transition-all space-y-1 group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold text-amber-400 group-hover:text-amber-300">
                          {std.code}. {std.title}
                        </span>
                        <span className="text-[9px] px-1.5 py-0.2 bg-slate-800 text-slate-400 rounded-sm font-mono">
                          {std.authority}
                        </span>
                      </div>
                      <div className="text-xs font-semibold text-slate-200 group-hover:text-white">
                        {std.coreRegulations[0]?.article} {std.coreRegulations[0]?.title}
                      </div>
                      <div className="text-[11px] text-slate-400 line-clamp-2">
                        {std.coreRegulations[0]?.fieldApplication || std.keyPurposes[0]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-900 px-5 py-3 border-t border-slate-700 flex flex-wrap items-center justify-between gap-2 shrink-0 font-mono">
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span>METHOD ID: <strong className="text-amber-400">{method.id}</strong></span>
            <span>UPDATED: <strong>{method.updatedAt}</strong></span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onAskAi(method.title)}
              className="sm:hidden flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 font-bold text-xs px-3 py-2 rounded-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI 질의</span>
            </button>

            {onApplyToLog && (
              <button
                id="apply-method-to-log-btn"
                onClick={() => {
                  onApplyToLog(method);
                  onClose();
                }}
                className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs px-4 py-2 rounded-sm transition-all shadow-md uppercase font-mono"
              >
                이 시공방법으로 일지 작성
              </button>
            )}
            <button
              onClick={onClose}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs px-4 py-2 rounded-sm transition-all uppercase font-mono"
            >
              닫기
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox / Zoom Photo Preview Modal */}
      {selectedPhotoPreview && (
        <div
          className="fixed inset-0 z-60 bg-slate-950/95 flex items-center justify-center p-4"
          onClick={() => setSelectedPhotoPreview(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <button
              onClick={() => setSelectedPhotoPreview(null)}
              className="absolute -top-10 right-0 text-white hover:text-amber-400 text-sm font-bold flex items-center gap-1 font-mono"
            >
              <X className="w-5 h-5" /> 닫기 (ESC)
            </button>
            <img
              src={selectedPhotoPreview}
              alt="Photo Zoom"
              className="max-w-full max-h-[85vh] object-contain rounded-sm border border-slate-700"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      )}
    </div>
  );
};
