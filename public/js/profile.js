'use strict';
const url = '/app2/';
const userPosts = document.querySelector('.grid-item');
const modalImage = document.getElementById('user-post-image');
const imageFigure = document.querySelector('figure');
const figureFigcaption = document.querySelector('figcaption');
const deleteImgButton = document.getElementById('delete-image');
const commentSection = document.querySelector('.comments');
const imageModal = document.getElementById('image-user-modal');


const getPostComments = async (postid) => {
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
      const comments = await getPostComments(image.postid);
      console.log(comments);
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


    const comment = document.createElement('li');
    /*comment.innerHTML = ;
    commentSection.*/


    imageFigure.appendChild(postImage);
    imageFigure.appendChild(figureFigcaption);
  });
};

const getUserPosts = async () => {
  try {
    const fetchOptions = {
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const parsedTokenEmail = parseJwt(sessionStorage.getItem('token')).email.escape();
    console.log('current user email', parsedToken.email)
    const response = await fetch(url + '/post/' + parsedTokenEmail, fetchOptions); //TODO Selvitä miten haettiin aktiivinen käyttäjä
    const posts = await response.json();
    console.log('getUserPost json', posts);
    createUserGrid(posts);
  } catch (err) {
    console.error(err.message);
  }
};

getUserPosts();

function parseJwt (token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}