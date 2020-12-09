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
const topBtn = document.querySelector('.top-btn');
const commentForm = document.querySelector('.add-comment');
const likeForm = document.querySelector('.like-form');
const likeIcon = document.getElementById('like-icon');

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

const getComments = async (postid) => {
  try {
    const options = {
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const response = await fetch(url + '/comment/' + postid, options);
    return await response.json();
  } catch (e) {
    console.log(e.message);
  }
};

const getUserProfile = async () => {

  const fetchOptions = {
    headers: {
      'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
    },
  };
  try {
    const response = await fetch(url + '/user/' + user.email,
        fetchOptions);
    return await response.json();
  } catch (err) {
    console.log(err.message);
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
    gridItem.appendChild(postImage);
    //lisää luokkia jos tarve

    postImage.addEventListener('click', async (evt) => {
      evt.preventDefault();
      imageModal.style.display = 'flex';
      modalImage.src = url + '/uploads/' + image.imgfile;
      modalImage.alt = image.caption.slice(0, 10);
      imageCaption.innerHTML = image.caption;
      imageModalOwner.innerHTML = image.username;
      commentsUl.innerHTML = '';
      const comments = await getComments(image.postid);
      const commenters = await getCommenter(image.postid);
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
        const properTime = new Date(comment.timestamp); //Tästä mallia sortaukseen
        const formattedTime = properTime.getDate() + '.' +
            properTime.getMonth() +
            '.' + properTime.getFullYear() + ' ' +
            ((properTime.getHours() < 10 ? '0' : '') + properTime.getHours()) +
            ':' +
            ((properTime.getMinutes() < 10 ? '0' : '') +
                properTime.getMinutes()) + ':' +
            ((properTime.getSeconds() < 10 ? '0' : '') +
                properTime.getSeconds());
        commentTime.innerHTML = `${formattedTime}`;
        commentLi.appendChild(commentAuthor);
        commentLi.appendChild(commentContent);
        commentLi.appendChild(commentTime);
        commentsUl.appendChild(commentLi);

        commenters.forEach((commenter) => {
              if (commenter.commentid === comment.commentid) {
                const deleteCommentButton = document.createElement('button');
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
            },
        );
      });

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
        } catch (err) {
          console.log(err.message);
        }
        location.reload();
      });

      const liker = await getLiker(image.postid);
      imageModalFeedbackLikes.innerHTML = await getLikes(image.postid);

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
          location.reload();
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
            location.reload();
          } catch (error) {
            console.log(error.message);
          }
          location.reload();
        });
      }

      deleteImgButton.addEventListener('click', async (evt) => {
        evt.preventDefault();
        const fetchOptions = {
          method: 'DELETE',
          headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
          },
        };
        try {
          console.log('deleteimage button', image.postid);
          const response = await fetch(url + '/post/' + image.postid,
              fetchOptions);
          //const json = await response.json();
          //console.log('delete response', json);
          imageModal.style.display = 'none';
          await getUserPosts();
        } catch (e) {
          console.log(e.message);
        }
      });
      imageModal.addEventListener('blur', (evt) => {
        evt.preventDefault();
        commentForm.cancel();
      })
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
    const response = await fetch(url + '/post/user/' + user.userid,
        fetchOptions);
    console.log('getUserPost response', response);
    const posts = await response.json();
    console.log('getUserPost json', posts);
    const userData = await getUserProfile();
    profileImg.src = url + '/thumbnails/' + userData[0].userimg;
    profileName.innerHTML = userData[0].username;
    profileDesc.innerHTML = userData[0].description;
    userModalPicture.src = url + '/thumbnails/' + userData[0].userimg;
    userModalDescription.value = userData[0].description;
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