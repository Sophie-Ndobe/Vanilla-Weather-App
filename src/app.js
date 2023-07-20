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
