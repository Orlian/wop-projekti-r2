'use strict';
const url = '/app2/';

const userPosts = document.querySelector('.grid');
const modalImage = document.getElementById('user-post-image');
const imageCaption = document.getElementById('image-caption');
const deleteImgButton = document.getElementById('delete-image');
const imageModal = document.getElementById('image-user-modal');
const profileImg = document.querySelector('.profile-info img');
const profileName = document.querySelector('.profile-info h2');
const profileDesc = document.querySelector('.desc p');
const user = JSON.parse(sessionStorage.getItem('user'));
const imageModalFeedbackLikes = document.querySelector('.likes p');
const imageModalOwner = document.getElementById('image-owner');
const commentsUl = document.querySelector('.comments');
const editUserform = document.querySelector('.edit-user-form');
const saveButton = document.getElementById('save-button');
const userModalPicture = document.getElementById('user-picture');
const userModalDescription = document.getElementById('user-description');
const passwordInput = document.getElementById('password-input');
const passwordConfirmInput = document.getElementById('confirm-password-input');

const checkMatch = () => {
  if (passwordInput.value !== passwordConfirmInput.value) {
    //passwdMessage.style.color = 'red';
    //passwdMessage.innerHTML = 'not matching';
    saveButton.disabled = true;
  } else if (passwordInput.value === '') {
    //passwdMessage.style.color = 'red';
    //passwdMessage.innerHTML = 'password can\'t be empty';
    saveButton.disabled = true;
  } else {
    //passwdMessage.style.color = 'green';
    //passwdMessage.innerHTML = 'matching';
    saveButton.disabled = false;
  }
};


const getLikes = async (postId) => {
  try {
    const options = {
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const response = await fetch(url + '/like/' + postId, options);
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

const getUserProfile = () =>{
  profileImg.src = url + '/thumbnails/' + user.userimg;
  profileName.innerHTML = user.username;
  profileDesc.innerHTML = user.description;
};

const getUserProfileModal = () => {
  userModalPicture.src = url + '/thumbnails/' + user.userimg;
  userModalDescription.value = user.description;
};

const createUserGrid = (images) => {

  userPosts.innerHTML = '';

  images.forEach((image) => {
    const gridItem = document.createElement('div');
    const postImage = document.createElement('img');
    gridItem.classList.add('grid-item');
    postImage.src = url + '/thumbnails/' + image.imgfile;
    postImage.alt = image.caption.slice(0, 10);
    gridItem.appendChild(postImage);
    //lisää luokkia jos tarve

    postImage.addEventListener('click', async (evt) => {
      evt.preventDefault();
      imageModal.style.display = 'flex';
      modalImage.src = url + '/uploads/' + image.imgfile;
      modalImage.alt = image.caption.slice(0, 10);
      imageCaption.innerHTML = image.caption;
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

      deleteImgButton.addEventListener('click', async (evt) => {
        evt.preventDefault();
        const fetchOptions = {
          method: 'DELETE',
          headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
          },
        };
        try {
          console.log('deleteimage button', image.postid)
          const response = await fetch(url + '/post/' + image.postid,
              fetchOptions);
          //const json = await response.json();
          console.log('delete response', json);
          //await getUserPosts();
        }
        catch (e) {
          console.log(e.message);
        }
      });


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
    getUserProfile();
    getUserProfileModal();
    createUserGrid(posts);
  } catch (err) {
    console.error(err.message);
    const response = await fetch(url + '/auth/logout');
    const json = await response.json();
    console.log('logout json', json);
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    location.href = 'front-page.html';
  }
};

getUserPosts(); //TODO Selvitä onkelma
