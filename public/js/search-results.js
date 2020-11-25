'use strict';

const url = '/app/'; //TODO Varmista että url on oikein

const searchList = document.querySelector('.search-result-list');
const searchInput = document.querySelector('.search-bar');
const searchResultsFor = document.querySelector('#search-results-for');

// Search result kentän täyttäminen
const fillSearchList = (hits) => {
  searchList.innerHTML = '';
  hits.forEach((hit) => {
    const li = document.createElement('li');
    const img = document.createElement('img');
    img.src = url + '/images/' + hit.filename;
    img.alt = hit.desc;
    li.appendChild(img);
    searchList.appendChild(li);

    //TODO Tänne vielä modaalina avaamiset ja muiden elementtien luomiset per hakutulos
  });
}