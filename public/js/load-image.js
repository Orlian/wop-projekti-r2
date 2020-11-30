'use strict';
const userPicture = document.getElementById('user-picture');
const postPicture = document.getElementById('art-img');
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

function previewImage(event) {

  const reader = new FileReader();

  reader.onload = function() {

    if(reader.readyState === 2){
      userPicture.src = reader.result;
      postPicture.src = reader.result;
    }
  }

  reader.readAsDataURL(event.target.files[0]);

}