export const sleepTimeout = (delay: number) =>
  new Promise(resolve => setTimeout(resolve, delay));
