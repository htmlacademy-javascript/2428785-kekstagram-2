import { EFFECTS } from './constants.js';
import { img } from './form.js';

const sliderContainer = document.querySelector('.img-upload__effect-level');
const effectValue = document.querySelector('.effect-level__value');
const sliderElement = document.querySelector('.effect-level__slider');
const effectsList = document.querySelector('.effects__list');

let currentEffect = 'none';

noUiSlider.create(sliderElement, {
  range: { min: 0, max: 1 },
  start: 1,
  step: 0.1,
  connect: 'lower',
});

const updateSlider = (effectName) => {
  const effect = EFFECTS[effectName];
  if (!effect.buildFilter) {
    sliderContainer.classList.add('hidden');
    img.style.filter = '';
    effectValue.value = '';
  } else {
    const filterResult = effect.buildFilter(1);
    if (filterResult === '') {
      sliderContainer.classList.add('hidden');
      img.style.filter = '';
      effectValue.value = '';
    } else {
      sliderContainer.classList.remove('hidden');
      sliderElement.noUiSlider.updateOptions({
        range: effect.range,
        start: effect.start,
        step: effect.step,
      });
      sliderElement.noUiSlider.set(effect.start);
      img.style.filter = filterResult;
      effectValue.value = effect.start;
    }
  }
}

sliderElement.noUiSlider.on('update', (values, handle) => {
  const value = values[handle];
  const effect = EFFECTS[currentEffect];

  img.style.filter = effect.buildFilter(value);
  effectValue.value = value;
});

effectsList.addEventListener('change', (evt) => {
  if (!evt.target.classList.contains('effects__radio')) return;

  currentEffect = evt.target.value;
  updateSlider(currentEffect);
});

updateSlider('none');
