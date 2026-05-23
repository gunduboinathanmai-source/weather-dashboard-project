const apiKey = "5a00788ca45839a5959a49a61508e879";

const searchBtn = document.querySelector(".search-btn");
const locationBtn =
document.querySelector(".location-btn");

const modeBtn =
document.querySelector(".mode-btn");
const cityInput = document.querySelector(".city-input");

const cityName = document.querySelector(".city-name");
const temp = document.querySelector(".temperature");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const feelsLike = document.querySelector(".feels-like");
const pressure = document.querySelector(".pressure");

const weatherDiv = document.getElementById("weather");
const condition = document.getElementById("condition");
const icon = document.getElementById("icon");

 async function getWeather(city) {
    document.getElementById("loading")
.style.display = "block";


    weatherDiv.style.display = "none";

    const weatherURL =
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await fetch(weatherURL);
    const data = await response.json();

    console.log(data);

   if (data.cod != 200) {

document.getElementById("loading")
.style.display = "none";

document.getElementById(
"error-message"
).innerHTML =
"City Not Found ❌";

weatherDiv.style.display =
"none";

return;
}
    
    document.getElementById("loading")
.style.display = "none";

    weatherDiv.style.display = "block";
    document.getElementById(
"error-message"
).innerHTML = "";
    

    cityName.innerHTML = data.name;
    const utc = Date.now() + (new Date().getTimezoneOffset() * 60000);

const cityTime = new Date(
utc + (data.timezone * 1000)
);
   
document.getElementById("time").innerHTML =
cityTime.toLocaleString("en-IN");
    temp.innerHTML ="🌡️" +data.main.temp.toFixed(1) + " °C";

    humidity.innerHTML = data.main.humidity + "%";
    wind.innerHTML = (data.wind.speed*3.6).toFixed(1)+"km/h";
    feelsLike.innerHTML =
    data.main.feels_like.toFixed(1) + " °C";

    pressure.innerHTML =
    data.main.pressure + " hPa";
    condition.innerHTML =
data.weather[0].main;

icon.src =
"https://openweathermap.org/img/wn/" +
data.weather[0].icon +
"@2x.png";

    condition.innerHTML =
    data.weather[0].main;
    condition.style.fontSize = "28px";
condition.style.fontWeight = "bold";
condition.style.marginTop = "10px";
    const weatherType =
data.weather[0].main;

if (weatherType === "Clear") {
    document.body.style.background =
    "linear-gradient(to right,#8EC5FC,#E0C3FC)";
}

else if (
weatherType === "Clouds"
) {
    document.body.style.background =
    "linear-gradient(to right,#bdc3c7,#2c3e50)";
}

else if (
weatherType === "Rain"
) {
    document.body.style.background =
    "linear-gradient(to right,#4b79a1,#283e51)";
}

else {
    document.body.style.background =
    "linear-gradient(to right,#8C5FC,#E0C3FC)";
}
 }
    

searchBtn.addEventListener("click", () => {
    if(cityInput.value.trim()===""){
        alert("please enter city name");
        return;
    }
    getWeather(cityInput.value);

});
cityInput.addEventListener("keypress",
function(event){

if(event.key === "Enter"){
    getWeather(cityInput.value);
}

 });
setInterval(() => {

if(cityInput.value !== ""){
    getWeather(cityInput.value);
}

}, 30000);
function getLocationWeather() {

navigator.geolocation.getCurrentPosition(

async function(position){

const lat = position.coords.latitude;
const lon = position.coords.longitude;

const weatherURL =
`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

const response = await fetch(weatherURL);
const data = await response.json();

weatherDiv.style.display = "block";

cityName.innerHTML = data.name;

const utc =
Date.now() + (new Date().getTimezoneOffset() * 60000);

const cityTime =
new Date(utc + (data.timezone * 1000));

document.getElementById("time").innerHTML =
cityTime.toLocaleString("en-IN");

temp.innerHTML =
"🌡️" + data.main.temp.toFixed(1) + " °C";

humidity.innerHTML =
data.main.humidity + "%";

wind.innerHTML =
(data.wind.speed * 3.6).toFixed(1) + " km/h";

feelsLike.innerHTML =
data.main.feels_like.toFixed(1) + " °C";

pressure.innerHTML =
data.main.pressure + " hPa";

condition.innerHTML =
data.weather[0].main;

icon.src =
"https://openweathermap.org/img/wn/" +
data.weather[0].icon +
"@2x.png";

},

function(){

alert("Location access denied");

}

);

}
