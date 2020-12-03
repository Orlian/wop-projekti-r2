'use strict';

const url = '/app2/';

const registerForm = document.querySelector('#register-form');
const registerButton = document.querySelector('#register-button');

registerForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const data = new FormData(registerForm);
  console.log('Serialized data', data);
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer' + sessionStorage.getItem('token'),
    },
    body: data,
  };
  const response = await fetch(url + '/auth/register', fetchOptions);
  const json = await response.json();
  console.log('user register response', json);
  //sessionStorage.setItem('token', json.token);

  //TODO Lisäile loppu käyttäjän rekisteröintikäyttäytyminen
  location.href = 'front-page.html';
});

const passwd = document.getElementById('password');
const confirmPasswd = document.getElementById('confirm-password');
const passwdMessage = document.getElementById('message');

const checkMatch = () => {
  if (passwd.value !== confirmPasswd.value) {
    passwdMessage.style.color = 'red';
    passwdMessage.innerHTML = 'not matching';
  } else {
    passwdMessage.style.color = 'green';
    passwdMessage.innerHTML = 'matching';
    registerButton.disabled = false;
  }
}

//event blur