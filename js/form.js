import { sendData } from './api.js';
import { Popups, submitText } from './constants.js';
import { showPopup } from './popup.js';
import { isValid, resetValidation } from './validation.js';

const uploadForm = document.querySelector('.img-upload__form');
const pageBody = document.querySelector('body');
const uploadFileControl = uploadForm.querySelector('#upload-file');
const photoEditorForm = uploadForm.querySelector('.img-upload__overlay');
const photoEditorResetBtn = photoEditorForm.querySelector('#upload-cancel');
const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');
const submitButton = uploadForm.querySelector('.img-upload__submit');

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
};

function closePhotoEditor() {
  photoEditorForm.classList.add('hidden');
  pageBody.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
  photoEditorResetBtn.removeEventListener('click', onPhotoEditorResetBtnClick);
  uploadForm.reset();


  resetValidation();
}

export const initUploadModal = () => {
  uploadFileControl.addEventListener('change', () => {
    photoEditorForm.classList.remove('hidden');
    pageBody.classList.add('modal-open');
    photoEditorResetBtn.addEventListener('click', onPhotoEditorResetBtnClick);
    document.addEventListener('keydown', onDocumentKeydown);
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
