import { renderCards } from "./render.js";
import { initUploadModal } from "./form.js";
import './effects-slider.js';
import { showAlert } from "./utils.js";
import { getData } from "./api.js";

getData()
  .then((photos) => {
    renderCards(photos);
  })
  .catch(() => {
    showAlert();
  });

initUploadModal();
