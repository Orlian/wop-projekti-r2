'use strict';

const uploadButton = document.querySelector('input[type="file"]');

uploadButton.addEventListener("mouseover", () =>{
  const icon = document.querySelector('ion-icon');
  icon.style.color = 'darkgreen';
});

uploadButton.addEventListener("mouseout", () =>{
  const icon = document.querySelector('ion-icon');
  icon.style.color = 'green';
});