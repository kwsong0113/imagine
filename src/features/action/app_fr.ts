import { CUSTOM_URL_SCHEME_ID, SHORTCUT_ID } from './consts';
import { App } from './types';

export const appList: App[] = [
  {
    id: 47,
    name: 'Localiser',
    actions: [
      {
        id: 0,
        urlScheme: 'fmip1://',
        description: 'Ouvrir Localiser',
      },
    ],
  },
  {
    id: 9,
    name: 'Météo',
    actions: [
      {
        id: 0,
        urlScheme: 'weather://',
        description: 'Ouvrir Météo',
      },
    ],
  },
  {
    id: 5,
    name: 'Naver',
    actions: [
      {
        id: 0,
        urlScheme: 'naversearchapp://',
        description: 'Ouvrir Naver',
      },
    ],
  },
  {
    id: 25,
    name: 'Naver Mail',
    actions: [
      {
        id: 0,
        urlScheme: 'navermail://',
        description: 'Ouvrir Naver Mail',
      },
    ],
  },
  {
    id: 28,
    name: 'Naver Blog',
    actions: [
      {
        id: 0,
        urlScheme: 'naverblog://',
        description: 'Ouvrir Naver Blog',
      },
    ],
  },
  {
    id: 27,
    name: 'Naver Map',
    actions: [
      {
        id: 0,
        urlScheme: 'navermap://',
        description: 'Ouvrir Naver Map',
      },
    ],
  },
  {
    id: 29,
    name: 'Naver Cafe',
    actions: [
      {
        id: 0,
        urlScheme: 'navercafe://',
        description: 'Ouvrir Naver Cafe',
      },
    ],
  },
  {
    id: SHORTCUT_ID,
    name: 'Raccourcis',
    actions: [
      {
        id: 0,
        urlScheme: 'shortcuts://',
        description: 'Ouvrir Raccourcis',
      },
      {
        id: 1,
        urlSchemeFunc: (param: string) =>
          `shortcuts://run-shortcut?name=${param}`,
        description: 'Lancer Raccourcis',
        placeholder: 'Nom du raccourcis',
        descriptionFunc: (param: string) => `Lancer le raccourcis ${param}`,
      },
    ],
  },
  {
    id: 43,
    name: 'Karrot',
    actions: [
      {
        id: 0,
        urlScheme: 'daangn://',
        description: 'Ouvrir Karrot',
      },
    ],
  },
  {
    id: 13,
    name: 'Notes',
    actions: [
      {
        id: 0,
        urlScheme: 'mobilenotes://',
        description: 'Ouvrir Notes',
      },
    ],
  },
  {
    id: 0,
    name: 'Messages',
    actions: [
      {
        id: 0,
        urlScheme: 'messages://',
        description: 'Ouvrir Messages',
      },
      {
        id: 1,
        urlScheme: 'sms://',
        description: 'Nouveau Message',
      },
      {
        id: 2,
        urlSchemeFunc: (param: string) => `sms://${param}`,
        description: 'Envoyez Un Message À Votre Ami',
        placeholder: 'Numéro de téléphone',
        descriptionFunc: (param: string) => `Envoyez Un Message À ${param}`,
      },
    ],
  },
  {
    id: 24,
    name: 'Melon',
    actions: [
      {
        id: 0,
        urlScheme: 'fb329785880437397://',
        description: 'Ouvrir Melon',
      },
    ],
  },
  {
    id: 15,
    name: 'Rappels',
    actions: [
      {
        id: 0,
        urlScheme: 'x-apple-reminderkit://',
        description: 'Ouvrir Rappels',
      },
    ],
  },
  {
    id: 33,
    name: 'Baemin',
    actions: [
      {
        id: 0,
        urlScheme: 'smartbaedal://	',
        description: 'Ouvrir Baemin',
      },
    ],
  },
  {
    id: 34,
    name: 'Between',
    actions: [
      {
        id: 0,
        urlScheme: 'between://	',
        description: 'Ouvrir Between',
      },
    ],
  },
  {
    id: 16,
    name: 'Photos',
    actions: [
      {
        id: 0,
        urlScheme: 'photos-redirect://',
        description: 'Ouvrir Photos',
      },
    ],
  },
  {
    id: 17,
    name: 'Paramètres',
    actions: [
      {
        id: 0,
        urlScheme: 'App-prefs://',
        description: 'Ouvrir Paramètres',
      },
    ],
  },
  {
    id: 42,
    name: 'Starbucks',
    actions: [
      {
        id: 0,
        urlScheme: 'starbucks://',
        description: 'Ouvrir Starbucks',
      },
    ],
  },
  {
    id: 7,
    name: 'Musique',
    actions: [
      {
        id: 0,
        urlScheme: 'music://',
        description: 'Ouvrir Musique',
      },
    ],
  },
  {
    id: 1,
    name: 'Instagram',
    actions: [
      {
        id: 0,
        urlScheme: 'instagram://',
        description: 'Ouvrir Instagram',
      },
      {
        id: 1,
        urlScheme: 'instagram://reels_home',
        description: 'Ouvrir les Reels Instagram',
      },
      {
        id: 2,
        urlScheme: 'instagram://camera',
        description: 'Poster une Story sur Instagram',
      },
      {
        id: 3,
        urlSchemeFunc: (param: string) => `instagram://user?username=${param}`,
        description: "Voir l'Instagram De Votre Ami",
        placeholder: 'Instagram ID sans @',
        descriptionFunc: (param: string) => `Voir @${param} sur Instagram`,
      },
    ],
  },
  {
    id: 4,
    name: 'Phone',
    actions: [
      {
        id: 0,
        urlScheme: 'tel://',
        description: 'Ouvrir Phone',
      },
      {
        id: 1,
        urlSchemeFunc: (param: string) => `tel://${param}`,
        description: 'Appeler Votre Friend',
        placeholder: 'Numéro de téléphone',
        descriptionFunc: (param: string) => `Appeler ${param}`,
      },
    ],
  },
  {
    id: 19,
    name: 'Bourse',
    actions: [
      {
        id: 0,
        urlScheme: 'stocks://',
        description: 'Ouvrir Bourse',
      },
    ],
  },
  {
    id: 18,
    name: 'Cartes',
    actions: [
      {
        id: 0,
        urlScheme: 'shoebox://',
        description: 'Ouvrir Cartes',
      },
    ],
  },
  {
    id: 20,
    name: 'Maps',
    actions: [
      {
        id: 0,
        urlScheme: 'map://',
        description: 'Ouvrir Maps',
      },
    ],
  },
  {
    id: 41,
    name: 'Kakao T',
    actions: [
      {
        id: 0,
        urlScheme: 'kakaot://',
        description: 'Ouvrir Kakao T',
      },
    ],
  },
  {
    id: 11,
    name: 'KakaoMap',
    actions: [
      {
        id: 0,
        urlScheme: 'kakaomap://',
        description: 'Ouvrir KakaoMap',
      },
    ],
  },
  {
    id: 6,
    name: 'KakaoTalk',
    actions: [
      {
        id: 0,
        urlScheme: 'kakaotalk://',
        description: 'Ouvrir KakaoTalk',
      },
    ],
  },
  {
    id: 23,
    name: 'KakaoPay',
    actions: [
      {
        id: 0,
        urlScheme: 'kakaopay://',
        description: 'Ouvrir KakaoPay',
      },
    ],
  },
  {
    id: 14,
    name: 'Calendrier',
    actions: [
      {
        id: 0,
        urlScheme: 'calshow://',
        description: 'Ouvrir Calendrier',
      },
    ],
  },
  {
    id: 38,
    name: 'Coupang',
    actions: [
      {
        id: 0,
        urlScheme: 'coupang://	',
        description: 'Ouvrir Coupang',
      },
    ],
  },
  {
    id: 40,
    name: 'Tabling',
    actions: [
      {
        id: 0,
        urlScheme: 'tabling://',
        description: 'Ouvrir Tabling',
      },
    ],
  },
  {
    id: 2,
    name: 'Toss',
    actions: [
      {
        id: 0,
        urlScheme: 'supertoss://',
        description: 'Ouvrir Toss',
      },
      {
        id: 1,
        urlScheme: 'supertoss://stock',
        description: 'Ouvrir Toss Invest',
      },
      {
        id: 2,
        urlScheme: 'supertoss://send',
        description: 'Ouvrir Money with Toss',
      },
    ],
  },
  {
    id: 10,
    name: 'Fichier',
    actions: [
      {
        id: 0,
        urlScheme: 'sharedDocuments://',
        description: 'Ouvrir iCloud Drive',
      },
    ],
  },
  {
    id: 37,
    name: 'Carte Hyundai',
    actions: [
      {
        id: 0,
        urlScheme: 'hyundaicardappcard://	',
        description: 'Ouvrir Carte Hyundai',
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
        description: 'Ouvrir BAND',
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
        description: 'Ouvrir Chrome',
      },
      {
        id: 1,
        urlSchemeFunc: (param: string) => `googlechrome://${param}`,
        description: 'Aller sur site web en utilisant Chrome',
        placeholder: 'Sans https://... ou http://...',
        descriptionFunc: (param: string) => `Aller à ${param}`,
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
        description: 'Ouvrir Facebook',
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
        description: 'Ouvrir FaceTime',
      },
      {
        id: 1,
        urlSchemeFunc: (param: string) => `facetime://${param}`,
        description: 'FaceTime avec Votre Ami',
        placeholder: 'Numéro de téléphone',
        descriptionFunc: (param: string) => `Appel FaceTime avec ${param}`,
      },
      {
        id: 2,
        urlSchemeFunc: (param: string) => `facetime-audio://${param}`,
        description: 'FaceTime Audio avec Votre Ami',
        placeholder: 'Numéro de téléphone',
        descriptionFunc: (param: string) => `FaceTime audio avec ${param}`,
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
        description: 'Ouvrir GitHub',
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
        description: 'Ouvrir Gmail',
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
        description: 'Ouvrir GoodNotes 5',
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
        description: 'Ouvrir Google',
      },
    ],
  },
  {
    id: 21,
    name: 'Agenda',
    actions: [
      {
        id: 0,
        urlScheme: 'com.google.calendar://',
        description: 'Ouvrir Agenda',
      },
      {
        id: 1,
        urlScheme: 'com.google.calendar://?action=create',
        description: 'Créer un évènement sur Agenda',
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
        description: 'Ouvrir Google Drive',
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
        description: 'Ouvrir Google Maps',
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
        description: 'Ouvrir Mail',
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
        description: 'Ouvrir Netflix',
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
        description: 'Ouvrir Safari',
      },
      {
        id: 1,
        urlSchemeFunc: (param: string) => `${param}`,
        description: 'Aller sur un site web en utilisant Safari',
        placeholder: 'https://... ou http://...',
        descriptionFunc: (param: string) => `Aller à ${param}`,
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
        description: 'Ouvrir Spotify',
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
        description: 'Ouvrir TV',
      },
    ],
  },
  {
    id: 3,
    name: 'YouTube',
    actions: [
      {
        id: 0,
        urlScheme: 'youtube://',
        description: 'Ouvrir YouTube',
      },
      {
        id: 1,
        urlScheme: 'youtube://shorts',
        description: 'Ouvrir YouTube Shorts',
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
        description: 'Ouvrir YouTube Music',
      },
      {
        id: 1,
        urlSchemeFunc: (param: string) => `youtubemusic://watch?list=${param}`,
        description: 'Jouer une playlist sur YouTube Music',
        placeholder: 'Nom de la playlist',
        descriptionFunc: (param: string) => `Jouer la playlist ${param}`,
      },
    ],
  },
  {
    id: 51,
    name: 'Apple Store',
    actions: [
      {
        id: 0,
        urlScheme: 'applestore://',
        description: 'Ouvrir Apple Store',
      },
    ],
  },
  {
    id: 52,
    name: 'GarageBand',
    actions: [
      {
        id: 0,
        urlScheme: 'garageband://',
        description: 'Ouvrir GarageBand',
      },
    ],
  },
  {
    id: 53,
    name: 'Santé',
    actions: [
      {
        id: 0,
        urlScheme: 'x-apple-health://',
        description: 'Ouvrir Santé',
      },
    ],
  },
  {
    id: 54,
    name: 'Podcasts',
    actions: [
      {
        id: 0,
        urlScheme: 'podcasts://',
        description: 'Ouvrir Podcasts',
      },
    ],
  },
  {
    id: 55,
    name: 'ChatGPT',
    actions: [
      {
        id: 0,
        urlScheme: 'chatgpt://',
        description: 'Ouvrir ChatGPT',
      },
    ],
  },
  {
    id: 56,
    name: 'Notion',
    actions: [
      {
        id: 0,
        urlScheme: 'notion://',
        description: 'Ouvrir Notion',
      },
    ],
  },
  {
    id: 57,
    name: 'Airbnb',
    actions: [
      {
        id: 0,
        urlScheme: 'airbnb://',
        description: 'Ouvrir Airbnb',
      },
    ],
  },
  {
    id: 58,
    name: 'Slack',
    actions: [
      {
        id: 0,
        urlScheme: 'slack://',
        description: 'Ouvrir Slack',
      },
    ],
  },
  {
    id: 59,
    name: 'Twitter',
    actions: [
      {
        id: 0,
        urlScheme: 'twitter://',
        description: 'Ouvrir Twitter',
      },
      {
        id: 1,
        urlScheme: 'twitter://search',
        description: 'Rechercher sur Twitter',
      },
      {
        id: 2,
        urlScheme: 'twitter://post',
        description: 'Commencer un nouveau Tweet',
      },
      {
        id: 3,
        urlScheme: 'twitter://messages',
        description: 'Voir les messages privés sur Twitter',
      },
    ],
  },
  {
    id: 60,
    name: 'Telegram',
    actions: [
      {
        id: 0,
        urlScheme: 'telegram://',
        description: 'Ouvrir Telegram',
      },
    ],
  },
  {
    id: 61,
    name: 'Cash App',
    actions: [
      {
        id: 0,
        urlScheme: 'squarecash://',
        description: 'Ouvrir Cash App',
      },
    ],
  },
  {
    id: 62,
    name: 'WhatsApp',
    actions: [
      {
        id: 0,
        urlScheme: 'whatsapp://',
        description: 'Ouvrir WhatsApp',
      },
    ],
  },
  {
    id: 63,
    name: 'Snapchat',
    actions: [
      {
        id: 0,
        urlScheme: 'snapchat://',
        description: 'Ouvrir Snapchat',
      },
    ],
  },
  {
    id: 64,
    name: 'Uber',
    actions: [
      {
        id: 0,
        urlScheme: 'uber://',
        description: 'Ouvrir Uber',
      },
    ],
  },
  {
    id: 65,
    name: 'Lyft',
    actions: [
      {
        id: 0,
        urlScheme: 'lyft://',
        description: 'Ouvrir Lyft',
      },
    ],
  },
  {
    id: 66,
    name: 'DoorDash',
    actions: [
      {
        id: 0,
        urlScheme: 'doordash://',
        description: 'Ouvrir DoorDash',
      },
    ],
  },
  {
    id: 67,
    name: 'Amazon Alexa',
    actions: [
      {
        id: 0,
        urlScheme: 'alexa://',
        description: 'Ouvrir Amazon Alexa',
      },
    ],
  },
  {
    id: 68,
    name: 'Discord',
    actions: [
      {
        id: 0,
        urlScheme: 'discord://',
        description: 'Ouvrir Discord',
      },
    ],
  },
  {
    id: 69,
    name: 'PayPal',
    actions: [
      {
        id: 0,
        urlScheme: 'paypal://',
        description: 'Ouvrir PayPal',
      },
    ],
  },
  {
    id: 70,
    name: 'Google Meet',
    actions: [
      {
        id: 0,
        urlScheme: 'gmeet://',
        description: 'Ouvrir Google Meet',
      },
    ],
  },
  {
    id: 71,
    name: 'TikTok',
    actions: [
      {
        id: 0,
        urlScheme: 'tiktok://',
        description: 'Ouvrir TikTok',
      },
    ],
  },
  {
    id: 72,
    name: 'Pinterest',
    actions: [
      {
        id: 0,
        urlScheme: 'pinterest://',
        description: 'Ouvrir Pinterest',
      },
    ],
  },
  {
    id: 73,
    name: 'Google Photos',
    actions: [
      {
        id: 0,
        urlScheme: 'googlephotos://',
        description: 'Ouvrir Google Photos',
      },
    ],
  },
  {
    id: 74,
    name: 'Shop',
    actions: [
      {
        id: 0,
        urlScheme: 'shopapp://',
        description: 'Ouvrir Shop',
      },
    ],
  },
  {
    id: 75,
    name: 'Reddit',
    actions: [
      {
        id: 0,
        urlScheme: 'reddit://',
        description: 'Ouvrir Reddit',
      },
    ],
  },
  {
    id: 76,
    name: 'Outlook',
    actions: [
      {
        id: 0,
        urlScheme: 'ms-outlook://',
        description: 'Ouvrir Outlook',
      },
    ],
  },
  {
    id: 77,
    name: 'Zoom',
    actions: [
      {
        id: 0,
        urlScheme: 'zoomus://',
        description: 'Ouvrir Zoom',
      },
    ],
  },
  {
    id: 78,
    name: 'Twitch',
    actions: [
      {
        id: 0,
        urlScheme: 'twitch://',
        description: 'Ouvrir Twitch',
      },
    ],
  },
  {
    id: 79,
    name: 'KB Kookmin Bank',
    actions: [
      {
        id: 0,
        urlScheme: 'kBbank://',
        description: 'Ouvrir KB Kookmin Bank',
      },
    ],
  },
  {
    id: 80,
    name: 'Naver Webtoon',
    actions: [
      {
        id: 0,
        urlScheme: 'fb455753897775430://',
        description: 'Ouvrir Naver Webtoon',
      },
    ],
  },
  {
    id: CUSTOM_URL_SCHEME_ID,
    name: "Schéma d'URL Schema",
    actions: [
      {
        id: 0,
        urlSchemeFunc: (param: string) => `${param}`,
        description: "Ouvrir un schéma d'URL personnalisé",
        placeholder: "Schéma d'URL",
        descriptionFunc: (param: string) => `Aller à ${param}`,
      },
    ],
  },
];
