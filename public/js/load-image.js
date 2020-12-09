'use strict';
const userPicture = document.getElementById('user-picture');
const postedImage = document.getElementById('art-img');
const uploadButton = document.querySelector('input[type="file"]');
const addImageModalButton = document.getElementById('post-button');

uploadButton.addEventListener("mouseover", () =>{
  const icon = document.querySelector('ion-icon[name=add-circle-sharp]');
  icon.style.color = 'slateblue';
  uploadButton.style.cursor = 'pointer';
});

uploadButton.addEventListener("mouseout", () =>{
  const icon = document.querySelector('ion-icon[name=add-circle-sharp]');
  icon.style.color = 'palevioletred';
});

function previewImage(event) {

  const reader = new FileReader();

  reader.onload = function() {

    if (reader.readyState === 2) {
      userPicture.src = reader.result;
      postedImage.src = reader.result;
      addImageModalButton.disabled = false;
    }else {
      addImageModalButton.disabled = true;
    }
  }

  reader.readAsDataURL(event.target.files[0]);
};