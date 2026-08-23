export enum ConstructionPhase {
  // 12단계 마이크로 WBS 표준 분류
  PHASE_01_PREPARATION = "PHASE_01_PREPARATION", // 1단계: 착공 준비 및 가설 공사 (001~008)
  PHASE_02_GROUNDING = "PHASE_02_GROUNDING", // 2단계: 토목 및 기초 접지 공사 (009~015)
  PHASE_03_BASEMENT_STRUCTURE = "PHASE_03_BASEMENT_STRUCTURE", // 3단계: 지하 골조 및 공용부 골조 배관 (016~019)
  PHASE_04_UNIT_STRUCTURE = "PHASE_04_UNIT_STRUCTURE", // 4단계: 단위세대 골조 옹벽 및 슬래브 배관 (020~030)
  PHASE_05_RISER_ROOF = "PHASE_05_RISER_ROOF", // 5단계: 수직 피트 및 옥탑 골조 공사 (031~034)
  PHASE_06_NON_STRUCTURAL = "PHASE_06_NON_STRUCTURAL", // 6단계: 비구조벽(조적/경량) 및 커뮤니티 배관 (035~043)
  PHASE_07_TRAY_RACEWAY = "PHASE_07_TRAY_RACEWAY", // 7단계: 공용부 트레이·레이스웨이 및 노출 배관 (044~057)
  PHASE_08_OUTDOOR_CIVIL = "PHASE_08_OUTDOOR_CIVIL", // 8단계: 부대토목 옥외 지중 관로 공사 (058~063)
  PHASE_09_WIRING_PULLING = "PHASE_09_WIRING_PULLING", // 9단계: 배관 통선 및 세대/공용부 입선 (064~075)
  PHASE_09_WIRING = "PHASE_09_WIRING_PULLING",
  PHASE_10_SUBSTATION = "PHASE_10_SUBSTATION", // 10단계: 수변전실 및 주요 전력 장비 거치 (076~082)
  PHASE_11_FIXTURE_FINISH = "PHASE_11_FIXTURE_FINISH", // 11단계: 세대/공용부 기구 취부 및 마감 (083~094)
  PHASE_11_FINISHING = "PHASE_11_FIXTURE_FINISH",
  PHASE_12_TEST_COMMISSIONING = "PHASE_12_TEST_COMMISSIONING", // 12단계: 시험·검사, 본수전 및 준공 인계 (095~100)
  PHASE_12_COMMISSIONING = "PHASE_12_TEST_COMMISSIONING",

  // 하위 호환성 유지용 Alias
  INITIATION = "PHASE_01_PREPARATION",
  STRUCTURE_CONDUIT = "PHASE_04_UNIT_STRUCTURE",
  SUBSTATION_EQUIPMENT = "PHASE_10_SUBSTATION",
  FINISH_FIXTURE = "PHASE_11_FIXTURE_FINISH",
  TESTING_COMMISSIONING = "PHASE_12_TEST_COMMISSIONING",
  COMPLETION_HANDOVER = "PHASE_12_TEST_COMMISSIONING",
}

export const PHASE_CONFIG: Record<
  ConstructionPhase,
  { label: string; shortName: string; stepNumber: number; color: string; badgeBg: string; description: string; wbsRange: string }
> = {
  [ConstructionPhase.PHASE_01_PREPARATION]: {
    label: "1단계 : 착공 준비 및 가설 공사",
    shortName: "1.착공/가설",
    stepNumber: 1,
    color: "text-amber-500 dark:text-amber-400",
    badgeBg: "bg-amber-400/15 text-amber-800 dark:text-amber-300 border-amber-400/40",
    description: "설계도서 검토, Shop 도면, 한전 임시수전, 가설 변압기/배전반, 양중장비 동력 및 가설등 (001~008)",
    wbsRange: "001~008",
  },
  [ConstructionPhase.PHASE_02_GROUNDING]: {
    label: "2단계 : 토목 및 기초 접지 공사",
    shortName: "2.토목/기초접지",
    stepNumber: 2,
    color: "text-orange-500 dark:text-orange-400",
    badgeBg: "bg-orange-400/15 text-orange-800 dark:text-orange-300 border-orange-400/40",
    description: "터파기 바닥 메쉬 접지극, 발열용접(Cadwelding), 대지저항률 측정, 주철근 본딩, MEB 인출 (009~015)",
    wbsRange: "009~015",
  },
  [ConstructionPhase.PHASE_03_BASEMENT_STRUCTURE]: {
    label: "3단계 : 지하 골조 및 공용부 골조 배관",
    shortName: "3.지하/공용골조",
    stepNumber: 3,
    color: "text-blue-500 dark:text-blue-400",
    badgeBg: "bg-blue-400/15 text-blue-800 dark:text-blue-300 border-blue-400/40",
    description: "지하주차장 옹벽 매입, 외벽 방수 지수판 슬리브, 계단실/복도 골조박스, 승강로 배관 (016~019)",
    wbsRange: "016~019",
  },
  [ConstructionPhase.PHASE_04_UNIT_STRUCTURE]: {
    label: "4단계 : 단위세대 골조 옹벽 및 슬래브 배관",
    shortName: "4.세대골조/슬래브",
    stepNumber: 4,
    color: "text-cyan-500 dark:text-cyan-400",
    badgeBg: "bg-cyan-400/15 text-cyan-800 dark:text-cyan-300 border-cyan-400/40",
    description: "세대분전반/통신함 거치, 벽체 스위치/콘센트, 아일랜드/인덕션, 에어컨, 슬래브 3중겹침 방지 (020~030)",
    wbsRange: "020~030",
  },
  [ConstructionPhase.PHASE_05_RISER_ROOF]: {
    label: "5단계 : 수직 피트 및 옥탑 골조 공사",
    shortName: "5.피트/옥탑골조",
    stepNumber: 5,
    color: "text-indigo-500 dark:text-indigo-400",
    badgeBg: "bg-indigo-400/15 text-indigo-800 dark:text-indigo-300 border-indigo-400/40",
    description: "EPS/TPS 층간 슬리브 매설, 옥탑 기계실/권상기실, 옥상 드레인 열선 배관, 피뢰침 기초 패드 (031~034)",
    wbsRange: "031~034",
  },
  [ConstructionPhase.PHASE_06_NON_STRUCTURAL]: {
    label: "6단계 : 비구조벽(조적/경량) 및 커뮤니티 배관",
    shortName: "6.조적/경량벽체",
    stepNumber: 6,
    color: "text-teal-500 dark:text-teal-400",
    badgeBg: "bg-teal-400/15 text-teal-800 dark:text-teal-300 border-teal-400/40",
    description: "조적벽 컷팅/홈파기/사춤, 경량벽 C-스터드 부싱/가요전선관/네일플레이트, 커뮤니티 배관 (035~043)",
    wbsRange: "035~043",
  },
  [ConstructionPhase.PHASE_07_TRAY_RACEWAY]: {
    label: "7단계 : 공용부 트레이·레이스웨이 및 노출 배관",
    shortName: "7.트레이/레이스웨이",
    stepNumber: 7,
    color: "text-sky-500 dark:text-sky-400",
    badgeBg: "bg-sky-400/15 text-sky-800 dark:text-sky-300 border-sky-400/40",
    description: "주차장 앵커/내진행거, 케이블트레이/본딩점퍼, 레이스웨이, 전기차충전기 배관, 부스덕트 (044~057)",
    wbsRange: "044~057",
  },
  [ConstructionPhase.PHASE_08_OUTDOOR_CIVIL]: {
    label: "8단계 : 부대토목 옥외 지중 관로 공사",
    shortName: "8.옥외지중관로",
    stepNumber: 8,
    color: "text-emerald-500 dark:text-emerald-400",
    badgeBg: "bg-emerald-400/15 text-emerald-800 dark:text-emerald-300 border-emerald-400/40",
    description: "한전 특고압 인입 터파기/모래포설, ELP 배관, 프리캐스트 맨홀, 위험테이프, 주차관제 배관 (058~063)",
    wbsRange: "058~063",
  },
  [ConstructionPhase.PHASE_09_WIRING_PULLING]: {
    label: "9단계 : 배관 통선 및 세대/공용부 입선",
    shortName: "9.통선/간선입선",
    stepNumber: 9,
    color: "text-violet-500 dark:text-violet-400",
    badgeBg: "bg-violet-400/15 text-violet-800 dark:text-violet-300 border-violet-400/40",
    description: "압축공기 청소, 통선시험, 세대 전등/전열/인덕션 HFIX, 간선 TFR-CV 포설, 동력선/MCC 결선 (064~075)",
    wbsRange: "064~075",
  },
  [ConstructionPhase.PHASE_10_SUBSTATION]: {
    label: "10단계 : 수변전실 및 주요 전력 장비 거치",
    shortName: "10.수변전/발전기",
    stepNumber: 10,
    color: "text-purple-500 dark:text-purple-400",
    badgeBg: "bg-purple-400/15 text-purple-800 dark:text-purple-300 border-purple-400/40",
    description: "수배전반 기초/내진스토퍼, 몰드변압기 방진, 부스바 토크씰, 22.9kV 단말처리, 비상발전기 (076~082)",
    wbsRange: "076~082",
  },
  [ConstructionPhase.PHASE_11_FIXTURE_FINISH]: {
    label: "11단계 : 세대/공용부 기구 취부 및 마감",
    shortName: "11.기구취부/마감",
    stepNumber: 11,
    color: "text-pink-500 dark:text-pink-400",
    badgeBg: "bg-pink-400/15 text-pink-800 dark:text-pink-300 border-pink-400/40",
    description: "세대분전반 결선, 스위치/콘센트, LED조명, 월패드, 소화장치, 공용등기구, 방화구획 밀폐 (083~094)",
    wbsRange: "083~094",
  },
  [ConstructionPhase.PHASE_12_TEST_COMMISSIONING]: {
    label: "12단계 : 시험·검사, 본수전 및 준공 인계",
    shortName: "12.시험/본수전/준공",
    stepNumber: 12,
    color: "text-rose-500 dark:text-rose-400",
    badgeBg: "bg-rose-400/15 text-rose-800 dark:text-rose-300 border-rose-400/40",
    description: "절연저항 전수측정, 계전기 시험, KESCO 사용전검사 합격, 한전 본수전 가압, 정전시험, 인수인계 (095~100)",
    wbsRange: "095~100",
  },
};

export interface ConstructionStep {
  stepNumber: number;
  name: string;
  description: string;
  caution: string;
}

export interface ConstructionDetailSpec {
  category: string; // e.g. "배관 지지간격", "이격거리", "접지 기준", "단말 조임 토크", "절연저항 기준"
  parameter: string; // e.g. "금속관(새들/행거)", "특고압 모선 절연거리", "전등·전열 회로", "M12 단자 볼트"
  standardValue: string; // e.g. "2.0m 이하", "22.9kV 상간 200mm 이상", "1.0 MΩ 이상 (DC 500V)", "35 ~ 45 N·m"
  kecOrStandard: string; // e.g. "KEC 232.13", "KEC 321.1", "KEC 610.1", "KCS 31 60 10"
  notes?: string; // e.g. "박스/커플링 양단 0.3m 이내 추가 고정 필수"
}

export interface FieldPhotoVisual {
  id: string;
  title: string;
  caption: string;
  tag: string; // e.g. "배관 포설 전경", "압착 단말 마감", "접지극 매설", "수배전반 안착", "열화상 진단"
  url: string; // Image URL
  inspectionPoint: string; // 핵심 감리 검측 포인트
}

export interface DiagramSchematic {
  title: string;
  type: "CROSS_SECTION" | "WIRING_DIAGRAM" | "LAYOUT_SPACING" | "INSTALLATION_FLOW";
  description: string;
  keyDimensions: { label: string; value: string; color?: string }[];
  elements: { name: string; spec: string; desc: string }[];
}

export interface ConstructionMethod {
  id: string;
  wbsCode?: string; // e.g. "001", "002", ... "100"
  phase: ConstructionPhase;
  title: string;
  category: string;
  summary: string;
  steps: ConstructionStep[];
  materials: string[];
  tools: string[];
  kecStandards: string;
  safetyPoints: string[];
  qualityInspection: string[];
  defectPrevention: string[];
  detailSpecs?: ConstructionDetailSpec[];
  fieldPhotos?: FieldPhotoVisual[];
  schematic?: DiagramSchematic;
  iconName?: string;
  isCustom?: boolean;
  version?: string;
  updatedAt: string;
}

export interface ProjectSite {
  id: string;
  name: string;
  code: string;
  client: string; // 발주처
  contractor: string; // 전기시공사
  siteManager: string; // 현장대리인
  supervisor: string; // 감리원
  location: string;
  startDate: string; // 착공일
  targetDate: string; // 준공예정일
  contractPower: string; // 수전용량 (예: 22.9kV 1,500kVA)
  currentPhase: ConstructionPhase;
  progressPercent: number; // 0 ~ 100
  status: "IN_PROGRESS" | "INSPECTION_PENDING" | "COMPLETED";
  notes?: string;
  createdAt: string;
}

export interface LogPhoto {
  id: string;
  url: string;
  caption: string;
  phaseStep?: string;
  timestamp: string;
}

export interface InspectionCheckItem {
  id: string;
  item: string;
  criteria: string;
  result: "PASS" | "FAIL" | "HOLD" | "NA" | "N/A";
  note?: string;
}

export interface PhaseChecklist {
  phase: ConstructionPhase;
  title: string;
  items: InspectionCheckItem[];
}

export type NoteCategory =
  | "FIELD_DISCREPANCY" // 도면·현장 불일치
  | "METHOD_CHANGE" // 시공방법 변경 / 대체공법
  | "SUPERVISOR_AGREEMENT" // 감리·발주처 협의
  | "KEC_CAUTION" // KEC·법령 주의 / 기술검토
  | "SPECIAL_MATERIAL" // 특이자재·전용공구
  | "FIELD_MEMO"; // 일반 현장 특이사항

export type NoteStatus = "RESOLVED" | "IN_PROGRESS" | "PENDING_REVIEW";

export const NOTE_CATEGORY_CONFIG: Record<
  NoteCategory,
  { label: string; short: string; color: string; bg: string; border: string; icon: string }
> = {
  FIELD_DISCREPANCY: {
    label: "도면·현장 불일치",
    short: "도면불일치",
    color: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300",
    border: "border-rose-300 dark:border-rose-800",
    icon: "AlertTriangle",
  },
  METHOD_CHANGE: {
    label: "시공방법 변경 / 대체공법",
    short: "공법변경",
    color: "text-purple-600 dark:text-purple-400",
    bg: "bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300",
    border: "border-purple-300 dark:border-purple-800",
    icon: "Repeat",
  },
  SUPERVISOR_AGREEMENT: {
    label: "감리·발주처 협의사항",
    short: "감리협의",
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300",
    border: "border-blue-300 dark:border-blue-800",
    icon: "Handshake",
  },
  KEC_CAUTION: {
    label: "KEC·기술기준 특이검토",
    short: "KEC검토",
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300",
    border: "border-amber-300 dark:border-amber-800",
    icon: "ShieldAlert",
  },
  SPECIAL_MATERIAL: {
    label: "특이자재·전용공구 적용",
    short: "자재/공구",
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300",
    border: "border-emerald-300 dark:border-emerald-800",
    icon: "Wrench",
  },
  FIELD_MEMO: {
    label: "일반 현장 특이사항",
    short: "현장메모",
    color: "text-slate-600 dark:text-slate-400",
    bg: "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300",
    border: "border-slate-300 dark:border-slate-700",
    icon: "FileText",
  },
};

export interface ConstructionLog {
  id: string;
  projectId: string;
  date: string;
  weather?: string; // 맑음, 흐림, 비, 눈 등 (선택)
  phase: ConstructionPhase;
  methodId?: string; // 참조 시공방법 ID
  methodTitle?: string;
  workLocation: string; // 작업 발생 위치 (예: 지하 2층 전기실 옹벽 관통부)
  
  // 시공노트 전용 확장 필드
  title?: string; // 시공노트 제목
  category?: NoteCategory; // 특이사항 분류 유형
  issueDescription?: string; // 현장 상황 및 문제점 (표준 시공방법과 다른 사유)
  actionTaken?: string; // 실제 조치 및 대체 시공 방법
  followUpNote?: string; // 후속 공정 연계 및 주의사항
  status?: NoteStatus; // 조치 상태: RESOLVED(조치완료), IN_PROGRESS(조치중), PENDING_REVIEW(협의대기)

  // 기존 호환성 필드
  workDescription?: string; // 당일 작업 내용
  workForce?: {
    electrician: number; // 전공
    technician: number; // 기술공/조공
    supervisor: number; // 안전/관리자
    total: number;
  };
  materialsUsed?: Array<{
    name: string;
    spec: string;
    quantity: string;
  }>;
  photos: LogPhoto[];
  inspections?: InspectionCheckItem[];
  safetyToolboxMeeting?: string; // TBM 안전점검 내용
  specialNotes?: string; // 특이사항/지시사항
  signedBy: string; // 작성자
  approvedBy?: string; // 감리/소장 서명
  aiAnalysis?: {
    safetyRiskLevel: "낮음" | "보통" | "주의" | "위험";
    qualityScore: number;
    summary: string;
    riskFactors: string[];
    complianceCheck: string;
    nextStepRecommendations: string[];
  };
  createdAt: string;
}

export type ConstructionNote = ConstructionLog;

export interface InspectionTemplateItem {
  id: string;
  phase: ConstructionPhase;
  category: string;
  title: string;
  criteria: string;
  kecRef?: string;
}

export interface LegalStandardItem {
  id: string;
  code: string; // "01" ~ "17"
  title: string; // e.g. "전기공사업법"
  category: "법률/시행령" | "기술기준/고시" | "국가표준/지침" | "안전/인허가";
  authority: string; // e.g. "산업통상자원부", "국토교통부", "소방청", "고용노동부"
  latestVersionInfo: string; // e.g. "법률 제19920호 (2024.1.9 일부개정, 2024.7.10 시행)"
  keyPurposes: string[]; // 핵심 목적
  coreRegulations: Array<{
    article: string; // e.g. "제17조 (시공관리 등)"
    title: string; // e.g. "전기공사기술자 배치 의무"
    content: string; // 핵심 규정 내용
    fieldApplication: string; // 현장 실무 적용 지침
    violationPenalty?: string; // 위반 시 처벌/행정처분
  }>;
  relatedPhases: ConstructionPhase[]; // 연계 공정 단계
  relatedWbsRange: string; // e.g. "001~008, 095~100"
  tags: string[];
}

export type ActiveTab = "projects" | "methods" | "logs" | "ai" | "admin" | "standards";
