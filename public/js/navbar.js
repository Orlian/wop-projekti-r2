'use strict';
const navbarUrl = '/app2/';
const toggle = document.querySelector('.toggle');
const menu = document.querySelector('.menu');
const items = document.querySelectorAll('.item');
const postModal = document.getElementById('post-modal');
const editModal = document.getElementById('edit-user-modal');
const postButtonNav = document.getElementById('add-pic-button');
const postPicture = document.getElementById('art-img');
const spans = document.querySelectorAll('.close');
const modals = document.querySelectorAll('.modal');
const editLink = document.getElementById('edit-link');
const logoutLink = document.getElementById('logout-link');
const addImageButton = document.getElementById('post-button');
const addImageCancel = document.getElementById('cancel-button');
const addImageCaption = document.getElementById('add-image-caption');
const plusButton = document.getElementById('plus-button')
const editUserButton = document.getElementById('save-button');
const editUserCancel = document.getElementById('user-cancel-button');
const deleteUserButton = document.getElementById('delete-button');
const logo = document.getElementById('logo-img');
const navbarUser = JSON.parse(sessionStorage.getItem('user'));
const editUserForm = document.getElementById('edit-user-form');
const addForm = document.getElementById('add-image');
const passwordInput = document.getElementById('password-input');
const passwordConfirmInput = document.getElementById('confirm-password-input');
const userPictureNavbar = document.getElementById('user-picture');
const userDescription = document.getElementById('user-description');

logo.onclick = () => {
  location.href = 'feed.html';
};

plusButton.addEventListener('click', (evt)=>{
  evt.preventDefault();
});

const checkMatch = () => {
  if (passwordInput.value !== passwordConfirmInput.value) {
    saveButton.disabled = true;
  }
  else if (passwordInput.value === '') {
    saveButton.disabled = true;
  }
  else {
    saveButton.disabled = false;
  }
};


function toggleMenu() {
  if (menu.classList.contains('active')) {
    menu.classList.remove('active');
    toggle.querySelector(
        'a').innerHTML = '<ion-icon id="menu-img" name="menu-outline">';
  }
  else {
    menu.classList.add('active');
    toggle.querySelector(
        'a').innerHTML = '<ion-icon name="close-outline"></ion-icon>';
  }

}

toggle.addEventListener('click', toggleMenu, false);

function toggleItem() {
  if (this.classList.contains('submenu-active')) {
    this.classList.remove('submenu-active');
  }
  else if (menu.querySelector('.submenu-active')) {
    menu.querySelector('.submenu-active').classList.remove('submenu-active');
    this.classList.add('.submenu-active');
  }
  else {
    this.classList.add('submenu-active');
  }
}

for (let item of items) {
  if (item.querySelector('.submenu')) {
    item.addEventListener('click', toggleItem, false);
    item.addEventListener('keypress', toggleItem, false);
  }
}

function closeSubmenu(e) {
  let isClickInside = menu.contains(e.target);

  if (!isClickInside && menu.querySelector('.submenu-active')) {
    menu.querySelector('.submenu-active').classList.remove('submenu-active');
  }
}

postButtonNav.onclick = function() {
  postModal.style.display = 'flex';
};

addImageButton.onclick = () => {
  postModal.style.display = 'none';
};

addImageCancel.onclick = () => {
  postPicture.src = 'http://placekitten.com/200/200';
  postModal.style.display = 'none';
};

spans.forEach((span) => {
  span.addEventListener('click', () => {
    postPicture.src = 'http://placekitten.com/200/200';
    span.parentNode.parentNode.parentNode.parentNode.style.display = 'none';
  });
});

editLink.onclick = function() {
  getUserProfileNavbar();
  editModal.style.display = 'flex';
};
editUserButton.onclick = () =>{
  editModal.style.display = 'none';
};
editUserCancel.onclick = () =>{
  editModal.style.display = 'none';
};

deleteUserButton.onclick = async() => {
  const confirm = window.confirm('Are you sure you want leave us ;(');
  if(confirm){
    // TODO poista uskoton käyttäjä, petturi
    const fetchOptions = {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    try {
      const response = await fetch(navbarUrl + '/user/' + navbarUser.userid, fetchOptions);
      const json = await response.json();
      console.log('delete response', json);

      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
    }
    catch (e) {
      console.log(e.message());
    }
    console.log(confirm);

  }
};

window.onclick = function(event) {

  modals.forEach((modal)=>{
    if(event.target === modal){
      if(modal.id === 'post-modal'){
        postPicture.src = 'http://placekitten.com/200/200';
        modal.style.display = 'none';
      }
      if(modal.id === 'image-user-modal'){
        const addCommentForm = document.querySelector('.add-comment');
        addCommentForm.reset();
      }
      modal.style.display = 'none';
    }
  })
};

logoutLink.addEventListener('click', async (evt) => {
  evt.preventDefault();
  try {
    const options = {
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const response = await fetch(navbarUrl + '/auth/logout', options);
    const json = await response.json();
    console.log('logout json', json);

    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    location.href = 'front-page.html';
    alert('You have logged out');
  }
  catch (err) {
    console.log(err.message);
  }
});

const getUserProfileNavbar = async () => {

  const fetchOptions = {
    headers: {
      'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
    },
  };
  try {
    const response = await fetch(navbarUrl + '/user/' + navbarUser.email,
        fetchOptions);
    const userData = await response.json();
    console.log(userData, 'jotain');
    userPictureNavbar.src = url + '/thumbnails/' + userData[0].userimg;
    userDescription.value = userData[0].description;
  } catch (err) {
    console.log(err.message);
  }

};


editUserForm.addEventListener('submit', async(evt) =>{
  evt.preventDefault();
  try {
    const data = new FormData(editUserForm);
    const options = {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
      },
      body: data,
    };
    const response = await fetch(navbarUrl + '/user/' + navbarUser.userid, options);
    const json = await response.json();
    console.log('editform json', json);

  }
  catch (err) {
    console.log(err.message);
  }
  location.reload();
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
    try {
      const response = await fetch(navbarUrl + '/post', fetchOptions);
      const json = await response.json();
      console.log('add response', json);
    }
    catch (e) {
      console.log(e.message);
    }
    location.reload();
});


document.addEventListener('click', closeSubmenu, false);

