'use strict';

const url = '/app2/'; //TODO Varmista että url on oikein

const searchList = document.querySelector('.search-result-wrapper');
const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const searchResultsFor = document.querySelector('#search-results-for');

// Search result kentän täyttäminen
const fillSearchList = (hits) => {
  searchResultsFor.innerHTML = '';
  searchResultsFor.innerHTML = `Search results for "${searchInput.value}"`
  searchList.innerHTML = '';
  hits.forEach((hit) => {
    const gridItem = document.createElement('div');
    gridItem.classList.add('grid-item');
    const img = document.createElement('img');
    img.src = url + '/thumbnails/' + hit.imgfile;
    img.alt = hit.caption.slice(0, 20);
    gridItem.appendChild(img);
    searchList.appendChild(gridItem);

    //TODO Tänne vielä modaalina avaamiset ja muiden elementtien luomiset per hakutulos
  });
}

searchForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const data = serializeJson(searchForm);
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(url + '/search/' + searchInput.value, fetchOptions);
  const searchData = await response.json();
  console.log('search-result response', searchData);
  fillSearchList(searchData);
});