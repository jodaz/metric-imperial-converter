'use strict';
import ky from '/ky.js';

const inputField = document.getElementById('convertField');
const div = document.getElementById("toggle-div");
const result = document.getElementById("result");
const jsonResult = document.getElementById("jsonResult");

function toggle() {
  if(div.style.display == 'block') {
      div.style.display = 'none';
  } else {
    div.style.display = 'block';
  }
}

document.getElementById("convertForm").addEventListener('submit', (e) => {
  e.preventDefault();

  let APIurl = window.location.href + "api/convert?input=";
  let input = inputField.value;
  let urlRequest = APIurl + input;

  (async () => {
    const data = await ky.get(urlRequest).json();
    result.textContent = data.string;
    jsonResult.textContent = JSON.stringify(data);
  })();
});