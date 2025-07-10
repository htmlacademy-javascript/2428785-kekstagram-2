import { photos } from "./main.js";
import { container } from "./render.js";

const bigPictureNode = document.querySelector('.big-picture');
const bigPictureImgNode = bigPictureNode.querySelector('.big-picture__img').querySelector('img');
const likesCountNode = bigPictureNode.querySelector('.likes-count');
const socialCommentsNode = bigPictureNode.querySelector('.social__comments');
const socialCommentsTemplate = socialCommentsNode.querySelector('.social__comment');
const commentsCaptionNode = bigPictureNode.querySelector('.social__caption');
const commentsCountNode = bigPictureNode.querySelector('social__comment-count');
const commentsLoaderNode = bigPictureNode.querySelector('.social__comments-loader');
const bigPictureCancelNode = bigPictureNode.querySelector('.big-picture__cancel');

container.addEventListener('click', (evt) => {
  const currentPictureNode = evt.target.closest('.picture');

  if (currentPictureNode) {
    openBigPicture(currentPictureNode.dataset.pictureId)
  }
})

const onBigPictureCancelClick = () => {
  closeBigPicture();
};
const onEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    closeBigPicture();
  }
};

const closeBigPicture = () => {
  bigPictureNode.classList.add('hidden');
  bigPictureCancelNode.removeEventListener('click', onBigPictureCancelClick);
  document.removeEventListener('keydown', onEscKeydown);
}

const openBigPicture = (pictureId) => {
  const currentPhoto = photos.find((photo) => photo.id === Number(pictureId));
  const socialCommentsFragment = document.createDocumentFragment();

  bigPictureImgNode.src = currentPhoto.url;
  likesCountNode.textContent = currentPhoto.likes;
  socialCommentsNode.innerHTML = '';

  currentPhoto.comments.forEach((comment) => {
    const socialCommentNode = socialCommentsTemplate.cloneNode(true);

    socialCommentNode.querySelector('.social__picture').src = comment.avatar;
    socialCommentNode.querySelector('.social__picture').alt = comment.name;
    socialCommentNode.querySelector('social__text').textContent = comment.message;

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
