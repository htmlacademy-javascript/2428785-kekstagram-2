const cardTemplate = document.querySelector('#picture').content.querySelector('.picture');
const container = document.querySelector('.pictures');

export const renderCards = (pictures) => {
  console.log(pictures)

  const fragment = document.createDocumentFragment();

  pictures.forEach(({ id, url, description, likes, comments }) => {
    const card = cardTemplate.cloneNode(true)
    const image = card.querySelector('.picture__img')

    card.dataset.pictureId = id;
    image.src = url;
    image.alt = description;
    card.querySelector('.picture__likes').textContent = likes;
    card.querySelector('.picture__comments').textContent = comments.length;

    fragment.append(card);
  });

  container.append(fragment);
}

export { container };
