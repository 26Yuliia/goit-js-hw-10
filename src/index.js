import './css/main.css';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { refs } from './js/refs';
import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import { Notify } from 'notiflix';
import { handleLoadingActive, handleLoadingDisable } from './js/load';

//const search = document.querySelector('breed-select');
//search.addEventListener('submit', onSearch);

//function onSearch(evt) {
// evt.preventDefault();
// const { query, fetchBreeds } = evt.currentTarget.elements;
// fetchBreeds(query.value, fetchBreeds.value);
//}
new SlimSelect({
  select: '#single',
});

refs.catBreedsList.setAttribute('id', 'single');
refs.loaderRef.insertAdjacentHTML(
  'beforebegin',
  `<div class="load"><span class='load-img'></span></div>`
);
export const loadImage = document.querySelector('div.load');

handleLoadingActive();
setTimeout(() => {
  createBreedsList();
}, 900);

refs.catBreedsList.addEventListener('change', createCatDescription);

function renderByOptions(base) {
  handleLoadingDisable();
  const markup = base
    .map(({ id, name }) => {
      return `<option value=${id}>${name}</option>`;
    })
    .join('');
  refs.catBreedsList.insertAdjacentHTML('beforeend', markup);
  new SlimSelect({
    select: '#single',
  });
}

function createBreedsList() {
  const startOption = `<option value="--Tap here--">--Tap here--</option>`;
  refs.catBreedsList.insertAdjacentHTML('afterbegin', startOption);
  fetchBreeds()
    .then(res => {
      renderByOptions(res);
      Notify.success('Hello!Find the furry one!');
    })
    .catch(err => {
      console.warn(err);
      refs.catBreedsList.style.visibility = 'hidden';
      Notify.failure('Oops! Something went wrong! Try reloading the page!');
    });
}

function createCatDescription() {
  handleLoadingActive();
  refs.catInfoRef.innerHTML = '';
  let breedId = refs.catBreedsList.value;
  fetchCatByBreed(breedId)
    .then(data => {
      if (breedId === '--Tap here--') {
        handleLoadingDisable();
        Notify.success('Tap and try to choose one...');
        return;
      }
      renderDescription(data);
      Notify.success('An incredible choice');
    })
    .catch(err => {
      console.warn(err);
      handleLoadingDisable();
      refs.catBreedsList.style.visibility = 'hidden';
      Notify.failure('Oops! Something went wrong! Try reloading the page!');
    });
}

function renderDescription(data) {
  setTimeout(() => {
    const catDescr = data.map(({ url, breeds }) => {
      return `<img class="cat-img" src=${url} alt=${breeds[0].name} width="500">
      <div class="cat-descr">
        <h2 class="cat-name">${breeds[0].name}</h2>
        <p class="about">${breeds[0].description}</p>
        <p><span class="tempo">Temperament: </span>${breeds[0].temperament}</p>
      </div>`;
    });

    refs.catInfoRef.insertAdjacentHTML('beforeend', catDescr);
    handleLoadingDisable();
  }, 900);
}
