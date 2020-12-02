'use strict';
const url = '/app2/';
const imageFeed = document.querySelector('.card-container');
const addForm = document.getElementById('add-image');
const imagesOnLoad = 3;
let loadedImgN = 0;

/*const createCards = (images) => {
  while (loadedImgN < images.length) {
    imageFeed.innerHTML += `<div class="card">
                            <img src="${url + '/uploads/' + images[loadedImgN].filename}" class="image" alt="User post">
                            <div class="aside">
                                <div class="comments-container">
                                    <div class="img-caption"><p>Caption from db</p></div>
                                    <div class="likes">
                                        <p>N Likes</p>
                                    </div>
                                    <h4>Comments</h4>
                                    <ul class="comments">
                                        <li>Comment</li>
                                        <li>Comment2</li>
                                        <li>Comment3</li>
                                    </ul>
                                 </div>
                                 <form>
                                    <textarea name="comment" placeholder="Write a comment" cols="56" rows="5"
                                    ></textarea>
                                    <div class="btn-container">
                                    <button type="submit" class="like-btn"><ion-icon name="heart-outline"></ion-icon> </button>
                                    <button type="submit" class="comment-btn">Comment</button> 
                                    </div>
                                </form>
                            </div>
                          
</div>`;
    loadedImgN++;
    if (loadedImgN % imagesOnLoad === 0) {
      break;
    }
  }
};

createCards();
*/
//AJAX call: tuleeko tänne getPost token

const getImages = async () => {
  console.log('getPost token ', sessionStorage.getItem('token'));
  try {
    const options = {
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const response = await fetch(url + '/post', options);
    const images = await response.json();
    createCards(images);
  }
  catch (e) {
    console.log(e.message);
  }
};

//getImages();

window.addEventListener('scroll', () => {
  let scrollHeight = document.documentElement.scrollHeight;
  if (window.scrollY + window.innerHeight > scrollHeight - 100) {
    createCards();
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
  const response = await fetch(url + '/post', fetchOptions);
  const json = await response.json();
  console.log('add response', json);
  //getImages();
});