function showDate() {
  let now = new Date();

  let h3 = document.querySelector("h3");
  let hours = now.getHours();
  let minutes = now.getMinutes();
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
  h3.innerHTML = `${day} ${hours} : ${minutes}`;
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }
}
showDate();

function city(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-search");
  let cityName = document.querySelector("h1");
  cityName.innerHTML = searchInput.value;
  searchCity(searchInput.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", city);

function searchCity(city) {
  let apiKey = "53f3bc1f5d348c44be3e3754c7185573";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function formatTime(timestamp) {
  let time = new Date(timestamp);

  let hours = time.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}
function showTemperature(response) {
  let cityElement = document.querySelector("h1");
  let temperatureElement = document.querySelector("h2");
  let humidityElement = document.querySelector(".humid");
  let windElement = document.querySelector(".wind");
  let feelslikeElement = document.querySelector(".feelsLike");
  let sunriseElement = document.querySelector(".sunriseTime");
  let sunsetElement = document.querySelector(".sunsetTime");
  let iconElement = document.querySelector("#icon");

  sunriseElement.innerHTML = formatTime(response.data.sys.sunrise * 1000);
  sunsetElement.innerHTML = `${formatTime(response.data.sys.sunset * 1000)}`;
  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = `${Math.round(response.data.main.temp)} °C`;
  humidityElement.innerHTML = `${response.data.main.humidity} %`;
  windElement.innerHTML = `${Math.round(response.data.wind.speed)} mph`;
  feelslikeElement.innerHTML = `${Math.round(
    response.data.main.feels_like
  )} °C`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather.icon}@2x.png`
  );
}
searchCity();
