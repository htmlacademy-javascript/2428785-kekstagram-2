import { generatePhotos } from "./data.js";
import { renderCards } from "./render.js";
import { initUploadModal } from "./form.js";

const photos = generatePhotos();

renderCards(photos);

initUploadModal ();
