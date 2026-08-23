import { ConstructionMethod, ConstructionPhase } from "../../types";

export const PHASE_06_METHODS: ConstructionMethod[] = [
  {
    id: "METH-035",
    wbsCode: "035",
    phase: ConstructionPhase.PHASE_06_NON_STRUCTURAL,
    title: "세대 조적벽체(욕실/발코니) 먹매김 확인 및 컷팅 홈파기(Chipping)",
    category: "비구조벽 배관",
    summary:
      "욕실 젠다이(선반 조적벽), 발코니 칸막이벽 등 시멘트 벽돌 조적벽체 쌓기 전후 스위치/콘센트 매입 배관을 위해 벽돌 줄눈에 맞춘 수직 먹매김 후 집진형 컷팅기로 홈파기(Chipping) 가공을 정밀 시공하는 공정.",
    steps: [
      {
        stepNumber: 1,
        name: "조적벽 먹선 확인 및 수직 배관선 마킹",
        description: "조적면 바닥에서 슬래브 상부까지 배관 경로를 먹줄로 마킹하고 박스 매입 위치를 표시.",
        caution: "벽돌 가로 컷팅은 구조적 취약성을 유발하므로 반드시 수직 컷팅 원칙 준수.",
      },
      {
        stepNumber: 2,
        name: "집진형 휠 컷터 2열 홈파기 절단",
        description: "분진 포집 청소기가 연결된 2열 휠 컷터로 배관 폭(30mm) 및 깊이(40mm)에 맞춰 절단선 가공.",
        caution: "벽돌 두께의 1/3을 초과하여 과도하게 파내지 않도록 깊이 게이지 세팅.",
      },
      {
        stepNumber: 3,
        name: "치핑기(Chipping Hammer) 잔재 제거 및 분진 청소",
        description: "소형 전동 파쇄기로 내부 벽돌 잔재를 털어내고 송풍기로 분진을 완전 청소.",
        caution: "조적벽 흔들림이나 줄눈 모르타르 탈락 방지.",
      },
    ],
    materials: ["집진형 컷팅날", "마킹 분필", "청소용 브러시"],
    tools: ["집진식 홈파기 전용 컷터", "소형 치핑 해머", "산업용 진공청소기"],
    kecStandards: "건축공사 표준시방서 조적공사, KCS 31 60 10",
    safetyPoints: [
      "벽돌 컷팅 분진(규사) 흡입 방지 특급 방진마스크 착용 필수",
      "고속 회전 컷팅날 파손 대비 안전 덮개 장착 및 보안경 착용",
    ],
    qualityInspection: [
      "홈파기 깊이(배관 외경 + 15mm 이상 확보)",
      "수직 절단 정밀도(기울기 오차 3mm 이내)",
      "벽돌 균열 및 파손 유무 점검",
    ],
    defectPrevention: ["홈파기 깊이 부족으로 인한 타일 마감면 배관 돌출 및 타일 들뜸 하자 예방"],
    updatedAt: "2026-08-22",
  },
  {
    id: "METH-036",
    wbsCode: "036",
    phase: ConstructionPhase.PHASE_06_NON_STRUCTURAL,
    title: "조적벽 배관 매입 및 매입 박스 타일 마감선 기준 레벨링",
    category: "비구조벽 배관",
    summary:
      "가공된 조적벽 홈에 난연 CD관을 매입하고, 욕실 벽 타일 압착 붙임 두께(타일 두께 8mm + 압착 본드 10mm = 약 18~20mm)를 정밀 계산하여 아웃렛 박스 전면을 타일 마감선에 맞춰 돌출 레벨링 고정하는 공정.",
    steps: [
      {
        stepNumber: 1,
        name: "타일 마감 기준실(기준 먹선) 확인",
        description: "타일 시공팀의 떠붙임/압착 기준 먹선을 확인하고 박스 돌출 깊이를 확정.",
        caution: "박스가 벽돌면 안쪽으로 너무 깊이 묻히면 스위치/콘센트 나사 체결 불가.",
      },
      {
        stepNumber: 2,
        name: "조적벽 전용 박스 고정 및 철선/못 결속",
        description: "박스 귀퉁이를 조적 줄눈에 못이나 앙카로 고정하고 배관을 홈에 밀착.",
        caution: "비데 콘센트, 드라이기 콘센트 수평 레벨기로 오차 1mm 이내 정렬.",
      },
      {
        stepNumber: 3,
        name: "타일 깊이 조절용 연장 익스텐션 링 장착",
        description: "벽돌 깊이에 따라 10~25mm 깊이 조절 링(Extension Ring)을 덧대어 타일면과 1:1 수평 유지.",
        caution: "박스 전면 보호 캡 부착으로 타일 시멘트 유입 차단.",
      },
    ],
    materials: ["조적용 아웃렛 박스", "익스텐션 조절 링", "난연 CD관(16C)", "박스 고정 핀"],
    tools: ["자석 수평기", "임팩 드라이버", "줄자"],
    kecStandards: "KEC 232 배선설비, KCS 31 60 10",
    safetyPoints: [
      "조적벽 타공 시 벽체 전도 방지 손으로 지지",
    ],
    qualityInspection: [
      "타일 마감선과 박스 전면 돌출 일치도(±2mm 이내)",
      "스위치 박스 수평도",
      "배관 매입 깊이(벽돌면 내측 10mm 이상 매설)",
    ],
    defectPrevention: ["타일 시공 후 박스 함몰로 인한 플레이트 들뜸 및 기구 취부 불량 방지"],
    updatedAt: "2026-08-22",
  },
  {
    id: "METH-037",
    wbsCode: "037",
    phase: ConstructionPhase.PHASE_06_NON_STRUCTURAL,
    title: "조적벽 수경성 모르타르 완전 사춤 및 균열 방지 메쉬 테이프 부착",
    category: "비구조벽 배관",
    summary:
      "배관 매입 홈파기 구간에 빈틈없이 수경성 무수축 시멘트 모르타르를 100% 밀실 사춤(Grouting)하고, 사춤부 건조 수축에 의한 미세 균열 및 타일 줄눈 터짐을 방지하기 위해 유리섬유 메쉬 테이프를 전면 부착 마감하는 공정.",
    steps: [
      {
        stepNumber: 1,
        name: "홈파기 내부 물축임 및 프라이머 도포",
        description: "모르타르 접착력 증대를 위해 분무기로 벽돌 내부를 충분히 습윤 상태로 물축임.",
        caution: "건조한 벽돌이 모르타르의 수분을 급격히 흡수하면 푸석거림(소결 불량) 발생.",
      },
      {
        stepNumber: 2,
        name: "수경성 무수축 모르타르 100% 밀실 사춤",
        description: "흙손 및 고무 헤라를 사용하여 배관 배면과 측면 공극이 전혀 없도록 모르타르를 꽉 채워 미장.",
        caution: "사춤 면이 조적벽 표면보다 튀어나오지 않도록 평활하게 미장.",
      },
      {
        stepNumber: 3,
        name: "유리섬유 크랙 방지 메쉬 테이프 부착",
        description: "모르타르 경화 전 폭 100mm 내알칼리성 글라스 파이버 메쉬를 사춤선 중앙에 덮고 눌러 일체화.",
        caution: "메쉬가 들뜨거나 구겨지지 않도록 밀착.",
      },
    ],
    materials: ["무수축 사춤 모르타르", "내알칼리성 유리섬유 메쉬(100mm)", "접착 증강제"],
    tools: ["미장 흙손(헤라)", "모르타르 믹서기", "분무기"],
    kecStandards: "건축공사 표준시방서 미장공사, KCS 31 60 10",
    safetyPoints: [
      "시멘트 알칼리 독성에 의한 피부염 방지 고무장갑 착용",
    ],
    qualityInspection: [
      "사춤부 타격음 검사(통통 울리는 빈 소리 없이 꽉 찬 소리 확인)",
      "사춤 표면 평탄도(조적면과 1:1 일치)",
      "글라스 메쉬 테이프 부착 상태",
    ],
    defectPrevention: ["배관 배면 공극으로 인한 타일 압착 불량 및 수직 크랙 발생 하자 원천 차단"],
    updatedAt: "2026-08-22",
  },
  {
    id: "METH-038",
    wbsCode: "038",
    phase: ConstructionPhase.PHASE_06_NON_STRUCTURAL,
    title: "경량벽체 C-스터드 관통 홀 가공 및 전선 손상 방지 보호 부싱 체결",
    category: "경량벽체 배관",
    summary:
      "석고보드 경량 건식벽체 내부의 아연도금 C-스터드(C-Stud 50형/65형/100형)를 수평 관통하여 배관할 때, 날카로운 철판 단면에 의한 전선관/전선 찢김 파손을 방지하기 위해 펀칭 홀에 전용 플라스틱 스터드 보호 부싱(Grommet Bushing)을 체결하는 공정.",
    steps: [
      {
        stepNumber: 1,
        name: "C-스터드 공장 펀칭 홀 확인 및 추가 타공",
        description: "스터드 중앙부에 형성된 표준 타공 홀을 이용하거나 스터드 전용 홀 펀처로 지름 32mm 원형 홀 가공.",
        caution: "스터드 플랜지(날개)를 훼손하지 않도록 웨브(중앙부)에만 타공.",
      },
      {
        stepNumber: 2,
        name: "원터치 스터드 절연 보호 부싱 스냅 체결",
        description: "날카로운 아연도금 강판 절단면에 난연 ABS 플라스틱 보호 부싱을 '딸깍' 소리가 나도록 완벽 삽입 체결.",
        caution: "부싱 체결 없이 배관을 직접 금속 홀에 통과시키는 행위 엄격 금지.",
      },
      {
        stepNumber: 3,
        name: "전선관 관통 인입 및 유동 검사",
        description: "부싱 내부로 가요전선관을 통과시키고 긁힘 없이 부드럽게 관통되는지 확인.",
        caution: "벽체 스터드 간격(450mm)마다 부싱 전수 설치.",
      },
    ],
    materials: ["스터드 전용 보호 부싱(16~22mm 겸용)", "난연 플라스틱 그로밋"],
    tools: ["스터드 유압 펀처", "핸드 디버링 툴", "보안경"],
    kecStandards: "KEC 232.13 금속가요전선관공사, KCS 31 60 10",
    safetyPoints: [
      "날카로운 스터드 강판 절단면에 의한 손 베임 방지 방검장갑 착용",
    ],
    qualityInspection: [
      "스터드 관통 홀 보호 부싱 체결율(100% 전수 체결)",
      "부싱 이탈 및 파손 유무",
      "스터드 구조 단면 손상 여부",
    ],
    defectPrevention: ["건물 미세 진동 시 스터드 날카로운 모서리에 전선관이 쓸려 피복이 벗겨지는 누전/화재 결함 원천 차단"],
    updatedAt: "2026-08-22",
  },
  {
    id: "METH-039",
    wbsCode: "039",
    phase: ConstructionPhase.PHASE_06_NON_STRUCTURAL,
    title: "경량벽체 금속제 가요전선관(SF/GW관) 배관 및 꺾임 방지 고정",
    category: "경량벽체 배관",
    summary:
      "KEC 개정 규정에 따라 불연재료가 아닌 이중천장 및 경량벽체 내부에는 난연 CD관 사용이 금지되므로, 1종/2종 금속제 가요전선관(Flexible Metal Conduit: SF 또는 방습형 GW관)을 배관하고 스터드에 전용 클램프로 1.0m 이내마다 견고히 고정하는 공정.",
    steps: [
      {
        stepNumber: 1,
        name: "금속제 가요전선관(SF 16호/22호) 재단 및 커넥터 조립",
        description: "전용 가요관 캇타기로 강대(Steel Strip)의 풀림 없이 직각 절단 후 금속제 박스 커넥터 체결.",
        caution: "절단면 내부의 날카로운 바리(Burr) 제거용 인서트 부싱 삽입.",
      },
      {
        stepNumber: 2,
        name: "스터드 통과 배관 및 전용 클립 고정",
        description: "보호 부싱을 통과한 가요전선관을 스터드 측면에 전용 스냅 온(Snap-on) 클립으로 1.0m 이내마다 고정.",
        caution: "가요관의 최소 굴곡반경(관 안지름의 6배 이상) 유지.",
      },
      {
        stepNumber: 3,
        name: "박스 콘넥터 접지 연속성 본딩 체결",
        description: "철재 아웃렛 박스와 가요전선관 금속 커넥터의 로크너트를 임팩트로 강하게 체결하여 금속관 접지 연속성 확보.",
        caution: "도통 시험을 통해 박스와 전선관 간 접촉저항 0.1Ω 이하 확인.",
      },
    ],
    materials: ["금속제 가요전선관(SF-16/22)", "가요관 전용 금속 콘넥터", "스터드 고정 클립", "인서트 부싱"],
    tools: ["가요관 전용 절단기(Rotary Cutter)", "워터펌프 플라이어", "토크 드라이버"],
    kecStandards: "KEC 232.13 금속제 가요전선관공사, KEC 232.11 (이중천장 내 합성수지관 금지)",
    safetyPoints: [
      "금속관 절단 강대 파편 비산 방지 보안경 착용",
    ],
    qualityInspection: [
      "불연성 금속제 가요전선관(SF관) 적용 여부",
      "지지 간격(1.0m 이하, 박스 전후 0.3m 이내 고정)",
      "금속관 접지 본딩 도통 상태",
    ],
    defectPrevention: ["경량벽체 내 화재 발생 시 전선관 용융 및 화염 확산 방지(화재안전기준 완벽 충족)"],
    updatedAt: "2026-08-22",
  },
  {
    id: "METH-040",
    wbsCode: "040",
    phase: ConstructionPhase.PHASE_06_NON_STRUCTURAL,
    title: "경량벽체 스터드 전용 철물 브래킷 장착 및 석고보드 2P 레벨 조정",
    category: "경량벽체 배관",
    summary:
      "석고보드 2겹(2P, 9.5mm×2 = 19mm 또는 12.5mm×2 = 25mm) 취부 후 스위치/콘센트 플레이트가 벽면에 들뜨거나 함몰되지 않도록 스터드와 스터드 사이에 신축형 철물 브래킷(Bar Hanger)을 장착하여 박스 깊이를 마감면에 1:1로 맞추는 공정.",
    steps: [
      {
        stepNumber: 1,
        name: "스터드 간격(450mm) 브래킷 철물 고정",
        description: "양측 C-스터드 사이에 신축 슬라이딩 바 행거(Bar Hanger) 철물을 피스 4개로 수평 고정.",
        caution: "기구 중심 높이(스위치 1200mm, 콘센트 300mm) 레이저 레벨 정렬.",
      },
      {
        stepNumber: 2,
        name: "석고보드 2P 깊이 조절 박스 체결",
        description: "바 행거 중앙에 철재 박스를 장착하고 석고보드 두께(19mm 또는 25mm) 게이지에 맞춰 전면 돌출 깊이 세팅.",
        caution: "석고보드 타공선과 박스 테두리 간 유격 5mm 이내 유지.",
      },
      {
        stepNumber: 3,
        name: "전선관 결속 및 박스 보호 커버 장착",
        description: "가요관 콘넥터를 결합하고 석고보드 퍼티(줄퍼티/올퍼티) 및 페인트/도배 시 오염 방지 커버 장착.",
        caution: "석고보드 취부 시 피스가 박스 내부 배선을 관통하지 않도록 위치 마킹.",
      },
    ],
    materials: ["스터드 신축 브래킷(바 행거)", "4각 철재 박스", "보호 플라스틱 캡", "고정 피스"],
    tools: ["레이저 수평레벨기", "전동 충전 드라이버", "석고보드 두께 게이지"],
    kecStandards: "KCS 31 60 10, 건축공사 표준시방서 건식벽체공사",
    safetyPoints: [
      "전동 드라이버 비트 헛돎에 의한 손 부상 방지",
    ],
    qualityInspection: [
      "석고보드 마감면 대비 박스 돌출 일치도(단차 1mm 이내)",
      "바 행거 처짐 강도(10kg 하중 시 변형 없음)",
      "박스 수평 수직 직각도",
    ],
    defectPrevention: ["석고보드 마감 후 콘센트 플러그 삽입 시 박스가 벽 속으로 밀려 들어가는 파손 하자 방지"],
    updatedAt: "2026-08-22",
  },
  {
    id: "METH-041",
    wbsCode: "041",
    phase: ConstructionPhase.PHASE_06_NON_STRUCTURAL,
    title: "석고보드 타카/피스 관통 방지용 강판 네일 플레이트(Nail Plate) 부착",
    category: "경량벽체 배관",
    summary:
      "건식벽체 석고보드 취부 목수 및 인테리어 선반/TV 취부 시 시공되는 긴 매거진 피스나 타카 핀이 스터드를 관통하는 전선관을 찔러 단락(합선) 및 감전 사고를 유발하는 것을 막기 위해 스터드 전면에 고경도 방호 강판(Nail Plate)을 부착하는 공정.",
    steps: [
      {
        stepNumber: 1,
        name: "스터드 관통 배관 위치 전수 마킹",
        description: "전선관이 스터드를 통과하는 모든 스터드 전면부에 네일 플레이트 부착 위치 확인 마킹.",
        caution: "벽체 양면(전면/후면)에서 피스가 시공되므로 양면 모두 방호 필요.",
      },
      {
        stepNumber: 2,
        name: "1.6mm 이상 아연도금 열처리 강판 플레이트 압입",
        description: "스터드 플랜지 외면에 갈고리 톱니가 달린 네일 플레이트(폭 40mm, 길이 75mm 이상)를 해머로 압입 고정.",
        caution: "피스가 강판을 절대 뚫지 못하는 고경도 열처리 강판 규격 확인.",
      },
      {
        stepNumber: 3,
        name: "석고보드 시공팀과 간섭 및 감리 검측",
        description: "석고보드가 들뜨지 않도록 평활하게 밀착 장착되었는지 전수 확인하고 사진 대지 작성.",
        caution: "네일 플레이트 누락 구간 발생 시 즉시 보완 조치.",
      },
    ],
    materials: ["네일 플레이트(1.6t 아연도금 열처리 강판)", "고정 클립"],
    tools: ["우레탄 해머", "두께 게이지", "검측 카메라"],
    kecStandards: "NEC 300.4 Protection Against Physical Damage, KEC 232",
    safetyPoints: [
      "플레이트 모서리 날카로운 톱니 취급 시 절단방지 안전장갑 착용",
    ],
    qualityInspection: [
      "스터드 관통부 네일 플레이트 설치율(100% 전수 설치)",
      "강판 두께(1.6mm 이상)",
      "석고보드 들뜸 유발 여부",
    ],
    defectPrevention: ["입주 후 입주민 액자/TV 벽걸이 타공 시 전선 관통 감전 및 누전 차단기 트립 하자 원천 차단"],
    updatedAt: "2026-08-22",
  },
  {
    id: "METH-042",
    wbsCode: "042",
    phase: ConstructionPhase.PHASE_06_NON_STRUCTURAL,
    title: "커뮤니티 시설(피트니스/골프장) 운동기구 동력 및 냉난방 배관",
    category: "커뮤니티 배관",
    summary:
      "단지 내 주민공동시설(피트니스 센터 트레드밀 런닝머신 군, 실내 스크린골프 타석기/오토티업기, 사우나실)의 고용량 동력 전원, 3상 냉난방기 및 환기 시스템 전원 배관을 바닥 트렌치/무근 콘크리트 및 천장 트레이로 포설하는 공정.",
    steps: [
      {
        stepNumber: 1,
        name: "기구 배치도(Layout) 대조 바닥 먹매김",
        description: "런닝머신 1대당 2.0kW, 스크린골프 타석당 1.5kW 부하를 고려하여 기구별 전원 인출구 바닥 마킹.",
        caution: "기구 진동에 따른 배관 파손을 방지하기 위해 이동 통로가 아닌 기구 하단에 인출.",
      },
      {
        stepNumber: 2,
        name: "바닥 매입 배관(HI-PVC/강관) 및 알루미늄 플로어 박스 설치",
        description: "바닥 무근 타설 전 22C 배관을 포설하고 기구 하부에 방수형 황동/알루미늄 플로어 박스 거치.",
        caution: "물청소 시 침수를 방지하기 위해 플로어 박스 패킹 밀봉 및 지수 처리.",
      },
      {
        stepNumber: 3,
        name: "사우나실 내열/방수 배선 관로 시공",
        description: "습기 및 고온 환경인 사우나실은 실리콘 절연 내열전선 및 SUS 배관으로 관로 분리.",
        caution: "사우나 히터 제어반 외함 독립 접지선 연접.",
      },
    ],
    materials: ["플로어 아웃렛 박스(황동/AL)", "후강금속관/HI-PVC관", "방수 가스켓"],
    tools: ["레이저 레벨기", "배관 벤더", "수평기"],
    kecStandards: "KEC 241 특수설비, KEC 242.1 목욕실 및 사우나",
    safetyPoints: [
      "다중이용시설 감전 예방 고감도 누전차단기(15mA) 적용 확인",
    ],
    qualityInspection: [
      "트레드밀 기구별 전용 회로 분기(1회로당 최대 2대 제한)",
      "플로어 박스 마감 바닥면(타일/에폭시)과 수평 일치성",
      "스크린골프 빔프로젝터 천장 보강 브래킷 위치",
    ],
    defectPrevention: ["런닝머신 다수 동시 기동 시 전압강하로 인한 인버터 다운 및 바닥 플로어박스 누수 방지"],
    updatedAt: "2026-08-22",
  },
  {
    id: "METH-043",
    wbsCode: "043",
    phase: ConstructionPhase.PHASE_06_NON_STRUCTURAL,
    title: "관리사무소·경로당·어린이집 전용 분전반 거치 및 관로 시공",
    category: "커뮤니티 배관",
    summary:
      "단지 관리동(관리사무소, 방재실, 입주자대표회의실), 경로당, 단지 내 국공립 어린이집의 독립적인 전기 요금 정산 및 안전 관리를 위해 전용 배전반/분전반을 벽체에 거치하고 전등/전열/냉난방 관로를 구축하는 공정.",
    steps: [
      {
        stepNumber: 1,
        name: "시설별 전자식 전력량계(한전 모자분리) 연계 위치 확정",
        description: "어린이집 및 경로당의 전기요금 복지할인 및 독립 계량을 위한 한전 계량기 취부 공간 확보.",
        caution: "검침 및 유지보수가 용이한 관리실 인접 복도 벽체 선정.",
      },
      {
        stepNumber: 2,
        name: "매입/노출 분전반 거치 및 간선 배관 인입",
        description: "전기실 메인 저압반에서 공급되는 간선 케이블(TFR-CV) 배관을 분전반 상·하부에 연결.",
        caution: "어린이집 구역은 영유아 손길이 닿지 않도록 분전반 바닥 높이 +1,800mm 이상 유지 및 시건장치 설치.",
      },
      {
        stepNumber: 3,
        name: "어린이집 안전 콘센트 회로 관로 구성",
        description: "어린이 감전 사고를 방지하는 셔터형 안전 콘센트(바닥 +1.2m 이상 설치 권장) 전용 배관 포설.",
        caution: "모든 분기 회로에 인체감전보호용 누전차단기(30mA 0.03초) 적용.",
      },
    ],
    materials: ["전용 스테인리스 분전반", "전자식 전력량계 함", "난연 배관재", "시건장치"],
    tools: ["수평기", "임팩트 드릴", "압착기"],
    kecStandards: "영유아보육법 시행규칙(안전시설기준), KEC 232",
    safetyPoints: [
      "어린이집 벽체 콘센트 감전 방지 안전 덮개 필수 장착",
    ],
    qualityInspection: [
      "시설별 독립 계량기 배선 결선 정확도",
      "분전반 도어 잠금장치 작동 상태",
      "피난유도등 및 비상조명 회로 독립 분기 여부",
    ],
    defectPrevention: ["공용 관리비 분쟁 방지를 위한 계량기 결선 오류 및 어린이 접촉 감전 사고 원천 방지"],
    updatedAt: "2026-08-22",
  },
];
