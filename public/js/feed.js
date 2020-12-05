'use strict';
const url = '/app2/';
const imageFeed = document.querySelector('.card-container');
const addForm = document.getElementById('add-image');
const imagesOnLoad = 3;
let loadedImgN = 0;


/**Create image cards**/
const createImageCards = (images) => {

  imageFeed.innerHTML = '';
  images.forEach( async (image) => {

    const card = document.createElement('div');
    card.classList.add("card");


    const img = document.createElement('img');
    img.src = url + '/uploads/' + image.imgfile;
    img.alt = image.caption.slice(0, 20);
    img.classList.add("image");

    const aside = document.createElement('div');
    aside.classList.add("aside");

    const commentsContainer = document.createElement('div');
    commentsContainer.classList.add("comments-container");

    const username = document.createElement('h5');
    username.innerHTML = `${image.username}`;

    const captionContainer = document.createElement('div');
    captionContainer.classList.add("img-caption");

    const imageCaption = document.createElement('p');
    imageCaption.innerHTML = image.caption;

    const likesContainer = document.createElement('div');
    likesContainer.classList.add("likes");

    const likesCount = await getLikes(image.postid);
    console.log('forEach likecount', likesCount);
    const likes = document.createElement('p');
    likes.innerHTML = `${likesCount}`;

    const commentsTitle = document.createElement('h4');
    commentsTitle.innerHTML = `Comments`;

    const commentsUl = document.createElement('ul');
    commentsUl.classList.add("comments");

    const commentLi = document.createElement('li');
    //TODO fetch all comments from database

    const commentForm = document.createElement('form');
    commentForm.classList.add("comment-form");
    const input = document.createElement('textarea');
    input.classList.add("comment-input");
    input.name = 'comment';
    input.placeholder = 'Write a comment';
    input.cols = 56;
    input.rows = 5;
    input.style.resize = 'none';

    const btnContainer = document.createElement('div');
    btnContainer.classList.add("btn-container");

    const commentBtn = document.createElement('button');
    commentBtn.type = 'submit';
    commentBtn.classList.add("comment-btn");
    commentBtn.innerHTML = `Comment`;

    const likeBtn = document.createElement('button');
    likeBtn.type = 'submit';
    likeBtn.classList.add("like-btn");

    const likeIcon = document.createElement('ion-icon');
    likeIcon.name = 'heart-outline';

    likeBtn.addEventListener('click', (evt) => {
        //evt.preventDefault();
        try {

      } catch {

        }
    });



    captionContainer.appendChild(imageCaption);
    commentsContainer.appendChild(captionContainer);

    likesContainer.appendChild(likes);
    commentsContainer.appendChild(likesContainer);

    commentsContainer.appendChild(commentsTitle);

    commentsContainer.appendChild(username);

    commentsUl.appendChild(commentLi);
    commentsContainer.appendChild(commentsUl);

    commentForm.appendChild(input);
    commentForm.appendChild(btnContainer);

    likeBtn.appendChild(likeIcon);
    btnContainer.appendChild(likeBtn);
    btnContainer.appendChild(commentBtn);

    aside.appendChild(commentsContainer);
    aside.appendChild(commentForm);

    card.appendChild(img);
    card.appendChild(aside);

    imageFeed.appendChild(card);

  });
};


/**Fetching all posts data from database**/
const getPosts = async () => {
  console.log('getPost token ', sessionStorage.getItem('token'));
  try {
    const options = {
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const response = await fetch(url + '/post/recent', options);
    const images = await response.json();
    createImageCards(images);
  } catch (e) {
    console.log(e.message);
  }
};

getPosts();

const getLikes = async (postId) => {
  console.log('getPost token ', sessionStorage.getItem('token'));
  try {
    const options = {
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const response = await fetch(url + '/like/' + postId,  options);
    const [likes] = await response.json();
    console.log('getLikes response', likes);
    return likes.likecount;
  } catch (e) {
    console.log(e.message);
  }
};



/*window.addEventListener('scroll', () => {
  let scrollHeight = document.documentElement.scrollHeight;
  if (window.scrollY + window.innerHeight > scrollHeight - 100) {
    createCards();
  }
}); */

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
  try{
    const response = await fetch(url + '/post', fetchOptions);
    const json = await response.json();
    console.log('add response', json);
  }catch (e) {
    console.log(e.message);
  }
  getPosts();
});

