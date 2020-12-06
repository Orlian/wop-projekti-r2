'use strict';
import {getLikes, getComments} from './feed';

const url = '/app2/'; //TODO Varmista että url on oikein

const searchList = document.querySelector('.search-result-wrapper');
const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const searchResultsFor = document.querySelector('#search-results-for');
const searchModal = document.querySelector('#image-search-modal');
const searchModalFigImg = document.querySelector('#search-post-image');
const searchModalFigCap = document.querySelector('#image-figcaption');
const searchModalFigUser = document.querySelector('#image-owner');
const searchModalFeedbackComments = document.querySelector('.comments');
const searchModalFeedbackLikes = document.querySelector('.likes p');


// Search result kentän täyttäminen
const fillSearchList = (hits) => {
  searchResultsFor.innerHTML = '';
  searchResultsFor.innerHTML = `Search results for "${searchInput.value}"`
  searchList.innerHTML = '';
  hits.forEach((hit) => {
    const gridItem = document.createElement('div');
    const gridUser = document.createElement('h3');
    gridItem.classList.add('grid-item');
    gridUser.classList.add('grid-poster');
    gridUser.innerHTML = hit.username;
    const img = document.createElement('img');
    img.src = url + '/thumbnails/' + hit.imgfile;
    img.alt = hit.caption.slice(0, 20);
    gridItem.appendChild(img);
    gridItem.appendChild(gridUser);
    searchList.appendChild(gridItem);

    img.addEventListener('click', async (evt) => {
      evt.preventDefault();
      searchModal.style.display = 'flex';
      //kuva, postaaja, kuvateksti, kommentit, liket
      searchModalFigImg.src = url + '/uploads/' + hit.imgfile;
      searchModalFigImg.alt = hit.caption.slice(0,20);
      searchModalFigCap.innerHTML = hit.caption;
      searchModalFigUser.innerHTML = hit.username;
      searchModalFeedbackComments.innerHTML = '';
      const comments = await getComments(hit.postid);
      comments.forEach((comment) => {
        const commentLi = document.createElement('li');
        const commentContent = document.createElement('p');
        commentContent.classList.add('comment-content');
        commentContent.innerHTML = `${comment.commentcontent}`;
        const commentAuthor = document.createElement('h5');
        commentAuthor.innerHTML = `${comment.username}`;
        const commentTime = document.createElement('h5');
        commentTime.classList.add('comment-time');
        commentTime.innerHTML = `${comment.timestamp}`;
        commentLi.appendChild(commentAuthor);
        commentLi.appendChild(commentContent);
        commentLi.appendChild(commentTime);
        searchModalFeedbackComments.appendChild(commentLi);
      });
      searchModalFeedbackLikes.innerHTML = await getLikes(hit.postid);
    });
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