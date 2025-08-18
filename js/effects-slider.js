import { DEFAULT_EFFECT, EFFECTS } from './constants.js';

const uploadForm = document.querySelector('.img-upload__form');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const effectValue = document.querySelector('.effect-level__value');
const sliderElement = document.querySelector('.effect-level__slider');
const effectsList = document.querySelector('.effects__list');
const img = uploadForm.querySelector('.img-upload__preview img');
let currentEffect = DEFAULT_EFFECT;

noUiSlider.create(sliderElement, {
  range: { min: 0, max: 1 },
  start: 1,
  step: 0.1,
  connect: 'lower',
  format: {
    to: function (value) {
      return parseFloat(value);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

export const resetEffects = () => {
  sliderContainer.classList.add('hidden');
  img.style.filter = '';
  effectValue.value = '';
};

const updateSlider = () => {
  const effect = EFFECTS[currentEffect];
  if (!effect.buildFilter || currentEffect === DEFAULT_EFFECT) {
    resetEffects();
  } else {
    sliderContainer.classList.remove('hidden');
    sliderElement.noUiSlider.updateOptions({
      range: effect.range,
      start: effect.start,
      step: effect.step,
    });
  }
};

sliderElement.noUiSlider.on('update', () => {
  const value = sliderElement.noUiSlider.get();
  const effect = EFFECTS[currentEffect];
  img.style.filter = effect.buildFilter(value);
  effectValue.value = value;
});

effectsList.addEventListener('change', (evt) => {
  currentEffect = evt.target.value;
  updateSlider();
});

resetEffects();
