import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Plus,
  Trash2,
  Save,
  Sparkles,
  Layers,
  Wrench,
  Package,
  ShieldCheck,
  AlertTriangle,
  FileCheck,
  Zap,
  Ruler,
  Camera,
  Compass,
  Image as ImageIcon,
  CheckCircle2,
  Info,
  Upload,
  ZoomIn,
  Eye,
  RefreshCw,
  FolderOpen,
  Link as LinkIcon,
  MapPin,
  ArrowDownCircle,
  HelpCircle,
} from "lucide-react";
import {
  ConstructionMethod,
  ConstructionPhase,
  ConstructionStep,
  ConstructionDetailSpec,
  FieldPhotoVisual,
  DiagramSchematic,
  PHASE_CONFIG,
} from "../types";
import { CameraCaptureModal } from "./CameraCaptureModal";
import { compressAndReadFile, processMultipleImageFiles } from "../utils/imageUtils";
import { getMethods } from "../utils/storage";

const PHASE_ORDER_LIST: ConstructionPhase[] = [
  ConstructionPhase.PHASE_01_PREPARATION,
  ConstructionPhase.PHASE_02_GROUNDING,
  ConstructionPhase.PHASE_03_BASEMENT_STRUCTURE,
  ConstructionPhase.PHASE_04_UNIT_STRUCTURE,
  ConstructionPhase.PHASE_05_RISER_ROOF,
  ConstructionPhase.PHASE_06_NON_STRUCTURAL,
  ConstructionPhase.PHASE_07_TRAY_RACEWAY,
  ConstructionPhase.PHASE_08_OUTDOOR_CIVIL,
  ConstructionPhase.PHASE_09_WIRING_PULLING,
  ConstructionPhase.PHASE_10_SUBSTATION,
  ConstructionPhase.PHASE_11_FIXTURE_FINISH,
  ConstructionPhase.PHASE_12_TEST_COMMISSIONING,
];

function parseWbsNum(code?: string): number | null {
  if (!code) return null;
  const num = parseInt(code.trim(), 10);
  return isNaN(num) ? null : num;
}

function formatWbsCode(num: number): string {
  return String(num).padStart(3, "0");
}

interface AdminMethodEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (method: ConstructionMethod) => void;
  editingMethod?: ConstructionMethod | null;
  onGenerateAiDraft?: (
    phase: ConstructionPhase,
    title: string,
    requirement?: string
  ) => Promise<Partial<ConstructionMethod> | null>;
}

export const AdminMethodEditorModal: React.FC<AdminMethodEditorModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingMethod,
  onGenerateAiDraft,
}) => {
  const [activeTab, setActiveTab] = useState<
    "PROCEDURE" | "SPECS_DRAWING" | "PHOTOS" | "QA_STANDARDS"
  >("PROCEDURE");

  // Tab 1: General & Procedures
  const [phase, setPhase] = useState<ConstructionPhase>(ConstructionPhase.INITIATION);
  const [wbsCode, setWbsCode] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("배관배선공사");
  const [summary, setSummary] = useState("");
  const [kecStandards, setKecStandards] = useState("");

  // WBS Position Picker states
  const [positionChoice, setPositionChoice] = useState<string>("END_OF_PHASE");
  const [isManualWbs, setIsManualWbs] = useState(false);
  const [allMethods, setAllMethods] = useState<ConstructionMethod[]>([]);

  const [steps, setSteps] = useState<ConstructionStep[]>([
    {
      stepNumber: 1,
      name: "현장 기준선 마킹 및 사전 점검",
      description: "도면과 현장 구조체를 대조하여 기준 먹선을 확인하고 작업 위치를 마킹.",
      caution: "구조체 철근 간섭 여부 사전 확인 필수.",
    },
  ]);

  const [materialsInput, setMaterialsInput] = useState("");
  const [toolsInput, setToolsInput] = useState("");

  // Tab 2: Schematics & Detail Dimension Specs
  const [schematicTitle, setSchematicTitle] = useState("");
  const [schematicType, setSchematicType] = useState<
    "CROSS_SECTION" | "WIRING_DIAGRAM" | "LAYOUT_SPACING" | "INSTALLATION_FLOW"
  >("LAYOUT_SPACING");
  const [schematicDesc, setSchematicDesc] = useState("");
  const [schematicDimensions, setSchematicDimensions] = useState<
    { label: string; value: string }[]
  >([]);
  const [schematicElements, setSchematicElements] = useState<
    { name: string; spec: string; desc: string }[]
  >([]);
  const [detailSpecs, setDetailSpecs] = useState<ConstructionDetailSpec[]>([]);

  // Tab 3: Field Photos & Inspection Points
  const [fieldPhotos, setFieldPhotos] = useState<FieldPhotoVisual[]>([]);
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);
  const [targetPhotoIndexForCamera, setTargetPhotoIndexForCamera] = useState<number | null>(null);
  const [lightboxImageUrl, setLightboxImageUrl] = useState<string | null>(null);
  const [isProcessingPhotos, setIsProcessingPhotos] = useState(false);

  // Hidden File Inputs Refs
  const galleryMultipleInputRef = useRef<HTMLInputElement>(null);
  const nativeCameraInputRef = useRef<HTMLInputElement>(null);
  const singleReplaceInputRef = useRef<HTMLInputElement>(null);
  const singleReplaceIndexRef = useRef<number | null>(null);

  // Tab 4: QA, Safety, Defect Prevention
  const [safetyInput, setSafetyInput] = useState("");
  const [qualityInput, setQualityInput] = useState("");
  const [defectInput, setDefectInput] = useState("");

  // AI draft states
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [aiRequirement, setAiRequirement] = useState("");

  // Helper to compute target WBS from a position selection
  const computeTargetWbs = (
    currentPhase: ConstructionPhase,
    choice: string,
    methodsList: ConstructionMethod[]
  ): number => {
    const phaseMethods = methodsList
      .filter((m) => m.phase === currentPhase && m.id !== editingMethod?.id)
      .sort((a, b) => (parseWbsNum(a.wbsCode) ?? 999) - (parseWbsNum(b.wbsCode) ?? 999));

    if (choice === "KEEP_CURRENT" && editingMethod?.wbsCode) {
      return parseWbsNum(editingMethod.wbsCode) || 1;
    }

    if (choice === "START_OF_PHASE") {
      if (phaseMethods.length > 0) {
        return parseWbsNum(phaseMethods[0].wbsCode) || 1;
      }
    }

    if (choice.startsWith("AFTER_")) {
      const targetId = choice.replace("AFTER_", "");
      const found = phaseMethods.find((m) => m.id === targetId);
      if (found) {
        return (parseWbsNum(found.wbsCode) || 0) + 1;
      }
    }

    // Default: END_OF_PHASE
    if (phaseMethods.length > 0) {
      const maxInPhase = Math.max(
        ...phaseMethods.map((m) => parseWbsNum(m.wbsCode) || 0)
      );
      return maxInPhase + 1;
    }

    // If empty phase, find highest WBS of previous phases
    const phaseIdx = PHASE_ORDER_LIST.indexOf(currentPhase);
    let prevMax = 0;
    for (let i = 0; i < phaseIdx; i++) {
      const prevPhase = PHASE_ORDER_LIST[i];
      const prevMethods = methodsList.filter(
        (m) => m.phase === prevPhase && m.id !== editingMethod?.id
      );
      for (const pm of prevMethods) {
        const n = parseWbsNum(pm.wbsCode) || 0;
        if (n > prevMax) prevMax = n;
      }
    }
    return prevMax + 1;
  };

  useEffect(() => {
    const loaded = getMethods();
    setAllMethods(loaded);

    if (editingMethod) {
      setPhase(editingMethod.phase);
      setWbsCode(editingMethod.wbsCode || "");
      setPositionChoice("KEEP_CURRENT");
      setIsManualWbs(false);
      setTitle(editingMethod.title);
      setCategory(editingMethod.category);
      setSummary(editingMethod.summary);
      setKecStandards(editingMethod.kecStandards);
      setSteps(editingMethod.steps || []);
      setMaterialsInput(editingMethod.materials?.join("\n") || "");
      setToolsInput(editingMethod.tools?.join("\n") || "");
      setSafetyInput(editingMethod.safetyPoints?.join("\n") || "");
      setQualityInput(editingMethod.qualityInspection?.join("\n") || "");
      setDefectInput(editingMethod.defectPrevention?.join("\n") || "");

      // Detail Specs
      setDetailSpecs(editingMethod.detailSpecs || []);

      // Schematic
      if (editingMethod.schematic) {
        setSchematicTitle(editingMethod.schematic.title || "");
        setSchematicType(editingMethod.schematic.type || "LAYOUT_SPACING");
        setSchematicDesc(editingMethod.schematic.description || "");
        setSchematicDimensions(editingMethod.schematic.keyDimensions || []);
        setSchematicElements(editingMethod.schematic.elements || []);
      } else {
        setSchematicTitle("");
        setSchematicType("LAYOUT_SPACING");
        setSchematicDesc("");
        setSchematicDimensions([]);
        setSchematicElements([]);
      }

      // Photos
      setFieldPhotos(editingMethod.fieldPhotos || []);
    } else {
      const initialPhase = ConstructionPhase.INITIATION;
      setPhase(initialPhase);
      setPositionChoice("END_OF_PHASE");
      setIsManualWbs(false);
      const targetNum = computeTargetWbs(initialPhase, "END_OF_PHASE", loaded);
      setWbsCode(formatWbsCode(targetNum));
      setTitle("");
      setCategory("배관배선공사");
      setSummary("");
      setKecStandards("KEC 232(배선설비), 건축전기설비공사 표준시방서(KCS 31 60)");
      setSteps([
        {
          stepNumber: 1,
          name: "사전 점검 및 승인 자재 준비",
          description: "도면 검토 및 승인 자재(KS/KEC 인증) 현장 반입 검사 실시.",
          caution: "규격 미달 자재 반입 금지 및 보관 상태 점검.",
        },
        {
          stepNumber: 2,
          name: "현장 가공 및 본 시공 설치",
          description: "표준 시방 치수 규격에 맞추어 지지 간격을 준수하여 설치.",
          caution: "구조체 손상 방지 및 이격거리 철저 준수.",
        },
        {
          stepNumber: 3,
          name: "감리 검측 및 시험 측정",
          description: "단자 조임 토크, 절연저항, 접지 연속성 측정 후 기록.",
          caution: "측정값 기준 미달 시 즉시 재시공.",
        },
      ]);
      setMaterialsInput("승인 KS 전선관\n아연도금 지지대\n절연 접지선");
      setToolsInput("절연저항계(500V/1000V)\n토크렌치\n레이저 수평레벨기");
      setSafetyInput("개인보호구(안전모, 절연화, 안전대) 100% 착용\nTBM 위험성평가 사전 교육 실시");
      setQualityInput("시공 상세도와 실측 치수 일치 여부 확인\nKEC 규정 법적 이격거리 확인");
      setDefectInput("볼트 풀림 및 접속 불량 방지를 위한 규정 토크 마킹 실시");

      setSchematicTitle("표준 시공 상세도 및 이격 배치도");
      setSchematicType("LAYOUT_SPACING");
      setSchematicDesc("시공 시 유지해야 할 주요 지지간격 및 구조체 이격거리 기준.");
      setSchematicDimensions([
        { label: "표준 지지 간격", value: "1.5m ~ 2.0m 이하" },
        { label: "박스/접속부 이격", value: "300mm 이내 추가 지지" },
      ]);
      setSchematicElements([
        { name: "지지 앵커 및 전산볼트", spec: "W3/8 (M10)", desc: "인발 하중 3.5kN 이상" },
        { name: "본체 및 배관", spec: "KEC/KS 인증품", desc: "도면 지정 규격 적용" },
      ]);

      setDetailSpecs([
        {
          category: "지지 간격",
          parameter: "직선 구간 지지점 간격",
          standardValue: "1.5m ~ 2.0m 이하",
          kecOrStandard: "KCS 31 60 10",
          notes: "굴곡부 및 박스 단말 0.3m 이내 추가 지지",
        },
        {
          category: "측정 기준",
          parameter: "절연저항 측정 기준",
          standardValue: "1.0 MΩ 이상",
          kecOrStandard: "KEC 142",
          notes: "DC 500V 절연저항계 측정",
        },
      ]);

      setFieldPhotos([
        {
          id: `p-${Date.now()}-1`,
          title: "표준 시공 완료 전경",
          caption: "지지 간격 및 수평 레벨이 완벽하게 시공된 현장 실물.",
          tag: "시공 전경",
          url: "https://images.unsplash.com/photo-1541888946425-d0fbb18f15f6?w=800&auto=format&fit=crop&q=80",
          inspectionPoint: "수평/수직 정렬 상태 및 지지간격 규격 확인",
        },
      ]);
    }
  }, [editingMethod, isOpen]);

  const handlePhaseChange = (newPhase: ConstructionPhase) => {
    setPhase(newPhase);
    const newChoice = "END_OF_PHASE";
    setPositionChoice(newChoice);
    if (!isManualWbs) {
      const targetNum = computeTargetWbs(newPhase, newChoice, allMethods);
      setWbsCode(formatWbsCode(targetNum));
    }
  };

  const handlePositionChoiceChange = (newChoice: string) => {
    setPositionChoice(newChoice);
    if (!isManualWbs) {
      const targetNum = computeTargetWbs(phase, newChoice, allMethods);
      setWbsCode(formatWbsCode(targetNum));
    }
  };

  const phaseMethods = allMethods
    .filter((m) => m.phase === phase && m.id !== editingMethod?.id)
    .sort((a, b) => (parseWbsNum(a.wbsCode) ?? 999) - (parseWbsNum(b.wbsCode) ?? 999));

  const nextEndOfPhaseNum = computeTargetWbs(phase, "END_OF_PHASE", allMethods);
  const startOfPhaseNum = computeTargetWbs(phase, "START_OF_PHASE", allMethods);

  const currentWbsNum = parseWbsNum(wbsCode);
  const conflictsWith =
    currentWbsNum !== null
      ? allMethods.find(
          (m) => m.id !== editingMethod?.id && parseWbsNum(m.wbsCode) === currentWbsNum
        )
      : null;

  if (!isOpen) return null;

  // Step Helpers
  const handleAddStep = () => {
    setSteps([
      ...steps,
      {
        stepNumber: steps.length + 1,
        name: `시공 절차 ${steps.length + 1}`,
        description: "",
        caution: "",
      },
    ]);
  };

  const handleRemoveStep = (index: number) => {
    const updated = steps
      .filter((_, i) => i !== index)
      .map((st, i) => ({ ...st, stepNumber: i + 1 }));
    setSteps(updated);
  };

  const handleStepChange = (index: number, field: keyof ConstructionStep, value: any) => {
    const updated = [...steps];
    updated[index] = { ...updated[index], [field]: value };
    setSteps(updated);
  };

  // Dimension Helpers
  const handleAddDimension = () => {
    setSchematicDimensions([...schematicDimensions, { label: "항목 명칭", value: "규격 치수" }]);
  };
  const handleRemoveDimension = (index: number) => {
    setSchematicDimensions(schematicDimensions.filter((_, i) => i !== index));
  };
  const handleDimensionChange = (index: number, field: "label" | "value", val: string) => {
    const updated = [...schematicDimensions];
    updated[index][field] = val;
    setSchematicDimensions(updated);
  };

  // Element Helpers
  const handleAddElement = () => {
    setSchematicElements([
      ...schematicElements,
      { name: "부재 명칭", spec: "사양/규격", desc: "설명" },
    ]);
  };
  const handleRemoveElement = (index: number) => {
    setSchematicElements(schematicElements.filter((_, i) => i !== index));
  };
  const handleElementChange = (
    index: number,
    field: "name" | "spec" | "desc",
    val: string
  ) => {
    const updated = [...schematicElements];
    updated[index][field] = val;
    setSchematicElements(updated);
  };

  // Detail Specs Helpers
  const handleAddDetailSpec = () => {
    setDetailSpecs([
      ...detailSpecs,
      {
        category: "분류",
        parameter: "검측 항목",
        standardValue: "표준 규격치",
        kecOrStandard: "KEC/KCS",
        notes: "",
      },
    ]);
  };
  const handleRemoveDetailSpec = (index: number) => {
    setDetailSpecs(detailSpecs.filter((_, i) => i !== index));
  };
  const handleDetailSpecChange = (
    index: number,
    field: keyof ConstructionDetailSpec,
    val: string
  ) => {
    const updated = [...detailSpecs];
    updated[index] = { ...updated[index], [field]: val };
    setDetailSpecs(updated);
  };

  // Photo Helpers
  const handleAddPhoto = () => {
    setFieldPhotos([
      ...fieldPhotos,
      {
        id: `p-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        title: `현장 실물 사진 #${fieldPhotos.length + 1}`,
        caption: "현장 시공 상태 설명",
        tag: "시공 검측",
        url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80",
        inspectionPoint: "감리원 주요 확인 포인트",
      },
    ]);
  };

  const handleRemovePhoto = (index: number) => {
    setFieldPhotos(fieldPhotos.filter((_, i) => i !== index));
  };

  const handlePhotoChange = (index: number, field: keyof FieldPhotoVisual, val: string) => {
    const updated = [...fieldPhotos];
    updated[index] = { ...updated[index], [field]: val };
    setFieldPhotos(updated);
  };

  // Camera Live Modal trigger
  const handleOpenLiveCamera = (indexForReplace?: number) => {
    setTargetPhotoIndexForCamera(indexForReplace !== undefined ? indexForReplace : null);
    setIsCameraModalOpen(true);
  };

  // Handle Confirmed Snapshot from Camera (WebRTC)
  const handleCameraCaptureConfirmed = (dataUrl: string) => {
    if (targetPhotoIndexForCamera !== null && targetPhotoIndexForCamera < fieldPhotos.length) {
      // Replace existing photo
      const updated = [...fieldPhotos];
      updated[targetPhotoIndexForCamera] = {
        ...updated[targetPhotoIndexForCamera],
        url: dataUrl,
      };
      setFieldPhotos(updated);
    } else {
      // Append new photo
      const newPhoto: FieldPhotoVisual = {
        id: `photo-cam-${Date.now()}`,
        title: `현장 실물 촬영본 #${fieldPhotos.length + 1}`,
        caption: "현장 실시간 촬영 시공 사진",
        tag: "현장촬영",
        url: dataUrl,
        inspectionPoint: "감리원 현장 실측 확인 포인트",
      };
      setFieldPhotos([...fieldPhotos, newPhoto]);
    }
    setTargetPhotoIndexForCamera(null);
  };

  // Gallery Multiple Batch Upload
  const handleGalleryBatchUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsProcessingPhotos(true);
    try {
      const processedList = await processMultipleImageFiles(files);
      const newItems: FieldPhotoVisual[] = processedList.map((item, idx) => ({
        id: `photo-gal-${Date.now()}-${idx}`,
        title: item.fileName.replace(/\.[^/.]+$/, "") || `현장 사진 #${fieldPhotos.length + idx + 1}`,
        caption: "갤러리에서 업로드된 시공 사진",
        tag: "현장사진",
        url: item.dataUrl,
        inspectionPoint: "감리원 주요 확인 포인트",
      }));
      setFieldPhotos([...fieldPhotos, ...newItems]);
    } catch (err: any) {
      alert("이미지 처리 중 오류가 발생했습니다: " + err.message);
    } finally {
      setIsProcessingPhotos(false);
      if (e.target) e.target.value = "";
    }
  };

  // Native Mobile Camera Upload Handler
  const handleNativeCameraUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsProcessingPhotos(true);
    try {
      const processed = await compressAndReadFile(files[0]);
      if (targetPhotoIndexForCamera !== null && targetPhotoIndexForCamera < fieldPhotos.length) {
        const updated = [...fieldPhotos];
        updated[targetPhotoIndexForCamera] = {
          ...updated[targetPhotoIndexForCamera],
          url: processed.dataUrl,
        };
        setFieldPhotos(updated);
      } else {
        const newPhoto: FieldPhotoVisual = {
          id: `photo-cam-${Date.now()}`,
          title: `현장 카메라 촬영 #${fieldPhotos.length + 1}`,
          caption: "모바일 카메라 현장 촬영 사진",
          tag: "현장촬영",
          url: processed.dataUrl,
          inspectionPoint: "감리원 실측 확인 포인트",
        };
        setFieldPhotos([...fieldPhotos, newPhoto]);
      }
    } catch (err: any) {
      alert("카메라 사진 처리 실패: " + err.message);
    } finally {
      setIsProcessingPhotos(false);
      setTargetPhotoIndexForCamera(null);
      if (e.target) e.target.value = "";
    }
  };

  // Replace Single Photo from Gallery
  const handleSingleReplaceFromGallery = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const targetIdx = singleReplaceIndexRef.current;
    if (!files || files.length === 0 || targetIdx === null) return;

    setIsProcessingPhotos(true);
    try {
      const processed = await compressAndReadFile(files[0]);
      const updated = [...fieldPhotos];
      if (targetIdx < updated.length) {
        updated[targetIdx] = {
          ...updated[targetIdx],
          url: processed.dataUrl,
        };
        setFieldPhotos(updated);
      }
    } catch (err: any) {
      alert("이미지 교체 실패: " + err.message);
    } finally {
      setIsProcessingPhotos(false);
      singleReplaceIndexRef.current = null;
      if (e.target) e.target.value = "";
    }
  };

  // AI Auto-Draft
  const handleAiAutoDraft = async () => {
    if (!title.trim()) {
      alert("시공 공종명을 먼저 입력해주세요. (예: 방화구획 케이블 관통부 내화충전 시공방법)");
      return;
    }
    if (!onGenerateAiDraft) return;

    setIsAiGenerating(true);
    try {
      const generated = await onGenerateAiDraft(phase, title, aiRequirement);
      if (generated) {
        if (generated.category) setCategory(generated.category);
        if (generated.summary) setSummary(generated.summary);
        if (generated.kecStandards) setKecStandards(generated.kecStandards);
        if (generated.steps && generated.steps.length > 0) setSteps(generated.steps);
        if (generated.materials) setMaterialsInput(generated.materials.join("\n"));
        if (generated.tools) setToolsInput(generated.tools.join("\n"));
        if (generated.safetyPoints) setSafetyInput(generated.safetyPoints.join("\n"));
        if (generated.qualityInspection) setQualityInput(generated.qualityInspection.join("\n"));
        if (generated.defectPrevention) setDefectInput(generated.defectPrevention.join("\n"));
        if (generated.detailSpecs && generated.detailSpecs.length > 0)
          setDetailSpecs(generated.detailSpecs);
        if (generated.fieldPhotos && generated.fieldPhotos.length > 0)
          setFieldPhotos(generated.fieldPhotos);
        if (generated.schematic) {
          setSchematicTitle(generated.schematic.title);
          setSchematicType(generated.schematic.type);
          setSchematicDesc(generated.schematic.description);
          setSchematicDimensions(generated.schematic.keyDimensions || []);
          setSchematicElements(generated.schematic.elements || []);
        }
      }
    } catch (e: any) {
      alert("AI 표준안 생성 실패: " + e.message);
    } finally {
      setIsAiGenerating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("시공명을 입력해주세요.");
      return;
    }

    const parseLines = (text: string) =>
      text
        .split("\n")
        .map((l) => l.trim())
        .filter((l) => l.length > 0);

    const schematicData: DiagramSchematic | undefined = schematicTitle.trim()
      ? {
          title: schematicTitle.trim(),
          type: schematicType,
          description: schematicDesc.trim(),
          keyDimensions: schematicDimensions,
          elements: schematicElements,
        }
      : undefined;

    const savedMethod: ConstructionMethod = {
      id: editingMethod?.id || `METH-CUSTOM-${Date.now().toString().slice(-4)}`,
      wbsCode: wbsCode.trim() || undefined,
      phase,
      title: title.trim(),
      category: category.trim() || "전기공사",
      summary: summary.trim() || `${title}에 관한 상세 표준 시공 지침.`,
      steps:
        steps.length > 0
          ? steps
          : [
              {
                stepNumber: 1,
                name: "시공 준비",
                description: "현장 점검 및 작업 수행.",
                caution: "안전수칙 준수.",
              },
            ],
      materials: parseLines(materialsInput),
      tools: parseLines(toolsInput),
      kecStandards: kecStandards.trim() || "KEC 한국전기설비규정",
      safetyPoints: parseLines(safetyInput),
      qualityInspection: parseLines(qualityInput),
      defectPrevention: parseLines(defectInput),
      detailSpecs: detailSpecs.length > 0 ? detailSpecs : undefined,
      fieldPhotos: fieldPhotos.length > 0 ? fieldPhotos : undefined,
      schematic: schematicData,
      isCustom: true,
      updatedAt: new Date().toISOString().split("T")[0],
    };

    onSave(savedMethod);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#1E293B] rounded-sm shadow-2xl border border-slate-700 w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden my-2 text-slate-200">
        {/* Header */}
        <div className="bg-slate-900 px-5 py-4 text-white flex items-center justify-between border-b border-slate-700 shrink-0">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-sm bg-amber-400 text-slate-950 flex items-center justify-center font-bold shrink-0">
              <Zap className="w-5 h-5 fill-slate-950" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base uppercase tracking-wider font-mono text-white">
                {editingMethod
                  ? `시방서 통합 수정 [${editingMethod.id}]`
                  : "새 시방서 & 시공방법 등록"}
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                표준절차 · 시공상세도/치수규격 · 실물사진/감리포인트 · KEC 품질안전 통합 편집
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-sm text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-slate-950/90 px-4 pt-2 border-b border-slate-700 flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab("PROCEDURE")}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold uppercase tracking-wider transition-all border-b-2 font-mono whitespace-nowrap ${
              activeTab === "PROCEDURE"
                ? "border-amber-400 text-amber-400 bg-slate-900/60"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>1. 기본정보 & 표준절차 ({steps.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("SPECS_DRAWING")}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold uppercase tracking-wider transition-all border-b-2 font-mono whitespace-nowrap ${
              activeTab === "SPECS_DRAWING"
                ? "border-amber-400 text-amber-400 bg-slate-900/60"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Ruler className="w-3.5 h-3.5" />
            <span>2. 상세도 & 치수규격 ({detailSpecs.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("PHOTOS")}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold uppercase tracking-wider transition-all border-b-2 font-mono whitespace-nowrap ${
              activeTab === "PHOTOS"
                ? "border-amber-400 text-amber-400 bg-slate-900/60"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>3. 실물사진 & 감리포인트 ({fieldPhotos.length})</span>
          </button>

          <button
            type="button"
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

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-sm">
          {/* AI Auto-Draft Assistant Banner */}
          <div className="bg-slate-900/90 border border-slate-700 p-3.5 rounded-sm space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-bold text-xs text-amber-300 uppercase font-mono">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>AI 시방서 4개 탭 전체 자동 생성 어시스턴트</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">GEMINI KEC ENGINE</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 pt-0.5">
              <input
                type="text"
                placeholder="시공 요구사항 또는 특수 조건 (예: 22.9kV 수변전실 이격거리 및 VCB 시험규격)"
                value={aiRequirement}
                onChange={(e) => setAiRequirement(e.target.value)}
                className="flex-1 px-3 py-1.5 text-xs bg-slate-950 border border-slate-700 rounded-sm focus:outline-none focus:border-amber-400 text-slate-200 placeholder-slate-500 font-mono"
              />
              <button
                type="button"
                onClick={handleAiAutoDraft}
                disabled={isAiGenerating}
                className="bg-amber-400 hover:bg-amber-300 text-slate-900 px-4 py-1.5 rounded-sm text-xs font-bold flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50 uppercase font-mono shadow-sm"
              >
                {isAiGenerating ? (
                  <span>생성 중...</span>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AI 시방서 자동 완성</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* TAB 1: PROCEDURES & BASIC INFO */}
          {activeTab === "PROCEDURE" && (
            <div className="space-y-5">
              {/* Phase, Title, Category */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                <div className="sm:col-span-4">
                  <label className="block text-xs font-bold text-slate-300 mb-1 uppercase font-mono">
                    1. 공정 단계 선택 <span className="text-amber-400">*</span>
                  </label>
                  <select
                    value={phase}
                    onChange={(e) => handlePhaseChange(e.target.value as ConstructionPhase)}
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-sm font-bold focus:outline-none focus:border-amber-400 text-amber-300 shadow-xs"
                  >
                    {Object.entries(PHASE_CONFIG).map(([key, config]) => (
                      <option key={key} value={key}>
                        {config.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-5">
                  <label className="block text-xs font-bold text-slate-300 mb-1 uppercase font-mono">
                    시공 공종명 <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="예: 케이블 트레이 관통부 방화실란트 시공"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-sm focus:outline-none focus:border-amber-400 font-bold text-white shadow-xs"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-xs font-bold text-slate-300 mb-1 uppercase font-mono">
                    공종 분류
                  </label>
                  <input
                    type="text"
                    placeholder="예: 배관공사, 접지공사"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-sm focus:outline-none focus:border-amber-400 text-slate-200 shadow-xs"
                  />
                </div>
              </div>

              {/* WBS Position Selector Card */}
              <div className="bg-slate-900/90 border border-amber-500/30 rounded-sm p-3.5 space-y-3 shadow-inner">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-black text-[11px] font-mono">
                      #
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-100">
                        2. WBS 순서 및 삽입 위치 지정
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 bg-amber-400/15 text-amber-300 border border-amber-400/30 rounded-xs">
                        자동 번호 순연 (+1 Shift)
                      </span>
                    </div>
                  </div>

                  {/* Mode switcher */}
                  <div className="flex items-center gap-1 text-[11px] bg-slate-950 p-0.5 rounded-sm border border-slate-800">
                    <button
                      type="button"
                      onClick={() => {
                        setIsManualWbs(false);
                        const targetNum = computeTargetWbs(phase, positionChoice, allMethods);
                        setWbsCode(formatWbsCode(targetNum));
                      }}
                      className={`px-2.5 py-1 rounded-xs font-bold transition-all ${
                        !isManualWbs
                          ? "bg-amber-400 text-slate-950 shadow-xs"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      📍 공정 내 위치 선택 (권장)
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsManualWbs(true)}
                      className={`px-2.5 py-1 rounded-xs font-bold transition-all ${
                        isManualWbs
                          ? "bg-amber-400 text-slate-950 shadow-xs"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      ✏️ 번호 직접 입력
                    </button>
                  </div>
                </div>

                {!isManualWbs ? (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                    <div className="md:col-span-8 space-y-1">
                      <label className="block text-[11px] font-semibold text-slate-300">
                        선택 공정({PHASE_CONFIG[phase]?.label}) 내 배치할 위치를 선택하세요:
                      </label>
                      <select
                        value={positionChoice}
                        onChange={(e) => handlePositionChoiceChange(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-sm font-medium focus:outline-none focus:border-amber-400 text-slate-100"
                      >
                        {editingMethod && editingMethod.wbsCode && (
                          <option value="KEEP_CURRENT">
                            📍 현재 위치 유지 (WBS {editingMethod.wbsCode})
                          </option>
                        )}
                        <option value="END_OF_PHASE">
                          📍 [해당 공정 맨 뒤에 추가] ➔ WBS {formatWbsCode(nextEndOfPhaseNum)} 자동 배정
                        </option>
                        <option value="START_OF_PHASE">
                          📍 [해당 공정 맨 앞에 삽입] ➔ WBS {formatWbsCode(startOfPhaseNum)}로 삽입
                        </option>
                        {phaseMethods.length > 0 && (
                          <optgroup label="── 기존 시공방법 뒤에 삽입 ──">
                            {phaseMethods.map((m) => {
                              const num = parseWbsNum(m.wbsCode) || 0;
                              return (
                                <option key={m.id} value={`AFTER_${m.id}`}>
                                  📍 [{m.wbsCode || "---"}] {m.title.length > 28 ? m.title.slice(0, 28) + "..." : m.title} 다음 ➔ WBS {formatWbsCode(num + 1)}로 삽입
                                </option>
                              );
                            })}
                          </optgroup>
                        )}
                      </select>
                    </div>

                    <div className="md:col-span-4 bg-slate-950 border border-slate-800 rounded-sm p-2.5 flex flex-col justify-center">
                      <span className="text-[10px] text-slate-400 font-mono block">부여될 WBS 번호</span>
                      <div className="flex items-baseline gap-2 mt-0.5">
                        <span className="text-lg font-black font-mono text-amber-400 tracking-wider">
                          WBS {wbsCode || "---"}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1 leading-tight">
                        {conflictsWith ? (
                          <span className="text-amber-300">
                            ⚡ 기존 '[{conflictsWith.wbsCode}] {conflictsWith.title.length > 12 ? conflictsWith.title.slice(0, 12) + "..." : conflictsWith.title}' 이후 항목은 번호가 +1씩 순연됩니다.
                          </span>
                        ) : (
                          <span className="text-emerald-400">
                            ✅ 중복 없이 해당 공정 순번으로 바로 배정됩니다.
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                    <div className="sm:col-span-4">
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1 font-mono">
                        WBS 번호 입력 (예: 004, 045)
                      </label>
                      <input
                        type="text"
                        value={wbsCode}
                        onChange={(e) => setWbsCode(e.target.value)}
                        placeholder="예: 004"
                        className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-sm font-mono focus:outline-none focus:border-amber-400 text-amber-300 font-bold"
                      />
                    </div>
                    <div className="sm:col-span-8 text-[11px] text-slate-400 leading-relaxed bg-slate-950 p-2.5 rounded-sm border border-slate-800">
                      💡 <strong>자동 순연 안내:</strong> 입력한 번호가 기존 항목과 겹치는 경우, 기존 항목부터 그 뒤의 모든 항목이 자동으로 <strong>+1씩 순연</strong>되어 번호 유실 없이 정렬됩니다.
                    </div>
                  </div>
                )}
              </div>

              {/* Summary & KEC */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1 uppercase font-mono">
                    시공 개요 및 핵심 요약
                  </label>
                  <textarea
                    rows={3}
                    placeholder="시공의 핵심 목적 및 개요를 2~3줄로 기술하세요."
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-sm focus:outline-none focus:border-amber-400 leading-relaxed text-slate-200 placeholder-slate-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1 uppercase font-mono">
                    관련 KEC 규정 및 법적 기준
                  </label>
                  <textarea
                    rows={3}
                    placeholder="예: KEC 232.41(케이블트레이), KCS 31 60 10(표준시방서)"
                    value={kecStandards}
                    onChange={(e) => setKecStandards(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-sm focus:outline-none focus:border-amber-400 font-mono text-amber-300 placeholder-slate-500"
                  />
                </div>
              </div>

              {/* Steps */}
              <div className="space-y-3 pt-2 border-t border-slate-700">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-white flex items-center gap-1.5 uppercase font-mono">
                    <Layers className="w-4 h-4 text-amber-400" />
                    <span>단계별 표준 시공 절차 ({steps.length}단계)</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleAddStep}
                    className="flex items-center gap-1 text-xs text-amber-300 bg-slate-900 hover:bg-slate-800 border border-slate-700 px-3 py-1 rounded-sm font-bold transition-colors uppercase font-mono"
                  >
                    <Plus className="w-3.5 h-3.5" /> 단계 추가
                  </button>
                </div>

                <div className="space-y-3">
                  {steps.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-sm border border-slate-700 bg-slate-900/60 space-y-2 relative"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 flex-1">
                          <span className="w-5 h-5 rounded-sm bg-slate-950 text-amber-300 text-xs font-mono font-bold flex items-center justify-center shrink-0 border border-slate-700">
                            {step.stepNumber}
                          </span>
                          <input
                            type="text"
                            placeholder="절차명 (예: 기준선 먹메김 및 고정 앵커 천공)"
                            value={step.name}
                            onChange={(e) => handleStepChange(idx, "name", e.target.value)}
                            className="flex-1 px-2.5 py-1 text-xs bg-slate-950 border border-slate-700 rounded-sm font-bold focus:border-amber-400 text-white placeholder-slate-500"
                          />
                        </div>
                        {steps.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveStep(idx)}
                            className="text-slate-400 hover:text-rose-400 p-1 transition-colors"
                            title="이 단계 삭제"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-7">
                        <div>
                          <span className="text-[10px] font-semibold text-slate-400 block mb-0.5 uppercase font-mono">
                            상세 시공 설명:
                          </span>
                          <textarea
                            rows={2}
                            placeholder="시공 방법 및 주의 수치를 상세히 기술하세요."
                            value={step.description}
                            onChange={(e) => handleStepChange(idx, "description", e.target.value)}
                            className="w-full px-2 py-1 text-xs bg-slate-950 border border-slate-700 rounded-sm focus:border-amber-400 text-slate-200 placeholder-slate-500"
                          />
                        </div>
                        <div>
                          <span className="text-[10px] font-semibold text-amber-400 block mb-0.5 uppercase font-mono">
                            핵심 주의사항:
                          </span>
                          <textarea
                            rows={2}
                            placeholder="시공 시 핵심 주의사항 및 결함 방지 팁"
                            value={step.caution}
                            onChange={(e) => handleStepChange(idx, "caution", e.target.value)}
                            className="w-full px-2 py-1 text-xs bg-slate-950 border border-slate-700 rounded-sm focus:border-amber-400 text-slate-200 placeholder-slate-500"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Materials & Tools */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-700">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1 uppercase font-mono">
                    <Package className="w-3.5 h-3.5 text-amber-400" />
                    <span>필요 주요 자재 (줄바꿈 구분)</span>
                  </label>
                  <textarea
                    rows={3}
                    placeholder={"난연 실란트\n암면 보드(100t)\n방화 테이프"}
                    value={materialsInput}
                    onChange={(e) => setMaterialsInput(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-sm focus:outline-none focus:border-amber-400 font-mono text-slate-200 placeholder-slate-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1 uppercase font-mono">
                    <Wrench className="w-3.5 h-3.5 text-amber-400" />
                    <span>사용 공구 및 정밀 계측기 (줄바꿈 구분)</span>
                  </label>
                  <textarea
                    rows={3}
                    placeholder={"절연저항계(500V/1000V)\n토크렌치\n레이저 레벨기"}
                    value={toolsInput}
                    onChange={(e) => setToolsInput(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-sm focus:outline-none focus:border-amber-400 font-mono text-slate-200 placeholder-slate-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SPECS & DRAWING */}
          {activeTab === "SPECS_DRAWING" && (
            <div className="space-y-6">
              {/* Schematic Diagram Block */}
              <div className="p-4 rounded-sm border border-slate-700 bg-slate-900/80 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                  <div className="flex items-center gap-2">
                    <Compass className="w-4 h-4 text-amber-400" />
                    <h4 className="font-bold text-xs uppercase font-mono text-white">
                      시공 상세도 & 단면도 구조 정의
                    </h4>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">DIAGRAM SPECS</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-slate-300 mb-1 font-mono uppercase">
                      도해 / 단면도 제목
                    </label>
                    <input
                      type="text"
                      placeholder="예: 22.9kV 수변전 설비 배치도 및 안전 이격거리 상세도"
                      value={schematicTitle}
                      onChange={(e) => setSchematicTitle(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs bg-slate-950 border border-slate-700 rounded-sm focus:border-amber-400 text-white font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1 font-mono uppercase">
                      도해 형식 (TYPE)
                    </label>
                    <select
                      value={schematicType}
                      onChange={(e) => setSchematicType(e.target.value as any)}
                      className="w-full px-3 py-1.5 text-xs bg-slate-950 border border-slate-700 rounded-sm focus:border-amber-400 text-slate-200 font-mono"
                    >
                      <option value="LAYOUT_SPACING">이격배치도 (LAYOUT_SPACING)</option>
                      <option value="CROSS_SECTION">구조 단면도 (CROSS_SECTION)</option>
                      <option value="WIRING_DIAGRAM">결선/배선도 (WIRING_DIAGRAM)</option>
                      <option value="INSTALLATION_FLOW">시공순서도 (INSTALLATION_FLOW)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1 font-mono uppercase">
                    상세도 설명 및 도면 주석
                  </label>
                  <textarea
                    rows={2}
                    placeholder="도면의 판독 방법 및 현장 작업자가 주의해야 할 배치 지침"
                    value={schematicDesc}
                    onChange={(e) => setSchematicDesc(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs bg-slate-950 border border-slate-700 rounded-sm focus:border-amber-400 text-slate-200"
                  />
                </div>

                {/* Key Dimensions Editor */}
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-amber-300 font-mono uppercase">
                      핵심 치수 키-값 요약 ({schematicDimensions.length}항목)
                    </span>
                    <button
                      type="button"
                      onClick={handleAddDimension}
                      className="text-[11px] font-bold text-amber-300 hover:text-amber-200 font-mono flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" /> 치수 추가
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {schematicDimensions.map((dim, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 p-2 bg-slate-950 border border-slate-800 rounded-sm"
                      >
                        <input
                          type="text"
                          placeholder="치수 항목 (예: 상부 이격거리)"
                          value={dim.label}
                          onChange={(e) => handleDimensionChange(idx, "label", e.target.value)}
                          className="w-1/2 px-2 py-1 text-xs bg-slate-900 border border-slate-700 rounded-sm text-slate-200"
                        />
                        <input
                          type="text"
                          placeholder="규격치 (예: 1,000mm 이상)"
                          value={dim.value}
                          onChange={(e) => handleDimensionChange(idx, "value", e.target.value)}
                          className="w-1/2 px-2 py-1 text-xs bg-slate-900 border border-slate-700 rounded-sm text-amber-400 font-mono font-bold"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveDimension(idx)}
                          className="text-slate-400 hover:text-rose-400 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Components Elements Editor */}
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-300 font-mono uppercase">
                      주요 부재별 시공 사양 ({schematicElements.length}부재)
                    </span>
                    <button
                      type="button"
                      onClick={handleAddElement}
                      className="text-[11px] font-bold text-amber-300 hover:text-amber-200 font-mono flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" /> 부재 추가
                    </button>
                  </div>

                  <div className="space-y-2">
                    {schematicElements.map((elem, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col sm:flex-row items-center gap-2 p-2 bg-slate-950 border border-slate-800 rounded-sm"
                      >
                        <input
                          type="text"
                          placeholder="부재명 (예: 전산볼트)"
                          value={elem.name}
                          onChange={(e) => handleElementChange(idx, "name", e.target.value)}
                          className="w-full sm:w-1/4 px-2 py-1 text-xs bg-slate-900 border border-slate-700 rounded-sm text-white font-bold"
                        />
                        <input
                          type="text"
                          placeholder="규격/사양 (예: W3/8 인발하중 3.5kN)"
                          value={elem.spec}
                          onChange={(e) => handleElementChange(idx, "spec", e.target.value)}
                          className="w-full sm:w-1/3 px-2 py-1 text-xs bg-slate-900 border border-slate-700 rounded-sm text-amber-300 font-mono"
                        />
                        <input
                          type="text"
                          placeholder="부재 설명/시공 기준"
                          value={elem.desc}
                          onChange={(e) => handleElementChange(idx, "desc", e.target.value)}
                          className="w-full sm:flex-1 px-2 py-1 text-xs bg-slate-900 border border-slate-700 rounded-sm text-slate-200"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveElement(idx)}
                          className="text-slate-400 hover:text-rose-400 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Detail Specifications Table Editor */}
              <div className="p-4 rounded-sm border border-slate-700 bg-slate-900/80 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Ruler className="w-4 h-4 text-amber-400" />
                    <h4 className="font-bold text-xs uppercase font-mono text-white">
                      시공 상세 치수 및 엔지니어링 규격 기준표 ({detailSpecs.length}개 항목)
                    </h4>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddDetailSpec}
                    className="flex items-center gap-1 text-xs text-amber-300 bg-slate-950 hover:bg-slate-800 border border-slate-700 px-3 py-1 rounded-sm font-bold uppercase font-mono"
                  >
                    <Plus className="w-3.5 h-3.5" /> 규격 행 추가
                  </button>
                </div>

                <div className="space-y-2">
                  {detailSpecs.map((spec, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-slate-950 border border-slate-800 rounded-sm space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold text-amber-400">
                          SPEC #{idx + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveDetailSpec(idx)}
                          className="text-slate-400 hover:text-rose-400 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                        <input
                          type="text"
                          placeholder="분류 (예: 지지간격)"
                          value={spec.category}
                          onChange={(e) => handleDetailSpecChange(idx, "category", e.target.value)}
                          className="px-2 py-1 text-xs bg-slate-900 border border-slate-700 rounded-sm text-slate-200 font-bold"
                        />
                        <input
                          type="text"
                          placeholder="검측 항목 (예: 직선구간 지지점)"
                          value={spec.parameter}
                          onChange={(e) => handleDetailSpecChange(idx, "parameter", e.target.value)}
                          className="px-2 py-1 text-xs bg-slate-900 border border-slate-700 rounded-sm text-white"
                        />
                        <input
                          type="text"
                          placeholder="표준 규격치 (예: 2.0m 이하)"
                          value={spec.standardValue}
                          onChange={(e) => handleDetailSpecChange(idx, "standardValue", e.target.value)}
                          className="px-2 py-1 text-xs bg-slate-900 border border-slate-700 rounded-sm text-emerald-400 font-mono font-bold"
                        />
                        <input
                          type="text"
                          placeholder="적용 근거 (예: KEC 232.13)"
                          value={spec.kecOrStandard}
                          onChange={(e) => handleDetailSpecChange(idx, "kecOrStandard", e.target.value)}
                          className="px-2 py-1 text-xs bg-slate-900 border border-slate-700 rounded-sm text-amber-300 font-mono text-[11px]"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="비고 / 특이사항 (예: 박스 양단 0.3m 이내 추가 고정 필수)"
                        value={spec.notes || ""}
                        onChange={(e) => handleDetailSpecChange(idx, "notes", e.target.value)}
                        className="w-full px-2 py-1 text-xs bg-slate-900 border border-slate-700 rounded-sm text-slate-400"
                      />
                    </div>
                  ))}

                  {detailSpecs.length === 0 && (
                    <div className="p-4 text-center text-xs text-slate-400">
                      등록된 치수 규격이 없습니다. 상단의 '규격 행 추가' 버튼을 눌러 추가하세요.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: FIELD PHOTOS & INSPECTION POINTS */}
          {activeTab === "PHOTOS" && (
            <div className="space-y-4">
              {/* Photo Top Action Toolbar */}
              <div className="bg-slate-900/90 border border-slate-700 p-3.5 rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md">
                <div>
                  <div className="flex items-center gap-2">
                    <Camera className="w-4 h-4 text-amber-400" />
                    <h4 className="font-bold text-xs uppercase font-mono text-white">
                      현장 실물 시공 사진 & 감리 검측 포인트 ({fieldPhotos.length}장)
                    </h4>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    모바일/태블릿 카메라로 즉시 촬영하거나 기기 갤러리/앨범에서 선택하여 실물 사진을 바로 등록하세요.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  {/* Option 1: Native Mobile Camera Direct Shoot */}
                  <button
                    type="button"
                    onClick={() => nativeCameraInputRef.current?.click()}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition-colors uppercase font-mono shadow-sm"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>카메라 즉시 촬영</span>
                  </button>

                  {/* Option 2: Live Viewfinder Camera (For PC/Webcam/Live Mode) */}
                  <button
                    type="button"
                    onClick={() => handleOpenLiveCamera()}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-slate-800 hover:bg-slate-700 border border-slate-600 text-amber-300 font-bold text-xs transition-colors uppercase font-mono"
                    title="실시간 뷰파인더 웹캠/카메라로 촬영"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>라이브 촬영</span>
                  </button>

                  {/* Option 3: Gallery / Files Multiple Upload */}
                  <button
                    type="button"
                    onClick={() => galleryMultipleInputRef.current?.click()}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 font-bold text-xs transition-colors uppercase font-mono"
                  >
                    <FolderOpen className="w-3.5 h-3.5 text-blue-400" />
                    <span>갤러리에서 선택 (다중)</span>
                  </button>

                  {/* Option 4: Manual Empty Card */}
                  <button
                    type="button"
                    onClick={handleAddPhoto}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-sm bg-slate-950 hover:bg-slate-800 border border-slate-700 text-slate-400 hover:text-white font-bold text-xs transition-colors uppercase font-mono"
                    title="빈 사진 카드 수동 추가"
                  >
                    <Plus className="w-3.5 h-3.5" /> 카드 추가
                  </button>
                </div>
              </div>

              {isProcessingPhotos && (
                <div className="p-3 bg-amber-950/40 border border-amber-800/60 rounded-sm flex items-center justify-center gap-2 text-xs font-mono text-amber-300">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>이미지 압축 및 최적화 처리 중...</span>
                </div>
              )}

              {/* Photo Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fieldPhotos.map((photo, idx) => (
                  <div
                    key={photo.id || idx}
                    className="p-4 rounded-sm border border-slate-700 bg-slate-900/90 space-y-3 flex flex-col justify-between shadow-md"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <span className="text-[11px] font-mono font-black text-amber-400">
                          실물 사진 #{idx + 1}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => setLightboxImageUrl(photo.url)}
                            className="text-slate-400 hover:text-amber-300 p-1 transition-colors"
                            title="사진 원본 크게보기"
                          >
                            <ZoomIn className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemovePhoto(idx)}
                            className="text-slate-400 hover:text-rose-400 p-1 transition-colors"
                            title="사진 삭제"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Image Preview & Quick Actions */}
                      <div className="flex gap-3">
                        <div className="relative w-28 h-28 bg-slate-950 rounded-sm border border-slate-800 overflow-hidden shrink-0 group">
                          <img
                            src={photo.url}
                            alt={photo.title}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400";
                            }}
                          />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1 p-1">
                            <button
                              type="button"
                              onClick={() => {
                                setTargetPhotoIndexForCamera(idx);
                                nativeCameraInputRef.current?.click();
                              }}
                              className="w-full py-1 text-[10px] bg-amber-400 text-slate-950 font-bold rounded-sm font-mono flex items-center justify-center gap-1"
                            >
                              <Camera className="w-3 h-3" /> 촬영 교체
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                singleReplaceIndexRef.current = idx;
                                singleReplaceInputRef.current?.click();
                              }}
                              className="w-full py-1 text-[10px] bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-sm font-mono flex items-center justify-center gap-1 border border-slate-600"
                            >
                              <FolderOpen className="w-3 h-3" /> 앨범 교체
                            </button>
                          </div>
                        </div>

                        <div className="flex-1 space-y-2">
                          <div>
                            <label className="block text-[10px] text-slate-400 font-mono uppercase mb-0.5">
                              사진 제목
                            </label>
                            <input
                              type="text"
                              placeholder="사진 제목 (예: 케이블 트레이 접지 본딩)"
                              value={photo.title}
                              onChange={(e) => handlePhotoChange(idx, "title", e.target.value)}
                              className="w-full px-2.5 py-1 text-xs bg-slate-950 border border-slate-700 rounded-sm text-white font-bold focus:border-amber-400"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] text-slate-400 font-mono uppercase mb-0.5">
                              시공 구분 태그
                            </label>
                            <input
                              type="text"
                              placeholder="사진 구분 태그 (예: 접지 본딩, 배관 포설)"
                              value={photo.tag}
                              onChange={(e) => handlePhotoChange(idx, "tag", e.target.value)}
                              className="w-full px-2.5 py-1 text-xs bg-slate-950 border border-slate-700 rounded-sm text-amber-300 font-mono focus:border-amber-400"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Photo Actions Row */}
                      <div className="flex items-center gap-2 bg-slate-950 p-2 rounded-sm border border-slate-800">
                        <span className="text-[10px] text-slate-400 font-mono shrink-0">사진 변경:</span>
                        <button
                          type="button"
                          onClick={() => {
                            setTargetPhotoIndexForCamera(idx);
                            nativeCameraInputRef.current?.click();
                          }}
                          className="flex items-center gap-1 text-[11px] font-bold text-amber-400 hover:text-amber-300 font-mono px-2 py-0.5 rounded-sm bg-slate-900 border border-slate-700"
                        >
                          <Camera className="w-3 h-3" /> 카메라 촬영
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            singleReplaceIndexRef.current = idx;
                            singleReplaceInputRef.current?.click();
                          }}
                          className="flex items-center gap-1 text-[11px] font-bold text-blue-300 hover:text-blue-200 font-mono px-2 py-0.5 rounded-sm bg-slate-900 border border-slate-700"
                        >
                          <FolderOpen className="w-3 h-3" /> 갤러리 선택
                        </button>
                        <button
                          type="button"
                          onClick={() => handleOpenLiveCamera(idx)}
                          className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 hover:text-emerald-300 font-mono px-2 py-0.5 rounded-sm bg-slate-900 border border-slate-700"
                        >
                          <Eye className="w-3 h-3" /> 웹캠 라이브
                        </button>
                      </div>

                      {/* Image URL Direct edit (Collapsible) */}
                      <div>
                        <label className="block text-[10px] text-slate-400 font-mono uppercase mb-0.5">
                          이미지 데이터 소스 (URL / Base64 Data)
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="https://... 또는 카메라/갤러리 이미지 데이터"
                            value={photo.url}
                            onChange={(e) => handlePhotoChange(idx, "url", e.target.value)}
                            className="w-full px-2.5 py-1 text-xs bg-slate-950 border border-slate-700 rounded-sm text-slate-300 font-mono text-[11px] focus:border-amber-400 truncate pr-16"
                          />
                          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] text-slate-500 font-mono">
                            {photo.url.startsWith("data:") ? "DATA-IMG" : "URL-SRC"}
                          </span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] text-slate-400 font-mono uppercase mb-0.5">
                          시공 상태 캡션
                        </label>
                        <textarea
                          rows={2}
                          placeholder="사진에 나타난 작업 공정과 시공 상태 설명"
                          value={photo.caption}
                          onChange={(e) => handlePhotoChange(idx, "caption", e.target.value)}
                          className="w-full px-2.5 py-1 text-xs bg-slate-950 border border-slate-700 rounded-sm text-slate-200 focus:border-amber-400"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] text-blue-400 font-mono font-bold uppercase mb-0.5">
                          감리원 핵심 검측 포인트
                        </label>
                        <textarea
                          rows={2}
                          placeholder="감리원 입회 시 필수 검측 사항 (예: 본딩 도체 16mm² 이상, 접촉면 도료 제거 확인)"
                          value={photo.inspectionPoint}
                          onChange={(e) => handlePhotoChange(idx, "inspectionPoint", e.target.value)}
                          className="w-full px-2.5 py-1 text-xs bg-blue-950/40 border border-blue-800/60 rounded-sm text-blue-200 font-medium focus:border-blue-400"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                {fieldPhotos.length === 0 && (
                  <div className="sm:col-span-2 p-12 text-center bg-slate-900/60 border border-slate-800 rounded-sm text-slate-400 text-xs space-y-3">
                    <Camera className="w-10 h-10 text-slate-600 mx-auto" />
                    <p className="font-bold text-slate-300">등록된 실물 사진이 없습니다.</p>
                    <p className="text-slate-500 text-[11px]">
                      상단의 '카메라 즉시 촬영' 또는 '갤러리에서 선택' 버튼을 눌러 현장 실물 사진을 등록하세요.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: QA & STANDARDS */}
          {activeTab === "QA_STANDARDS" && (
            <div className="space-y-5">
              {/* Quality & Safety Checkpoints */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-emerald-400 mb-1 flex items-center gap-1 uppercase font-mono">
                    <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>품질 검측 및 감리 확인 항목 (줄바꿈 구분)</span>
                  </label>
                  <textarea
                    rows={6}
                    placeholder={"충전재 틈새 없는 밀실 충진 여부 확인\n방화재 시험성적서 및 KEC 인증 일치 확인\n단자 조임 토크 규격 적합성 100% 검측"}
                    value={qualityInput}
                    onChange={(e) => setQualityInput(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-sm focus:outline-none focus:border-emerald-400 text-slate-200 placeholder-slate-500 leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-rose-400 mb-1 flex items-center gap-1 uppercase font-mono">
                    <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
                    <span>핵심 안전 수칙 및 위험성평가 (줄바꿈 구분)</span>
                  </label>
                  <textarea
                    rows={6}
                    placeholder={"밀폐구역 작업 시 환기팬 가동 및 가스 농도 측정\n고소작업 시 안전대 2개소 체결 및 A형 사다리 전도방지대 설치\n특고압 수전설비 작업 전 무전압 확인 및 단락접지기 취부"}
                    value={safetyInput}
                    onChange={(e) => setSafetyInput(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-sm focus:outline-none focus:border-rose-400 text-slate-200 placeholder-slate-500 leading-relaxed"
                  />
                </div>
              </div>

              {/* Defect Prevention */}
              <div>
                <label className="block text-xs font-bold text-amber-300 mb-1 flex items-center gap-1 uppercase font-mono">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                  <span>주요 하자 발생 사례 및 사전 예방 대책 (줄바꿈 구분)</span>
                </label>
                <textarea
                  rows={4}
                  placeholder={"볼트 헐거움으로 인한 열화 발생 방지: 전용 토크렌치 조임 및 풀림방지 페인트 마킹\n이종 금속 접촉 부식 방지: 알루미늄과 구리 접촉부 바이메탈 와셔 적용"}
                  value={defectInput}
                  onChange={(e) => setDefectInput(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-sm focus:outline-none focus:border-amber-400 text-slate-200 placeholder-slate-500 leading-relaxed"
                />
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-700 shrink-0 font-mono">
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-400">
                절차 {steps.length}개 · 치수규격 {detailSpecs.length}개 · 사진 {fieldPhotos.length}장
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-sm border border-slate-700 text-slate-400 font-bold text-xs hover:bg-slate-800 uppercase"
              >
                취소
              </button>
              <button
                id="admin-save-method-btn"
                type="submit"
                className="flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-900 px-5 py-2 rounded-sm font-bold text-xs shadow-md shadow-amber-400/20 active:scale-95 transition-all uppercase"
              >
                <Save className="w-4 h-4" />
                <span>{editingMethod ? "시방서 전체 저장" : "새 시방서 등록"}</span>
              </button>
            </div>
          </div>
        </form>

        {/* Hidden File Input for Multiple Gallery Pick */}
        <input
          type="file"
          ref={galleryMultipleInputRef}
          multiple
          accept="image/*"
          onChange={handleGalleryBatchUpload}
          className="hidden"
        />

        {/* Hidden File Input for Direct Native Mobile Camera */}
        <input
          type="file"
          ref={nativeCameraInputRef}
          accept="image/*"
          capture="environment"
          onChange={handleNativeCameraUpload}
          className="hidden"
        />

        {/* Hidden File Input for Single Photo Replacement */}
        <input
          type="file"
          ref={singleReplaceInputRef}
          accept="image/*"
          onChange={handleSingleReplaceFromGallery}
          className="hidden"
        />

        {/* Live Camera Viewfinder Modal */}
        <CameraCaptureModal
          isOpen={isCameraModalOpen}
          onClose={() => {
            setIsCameraModalOpen(false);
            setTargetPhotoIndexForCamera(null);
          }}
          onCapture={handleCameraCaptureConfirmed}
          title="현장 실물 사진 실시간 촬영"
        />

        {/* High-Resolution Photo Lightbox Preview Modal */}
        {lightboxImageUrl && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-md"
            onClick={() => setLightboxImageUrl(null)}
          >
            <div
              className="relative max-w-4xl max-h-[90vh] bg-slate-900 rounded-sm border border-slate-700 overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-300">
                <span>현장 실물 사진 원본 뷰어</span>
                <button
                  type="button"
                  onClick={() => setLightboxImageUrl(null)}
                  className="p-1 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="max-h-[80vh] overflow-auto flex items-center justify-center bg-black p-2">
                <img
                  src={lightboxImageUrl}
                  alt="Enlarged Visual"
                  className="max-w-full max-h-[75vh] object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
