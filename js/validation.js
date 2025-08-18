import { MAX_SYMBOLS, MAX_HASHTAGS, MAX_COMMENT_LENGTH } from './constants.js';
import { numDecline } from './utils.js';

const uploadForm = document.querySelector('.img-upload__form');
const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
});

let errorMessage = '';
const error = () => errorMessage;
const isHashtagsValid = (value) => {
  errorMessage = '';

  const inputText = value.toLowerCase().trim();

  if (!inputText.length === 0) {
    return true;
  }

  const inputArray = inputText.split(/\s+/);

  const rules = [
    {
      check: inputArray.some((item) => item[0] !== '#'),
      error: 'Хэштег начинается с символа # (решётка)',
    },
    {
      check: inputArray.some((item) => !/^#[a-zа-яё0-9]{1,19}$/i.test(item)),
      error: 'Строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;',
    },
    {
      check: inputArray.some((item) => item === '#'),
      error: 'Хеш-тег не может состоять только из одной решётки',
    },
    {
      check: inputArray.some((item) => item.length > MAX_SYMBOLS),
      error: `Максимальная длина одного хэштега ${MAX_SYMBOLS} символов, включая решётку`,
    },
    {
      check: inputArray.some((item) => item.slice(1).includes('#')),
      error: 'Хэштеги разделяются пробелами',
    },
    {
      check: inputArray.some((item, num, array) => array.includes(item, num + 1)),
      error: 'Один и тот же хэштег не может быть использован дважды',
    },
    {
      check: inputArray.length > MAX_HASHTAGS,
      error: `Нельзя указать больше ${MAX_HASHTAGS} ${numDecline(
        MAX_HASHTAGS, 'хэштега', 'хэштегов', 'хэштегов'
      )}`,
    },
  ];

  return rules.every((rule) => {
    const isInvalid = rule.check;
    if (isInvalid) {
      errorMessage = rule.error;
    }
    return !isInvalid;
  });
};

const isCommentValid = (value) => {
  errorMessage = '';
  if (value.length > MAX_COMMENT_LENGTH) {
    errorMessage = `Длина комментария не может составлять больше ${MAX_COMMENT_LENGTH} ${numDecline(
      MAX_COMMENT_LENGTH, 'символа', 'символов', 'символов'
    )}`;
    return false;
  }
  return true;
};

pristine.addValidator(hashtagInput, isHashtagsValid, error, 2, false);
pristine.addValidator(commentInput, isCommentValid, error, 2, false);

export const isValid = () => pristine.validate();

export const resetValidation = () => {
  pristine.reset();
};
