import { generatePhotos } from "./data.js";
import { renderCards } from "./render.js";

const photos = generatePhotos();

renderCards(photos);
