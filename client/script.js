/* jshint esversion: 8 */
/* jshint node: true */
/* jshint browser: true */
'use strict'

const BASE_URL = "https://temkahello.pythonanywhere.com/api/v1/jokes"


async function getData(url) {
    return fetch(url)
    .then(response => response.json())
    .catch(error => console.log(error));
}

async function requestData() {
    
    let post = await fetch(`${BASE_URL}`)
    .then(response => response.json())
    .catch(error => console.log(error,"Does not Exist"));
    
    let responseDiv = document.querySelector("#response");
    responseDiv.innerHTML = post['name'];
}

async function getInfo() {

    let aNumber = document.querySelector("#inputName").value;
    let post = await fetch(`${BASE_URL}${'/'}${aNumber}`)
    .then(response => response.json())
    .catch(error => console.log(error,"Does not Exist"));
    let responseDiv = document.querySelector("#anotherResponse");
    responseDiv.innerHTML = post['name'];

}