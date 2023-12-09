import { NonLocaleLanguage } from '../store/slices';

type HelpCard = {
  bg: string;
  color: string;
  imageId: number;
  subtitle: string;
  titleArray: string[];
};

const HELP_CARD_DATA_KO = [
  {
    bg: 'blue.600',
    color: 'gray.100',
    imageId: 0,
    subtitle: '5 Steps',
    titleArray: ['Linky', '똑똑하게', '활용하는 법'],
  },
  {
    bg: 'blue.200',
    color: 'gray.900',
    imageId: 1,
    subtitle: 'Step 1',
    titleArray: ['제스처', '추가하기'],
  },
  {
    bg: 'teal.600',
    color: 'gray.100',
    imageId: 2,
    subtitle: 'Step 2',
    titleArray: ['액션', '추가하기'],
  },
  {
    bg: 'teal.200',
    color: 'gray.900',
    imageId: 3,
    subtitle: 'Step 3',
    titleArray: ['위젯', '추가하기'],
  },
  {
    bg: 'gray.600',
    color: 'gray.100',
    imageId: 4,
    subtitle: 'Step 4',
    titleArray: ['Linky 앱을', '사용해', '액션', '실행하기'],
  },
  {
    bg: 'gray.300',
    color: 'gray.900',
    imageId: 5,
    subtitle: 'Step 5',
    titleArray: ['통계', '확인하기'],
  },
];

const HELP_CARD_DATA_EN = [
  {
    bg: 'blue.600',
    color: 'gray.100',
    imageId: 0,
    subtitle: '5 Steps',
    titleArray: ['How to ', 'Smartly', 'Utilize Linky'],
  },
  {
    bg: 'blue.200',
    color: 'gray.900',
    imageId: 1,
    subtitle: 'Step 1',
    titleArray: ['Add', 'Gestures'],
  },
  {
    bg: 'teal.600',
    color: 'gray.100',
    imageId: 2,
    subtitle: 'Step 2',
    titleArray: ['Add', 'Actions'],
  },
  {
    bg: 'teal.200',
    color: 'gray.900',
    imageId: 3,
    subtitle: 'Step 3',
    titleArray: ['Add a', 'Lock', 'Screen', 'Widget'],
  },
  {
    bg: 'gray.600',
    color: 'gray.100',
    imageId: 4,
    subtitle: 'Step 4',
    titleArray: ['Execute', 'Actions', 'Using', 'Linky'],
  },
  {
    bg: 'gray.300',
    color: 'gray.900',
    imageId: 5,
    subtitle: 'Step 5',
    titleArray: ['View', 'Statistics'],
  },
];

const HELP_CARD_DATA_FR = [
  {
    bg: 'blue.600',
    color: 'gray.100',
    imageId: 0,
    subtitle: '5 Steps',
    titleArray: ['Comment ', 'Intelligement', 'Utiliser Linky'],
  },
  {
    bg: 'blue.200',
    color: 'gray.900',
    imageId: 1,
    subtitle: 'Step 1',
    titleArray: ['Ajouter', 'Des', 'Mouvements'],
  },
  {
    bg: 'teal.600',
    color: 'gray.100',
    imageId: 2,
    subtitle: 'Step 2',
    titleArray: ['Ajouter', 'Des actions'],
  },
  {
    bg: 'teal.200',
    color: 'gray.900',
    imageId: 3,
    subtitle: 'Step 3',
    titleArray: ['Ajouter un', 'Widget', "Sur l'écran", 'De', 'Vérrouillage'],
  },
  {
    bg: 'gray.600',
    color: 'gray.100',
    imageId: 4,
    subtitle: 'Step 4',
    titleArray: ['Executer', 'Des actions', 'Utilisant', 'Linky'],
  },
  {
    bg: 'gray.300',
    color: 'gray.900',
    imageId: 5,
    subtitle: 'Step 5',
    titleArray: ['Voir', 'Les', 'Statistiques'],
  },
];

const HELP_DESCRIPTION_DATA_KO = [
  [
    'Linky는 어떤 앱인가요?',
    '빠르게 제스처를 그려서 앱을 실행해요',
    '어떤 액션을 사용했는지 통계를 분석해요',
  ],
  [
    '알파벳, 하트, 별과 같은 제스처를 추가해요',
    '점 찍기는 사용할 수 없어요',
    '같은 제스처를 4번 그리면 등록돼요',
  ],
  [
    '원하는 액션을 추가하고 액션를 실행할 제스처를 선택 또는 추가해요',
    '원하는 앱이나 액션이 없다면?',
    '커스텀 URL Scheme 메뉴로 가보세요',
    '단축어 메뉴에서 단축어도 추가할 수 있어요',
  ],
  [
    '잠금 화면에 위젯을 추가해요',
    '제스처 그리기 화면으로 바로 이동해요',
    '평소에 Linky 앱을 닫지 않으면 로딩 없이 바로 실행할 수 있어요',
    'iOS 16.0 이상에서만 지원해요',
  ],
  [
    '제스처 그리기 화면에서 액션을 실행해요',
    '제스처 단 한 번으로',
    '다양한 앱과 액션을 빠르게 실행할 수 있어요',
  ],
  [
    '통계를 확인해보세요',
    '먼저 통계 탭으로 이동해요',
    '어떤 앱과 액션을 얼마나 자주 사용했는지 알 수 있어요',
  ],
];

const HELP_DESCRIPTION_DATA_EN = [
  [
    'What can you do with Linky?',
    'Execute apps quickly by drawing gestures.',
    'Check statistics to see which actions you used.',
  ],
  [
    'Add gestures like alphabet, heart, star.',
    'Dotting is not supported.',
    'Draw the same gesture four times to add it.',
  ],
  [
    'Select actions and assign gestures.',
    'Cannot find the action you want?',
    'Check out the Custom URL Scheme menu.',
    'You can also add shortcuts in the Shortcuts menu.',
  ],
  [
    'Add a widget to the lock screen.',
    'You can directly access the gesture drawing screen.',
    'If you keep Linky app open, you can execute actions without loading time.',
    'Supported on iOS 16.0+',
  ],
  [
    'Execute actions from the gesture drawing screen.',
    'Just draw it...',
    'and you can quickly execute various actions.',
  ],
  [
    'Check the statistics.',
    'Navigate to the Statistics tab.',
    'Find out how often you have used different apps and actions.',
  ],
];

const HELP_DESCRIPTION_DATA_FR = [
  [
    'Que pouvez-vous faire avec Linky ?',
    'Executer des applications rapidement en dessinant des mouvements',
    'Vérifier les statistiques pour voir quelles actions vous utilisez',
  ],
  [
    'Ajouter des mouvements comme des lettres, un coeur, une étoile.',
    "Le pointage n'est pas autorisé.",
    "Dessinez le même mouvement quatre fois pour l'ajouter.",
  ],
  [
    'Selectionner des actions et assigner des mouvements.',
    'Les actions que vous voulez sont introuvables ?',
    "Vérifiez le menu de schémas d'URL personnalisés",
    'Vous pouvez aussi ajouter des raccourcis dans le menu de raccourcis.',
  ],
  [
    "Ajouter un widget sur l'écran de verrouillage.",
    'Vous pouvez directement accéder à la page de dessin de mouvements.',
    "Si vous gardez l'application Linky ouverte, vous pouvez executer des actions sans temps de chargement.",
    'Supporté sur iOS 16.0+',
  ],
  [
    'Éxécuter des actions depuis la page de dessin de mouvements.',
    'Juste dessinez...',
    "Et vous pouvez éxécuter rapidement une variété d'actions.",
  ],
  [
    'Vérifiez les statistiques.',
    'Naviguez sur le tableau de statistiques.',
    'Découvrez à quelle fréquence vous avez utilisé différentes applications et actions.',
  ],
];

const cardData: Record<NonLocaleLanguage, HelpCard[]> = {
  kor: HELP_CARD_DATA_KO,
  eng: HELP_CARD_DATA_EN,
  fre: HELP_CARD_DATA_FR,
};

const helpData: Record<NonLocaleLanguage, string[][]> = {
  kor: HELP_DESCRIPTION_DATA_KO,
  eng: HELP_DESCRIPTION_DATA_EN,
  fre: HELP_DESCRIPTION_DATA_FR,
};

export const getCardData = (language: NonLocaleLanguage) => {
  return cardData[language];
};

export const getHelpData = (language: NonLocaleLanguage) => {
  return helpData[language];
};
