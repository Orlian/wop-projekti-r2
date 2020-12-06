'use strict';

const url = '/app2/'; //TODO Varmista että url on oikein

const searchList = document.querySelector('.search-result-list');
const searchInput = document.querySelector('.search-bar');
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
    img.alt = hit.description;
    gridItem.appendChild(img);
    searchList.appendChild(gridItem);

    //TODO Tänne vielä modaalina avaamiset ja muiden elementtien luomiset per hakutulos
  });
}

const getSearchData = async () => {

}