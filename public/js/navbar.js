'use strict';
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
const editUserButton = document.getElementById('save-button');
const editUserCancel = document.getElementById('user-cancel-button');
const deleteUserButton = document.getElementById('delete-button');
const logo = document.getElementById('logo-img');


logo.onclick = () => {
  location.href = 'feed.html';
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
  postModal.style.display = 'none';
};

spans.forEach((span) => {
  span.addEventListener('click', () => {
    span.parentNode.parentNode.parentNode.parentNode.style.display = 'none';
  });
});

editLink.onclick = function() {
  editModal.style.display = 'flex';
};
editUserButton.onclick = () =>{
  editModal.style.display = 'none';
};
editUserCancel.onclick = () =>{
  editModal.style.display = 'none';
};

deleteUserButton.onclick = () => {
  const confirm = window.confirm('Are you sure you want leave us ;(');
  if(confirm){
    // TODO poista uskoton käyttäjä, petturi
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
    const response = await fetch(url + '/auth/logout', options);
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

document.addEventListener('click', closeSubmenu, false);

