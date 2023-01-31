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

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
    <div class="col-2">
         <div class="weather-forecast-date">${day}</div>
         <img
           src="https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png"
           alt=""
           width="36"
         />
         <div class="weather-forecast-temperatures">
           <span class="weather-forecast-high">18° </span>
           <span class="weather-forecast-low"> 12° </span>
         </div>
     </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function showTemperature(response) {
  celsiusTemperature = response.data.main.temp;
  let cityElement = document.querySelector("h1");
  let temperatureElement = document.querySelector("#mainTemp");
  let humidityElement = document.querySelector(".humid");
  let windElement = document.querySelector(".wind");
  let feelslikeElement = document.querySelector(".feelsLike");
  let sunriseElement = document.querySelector(".sunriseTime");
  let sunsetElement = document.querySelector(".sunsetTime");
  let iconElement = document.querySelector("#icon");

  sunriseElement.innerHTML = formatTime(response.data.sys.sunrise * 1000);
  sunsetElement.innerHTML = formatTime(response.data.sys.sunset * 1000);
  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  humidityElement.innerHTML = `${response.data.main.humidity} %`;
  windElement.innerHTML = `${Math.round(response.data.wind.speed)} mph`;
  feelslikeElement.innerHTML = `${Math.round(
    response.data.main.feels_like
  )} °C`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function searchCity(city) {
  let apiKey = "a2dda52dce059eb8a14e95aaa0db6ab7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-search");
  let cityName = document.querySelector("h1");
  cityName.innerHTML = searchInput.value;
  searchCity(searchInput.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#mainTemp");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let temperatureElement = document.querySelector("#mainTemp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

displayForecast();
