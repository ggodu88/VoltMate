import { ConstructionMethod, ConstructionPhase } from "../../types";

export const PHASE_11_METHODS: ConstructionMethod[] = [
  {
    id: "METH-089",
    wbsCode: "089",
    phase: ConstructionPhase.PHASE_11_FINISHING,
    title: "세대 LED 조명(거실등/방등/다운라이트) 브래킷 고정 및 결선",
    category: "조명기구",
    summary:
      "도배 및 천장 마감 완료 후 세대 거실 메인 LED등, 침실 방등, 주방 슬림등, 복도 매입 다운라이트(3인치/4인치), 신발장 하부 간접조명의 취부용 브래킷을 석고보드 목상(달대)에 견고히 체결하고 전원선을 결선하는 공정.",
    steps: [
      {
        stepNumber: 1,
        name: "천장 목상(스터드/각재) 탐지 및 브래킷 고정",
        description: "스터드 파인더로 천장 석고보드 배면의 목재 각재 위치를 탐지하여 조명용 강재 브래킷을 38mm 목공 피스로 2점 이상 체결.",
        caution: "목상이 없는 빈 석고보드에 피스 단독 체결 금지(등기구 낙하 원인).",
      },
      {
        stepNumber: 2,
        name: "원터치 무납 퀵 단자대 전원선 결선",
        description: "전선 심선(12mm 탈피)을 LED 컨버터(SMPS) 전원 입력 푸시 단자대에 '딸깍' 소리가 나도록 완전 삽입.",
        caution: "전선 접지선(녹황색)을 등기구 금속 프레임 접지 러그에 필수 결속.",
      },
      {
        stepNumber: 3,
        name: "LED 모듈 및 커버 조립 후 수평 정렬",
        description: "LED 본체를 브래킷에 너트로 고정하고 디퓨저 커버를 닫은 후 레이저 라인에 맞춰 수평/각도 조정.",
        caution: "도배지 이염 방지 면장갑 착용.",
      },
    ],
    materials: ["고효율 KS 인증 LED 등기구", "조명 고정용 목공 피스", "스프링 토글 앙카", "푸시인 단자대"],
    tools: ["스터드 파인더(목상 탐지기)", "전동 충전 드라이버", "레이저 수평기"],
    kecStandards: "KEC 234 조명설비, KS C 7653 (LED 매입형 및 고정형 등기구)",
    safetyPoints: [
      "사다리 작업 시 2인 1조 작업 및 사다리 최상단 발판 디딤 금지",
    ],
    qualityInspection: [
      "등기구 고정 인장 강도(자중의 3배 이상 지지 확인)",
      "천장면과 등기구 틈새 들뜸 없음(단차 1mm 이내)",
      "등기구 금속 외함 접지 도통 상태",
    ],
    defectPrevention: ["입주 후 거실등/방등 처짐 및 추락 안전사고 원천 차단"],
    updatedAt: "2026-08-22",
  },
  {
    id: "METH-090",
    wbsCode: "090",
    phase: ConstructionPhase.PHASE_11_FINISHING,
    title: "배선기구(스위치/콘센트/대기전력차단/USB) 수평 취부",
    category: "배선기구",
    summary:
      "각 실 벽체에 1~6구 조명 스위치, 2구 접지극 콘센트, 대기전력 자동 차단 콘센트, 고속 충전 USB 복합 콘센트, 통신/TV 아웃렛을 매입 박스에 장착하고, 수평 레벨기로 1mm 오차 없이 정렬하여 마감 플레이트를 결합하는 공정.",
    steps: [
      {
        stepNumber: 1,
        name: "박스 내부 전선 정리 및 스트립 길이 점검",
        description: "전선 심선을 12mm 게이지에 맞춰 탈피하고 꼬임 없이 기구 배면 원터치 단자에 색상별(상/N/접지) 완전 삽입.",
        caution: "구리 도체 노출이 없도록 완전 결속 확인.",
      },
      {
        stepNumber: 2,
        name: "기구 프레임 볼팅 및 자석 수평기 레벨링",
        description: "아웃렛 박스 볼트 구멍에 M4 접시머리 볼트로 가조립 후 자석 수평기를 상단에 얹어 완벽한 수평 세팅 후 본체결.",
        caution: "전동 드라이버 과토크로 인한 기구 플라스틱 프레임 깨짐 주의(토크 클러치 3단계 세팅).",
      },
      {
        stepNumber: 3,
        name: "원터치 마감 플레이트(Cover Plate) 체결",
        description: "기구 테두리에 데코레이션 커버 플레이트를 수직 밀착 결합하여 도배지와의 틈새 마감.",
        caution: "도배풀 오염 방지 및 보호 비닐 유지.",
      },
    ],
    materials: ["배선기구 세트(스위치/콘센트/대기전력/USB)", "M4 고정 볼트", "플레이트 커버"],
    tools: ["미니 자석 수평기", "토크 조절형 충전 드라이버", "와이어 스트리퍼"],
    kecStandards: "KEC 232.5 배선기구, KS C 8305 (배선용 꽂음 접속기)",
    safetyPoints: [
      "기구 취부 전 분전반 차단기 개방(OFF) 상태 확인",
    ],
    qualityInspection: [
      "기구 수평도(수평 기포 중앙 일치, 오차 0.5도 이내)",
      "접지 단자 접촉 저항 및 극성(좌측 N, 우측 L상) 일치",
      "도배면과 플레이트 간 들뜸 없음",
    ],
    defectPrevention: ["스위치/콘센트 삐뚤어짐 시각적 하자 및 콘센트 플러그 헐거움 발열 방지"],
    updatedAt: "2026-08-22",
  },
  {
    id: "METH-091",
    wbsCode: "091",
    phase: ConstructionPhase.PHASE_11_FINISHING,
    title: "세대 분전반(VFB) 차단기(MCCB/ELB) 결선 및 커버 마감",
    category: "분전반",
    summary:
      "세대 분전반 내부 속판에 주개폐기(배선차단기 MCCB 40~50A)와 분기 누전차단기(ELB 20~30A, 30mA 0.03초)를 배치하고, 전선 넘버링 튜브를 대조하여 단자대에 토크 드라이버로 체결 후 회로 명판 부착 및 분전반 외함 도어를 조립하는 공정.",
    steps: [
      {
        stepNumber: 1,
        name: "분기 차단기 부스바 결합 및 입력선 체결",
        description: "주차단기 2차측에서 분기 차단기로 전력을 분배하는 일체형 동 빗살 부스바(Comb Busbar)를 장착하고 볼팅.",
        caution: "부스바 절연 덮개(Shrouding Cover) 필수 장착.",
      },
      {
        stepNumber: 2,
        name: "부하선 넘버링 대조 및 토크 드라이버(2.5N·m) 체결",
        description: "회로 번호에 맞춰 전선을 차단기 부하측 단자에 깊숙이 삽입하고 규정 토크로 2인 1조 상호 확인 체결.",
        caution: "선 심선 가닥 삐져나옴 또는 피복 물림(Insulation Pinching) 전수 검사.",
      },
      {
        stepNumber: 3,
        name: "접지 단자대 체결 및 회로 명판 스티커 부착",
        description: "전 회로 접지선(녹황색)을 공통 접지 바에 결속하고, 분전반 커버 전면에 각 회로별 사용 용도 명판 부착.",
        caution: "분전반 내부 도면 보관 포켓에 회로 결선도 삽입.",
      },
    ],
    materials: ["세대 분전반 커버 및 속판", "MCCB/ELB 차단기 세트", "동 빗살 부스바", "회로 명판 스티커"],
    tools: ["절연 토크 드라이버(2.5N·m)", "라벨 프린터", "스패너"],
    kecStandards: "KEC 232.51 분전반, KEC 210 과전류 보호장치",
    safetyPoints: [
      "차단기 단자 볼트 체결 시 토크 미달에 의한 화재 주의",
    ],
    qualityInspection: [
      "차단기 단자 볼트 토크 마킹 전수 확인",
      "회로 명판과 실제 부하(전등1, 주방전열 등) 100% 일치",
      "누전차단기 테스트 버튼(Test Button) 기계적 트립 동작 확인",
    ],
    defectPrevention: ["피복 물림 접속에 의한 스파크 아크 화재 및 회로 표기 오류 민원 방지"],
    updatedAt: "2026-08-22",
  },
  {
    id: "METH-092",
    wbsCode: "092",
    phase: ConstructionPhase.PHASE_11_FINISHING,
    title: "홈네트워크 월패드, 도어폰, 일괄소등 스위치 결선 및 통신 셋업",
    category: "스마트홈/통신",
    summary:
      "거실 벽체에 지능형 홈네트워크 월패드(Wallpad 10인치/13인치) 브래킷을 거치하고 전원(DC 12V/24V), LAN 케이블(Cat.6), 각방 난방/환기/가스/조명 RS-485 통신선, 세대 현관 스마트 도어카메라 및 일괄소등·가스차단 스위치를 결선하여 세대 ID 및 서버 통신을 셋업하는 공정.",
    steps: [
      {
        stepNumber: 1,
        name: "월패드 브래킷 수평 거치 및 하네스 케이블 결선",
        description: "벽체 매입 박스에 강재 브래킷을 수평 고정하고 전원, 도어폰 4선식 케이블, RS-485 통신 커넥터를 월패드 배면에 결합.",
        caution: "통신선 극성(TRX+, TRX-) 오결선 방지.",
      },
      {
        stepNumber: 2,
        name: "세대 현관 스마트 도어폰 및 일괄소등 스위치 연결",
        description: "현관 카메라 각도 조정 후 체결하고, 현관 일괄제어 스위치(조명 일괄소등, 가스 밸브 잠금, 엘리베이터 호출) 연동 결선.",
        caution: "도어폰 방우 패킹 밀착.",
      },
      {
        stepNumber: 3,
        name: "단지 메인 서버 통신 IP 할당 및 기기 페어링",
        description: "월패드 엔지니어링 모드에서 동-호수 ID, 정적 IP(Static IP)를 입력하고 로비폰, 경비실, 방재실 통화 및 제어 테스트.",
        caution: "스마트폰 앱(App) 연동 모바일 원격 제어 확인.",
      },
    ],
    materials: ["홈네트워크 월패드 세트", "스마트 도어폰", "일괄제어 스위치", "RJ-45 플러그"],
    tools: ["LAN 툴(크림퍼)", "네트워크 랜테스터", "정밀 십자 드라이버"],
    kecStandards: "지능형 홈네트워크 설비 설치 및 기술기준(과기정통부·국토부·산자부 고시)",
    safetyPoints: [
      "월패드 액정 화면 보호 필름 유지 및 정전기 방지",
    ],
    qualityInspection: [
      "세대-공동현관 로비폰 간 영상/음성 통화 품질(노이즈 없음)",
      "일괄소등 스위치 작동 시 전등 즉시 소등 및 가스 차단기 연동",
      "원격 검침(전기, 수도, 가스, 난방) 데이터 수신 상태",
    ],
    defectPrevention: ["RS-485 통신 충돌(ID 중복)로 인한 월패드 먹통 및 도어폰 음성 끊김 하자 방지"],
    updatedAt: "2026-08-22",
  },
  {
    id: "METH-093",
    wbsCode: "093",
    phase: ConstructionPhase.PHASE_11_FINISHING,
    title: "지하주차장 레이스웨이 LED 디밍 조명 및 동체감지 센서 부착",
    category: "조명기구",
    summary:
      "지하주차장 레이스웨이 하부에 에너지 절약형 지능형 LED 주차등(40W~60W, 20% 상시대기/100% 감지점등) 및 마이크로웨이브/PIR 복합 동체감지 센서를 원터치 클립으로 취부하고 디밍 제어선을 결선하는 공정.",
    steps: [
      {
        stepNumber: 1,
        name: "조명기구 레이스웨이 바디 원터치 스냅 결합",
        description: "레이스웨이 바디 하부 홈에 LED 등기구 고정 스프링 클립을 밀어 넣어 '딸깍' 소리와 함께 수평 결합.",
        caution: "기구 간격(3.0m) 균일성 및 비틀림 검측.",
      },
      {
        stepNumber: 2,
        name: "전원 커넥터 및 디밍 제어선(0-10V/PWM) 플러그 체결",
        description: "레이스웨이 내부에서 인출된 퀵 커넥터를 등기구 SMPS 입력단에 원터치 플러그인 결선.",
        caution: "상시/비상 회로 분기 오결선 방지.",
      },
      {
        stepNumber: 3,
        name: "차량 진입 시뮬레이션 및 디밍 딜레이 타임 세팅",
        description: "주차장 통로 주행 테스트를 통해 차량 진입 10m 전방 조명 100% 밝기 전환 및 통과 후 30초 20% 감광 동작 튜닝.",
        caution: "센서 감지 각도 및 사각지대 영점 조절.",
      },
    ],
    materials: ["주차장 전용 지능형 LED 등기구", "동체감지 센서 모듈", "원터치 체결 클립"],
    tools: ["센서 리모컨(RF 세팅기)", "조도계", "이동식 비계(BT아시바)"],
    kecStandards: "KEC 234 조명설비, 지하주차장 조명 환경 가이드ライン",
    safetyPoints: [
      "고소 작업 시 안전모 착용 및 이동 통로 하부 감시원 배치",
    ],
    qualityInspection: [
      "바닥 평균 조도(주행로 100lx 이상, 주차구획 70lx 이상 확보)",
      "디밍 연동 반응 속도(지연 시간 0.5초 이내)",
      "조명 라인 수평 직선도",
    ],
    defectPrevention: ["센서 오동작으로 인한 조명 꺼짐 암전 사고 및 불필요한 상시 100% 점등 에너지 낭비 방지"],
    updatedAt: "2026-08-22",
  },
  {
    id: "METH-094",
    wbsCode: "094",
    phase: ConstructionPhase.PHASE_11_FINISHING,
    title: "옥외 보안등/가로등/문주등/조경 테마 조명 설치 및 앵커 체결",
    category: "옥외 조명",
    summary:
      "단지 내 주 출입구 문주(Gate), 보행로, 중앙광장 테마정원에 고효율 LED 가로등 폴(Pole 높이 4~6m), 볼라드등, 수목 투광등, 스텝 라이트를 콘크리트 기초에 수직 앵커링하고 방수 접속 및 단독 접지선을 체결하는 공정.",
    steps: [
      {
        stepNumber: 1,
        name: "기초 앵커 볼트 이물질 제거 및 베이스 플레이트 안착",
        description: "콘크리트 기초 앵커 볼트의 녹을 제거하고 나일론 슬리브를 끼운 후 가로등 베이스 플레이트를 안착.",
        caution: "수직 레벨링용 하부 조절 너트로 폴 기둥 수직도(1/1000 이내) 정밀 세팅.",
      },
      {
        stepNumber: 2,
        name: "폴 내부 방수 단자대 결선 및 누전차단기(ELB) 장착",
        description: "가로등 점검구 내부에 침수 방지형 방수 단자대(IP67) 및 폴 전용 소형 누전차단기(ELB 15A 15mA) 장착 결선.",
        caution: "폴 외함 접지단자에 제1종/공통 접지선(GV 6.0sq) 압착 볼팅.",
      },
      {
        stepNumber: 3,
        name: "고장력 더블 너트 체결 및 무수축 그라우팅 마감",
        description: "상부 너트를 토크렌치로 체결 후 베이스 플레이트 하부 틈새를 무수축 방수 모르타르로 사춤하고 화장 캡 장착.",
        caution: "태풍 풍하중에 견디는 규정 토크(80N·m) 준수.",
      },
    ],
    materials: ["LED 가로등/보안등 폴 세트", "폴 내장형 방수 단자대 및 ELB", "무수축 그라우트 모르타르", "볼트 화장 캡"],
    tools: ["토크렌치", "정밀 수직 레벨기", "카고 크레인(가로등 양중용)"],
    kecStandards: "KEC 241.1 옥외 조명설비, 도로조명기준(KS A 3701)",
    safetyPoints: [
      "폴 기둥 인양 시 와이어로프 체결 균형 확인 및 하부 통행 금지",
    ],
    qualityInspection: [
      "가로등 폴 수직도(전·후·좌·우 1mm 이내 수직 정렬)",
      "폴 외함 접지저항값(10Ω 이하 확인)",
      "주야간 자동 점소등(광센서/타이머) 연동 작동",
    ],
    defectPrevention: ["강풍에 의한 가로등 전도 참사 및 비 오는 날 가로등 접촉 누전 감전사고 원천 차단"],
    updatedAt: "2026-08-22",
  },
];
