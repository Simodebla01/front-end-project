const form = document.querySelector("main form");
const input = document.querySelector("form input");
const cities = document.querySelector(".results_container");
var searchedCities = [];
const apiKey = "d41c51bd00b41f49ec175f3582337b6c";

form.addEventListener("submit", e => {
    e.preventDefault();
    let inputVal = input.value;
    const listItems = cities.querySelectorAll(".results_container-box");
    const listItemsArray = Array.from(listItems);
    console.log(listItemsArray);


    const url = `http://api.openweathermap.org/data/2.5/weather?q=${inputVal}&APPID=${apiKey}&units=metric`;

    
    if(searchedCities.indexOf(inputVal.toLowerCase()) == -1) {

        fetch(url)
        .then(response => response.json())
        .then(data => {
            searchedCities.push(inputVal.toLowerCase());
            const { main, name, sys, weather, wind, timezone} = data;
            let icon = weather[0].icon;
            const li = document.createElement("div");
            li.classList.add("results_container-box");
            li.setAttribute('id', name);
            var temp_class = "results_container-box-footer_default-temp";
            if (main.temp < 10) {
                temp_class = "results_container-box-footer_cold-temp";
            }
            else if(main.temp > 24) {
                temp_class = "results_container-box-footer_hot-temp";
            }
            const cardTemplate = `
            <div class = "results_container-box-remove">
            <a href = 'javascript:removeCard("${name}");'><i class="fa-solid fa-xmark"></i></a>
            </div>
            <div class = "results_container-box-header">
            <h2 class = "city-name">
            <span>${name}<sup> ${sys["country"]}</sup></span>
            </h2>
            </div>
            <hr>
            <div class = "results_container-box-footer">
                <img class = "card-header-image"src = http://openweathermap.org/img/wn/${icon}@2x.png>
                <span class = "${temp_class}">${Math.round(main.temp)}°C</span>
                </div>
                `;
                li.innerHTML = cardTemplate;
                cities.appendChild(li);
            }
        )
        .catch(() => {
            console.log("Error");
        });
        form.reset();
        
    }
    
    else {
        console.log("Error, città già cercata!");
        form.reset();

    }
});


function removeCard(city) {
    document.getElementById(city).remove();
    searchedCities.splice(searchedCities.indexOf(city.toLowerCase()));
}


