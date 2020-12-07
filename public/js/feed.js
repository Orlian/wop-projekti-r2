'use strict';

const url = '/app2/';
const imageFeed = document.querySelector('.card-container');
const addForm = document.getElementById('add-image');
//const imagesOnLoad = 3;
//let loadedImgN = 0;
let limitstart = 0;
const feedUser = JSON.parse(sessionStorage.getItem('user'));


/**Create image cards**/
const createImageCards = (images) => {

  //imageFeed.innerHTML = '';
  images.forEach(async (image) => {

    const card = document.createElement('div');
    card.classList.add('card');

    const img = document.createElement('img');
    img.src = url + '/uploads/' + image.imgfile;
    img.alt = image.caption.slice(0, 20);
    img.classList.add('image');

    const aside = document.createElement('div');
    aside.classList.add('aside');

    const commentsContainer = document.createElement('div');
    commentsContainer.classList.add('comments-container');

    const username = document.createElement('h5');
    username.innerHTML = `${image.username}`;

    const captionContainer = document.createElement('div');
    captionContainer.classList.add('img-caption');

    const imageCaption = document.createElement('p');
    imageCaption.innerHTML = image.caption;

    const likesContainer = document.createElement('div');
    likesContainer.classList.add('likes');

    const likesCount = image.likes[0].likecount;
    const likes = document.createElement('p');
    likes.innerHTML = `${likesCount} likes`;
    const commentsTitle = document.createElement('h4');
    commentsTitle.innerHTML = `Comments`;

    const commentsUl = document.createElement('ul');
    commentsUl.classList.add('comments');

    const comments = image.comments;

    comments.forEach((comment) => {
      const commentLi = document.createElement('li');
      const commentContent = document.createElement('p');
      commentContent.classList.add('comment-content');
      commentContent.innerHTML = `${comment.commentcontent}`;
      const commentAuthor = document.createElement('h6');
      commentAuthor.innerHTML = `${comment.username}`;
      const commentTime = document.createElement('h6');
      commentTime.classList.add('comment-time');
      commentTime.innerHTML = `${comment.timestamp}`;
      commentLi.appendChild(commentAuthor);
      commentLi.appendChild(commentContent);
      commentLi.appendChild(commentTime);
      commentsUl.appendChild(commentLi);
    });

    const formsContainer = document.createElement('div');
    formsContainer.classList.add('forms-container');

    const commentForm = document.createElement('form');
    commentForm.classList.add('comment-form');

    const likeForm = document.createElement('form');
    likeForm.classList.add('like-form');

    const input = document.createElement('textarea');
    input.classList.add('comment-input');
    input.name = 'comment';
    input.placeholder = 'Write a comment';
    input.cols = 56;
    input.rows = 5;
    input.style.resize = 'none';

    const commentBtn = document.createElement('button');
    commentBtn.type = 'submit';
    commentBtn.classList.add('comment-btn');
    commentBtn.innerHTML = `Comment`;

    const likeBtn = document.createElement('button');
    likeBtn.type = 'submit';
    likeBtn.classList.add('like-btn');

    const likeIcon = document.createElement('ion-icon');
    likeIcon.name = 'heart-outline';

    likeBtn.addEventListener('click', (evt) => {
      //evt.preventDefault();
      try {

      } catch {

      }
    });

    commentsContainer.appendChild(username);
    captionContainer.appendChild(imageCaption);
    commentsContainer.appendChild(captionContainer);

    commentsContainer.appendChild(commentsTitle);
    commentsContainer.appendChild(commentsUl);

    commentForm.appendChild(input);
    commentForm.appendChild(commentBtn);

    likeBtn.appendChild(likeIcon);
    likesContainer.appendChild(likes);
    likeForm.appendChild(likeBtn);
    likeForm.appendChild(likesContainer);

    formsContainer.appendChild(commentForm);
    formsContainer.appendChild(likeForm);

    aside.appendChild(commentsContainer);
    aside.appendChild(formsContainer);


    card.appendChild(img);
    card.appendChild(aside);

    imageFeed.appendChild(card);
  });
};

/**Fetching all posts data from database**/
const getPosts = async () => {
  try {
    const options = {
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const response = await fetch(url + '/post/recent/' + limitstart, options);
    const images = await response.json();
    console.log('getPost images', images);
    createImageCards(images);
    limitstart += 10;
  } catch (e) {
    console.log(e.message);
    const response = await fetch(url + '/auth/logout');
    const json = await response.json();
    console.log('logout json', json);
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    location.href = 'front-page.html';
  }
};

getPosts();

//Miten ladataan vaan kerran?
window.addEventListener('scroll', debounce(async () => {
  let scrollHeight = document.documentElement.scrollHeight;
  if (window.scrollY + window.innerHeight >= scrollHeight - 100) {
    await getPosts;
  }
}, 400));


function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

/**Back to top button reveal and disappear on scroll**/
const topBtn = document.querySelector('.top-btn');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    if (!topBtn.classList.contains('btn-entrance')) {
      topBtn.classList.remove('btn-exit');
      topBtn.classList.add('btn-entrance');
      topBtn.style.display = 'block';
    }
  } else {
    if (topBtn.classList.contains('btn-entrance')) {
      topBtn.classList.remove('btn-entrance');
      topBtn.classList.add('btn-exit');
      setTimeout(() => {
        topBtn.style.display = 'none';
      }, 250);
    }
  }
});

topBtn.addEventListener('click', () => {
  window.scrollTo(0, 0);
});

addForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const fd = new FormData(addForm);
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
    },
    body: fd,
  };
  try {
    const response = await fetch(url + '/post', fetchOptions);
    const json = await response.json();
    console.log('add response', json);
  } catch (e) {
    console.log(e.message);
  }
  getPosts();
});
