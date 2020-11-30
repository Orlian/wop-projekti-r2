const imagesArray = [

  {
    img: 'images/front-page/placeholder1.jpg',
  },

  {
    img: 'images/front-page/placeholder2.jpg',
  },

  {
    img: 'images/front-page/placeholder3.jpg',
  },

  {
    img: 'images/front-page/placeholder4.jpg',
  },

  {
    img: 'images/front-page/placeholder5.jpg',
  },

  {
    img: 'images/front-page/placeholder6.jpg',
  },

  {
    img: 'images/front-page/placeholder7.jpg',
  },

  {
    img: 'images/front-page/placeholder8.jpg',
  },

  {
    img: 'images/front-page/placeholder9.jpg',
  },

  {
    img: 'images/front-page/placeholder10.jpg',
  },

  {
    img: 'images/front-page/placeholder11.jpg',
  },

  {
    img: 'images/front-page/placeholder12.jpg',
  },

  {
    img: 'images/front-page/placeholder13.jpg',
  },

  {
    img: 'images/front-page/placeholder14.jpg',
  },

  {
    img: 'images/front-page/placeholder15.jpg',
  },

  {
    img: 'images/front-page/placeholder16.jpg',
  },

  {
    img: 'images/front-page/placeholder17.jpg',
  },

  {
    img: 'images/front-page/placeholder18.jpg',
  },

  {
    img: 'images/front-page/placeholder19.jpg',
  },

  {
    img: 'images/front-page/placeholder20.jpg',
  },

  {
    img: 'images/front-page/placeholder21.jpg',
  },

  {
    img: 'images/front-page/placeholder22.jpg',
  },

  {
    img: 'images/front-page/placeholder23.jpg',
  },

  {
    img: 'images/front-page/placeholder24.jpg',
  },

  {
    img: 'images/front-page/placeholder25.jpg',
  },

  {
    img: 'images/front-page/placeholder26.jpg',
  },

  {
    img: 'images/front-page/placeholder27.jpg',
  },

  {
    img: 'images/front-page/placeholder28.jpg',
  },

  {
    img: 'images/front-page/placeholder29.jpg',
  },

  {
    img: 'images/front-page/placeholder30.jpg',
  },

];

'use strict';
/**Loading 7 images on scroll, for as long as all images in the array are loaded**/
const imageFeed = document.querySelector('.card-container');
const imagesOnLoad = 3;
let loadedImgN = 0;

const loadImages = () => {
  while (loadedImgN < imagesArray.length) {
    imageFeed.innerHTML += `<div class="card">
                            <img src="${imagesArray[loadedImgN].img}" class="image" alt="User post">
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

loadImages();

window.addEventListener('scroll', () => {
  let scrollHeight = document.documentElement.scrollHeight;
  if (window.scrollY + window.innerHeight > scrollHeight - 100) {
    loadImages();
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