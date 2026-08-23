import { ConstructionPhase, LegalStandardItem } from "../types";

export const LEGAL_STANDARDS_SYSTEM: LegalStandardItem[] = [
  {
    id: "LAW-01",
    code: "01",
    title: "전기공사업법",
    category: "법률/시행령",
    authority: "산업통상자원부 (전력산업정책과)",
    latestVersionInfo: "법률 제19920호 (최신 개정, 시행)",
    keyPurposes: [
      "전기공사업의 건전한 발전과 전기공사의 적정한 시공 확보",
      "무자격자 불법시공 근절 및 도급/하도급 공정 질서 확립",
      "전기공사기술자의 현장 상주 배치를 통한 품질 및 시공 신뢰성 제고",
    ],
    coreRegulations: [
      {
        article: "제4조 (공사업의 등록) 및 제14조 (하도급의 제한)",
        title: "면허 등록 및 일괄 하도급 금지",
        content:
          "공사업 등록을 한 자가 아니면 전기공사를 도급받거나 시공할 수 없으며, 도급받은 전기공사를 다른 사람에게 일괄하여 하도급할 수 없음 (전문공종에 한해 발주자 서면승낙 후 1회 적법 재하도급만 허용).",
        fieldApplication:
          "착공 전 협력업체 면허 등록증 원본 대조, 재하도급 불법성 검토, 하도급 통보서 30일 이내 발주자 제출.",
        violationPenalty: "1년 이하 징역 또는 1천만원 이하 벌금, 등록취소 또는 영업정지",
      },
      {
        article: "제17조 (시공관리 및 기술자 배치)",
        title: "전기공사기술자 현장 배치 의무",
        content:
          "전기공사업자는 시공관리 및 품질·안전 확보를 위하여 전기공사기술자 중 특급/고급/중급/초급 자격 기준에 부합하는 현장대리인을 착공과 동시에 현장에 배치하여야 함.",
        fieldApplication:
          "공사금액/규모별 법정 등급 기술자(특급/고급 등) 선임계 및 경력수첩 사본 감리단/발주처 제출 후 상주 관리.",
        violationPenalty: "500만원 이하의 과태료",
      },
      {
        article: "제11조 (분리발주 의무)",
        title: "전기공사 분리발주 원칙",
        content:
          "전기공사는 건설공사 또는 통신·소방공사 등 다른 공종의 공사와 분리하여 발주하여야 함 (원칙적 통합발주 금지).",
        fieldApplication:
          "아파트 주건설공사 계약과 별도로 전기공사 분리계약 체결 여부 확인.",
        violationPenalty: "500만원 이하의 벌금",
      },
    ],
    relatedPhases: [
      ConstructionPhase.PHASE_01_PREPARATION,
      ConstructionPhase.PHASE_12_TEST_COMMISSIONING,
    ],
    relatedWbsRange: "001~008, 095~100",
    tags: ["등록기준", "기술자배치", "하도급제한", "분리발주", "착공신고"],
  },
  {
    id: "LAW-02",
    code: "02",
    title: "전력기술관리법",
    category: "법률/시행령",
    authority: "산업통상자원부 (전력산업정책과)",
    latestVersionInfo: "법률 제19921호 (최신 개정, 시행)",
    keyPurposes: [
      "전력기술의 연구·개발 촉진 및 전력시설물의 설계·감리 표준화",
      "공사감리원의 입회 검측 및 부실시공 방지체계 확립",
      "시공상세도(Shop Drawing) 승인 절차를 통한 설계 일치성 확보",
    ],
    coreRegulations: [
      {
        article: "제12조 (공사감리 등) 및 제12조의2 (감리원 배치)",
        title: "공사감리원 현장 배치 및 감리업무 수행",
        content:
          "전력시설물의 설치·보수 공사에 대해 전력기술관리법에 따라 책임감리원을 배치하고, 시공자가 설계도서 및 KEC 기술기준에 적합하게 시공하는지 확인·검측하여야 함.",
        fieldApplication:
          "공정별 감리 검측 체크리스트 사전 제출, 주요 공정(기초접지, 배관매입, 수배전반 안착 등) 감리 입회 승인 후 후속 공정 착수.",
        violationPenalty: "1년 이하 징역 또는 1천만원 이하 벌금 (부실 감리 및 무배치 시)",
      },
      {
        article: "제14조 (시공상세도면의 작성 및 검토)",
        title: "Shop Drawing(시공상세도) 작성 승인",
        content:
          "시공자는 공사 착수 전 현장 여건을 반영한 시공상세도를 작성하여 공사감리원의 서면 승인을 받아야 함.",
        fieldApplication:
          "단위세대 슬래브 배관도, 지하주차장 트레이/레이스웨이 복합단면도, 수변전실 단면상세도 사전 승인.",
        violationPenalty: "시정명령 및 부실벌점 부과",
      },
    ],
    relatedPhases: [
      ConstructionPhase.PHASE_01_PREPARATION,
      ConstructionPhase.PHASE_03_BASEMENT_STRUCTURE,
      ConstructionPhase.PHASE_04_UNIT_STRUCTURE,
      ConstructionPhase.PHASE_07_TRAY_RACEWAY,
      ConstructionPhase.PHASE_10_SUBSTATION,
      ConstructionPhase.PHASE_12_TEST_COMMISSIONING,
    ],
    relatedWbsRange: "001~100 (전 공정)",
    tags: ["책임감리", "Shop도면", "검측승인", "감리보고서", "부실벌점"],
  },
  {
    id: "LAW-03",
    code: "03",
    title: "전기사업법",
    category: "법률/시행령",
    authority: "산업통상자원부",
    latestVersionInfo: "법률 제19922호 (최신 개정, 시행)",
    keyPurposes: [
      "전기사업의 합리적 운영 및 전기사용자의 이익 보호",
      "전력 공급 체계의 안정성과 공공성 확보",
      "공사계획 인가 및 신고를 통한 전력계통 안정화",
    ],
    coreRegulations: [
      {
        article: "제61조 (공사계획의 인가 또는 신고)",
        title: "자가용 전기설비 공사계획 인가/신고",
        content:
          "자가용 전기설비의 설치공사 또는 변경공사로서 산업통상자원부령으로 정하는 규모 이상의 공사를 하려는 자는 시·도지사 또는 한전/KESCO에 공사계획을 인가받거나 신고하여야 함.",
        fieldApplication:
          "아파트 수전설비(22.9kV 특고압 수전용량, 비상발전기) 공사 착공 전 공사계획신고서 제출 및 수리증 수령.",
        violationPenalty: "500만원 이하 벌금 또는 과태료",
      },
      {
        article: "제67조 (기술기준)",
        title: "전기설비의 기술기준 준수 의무",
        content:
          "전기사업자 및 자가용전기설비 또는 일반용전기설비의 설치자는 해당 설비를 산업통상자원부령으로 정하는 기술기준에 적합하도록 유지하여야 함.",
        fieldApplication:
          "모든 자재, 배관, 배선, 기구의 KEC 기술기준 적합성 검토.",
        violationPenalty: "개선명령 및 전력공급 중단 조치",
      },
    ],
    relatedPhases: [
      ConstructionPhase.PHASE_01_PREPARATION,
      ConstructionPhase.PHASE_10_SUBSTATION,
      ConstructionPhase.PHASE_12_TEST_COMMISSIONING,
    ],
    relatedWbsRange: "001~008, 076~088, 095~100",
    tags: ["공사계획신고", "전기사업허가", "기술기준준수", "자가용전기설비"],
  },
  {
    id: "LAW-04",
    code: "04",
    title: "전기사업법 시행규칙 (사용전검사·점검 규정)",
    category: "법률/시행령",
    authority: "산업통상자원부 / 한국전기안전공사(KESCO)",
    latestVersionInfo: "산업통상자원부령 제534호 (최신 개정)",
    keyPurposes: [
      "준공 전 전기설비의 법적·기술적 안전성 최종 확인",
      "KESCO 전문 검사관 입회하에 내전압, 계전기, 절연, 접지 종합 검증",
      "합격판정(검사확인증) 수령 후 한전 본수전 인입 연계",
    ],
    coreRegulations: [
      {
        article: "시행규칙 제28조 (사용전검사의 신청 등)",
        title: "KESCO 사용전검사 수검 절차",
        content:
          "자가용 전기설비의 설치공사가 완료된 때에는 전기를 통전하기 전에 한국전기안전공사의 사용전검사를 받아 합격하여야만 전기를 사용할 수 있음.",
        fieldApplication:
          "수전 예정일 최소 7~10일 전 KESCO 검사 신청, 22.9kV 특고압 모선 AC 내전압(20.4kV 10분간), 보호계전기(OCR/OCGR/UVR) 트립 연동, 절연유 내압, 접지저항 종합 수검.",
        violationPenalty: "미수검 통전 시 1년 이하 징역 또는 1천만원 이하 벌금",
      },
      {
        article: "시행규칙 제38조 (사용전점검 대상)",
        title: "일반용(세대 저압) 전기설비 사용전점검",
        content:
          "공동주택 단위세대 저압 전등·전열 설비 및 계량기 인입선에 대해 통전 전 누전차단기 동작, 절연저항(1.0MΩ 이상), 극성 일치 여부를 전수 점검하여 적합 판정 획득.",
        fieldApplication:
          "전 세대 분전반 절연저항 100% 측정표 및 누전차단기 동작시험(30mA, 0.03초) 성적서 편철 제출.",
        violationPenalty: "불합격 시 본수전 가압 불허",
      },
    ],
    relatedPhases: [
      ConstructionPhase.PHASE_10_SUBSTATION,
      ConstructionPhase.PHASE_11_FIXTURE_FINISH,
      ConstructionPhase.PHASE_12_TEST_COMMISSIONING,
    ],
    relatedWbsRange: "086, 087, 095, 096, 100",
    tags: ["KESCO", "사용전검사", "내전압시험", "보호계전기", "합격필증"],
  },
  {
    id: "LAW-05",
    code: "05",
    title: "전기설비기술기준",
    category: "기술기준/고시",
    authority: "산업통상자원부 고시 (전기설비기술기준)",
    latestVersionInfo: "산업통상자원부 고시 제2023-189호 (최신 개정, 시행)",
    keyPurposes: [
      "인체 감전 보호, 화재 예방 및 설비 손상 방지를 위한 강제 기술적 기준",
      "전기설비의 위험도 평가 및 절연내력, 위험구역 이격거리 규정",
      "KEC(한국전기설비규정)의 상위 모법적 기술 판단 기준 제공",
    ],
    coreRegulations: [
      {
        article: "제4조 (감전 보호) 및 제5조 (전기화재 방지)",
        title: "감전 및 아크 화재 방지 원칙",
        content:
          "전기설비는 통상적인 사용 상태에서 감전의 위험이 없도록 위험 충전부의 직접 접촉 방호 및 간접 접촉 시 전원 자동 차단(고속 차단) 조치를 취하여야 함.",
        fieldApplication:
          "분전반 내 충전부 절연 보호판(아크릴 커버) 장착, 전열회로 인체감전보호용 ELB(30mA/15mA) 적용.",
        violationPenalty: "기술기준 부적합 시 시정명령 및 통전 정지",
      },
      {
        article: "제14조 (전로의 절연 및 절연내력)",
        title: "전로의 절연 성능 유지",
        content:
          "사용전압 1,000V 이하의 저압 전로 및 22.9kV 특고압 전로는 대지 및 상간에 규정된 절연내력(내전압) 시험에 견뎌야 함.",
        fieldApplication:
          "저압 전로 DC 500V 절연저항 1.0MΩ 이상, 특고압 기기 상간 이격거리(200mm 이상) 확보.",
        violationPenalty: "설비 재시공 명령",
      },
    ],
    relatedPhases: [
      ConstructionPhase.PHASE_01_PREPARATION,
      ConstructionPhase.PHASE_04_UNIT_STRUCTURE,
      ConstructionPhase.PHASE_07_TRAY_RACEWAY,
      ConstructionPhase.PHASE_09_WIRING_PULLING,
      ConstructionPhase.PHASE_10_SUBSTATION,
      ConstructionPhase.PHASE_12_TEST_COMMISSIONING,
    ],
    relatedWbsRange: "001~100 (전 공정)",
    tags: ["감전보호", "절연내력", "화재예방", "이격거리", "안전율"],
  },
  {
    id: "LAW-06",
    code: "06",
    title: "KEC (한국전기설비규정)",
    category: "기술기준/고시",
    authority: "산업통상자원부 공고 (대한전기협회)",
    latestVersionInfo: "산업통상자원부 공고 제2024-81호 (KEC 최신 개정판)",
    keyPurposes: [
      "국제표준(IEC 60364) 완전 부합화된 국내 전기설비 통합 시공 기술기준",
      "전선 식별색상(갈·흑·회·청), 전선 굵기/허용전류 계산식 표준화",
      "통합/공통 접지(TN-S, TN-C-S, TT) 및 등전위 본딩, 서지보호기(SPD) 전면 적용",
      "전기차 충전설비, 태양광/ESS 및 신기술 안전 규정 수록",
    ],
    coreRegulations: [
      {
        article: "KEC 121 (전선의 식별) & KEC 232 (배선설비)",
        title: "전선 상별 식별색상 및 배관 점유율(32% 이하)",
        content:
          "교류 3상 전선의 색상은 L1(갈색), L2(검정색), L3(회색), N(청색), 보호도체 PE(녹황색 줄무늬)로 엄격 구분하여야 하며, 금속관/합성수지관 내 전선의 총 단면적은 관 내부 단면적의 32%(동일굵기선은 48%) 이하로 배관하여 방열을 확보하여야 함.",
        fieldApplication:
          "세대 분전반 및 간선 케이블 포설 시 신규 식별색상 100% 적용, 굴곡 3개소 초과 시 풀박스 설치.",
        violationPenalty: "감리 검측 불합격 및 전선 전면 재포설",
      },
      {
        article: "KEC 140 (접지시스템) & KEC 143 (등전위본딩)",
        title: "통합접지 계통(TN-S/TN-C-S) 및 주 등전위 본딩",
        content:
          "기존의 종별 접지(1, 2, 3종)를 폐지하고 통합접지/공통접지 시스템을 적용하며, 건축물 기초 철골, 수도/가스 배관, 금속 트레이를 주 접지단자대(M-G Bar)에 등전위 본딩하여 전위차 0V를 유지하여야 함.",
        fieldApplication:
          "기초 매쉬 접지극(HDCC 150sq) 발열용접 매설, 본딩 도체(GV 25sq 이상) 금속관 본딩 클램프 체결.",
        violationPenalty: "접지 부적합 시 KESCO 사용전검사 절대 불합격",
      },
      {
        article: "KEC 153 (서지보호장치 SPD) & KEC 210 (과전류 보호)",
        title: "SPD 협조 차단 및 차단기 트립 협조(Selective Coordination)",
        content:
          "외부 인입선로 서지 침입 방지를 위해 Class I/II 서지보호기를 최단거리(0.5m 이내)로 설치하고, 전단에 전용 백업 퓨즈/MCCB를 구성하여 서지 시 열폭주 단락을 차단하여야 함.",
        fieldApplication:
          "메인 수배전반 및 분전반 SPD 리드선 길이 0.5m 이내 배선, 상하위 차단기 트립 시간차(0.2초 이상) 협조.",
        violationPenalty: "낙뢰 시 장비 파손 및 민원 발생",
      },
      {
        article: "KEC 241.17 (전기자동차 전원공급설비)",
        title: "전기차(EV) 충전설비 전용 회로 및 누전 차단기",
        content:
          "전기차 충전기 공급 전로는 전용 분기회로로 구성하고, 충전기마다 인체감전보호용 누전차단기(정격감도 30mA, 0.03초 이내, 직류 6mA 검출 B형/A형)를 단독 설치하여야 함.",
        fieldApplication:
          "지하주차장 EV 충전구역 방화벽 구획, 충전 배전반 내 전용 누전차단기 개별 배치.",
        violationPenalty: "전기차 충전기 통전 승인 불가",
      },
    ],
    relatedPhases: [
      ConstructionPhase.PHASE_02_GROUNDING,
      ConstructionPhase.PHASE_04_UNIT_STRUCTURE,
      ConstructionPhase.PHASE_07_TRAY_RACEWAY,
      ConstructionPhase.PHASE_08_OUTDOOR_CIVIL,
      ConstructionPhase.PHASE_09_WIRING_PULLING,
      ConstructionPhase.PHASE_10_SUBSTATION,
      ConstructionPhase.PHASE_11_FIXTURE_FINISH,
      ConstructionPhase.PHASE_12_TEST_COMMISSIONING,
    ],
    relatedWbsRange: "009~100 (핵심 시공 기준)",
    tags: ["KEC", "전선색상", "통합접지", "등전위본딩", "SPD", "전기차충전", "허용전류"],
  },
  {
    id: "LAW-07",
    code: "07",
    title: "전기안전관리법",
    category: "법률/시행령",
    authority: "산업통상자원부 / 한국전기안전공사",
    latestVersionInfo: "법률 제19923호 (최신 개정, 시행)",
    keyPurposes: [
      "전기설비의 안전관리에 관한 기본 사항을 정하여 공공의 안전 확보",
      "전기안전관리자 선임 및 직무 고시(점검 주기, 기록 보존) 의무화",
      "수전 전 안전관리자 선임 완료를 통한 책임 운영 체계 확립",
    ],
    coreRegulations: [
      {
        article: "제22조 (전기안전관리자의 선임) 및 제24조 (직무)",
        title: "전기안전관리자 선임 및 점검 기록",
        content:
          "자가용전기설비의 소유자 또는 점유자는 전기설비의 공사·유지 및 운용에 관한 안전관리를 위하여 전기안전관리자를 선임하여야 하며, 사용전검사 신청 시 선임 신고 필증을 첨부하여야 함.",
        fieldApplication:
          "본수전 전 발주처/시공사 전기안전관리자 선임 신고 필증 득한 후 KESCO 수검 진행.",
        violationPenalty: "500만원 이하 과태료 (미선임 시 벌금)",
      },
      {
        article: "제9조 (전기안전점검 및 진단기록 보존)",
        title: "정기점검 및 법정 계측장비 구비 의무",
        content:
          "전기설비 점검자는 적외선 열화상 카메라, 절연저항계, 접지저항계, 전력분석기 등 교정 완료된 법정 장비로 주기적 점검을 실시하고 4년간 기록을 보존하여야 함.",
        fieldApplication:
          "현장 시험 장비의 교정성적서(KOLAS 인증) 유효기간 확인 및 측정 데이터 편철.",
        violationPenalty: "과태료 및 행정처분",
      },
    ],
    relatedPhases: [
      ConstructionPhase.PHASE_01_PREPARATION,
      ConstructionPhase.PHASE_10_SUBSTATION,
      ConstructionPhase.PHASE_12_TEST_COMMISSIONING,
    ],
    relatedWbsRange: "001, 076, 086, 087, 098, 100",
    tags: ["안전관리자선임", "직무고시", "점검기록보존", "열화상점검"],
  },
  {
    id: "LAW-08",
    code: "08",
    title: "주택법 및 주택건설기준 등에 관한 규정",
    category: "법률/시행령",
    authority: "국토교통부 (주택건설공급과)",
    latestVersionInfo: "대통령령 제34300호 (최신 개정, 시행)",
    keyPurposes: [
      "공동주택(아파트)의 주거 성능, 쾌적성 및 전기안전 확보",
      "세대 분전반, 대기전력 차단 장치, 일괄소등 스위치 의무화 비율 규정",
      "공동주택 비상발전기 용량 산정 및 승강기/급배수 펌프 비상전원 공급 보장",
    ],
    coreRegulations: [
      {
        article: "주택건설기준규정 제40조 (전기시설 및 세대 분전반)",
        title: "세대 분전반 설치 높이 및 위치 규정",
        content:
          "세대 내 분전반은 안전하고 유지관리가 용이한 위치(신발장 배면 또는 다용도실 벽체)에 바닥면으로부터 조작 핸들 높이 1.5m 이하로 설치하여야 하며, 물기나 가연물이 없는 장소여야 함.",
        fieldApplication:
          "골조 배관 시 분전반 매입 높이 바닥 먹 기준 1,400mm 세팅 및 지지 보강.",
        violationPenalty: "준공 승인 불가 및 하자보수 명령",
      },
      {
        article: "주택건설기준규정 제40조의2 (에너지절약 장치 의무화)",
        title: "대기전력차단장치(총 콘센트의 18% 이상) 및 일괄소등 스위치",
        content:
          "공동주택 세대 내에는 총 콘센트 개수의 18% 이상(또는 1개실 이상)을 대기전력 자동 차단 콘센트/스위치로 설치하여야 하며, 현관에는 조명 일괄소등 및 가스 차단 스위치를 설치하여야 함.",
        fieldApplication:
          "거실/주방 가전 콘센트에 대기전력 차단 콘센트 배치 및 현관 일괄스위치 RS-485/릴레이 결선.",
        violationPenalty: "주택성능등급 미달 및 준공 사용검사 보류",
      },
      {
        article: "주택건설기준규정 제40조제2항 (비상발전기 용량)",
        title: "공동주택 비상전원 공급 설비",
        content:
          "정전 시 비상 승강기, 소방 펌프, 급수 가압 펌프, 지하주차장 비상조명 및 기계실 배수 펌프에 지속 전력을 공급할 수 있는 비상발전기를 의무적으로 구비하여야 함.",
        fieldApplication:
          "발전기 용량(PG법/PG1, PG2, PG3 계산) 검토 및 ATS 10초 이내 자동 절체 연동 구축.",
        violationPenalty: "사용검사 불합격",
      },
    ],
    relatedPhases: [
      ConstructionPhase.PHASE_04_UNIT_STRUCTURE,
      ConstructionPhase.PHASE_10_SUBSTATION,
      ConstructionPhase.PHASE_11_FIXTURE_FINISH,
      ConstructionPhase.PHASE_12_TEST_COMMISSIONING,
    ],
    relatedWbsRange: "020~030, 080, 090, 091, 092, 098",
    tags: ["공동주택", "세대분전반", "대기전력18%", "일괄소등", "비상발전기용량"],
  },
  {
    id: "LAW-09",
    code: "09",
    title: "건축법 및 건축물의 설비기준 등에 관한 규칙",
    category: "법률/시행령",
    authority: "국토교통부 (건축정책과)",
    latestVersionInfo: "국토교통부령 제1310호 (최신 개정, 시행)",
    keyPurposes: [
      "건축물의 방화구획 관통부 화재 확산 방지(내화충전구조)",
      "구조물 피뢰설비 설치 의무 및 침수 방지 조치",
      "지하 전기실·기계실 침수 방지 턱 및 배수 펌프 설계 기준",
    ],
    coreRegulations: [
      {
        article: "건축법 시행령 제46조 및 설비기준규칙 제14조",
        title: "방화구획 관통부 내화충전구조(Firestop) 의무 시공",
        content:
          "케이블 트레이, 부스덕트, 전선관 등이 방화구획(벽체, 바닥 슬래브, EPS 피트)을 관통하는 경우, 공인기관의 성능인증을 받은 내화채움구조(한국건설기술연구원 인정품)로 틈새를 완벽 밀폐하여야 함.",
        fieldApplication:
          "EPS/TPS 층간 슬리브 및 지하 트레이 방화벽 관통부에 방화폼/방화퍼티/방화판 2시간 이상 내화충전 시공 및 인증 라벨 부착.",
        violationPenalty: "2년 이하 징역 또는 1억원 이하 벌금 (불법 충전재 사용 시)",
      },
      {
        article: "설비기준규칙 제20조 (피뢰설비의 설치)",
        title: "KS C IEC 62305 피뢰시스템 구축",
        content:
          "높이 20m 이상 건축물에는 KS C IEC 62305에 적합한 수뢰부(돌침/도체망), 인하도선, 접지극 시스템을 설치하여 낙뢰로부터 건축물과 내부 전자기기를 보호하여야 함.",
        fieldApplication:
          "옥탑 피뢰침 및 옥상 환상 도체망 매설, 구조체 주철근 본딩 인하도선 구축.",
        violationPenalty: "건축물 준공 승인 불가",
      },
      {
        article: "건축법 제22조 및 설비기준규칙 (침수방지)",
        title: "지하 전기실 침수 방지 차수판 및 단차",
        content:
          "집중호우 시 침수로 인한 정전 참사를 방지하기 위해 지하 전기실 입구에 침수 방지턱(FL +200mm 이상) 또는 자동/수동 차수판을 설치하여야 함.",
        fieldApplication:
          "전기실 바닥 패드 높이 200mm 시공 및 주출입구 차수판 연동 배수 설비 점검.",
        violationPenalty: "시정명령",
      },
    ],
    relatedPhases: [
      ConstructionPhase.PHASE_03_BASEMENT_STRUCTURE,
      ConstructionPhase.PHASE_05_RISER_ROOF,
      ConstructionPhase.PHASE_07_TRAY_RACEWAY,
      ConstructionPhase.PHASE_10_SUBSTATION,
    ],
    relatedWbsRange: "017, 031, 034, 047, 078",
    tags: ["방화구획", "내화충전", "Firestop", "피뢰설비", "침수방지턱"],
  },
  {
    id: "LAW-10",
    code: "10",
    title: "녹색건축물 조성 지원법 (건축물 에너지절약설계기준)",
    category: "기술기준/고시",
    authority: "국토교통부 고시 (에너지관리공단)",
    latestVersionInfo: "국토교통부 고시 제2023-844호 (최신 개정, 시행)",
    keyPurposes: [
      "건축물의 에너지 소비 절감 및 온실가스 배출 억제",
      "고효율 LED 조명기구 의무 적용 비율(전체 조명의 90% 이상)",
      "스마트 디밍 제어 및 대기전력 저감 우수제품 채택",
    ],
    coreRegulations: [
      {
        article: "에너지절약설계기준 전기부문 제10조 (조명설비)",
        title: "고효율 LED 조명기구 설치 및 조명밀도(LPD) 준수",
        content:
          "공동주택 세대 및 공용부(주차장, 복도, 계단) 조명기구는 에너지소비효율 1등급 또는 고효율에너지기자재 인증을 획득한 LED 등기구를 의무 설치하여야 함.",
        fieldApplication:
          "세대 거실/방/주방 LED 조명 및 지하주차장 지능형 디밍 LED 등기구 KS/고효율 성적서 검토.",
        violationPenalty: "에너지절약계획서 불이행 판정 시 준공 허가 불가",
      },
      {
        article: "에너지절약설계기준 제11조 (전력설비의 효율적 제어)",
        title: "지하주차장 통로 동체감지 디밍 제어",
        content:
          "지하주차장 등 상시 조명이 필요한 구역에는 차량 및 보행자 동체감지 센서를 적용하여 비점유 시 최소 20% 조도로 감광 제어하여야 함.",
        fieldApplication:
          "레이스웨이 지능형 LED 조명 센서 딜레이 타임 30초 및 20% 감광 동작 필드 튜닝.",
        violationPenalty: "에너지성능지표(EPI) 감점",
      },
    ],
    relatedPhases: [
      ConstructionPhase.PHASE_07_TRAY_RACEWAY,
      ConstructionPhase.PHASE_11_FIXTURE_FINISH,
      ConstructionPhase.PHASE_12_TEST_COMMISSIONING,
    ],
    relatedWbsRange: "049, 089, 093, 094, 095",
    tags: ["에너지절약계획서", "고효율LED", "주차장디밍", "EPI점수", "대기전력저감"],
  },
  {
    id: "LAW-11",
    code: "11",
    title: "친환경자동차 개발 및 보급 촉진에 관한 법률 (친환경자동차법)",
    category: "법률/시행령",
    authority: "산업통상자원부 / 지자체 조례",
    latestVersionInfo: "법률 제19924호 (최신 개정, 시행)",
    keyPurposes: [
      "전기자동차 충전 인프라 보급 확대 및 화재 안전 기준 강화",
      "공동주택 전용주차구역 및 충전시설 의무 설치 비율(신축 5% 이상) 준수",
      "지하주차장 충전구역 방화벽 구획, 질식소화포, 열화상 CCTV 등 안전설비 확충",
    ],
    coreRegulations: [
      {
        article: "친환경자동차법 제11조의2 및 시행령 제18조의5",
        title: "신축 공동주택 전기차 충전시설 의무 설치 비율 (5% 이상)",
        content:
          "100세대 이상 신축 공동주택은 총 주차대수의 5% 이상(기축은 2%)에 해당하는 수량의 전기차 충전시설(급속/완속) 및 전용 주차구역을 설치하여야 함.",
        fieldApplication:
          "단지 전체 주차면수 대조 EV 충전기 수량 산출, 메인 수전용량 및 충전 배전반 간선 용량 확보.",
        violationPenalty: "시정명령 및 이행강제금 부과 (최대 3천만원)",
      },
      {
        article: "전기차 화재안전 관리지침 (소방청·국토부 합동)",
        title: "지하 충전구역 방화구획 및 전용 소방설비",
        content:
          "지하주차장 전기차 충전구역은 3면 내화 방화벽(또는 방화셔터) 구획, 상부 습식 스프링클러 헤드 밀도 상향, 질식소화포 비치 및 충전 전용 배선 난연화가 요구됨.",
        fieldApplication:
          "충전기 배관 스틸전선관(KSC 8401) 노출 시공 및 전원 차단 비상 스위치(EPO) 연동.",
        violationPenalty: "소방 완공검사 보류",
      },
    ],
    relatedPhases: [
      ConstructionPhase.PHASE_07_TRAY_RACEWAY,
      ConstructionPhase.PHASE_08_OUTDOOR_CIVIL,
      ConstructionPhase.PHASE_10_SUBSTATION,
      ConstructionPhase.PHASE_11_FIXTURE_FINISH,
    ],
    relatedWbsRange: "053, 062, 076, 093",
    tags: ["전기차충전", "EV인프라5%", "충전화재안전", "방화구획", "전용간선"],
  },
  {
    id: "LAW-12",
    code: "12",
    title: "소방시설 설치 및 관리에 관한 법률 및 화재안전성능기준 (NFPC/NFTC)",
    category: "기술기준/고시",
    authority: "소방청 (소방분석제도과)",
    latestVersionInfo: "소방청 고시 (NFPC 103, 303, 304, 504 등 최신 기준)",
    keyPurposes: [
      "화재 시 인명 피난 유도 및 소방관 진압 활동을 위한 전원·배선 생존성 확보",
      "비상콘센트설비(NFPC 504), 유도등(NFPC 303), 비상방송(NFPC 402) 강제 규정",
      "소방 펌프, 제연 팬 등 주요 소방 부하의 내화배선(FR-8) 100% 시공",
    ],
    coreRegulations: [
      {
        article: "비상콘센트설비의 화재안전성능기준 (NFPC 504)",
        title: "11층 이상 층별 비상콘센트 및 전용 분기회로",
        content:
          "지하층을 포함하는 층수가 11층 이상인 특정소방대상물의 11층 이상의 각 층 및 지하 3층 이하의 모든 층에 단상 교류 220V 1.5kVA 이상 비상콘센트를 바닥 0.8~1.5m 높이에 설치하고, 3상/단상 전용 개폐기 및 접지극을 구성하여야 함.",
        fieldApplication:
          "비상콘센트 전원선은 반드시 내화배선(TFR-8)을 사용하고, 계단실 출입구 5m 이내 매입 취부.",
        violationPenalty: "소방 완공검사 불합격(필증 미발급)",
      },
      {
        article: "소방용 합성수지배관 및 내화·내열배선 기준 (NFPC 103)",
        title: "소방 전원 내화배선(FR-8) 시공 의무",
        content:
          "소방펌프, 제연송풍기, 비상조명, 비상방송 등 소방시설의 상용 및 비상 전원 배선은 816℃ 가열 시험에 견디는 내화배선(FR-8 등)으로 시공하고 금속관 또는 내화 트레이에 포설하여야 함.",
        fieldApplication:
          "소방 펌프 MCC 판넬 및 제연팬 전원 케이블 TFR-8 정품 성적서 검측 및 케이블 타이에 적색 '소방배선' 태그 부착.",
        violationPenalty: "형사고발 및 시공사 벌점 부과",
      },
      {
        article: "유도등 및 비상조명등의 화재안전기술기준 (NFTC 303/304)",
        title: "유도등 2선식/3선식 결선 및 비상전원 20분/60분 점등",
        content:
          "피난구/통로 유도등은 평상시 상용전원으로 점등하고 정전 시 내장 축전지로 20분 이상(11층 이상 또는 지하층은 60분 이상) 자동 점등되어야 함.",
        fieldApplication:
          "피난구 유도등 녹색 시각 표시창 확인 및 R형 수신기 연동 소화설비 작동 시 강제 점등 시험.",
        violationPenalty: "소방 사용승인 불허",
      },
    ],
    relatedPhases: [
      ConstructionPhase.PHASE_03_BASEMENT_STRUCTURE,
      ConstructionPhase.PHASE_07_TRAY_RACEWAY,
      ConstructionPhase.PHASE_09_WIRING_PULLING,
      ConstructionPhase.PHASE_11_FIXTURE_FINISH,
      ConstructionPhase.PHASE_12_TEST_COMMISSIONING,
    ],
    relatedWbsRange: "018, 044, 073, 089, 099",
    tags: ["소방시설법", "NFPC504", "비상콘센트", "내화배선FR-8", "유도등NFTC303", "소방완공검사"],
  },
  {
    id: "LAW-13",
    code: "13",
    title: "정보통신공사업법 및 방송통신설비의 기술기준",
    category: "법률/시행령",
    authority: "과학기술정보통신부 / 국토교통부",
    latestVersionInfo: "과기정통부·국토부·산업부 공동고시 (지능형 홈네트워크 설비 고시 최신 개정)",
    keyPurposes: [
      "초고속정보통신건물 인증 기준 준수 및 구내통신선로 안정성 확보",
      "지능형 홈네트워크 월패드 세대 간 망분리(사이버 보안) 의무화",
      "강전류 전선과 약전류 통신선로 간의 이격거리 유지로 전자파 노이즈 방지",
    ],
    coreRegulations: [
      {
        article: "지능형 홈네트워크 설비 설치 및 기술기준 제14조의2",
        title: "세대 간 홈네트워크 망분리(물리적/논리적 망분리) 의무화",
        content:
          "공동주택 홈네트워크 시스템은 해킹 및 세대 간 침입을 방지하기 위해 세대단말기(월패드)와 단지 서버 간의 네트워크를 세대별로 물리적(VLAN/독립망) 또는 논리적(가상사설망 VPN, 암호화)으로 분리하여야 함.",
        fieldApplication:
          "월패드 통신 결선 시 세대별 보안 게이트웨이(단말 보안 모듈) 연결 및 암호화 통신 검증.",
        violationPenalty: "정보통신 사용전검사 불합격",
      },
      {
        article: "방송통신설비 기술기준에 관한 규정 제17조",
        title: "강전류 전선과 약전류 통신선 간 이격거리 (300mm 이상)",
        content:
          "220V/380V 전력선과 UTP Cat.6/광케이블 등 통신선이 평행하게 포설되는 경우 최소 300mm 이상 이격하여야 하며, 부득이 교차 시 90도 직교 배선하여야 함.",
        fieldApplication:
          "EPS/TPS 피트 내 트레이 분리 포설(강전 트레이와 약전 트레이 수평 300mm 이격).",
        violationPenalty: "통신 품질 저하 및 재포설 지시",
      },
    ],
    relatedPhases: [
      ConstructionPhase.PHASE_04_UNIT_STRUCTURE,
      ConstructionPhase.PHASE_05_RISER_ROOF,
      ConstructionPhase.PHASE_07_TRAY_RACEWAY,
      ConstructionPhase.PHASE_11_FIXTURE_FINISH,
    ],
    relatedWbsRange: "023, 031, 052, 092",
    tags: ["정보통신공사업법", "홈네트워크망분리", "월패드보안", "이격거리300mm", "초고속정보통신"],
  },
  {
    id: "LAW-14",
    code: "14",
    title: "한국전력공사 기본공급약관 및 전기공급 기술기준",
    category: "기술기준/고시",
    authority: "한국전력공사 (KEPCO 영업처/배전처)",
    latestVersionInfo: "한전 기본공급약관 (최신 개정)",
    keyPurposes: [
      "한전 배전선로와 수용가 수전설비 간의 인터페이스 및 책임분계점 명확화",
      "임시전력 및 본수전 수전 계약, 모자계량기(Sub-metering) 구성 기준",
      "특고압 수전 인입 케이블(CNC/CV-W, TR-CNCE-W) 규격 및 접속 표준화",
    ],
    coreRegulations: [
      {
        article: "기본공급약관 제26조 (수급지점 및 책임분계점)",
        title: "한전 전주/PAD와 수용가 간 책임분계점(COS/AISS/LBS)",
        content:
          "한전의 전력공급 책임분계점은 수용가 인입구 개폐기(AISS 또는 COS 1차측 접속점)로 하며, 책임분계점 이후의 인입선로 및 수전설비는 수용가(시공사)의 책임으로 시공·유지관리함.",
        fieldApplication:
          "한전 배전운영부와 인입 전주/지중 패드 위치 사전 협의, 한전 표준 인입 슬리브 매설.",
        violationPenalty: "전력 공급 신청 반려",
      },
      {
        article: "기본공급약관 세칙 제38조 (계량기 취부 및 MOF 봉인)",
        title: "전력량계(한전 계기함) 설치 및 MOF 결선",
        content:
          "전력거래 요금 정산을 위한 계기용 변성기(MOF) 및 전자식 전력량계는 한전의 봉인 기준에 적합하게 설치하고 시험 단자대(CTT/PTT)를 정상 구성하여야 함.",
        fieldApplication:
          "수전반 MOF 1차/2차 극성(K-L, k-l) 확인 및 한전 검침 통신 모뎀 전원선 인출.",
        violationPenalty: "계량기 취부 불허 및 수전 지연",
      },
    ],
    relatedPhases: [
      ConstructionPhase.PHASE_01_PREPARATION,
      ConstructionPhase.PHASE_08_OUTDOOR_CIVIL,
      ConstructionPhase.PHASE_10_SUBSTATION,
      ConstructionPhase.PHASE_12_TEST_COMMISSIONING,
    ],
    relatedWbsRange: "001, 002, 058, 076, 087",
    tags: ["한전약관", "책임분계점", "AISS", "MOF봉인", "본수전계약"],
  },
  {
    id: "LAW-15",
    code: "15",
    title: "국가표준 (KS C 표준 규격)",
    category: "국가표준/지침",
    authority: "국가기술표준원 (KATS)",
    latestVersionInfo: "KS C IEC 60364, KS C IEC 62305, KS C 8401/8431/8305 (최신판)",
    keyPurposes: [
      "전기기자재 및 전선관, 배선기구의 물리적·전기적 품질 표준 보장",
      "KS 인증 자재 사용을 통한 자재 불량 및 조기 열화 방지",
      "전기설비 설계 및 시공 시 객관적인 시험 검증 규격 제공",
    ],
    coreRegulations: [
      {
        article: "KS C IEC 60364 시리즈",
        title: "저압 전기설비의 시공 및 검증 표준",
        content:
          "배선설비의 허용전류, 전압강하(간선 3% 이내, 분기회로 2% 이내), 차단기 동작 특성 및 단락용량 계산 표준을 규정함.",
        fieldApplication:
          "케이블 굵기 선정 시 수용률 및 전압강하 계산서 작성 감리 승인.",
        violationPenalty: "설계도서 보완 지시",
      },
      {
        article: "KS C 8401 (강제전선관) & KS C 8431 (경질비닐관)",
        title: "전선관 자재 KS 인증 규격",
        content:
          "금속제 후강 전선관(G16~G104), 경질비닐전선관(HI-VE), 파상형 경질폴리에틸렌관(ELP)은 인장강도 및 내식성 KS 인증품만 현장에 반입하여야 함.",
        fieldApplication:
          "자재 반입 시 공인 시험성적서, KS 인증서, 밀시트(Mill Sheet) 감리단 사전 승인 후 반입.",
        violationPenalty: "불합격 자재 현장 반출(퇴출) 명령",
      },
    ],
    relatedPhases: [
      ConstructionPhase.PHASE_01_PREPARATION,
      ConstructionPhase.PHASE_03_BASEMENT_STRUCTURE,
      ConstructionPhase.PHASE_04_UNIT_STRUCTURE,
      ConstructionPhase.PHASE_07_TRAY_RACEWAY,
      ConstructionPhase.PHASE_08_OUTDOOR_CIVIL,
      ConstructionPhase.PHASE_11_FIXTURE_FINISH,
    ],
    relatedWbsRange: "001~100 (전 공정 자재)",
    tags: ["KS표준", "KS_C_IEC_60364", "KS_C_8401", "자재승인", "밀시트"],
  },
  {
    id: "LAW-16",
    code: "16",
    title: "산업안전보건법 및 산업안전보건기준에 관한 규칙",
    category: "안전/인허가",
    authority: "고용노동부 (산업안전보건본부)",
    latestVersionInfo: "고용노동부령 제395호 (최신 개정, 시행)",
    keyPurposes: [
      "전기공사 현장 근로자의 감전, 추락, 화재 및 질식 재해 예방",
      "임시 가설 분전반 접지 및 고감도 누전차단기 의무 설치",
      "활선 작업 및 정전 전로 작업 시 5대 안전 수칙(LOTO, 검전, 단락접지) 준수",
    ],
    coreRegulations: [
      {
        article: "안전보건규칙 제301조~제327조 (전기로 인한 위험방지)",
        title: "가설 분전반 누전차단기(30mA 0.03초) 및 외함 접지 의무",
        content:
          "공사 현장의 임시 가설 분전반 및 이동형 코드릴, 전동 공구 회로에는 감도전류 30mA, 동작시간 0.03초 이내의 고감도 누전차단기를 설치하고 외함에 제3종(100Ω 이하/공통접지) 접지공사를 실시하여야 함.",
        fieldApplication:
          "매일 작업 전 가설 분전반 누전차단기 테스트 버튼 가압 점검 및 분전반 외함 접지선 도통 점검.",
        violationPenalty: "작업중지 명령 및 5년 이하 징역 또는 5천만원 이하 벌금",
      },
      {
        article: "안전보건규칙 제319조 (정전전로에서의 작업)",
        title: "정전 작업 5대 안전 절차 (LOTO 및 잔류전하 방전)",
        content:
          "전로를 차단하고 작업할 때에는 ① 전원 차단, ② 개폐기 쇄정(Lock-Out/Tag-Out), ③ 검전기로 무전압 확인, ④ 잔류전하 방전, ⑤ 단락접지기구 장착 절차를 반드시 준수하여야 함.",
        fieldApplication:
          "특고압 수배전반 점검 및 통선 작업 시 스위치 시건장치(LOTO) 장착 및 경고 표지판 게시.",
        violationPenalty: "중대재해 발생 시 대표이사 형사처벌",
      },
      {
        article: "안전보건규칙 제38조 및 제67조 (추락 방지)",
        title: "A형 사다리 최상단 발판 작업 금지 및 고소작업대 안전난간",
        content:
          "천장 트레이 및 배관 포설 시 이동식 A형 사다리 최상단 디딤판 작업은 절대 금지되며(2인 1조 작업), 2m 이상 고소작업 시 이동식 비계(BT아시바)에 안전난간과 아웃트리거를 설치하여야 함.",
        fieldApplication:
          "안전모 턱끈 체결, 안전대 2개 고리 체결 및 하부 신호수 배치.",
        violationPenalty: "과태료 및 현장 퇴출",
      },
    ],
    relatedPhases: [
      ConstructionPhase.PHASE_01_PREPARATION,
      ConstructionPhase.PHASE_03_BASEMENT_STRUCTURE,
      ConstructionPhase.PHASE_07_TRAY_RACEWAY,
      ConstructionPhase.PHASE_09_WIRING_PULLING,
      ConstructionPhase.PHASE_10_SUBSTATION,
      ConstructionPhase.PHASE_12_TEST_COMMISSIONING,
    ],
    relatedWbsRange: "001~100 (전 작업 현장)",
    tags: ["산업안전보건법", "감전예방", "LOTO", "정전작업5대수칙", "사다리안전", "가설누전차단기"],
  },
  {
    id: "LAW-17",
    code: "17",
    title: "중대재해 처벌 등에 관한 법률 (중대재해처벌법)",
    category: "안전/인허가",
    authority: "고용노동부 / 검찰청",
    latestVersionInfo: "법률 제19925호 (최신 50인 미만/50억 미만 사업장 전면 확대 시행)",
    keyPurposes: [
      "사업주 및 경영책임자(대표이사)의 안전보건 확보 의무 구체화",
      "감전, 추락, 협착, 질식 등 중대산업재해 근절",
      "위험성평가(Hazard Identification) 및 작업 전 TBM(Toolbox Meeting) 상시 이행",
    ],
    coreRegulations: [
      {
        article: "제4조 (사업주와 경영책임자등의 안전 및 보건 확보의무)",
        title: "안전보건관리체계 구축 및 위험성평가 상시 실시",
        content:
          "경영책임자는 유해·위험요인을 확인·개선하는 위험성평가를 정기 및 수시로 실시하고, 안전관리 인력·예산을 편성하며 종사자의 의견을 청취하여 개선 조치를 이행하여야 함.",
        fieldApplication:
          "일일 시공일지 내 TBM(작업 전 안전미팅) 서명록 편철, 감전/추락 위험성평가표 작성 후 감리 승인.",
        violationPenalty: "사망사고 발생 시 1년 이상 징역 또는 10억원 이하 벌금 (징벌적 손해배상 최대 5배)",
      },
      {
        article: "제5조 (도급, 용역, 위탁 등 관계에서의 안전 및 보건 확보의무)",
        title: "협력업체(하수급인) 안전보건 관리 평가",
        content:
          "원도급자는 하도급 전기업체의 안전보건 역량을 평가하여 적격 업체를 선정하고, 현장 안전보건 협의체 회의를 매월 개최하여 합동 안전점검을 수행하여야 함.",
        fieldApplication:
          "원·하청 합동 안전점검표 주 1회 작성 및 지적사항 즉시 시정 조치.",
        violationPenalty: "원청 대표이사 동시 형사 입건",
      },
    ],
    relatedPhases: [
      ConstructionPhase.PHASE_01_PREPARATION,
      ConstructionPhase.PHASE_02_GROUNDING,
      ConstructionPhase.PHASE_07_TRAY_RACEWAY,
      ConstructionPhase.PHASE_10_SUBSTATION,
      ConstructionPhase.PHASE_12_TEST_COMMISSIONING,
    ],
    relatedWbsRange: "001~100 (경영 및 현장 안전관리)",
    tags: ["중대재해처벌법", "위험성평가", "TBM안전미팅", "대표이사책임", "안전보건관리체계"],
  },
];
