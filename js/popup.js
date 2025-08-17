import { Popups } from "./constants.js"

const successTemplate = document.querySelector(`#${Popups.SUCCESS}`).content.querySelector(`.${Popups.SUCCESS}`);
const errorTemplate = document.querySelector(`#${Popups.ERROR}`).content.querySelector(`.${Popups.ERROR}`);
const body = document.body;
const templates = {
  [Popups.SUCCESS]: successTemplate,
  [Popups.ERROR]: errorTemplate
};

export const showPopup = (type) => {
  const popup = templates[type].cloneNode(true);
  body.append(popup);

  popup.addEventListener('click', ({ target }) => {
    if (target.classList.contains(type) || target.classList.contains(`${type}__button`)) {
      popup.remove();
    }
  })
}