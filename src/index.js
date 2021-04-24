let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hour = now.getHours();
let minute = now.getMinutes();

let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = `Last update: ${day}, ${hour}:${minute}`;

let apiKey = "ef115c90a5cc57f88edb22a2c2a396c4";

function displayWeather(response) {
  let tempNow = document.querySelector("#temperature");
  let description = document.querySelector("#weather-description");
  let humidity = document.querySelector("#humidity-percent");
  let wind = document.querySelector("#wind-speed");
  let temp = Math.round(response.data.main.temp);
  let descriptionNow = response.data.weather[0].description;
  let humidityNow = Math.round(response.data.main.humidity);
  let windNow = Math.round(response.data.wind.speed);
  let cityName = document.querySelector("#current-city");
  cityName.innerHTML = `${response.data.name}`;
  tempNow.innerHTML = `${temp}`;
  description.innerHTML = `${descriptionNow}`;
  humidity.innerHTML = `${humidityNow}%`;
  wind.innerHTML = `${windNow}km/h`;
}
console.log("descriptionNow");

///////////////////////////

function searchDefault(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}
searchDefault("Valencia");

function searchCity(event) {
  event.preventDefault();
  let units = "metric";
  let cityNow = document.querySelector("#current-city");
  let cityIdentity = document.querySelector("#search-a-city");
  cityNow.innerHTML = `${cityIdentity.value}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityIdentity.value}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(displayWeather);
}

let search = document.querySelector("#search-a-city");
search.addEventListener("submit", searchCity);
let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", searchCity);

function findLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let unit = "metric";
  let urlApi = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;
  axios.get(urlApi).then(displayWeather);
}

function showPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findLocation);
}

let positionBtn = document.querySelector("#location-button");
positionBtn.addEventListener("click", showPosition);
