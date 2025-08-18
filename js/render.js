import { openBigPicture } from './modal.js';

const cardTemplate = document.querySelector('#picture').content.querySelector('.picture');
const container = document.querySelector('.pictures');

let localPhotos;

const clearCards = () => {
  document.querySelectorAll('.picture').forEach((card) => {
    card.remove();
  });
};

export const renderCards = (pictures) => {
  localPhotos = [...pictures];
  clearCards();
  const fragment = document.createDocumentFragment();

  pictures.forEach(({ id, url, description, likes, comments }) => {
    const card = cardTemplate.cloneNode(true);
    const image = card.querySelector('.picture__img');

    card.dataset.pictureId = id;
    image.src = url;
    image.alt = description;
    card.querySelector('.picture__likes').textContent = likes;
    card.querySelector('.picture__comments').textContent = comments.length;

    fragment.append(card);
  });

  container.append(fragment);
};


container.addEventListener('click', (evt) => {
  const currentPictureNode = evt.target.closest('.picture');

  if (currentPictureNode) {
    evt.preventDefault();
    const pictureId = currentPictureNode.dataset.pictureId;
    const currentPhoto = localPhotos.find((photo) => photo.id === Number(pictureId));
    openBigPicture(currentPhoto);
  }
});
