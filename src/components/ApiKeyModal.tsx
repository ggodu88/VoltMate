import React, { useState, useEffect } from "react";
import {
  X,
  Key,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Trash2,
  Eye,
  EyeOff,
  Sparkles,
  Bot,
  AlertCircle,
  HelpCircle,
  Zap,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { getUserApiKey, setUserApiKey, clearUserApiKey } from "../utils/apiKeyStorage";

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onKeyUpdated?: (hasKey: boolean) => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({
  isOpen,
  onClose,
  onKeyUpdated,
}) => {
  const { isDark } = useTheme();
  const [apiKey, setApiKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error" | "info";
    text: string;
  } | null>(null);

  useEffect(() => {
    if (isOpen) {
      const stored = getUserApiKey();
      setApiKey(stored);
      setIsSaved(!!stored);
      setStatusMessage(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    const trimmed = apiKey.trim();
    if (!trimmed) {
      clearUserApiKey();
      setIsSaved(false);
      setStatusMessage({
        type: "info",
        text: "API 키가 삭제되었습니다. (기본 서버 키가 있는 경우 서버 키로 시도됩니다)",
      });
      onKeyUpdated?.(false);
      return;
    }

    if (!trimmed.startsWith("AIza")) {
      setStatusMessage({
        type: "error",
        text: "Google Gemini API 키는 보통 'AIza...'로 시작합니다. 키를 다시 확인해주세요.",
      });
      return;
    }

    setUserApiKey(trimmed);
    setIsSaved(true);
    setStatusMessage({
      type: "success",
      text: "개인 API 키가 안전하게 브라우저에 저장되었습니다! 이제 AI 자문 및 분석 기능을 무제한 사용하실 수 있습니다.",
    });
    onKeyUpdated?.(true);
  };

  const handleRemove = () => {
    clearUserApiKey();
    setApiKey("");
    setIsSaved(false);
    setStatusMessage({
      type: "info",
      text: "저장된 API 키가 삭제되었습니다.",
    });
    onKeyUpdated?.(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div
        className={`w-full max-w-lg rounded-lg shadow-2xl overflow-hidden my-auto border transition-colors ${
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
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-md bg-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-xs shrink-0">
              <Key className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-black flex items-center gap-2">
                <span>Google Gemini API 키 설정</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-sm font-mono font-bold border ${
                    isSaved
                      ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                      : isDark
                      ? "bg-slate-800 text-slate-400 border-slate-700"
                      : "bg-slate-100 text-slate-600 border-slate-300"
                  }`}
                >
                  {isSaved ? "등록됨" : "미등록"}
                </span>
              </h2>
              <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                개인 무료 API 키로 AI 기술 자문과 KEC 검토를 무제한 이용하세요
              </p>
            </div>
          </div>
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

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Key Input */}
          <div className="space-y-1.5">
            <label
              className={`block text-xs font-bold uppercase tracking-wider flex items-center justify-between ${
                isDark ? "text-slate-300" : "text-slate-700"
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-amber-500" />
                Gemini API Key 입력
              </span>
              {isSaved && (
                <button
                  type="button"
                  onClick={handleRemove}
                  className="text-rose-500 hover:text-rose-400 text-[11px] font-normal flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" />
                  키 삭제
                </button>
              )}
            </label>
            <div className="relative">
              <input
                id="user-gemini-api-key-input"
                type={showKey ? "text" : "password"}
                value={apiKey}
                onChange={(e) => {
                  setApiKey(e.target.value);
                  setStatusMessage(null);
                }}
                placeholder="AIzaSy..."
                className={`w-full rounded-md pl-3 pr-10 py-2.5 text-xs font-mono focus:outline-none transition-all ${
                  isDark
                    ? "bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:border-amber-400"
                    : "bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 focus:border-amber-500 focus:bg-white shadow-xs"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className={`absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-md ${
                  isDark ? "text-slate-400 hover:text-slate-200" : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Status Message */}
          {statusMessage && (
            <div
              className={`p-3 rounded-lg border text-xs flex items-start gap-2 ${
                statusMessage.type === "success"
                  ? isDark
                    ? "bg-emerald-950/30 border-emerald-500/40 text-emerald-300"
                    : "bg-emerald-50 border-emerald-200 text-emerald-800"
                  : statusMessage.type === "error"
                  ? isDark
                    ? "bg-rose-950/30 border-rose-500/40 text-rose-300"
                    : "bg-rose-50 border-rose-200 text-rose-800"
                  : isDark
                  ? "bg-blue-950/30 border-blue-500/40 text-blue-300"
                  : "bg-blue-50 border-blue-200 text-blue-800"
              }`}
            >
              {statusMessage.type === "success" ? (
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-500" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              )}
              <span>{statusMessage.text}</span>
            </div>
          )}

          {/* Security & Privacy Notice */}
          <div
            className={`p-3.5 rounded-lg border text-xs space-y-2 ${
              isDark ? "bg-slate-900/60 border-slate-800" : "bg-slate-50 border-slate-200"
            }`}
          >
            <div className="flex items-center gap-1.5 font-bold text-amber-500">
              <ShieldCheck className="w-4 h-4" />
              <span>안전한 로컬 보안 저장 (BYOK)</span>
            </div>
            <ul
              className={`space-y-1 list-disc list-inside text-[11px] leading-relaxed ${
                isDark ? "text-slate-300" : "text-slate-600"
              }`}
            >
              <li>
                입력하신 API 키는 <strong>사용자 브라우저(LocalStorage)</strong>에만 보관됩니다.
              </li>
              <li>
                서버 데이터베이스나 외부에 영구 저장되지 않으며, 오직 AI 요청 시에만 안전하게 전달됩니다.
              </li>
              <li>언제든지 상단 [키 삭제] 버튼을 눌러 즉시 브라우저에서 지울 수 있습니다.</li>
            </ul>
          </div>

          {/* How to get a free API Key */}
          <div
            className={`p-3.5 rounded-lg border text-xs space-y-2 ${
              isDark
                ? "bg-indigo-950/30 border-indigo-500/30 text-indigo-200"
                : "bg-indigo-50/70 border-indigo-200 text-indigo-900"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Google AI 무료 API 키 발급 방법 (1분 소요)
              </span>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                <span>키 발급 받기</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <ol className="space-y-1 list-decimal list-inside text-[11px] leading-relaxed opacity-90">
              <li>
                <strong>Google AI Studio</strong> (aistudio.google.com) 사이트에 접속하여 구글 로그인
              </li>
              <li>
                <strong>[Create API key]</strong> 버튼 클릭 후 생성된 키 복사
              </li>
              <li>위 입력창에 붙여넣고 <strong>[API 키 저장]</strong> 클릭</li>
            </ol>
            <p className="text-[10px] text-amber-600 dark:text-amber-300 font-medium">
              💡 Google 계정만 있으면 <strong>분당 15회 / 하루 1,500회</strong>까지 100% 무료로 제공됩니다.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div
          className={`px-5 py-3 flex items-center justify-end gap-2.5 border-t ${
            isDark ? "border-slate-800 bg-slate-900/50" : "border-slate-200 bg-slate-50"
          }`}
        >
          <button
            type="button"
            onClick={onClose}
            className={`px-4 py-2 rounded-md text-xs font-bold transition-colors border ${
              isDark
                ? "bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700"
                : "bg-white hover:bg-slate-100 text-slate-700 border-slate-300 shadow-xs"
            }`}
          >
            닫기
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="flex items-center gap-1.5 px-5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-md text-xs font-black shadow-xs transition-all uppercase tracking-wider"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>API 키 저장</span>
          </button>
        </div>
      </div>
    </div>
  );
};
