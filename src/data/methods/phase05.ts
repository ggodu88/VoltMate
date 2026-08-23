import { ConstructionMethod, ConstructionPhase } from "../../types";

export const PHASE_05_METHODS: ConstructionMethod[] = [
  {
    id: "METH-031",
    wbsCode: "031",
    phase: ConstructionPhase.PHASE_05_RISER_ROOF,
    title: "수직 피트(EPS/TPS) 바닥 층간 관통 강관/PVC 슬리브 매설 및 캡 마감",
    category: "수직 피트 골조",
    summary:
      "각 동 전기피트(EPS: Electrical Pipe Shaft) 및 통신피트(TPS) 바닥 슬래브 타설 시 케이블 트레이, 부스덕트, 간선 케이블 관통용 강관/PVC 슬리브를 정밀 매설하고, 타설 시 시멘트 유입 방지 및 개구부 추락 방지용 밀폐 캡을 마감하는 공정.",
    steps: [
      {
        stepNumber: 1,
        name: "피트 층간 개구부 및 슬리브 좌표 먹매김",
        description: "수직도(Plumbness) 유지를 위해 최하층에서 최상층까지 레이저 수직기로 수직 기준선을 띄우고 슬리브 중심 마킹.",
        caution: "층간 슬리브 중심선이 틀어질 경우 케이블 트레이 수직 정렬 불가.",
      },
      {
        stepNumber: 2,
        name: "슬리브(100A~150A) 고정 및 턱(50mm) 올림 시공",
        description: "바닥 슬래브 타설면보다 50mm 이상 위로 돌출되도록 슬리브를 고정하여 피트 내부 청소 시 물이 하층으로 흘러내리지 않도록 방수턱 형성.",
        caution: "슬리브 주위 철근 보강 배근(코너 보강근) 철저.",
      },
      {
        stepNumber: 3,
        name: "보호 엔드 캡 체결 및 방화 임시 덮개 설치",
        description: "슬리브 상·하부에 플라스틱 보호 캡을 장착하고 개구부 상부에 합판 안전덮개 고정.",
        caution: "개구부 추락 방지용 안전 경고 표지 부착.",
      },
    ],
    materials: ["강관/PVC 슬리브(100A/125A/150A)", "플라스틱 보호 엔드 캡", "합판 안전덮개", "고정 철물"],
    tools: ["레이저 수직레벨기", "전동 드릴", "줄자"],
    kecStandards: "KCS 31 60 05 전기설비 배관공사, 건축물의 피난·방화구조 등의 기준에 관한 규칙",
    safetyPoints: [
      "피트 개구부 근로자 추락 방지 안전난간 및 덮개 100% 설치",
      "상하 동시 작업 금지 및 낙하물 방지망 점검",
    ],
    qualityInspection: [
      "층간 슬리브 수직 오차(층당 3mm 이내, 전 층 누적 10mm 이내)",
      "슬래브 바닥면 대비 슬리브 돌출 높이(50mm 이상)",
      "슬리브 엔드 캡 밀봉 상태",
    ],
    defectPrevention: ["슬리브 위치 편차로 인한 케이블 트레이 강제 절곡 및 외관 훼손 방지"],
    updatedAt: "2026-08-22",
  },
  {
    id: "METH-032",
    wbsCode: "032",
    phase: ConstructionPhase.PHASE_05_RISER_ROOF,
    title: "옥탑 기계실/권상기실/물탱크실/팬룸 전원 배관 매입",
    category: "옥탑 골조",
    summary:
      "아파트 옥탑 층에 위치한 엘리베이터 권상기실(Traction Machine Room), 고가수조 물탱크실, 급배기 팬룸(Fan Room) 및 계단실 제연 댐퍼용 동력 전원 배관과 제어 신호 배관을 골조 옹벽 및 바닥에 매설하는 공정.",
    steps: [
      {
        stepNumber: 1,
        name: "승강기 권상기 기초 패드 및 제어반 위치 먹매김",
        description: "승강기 설치 도면에 따라 권상기 제어반(CP), 메인 전원 개폐기(MCCB), 비상 조명 스위치 위치 마킹.",
        caution: "권상기 로프 구멍(Rope Hole) 및 빔 안착부와의 이격거리 확보.",
      },
      {
        stepNumber: 2,
        name: "동력 배관(후강금속관/난연CD) 및 제어 배관 매설",
        description: "메인 동력 전원용 배관(36C 이상)과 화재 신호 릴레이 인터록 배관을 옹벽 및 바닥 철근 내부에 고정.",
        caution: "기계실 바닥 방수층 손상 방지를 위해 슬래브 매입 배관 철저.",
      },
      {
        stepNumber: 3,
        name: "환기팬 및 온도센서 박스 매설",
        description: "여름철 기계실 온도 상승(40℃ 초과 방지)을 제어하는 강제 환기팬 및 감온 센서 박스 설치.",
        caution: "외벽 루버(Louver) 개구부와의 수평 정렬.",
      },
    ],
    materials: ["후강 금속관/난연 CD관(28C/36C)", "4각 철재 박스", "방진 패킹"],
    tools: ["레이저 수평기", "배관 벤더", "결속 하카"],
    kecStandards: "승강기 제조 및 관리에 관한 법률, KEC 232",
    safetyPoints: [
      "옥탑 고소 작업 시 안전난간대 설치 및 추락방지 안전대 착용",
    ],
    qualityInspection: [
      "승강기 제어반 인입 배관 위치 및 관경 적정성",
      "기계실 조명 스위치 출입문 측면 위치 확보(바닥 +1.2m)",
      "물탱크실 전극봉 및 레벨 제어 배관 연결 유무",
    ],
    defectPrevention: ["승강기 제어반 전원 용량 부족 및 진동에 의한 배관 풀림 하자 예방"],
    updatedAt: "2026-08-22",
  },
  {
    id: "METH-033",
    wbsCode: "033",
    phase: ConstructionPhase.PHASE_05_RISER_ROOF,
    title: "옥상 우수 드레인 열선(동파 방지) 배관 및 외기 온도센서 박스 매설",
    category: "옥탑 골조",
    summary:
      "동절기 옥상 루프 드레인(Roof Drain) 결빙 및 폭설로 인한 우수관로 동파/역류를 방지하기 위해 드레인 주변 및 우수 드롭 파이프에 정온전선(히팅케이블) 전원 공급용 방우 배관 및 옥외 감온 센서 박스를 매설하는 공정.",
    steps: [
      {
        stepNumber: 1,
        name: "우수 드레인 주변 전원 인출 박스 위치 마킹",
        description: "옥상 슬래브 우수 드레인 깔때기 주변 500mm 지점에 방우형 풀박스 매설 위치 먹매김.",
        caution: "옥상 우레탄 도막 방수 및 시트 방수 층과의 방수턱 상세 협의.",
      },
      {
        stepNumber: 2,
        name: "열선 전원 배관 및 제어 케이블 배관 매설",
        description: "옥탑 분전반에서 드레인 풀박스까지 CD 22C 배관을 슬래브 콘크리트 내부에 매설.",
        caution: "외기 직사광선 및 빗물 침투를 고려하여 옥상 노출 구간은 방수 후강금속관 적용.",
      },
      {
        stepNumber: 3,
        name: "외기 온습도 센서 박스 외벽 매설",
        description: "일사량이 적은 북측 옥탑 외벽에 결빙 감지용 외기 온도센서 매입 박스 설치.",
        caution: "센서 박스 하부 배수홀(Weep Hole) 가공.",
      },
    ],
    materials: ["SUS304 방우형 풀박스", "난연 CD관(22C)", "방수 가스켓", "온도센서 박스"],
    tools: ["수평기", "드릴 타카", "배관 가위"],
    kecStandards: "KEC 241.14 전열장치(히팅케이블), KCS 31 60 10",
    safetyPoints: [
      "옥상 파라펫(난간) 외측 작업 시 안전대 고정고리 체결 필수",
    ],
    qualityInspection: [
      "드레인 풀박스 방수 등급(IP66 이상)",
      "우수 드레인 중심선과 열선 인출구 간격(300mm 이내)",
      "옥상 방수층 손상 없는 일체형 방수 패킹 시공 여부",
    ],
    defectPrevention: ["드레인 동파로 인한 옥상 담수 침수 및 최상층 세대 천장 누수 사고 원천 차단"],
    updatedAt: "2026-08-22",
  },
  {
    id: "METH-034",
    wbsCode: "034",
    phase: ConstructionPhase.PHASE_05_RISER_ROOF,
    title: "옥상 파라펫 피뢰 도체 지지 앵커 타공 및 피뢰침 기초 패드 시공",
    category: "옥탑 골조",
    summary:
      "낙뢰로부터 건축물을 보호하기 위해 옥탑 파라펫(Parapet) 상부에 수평 피뢰 도체(수뢰부)를 고정할 SUS 지지 앵커를 1m 간격으로 타공·매설하고, 메인 피뢰침(Ese 피뢰침 또는 돌침) 지지용 콘크리트 패드 기초를 축조하는 공정.",
    steps: [
      {
        stepNumber: 1,
        name: "피뢰 보호각 및 회전구체법 수뢰부 레이아웃",
        description: "KS C IEC 62305 기준 보호등급(클래스 II/III)에 따라 옥탑 수뢰도체 메쉬 간격(10m×10m) 및 파라펫 외곽선 마킹.",
        caution: "옥상 태양광 패널(PV) 및 위성안테나 최고 높이를 커버하는 피뢰 보호영역 검증.",
      },
      {
        stepNumber: 2,
        name: "파라펫 SUS 앵커 인서트 매설 및 지지대 고정",
        description: "파라펫 상부 콘크리트에 1.0m 간격으로 스테인리스(SUS304) 지지대 앵커를 매설하고 도체 지지대(Holder) 볼팅.",
        caution: "방수 훼손 방지를 위해 두겁석(두겁 플래싱) 시공 전 에폭시 방수 케미컬 앵커 시공.",
      },
      {
        stepNumber: 3,
        name: "메인 피뢰침 콘크리트 기초 패드 타설 및 앵커볼트 매립",
        description: "옥탑 최고층 바닥에 500mm×500mm×300mm 크기의 무근 콘크리트 패드를 타설하고 M16 스테인리스 앵커볼트 4개 매립.",
        caution: "피뢰침 하부 인하도선 접속용 나동선(70sq 이상) 인출 배관 사전 매립.",
      },
    ],
    materials: ["SUS304 피뢰 도체 지지대", "케미컬 앵커볼트(M12/M16)", "피뢰침 기초 콘크리트", "방수 에폭시 실란트"],
    tools: ["해머드릴(로터리)", "토크렌치", "에어 펌프(홀 청소용)"],
    kecStandards: "KS C IEC 62305 피뢰시스템, KEC 150",
    safetyPoints: [
      "옥탑 최상단 강풍 위험 대비 2인 1조 작업 및 안전모 턱끈 필수",
      "드릴 타공 시 비산 분진 흡입 방지용 방진마스크 및 보안경 착용",
    ],
    qualityInspection: [
      "피뢰도체 지지대 설치 간격(직선부 1.0m 이하, 코너부 0.5m 이하)",
      "케미컬 앵커 홀 내부 분진 에어 청소 및 에폭시 경화 상태",
      "피뢰침 기초 앵커볼트 수직도 및 너트 이중 체결",
    ],
    defectPrevention: ["태풍 및 강풍에 의한 피뢰침 전도 파손 및 앵커 타공부 빗물 누수 하자 방지"],
    updatedAt: "2026-08-22",
  },
];
