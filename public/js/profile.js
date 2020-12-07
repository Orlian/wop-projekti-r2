'use strict';
const url = '/app2/';

const userPosts = document.querySelector('.grid');
const modalImage = document.getElementById('user-post-image');
const imageFigure = document.querySelector('figure');
const figureFigcaption = document.querySelector('figcaption');
const deleteImgButton = document.getElementById('delete-image');
const commentSection = document.querySelector('.comments');
const imageModal = document.getElementById('image-user-modal');
const profileSection = document.querySelector('.profile-info');
const profileImg = document.querySelector('.profile-info img');
const profileName = document.querySelector('.profile-info h2');
const profileDesc = document.querySelector('.desc p');
const user = JSON.parse(sessionStorage.getItem('user'));
const imageModalFeedbackLikes = document.querySelector('.likes p');
const imageModalOwner = document.getElementById('image-owner');

const getLikes = async (postId) => {
  try {
    const options = {
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const response = await fetch(searchUrl + '/like/' + postId, options);
    const [likes] = await response.json();
    return likes.likecount;
  } catch (e) {
    console.log(e.message);
  }
};


const getComments = async (postid) => {
  try {
    const options = {
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const response = await fetch(url + '/comment/' + postid, options);
    return await response.json();
  }
  catch (e) {
    console.log(e.message);
  }
};


const createUserGrid = (images) => {

  userPosts.innerHTML = '';

  images.forEach((image) => {
    const gridItem = document.createElement('div');
    const postImage = document.createElement('img');
    gridItem.classList.add('grid-item');
    postImage.src = url + '/thumbnails/' + image.imgfile;
    postImage.alt = image.caption.slice(0, 10);
    //lisää luokkia jos tarve

    postImage.addEventListener('click', async () => {
      imageModal.style.display = 'flex';
      modalImage.src = url + '/uploads/' + image.imgfile;
      modalImage.alt = image.caption.slice(0, 10);
      figureFigcaption.innerHTML = image.caption;
      imageModalOwner.innerHTML = image.username;

      const comments = await getComments(image.postid);
      console.log(comments);

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

      imageModalFeedbackLikes.innerHTML = await getLikes(image.postid);

    });

    deleteImgButton.addEventListener('click', async () => {
      const fetchOptions = {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
        },
      };
      try {
        const response = await fetch(url + '/post/' + image.postid,
            fetchOptions);
        const json = await response.json();
        console.log('delete response', json);
      }
      catch (e) {
        console.log(e.message());
      }
    });

    userPosts.appendChild(gridItem);
  });
};

const getUserPosts = async () => {
  try {
    const fetchOptions = {
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const response = await fetch(url + '/post/user/' + user.userid, fetchOptions); //TODO Selvitä miten haettiin aktiivinen käyttäjä
    console.log('getUserPost response', response);
    const posts = await response.json();
    console.log('getUserPost json', posts);
    createUserGrid(posts);
  } catch (err) {
    console.error(err.message);
  }
};

getUserPosts(); //TODO Selvitä onkelma
