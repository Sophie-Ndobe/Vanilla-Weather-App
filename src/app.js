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

function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city").value;

  let apiKey = "2c13e0a2b6fe347b0421bb02eef2o43t";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityInput}&key=${apiKey}`;

  axios.get(`${apiUrl}`).then(displayWeatherConditions);
}

function displayWeatherConditions(response) {
  //console.log(response);
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
}

let submitForm = document.querySelector("#form");
submitForm.addEventListener("submit", searchCity);
