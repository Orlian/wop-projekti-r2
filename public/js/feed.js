'use strict';

const url = '/app2/';
const imageFeed = document.querySelector('.card-container');

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
    card.id = `${images.indexOf(image) +1}`

    const imgContainer = document.createElement('div');
    imgContainer.classList.add('img-container');

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
    const commenters = await getCommenter(image.postid);

    comments.forEach((comment) => {
      const commentLi = document.createElement('li');
      const commentContent = document.createElement('p');
      commentContent.classList.add('comment-content');
      commentContent.innerHTML = `${comment.commentcontent}`;
      const commentAuthor = document.createElement('h6');
      commentAuthor.innerHTML = `${comment.username}`;
      const commentTime = document.createElement('h6');
      commentTime.classList.add('comment-time');
      const properTime = new Date(comment.timestamp); //Tästä mallia sortaukseen
      const formattedTime = properTime.getDate() + '.' + (properTime.getMonth()+1)+
          '.' + properTime.getFullYear() + ' ' +
          ((properTime.getHours() < 10 ? '0' : '') + properTime.getHours()) +
          ':' +
          ((properTime.getMinutes() < 10 ? '0' : '') +
              properTime.getMinutes()) + ':' +
          ((properTime.getSeconds() < 10 ? '0' : '') + properTime.getSeconds());
      commentTime.innerHTML = `${formattedTime}`;
      commentLi.appendChild(commentAuthor);
      commentLi.appendChild(commentContent);
      commentLi.appendChild(commentTime);
      commentsUl.appendChild(commentLi);

      commenters.forEach((commenter) => {
        if (commenter.commentid === comment.commentid) {
          const deleteCommentButton = document.createElement('button');
          const deleteCommentIcon = document.createElement('ion-icon');
          deleteCommentIcon.classList.add('delete-comment-icon');
          deleteCommentIcon.name = 'close-outline';
          deleteCommentButton.appendChild(deleteCommentIcon);
          commentLi.appendChild(deleteCommentButton);
          deleteCommentButton.id = 'delete-comment-button';
          deleteCommentButton.addEventListener('click', async (evt) => {
            evt.preventDefault();
            const fetchOptions = {
              method: 'DELETE',
              headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
              },
            };
            try {
              await fetch(
                  url + '/comment/' + image.postid + '/' + comment.commentid,
                  fetchOptions);
            } catch (error) {
              console.log(error.message);
            }
          });
        }
      });
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

    commentForm.addEventListener('submit', async (evt) => {
      evt.preventDefault();
      const data = serializeJson(commentForm);
      const fetchOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
        },
        body: JSON.stringify(data),
      };
      try {
        const response = await fetch(url + '/comment/' + image.postid,
            fetchOptions);
        const comment = await response.json();
        location.reload();
      } catch (err) {
        console.log(err.message);
      }
    });

    const likeBtn = document.createElement('button');
    likeBtn.type = 'submit';
    likeBtn.classList.add('like-btn');

    const liker = await getLiker(image.postid);
    const likeIcon = document.createElement('ion-icon');
    likeIcon.name = 'heart';

    if (liker.length < 1) {
      likeIcon.style.color = 'black';
    } else {
      likeIcon.style.color = 'red';
    }
    if (liker.length < 1) {
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
          const response = await fetch(url + '/like/' + image.postid,
              fetchOptions);
          const like = await response.json();
          likeIcon.style.display = 'block';
          likeIcon.style.color = 'red';
        } catch (error) {
          console.log(error.message);
        }
      });
    } else {
      likeForm.addEventListener('submit', async (evt) => {
        evt.preventDefault();
        const data = serializeJson(likeForm);
        const fetchOptions = {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
          },
          body: JSON.stringify(data),
        };
        try {
          const response = await fetch(url + '/like/' + image.postid,
              fetchOptions);
          const like = await response.json();
          console.log('Add like', like);
          likeIcon.style.color = 'black';
        } catch (error) {
          console.log(error.message);
        }
      });
    }

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

    imgContainer.appendChild(img);
    card.appendChild(imgContainer);
    card.appendChild(aside);
    imageFeed.appendChild(card);
  });
  imageFeed.Array.prototype.slice().call(imageFeed.children).sort((a,b) => a.id - b.id);
  for(let i = 0; i < htmlArray.length; i++){
    const parent = htmlArray[i].parentNode;
    const detachedItem = parent.removeChild(htmlArray[i]);
    parent.appendChild(detachedItem);
  }
  console.log('Organized nodelist', imageFeed.children);
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
    const images = await response.json();
    if (images) {
      loading = false;
    }
    if (images.length < 10) {
      viimeinen = true;
    }
    limitstart += 10;
    createImageCards(images);
  } catch (e) {
    console.log(e.message);
    const response = await fetch(url + '/auth/logout');
    const json = await response.json();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    location.href = 'front-page.html';
  }
};

getPosts();

const getLiker = async (postId) => {
  try {
    const options = {
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const response = await fetch(url + '/like/author/' + postId, options);
    const likeStatus = await response.json();
    return likeStatus;
  } catch (e) {
    console.log(e.message);
  }
};

//Miten ladataan vaan kerran?
window.addEventListener('scroll', () => {
  let scrollHeight = document.documentElement.scrollHeight;
  if (window.scrollY + window.innerHeight >= scrollHeight - 100) {
    if (!loading && !viimeinen) {
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



const getCommenter = async (postId) => {
  try {
    const options = {
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const response = await fetch(url + '/comment/author/' + postId, options);
    const commentStatus = await response.json();
    return commentStatus;
  } catch (e) {
    console.log(e.message);
  }
};
