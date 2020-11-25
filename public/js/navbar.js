'use strict';
const toggle = document.querySelector('.toggle');
const menu = document.querySelector('.menu');
const items = document.querySelectorAll('.item');

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


document.addEventListener('click', closeSubmenu, false);