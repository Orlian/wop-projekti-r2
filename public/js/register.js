'use strict';

const url = '/app2/';

const registerForm = document.querySelector('#register-form');
const registerButton = document.querySelector('#register-button');
const usernameInput = document.querySelector('#username-input');

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

usernameInput.addEventListener('blur', async (evt) => {
  evt.preventDefault();
  const data = serializeJson(usernameInput);
  const fetchOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(url + '/checkuser', fetchOptions);
  const json = await response.json();
});

const passwd = document.getElementById('password');
const confirmPasswd = document.getElementById('confirm-password');
const passwdMessage = document.getElementById('message');

const checkMatch = () => {
  if (passwd.value !== confirmPasswd.value) {
    passwdMessage.style.color = 'red';
    passwdMessage.innerHTML = 'not matching';
    registerButton.disabled = true;
  }
  else if (passwd.value === '' || confirmPasswd.value === ''){
    passwdMessage.style.color = 'red';
    passwdMessage.innerHTML = 'password can\'t be empty';
    registerButton.disabled = true;
  } else {
    passwdMessage.style.color = 'green';
    passwdMessage.innerHTML = 'matching';
    registerButton.disabled = false;
  }
}

//event blur