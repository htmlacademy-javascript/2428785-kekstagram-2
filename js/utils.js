import { DELAY } from './constants';

const alertTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const body = document.body;

export const numDecline = (num, nominative, genitiveSingular, genitivePlural) => {
  if (num % 10 === 0 || num % 100 > 4 && num % 100 < 21) {
    return genitivePlural;
  }
  return num % 10 === 1
    ? nominative
    : genitiveSingular;
};

export const showAlert = () => {
  const alert = alertTemplate.cloneNode(true);
  body.append(alert);

  setTimeout(() => {
    alert.remove();
  }, DELAY);
};

export const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};
