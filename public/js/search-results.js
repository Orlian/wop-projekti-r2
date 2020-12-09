'use strict';
//Samaan html:ään linkattujen skriptien url muuttujat ei voi olla saman nimisiä koska ne yrittää ylikirjottaa toisiaan muuten virheellisesti!
const searchUrl = '/app2/';

const searchList = document.querySelector('.search-result-wrapper');
const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const searchResultsFor = document.querySelector('#search-results-for');
const searchModal = document.querySelector('#image-search-modal');
const searchModalFigImg = document.querySelector('#search-post-image');
const searchModalCaption = document.querySelector('#image-caption');
const searchModalUser = document.querySelector('#image-owner');
const searchModalFeedbackComments = document.querySelector('.comments');
const searchModalFeedbackLikes = document.querySelector('.likes p');
const params = new URLSearchParams(window.location.search);
const commentForm = document.querySelector('.add-comment');
const likeForm = document.querySelector('.like-form');
const likeIcon = document.getElementById('like-icon');
const topBtn = document.querySelector('.top-btn');


// Search result kentän täyttäminen
const fillSearchList = (hits) => {
  searchResultsFor.innerHTML = '';
  searchResultsFor.innerHTML = `Search results for "${params.get('search')}"`
  searchList.innerHTML = '';
  hits.forEach((hit) => {
    const gridItem = document.createElement('div');
    const gridUser = document.createElement('h3');
    gridItem.classList.add('grid-item');
    gridUser.classList.add('grid-poster');
    gridUser.innerHTML = hit.username;
    const img = document.createElement('img');
    img.src = searchUrl + '/thumbnails/' + hit.imgfile;
    img.alt = hit.caption.slice(0, 20);
    gridItem.appendChild(img);
    gridItem.appendChild(gridUser);
    searchList.appendChild(gridItem);

    img.addEventListener('click', async (evt) => {
      evt.preventDefault();
      searchModal.style.display = 'flex';
      searchModalFigImg.src = searchUrl + '/uploads/' + hit.imgfile;
      searchModalFigImg.alt = hit.caption.slice(0,20);
      searchModalCaption.innerHTML = hit.caption;
      searchModalUser.innerHTML = hit.username;
      searchModalFeedbackComments.innerHTML = '';
      const comments = await getSearchComments(hit.postid);
      const commenters = await getCommenter(hit.postid);

      comments.forEach((comment) => {
        const commentLi = document.createElement('li');
        const commentContent = document.createElement('p');
        commentContent.classList.add('comment-content');
        commentContent.innerHTML = `${comment.commentcontent}`;
        const commentAuthor = document.createElement('h5');
        commentAuthor.innerHTML = `${comment.username}`;
        const commentTime = document.createElement('h5');
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
        searchModalFeedbackComments.appendChild(commentLi);

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
                        searchUrl + '/comment/' + hit.postid + '/' + comment.commentid,
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
          const response = await fetch(searchUrl + '/comment/' + hit.postid,
              fetchOptions);
          const comment = await response.json();
        } catch (err) {
          console.log(err.message);
        }
        location.reload();
      });

      const liker = await getLiker(hit.postid);
      searchModalFeedbackLikes.innerHTML = await getSearchLikes(hit.postid);

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
            const response = await fetch(searchUrl + '/like/' + hit.postid,
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
            const response = await fetch(searchUrl + '/like/' + hit.postid,
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

    });
  });
}

/*searchForm.addEventListener('submit', async (evt) => {
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
  const response = await fetch(searchUrl + '/search/' + searchInput.value, fetchOptions); //params.search
  const searchData = await response.json();
  console.log('search-results onsubmit searchData', searchData);
  fillSearchList(searchData);
});*/

window.addEventListener('load', async (evt) => {
  evt.preventDefault();
  const fetchOptions = {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
    },
  };
  console.log('window onload body data', fetchOptions.body);
  const response = await fetch(searchUrl + '/search/params/' + params.get('search'), fetchOptions); //params.search
  const searchData = await response.json();
  console.log('search-results onload searchData', searchData);
  fillSearchList(searchData);
})

//params.get('search')

const getSearchComments = async (postid) => {
  try {
    const options = {
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const response = await fetch(searchUrl + '/comment/' + postid, options);
    return await response.json();
  } catch (e) {
    console.log(e.message);
  }
};

const getSearchLikes = async (postId) => {
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

const getLiker = async (postId) => {
  try {
    const options = {
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const response = await fetch(searchUrl + '/like/author/' + postId, options);
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
    const response = await fetch(searchUrl + '/comment/author/' + postId, options);
    const commentStatus = await response.json();
    return commentStatus;
  } catch (e) {
    console.log(e.message);
  }
};


//Potki pois ja logout jos väärä token tai ei tokenia

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