import { ConstructionMethod, ConstructionPhase } from "../../types";

export const PHASE_03_METHODS: ConstructionMethod[] = [
  {
    id: "METH-016",
    wbsCode: "016",
    phase: ConstructionPhase.PHASE_03_BASEMENT_STRUCTURE,
    title: "지하주차장 옹벽 매입 배관 및 점검 콘센트/센서 박스 수평 고정",
    category: "지하 골조 배관",
    summary:
      "지하주차장 RC 옹벽 거푸집 설치 시 청소/점검용 방우형 콘센트, 차량 감지 센서, CCTV 배관 및 4각 철재 아웃렛 박스를 도면 높이에 맞춰 철근에 견고히 고정하고 시멘트 페이스트 유입을 방지하는 매입 배관 공정.",
    steps: [
      {
        stepNumber: 1,
        name: "지하 옹벽 먹매김 및 박스 위치 타공 마킹",
        description: "마감 바닥선(FL) 기준 콘센트 높이(FL +300mm 또는 +1200mm) 및 스위치 높이(FL +1200mm)를 옹벽 철근에 마킹.",
        caution: "주차 구획선 및 기둥 모서리 코너 가드 간섭 여부 확인.",
      },
      {
        stepNumber: 2,
        name: "4각 철재 박스(도금) 결속 및 스페이서 장착",
        description: "용융아연도금 아웃렛 박스를 결속선으로 주철근에 3개소 이상 단단히 결속하고 박스 깊이 조절용 스페이서 체결.",
        caution: "거푸집 면과 박스 전면이 밀착되도록 수평 레벨기로 수직/수평 정렬.",
      },
      {
        stepNumber: 3,
        name: "CD/나선관 배관 체결 및 폼 테이핑 밀봉",
        description: "박스 콘넥터(로크너트/부싱)를 완전 체결하고 박스 내부로 시멘트 물이 들어가지 않도록 고밀도 우레탄 폼과 마스킹 테이프로 전면 밀봉.",
        caution: "배관 곡률반경(관경의 6배 이상) 유지 및 옹벽 철근 피복 두께 확보.",
      },
    ],
    materials: ["4각 아웃렛 박스(아연도금)", "난연 CD관(CD-P 16C/22C)", "박스 콘넥터", "보호 폼 테이프"],
    tools: ["수평기(자석형)", "철근 결속 핸들(하카)", "배관 가위"],
    kecStandards: "KEC 232.11 합성수지관공사, KCS 31 60 10",
    safetyPoints: [
      "옹벽 철근 틈새 작업 시 협착 및 찰과상 방지 가죽 장갑 착용",
      "고소 배관 작업 시 안전 발판 및 A형 사다리 전도 방지 조치",
    ],
    qualityInspection: [
      "박스 설치 높이 오차(±5mm 이내)",
      "박스 전면 거푸집 밀착도 및 수평 상태",
      "콘크리트 타설 전 테이핑 밀봉 완전성",
    ],
    defectPrevention: ["시멘트 페이스트 유입으로 인한 박스 막힘(폐관) 및 타설 후 할석 손상 방지"],
    updatedAt: "2026-08-22",
  },
  {
    id: "METH-017",
    wbsCode: "017",
    phase: ConstructionPhase.PHASE_03_BASEMENT_STRUCTURE,
    title: "지하 외벽 관통 케이블 인입용 방수 지수판(Water Stop) 슬리브 설치",
    category: "지하 골조 배관",
    summary:
      "한전 특고압 인입, 통신 인입, 가로등/단지 외곽 선로가 지하 외벽을 관통하는 부위에 지하수 유입 및 누수를 원천 차단하기 위해 중앙에 지수판(Puddle Flange/Water Stop)이 용접된 강관 슬리브를 옹벽 중앙에 매설 고정하는 방수 배관 공정.",
    steps: [
      {
        stepNumber: 1,
        name: "외벽 관통 슬리브 위치 및 경사각 설정",
        description: "토목 지중 인입 맨홀 레벨과 연계하여 외벽 옹벽에 슬리브 설치 위치를 확정하고 외부로 1/100 하향 배수 구배 부여.",
        caution: "옹벽 주철근을 절단하지 않도록 철근 배근 간격 조정 협의.",
      },
      {
        stepNumber: 2,
        name: "지수판 부착 후강강관 슬리브 옹벽 중앙 고정",
        description: "중앙에 100mm 폭의 지수링(Ring)이 전주 용접된 강관 슬리브(100A~200A)를 옹벽 배근 중앙에 용접/철물로 단단히 지지.",
        caution: "타설 압력에 슬리브가 기울어지거나 밀리지 않도록 사방 버팀 철근 용접 고정.",
      },
      {
        stepNumber: 3,
        name: "단말 목재 플러그 및 방수 캡 밀봉 마감",
        description: "슬리브 양단에 콘크리트 유입 방지용 전용 플러그 캡을 씌우고 방수 테이핑 처리.",
        caution: "골조 탈형 후 사후 다심 케이블 방수 씰링 모듈(Roxtec/CSD) 설치 공간 확보.",
      },
    ],
    materials: ["지수판 일체형 강관 슬리브(KSD 3507)", "방수 캡 플러그", "지지용 보강 철근"],
    tools: ["전기 아크용접기", "수평기", "강철 줄자"],
    kecStandards: "KCS 31 60 05 전기설비 배관공사, 건축공사 표준시방서 지하방수",
    safetyPoints: [
      "용접 작업 시 방화포 설치, 소화기 2기 비치 및 화재감시자 배치",
      "거푸집 내부 밀폐구간 용접 흄 환기 팬 가동",
    ],
    qualityInspection: [
      "지수판 전주 용접부 핀홀 및 슬래그 유무(누수 경로 차단)",
      "슬리브 하향 구배(외부 방향 1% 이상 경사) 확보",
      "슬리브 돌출 길이(옹벽 거푸집 면과 일치 또는 50mm 돌출)",
    ],
    defectPrevention: ["지하수 누수로 인한 전기실/수변전실 침수 및 전력 케이블 절연 파괴 원천 방지"],
    updatedAt: "2026-08-22",
  },
  {
    id: "METH-018",
    wbsCode: "018",
    phase: ConstructionPhase.PHASE_03_BASEMENT_STRUCTURE,
    title: "공용 계단실/복도 골조 상시등·센서등·피난유도등 박스 옹벽 고정",
    category: "공용부 골조",
    summary:
      "아파트 동 주출입구, 계단실 참(Landing), 각 층 엘리베이터 홀 및 공용 복도 벽체 거푸집에 상시등, 동작감지 센서등, 소방법정 피난구/통로유도등 매입 박스를 수직·수평 정렬하여 매설하는 공정.",
    steps: [
      {
        stepNumber: 1,
        name: "소방화재안전기준(NFPC) 높이 준수 먹매김",
        description: "통로유도등(바닥면 1.0m 이하), 피난구유도등(출입문 상부 1.5m 이상) 등 법정 설치 높이 마킹.",
        caution: "계단 챌판(Riser) 및 디딤판 마감선(몰탈+석재 50mm) 높이 가산 계산.",
      },
      {
        stepNumber: 2,
        name: "철재 아웃렛 박스 거푸집 면 밀착 고정",
        description: "콘크리트 못(타카) 또는 철근 결속선을 활용하여 거푸집에 박스를 흔들림 없이 고정.",
        caution: "노출 콘크리트 면의 경우 박스 전면 돌출로 인한 마감 불량 주의.",
      },
      {
        stepNumber: 3,
        name: "전원 배관 및 소방 신호 배관 분리 입선 관로 매설",
        description: "상시 전원용 배관(난연 CD관)과 소방 유도등용 내화배관 관로를 분리 배관하고 상호 100mm 이격.",
        caution: "계단실 층간 관통부 꺾임각 완만하게 시공.",
      },
    ],
    materials: ["4각/8각 철재 박스", "난연 CD관(16C/22C)", "유도등 전용 커버", "콘크리트 못"],
    tools: ["가스 타카건", "레이저 레벨기", "결속 하카"],
    kecStandards: "NFPC 303 유도등 화재안전기준, KEC 232",
    safetyPoints: [
      "계단실 개구부 추락 방지용 안전난간대 설치 상태에서 작업",
      "타카건 사용 시 튕김 사고 방지용 보안경 착용",
    ],
    qualityInspection: [
      "피난유도등 법정 설치 높이(상부 1.5m 이상 / 하부 1.0m 이하) 일치성",
      "박스 매립 깊이(탈형 후 표면 노출 없이 마감선과 일치)",
      "소방 전원 직결 배선용 관로 식별(적색 마킹)",
    ],
    defectPrevention: ["계단실 계단 디딤판 마감 후 유도등 높이 미달로 인한 소방 완공검사 불합격 방지"],
    updatedAt: "2026-08-22",
  },
  {
    id: "METH-019",
    wbsCode: "019",
    phase: ConstructionPhase.PHASE_03_BASEMENT_STRUCTURE,
    title: "승강기 홀 호출 버튼/층 표시기 및 승강로 내부 골조 배관 매설",
    category: "공용부 골조",
    summary:
      "각 층 엘리베이터 승강장 도어 프레임 측면의 홀 호출 버튼(Hall Button), 층 지시기(Indicator), 홀 랜턴 배관 및 승강로(Hoistway) 내부 조명/피트 점검용 박스를 승강기 제조사 Shop 도면과 일치시켜 매설하는 공정.",
    steps: [
      {
        stepNumber: 1,
        name: "승강기 삼방틀(Jamb) 및 버튼 박스 중심선 먹매김",
        description: "승강기 업체 승인도면에 명시된 도어 중심선 기준 버튼 박스 설치 높이(버튼 중심 바닥 마감선 +1,000mm) 마킹.",
        caution: "장애인 편의증진법(0.8m~1.2m) 준수 및 승강기 도어 프레임과 간섭 0mm 유지.",
      },
      {
        stepNumber: 2,
        name: "홀 버튼 박스 전용 브래킷 거치 및 배관 연결",
        description: "승강기 전용 규격 박스를 옹벽 철근에 용접 또는 볼팅 지지하고 최상층 기계실/제어반까지 수직 CD관 배관.",
        caution: "승강로 내부로 배관이 돌출되어 카(Car) 승강 시 간섭되지 않도록 옹벽 내 매입.",
      },
      {
        stepNumber: 3,
        name: "승강로 피트(Pit) 비상정지 스위치 및 방우 콘센트 배관",
        description: "최하층 피트 바닥 상부 500mm 위치에 비상정지 스위치 박스 및 작업등용 방우 콘센트 박스 매설.",
        caution: "피트 집수정 및 방수층 관통 시 무수축 몰탈 사춤 철저.",
      },
    ],
    materials: ["승강기 전용 박스", "난연 CD관(22C/28C)", "박스 브래킷", "철근 고정용 U볼트"],
    tools: ["레이저 수평레벨기", "전동 드라이버", "용접기"],
    kecStandards: "승강기 안전운행 및 관리에 관한 운영고시, KCS 31 60 10",
    safetyPoints: [
      "승강로 개구부 추락 위험 방지 안전망 및 출입 통제 펜스 설치",
      "승강로 내부 작업 시 안전그네형 안전대 착용 및 구명줄 체결",
    ],
    qualityInspection: [
      "엘리베이터 홀 버튼 박스 중심 높이(FL +1000mm 정밀도 ±3mm)",
      "승강기 잼(Jamb) 매립 깊이 여유치(20mm 확보)",
      "승강로 내부 배관 돌출 여부(돌출 없음 확인)",
    ],
    defectPrevention: ["승강기 삼방틀 설치 후 버튼 박스 위치 불일치로 인한 대리석 마감재 재타공 하자 예방"],
    updatedAt: "2026-08-22",
  },
];
