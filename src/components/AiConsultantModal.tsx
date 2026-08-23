import React, { useState, useEffect } from "react";
import {
  X,
  Bot,
  Send,
  Sparkles,
  Zap,
  BookOpen,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  Copy,
  Check,
  Key,
} from "lucide-react";
import { ConstructionPhase, PHASE_CONFIG } from "../types";
import { useTheme } from "../context/ThemeContext";
import { getApiAuthHeaders, getUserApiKey } from "../utils/apiKeyStorage";

interface AiConsultantModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
  projectName?: string;
  onOpenApiKeyModal?: () => void;
}

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export const AiConsultantModal: React.FC<AiConsultantModalProps> = ({
  isOpen,
  onClose,
  initialQuery,
  projectName,
  onOpenApiKeyModal,
}) => {
  const { isDark } = useTheme();
  const [hasUserKey, setHasUserKey] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `안녕하세요! **KEC 한국전기설비규정 및 전기공사 시공기술 전문 AI 자문관**입니다.\n\n착공 전 인허가 서류부터 슬래브 골조 배관, 케이블 트레이 포설, 특고압 수변전설비 시공, 마감 결선, 절연/접지 시험, KESCO 사용전검사 합격 기준까지 시공방법 및 기술기준에 대해 무엇이든 질문해주세요.`,
      timestamp: new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const [inputQuery, setInputQuery] = useState("");
  const [selectedPhase, setSelectedPhase] = useState<string>("ALL");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  useEffect(() => {
    const updateKeyStatus = () => setHasUserKey(!!getUserApiKey());
    if (isOpen) {
      updateKeyStatus();
      window.addEventListener("voltmate-apikey-updated", updateKeyStatus);
    }
    return () => window.removeEventListener("voltmate-apikey-updated", updateKeyStatus);
  }, [isOpen]);

  useEffect(() => {
    if (initialQuery && isOpen) {
      setInputQuery(`${initialQuery}에 대한 KEC 표준 시공방법 및 핵심 검측 주의사항 알려줘.`);
    }
  }, [initialQuery, isOpen]);

  if (!isOpen) return null;

  const quickQuestions = [
    "KEC 접지시스템(TN-S, TT) 시공방법 및 보조접지극 이격거리",
    "슬래브 배관 시 철근 간섭 방지 및 박스 보양 기준",
    "케이블트레이 내 다심케이블 단층 포설 점유율 기준",
    "특고압 VCB 및 변압기 반입 전 옥내 변전실 검측 체크포인트",
    "KESCO 사용전검사 필수 구비 서류 및 계측 시험 항목",
  ];

  const handleSendMessage = async (queryToSend?: string) => {
    const text = queryToSend || inputQuery;
    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: text.trim(),
      timestamp: new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputQuery("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/gemini/consult", {
        method: "POST",
        headers: getApiAuthHeaders(),
        body: JSON.stringify({
          query: text,
          phase: selectedPhase !== "ALL" ? selectedPhase : undefined,
          projectContext: projectName ? `현장명: ${projectName}` : undefined,
        }),
      });

      if (!response.ok) {
        throw new Error("자문 서버 응답 실패");
      }

      const data = await response.json();
      const assistantMessage: Message = {
        role: "assistant",
        content: data.answer || "답변을 수신하지 못했습니다.",
        timestamp: new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (e: any) {
      const errorMessage: Message = {
        role: "assistant",
        content: `기술 자문 안내:\n\n**${text}**\n\n- **KEC 규정 준수**: 한국전기설비규정(KEC) 제232조 및 산업통상자원부 고시에 따라 KS 인증 자재를 사용하고 규정된 허용전류 감쇄계수 및 곡률반경(단심 8배, 다심 6배 이상)을 준수해야 합니다.\n- **안전 수칙**: 충전부 방호 및 정전 확인 후 2인 1조로 작업하며, 현장대리인 사전 품질 검측 승인을 득하시기 바랍니다.`,
        timestamp: new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div
        className={`w-full max-w-3xl h-[88vh] max-h-[850px] flex flex-col rounded-lg shadow-2xl overflow-hidden border transition-colors ${
          isDark
            ? "bg-[#1E293B] border-slate-700 text-slate-100"
            : "bg-white border-slate-200 text-slate-900"
        }`}
      >
        {/* Header */}
        <div
          className={`px-5 py-3.5 flex items-center justify-between border-b shrink-0 ${
            isDark
              ? "bg-slate-900/95 text-white border-slate-700"
              : "bg-slate-50 text-slate-900 border-slate-200"
          }`}
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-md bg-amber-400 text-slate-950 flex items-center justify-center font-extrabold shadow-sm shrink-0">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-bold text-xs sm:text-sm uppercase tracking-wider font-mono">
                  KEC 한국전기설비규정 AI 기술 자문관
                </h3>
                <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded-sm border ${
                  isDark
                    ? "bg-slate-800 text-amber-300 border-slate-700"
                    : "bg-amber-100 text-amber-900 border-amber-300"
                }`}>
                  GEMINI PRO
                </span>
                <a
                  href="https://www.law.go.kr/%ED%96%89%EC%A0%95%EA%B7%9C%EC%B9%99/%ED%95%9C%EA%B5%AD%EC%A0%84%EA%B8%B0%EC%84%A4%EB%B9%84%EA%B7%9C%EC%A0%95"
                  target="_blank"
                  rel="noreferrer"
                  className={`hidden sm:inline-flex items-center gap-1 text-[10px] underline font-mono ml-1 ${
                    isDark ? "text-amber-400 hover:text-amber-300" : "text-amber-700 hover:text-amber-800"
                  }`}
                >
                  <span>국가법령정보센터 KEC 원문 ↗</span>
                </a>
              </div>
              <p className={`text-[11px] font-mono ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                표준시방서(KCS 31 60) · KEC · 시공상세도 · 하자방지 실시간 기술 자문
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onOpenApiKeyModal && (
              <button
                type="button"
                onClick={onOpenApiKeyModal}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-bold transition-all border ${
                  hasUserKey
                    ? isDark
                      ? "bg-emerald-950/40 text-emerald-300 border-emerald-500/40 hover:bg-emerald-900/50"
                      : "bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100"
                    : isDark
                    ? "bg-slate-800 hover:bg-slate-700 text-amber-300 border-slate-700"
                    : "bg-white hover:bg-slate-100 text-amber-700 border-slate-300 shadow-xs"
                }`}
                title="Google Gemini API 키 설정"
              >
                <Key className="w-3.5 h-3.5 text-amber-500" />
                <span className="hidden sm:inline">
                  {hasUserKey ? "API 키 연결됨" : "API 키 설정"}
                </span>
              </button>
            )}

            <button
              onClick={onClose}
              className={`p-1.5 rounded-md transition-colors ${
                isDark
                  ? "text-slate-400 hover:text-white hover:bg-slate-800"
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-200"
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Phase Filter Tag Bar */}
        <div
          className={`px-4 py-2 border-b flex items-center gap-1.5 overflow-x-auto text-xs shrink-0 scrollbar-none ${
            isDark ? "bg-slate-950/80 border-slate-800" : "bg-slate-100/70 border-slate-200"
          }`}
        >
          <span className={`font-mono text-[10px] uppercase font-bold whitespace-nowrap ${
            isDark ? "text-slate-400" : "text-slate-600"
          }`}>
            공정 범위:
          </span>
          <button
            onClick={() => setSelectedPhase("ALL")}
            className={`px-2.5 py-1 rounded-md font-mono text-xs whitespace-nowrap transition-all ${
              selectedPhase === "ALL"
                ? "bg-amber-400 text-slate-950 font-bold shadow-xs"
                : isDark
                ? "bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700"
                : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-200 shadow-xs"
            }`}
          >
            전체 공정
          </button>
          {Object.entries(PHASE_CONFIG).map(([k, c]) => (
            <button
              key={k}
              onClick={() => setSelectedPhase(k)}
              className={`px-2.5 py-1 rounded-md font-mono text-xs whitespace-nowrap transition-all ${
                selectedPhase === k
                  ? "bg-amber-400 text-slate-950 font-bold shadow-xs"
                  : isDark
                  ? "bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700"
                  : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-200 shadow-xs"
              }`}
            >
              {c.shortName}
            </button>
          ))}
        </div>

        {/* Chat Message Scroll Body */}
        <div
          className={`p-4 sm:p-5 overflow-y-auto space-y-4 flex-1 text-sm ${
            isDark ? "bg-slate-950/60" : "bg-slate-50/70"
          }`}
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[88%] rounded-lg p-4 space-y-2 relative group shadow-sm border transition-all ${
                  msg.role === "user"
                    ? isDark
                      ? "bg-amber-500/15 text-amber-200 border-amber-500/40"
                      : "bg-amber-500 text-slate-950 font-medium border-amber-400 shadow-xs"
                    : isDark
                    ? "bg-[#1E293B] text-slate-200 border-slate-700"
                    : "bg-white text-slate-800 border-slate-200 shadow-xs"
                }`}
              >
                {/* Header info */}
                <div
                  className={`flex items-center justify-between gap-3 text-[11px] pb-1.5 border-b font-mono ${
                    msg.role === "user"
                      ? isDark
                        ? "border-amber-500/20 text-amber-300"
                        : "border-amber-600/30 text-amber-950 font-bold"
                      : isDark
                      ? "border-slate-700 text-slate-400"
                      : "border-slate-200 text-slate-500"
                  }`}
                >
                  <span className="font-bold flex items-center gap-1">
                    {msg.role === "assistant" ? (
                      <>
                        <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        <span className={isDark ? "text-amber-300 uppercase" : "text-amber-800 uppercase"}>
                          KEC TECHNICAL ADVISOR
                        </span>
                      </>
                    ) : (
                      <span className="uppercase">SITE ENGINEER QUERY</span>
                    )}
                  </span>
                  <span className="text-[10px] opacity-75">
                    {msg.timestamp}
                  </span>
                </div>

                {/* Content */}
                <div className={`text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-sans ${
                  msg.role === "user"
                    ? isDark
                      ? "text-slate-100"
                      : "text-slate-950"
                    : isDark
                    ? "text-slate-200"
                    : "text-slate-800"
                }`}>
                  {msg.content}
                </div>

                {/* Copy button */}
                {msg.role === "assistant" && (
                  <button
                    onClick={() => handleCopy(msg.content, idx)}
                    className={`absolute top-2 right-2 p-1 rounded transition-colors ${
                      isDark ? "text-slate-400 hover:text-amber-300" : "text-slate-400 hover:text-amber-700"
                    }`}
                    title="답변 복사"
                  >
                    {copiedIndex === idx ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div
                className={`p-3.5 rounded-lg shadow-sm border flex items-center gap-3 ${
                  isDark
                    ? "bg-slate-900 border-slate-700 text-slate-300"
                    : "bg-white border-slate-200 text-slate-700 shadow-xs"
                }`}
              >
                <div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                <span className="text-xs font-mono uppercase">
                  KEC & 표준시방서 기술 분석 중...
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Question Chips */}
        <div
          className={`px-4 py-2 border-t flex items-center gap-1.5 overflow-x-auto shrink-0 scrollbar-none ${
            isDark ? "bg-slate-900/90 border-slate-800" : "bg-slate-100/80 border-slate-200"
          }`}
        >
          <span className={`text-[10px] font-bold uppercase font-mono whitespace-nowrap ${
            isDark ? "text-slate-400" : "text-slate-600"
          }`}>
            추천 질의:
          </span>
          {quickQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(q)}
              className={`text-[11px] px-2.5 py-1 rounded-md whitespace-nowrap transition-colors border ${
                isDark
                  ? "bg-slate-950 hover:bg-amber-400 hover:text-slate-900 border-slate-700 text-slate-300"
                  : "bg-white hover:bg-amber-100 hover:text-amber-950 border-slate-300 text-slate-700 shadow-xs"
              }`}
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div
          className={`p-3 sm:p-4 border-t shrink-0 ${
            isDark ? "bg-[#1E293B] border-slate-700" : "bg-white border-slate-200"
          }`}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="전기공사 시공방법, KEC 규정, 자재 규격, 검측 절차 질문..."
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              className={`flex-1 px-4 py-2.5 text-xs rounded-md border focus:outline-none transition-all ${
                isDark
                  ? "bg-slate-950 border-slate-700 text-slate-100 placeholder-slate-500 focus:border-amber-400"
                  : "bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-amber-500 focus:bg-white shadow-xs"
              }`}
            />
            <button
              type="submit"
              disabled={!inputQuery.trim() || isLoading}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 px-4 py-2.5 rounded-md font-bold text-xs shadow-sm active:scale-95 transition-all flex items-center gap-1.5 disabled:opacity-40 uppercase font-mono shrink-0"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">질의 전송</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

