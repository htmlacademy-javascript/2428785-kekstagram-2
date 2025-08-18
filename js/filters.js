import { Filters, RANDOM_LIMIT, RANDOM_MIDPOINT } from './constants';
import { renderCards } from './render';
import { debounce } from './utils';

const filtersSection = document.querySelector('.img-filters');
const filtersForm = document.querySelector('.img-filters__form');

let localPhotos;

const debouncedRender = debounce(renderCards);

const FiltersActions = {
  [Filters.DEFAULT]: () => localPhotos,
  [Filters.DISCUSSED]: () => [...localPhotos].sort((a, b) => b.comments.length - a.comments.length),
  [Filters.RANDOM]: () => [...localPhotos].sort(() => Math.random() - RANDOM_MIDPOINT).slice(0, RANDOM_LIMIT),
};

const showFilters = () => {
  filtersSection.classList.remove('img-filters--inactive');
};

export const initFilters = (photos) => {
  showFilters();
  localPhotos = [...photos];
};

const setActiveButton = (button) => {
  document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  button.classList.add('img-filters__button--active');
};

filtersForm.addEventListener('click', ({ target }) => {
  const button = target.closest('.img-filters__button');
  if (button) {
    setActiveButton(button);
    debouncedRender(FiltersActions[button.id]());
  }
});
