import { sendData } from './api.js';
import { Popups, submitText } from './constants.js';
import { resetEffects } from './effects-slider.js';
import { removeEscapeControl, setEscapeControl } from './escape-control.js';
import { showPopup } from './popup.js';
import { resetScale } from './scale.js';
import { isValid, resetValidation } from './validation.js';

const uploadForm = document.querySelector('.img-upload__form');
const img = uploadForm.querySelector('.img-upload__preview img');
const pageBody = document.querySelector('body');
const uploadFileControl = uploadForm.querySelector('#upload-file');
const photoEditorForm = uploadForm.querySelector('.img-upload__overlay');
const photoEditorResetBtn = photoEditorForm.querySelector('#upload-cancel');
const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');
const submitButton = uploadForm.querySelector('.img-upload__submit');
const effectsRadios = uploadForm.querySelectorAll('.effects__preview');

const onPhotoEditorResetBtnClick = (evt) => {
  evt.preventDefault();
  closePhotoEditor();
  removeEscapeControl();
};

const canCloseForm = () => !(document.activeElement === hashtagInput || document.activeElement === commentInput);

function closePhotoEditor() {
  photoEditorForm.classList.add('hidden');
  pageBody.classList.remove('modal-open');

  photoEditorResetBtn.removeEventListener('click', onPhotoEditorResetBtnClick);
  uploadForm.reset();
  resetValidation();
  resetScale();
  resetEffects();
}

const setPreview = () => {
  const file = uploadFileControl.files[0];
  const url = URL.createObjectURL(file);
  img.src = url;
  effectsRadios.forEach((radio) => {
    radio.style.backgroundImage = `url("${url}")`;
  });
};

export const initUploadModal = () => {
  uploadFileControl.addEventListener('change', () => {
    setPreview();
    photoEditorForm.classList.remove('hidden');
    pageBody.classList.add('modal-open');
    photoEditorResetBtn.addEventListener('click', onPhotoEditorResetBtnClick);
    setEscapeControl(closePhotoEditor, canCloseForm);
  });
};

const blockSubmit = (isBlocked = true) => {
  submitButton.disabled = isBlocked;
  submitButton.textContent = isBlocked ? submitText.SENDING : submitText.IDLE;
};

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (isValid()) {
    blockSubmit();
    sendData(new FormData(uploadForm))
      .then(() => {
        closePhotoEditor();
        removeEscapeControl();
        showPopup(Popups.SUCCESS);
      })
      .catch(() => {
        showPopup(Popups.ERROR);
      })
      .finally(() => {
        blockSubmit(false);
      });
  }
});
