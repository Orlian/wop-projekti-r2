'use strict';

const url = '/app2/';
const imageFeed = document.querySelector('.card-container');
const addForm = document.getElementById('add-image');
//const imagesOnLoad = 3;
//let loadedImgN = 0;
let limitstart = 0;
const feedUser = JSON.parse(sessionStorage.getItem('user'));
let loading = false;
let viimeinen = false;

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
    likeIcon.style.display = 'block';

    const likeIconFill = document.createElement('ion-icon');
    likeIconFill.name = 'heart';
    likeIconFill.style.display = 'none';

    likeForm.addEventListener('submit', async (evt) => {
      evt.preventDefault();
      const data = serializeJson(likeForm);
      const fetchOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
        },
        body: JSON.stringify(data),
      };
      try {
        const response = await fetch(url + '/like/' + image.postId, fetchOptions);
        const like = await response.json();
        console.log('Add like', like);
        likeIcon.style.display = 'none';
        likeIconFill.style.display = 'block';
        likeIconFill.style.color = 'red';
      } catch (error) {
        console.log(error.message);
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
    likeBtn.appendChild(likeIconFill);
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
  loading = true;
  try {
    const options = {
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const response = await fetch(url + '/post/recent/' + limitstart, options);
    limitstart += 10;
    const images = await response.json();
    if(images){
      loading = false;
    }
    if(images.length < 10){
      viimeinen = true;
    }
    console.log('getPost images', images);
    createImageCards(images);
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
window.addEventListener('scroll', () => {
  let scrollHeight = document.documentElement.scrollHeight;
  if (window.scrollY + window.innerHeight >= scrollHeight - 100) {
    if(!loading && !viimeinen) {
      getPosts();
    }
  }
});

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
