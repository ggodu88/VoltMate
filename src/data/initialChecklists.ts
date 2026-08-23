import { ConstructionPhase, InspectionTemplateItem } from "../types";

export const INITIAL_CHECKLISTS: InspectionTemplateItem[] = [
  // 1. 착공 및 사전준비
  {
    id: "CHK-101",
    phase: ConstructionPhase.INITIATION,
    category: "인허가/서류",
    title: "현장대리인 선임계 및 자격 확인",
    criteria: "전기공사업법 기준에 적합한 기술인 경력수첩 등급 확인 및 상주 여부",
    kecRef: "전기공사업법 제12조",
  },
  {
    id: "CHK-102",
    phase: ConstructionPhase.INITIATION,
    category: "접지공사",
    title: "기초 매설 접지극 시공 깊이 및 나동선 규격",
    criteria: "매설 깊이 0.75m 이상, 나동연선 규격(95sq 이상) 및 열화학용접 접속 견고성",
    kecRef: "KEC 140 접지시스템",
  },
  {
    id: "CHK-103",
    phase: ConstructionPhase.INITIATION,
    category: "가설전기",
    title: "임시 가설 분전함 접지 및 누전차단기 정격",
    criteria: "전 분전함 외함 접지 연결 및 정격감도 30mA/0.03초 ELB 취부 동작 시험",
    kecRef: "산안법 제329조",
  },

  // 2. 골조 매입 및 배관·배선
  {
    id: "CHK-201",
    phase: ConstructionPhase.STRUCTURE_CONDUIT,
    category: "슬래브 배관",
    title: "슬래브 콘크리트 타설 전 배관 굴곡반경 및 결속",
    criteria: "굴곡반경 관경의 6배 이상, 지지간격 1.0m 이하, 3단 교차 방지 분산 배관",
    kecRef: "KEC 232.11 합성수지관",
  },
  {
    id: "CHK-202",
    phase: ConstructionPhase.STRUCTURE_CONDUIT,
    category: "케이블트레이",
    title: "케이블 트레이 행거 지지 간격 및 본딩 점퍼선",
    criteria: "행거 지지간격 2.0m 이내, 접속개소 본딩 점퍼선(16sq 이상) 체결 및 도통 상태",
    kecRef: "KEC 232.41 케이블트레이",
  },
  {
    id: "CHK-203",
    phase: ConstructionPhase.STRUCTURE_CONDUIT,
    category: "배선공사",
    title: "KEC 전선 식별 색상 및 입선 후 절연저항",
    criteria: "L1(갈), L2(흑), L3(회), N(청), PE(녹황) 준수 및 선간/대지간 절연저항 50MΩ 이상",
    kecRef: "KEC 121 전선의 식별",
  },

  // 3. 수변전 및 주요기기 설치
  {
    id: "CHK-301",
    phase: ConstructionPhase.SUBSTATION_EQUIPMENT,
    category: "수배전반",
    title: "수배전반 큐비클 수평도 및 내진 앵커 체결",
    criteria: "바닥 레벨링 오차 2mm 이내, 앵커볼트 규정 토크 체결 및 비틀림 없음",
    kecRef: "KEC 320 특고압 수전설비",
  },
  {
    id: "CHK-302",
    phase: ConstructionPhase.SUBSTATION_EQUIPMENT,
    category: "모선접속",
    title: "주모선(Busbar) 접속부 체결 토크 및 마킹",
    criteria: "토크렌치 사용 규정 토크 인가, 토크마크(씰) 표시 및 절연 이격거리 확보",
    kecRef: "KS C 8401 배전반",
  },
  {
    id: "CHK-303",
    phase: ConstructionPhase.SUBSTATION_EQUIPMENT,
    category: "비상발전기",
    title: "발전기 방진 스프링 마운트 및 ATS 인터록",
    criteria: "방진마운트 레벨 및 플렉시블 조인트 시공, 상용-발전 역송 방지 인터록 정상",
    kecRef: "KEC 150 비상발전",
  },

  // 4. 마감 기구 및 단말 결선
  {
    id: "CHK-401",
    phase: ConstructionPhase.FINISH_FIXTURE,
    category: "분전반 결선",
    title: "분전반 차단기 단자 볼트 조임 및 회로 명판",
    criteria: "단자 탈피길이 적정 및 페룰단자 압착, 3상 불평형률 30% 이내 밸런싱, 도어 결선도",
    kecRef: "KEC 232 분전반",
  },
  {
    id: "CHK-402",
    phase: ConstructionPhase.FINISH_FIXTURE,
    category: "배선기구",
    title: "콘센트 극성(중성선/전압선) 및 접지극 도통",
    criteria: "좌측 중성선, 우측 전압선, 접지극 정상 접촉 및 습기 장소 방우형 커버",
    kecRef: "KEC 234.3 배선기구",
  },
  {
    id: "CHK-403",
    phase: ConstructionPhase.FINISH_FIXTURE,
    category: "조명기구",
    title: "조명기구 천장 보강 지지 및 스위치 전압선 결선",
    criteria: "5kg 이상 등기구 전용 행거 체결, 스위치 핫라인(전압선) 결선 확인",
    kecRef: "KEC 234 조명설비",
  },

  // 5. 시험·측정 및 종합시운전
  {
    id: "CHK-501",
    phase: ConstructionPhase.TESTING_COMMISSIONING,
    category: "절연/접지시험",
    title: "저압 전로 절연저항 및 고장루프임피던스(Zs)",
    criteria: "전 회로 절연저항 1.0MΩ 이상(신설 50MΩ 이상), 0.4초 이내 자동차단 조건 만족",
    kecRef: "KEC 132 & KEC 211",
  },
  {
    id: "CHK-502",
    phase: ConstructionPhase.TESTING_COMMISSIONING,
    category: "내전압시험",
    title: "특고압 케이블 및 변압기 절연내력 시험",
    criteria: "최대사용전압 기준 VLF 15분간 인가 시 누설전류 및 절연파괴 이상 없음",
    kecRef: "기술기준 제13조",
  },
  {
    id: "CHK-503",
    phase: ConstructionPhase.TESTING_COMMISSIONING,
    category: "시운전",
    title: "정전 모의 비상발전기 10초 기동 및 ATS 절체",
    criteria: "상용정전 시 10초 이내 발전기 정격전압 도달 및 소방 비상부하 정상 급전",
    kecRef: "NFPC 602 비상전원",
  },

  // 6. 사용전검사 및 준공인계
  {
    id: "CHK-601",
    phase: ConstructionPhase.COMPLETION_HANDOVER,
    category: "사용전검사",
    title: "KESCO 사용전검사 수검 및 합격필증",
    criteria: "한국전기안전공사 검사관 입회 수검 완료 및 검사합격확인증 원본 인수",
    kecRef: "전기사업법 제63조",
  },
  {
    id: "CHK-602",
    phase: ConstructionPhase.COMPLETION_HANDOVER,
    category: "본수전",
    title: "한전 본수전 투입 및 전력량계(MOF) 봉인",
    criteria: "책임분계점 개폐기 투입, 수전전압 확인 및 계량기 봉인 상태 일치",
    kecRef: "한전 전기공급약관",
  },
  {
    id: "CHK-603",
    phase: ConstructionPhase.COMPLETION_HANDOVER,
    category: "준공인계",
    title: "As-Built 준공도면 및 시험성적서철 편철 인계",
    criteria: "현장 변경 100% 반영 준공도면, 시공사진첩, 성적서 바인더 발주처 날인 인계",
    kecRef: "전기공사업법 제13조",
  },
];
