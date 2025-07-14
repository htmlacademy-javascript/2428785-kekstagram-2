const bigPictureNode = document.querySelector('.big-picture');
const bigPictureImgNode = bigPictureNode.querySelector('.big-picture__img').querySelector('img');
const likesCountNode = bigPictureNode.querySelector('.likes-count');
const socialCommentsNode = bigPictureNode.querySelector('.social__comments');
const socialCommentsTemplate = socialCommentsNode.querySelector('.social__comment');
const commentsCaptionNode = bigPictureNode.querySelector('.social__caption');
const commentsLoaderNode = bigPictureNode.querySelector('.social__comments-loader');
const bigPictureCancelNode = bigPictureNode.querySelector('.big-picture__cancel');

const onBigPictureCancelClick = () => {
  closeBigPicture();
};
const onEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    closeBigPicture();
  }
};

const closeBigPicture = () => {
  clearComments();

  bigPictureNode.classList.add('hidden');
  bigPictureCancelNode.removeEventListener('click', onBigPictureCancelClick);
  document.removeEventListener('keydown', onEscKeydown);
};

const openBigPicture = (currentPhoto) => {

  bigPictureImgNode.src = currentPhoto.url;
  likesCountNode.textContent = currentPhoto.likes;
  commentsCaptionNode.textContent = currentPhoto.description;
  totalStatisticNode.textContent = currentPhoto.comments.length;
  socialCommentsNode.innerHTML = '';

  renderComments(currentPhoto.comments);

  bigPictureNode.classList.remove('hidden');
  bigPictureCancelNode.addEventListener('click', onBigPictureCancelClick);
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeydown);
};

const renderNextComments = () => {
  const socialCommentsFragment = document.createDocumentFragment();
  const renderedComments = comments.slice(currentCount, currentCount + COUNT_STEP)
  const renderedCommentsLength = renderedComments.length + currentCount;

  renderedComments.forEach((comment) => {
    const socialCommentNode = socialCommentsTemplate.cloneNode(true);

    socialCommentNode.querySelector('.social__picture').src = comment.avatar;
    socialCommentNode.querySelector('.social__picture').alt = comment.name;
    socialCommentNode.querySelector('.social__text').textContent = comment.message;

    socialCommentsFragment.appendChild(socialCommentNode)
  });
  socialCommentsNode.appendChild(socialCommentsFragment);
  commentsCaptionNode.textContent = currentPhoto.description;
  commentsCountNode.classList.add('hidden');
  commentsLoaderNode.classList.add('hidden');

  bigPictureNode.classList.remove('hidden');
  bigPictureCancelNode.addEventListener('click', onBigPictureCancelClick);
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeydown);

}

export { openBigPicture };
