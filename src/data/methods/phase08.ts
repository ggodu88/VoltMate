import { ConstructionMethod, ConstructionPhase } from "../../types";

export const PHASE_08_METHODS: ConstructionMethod[] = [
  {
    id: "METH-058",
    wbsCode: "058",
    phase: ConstructionPhase.PHASE_08_OUTDOOR_CIVIL,
    title: "한전 특고압 인입 관로 터파기 굴착 및 바닥 모래 100mm 포설",
    category: "옥외 지중관로",
    summary:
      "한전 전주(책임분계점)에서 단지 내 메인 변전실까지 22.9kV 특고압 케이블(CNC/V-W 또는 TR-CNCE-W)을 지중 매설하기 위해 도로 및 녹지 구간을 규정 깊이(차량 통행로 1.2m 이상, 기타 0.6m 이상)로 굴착하고 완충용 바닥 모래(쿠션재) 100mm를 평탄 포설하는 공정.",
    steps: [
      {
        stepNumber: 1,
        name: "지하시설물 도면 조회 및 굴착선 먹매김",
        description: "도시가스, 상수도, 통신, 우·오수관 매설 현황을 지하매설물종합도(GIS)로 조회하고 시굴(Test Pit) 굴착 실시.",
        caution: "기존 가스관 및 상수도관 훼손 방지를 위해 중장비 직굴착 전 인력 굴착 선행.",
      },
      {
        stepNumber: 2,
        name: "포크레인 터파기 굴착 및 구배(1/200) 형성",
        description: "설계 심도(차도 1.2m 이상)를 유지하며 트렌치를 굴착하고 빗물이 맨홀로 자연 배수되도록 1/200 하향 구배 조성.",
        caution: "사면 붕괴 위험 구간 흙막이 판(가시설) 설치.",
      },
      {
        stepNumber: 3,
        name: "바닥 양질의 고운 모래(100mm) 포설 및 다짐",
        description: "자갈이나 날카로운 암석이 없는 세척사(모래)를 바닥에 100mm 두께로 깔고 평탄 다짐 실시.",
        caution: "암반 노출 시 모래 두께를 150mm로 증대 포설.",
      },
    ],
    materials: ["양질의 세척 모래(쿠션재)", "지하매설물 표시 깃발", "트렌치 안전 펜스"],
    tools: ["백호(포크레인 0.6/0.2)", "레벨기(광파기/오토레벨)", "진동 콤팩터"],
    kecStandards: "KEC 334.1 지중 전선로의 시설, 산업안전보건기준에 관한 규칙 제338조",
    safetyPoints: [
      "굴착 트렌치 주변 안전 펜스 및 야간 경고등 설치",
      "중장비 회전 반경 신호수 배치",
    ],
    qualityInspection: [
      "지중 매설 깊이(차량 통행 구역 노면 기준 1.2m 이상 확보)",
      "바닥 모래 포설 두께(100mm 이상 균일성)",
      "배수 구배(맨홀 방향 0.5% 이상)",
    ],
    defectPrevention: ["날카로운 암석에 의한 파상형 전선관 찢김 및 관로 침하 하자 방지"],
    updatedAt: "2026-08-22",
  },
  {
    id: "METH-059",
    wbsCode: "059",
    phase: ConstructionPhase.PHASE_08_OUTDOOR_CIVIL,
    title: "옥외 파상형 경질비닐관(ELP) 포설 및 곡률 반경 준수",
    category: "옥외 지중관로",
    summary:
      "모래가 포설된 굴착 바닥에 옥외 지중 전용 파상형 경질폴리에틸렌관(ELP 100~150mm)을 다열로 포설하고, 케이블 포설 시 저항을 최소화하도록 전선관 접속 콤비네이션 커플링 체결 및 허용 곡률반경(관 외경의 6배 이상)을 유지하는 공정.",
    steps: [
      {
        stepNumber: 1,
        name: "ELP관 언와인딩 및 트렌치 내 거치",
        description: "드럼에 감긴 ELP 주름관을 회전 롤러를 이용해 비틀림 없이 펼쳐 바닥 모래 위에 안착.",
        caution: "관로 내부에 흙이나 자갈이 들어가지 않도록 관 단말 캡 밀봉 유지.",
      },
      {
        stepNumber: 2,
        name: "다열 배관 전용 스페이서(Comb Spacer) 장착",
        description: "특고압 인입 4공~6공 다열 배관 시 관과 관 사이 간격(50mm 이상)을 유지하는 플라스틱 콤(Comb) 스페이서를 2m 간격으로 장착.",
        caution: "관로 겹침 및 유동 방지.",
      },
      {
        stepNumber: 3,
        name: "방수형 벨마우스 커플링 연결 및 통선 와이어 삽입",
        description: "ELP관 상호 연결부는 고무 가스켓이 내장된 전용 방수 커플링을 결합하고 사후 입선용 PP 로프(8mm)를 사전 관통.",
        caution: "커플링 체결 후 수밀 테스트 및 부틸 방수 테이핑 2중 감기.",
      },
    ],
    materials: ["파상형 경질폴리에틸렌관(ELP 100/125/150A)", "방수형 커플링", "배관 스페이서", "나일론 인입 로프"],
    tools: ["배관 롤러", "커플링 체결 렌치", "관로 통선기"],
    kecStandards: "KEC 334.1, KS C 8455 (파상형 폴리에틸렌 전선관)",
    safetyPoints: [
      "ELP관 코일 탄성에 의한 튕김 부상 주의(개봉 시 2인 1조)",
    ],
    qualityInspection: [
      "ELP관 곡률반경(완만한 R값 유지, 급격한 90도 꺾임 금지)",
      "관 상호 이격거리(50mm 이상)",
      "방수 커플링 체결 기밀성",
    ],
    defectPrevention: ["배관 접속부 지하수 유입으로 인한 관로 침수 및 동절기 결빙 압착 하자 방지"],
    updatedAt: "2026-08-22",
  },
  {
    id: "METH-060",
    wbsCode: "060",
    phase: ConstructionPhase.PHASE_08_OUTDOOR_CIVIL,
    title: "프리캐스트 전기/통신 맨홀 안착, 방수 커넥터 체결 및 사춤",
    category: "옥외 지중관로",
    summary:
      "선로 중간 접속, 케이블 견인 및 분기를 위해 공장 제작된 콘크리트 프리캐스트 맨홀/핸드홀(Handhole)을 크레인으로 터파기 바닥에 수평 안착하고, ELP관 인입부에 방수 덕트 콘넥터 체결 후 무수축 방수 모르타르로 사춤하는 공정.",
    steps: [
      {
        stepNumber: 1,
        name: "맨홀 기초 잡석(200mm) 다짐 및 버림 타설",
        description: "맨홀 굴착 바닥에 쇄석 잡석을 200mm 깔고 콤팩터로 다진 후 버림 콘크리트를 타설하여 수평 기초면 조성.",
        caution: "부등 침하로 인한 맨홀 기울어짐 및 배관 파단 방지.",
      },
      {
        stepNumber: 2,
        name: "프리캐스트 맨홀 양중 및 레벨 안착",
        description: "크레인 4줄걸이 와이어로 콘크리트 맨홀 본체를 양중하여 도면 좌표 및 GL 마감선에 맞춰 안착.",
        caution: "도로 마감 레벨과 맨홀 주철 뚜껑(Lid) 상단면이 일치하도록 높이 조절 링(Neck Ring) 세팅.",
      },
      {
        stepNumber: 3,
        name: "ELP 덕트 슬리브 인입 및 무수축 방수 사춤",
        description: "맨홀 벽체 타공부에 ELP관을 50mm 돌출 인입하고 벨마우스 장착 후 급결 무수축 방수 모르타르로 내·외측 완전 밀실 사춤.",
        caution: "맨홀 바닥 집수정(Sump Pit) 형성 및 쇄석 드레인 구멍 확인.",
      },
    ],
    materials: ["프리캐스트 RC 맨홀(전기/통신용)", "주철 맨홀 뚜껑(잠금형)", "벨마우스(Bellmouth)", "무수축 방수 모르타르"],
    tools: ["카고 크레인(5톤)", "수평 레벨기", "미장 흙손"],
    kecStandards: "KEC 334.1.3 지중함의 시설, KCS 31 60 10",
    safetyPoints: [
      "중량물(2~5톤) 인양 시 인양 하부 출입 절대 금지",
      "맨홀 내부 밀폐공간 작업 시 산소 및 유해가스(H2S, CO) 농도 측정",
    ],
    qualityInspection: [
      "맨홀 상판과 도로 포장면의 평탄성(단차 5mm 이내)",
      "배관 인입부 방수 사춤 수밀성(누수 흔적 없음)",
      "맨홀 내부 사다리(SUS) 및 케이블 받침대(Cable Rack) 취부 상태",
    ],
    defectPrevention: ["맨홀 침하로 인한 도로 꺼짐 및 맨홀 벽체 틈새 토사 유입 관로 막힘 방지"],
    updatedAt: "2026-08-22",
  },
  {
    id: "METH-061",
    wbsCode: "061",
    phase: ConstructionPhase.PHASE_08_OUTDOOR_CIVIL,
    title: "지중 배관 상부 모래 200mm 다짐, 적색 위험 테이프 매설 및 되메움",
    category: "옥외 지중관로",
    summary:
      "배관 포설 완료 후 배관 보호를 위해 상부에 모래를 200mm 두께로 덮어 1차 다짐하고, 추후 타 공사 굴착 시 관로 손상을 방지하기 위해 지표면 하 300~500mm 지점에 '특고압 전선로 위험' 경고 비닐 시트(적색 라인 테이프)를 매설 후 양질토로 층상 되메움하는 공정.",
    steps: [
      {
        stepNumber: 1,
        name: "배관 상부 보호 모래(200mm) 포설 및 인력 다짐",
        description: "포설된 ELP관 위로 모래를 200mm 이상 균일하게 덮고 목재 램머로 배관이 손상되지 않도록 인력 다짐.",
        caution: "중장비(롤러) 직접 다짐 금지(배관 찌그러짐 유발).",
      },
      {
        stepNumber: 2,
        name: "콘크리트 보호판(또는 고강도 플라스틱 보호판) 배열",
        description: "특고압 관로 직상부에 굴착 포크레인 버킷 직타격을 방어하는 두께 50mm 콘크리트 트러프(보호판) 포설.",
        caution: "보호판 상호 간 이음매 틈새 없이 연속 배치.",
      },
      {
        stepNumber: 3,
        name: "적색 위험 경고 테이프 매설 및 층상 되메움",
        description: "GL -300mm 지점에 '위험 22,900V 특고압 지중선로' 문구가 인쇄된 광폭 적색 비닐 테이프를 전 구간 연속 포설하고 300mm 단위로 흙 되메움 및 다짐(다짐도 95% 이상).",
        caution: "되메움 토사에 거대 암석 및 건설 폐기물 혼입 금지.",
      },
    ],
    materials: ["세척 모래", "콘크리트 케이블 보호판", "지중선로 위험 표시 테이프(적색)", "양질 되메움토"],
    tools: ["소형 콤팩터", "백호(포크레인)", "삽 및 램머"],
    kecStandards: "KEC 334.1.2 매설 깊이 및 방호장치, KCS 31 60 10",
    safetyPoints: [
      "되메움 중장비 후진 시 후방 감시 카메라 및 신호수 유도",
    ],
    qualityInspection: [
      "보호 모래 두께(배관 상단 기준 200mm 이상)",
      "위험 표시 테이프 매설 깊이(지표면 하 300~500mm 확인)",
      "되메움 지반 다짐도(들밀도 시험 95% 이상 합격)",
    ],
    defectPrevention: ["사후 조경 굴착 또는 가스관 공사 시 특고압 케이블 단선 대정전 사고 원천 방어"],
    updatedAt: "2026-08-22",
  },
  {
    id: "METH-062",
    wbsCode: "062",
    phase: ConstructionPhase.PHASE_08_OUTDOOR_CIVIL,
    title: "단지 진출입로 주차관제(LPR/차단기) 및 지하 램프 경보등 기초 배관",
    category: "옥외 부대설비",
    summary:
      "아파트 주 출입구 및 부 출입구에 설치되는 차량번호인식기(LPR: License Plate Recognition), 주차 차단기, 차량 검지 루프 코일(Loop Coil), 지하주차장 진입 램프 출차 경보등용 전원 및 LAN 통신 배관을 도로 아스콘 포장 전 매설하는 공정.",
    steps: [
      {
        stepNumber: 1,
        name: "차단기 아일랜드 패드 및 루프 코일 위치 먹매김",
        description: "차량 진입 궤적에 맞춰 중앙 아일랜드 콘크리트 패드 위치 및 바닥 루프 코일(2.0m×1.0m 8각) 컷팅선 마킹.",
        caution: "차량 통과 시 인식 오류를 방지하기 위해 옹벽 철근과의 이격거리(100mm) 확보.",
      },
      {
        stepNumber: 2,
        name: "아일랜드 패드 기초 내 전원/통신 배관 인출",
        description: "경비실 및 방재실에서 연결되는 전원관(22C)과 UTP LAN 배관(28C)을 아일랜드 패드 중앙으로 수직 인출.",
        caution: "차단기 작동 시 서지 노이즈 방지를 위해 전원과 통신 배관 분리.",
      },
      {
        stepNumber: 3,
        name: "지하 램프 출차 경보등 및 사이렌 배관 시공",
        description: "지하주차장에서 출차하는 차량 감지 시 램프 입구 경광등 및 음성 경보기를 작동시키는 감지 센서 배관 연결.",
        caution: "외부 노출 구간 방수형 후강금속관 시공.",
      },
    ],
    materials: ["아일랜드 패드 거푸집", "루프 코일 전선(테프론 내열선)", "후강금속관/ELP관", "방수 접속함"],
    tools: ["도로 아스팔트 컷터", "배관 벤더", "수평기"],
    kecStandards: "KEC 232 배선설비, 지능형교통체계(ITS) 표준시방서",
    safetyPoints: [
      "진출입로 도로 작업 시 칼라콘 라바콘 및 교통통제 신호수 배치",
    ],
    qualityInspection: [
      "LPR 카메라 촬영 각도(차량 진입각 30도 이내 유지)에 맞춘 배관 위치",
      "루프 코일 매설 깊이(아스콘 표면 하 50mm 및 실란트 충진 상태)",
      "출차 경보등 전원 및 제어 신호 연동 확인",
    ],
    defectPrevention: ["입주 초기 차량 번호판 미인식으로 인한 게이트 개폐 불가 민원 및 램프 출차 접촉사고 방지"],
    updatedAt: "2026-08-22",
  },
  {
    id: "METH-063",
    wbsCode: "063",
    phase: ConstructionPhase.PHASE_08_OUTDOOR_CIVIL,
    title: "경비실 및 무인택배 시스템 전원/통신 관로 인입",
    category: "옥외 부대설비",
    summary:
      "단지 주 출입구 경비초소, 지하주차장 동 출입구 무인택배 보관함(Smart Locker) 시스템의 24시간 무정전 상시 전원 공급, 홈네트워크 메인 서버 연동 LAN 광케이블 및 비상 통화 인터폰 관로를 지중 인입하는 공정.",
    steps: [
      {
        stepNumber: 1,
        name: "경비실 및 무인택배함 인입 지중 관로 포설",
        description: "단지 주 간선 맨홀에서 경비초소 바닥 및 무인택배함 배면까지 ELP 28C/36C 관로 2공(전원용, 통신용) 포설.",
        caution: "우천 시 빗물이 관로를 타고 실내로 유입되지 않도록 옥외 방향 역구배 시공.",
      },
      {
        stepNumber: 2,
        name: "무인택배함 전원 분전함 및 통신 아웃렛 안착",
        description: "택배함 제어 PC, 터치스크린, 전자식 도어락 락커 구동 전원(AC 220V 단독 회로) 및 광 LAN 모뎀 함 연결.",
        caution: "택배함 외함 접지(접지저항 10Ω 이하) 체결.",
      },
      {
        stepNumber: 3,
        name: "단말 덕트 실(Duct Seal) 방수/방충 기밀 마감",
        description: "경비실 바닥 배관 인출구 틈새를 불연성 방수 컴파운드로 완전 밀봉하여 습기 및 해충 유입 차단.",
        caution: "사후 유지보수용 예비 관로(Spare) 1공 확보.",
      },
    ],
    materials: ["난연 ELP관(28C/36C)", "덕트 실(Duct Seal 컴파운드)", "방우형 분전함", "UTP Cat.6"],
    tools: ["통선 와이어", "압착기", "토크렌치"],
    kecStandards: "KEC 232 배선설비, 지능형 홈네트워크 설비설치기준",
    safetyPoints: [
      "옥외 배관 인입 작업 시 지중 전선로 충전부 접촉 주의",
    ],
    qualityInspection: [
      "무인택배함 전용 독립 차단기(ELB 20A) 분기 여부",
      "배관 단말 방수 실링 기밀성",
      "홈네트워크 서버 통신 핑(Ping) 테스트 정상",
    ],
    defectPrevention: ["습기 유입에 의한 택배함 메인 메인보드 고장 및 야간 결로에 따른 전자기기 소손 방지"],
    updatedAt: "2026-08-22",
  },
];
