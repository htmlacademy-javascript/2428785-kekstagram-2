function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArrayItem(array) {
  return array[getRandomInt(0, array.length - 1)];
}

export {
  getRandomInt,
  getRandomArrayItem
}
