import { MESSAGES, NAMES, DESCRIPTIONS, globalCommentId } from "./data.js"

import { getRandomInt, getRandomArrayItem } from "./utils.js";

import { generateComment, generateComments, generatePhoto, generatePhotos } from "./functions.js";

const photos = generatePhotos();
console.log(photos);
