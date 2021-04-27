function formatDate (timestamp){
  let date = new Date (timestamp);
  let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
  let hours = date.getHours();
  if (hours < 10){
      hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10){
      minutes = `0${minutes}`;
  }
  let day = days[date.getDay()];
      return `Last update: ${day}, ${hours}:${minutes}`;
  
  }
  
  //

  function displayForecast(){
    let forecastElement = document.querySelector ("#forecast");
    let forecastHTML = `<div class="row row-col-5">`;
    let days =["Thu", "Fri", "Sat", "Sun", "Mon"];
    days.forEach (function(day){

    forecastHTML = forecastHTML + `
    <div class="col border-right">
      <div class="day1" id="weather-forecast-day">
        <p>${day}</p>
        <img src="https://openweathermap.org/img/wn/02d@2x.png" alt="">
        <br />
        <span id="forecast-temperature-min">23ºC</span>
        <span id="forecast-temperature-max"> 30ºC</span>
      </div>
    </div>
    `
  }
    )
forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
}
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
    let iconWeather = document.querySelector ("#weather-icon");
    let dateElement = document.querySelector ("#current-date");
  
    celsiusTemperature = Math.round(response.data.main.temp);
    cityName.innerHTML = `${response.data.name}`;
    tempNow.innerHTML = `${temp}`;
    description.innerHTML = `${descriptionNow}`;
    humidity.innerHTML = `${humidityNow}%`;
    wind.innerHTML = `${windNow}km/h`;
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    iconWeather.setAttribute("src",`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconWeather.setAttribute ("alt", response.data.weather[0].description);
  }
  
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
  
  //
  
  function showFahrenheit (event){
      event.preventDefault();
      let tempElement = document.querySelector ("#temperature");
      celsiusLink.classList.remove("active");
      fahrenheitLink.classList.add("active");
      let fahrenheitTemperature = (celsiusTemperature * 9)/5 + 32;
      tempElement.innerHTML = Math.round(fahrenheitTemperature);
  }
  
  function ShowCelsius(event){
      event.preventDefault();
      let tempElement = document.querySelector("#temperature");
      tempElement.innerHTML = Math.round(celsiusTemperature);
      celsiusLink.classList.add("active");
      fahrenheitLink.classList.remove("active");
  }
  
  
  let celsiusTemperature = null;
  
  let fahrenheitLink = document.querySelector ("#fahrenheit-link");
  fahrenheitLink.addEventListener ("click", showFahrenheit);
  
  let celsiusLink = document.querySelector ("#celsius-link");
  celsiusLink.addEventListener ("click", ShowCelsius);
  

  displayForecast();