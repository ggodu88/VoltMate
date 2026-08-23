import { ConstructionMethod, ConstructionPhase } from "../../types";

export const PHASE_12_METHODS: ConstructionMethod[] = [
  {
    id: "METH-095",
    wbsCode: "095",
    phase: ConstructionPhase.PHASE_12_COMMISSIONING,
    title: "세대 전등 점소등 및 콘센트 무부하/부하 극성·전압 전수 시험",
    category: "종합 시운전",
    summary:
      "입주 전 전 세대(100% 전수)를 대상으로 각 실 조명 스위치 1:1 점소등 상태, 디밍 제어, 복도 센서등 동작을 확인하고, 모든 콘센트에 극성 테스터기를 삽입하여 상(Hot)-중성(Neutral)-접지(Ground) 극성 일치 및 전압(220V ±10V)을 검측하는 공정.",
    steps: [
      {
        stepNumber: 1,
        name: "세대 분전반 메인/분기 차단기 일괄 가압",
        description: "세대 분전반 주차단기 및 분기 차단기를 투입하고 전압계로 220V 정상 공급 확인.",
        caution: "타는 냄새나 스파크 소음 발생 시 즉시 전원 차단.",
      },
      {
        stepNumber: 2,
        name: "조명 스위치 회로별 점소등 및 플리커 점검",
        description: "각 방 스위치(1~3구)를 5회 이상 반복 ON/OFF하여 조명 점등 정상 여부 및 휴대폰 카메라로 LED 미세 떨림(Flicker) 유무 점검.",
        caution: "3로 스위치(복도/계단) 상호 절체 동작 확인.",
      },
      {
        stepNumber: 3,
        name: "콘센트 디지털 극성 및 전압 테스터기 전수 삽입",
        description: "모든 벽체/바닥 콘센트에 3선식 극성 테스터기를 꽂아 정상(Correct) 3개 램프 점등 및 실효전압(215~225V) 기록.",
        caution: "극성 역상(Reverse Polarity) 및 접지선 단선(Open Ground) 적발 시 즉시 결선 보수.",
      },
    ],
    materials: ["세대별 전수 검측 점검표(Checksheet)", "불량 체크 스티커(Yellow Card)"],
    tools: ["디지털 콘센트 극성 테스터기", "True RMS 멀티미터", "LED 플리커 측정기"],
    kecStandards: "KEC 232 배선설비, KEC 234 조명설비, 전기사업법 제67조",
    safetyPoints: [
      "테스트 중 감전 방지 절연 신발 착용",
    ],
    qualityInspection: [
      "세대 전 콘센트 극성 정상 일치율(100% 전수 합격)",
      "선간 전압(220V ±6% 법정 허용 범위 준수)",
      "스위치 OFF 시 잔광 현상(Ghost Light) 0건",
    ],
    defectPrevention: ["입주민 이사 후 가전제품 플러그 삽입 시 미작동 민원 및 역극성에 의한 전자기기 고장 방지"],
    updatedAt: "2026-08-22",
  },
  {
    id: "METH-096",
    wbsCode: "096",
    phase: ConstructionPhase.PHASE_12_COMMISSIONING,
    title: "세대 누전차단기(ELB) 트립 테스트(30mA, 0.03초 이내) 전수 검사",
    category: "종합 시운전",
    summary:
      "인체 감전 사고를 원천 차단하기 위해 세대 분전반 및 공용부 분전반에 설치된 모든 누전차단기(ELB)를 대상으로 공인 디지털 ELB 테스터기를 사용하여 규정 감도전류(정격 30mA, 욕실 15mA) 및 동작시간(0.03초 이내 고속 트립)을 전수 측정하는 공정.",
    steps: [
      {
        stepNumber: 1,
        name: "ELB 자체 기계적 테스트 버튼(Test Button) 가압",
        description: "차단기 전면의 적색/황색 테스트 버튼을 눌러 내부 릴레이 및 핸들 트립 메커니즘 동작 확인.",
        caution: "테스트 버튼 불량 제품은 즉시 신품 교체.",
      },
      {
        stepNumber: 2,
        name: "디지털 ELB 테스터기 모의 누설전류 인가",
        description: "콘센트 단자에 테스터기를 연결하고 0도 및 180도 위상에서 정격 전류의 100%(30mA 또는 15mA) 모의 지락전류 인가.",
        caution: "동작 시간(Trip Time)이 30ms(0.03초) 이내인지 디지털 밀리초(ms) 단위 계측.",
      },
      {
        stepNumber: 3,
        name: "불동작 전류(15mA 이하) 오트립 방지 검증",
        description: "정격 감도전류의 50%(15mA) 인가 시 차단기가 떨어지지 않는지 확인하여 정상 부하 사용 시 불시 오트립 예방.",
        caution: "차단기 전면에 검측 완료 인증 스티커 부착.",
      },
    ],
    materials: ["ELB 전수 검측 시험 성적서", "검사필 스티커"],
    tools: ["디지털 공인 누전차단기 테스터기(ELB Tester, 교정필)", "스톱워치"],
    kecStandards: "KEC 211 누전차단기 시설 기준, KS C 4613 (누전차단기)",
    safetyPoints: [
      "테스트 중 순간 지락에 의한 인접 작업자 감전 주의",
    ],
    qualityInspection: [
      "누전차단기 동작시간(30ms 이내 100% 합격)",
      "동작 감도전류(정격 감도전류의 50%~100% 범위 내 작동)",
      "전 세대 차단기 전수(100%) 시험 기록표 편철",
    ],
    defectPrevention: ["물기 있는 손으로 가전기기 접촉 시 감전 사망 사고를 0.03초 내에 완벽 방어"],
    updatedAt: "2026-08-22",
  },
  {
    id: "METH-097",
    wbsCode: "097",
    phase: ConstructionPhase.PHASE_12_COMMISSIONING,
    title: "동력 제어반(급배수 펌프/정화조/팬룸) 자동 기동/정지 연동 시운전",
    category: "종합 시운전",
    summary:
      "지하 기계실 급수 부스터 펌프 시스템, 배수/오수 패키지 집수정 펌프, 정화조 폭기 블로어, 급배기 공조 팬룸의 MCC 판넬을 기계설비 자동제어(DDC/BAS) 시스템과 연동하여 수동(Manual), 자동(Auto), 비상(Emergency) 모드별 시운전을 수행하는 공정.",
    steps: [
      {
        stepNumber: 1,
        name: "수동 조작반(Jog/Manual) 모터 단독 무부하 회전 점검",
        description: "MCC 도어의 수동 스위치를 조작하여 펌프 모터 회전 방향(CW) 및 정격 운전 전류(Amperage) 측정.",
        caution: "배관 밸브 폐쇄 상태에서 펌프 공회전(Dry Run) 금지(임펠러 소손 방지).",
      },
      {
        stepNumber: 2,
        name: "수위 센서(전극봉/수위 레벨 트랜스미터) 수위 연동 시험",
        description: "집수정에 물을 채우거나 모의 수위 신호를 인가하여 저수위 정지 -> 고수위 1대 기동 -> 경보수위 2대 동시 기동 및 교번 운전(Alternating) 검증.",
        caution: "수위 레벨 헌팅 방지 타임 딜레이 확인.",
      },
      {
        stepNumber: 3,
        name: "중앙 방재실 BAS 시스템 원격 감시/제어 인터록",
        description: "중앙 감시실 SCADA 컴퓨터 화면에 펌프 운전/정지/트립 상태 및 배관 압력값이 실시간 그래픽 표기되는지 1:1 대조.",
        caution: "모터 과부하 EOCR 트립 시 경보 벨 및 화면 팝업 검증.",
      },
    ],
    materials: ["동력 시운전 체크리스트", "모의 수위 시험기"],
    tools: ["클램프 미터(후크온 메타)", "비접촉 회전계(Tachometer)", "적외선 열화상 카메라"],
    kecStandards: "KEC 232, KCS 31 60 10, 기계설비공사 표준시방서",
    safetyPoints: [
      "회전체(펌프 축 커플링) 안전 덮개 장착 확인 및 접근 금지",
    ],
    qualityInspection: [
      "모터 기동 및 운전 전류(명판 정격의 90% 이내 안정)",
      "펌프 교번 운전(1호기 -> 2호기 순차 자동 전환) 정상",
      "방재실 원격 기동/정지 제어 딜레이(1초 이내)",
    ],
    defectPrevention: ["장마철 집수정 펌프 미기동에 따른 지하주차장 및 전기실 침수 대참사 방지"],
    updatedAt: "2026-08-22",
  },
  {
    id: "METH-098",
    wbsCode: "098",
    phase: ConstructionPhase.PHASE_12_COMMISSIONING,
    title: "정전 대비 비상발전기 자동 절체(ATS) 및 100% 부하 운전 시험",
    category: "종합 시운전",
    summary:
      "한전 본수전 정전(Blackout) 상황을 모의하여 10초 이내에 비상발전기가 자동 시동되고 자동부하절체개폐기(ATS)가 발전 전원으로 절체되는지 검증하며, 이동식 로드뱅크(Load Bank)를 연결하여 100% 정격 용량(1~2시간 연속) 부하 운전 성능을 검증하는 공정.",
    steps: [
      {
        stepNumber: 1,
        name: "한전 UVR(부족전압계전기) 모의 정전 트립",
        description: "수전반 UVR 테스트 버튼을 눌러 정전을 시뮬레이션하고 신호 발생 후 발전기 엔진 시동 완료 시간(7~10초 이내) 계측.",
        caution: "정전 즉시 방재실 비상 조명 및 축전지 조명 즉각 점등 확인.",
      },
      {
        stepNumber: 2,
        name: "ATS 비상 전원 자동 절체 및 중요 부하 가압",
        description: "발전기 정격 전압(380V) 및 주파수(60Hz) 도달 즉시 ATS가 상용에서 비상으로 '쿵' 소리와 함께 절체되는지 확인.",
        caution: "소방 펌프, 비상 승강기, 제연 팬 전원 투입 확인.",
      },
      {
        stepNumber: 3,
        name: "로드뱅크(Load Bank) 25%-50%-75%-100% 단계별 부하 시험",
        description: "전기실 외부에 1,000kW급 건식 로드뱅크를 연결하여 30분 단위로 부하를 단계별 상승시키며 엔진 냉각수 온도, 오일 압력, 배기 가스 및 주파수 변동률(3% 이내) 기록.",
        caution: "100% 연속 운전 시 발전기 권선 온도 상승(80℃ 이하) 적외선 열화상 검측.",
      },
    ],
    materials: ["이동식 고용량 로드뱅크(Load Bank)", "디젤 연료(경유 1,000L)", "시운전 성적서"],
    tools: ["전력분석기(Power Quality Analyzer)", "초정밀 스톱워치", "열화상 카메라", "소음계"],
    kecStandards: "KEC 323 발전설비, 소방시설 내화배선 및 비상전원 화재안전기준(NFPC)",
    safetyPoints: [
      "로드뱅크 고온 배풍구(200℃ 이상) 주변 10m 접근 금지 안전 펜스 설치",
      "발전기실 소음 방지 귀마개 착용",
    ],
    qualityInspection: [
      "정전 감지 후 비상 전원 투입 완료 시간(법정 10초 이내 달성)",
      "100% 정격 부하 시 전압 및 주파수 안정도(60Hz ±0.5Hz)",
      "한전 복전 시 상용 전원 자동 복귀 및 발전기 무부하 냉각 운전(Cool-down 5분) 후 정지",
    ],
    defectPrevention: ["실제 광역 정전 시 비상발전기 시동 불능 또는 용량 부족 트립에 의한 비상 엘리베이터 갇힘 방지"],
    updatedAt: "2026-08-22",
  },
  {
    id: "METH-099",
    wbsCode: "099",
    phase: ConstructionPhase.PHASE_12_COMMISSIONING,
    title: "비상방송/화재수신기/제연댐퍼 소방 전기 연동 종합 정밀 점검",
    category: "소방 연동",
    summary:
      "소방시설공사업법 및 화재안전기준에 따라 관할 소방서 준공 검사를 수검하기 위해, R형 복합화재수신기에서 화재 감지기(연기/열)를 모의 작동시켜 해당 층 및 직상 4개 층 비상방송 자동 경보, 비상조명등 점등, 방화셔터 2단 하강, 제연 댐퍼 개방 및 피난 유도등 연동을 100% 검측하는 공정.",
    steps: [
      {
        stepNumber: 1,
        name: "화재 감지기 모의 시험기 가압 및 R형 수신기 화재 수신",
        description: "각 동 기준층 세대 및 복도 감지기에 시험용 연기 스프레이를 분사하여 방재실 R형 수신기 화면에 해당 동-층-구역 즉각 표출(3초 이내) 확인.",
        caution: "화재 신호 즉시 주경종 및 지구경종 명동.",
      },
      {
        stepNumber: 2,
        name: "비상방송(PA) 우선경보 연동 및 음압(90dB) 계측",
        description: "화재 발생 층 및 직상층(30층 이상 공동주택은 직상 4개 층)에 한국어/영어 대피 안내 음성 방송이 자동 송출되는지 확인하고 복도 소음계로 90dB 이상 음압 검측.",
        caution: "음성 합성 안내 멘트 명료도 확인.",
      },
      {
        stepNumber: 3,
        name: "방화셔터/제연설비/비상엘리베이터 피난 연동",
        description: "1차 연기 감지 시 방화셔터 1단(1.8m 지점) 하강, 2차 열 감지 시 바닥 완전 착지 확인 및 비상 승강기 1층 강제 피난 귀환(Home-landing) 작동 검측.",
        caution: "제연 댐퍼 급기/배기 모터 완벽 개방 및 확인 스위치 방재실 수신.",
      },
    ],
    materials: ["소방시설 완공검사 신청서류", "감지기 시험용 연기 스프레이", "연동 매트릭스 표"],
    tools: ["화재 감지기 시험기(폴대형)", "소음계(Sound Level Meter)", "초정밀 스톱워치"],
    kecStandards: "소방시설 설치 및 관리에 관한 법률, 화재알림설비 및 비상방송설비 화재안전기준",
    safetyPoints: [
      "비상방송 시험 전 단지 내 잔류 근로자에게 사전 안내 방송 실시(패닉 방지)",
    ],
    qualityInspection: [
      "소방시설 연동 매트릭스 100% 일치(오동작 0건)",
      "비상방송 음압(각 실 중심에서 90dB 이상 확보)",
      "소방 완공검사증명서(소방필증) 수령",
    ],
    defectPrevention: ["화재 시 비상방송 미출력 및 제연설비 미기동에 따른 인명 질식 피해 방지"],
    updatedAt: "2026-08-22",
  },
  {
    id: "METH-100",
    wbsCode: "100",
    phase: ConstructionPhase.PHASE_12_COMMISSIONING,
    title: "준공도서(Shop Drawing/준공도면) 편철 및 유지관리 매뉴얼 인계",
    category: "준공 인계",
    summary:
      "공사 완료 후 실제 현장 시공 상태를 100% 반영한 최종 준공도면(As-Built Drawings CAD/PDF), 수배전반 및 발전기 시험 성적서, 계전기 정정 계산서, 자재 승인 서류, 설비별 유지관리 지침서(O&M Manual)를 편철하여 발주처, 감리단 및 입주자 관리사무소에 정식 인계하는 최종 완성 공정.",
    steps: [
      {
        stepNumber: 1,
        name: "현장 일치형 최종 준공도면(As-Built Drawing) 작성",
        description: "공사 중 발생한 설계 변경 및 현장 변경 사항을 전수 반영하여 배관 경로, 회로 번호, 분전반 결선도를 CAD로 최종 수정.",
        caution: "매입 배관 및 지중 맨홀 좌표 정밀 표기.",
      },
      {
        stepNumber: 2,
        name: "공인 시험 성적서 및 품질 보증서 일괄 바인더 편철",
        description: "KESCO 사용전검사 필증, 변압기/차단기 공장 성적서, 절연저항 100% 측정표, 접지저항 측정표, 방화구획 인정서를 표준 규격 바인더로 제본.",
        caution: "전자 파일(USB/클라우드 저장소) 병행 구축.",
      },
      {
        stepNumber: 3,
        name: "관리사무소 시설관리자 실무 교육 및 열쇠/예비품 인계",
        description: "관리소 전기 과장 및 기전팀을 대상으로 수배전반 조작법, 정전 시 비상발전기 수동 기동 요령, 분전반 키(Key), 예비 차단기/퓨즈/자재를 인수인계서 날인 후 인계.",
        caution: "하자 보수 긴급 연락망 및 협력업체 리스트 전달.",
      },
    ],
    materials: ["준공도면 제본 도서(A1/A3)", "유지관리 매뉴얼(O&M)", "예비 자재 보관함", "인수인계서"],
    tools: ["전자 문서 스캐너", "준공 USB 드라이브", "라벨 제본기"],
    kecStandards: "건설기술진흥법 시행령 제78조, 전기공사업법 준공 규정",
    safetyPoints: [
      "인수인계 시 전기실 위험 구역 안전 수칙 및 긴급 차단 매뉴얼 최우선 교육",
    ],
    qualityInspection: [
      "준공도면과 실제 현장 배선 100% 일치성 확인",
      "법정 필수 인계 서류 누락 없음(발주처/감리 승인 완료)",
      "시설관리자 교육 이수 및 인수인계서 서명 완료",
    ],
    defectPrevention: ["입주 후 시설관리자 조작 미숙으로 인한 2차 대정전 사고 방지 및 신속한 하자 대응 체계 확립"],
    updatedAt: "2026-08-22",
  },
];
