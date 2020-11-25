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

];

'use strict';
const imageFeed = document.querySelector('.card-container');

for (let i = 0; i < imagesArray.length; i++) {
  imageFeed.innerHTML += `<div class="card">
                            <img src="${imagesArray[i].img}" class="image" alt="User post">
                            <div class="img-caption"><p>Caption from db</p></div>
                           
</div>`;
}

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