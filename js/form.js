import { SCALE_MAX, SCALE_MIN, SCALE_STEP } from "./constants.js";
import { isValid, resetValidation } from "./validation.js";

const uploadForm = document.querySelector('.img-upload__form');
const pageBody = document.querySelector('body');

const uploadFileControl = uploadForm.querySelector('#upload-file');
const photoEditorForm = uploadForm.querySelector('.img-upload__overlay');
const photoEditorResetBtn = photoEditorForm.querySelector('#upload-cancel');

const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');

export const img = uploadForm.querySelector('.img-upload__preview img');
const scaleControl = uploadForm.querySelector('.scale__control--value');
const smaller = uploadForm.querySelector('.scale__control--smaller');
const bigger = uploadForm.querySelector('.scale__control--bigger');

let scale = 1;

const updateScale = () => {
  img.style.transform = `scale(${scale})`;
  scaleControl.value   = `${scale * 100}%`;
};

const onPhotoEditorResetBtnClick = (evt) => {
  evt.preventDefault();
  closePhotoEditor();
};

const isEscapeKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (document.activeElement === hashtagInput || document.activeElement === commentInput) {
      evt.stopPropagation();
    } else {
      uploadForm.reset();
      closePhotoEditor();
    }
  }
};//

function closePhotoEditor() {
  photoEditorForm.classList.add('hidden');
  pageBody.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
  photoEditorResetBtn.removeEventListener('click', onPhotoEditorResetBtnClick);
  uploadForm.reset();


  resetValidation()
};

export const initUploadModal = () => {
  uploadFileControl.addEventListener('change', () => {
    photoEditorForm.classList.remove('hidden');
    pageBody.classList.add('modal-open');
    photoEditorResetBtn.addEventListener('click', onPhotoEditorResetBtnClick);
    document.addEventListener('keydown', onDocumentKeydown);
  });
};


uploadForm.addEventListener('submit', (evt) => {
  if (!isValid())
    evt.preventDefault();
})

const onSmallerClick = () => {
  if (scale > SCALE_MIN) {
    scale = Math.max(scale - SCALE_STEP, SCALE_MIN);
    updateScale();
  }
};

const onBiggerClick = () => {
  if (scale < SCALE_MAX) {
    scale = Math.min(scale + SCALE_STEP, SCALE_MAX);
    updateScale();
  }
};

smaller.addEventListener('click', onSmallerClick);
bigger.addEventListener('click', onBiggerClick);
