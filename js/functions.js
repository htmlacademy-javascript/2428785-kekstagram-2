function generateComment() {
  const sentences = [];
  sentences.push(getRandomArrayItem(MESSAGES));
  if (Math.random() > 0.5) {
    sentences.push(getRandomArrayItem(MESSAGES));
  }
  return {
    id: globalCommentId++,
    avatar: `img/avatar-${getRandomInt(1,6)}.svg`,
    message: sentences.join(' '),
    name: getRandomArrayItem(NAMES)
  };
}

function generateComments() {
  const count = getRandomInt(0, 30);
  const comments = [];
  for (let i = 0; i < count; i++) {
    comments.push(generateComment());
  }
  return comments;
}

function generatePhoto(i) {
  return {
    id: i,
    url: `photos/${i}.jpg`,
    description: getRandomArrayItem(DESCRIPTIONS),
    likes: getRandomInt(15, 200),
    comments: generateComments(),
  };
}

function generatePhotos() {
  const photos = [];
  for (let i = 1; i <= 25; i++) {
    photos.push(generatePhoto(i));
  }
  return photos;
}

export {
  generateComment,
  generateComments,
  generatePhoto,
  generatePhotos
}
