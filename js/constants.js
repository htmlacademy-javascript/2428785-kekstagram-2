export const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

export const NAMES = ['Артём', 'Настя', 'Владимир', 'Мария', 'Игорь', 'Светлана', 'Алексей', 'Даша', 'Михаил', 'Оля'];

export const DESCRIPTIONS = [
  'Отличный день',
  'Хорошее утро',
  'День идет неплохо'
];

export const AVATAR_MIN = 1;
export const AVATAR_MAX = 6;

export const COMMENT_MIN = 0;
export const COMMENT_MAX = 30;

export const LIKES_MIN = 15;
export const LIKES_MAX = 200;

export const TOTAL_CARDS = 25;

export const MAX_SYMBOLS = 20;
export const MAX_HASHTAGS = 5;
export const MAX_COMMENT_LENGTH = 140;
export const SCALE_STEP = 0.25;
export const SCALE_MIN = 0.25;
export const SCALE_MAX = 1;

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

