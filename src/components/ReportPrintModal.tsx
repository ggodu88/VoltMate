import React from "react";
import { X, Printer, Building2, CheckCircle2, Calendar, FileText, AlertTriangle, HardHat, Clock, Tag } from "lucide-react";
import { ConstructionLog, ConstructionPhase, NOTE_CATEGORY_CONFIG, PHASE_CONFIG, ProjectSite } from "../types";

interface ReportPrintModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: ProjectSite | null;
  logs: ConstructionLog[];
}

export const ReportPrintModal: React.FC<ReportPrintModalProps> = ({
  isOpen,
  onClose,
  project,
  logs,
}) => {
  if (!isOpen || !project) return null;

  const currentPhaseConfig = PHASE_CONFIG[project.currentPhase];
  const projectLogs = logs.filter((l) => l.projectId === project.id);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto print:p-0 print:bg-white">
      <div className="bg-[#1E293B] rounded-sm shadow-2xl border border-slate-700 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden my-4 print:max-h-none print:border-none print:shadow-none print:m-0 print:w-full">
        {/* Header - Hidden on Print */}
        <div className="bg-slate-900/90 px-6 py-4 text-white flex items-center justify-between border-b border-slate-700 shrink-0 print:hidden font-mono">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-sm bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
              <Printer className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-white">
              현장 시공노트 & 감리 협의 보고서 미리보기 (REPORT)
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 px-4 py-1.5 rounded-sm font-bold text-xs shadow-md transition-all uppercase"
            >
              <Printer className="w-4 h-4" />
              <span>보고서 인쇄 / PDF 저장</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-sm text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="p-8 overflow-y-auto space-y-6 text-slate-900 print:overflow-visible print:p-6 bg-slate-100 font-sans text-xs">
          {/* Document Title Header */}
          <div className="text-center border-b-2 border-slate-900 pb-4 bg-white p-6 border border-slate-300">
            <span className="text-[11px] font-bold text-slate-500 tracking-widest block mb-1 font-mono">
              [전기공사업법 및 KEC 표준 감리·기술협의 양식]
            </span>
            <h1 className="text-2xl font-black tracking-tight text-slate-950">
              전기공사 현장 시공노트 및 기술협의 대장
            </h1>
            <p className="text-xs text-slate-600 mt-1 font-mono">
              발행일자: {new Date().toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>

          {/* Project Overview Table */}
          <div className="bg-white p-6 border border-slate-300">
            <h3 className="font-bold text-sm text-slate-900 mb-2 flex items-center gap-1.5 border-l-4 border-amber-500 pl-2">
              1. 공사 개요 (Project Summary)
            </h3>
            <table className="w-full border-collapse border border-slate-300 text-xs">
              <tbody>
                <tr>
                  <th className="bg-slate-100 border border-slate-300 p-2 font-bold text-left w-28">공사명</th>
                  <td className="border border-slate-300 p-2 font-bold text-slate-900" colSpan={3}>
                    {project.name}
                  </td>
                </tr>
                <tr>
                  <th className="bg-slate-100 border border-slate-300 p-2 font-bold text-left">관리번호</th>
                  <td className="border border-slate-300 p-2 font-mono">{project.code}</td>
                  <th className="bg-slate-100 border border-slate-300 p-2 font-bold text-left w-28">수전설비용량</th>
                  <td className="border border-slate-300 p-2 font-bold text-amber-700">{project.contractPower}</td>
                </tr>
                <tr>
                  <th className="bg-slate-100 border border-slate-300 p-2 font-bold text-left">현장위치</th>
                  <td className="border border-slate-300 p-2" colSpan={3}>{project.location}</td>
                </tr>
                <tr>
                  <th className="bg-slate-100 border border-slate-300 p-2 font-bold text-left">발주처/시공사</th>
                  <td className="border border-slate-300 p-2">{project.client} / {project.contractor}</td>
                  <th className="bg-slate-100 border border-slate-300 p-2 font-bold text-left">현장책임자</th>
                  <td className="border border-slate-300 p-2">대리인: {project.siteManager} / 감리: {project.supervisor}</td>
                </tr>
                <tr>
                  <th className="bg-slate-100 border border-slate-300 p-2 font-bold text-left">공사기간</th>
                  <td className="border border-slate-300 p-2 font-mono">{project.startDate} ~ {project.targetDate}</td>
                  <th className="bg-slate-100 border border-slate-300 p-2 font-bold text-left">현재 공정률</th>
                  <td className="border border-slate-300 p-2 font-black text-slate-900 font-mono">
                    {project.progressPercent}% ({currentPhaseConfig.shortName})
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Technical Notes Ledger */}
          <div className="bg-white p-6 border border-slate-300">
            <h3 className="font-bold text-sm text-slate-900 mb-2 flex items-center gap-1.5 border-l-4 border-amber-500 pl-2">
              2. 현장 시공노트 상세 내역 (총 {projectLogs.length}건)
            </h3>
            
            {projectLogs.length === 0 ? (
              <p className="text-center text-slate-500 py-6">등록된 시공노트가 없습니다.</p>
            ) : (
              <div className="space-y-4">
                {projectLogs.map((log, idx) => {
                  const catConfig = log.category ? NOTE_CATEGORY_CONFIG[log.category] : NOTE_CATEGORY_CONFIG.FIELD_DISCREPANCY;
                  const phaseConfig = PHASE_CONFIG[log.phase] || PHASE_CONFIG[ConstructionPhase.PHASE_01_PREPARATION];
                  
                  return (
                    <div key={log.id} className="border border-slate-300 p-4 rounded-sm bg-slate-50/50 space-y-2">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-slate-600">#{idx + 1}</span>
                          <span className="font-bold text-sm text-slate-950">
                            {log.title || log.workDescription || "현장 특이사항"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 font-mono text-[11px]">
                          <span className="px-2 py-0.5 bg-slate-200 border border-slate-300 rounded-sm font-bold">
                            {catConfig.label}
                          </span>
                          <span className="text-slate-600">{log.date}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-[11px] font-mono text-slate-600">
                        <div>
                          <strong>공정/위치:</strong> {phaseConfig.shortName} / {log.workLocation || "전구역"}
                        </div>
                        <div>
                          <strong>연계 시공방법:</strong> {log.methodTitle || "독립 특이사항"}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                        <div className="p-2.5 bg-white border border-rose-200 rounded-sm">
                          <span className="font-bold text-rose-700 block mb-1">🔴 현장 상황 및 발생 원인 (문제점)</span>
                          <p className="text-slate-800 whitespace-pre-wrap leading-relaxed">
                            {log.issueDescription || log.workDescription || "기록 없음"}
                          </p>
                        </div>

                        <div className="p-2.5 bg-white border border-emerald-200 rounded-sm">
                          <span className="font-bold text-emerald-700 block mb-1">🟢 실제 적용 조치 및 대체 시공 방법</span>
                          <p className="text-slate-800 whitespace-pre-wrap leading-relaxed">
                            {log.actionTaken || log.specialNotes || "기록 없음"}
                          </p>
                        </div>
                      </div>

                      {log.followUpNote && (
                        <div className="p-2 bg-amber-50 border border-amber-200 rounded-sm text-[11px] text-amber-900">
                          <strong>후속 공정 주의사항:</strong> {log.followUpNote}
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-1 border-t border-slate-200 text-[11px] font-mono text-slate-500">
                        <span>기록자: <strong>{log.signedBy}</strong></span>
                        {log.approvedBy && <span>확인/감리원: <strong>{log.approvedBy}</strong></span>}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Signatures & Seals */}
          <div className="pt-2">
            <div className="grid grid-cols-2 gap-8 text-center bg-white p-6 border border-slate-300">
              <div className="p-4 border border-slate-300 rounded-sm space-y-4">
                <span className="font-bold text-xs text-slate-700 block font-mono">전기공사 시공사 (현장대리인)</span>
                <div className="h-12 flex items-center justify-center font-bold text-slate-900 text-sm">
                  {project.contractor}
                  <span className="ml-2 font-serif text-slate-500">(인)</span>
                </div>
                <span className="text-[11px] text-slate-500 font-mono">성명: {project.siteManager}</span>
              </div>

              <div className="p-4 border border-slate-300 rounded-sm space-y-4">
                <span className="font-bold text-xs text-slate-700 block font-mono">전기감리단 (책임감리원)</span>
                <div className="h-12 flex items-center justify-center font-bold text-slate-900 text-sm">
                  {project.client} 감리단
                  <span className="ml-2 font-serif text-slate-500">(인)</span>
                </div>
                <span className="text-[11px] text-slate-500 font-mono">성명: {project.supervisor}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
