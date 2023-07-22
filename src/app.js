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

function formatDay(time) {
  let date = new Date(time * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayWeatherForecast(response) {
  let dailyForecast = response.data.daily;

  let weatherForecast = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  dailyForecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
  <div class="col-2">
    ${formatDay(forecastDay.time)}
    <img
      src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
        forecastDay.condition.icon
      }.png"
      alt=""
      width="60px"
    />
    <div>
      <span class="forecast-max">${Math.round(
        forecastDay.temperature.maximum
      )}°</span>
      <span class="forecast-min">${Math.round(
        forecastDay.temperature.minimum
      )}°</span>
    </div>
  </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  weatherForecast.innerHTML = forecastHTML;
}

function getWeatherForecast(coordinates) {
  let lat = coordinates.latitude;
  let lon = coordinates.longitude;
  let apiKey = "2c13e0a2b6fe347b0421bb02eef2o43t";
  console.log(lon);
  let apiUrlForecast = `https://api.shecodes.io/weather/v1/forecast?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;

  axios.get(`${apiUrlForecast}`).then(displayWeatherForecast);
}

function submitAction(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city").value;
  searchCity(cityInput);
}

function searchCity(city) {
  let apiKey = "2c13e0a2b6fe347b0421bb02eef2o43t";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(`${apiUrl}`).then(displayWeatherConditions);
}

function displayWeatherConditions(response) {
  let headingUpdate = document.querySelector("#heading");
  let headingValue = response.data.city;
  headingUpdate.innerHTML = `${headingValue}`;

  let temperatureUpdate = document.querySelector("#temperature-value");
  let temperatureValue = Math.round(response.data.temperature.current);
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

  getWeatherForecast(response.data.coordinates);
}

let submitForm = document.querySelector("#form");
submitForm.addEventListener("submit", submitAction);

searchCity("Pretoria");
