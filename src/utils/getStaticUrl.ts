const STATIC_BASE_URL = 'https://main--leafy-wisp-bfecb8.netlify.app';

export const getStaticUrl = (url: string) => {
  return STATIC_BASE_URL + url;
};

export const getStaticImageUrl = (url: string) => {
  return STATIC_BASE_URL + '/images' + url;
};
