'use strict';

const uploadButton = document.querySelector('input[type="file"]');

uploadButton.addEventListener("mouseover", () =>{
  const icon = document.querySelector('ion-icon[name=add-circle-sharp]');
  icon.style.color = 'darkgreen';
  uploadButton.style.cursor = 'pointer';
});

uploadButton.addEventListener("mouseout", () =>{
  const icon = document.querySelector('ion-icon[name=add-circle-sharp]');
  icon.style.color = 'green';
});