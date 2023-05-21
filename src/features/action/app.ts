import { App } from './types';

export const SHORTCUT_ID = 1000;
export const CUSTOM_URL_SCHEME_ID = 1001;

export const appList: App[] = [
  {
    id: 47,
    name: '나의 찾기',
    actions: [
      {
        id: 0,
        urlScheme: 'fmip1://',
        description: '나의 찾기 앱 열기',
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
    id: 25,
    name: '네이버 메일',
    actions: [
      {
        id: 0,
        urlScheme: 'navermail://',
        description: '네이버 메일 앱 열기',
      },
    ],
  },
  {
    id: 28,
    name: '네이버 블로그',
    actions: [
      {
        id: 0,
        urlScheme: 'naverblog://',
        description: '네이버 블로그 앱 열기',
      },
    ],
  },
  {
    id: 27,
    name: '네이버 지도',
    actions: [
      {
        id: 0,
        urlScheme: 'navermap://',
        description: '네이버 지도 앱 열기',
      },
    ],
  },
  {
    id: 29,
    name: '네이버 카페',
    actions: [
      {
        id: 0,
        urlScheme: 'navercafe://',
        description: '네이버 카페 앱 열기',
      },
    ],
  },
  {
    id: SHORTCUT_ID,
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
  {
    id: 43,
    name: '당근마켓',
    actions: [
      {
        id: 0,
        urlScheme: 'daangn://',
        description: '당근마켓 앱 열기',
      },
    ],
  },
  {
    id: 13,
    name: '메모',
    actions: [
      {
        id: 0,
        urlScheme: 'mobilenotes://',
        description: '메모 앱 열기',
      },
    ],
  },
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
    id: 24,
    name: '멜론',
    actions: [
      {
        id: 0,
        urlScheme: 'fb329785880437397://',
        description: '멜론 앱 열기',
      },
    ],
  },
  {
    id: 15,
    name: '미리 알림',
    actions: [
      {
        id: 0,
        urlScheme: 'x-apple-reminderkit://',
        description: '미리 알림 앱 열기',
      },
    ],
  },
  {
    id: 33,
    name: '배달의 민족',
    actions: [
      {
        id: 0,
        urlScheme: 'smartbaedal://	',
        description: '배달의 민족 앱 열기',
      },
    ],
  },
  {
    id: 34,
    name: '비트윈',
    actions: [
      {
        id: 0,
        urlScheme: 'between://	',
        description: '비트윈 앱 열기',
      },
    ],
  },
  {
    id: 16,
    name: '사진',
    actions: [
      {
        id: 0,
        urlScheme: 'photos-redirect://',
        description: '사진 앱 열기',
      },
    ],
  },
  {
    id: 17,
    name: '설정',
    actions: [
      {
        id: 0,
        urlScheme: 'App-prefs://',
        description: '설정 열기',
      },
    ],
  },
  {
    id: 42,
    name: '스타벅스',
    actions: [
      {
        id: 0,
        urlScheme: 'starbucks://',
        description: '스타벅스 앱 열기',
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
    id: 19,
    name: '주식',
    actions: [
      {
        id: 0,
        urlScheme: 'stocks://',
        description: '주식 앱 열기',
      },
    ],
  },
  {
    id: 18,
    name: '지갑',
    actions: [
      {
        id: 0,
        urlScheme: 'shoebox://',
        description: '지갑 앱 열기',
      },
    ],
  },
  {
    id: 20,
    name: '지도',
    actions: [
      {
        id: 0,
        urlScheme: 'map://',
        description: '지도 앱 열기',
      },
    ],
  },
  {
    id: 41,
    name: '카카오 T',
    actions: [
      {
        id: 0,
        urlScheme: 'kakaot://',
        description: '카카오 T 앱 열기',
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
    id: 23,
    name: '카카오페이',
    actions: [
      {
        id: 0,
        urlScheme: 'kakaopay://',
        description: '카카오페이 앱 열기',
      },
    ],
  },
  {
    id: 14,
    name: '캘린더',
    actions: [
      {
        id: 0,
        urlScheme: 'calshow://',
        description: '캘린더 앱 열기',
      },
    ],
  },
  {
    id: 38,
    name: '쿠팡',
    actions: [
      {
        id: 0,
        urlScheme: 'coupang://	',
        description: '쿠팡 앱 열기',
      },
    ],
  },
  {
    id: 40,
    name: '테이블링',
    actions: [
      {
        id: 0,
        urlScheme: 'tabling://',
        description: '테이블링 앱 열기',
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
    id: 37,
    name: '현대카드',
    actions: [
      {
        id: 0,
        urlScheme: 'hyundaicardappcard://	',
        description: '현대카드 앱 열기',
      },
    ],
  },
  {
    id: 26,
    name: 'BAND',
    actions: [
      {
        id: 0,
        urlScheme: 'bandapp://',
        description: 'BAND 앱 열기',
      },
    ],
  },
  {
    id: 44,
    name: 'Chrome',
    actions: [
      {
        id: 0,
        urlScheme: 'googlechrome://',
        description: 'Chrome 앱 열기',
      },
    ],
  },
  {
    id: 35,
    name: 'Facebook',
    actions: [
      {
        id: 0,
        urlScheme: 'fb://	',
        description: 'Facebook 앱 열기',
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
      {
        id: 2,
        urlSchemeFunc: (param: string) => `facetime-audio://${param}`,
        description: '저장된 번호로 FaceTime 음성 통화 걸기',
        placeholder: '전화번호를 입력해주세요',
        descriptionFunc: (param: string) => `${param}으로 음성 FaceTime 걸기`,
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
    id: 45,
    name: 'Gmail',
    actions: [
      {
        id: 0,
        urlScheme: 'googlegmail://',
        description: 'Gmail 앱 열기',
      },
    ],
  },
  {
    id: 32,
    name: 'GoodNotes 5',
    actions: [
      {
        id: 0,
        urlScheme: 'goodnotes5://',
        description: 'GoodNotes 5 앱 열기',
      },
    ],
  },
  {
    id: 49,
    name: 'Google',
    actions: [
      {
        id: 0,
        urlScheme: 'google://',
        description: 'Google 앱 열기',
      },
    ],
  },
  {
    id: 21,
    name: 'Google 캘린더',
    actions: [
      {
        id: 0,
        urlScheme: 'com.google.calendar://',
        description: 'Google 캘린더 앱 열기',
      },
      {
        id: 1,
        urlScheme: 'com.google.calendar://?action=create',
        description: 'Google 캘린더 일정 추가',
      },
      {
        id: 0,
        urlScheme: 'com.google.calendar://',
        description: 'Google 캘린더 앱 열기',
      },
    ],
  },
  {
    id: 50,
    name: 'Google Drive',
    actions: [
      {
        id: 0,
        urlScheme: 'googledrive://',
        description: 'Google Drive 앱 열기',
      },
    ],
  },
  {
    id: 39,
    name: 'Google Maps',
    actions: [
      {
        id: 0,
        urlScheme: 'googlemaps://',
        description: 'Google Maps 앱 열기',
      },
    ],
  },
  {
    id: 36,
    name: 'Mail',
    actions: [
      {
        id: 0,
        urlScheme: 'message://	',
        description: 'Mail 앱 열기',
      },
    ],
  },
  {
    id: 30,
    name: 'Netflix',
    actions: [
      {
        id: 0,
        urlScheme: 'nflx://',
        description: 'Netflix 앱 열기',
      },
    ],
  },
  {
    id: 48,
    name: 'Safari',
    actions: [
      {
        id: 0,
        urlScheme: 'x-web-search://',
        description: 'Safari 앱 열기',
      },
      {
        id: 1,
        urlSchemeFunc: (param: string) => `${param}`,
        description: 'Safari 앱으로 특정 사이트 접속하기',
        placeholder: 'https://... 또는 http://',
        descriptionFunc: (param: string) => `${param} 이동하기`,
      },
    ],
  },
  {
    id: 31,
    name: 'Spotify',
    actions: [
      {
        id: 0,
        urlScheme: 'spotify://',
        description: 'Spotify 앱 열기',
      },
    ],
  },
  {
    id: 46,
    name: 'TV',
    actions: [
      {
        id: 0,
        urlScheme: 'videos://',
        description: 'TV 앱 열기',
      },
    ],
  },
  {
    id: 3,
    name: 'Youtube',
    actions: [
      {
        id: 0,
        urlScheme: 'youtube://',
        description: 'Youtube 앱 열기',
      },
      {
        id: 1,
        urlScheme: 'youtube://shorts',
        description: 'Youtube 쇼츠 열기',
      },
    ],
  },
  {
    id: 22,
    name: 'Youtube Music',
    actions: [
      {
        id: 0,
        urlScheme: 'youtubemusic://',
        description: 'Youtube Music 앱 열기',
      },
      {
        id: 1,
        urlSchemeFunc: (param: string) => `youtubemusic://watch?list=${param}`,
        description: 'Youtube Music 재생목록 재생',
        placeholder: '재생목록 이름을 입력해주세요',
        descriptionFunc: (param: string) => `${param} 재생목록 재생하기`,
      },
    ],
  },
  {
    id: CUSTOM_URL_SCHEME_ID,
    name: '커스텀 URL Scheme',
    actions: [
      {
        id: 0,
        urlSchemeFunc: (param: string) => `${param}`,
        description: '커스텀 URL Scheme 실행하기',
        placeholder: 'URL Scheme을 입력해주세요',
        descriptionFunc: (param: string) => `${param} 이동하기`,
      },
    ],
  },
];
