import { SCALE_FACTOR, SCALE_MAX, SCALE_MIN, SCALE_STEP } from "./constants.js";
const uploadForm = document.querySelector('.img-upload__form');
export const img = uploadForm.querySelector('.img-upload__preview img');
const scaleControl = uploadForm.querySelector('.scale__control--value');
const smaller = uploadForm.querySelector('.scale__control--smaller');
const bigger = uploadForm.querySelector('.scale__control--bigger');

let scale = SCALE_MAX;

const updateScale = () => {
  img.style.transform = `scale(${scale})`;
  scaleControl.value = `${scale * SCALE_FACTOR}%`;
};

const onSmallerClick = () => {
  scale = Math.max(scale - SCALE_STEP, SCALE_MIN);
  updateScale();
};

const onBiggerClick = () => {
  scale = Math.min(scale + SCALE_STEP, SCALE_MAX);
  updateScale();
};

smaller.addEventListener('click', onSmallerClick);
bigger.addEventListener('click', onBiggerClick);

export const resetScale = () => {
  scale = SCALE_MAX;
  updateScale();
}