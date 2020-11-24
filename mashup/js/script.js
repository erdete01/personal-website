/* jshint esversion: 8 */
/* jshint node: true */
/* jshint browser: true */
/* jshint jquery: true */
'use strict';

// Greetings
var today = new Date();
var hourNow = today.getHours();
var greeting;

if (hourNow > 18) {
    greeting = 'Good evening!';
} else if (hourNow > 12) {
    greeting = 'Good afternoon!';
} else if (hourNow > 0) {
    greeting = 'Good morning!';
} else {
    greeting = 'Welcome!';
}
document.getElementById("greeting").innerHTML = greeting;

async function getData(url) {
    return fetch(url)
    .then(response => response.json())
    .catch(error => console.log(error));
}

async function getInfo() {

    let vals = JSON.parse(localStorage.getItem('post1'));
    if (vals != null){
        let menu = document.querySelector('#post > tbody');
        menu.innerHTML = "";
        let row = document.createElement("tr");
        let city = document.createElement("td");  
        var myDictionary = vals[0];

        // Appending from localStorage
        var name = myDictionary["cityName"];
        city.innerHTML = name
        row.appendChild(city);
        menu.appendChild(row);

        let temp2 = document.createElement("td");
        var weather = myDictionary["temperature"];
        temp2.innerHTML = weather;
        row.appendChild(temp2);
        menu.appendChild(row);

        let descr2 = document.createElement("td");
        var title = myDictionary["weather"];
        descr2.innerHTML = title;
        row.appendChild(descr2);
        menu.appendChild(row);

        var y = document.createElement("IMG");
        var icon2 = myDictionary["x"];
        y.setAttribute("src", icon2);
        row.appendChild(y);
        menu.appendChild(row);

        let descr4 = document.createElement("td");
        var title = myDictionary["myArray"];
        descr4.innerHTML = title;
        row.appendChild(descr4);
        menu.appendChild(row);
    }

    // Assigning my own APIKEY to a String
    // Source: https://openweathermap.org/api
    var api = "44ee37cb145f80bd5ff333aaec7c6c57";
    let cityName = document.querySelector("#inputName").value;
    
    if (cityName != ""){

        // Fetching and getting a Json File
        let post = await fetch("https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid="+ api+"&units=metric")
        .then(response => response.json())
        .catch(error => console.log(error,"The City Does not Exist"));

        // Adding information to the table
        let allPostsDiv = document.querySelector("#post > tbody");
        allPostsDiv.innerHTML = "";
        let row = document.createElement("tr");
        let city = document.createElement("td");

        // Adding cityname to the table
        city.innerHTML = cityName;
        row.appendChild(city);

        // Adding temperature to the table
        let temp = document.createElement("td");
        const temperature = post.main.temp;
        temp.innerHTML = temperature;
        row.appendChild(temp);
        allPostsDiv.appendChild(row);

        // Adding description to the table
        let descr = document.createElement("td");
        const weather = post.weather[0].description
        descr.innerHTML = weather;
        row.appendChild(descr);

        // Adding an Icon to the table
        let io = document.querySelector("#td");
        var x = document.createElement("IMG");
        const icon = post.weather[0].icon
        const imageURl = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
        x.setAttribute("src", imageURl);
        row.appendChild(x);

        // Adding latitude and long to the paragraph for a later use
        let lat = document.createElement("td");
        let par = document.querySelector("#get2")
        var myArray = []
        const coordinator2 = post.coord.lon
        const coordinator = post.coord.lat
        myArray.push(coordinator);
        myArray.push(coordinator2)
        lat.innerHTML = myArray;
        par.innerHTML = myArray;
        row.appendChild(lat);

        // Removing everything from the localStorage
        localStorage.removeItem("post1");

        // Let's Set up a LocalStorage
        let menu = localStorage.getItem("post1");
        menu = menu ? JSON.parse(menu) : [];
        // Instead of writing line by line, one can write it using a for loop if wanted
        var myStore = {};
        myStore["cityName"] = cityName;
        myStore["temperature"] = temperature;
        myStore["weather"] = weather;
        myStore["x"] = imageURl;
        myStore["myArray"] = myArray;
        menu.push(myStore);
        localStorage.setItem("post1", JSON.stringify(menu));
        
        // Getting longitude and latitude
        let getNumbers = document.querySelector("#get2").innerHTML;
        var array = JSON.parse("[" + getNumbers + "]");
        var options = {
            zoom: 10,
            center: {lat:array[0], lng:array[1]}
        }
        // map
        var map = new
        google.maps.Map(document.getElementById('map'),options);

        //  marker
        var marker = new google.maps.Marker({
            position:{lat:array[0], lng:array[1]},
            map:map
        });
    }
}