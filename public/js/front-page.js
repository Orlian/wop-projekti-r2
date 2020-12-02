'use strict';
const url = '/app2/';
const loginForm = document.getElementById('login-form');
const bgGallery = document.getElementById('background');

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

];




/*const width = window.outerWidth;

if (width < 1000 && width >= 750) {
  for (let i = 0; i < 9; i++) {
    bgGallery.innerHTML += `<div class="image-container">
                            <img src="${imagesArray[i].img}" class="image" alt=" Background Image">
</div>`;
  }
} else if (width < 1050 && width >= 1000) {
  for (let i = 0; i < 12; i++) {
    bgGallery.innerHTML += `<div class="image-container">
                            <img src="${imagesArray[i].img}" class="image" alt=" Background Image">
</div>`;
  }

} else if (width < 1400 && width >= 1050) {
  for (let i = 0; i < 6; i++) {
    bgGallery.innerHTML += `<div class="image-container">
                            <img src="${imagesArray[i].img}" class="image" alt=" Background Image">
</div>`;
  }
} else if (width < 1600 && width >= 1400) {
  for (let i = 0; i < 8; i++) {
    bgGallery.innerHTML += `<div class="image-container">
                            <img src="${imagesArray[i].img}" class="image" alt=" Background Image">
</div>`;
  }

} else { */

  for (let i = 0; i < imagesArray.length; i++) {
    bgGallery.innerHTML += `<div class="image-container">
                            <img src="${imagesArray[i].img}" class="image" alt=" Background Image">
</div>`;
  }


loginForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const data = new FormData(loginForm);
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer' + sessionStorage.getItem('token'),
    },
    body: data,
  };

  const response = await fetch(url + '/auth/login', fetchOptions);
  const json = await response.json();
  console.log('login response', json);
  if (!json.user) {
    alert(json.message);
  } else {
    // save token
    //sessionStorage.setItem('token', json.token);
    location.href = 'feed.html';
  }
});
