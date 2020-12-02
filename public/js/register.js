'use strict';

const url = '/app2/';

const registerForm = document.querySelector('#register-form');

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

const checkMatch = () => {
  if (document.getElementById('password').value ===
      document.getElementById('confirm-password').value) {
    document.getElementById('message').style.color = 'green';
    document.getElementById('message').innerHTML = 'matching';
  } else {
    document.getElementById('message').style.color = 'red';
    document.getElementById('message').innerHTML = 'not matching';
  }
}