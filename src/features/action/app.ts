import { App } from './types';

export const appList: App[] = [
  {
    id: 0,
    name: '메시지',
    actions: [
      {
        id: 0,
        urlScheme: 'messages://',
        description: '메시지 앱 열기',
      },
      {
        id: 1,
        urlScheme: 'sms://',
        description: '새로운 메시지',
      },
      {
        id: 2,
        urlSchemeFunc: (param: string) => `sms://${param}`,
        description: '저장된 번호로 메시지 보내기',
        placeholder: '전화번호를 입력해주세요',
        descriptionFunc: (param: string) => `${param}으로 메시지 보내기`,
      },
    ],
  },
  {
    id: 1,
    name: '인스타그램',
    actions: [
      {
        id: 0,
        urlScheme: 'instagram://',
        description: '인스타그램 앱 열기',
      },
      {
        id: 1,
        urlScheme: 'instagram://reels_home',
        description: '인스타그램 릴스 열기',
      },
      {
        id: 2,
        urlScheme: 'instagram://camera',
        description: '인스타그램 스토리 카메라 열기',
      },
      {
        id: 3,
        urlSchemeFunc: (param: string) => `instagram://user?username=${param}`,
        description: '즐겨찾는 유저 페이지로 이동하기',
        placeholder: '@없이 아이디를 입력해주세요',
        descriptionFunc: (param: string) =>
          `@${param} 유저의 페이지로 이동하기`,
      },
    ],
  },
  {
    id: 2,
    name: '토스',
    actions: [
      {
        id: 0,
        urlScheme: 'supertoss://',
        description: '토스 앱 열기',
      },
      {
        id: 1,
        urlScheme: 'supertoss://stock',
        description: '토스증권 열기',
      },
      {
        id: 2,
        urlScheme: 'supertoss://send',
        description: '토스로 송금하기',
      },
    ],
  },
  {
    id: 3,
    name: '유튜브',
    actions: [
      {
        id: 0,
        urlScheme: 'youtube://',
        description: '유튜브 앱 열기',
      },
      {
        id: 1,
        urlScheme: 'youtube://shorts',
        description: '유튜브 쇼츠 열기',
      },
    ],
  },
  {
    id: 4,
    name: '전화',
    actions: [
      {
        id: 0,
        urlScheme: 'tel://',
        description: '전화 앱 열기',
      },
      {
        id: 1,
        urlSchemeFunc: (param: string) => `tel://${param}`,
        description: '저장된 번호로 전화 걸기',
        placeholder: '전화번호를 입력해주세요',
        descriptionFunc: (param: string) => `${param}으로 전화 걸기`,
      },
    ],
  },
  {
    id: 8,
    name: 'FaceTime',
    actions: [
      {
        id: 0,
        urlScheme: 'facetime://',
        description: 'FaceTime 앱 열기',
      },
      {
        id: 1,
        urlSchemeFunc: (param: string) => `facetime://${param}`,
        description: '저장된 번호로 FaceTime 걸기',
        placeholder: '전화번호를 입력해주세요',
        descriptionFunc: (param: string) => `${param}으로 FaceTime 걸기`,
      },
    ],
  },
  {
    id: 5,
    name: '네이버',
    actions: [
      {
        id: 0,
        urlScheme: 'naversearchapp://',
        description: '네이버 앱 열기',
      },
    ],
  },
  {
    id: 6,
    name: '카카오톡',
    actions: [
      {
        id: 0,
        urlScheme: 'kakaotalk://',
        description: '카카오톡 앱 열기',
      },
    ],
  },
  {
    id: 11,
    name: '카카오맵',
    actions: [
      {
        id: 0,
        urlScheme: 'kakaomap://',
        description: '카카오맵 앱 열기',
      },
    ],
  },
  {
    id: 7,
    name: '음악',
    actions: [
      {
        id: 0,
        urlScheme: 'music://',
        description: '음악 앱 열기',
      },
    ],
  },
  {
    id: 9,
    name: '날씨',
    actions: [
      {
        id: 0,
        urlScheme: 'weather://',
        description: '날씨 앱 열기',
      },
    ],
  },
  {
    id: 10,
    name: '파일',
    actions: [
      {
        id: 0,
        urlScheme: 'sharedDocuments://',
        description: 'iCloud Drive 열기',
      },
    ],
  },
  {
    id: 12,
    name: 'GitHub',
    actions: [
      {
        id: 0,
        urlScheme: 'github://',
        description: 'GitHub 앱 열기',
      },
    ],
  },
  {
    id: 13,
    name: '단축어',
    actions: [
      {
        id: 0,
        urlScheme: 'shortcuts://',
        description: '단축어 앱 열기',
      },
      {
        id: 1,
        urlSchemeFunc: (param: string) =>
          `shortcuts://run-shortcut?name=${param}`,
        description: '저장된 단축어 실행하기',
        placeholder: '단축어 이름을 입력해주세요',
        descriptionFunc: (param: string) => `${param} 단축어 실행하기`,
      },
    ],
  },
];
