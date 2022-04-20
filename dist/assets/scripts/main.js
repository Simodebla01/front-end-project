"use strict";

var form = document.querySelector("main form");
var input = document.querySelector("form input");
var cities = document.querySelector(".results_container");
var searchedCities = [];
var apiKey = "d41c51bd00b41f49ec175f3582337b6c";
form.addEventListener("submit", function (e) {
  e.preventDefault();
  var inputVal = input.value;
  var listItems = cities.querySelectorAll(".results_container-box");
  var listItemsArray = Array.from(listItems);
  console.log(listItemsArray);
  var url = "http://api.openweathermap.org/data/2.5/weather?q=".concat(inputVal, "&APPID=").concat(apiKey, "&units=metric");

  if (searchedCities.indexOf(inputVal.toLowerCase()) == -1) {
    fetch(url).then(function (response) {
      return response.json();
    }).then(function (data) {
      searchedCities.push(inputVal.toLowerCase());
      var main = data.main,
          name = data.name,
          sys = data.sys,
          weather = data.weather,
          wind = data.wind,
          timezone = data.timezone;
      var icon = weather[0].icon;
      var li = document.createElement("div");
      li.classList.add("results_container-box");
      li.setAttribute('id', name);
      var temp_class = "results_container-box-footer_default-temp";

      if (main.temp < 10) {
        temp_class = "results_container-box-footer_cold-temp";
      } else if (main.temp > 24) {
        temp_class = "results_container-box-footer_hot-temp";
      }

      var cardTemplate = "\n            <div class = \"results_container-box-remove\">\n            <a href = 'javascript:removeCard(\"".concat(name, "\");'><i class=\"fa-solid fa-xmark\"></i></a>\n            </div>\n            <div class = \"results_container-box-header\">\n            <h2 class = \"city-name\">\n            <span>").concat(name, "<sup> ").concat(sys["country"], "</sup></span>\n            </h2>\n            </div>\n            <hr>\n            <div class = \"results_container-box-footer\">\n                <img class = \"card-header-image\"src = http://openweathermap.org/img/wn/").concat(icon, "@2x.png>\n                <span class = \"").concat(temp_class, "\">").concat(Math.round(main.temp), "\xB0C</span>\n                </div>\n                ");
      li.innerHTML = cardTemplate;
      cities.appendChild(li);
    }).catch(function () {
      console.log("Error");
    });
    form.reset();
  } else {
    console.log("Error, città già cercata!");
    form.reset();
  }
});

function removeCard(city) {
  document.getElementById(city).remove();
  searchedCities.splice(searchedCities.indexOf(city.toLowerCase()));
}