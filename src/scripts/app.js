let searchCity = document.querySelector(".fa-magnifying-glass");
let cityModal = document.querySelector(".search-modal ");
let celciusTemperature = null;

function openModal() {
  cityModal.classList.toggle("is-displayed");
}

searchCity.addEventListener("click", openModal);

function formatDate(date) {
  let currentDate = new Date(date);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dayIndex = currentDate.getDay();
  let day = days[dayIndex];

  let hours = currentDate.getHours();
  hours = hours < 10 ? `0${hours}` : hours;

  let minutes = currentDate.getMinutes();
  minutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${day} ${hours}:${minutes}`;
}

const formatDay = (timestamp) => {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
};

const displayForecast = (response) => {
  let forecastElement = document.querySelector("#forecast");
  let forecast = response.data.daily;

  let forecastHTML = `<div class="row">`;
  forecast.forEach((forecastDay, index) => {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-sm-3 col-md-2">
      <div class="card bg-transparent border-0">
        <div class="card-body">
          <span class="d-inline-block mb-3"> ${formatDay(
            forecastDay.time
          )}</span>
          <div class="emoji-container p-2">
            <img class="forecast-img" src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
              forecastDay.condition.icon
            }.png"  alt="${forecastDay.condition.description}" />
          </div>
          <p class="mt-2 mb-1 max-forecast-temp">
            ${Math.round(forecastDay.temperature.minimum)}°
          </p>
          <p class="my-1 opacity-50 min-forecast-temp">
          ${Math.round(forecastDay.temperature.maximum)}°
          </p>
        </div>
      </div>
    </div>
    `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
};

const getForcast = (city) => {
  let apiKey = "f0bata7385ff184aeb7o2efc0a37f732";
  let apiEndpoint = ` https://api.shecodes.io/weather/v1/forecast`;
  let units = "metric";
  // let latitude = response.latitude;
  // let longitude = response.longitude;
  let apiUrl = `${apiEndpoint}?query=${city}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
};

const showCityData = (response) => {
  let cityName = document.querySelector(".js-city-title");
  // let countryName = document.querySelector(".js-country-title");
  let cityDescription = document.querySelector(".js-weather-type");
  let temperature = document.querySelector(".current-temp");
  let dateElement = document.querySelector(".js-weather-time");
  let iconElement = document.querySelector(".temperature-emoji");
  // farenheight.classList.remove("active");
  // celcius.classList.add("active");
  // let country = response.data.country;
  // let countryAbr = country.substring(0,3);
  // countryName.innerHTML = `(${countryAbr})`;
  celciusTemperature = response.data.temperature.current;
  cityName.innerHTML = response.data.city;
  cityDescription.innerHTML = response.data.condition.description;
  temperature.innerHTML = Math.round(celciusTemperature);
  dateElement.innerHTML = formatDate(response.data.time * 1000);

  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", `${response.data.condition.description}`);

  getForcast(response.data.city);
};

function search(city) {
  let apiKey = "f0bata7385ff184aeb7o2efc0a37f732";
  let apiEndpoint = ` https://api.shecodes.io/weather/v1/current`;
  let units = "metric";
  let apiUrl = `
    ${apiEndpoint}?query=${city}&key=${apiKey}&units=${units}
    `;
  axios.get(apiUrl).then(showCityData);
}

const handleSubmit = (event) => {
  event.preventDefault();
  openModal();
  let city = document.querySelector("#city-input").value;
  search(city);
};

const currentPositionCurrent = (response) => {
  document.querySelector(".js-city-title").innerHTML = response.data.name;
  document.querySelector("#date").innerHTML =
    response.data.weather[0].description;
  document.querySelector(".current-temp").innerHTML = response.data.main.temp;
};

const currentPositionGetForecast = (response) => {
  let longitude = response.longitude;
  let latitude = response.latitude;
  let apiKey = "f0bata7385ff184aeb7o2efc0a37f732";
  let apiEndpoint = ` https://api.shecodes.io/weather/v1/forecast`;
  let units = "metric";
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&key=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayForecast);
};

const handlePosition = (position) => {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let apiKey = "3df2faaa654dfbe28b4e2b8d1ff69774";
  let apiEndpoint = `https://api.openweathermap.org/data/2.5/weather`;
  let apiUrl = `
    ${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric
    `;
  axios.get(apiUrl).then(currentPositionCurrent);

  currentPositionGetForecast(position.coords);
};

const locationData = (event) => {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
};

let currentBtn = document.querySelector("#js-current-location");
currentBtn.addEventListener("click", locationData);

// function convertToCelsius(event) {
//   event.preventDefault();

//   let temperature = document.querySelector(".current-temp");
//   farenheight.classList.remove("active");
//   celcius.classList.add("active");

//   temperature.innerHTML = Math.round(celciusTemperature);
// }

// function convertTToFahrenheit(event) {
//   event.preventDefault();
//   let temperature = document.querySelector(".current-temp");
//   celcius.classList.remove("active");
//   farenheight.classList.add("active");

//   let fahrenheitTemp = (celciusTemperature * 9/5) + 32
//   temperature.innerHTML = Math.round(fahrenheitTemp);
// }

// let celcius = document.querySelector("#celcius-degree");
// celcius.addEventListener("click", convertToCelsius);

// let farenheight = document.querySelector("#farenheight-degree");
// farenheight.addEventListener("click", convertTToFahrenheit);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

search("Sydney");
