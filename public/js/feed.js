'use strict';
const url = '/app2/';
const imageFeed = document.querySelector('.card-container');
const addForm = document.getElementById('add-image');
const imagesOnLoad = 3;
let loadedImgN = 0;


/**Create image cards**/
const createImageCards = (images) => {

  imageFeed.innerHTML = '';
  images.forEach((image) => {

    const card = document.createElement('figure');
    imageFeed.appendChild(card);

    const img = document.createElement('img');
    img.src = url + '/uploads/' + image.imgfile;
    img.alt = image.caption.splice(0, 20);
    img.class = 'image';

    const aside = document.createElement('div');

    const commentsContainer = document.createElement('div');
    const captionContainer = document.createElement('div');
    const imageCaption = document.createElement('p');
    imageCaption.innerHTML = image.caption;

    const likesContainer = document.createElement('div');
    const likes = document.createElement('p');
    likes.innerHTML = `N of likes`;

    const commentsTitle = document.createElement('h4');
    const comments = document.createElement('ul');
    const comment = document.createElement('li');
    //TODO fetch all comments from database

    const commentForm = document.createElement('form');
    const input = document.createElement('textarea');
    input.name = 'comment';
    input.placeholder = 'Write a comment';
    input.cols = 56;
    input.rows = 5;
    input.style.resize = 'none';

    const btnContainer = document.createElement('button');
    btnContainer.class = 'btn-container';

    const commentBtn = document.createElement('button');
    commentBtn.type = 'submit';
    commentBtn.class = 'comment-btn';

    const likeBtn = document.createElement('button');
    likeBtn.type = 'submit';
    likeBtn.class = 'like-btn';

    const likeIcon = document.createElement('ion-icon');
    likeIcon.name = 'heart-outline';

    card.append(img);
    card.appendChild(aside);

    aside.appendChild(commentsContainer);
    commentsContainer.appendChild(captionContainer);
    commentsContainer.appendChild(likesContainer);
    commentsContainer.appendChild(commentsTitle);
    commentsContainer.appendChild(comments);
    comments.appendChild(comment);
    captionContainer.appendChild(imageCaption);
    likesContainer.append(likes);

    aside.appendChild(commentForm);
    commentForm.appendChild(input);
    commentForm.appendChild(btnContainer);
    commentForm.append(commentBtn);
    commentForm.append(likeBtn);
    likeBtn.appendChild(likeIcon);

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
    const response = await fetch(url + '/post', options);
    const images = await response.json();
    createImageCards(images);
  } catch (e) {
    console.log(e.message);
  }
};

getPosts();

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
  const response = await fetch(url + '/post', fetchOptions);
  const json = await response.json();
  console.log('add response', json);
});