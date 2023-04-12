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
    ],
  },
];
