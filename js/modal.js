import { COUNT_STEP } from './constants.js';
import { removeEscapeControl, setEscapeControl } from './escape-control.js';

const bigPictureNode = document.querySelector('.big-picture');
const bigPictureImgNode = bigPictureNode.querySelector('.big-picture__img').querySelector('img');
const likesCountNode = bigPictureNode.querySelector('.likes-count');
const socialCommentsNode = bigPictureNode.querySelector('.social__comments');
const socialCommentsTemplate = socialCommentsNode.querySelector('.social__comment');
const commentsCaptionNode = bigPictureNode.querySelector('.social__caption');
const commentsLoaderNode = bigPictureNode.querySelector('.social__comments-loader');
const bigPictureCancelNode = bigPictureNode.querySelector('.big-picture__cancel');
const renderedStatisticNode = bigPictureNode.querySelector('.social__comment-shown-count');
const totalStatisticNode = bigPictureNode.querySelector('.social__comment-total-count');

let currentCount = 0;
let comments = [];

socialCommentsNode.innerHTML = '';

const onBigPictureCancelClick = () => {
  closeBigPicture();
  removeEscapeControl();
};

const onCommentsLoaderNodeClick = () => {
  renderNextComments();
}

const renderNextComments = () => {
  const socialCommentsFragment = document.createDocumentFragment();
  const renderedComments = comments.slice(currentCount, currentCount + COUNT_STEP);
  const renderedCommentsLength = renderedComments.length + currentCount;

  renderedComments.forEach((comment) => {
    const socialCommentNode = socialCommentsTemplate.cloneNode(true);

    socialCommentNode.querySelector('.social__picture').src = comment.avatar;
    socialCommentNode.querySelector('.social__picture').alt = comment.name;
    socialCommentNode.querySelector('.social__text').textContent = comment.message;

    socialCommentsFragment.appendChild(socialCommentNode);
  });
  socialCommentsNode.appendChild(socialCommentsFragment);

  renderedStatisticNode.textContent = renderedCommentsLength;

  if (renderedCommentsLength >= comments.length) {
    commentsLoaderNode.classList.add('hidden');
  }

  currentCount += COUNT_STEP;
};


const clearComments = () => {
  currentCount = 0;
  socialCommentsNode.innerHTML = '';
  commentsLoaderNode.classList.remove('hidden');
  commentsLoaderNode.removeEventListener('click', onCommentsLoaderNodeClick);
};

function closeBigPicture() {
  clearComments();

  bigPictureNode.classList.add('hidden');
  document.body.classList.remove('modal-open');
  bigPictureCancelNode.removeEventListener('click', onBigPictureCancelClick);
}

export const openBigPicture = (currentPhoto) => {

  bigPictureImgNode.src = currentPhoto.url;
  likesCountNode.textContent = currentPhoto.likes;
  commentsCaptionNode.textContent = currentPhoto.description;
  totalStatisticNode.textContent = currentPhoto.comments.length;
  socialCommentsNode.innerHTML = '';

  renderComments(currentPhoto.comments);

  bigPictureNode.classList.remove('hidden');
  bigPictureCancelNode.addEventListener('click', onBigPictureCancelClick);
  document.body.classList.add('modal-open');
  setEscapeControl(closeBigPicture);
};

function renderComments(currentPhotoComments) {
  comments = currentPhotoComments;
  renderNextComments();
  commentsLoaderNode.addEventListener('click', onCommentsLoaderNodeClick);
}
