import React, { useState, useRef, useEffect } from "react";
import { Camera, X, RefreshCw, Check, AlertCircle, SwitchCamera } from "lucide-react";

interface CameraCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (dataUrl: string) => void;
  title?: string;
}

export const CameraCaptureModal: React.FC<CameraCaptureModalProps> = ({
  isOpen,
  onClose,
  onCapture,
  title = "현장 실물 사진 즉시 촬영",
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<"environment" | "user">("environment");
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState<boolean>(false);

  // Start Camera Stream
  const startCamera = async (mode: "environment" | "user") => {
    setIsInitializing(true);
    setErrorMsg(null);

    // Stop existing stream
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("브라우저에서 카메라 접근 API를 지원하지 않습니다.");
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: mode,
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
        audio: false,
      });

      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        await videoRef.current.play();
      }
    } catch (err: any) {
      console.warn("Camera init error:", err);
      // Fallback try without facingMode constraint
      try {
        const fallbackStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
        setStream(fallbackStream);
        if (videoRef.current) {
          videoRef.current.srcObject = fallbackStream;
          await videoRef.current.play();
        }
      } catch (fallbackErr: any) {
        setErrorMsg(
          "카메라에 접근할 수 없습니다. 카메라 권한이 허용되어 있는지 확인해주세요."
        );
      }
    } finally {
      setIsInitializing(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setCapturedImage(null);
      startCamera(facingMode);
    } else {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        setStream(null);
      }
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isOpen]);

  const toggleFacingMode = () => {
    const nextMode = facingMode === "environment" ? "user" : "environment";
    setFacingMode(nextMode);
    startCamera(nextMode);
  };

  const handleSnap = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Draw frame
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
    setCapturedImage(dataUrl);
  };

  const handleRetake = () => {
    setCapturedImage(null);
    startCamera(facingMode);
  };

  const handleConfirm = () => {
    if (capturedImage) {
      onCapture(capturedImage);
      handleClose();
    }
  };

  const handleClose = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setCapturedImage(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-950/90 backdrop-blur-md">
      <div className="bg-[#1E293B] rounded-sm border border-slate-700 w-full max-w-lg overflow-hidden shadow-2xl flex flex-col text-slate-200">
        {/* Header */}
        <div className="bg-slate-900 px-4 py-3 border-b border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Camera className="w-4 h-4 text-amber-400" />
            <h3 className="font-bold text-sm text-white uppercase font-mono">{title}</h3>
          </div>
          <button
            onClick={handleClose}
            className="p-1 rounded-sm text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Viewfinder / Preview */}
        <div className="relative bg-black aspect-[4/3] flex items-center justify-center overflow-hidden">
          {errorMsg ? (
            <div className="p-6 text-center text-slate-300 space-y-3">
              <AlertCircle className="w-10 h-10 text-amber-400 mx-auto" />
              <p className="text-xs text-rose-300 leading-relaxed font-semibold">
                {errorMsg}
              </p>
              <p className="text-[11px] text-slate-400">
                기기의 카메라 권한을 승인하거나, '갤러리/파일 업로드' 버튼을 이용해주세요.
              </p>
              <button
                type="button"
                onClick={() => startCamera(facingMode)}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-sm text-xs font-mono text-amber-300 font-bold inline-flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" /> 다시 시도
              </button>
            </div>
          ) : capturedImage ? (
            <div className="relative w-full h-full">
              <img
                src={capturedImage}
                alt="Captured Snapshot"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 bg-black/70 px-2 py-0.5 rounded-sm border border-slate-700 text-[10px] font-mono text-emerald-400 font-bold">
                ✓ 촬영 완료
              </div>
            </div>
          ) : (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />

              {/* Viewfinder Crosshair / Grid overlay */}
              <div className="absolute inset-4 border border-amber-400/30 pointer-events-none rounded-sm flex items-center justify-center">
                <div className="w-12 h-12 border border-dashed border-amber-400/50 rounded-full" />
              </div>

              {isInitializing && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-xs font-mono text-amber-300 gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin" /> 카메라 활성화 중...
                </div>
              )}

              {/* Switch Camera Button */}
              <button
                type="button"
                onClick={toggleFacingMode}
                className="absolute top-3 right-3 p-2 bg-slate-900/80 hover:bg-slate-800 border border-slate-700 rounded-full text-slate-200 transition-colors shadow-lg"
                title="카메라 전환 (전면/후면)"
              >
                <SwitchCamera className="w-4 h-4" />
              </button>
            </>
          )}
        </div>

        {/* Controls */}
        <div className="p-4 bg-slate-900 border-t border-slate-700 flex items-center justify-between gap-3">
          {capturedImage ? (
            <>
              <button
                type="button"
                onClick={handleRetake}
                className="flex-1 py-2 rounded-sm bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 text-xs font-bold font-mono uppercase flex items-center justify-center gap-1.5 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>재촬영</span>
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="flex-1 py-2 rounded-sm bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black font-mono uppercase flex items-center justify-center gap-1.5 transition-colors shadow-md"
              >
                <Check className="w-4 h-4" />
                <span>이 사진 사용하기</span>
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 rounded-sm bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-mono uppercase"
              >
                취소
              </button>

              <button
                type="button"
                disabled={isInitializing || !!errorMsg}
                onClick={handleSnap}
                className="flex-1 py-2.5 rounded-sm bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black font-mono uppercase flex items-center justify-center gap-2 transition-colors disabled:opacity-50 shadow-md"
              >
                <Camera className="w-4 h-4" />
                <span>촬영하기 (SNAP)</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
