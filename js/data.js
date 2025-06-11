import { DESCRIPTIONS, MESSAGES, NAMES, AVATAR_MIN, AVATAR_MAX, COMMENT_MIN, COMMENT_MAX, LIKES_MIN, LIKES_MAX, TOTAL_CARDS } from "./constants.js";
import { getRandomArrayItem, getRandomInt } from "./utils.js";

let globalCommentId = 1;

const generateComment = () => {
  const sentences = [];
  sentences.push(getRandomArrayItem(MESSAGES));
  if (Math.random() > 0.5) {
    sentences.push(getRandomArrayItem(MESSAGES));
  }
  return {
    id: globalCommentId++,
    avatar: `img/avatar-${getRandomInt(AVATAR_MIN, AVATAR_MAX)}.svg`,
    message: sentences.join(' '),
    name: getRandomArrayItem(NAMES)
  };
}

function generateComments() {
  const count = getRandomInt(COMMENT_MIN, COMMENT_MAX);
  const comments = [];
  for (let i = 0; i < count; i++) {
    comments.push(generateComment());
  }
  return comments;
}

const generatePhoto = (i) => ({
  id: i,
  url: `photos/${i}.jpg`,
  description: getRandomArrayItem(DESCRIPTIONS),
  likes: getRandomInt(LIKES_MIN, LIKES_MAX),
  comments: generateComments(),
});

function generatePhotos() {
  const photos = [];
  for (let i = 1; i <= TOTAL_CARDS; i++) {
    photos.push(generatePhoto(i));
  }
  return photos;
}

export {
  generatePhotos
}
