export const MAX_SYMBOLS = 20;
export const MAX_HASHTAGS = 5;
export const MAX_COMMENT_LENGTH = 140;
export const SCALE_STEP = 0.25;
export const SCALE_MIN = 0.25;
export const SCALE_MAX = 1;
export const DELAY = 5000;
export const RANDOM_LIMIT = 10;
export const RANDOM_MIDPOINT = 0.5;
export const SCALE_FACTOR = 100;
export const DEFAULT_EFFECT = 'none';
export const COUNT_STEP = 5;

export const Filters = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

export const EFFECTS = {
  none: {
    range: {
      min: 0,
      max: 1
    },
    start: 1,
    step: 0.1,
    buildFilter: () => '',
  },
  chrome: {
    range: {
      min: 0,
      max: 1
    },
    start: 1,
    step: 0.1,
    buildFilter: (value) => `grayscale(${value})`,
  },
  sepia: {
    range: {
      min: 0,
      max: 1
    },
    start: 1,
    step: 0.1,
    buildFilter: (value) => `sepia(${value})`,
  },
  marvin: {
    range: {
      min: 0,
      max: 100
    },
    start: 100,
    step: 1,
    buildFilter: (value) => `invert(${value}%)`,
  },
  phobos: {
    range: {
      min: 0,
      max: 3
    },
    start: 3,
    step: 0.1,
    buildFilter: (value) => `blur(${value}px)`,
  },
  heat: {
    range: {
      min: 1,
      max: 3
    },
    start: 3,
    step: 0.1,
    buildFilter: (value) => `brightness(${value})`,
  },
};

export const Popups = {
  SUCCESS: 'success',
  ERROR: 'error'
};

export const submitText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};
