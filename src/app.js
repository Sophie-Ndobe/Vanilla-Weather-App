let currentDate = new Date();

let hours = currentDate.getHours();

if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = currentDate.getMinutes();

if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[currentDate.getDay()];

let updatingDate = document.querySelector("#date");
updatingDate.innerHTML = `${day} ${hours}:${minutes}`;

function displayWeatherForecast() {
  let weatherForecast = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecastHTML =
    forecastHTML +
    `
  <div class="col-2">
    Sat
    <img
      src="https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png"
      alt=""
      width="50px"
    />
    <div>
      <span class="forecast-max">18°</span>
      <span class="forecast-min">12°</span>
    </div>
  </div>`;
  forecastHTML = forecastHTML + `</div>`;
  weatherForecast.innerHTML = forecastHTML;
}

function submitAction(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city").value;
  searchCity(cityInput);
}

function searchCity(city) {
  let apiKey = "2c13e0a2b6fe347b0421bb02eef2o43t";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

  axios.get(`${apiUrl}`).then(displayWeatherConditions);
}

function displayWeatherConditions(response) {
  let headingUpdate = document.querySelector("#heading");
  let headingValue = response.data.city;
  headingUpdate.innerHTML = `${headingValue}`;

  celciusTemperature = Math.round(response.data.temperature.current);

  let temperatureUpdate = document.querySelector("#temperature-value");
  let temperatureValue = celciusTemperature;
  temperatureUpdate.innerHTML = `${temperatureValue}`;

  let humidityUpdate = document.querySelector("#humidity-value");
  let humidityValue = response.data.temperature.humidity;
  humidityUpdate.innerHTML = `${humidityValue}`;

  let windSpeedUpdate = document.querySelector("#wind-value");
  let windSpeedValue = Math.round(response.data.wind.speed);
  windSpeedUpdate.innerHTML = `${windSpeedValue}`;

  let descriptionUpdate = document.querySelector("#description");
  let descriptionValue = response.data.condition.description;
  descriptionUpdate.innerHTML = `${descriptionValue}`;

  let iconUpdate = document.querySelector("#icon");
  let iconValue = response.data.condition.icon;
  iconUpdate.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${iconValue}.png`
  );
}

function changeToFahrenheit(event) {
  event.preventDefault();
  let temperatureUpdate = document.querySelector("#temperature-value");
  let fahrenheitTemperature = Math.round((celciusTemperature * 9) / 5 + 32);
  temperatureUpdate.innerHTML = fahrenheitTemperature;
}

function changeToCelcius(event) {
  event.preventDefault();
  let temperatureUpdate = document.querySelector("#temperature-value");
  temperatureUpdate.innerHTML = celciusTemperature;
}

let celciusTemperature = null;

let submitForm = document.querySelector("#form");
submitForm.addEventListener("submit", submitAction);

let fahrenheitConversion = document.querySelector("#fahrenheit-unit");
fahrenheitConversion.addEventListener("click", changeToFahrenheit);

let celciusConversion = document.querySelector("#celcius-unit");
celciusConversion.addEventListener("click", changeToCelcius);

searchCity("Pretoria");
displayWeatherForecast();
