'use strict';
const toggle = document.querySelector('.toggle');
const menu = document.querySelector('.menu');
const items = document.querySelectorAll('.item');
const postModal = document.getElementById("post-modal");
const editModal = document.getElementById('edit-user-modal');
const imageModal = document.getElementById('image-user-modal');
const postButtonNav = document.getElementById("add-pic-button");
const span1 = document.getElementsByClassName("close")[0];
const span2 = document.getElementsByClassName("close")[1];
const span3 = document.getElementsByClassName("close")[2];
const editLink = document.getElementById('edit-link');
const logoutLink = document.getElementById('logout-link');


function toggleMenu() {
  if (menu.classList.contains('active')) {
    menu.classList.remove('active');
    toggle.querySelector('a').innerHTML = '<ion-icon id="menu-img" name="menu-outline">';
  }
  else {
    menu.classList.add('active');
    toggle.querySelector('a').innerHTML = '<ion-icon name="close-outline"></ion-icon>';
  }

}

toggle.addEventListener('click', toggleMenu, false);

function toggleItem() {
  if(this.classList.contains('submenu-active')){
    this.classList.remove('submenu-active');
  }else if(menu.querySelector('.submenu-active')){
    menu.querySelector('.submenu-active').classList.remove('submenu-active');
    this.classList.add('.submenu-active');
  }else{
    this.classList.add('submenu-active');
  }
}

for (let item of items) {
  if(item.querySelector('.submenu')){
    item.addEventListener('click', toggleItem, false);
    item.addEventListener('keypress', toggleItem, false);
  }
}

function closeSubmenu(e) {
  let isClickInside = menu.contains(e.target);

  if(!isClickInside && menu.querySelector('.submenu-active')){
    menu.querySelector('.submenu-active').classList.remove('submenu-active');
  }
}

postButtonNav.onclick = function() {
  postModal.style.display = "flex";
}

span1.onclick = function() {
  postModal.style.display = "none";
}

editLink.onclick = function() {
  editModal.style.display = "flex";
}

span2.onclick = function() {
  editModal.style.display = "none";
}

span3.onclick = function() {
  imageModal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target === editModal || event.target === postModal) {
    editModal.style.display = "none";
    //userPicture.src = ; //TODO hae tietokannasta käyttäjän profiilikuva oletuksena
    postModal.style.display = "none";
    postPicture.src = "http://placekitten.com/200/200";
    imageModal.style.display = "none";
  }
}

logoutLink.addEventListener('click',  async (evt) => {
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
    location.href = 'front-page.html'
    alert('You have logged out');
  } catch(err) {
    console.log(err.message);
  }
});


document.addEventListener('click', closeSubmenu, false);

