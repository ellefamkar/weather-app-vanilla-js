function openModal() {
    if (cityModal.style.display === "none") {
      cityModal.style.display = "block";
    } else {
      cityModal.style.display = "none";
    }
  }
  
  let searchCity = document.querySelector(".magnifyier-container");
  let cityModal = document.querySelector(".search-modal ");
  searchCity.addEventListener("click", openModal);
  
//   function showDate(date) {
//     let days = [
//       "Sunday",
//       "Monday",
//       "Tuesday",
//       "Wednesday",
//       "Thursday",
//       "Friday",
//       "Saturday"
//     ];
//     let dayIndex = date.getDay();
//     let day = days[dayIndex];
  
//     let hours = date.getHours();
  
//     let minutes = date.getMinutes();
  
//     let today = document.querySelector("#date");
//     today.innerHTML = `${day}   ${hours}:${minutes}`;
//   }
//   let currentDate = new Date();
//   showDate(currentDate);
  
  const showCityData = (response) => {
    let cityName = document.querySelector("#city-title");
    let cityDescription = document.querySelector("#weather-type");
    let temperature = document.querySelector(".current-temp");
    // let tempEmoji = document.querySelector(".temperature-emoji");
    cityName.innerHTML = response.data.name;
    cityDescription.innerHTML = response.data.weather[0].description;
    // tempEmoji.innerHTML = response.data.weather[0].icon;
    temperature.innerHTML = response.data.main.temp;
  };
  
  function search(city) {
    let apiKey = "3df2faaa654dfbe28b4e2b8d1ff69774";
    let apiEndpoint = `https://api.openweathermap.org/data/2.5/weather`;
    let apiUrl = `
    ${apiEndpoint}?q=${city}&appid=${apiKey}&units=metric
    `;
    axios.get(apiUrl).then(showCityData);
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    let city = document.querySelector("#city-input").value;
    search(city);
    openModal();
  };
  
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", handleSubmit);
  
  function convertToCelsius(event) {
    event.preventDefault();
    let temperature = document.querySelector(".temperature");
    temperature.classList.add("active");
    temperature.innerHTML = "19°";
  }
  let celcius = document.querySelector("#celcius-degree");
  celcius.addEventListener("click", convertToCelsius);
  
  function convertTToFarenheight(event) {
    event.preventDefault();
    let temperature = document.querySelector(".temperature");
    temperature.classList.add("active");
    temperature.innerHTML = "66°";
  }
  let farenheight = document.querySelector("#farenheight-degree");
  farenheight.addEventListener("click", convertTToFarenheight);
  
  const handlePosition = (position) => {
    let longitude = position.coords.longitude;
    let latitude = position.coords.latitude;
    let apiKey = "3df2faaa654dfbe28b4e2b8d1ff69774";
    let apiEndpoint = `https://api.openweathermap.org/data/2.5/weather`;
    let apiUrl = `
    ${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric
    `;
    axios.get(apiUrl).then((response) => {
      document.querySelector("#city-title").innerHTML = response.data.name;
      document.querySelector("#date").innerHTML = response.data.weather[0].description;
      document.querySelector(".current-temp").innerHTML = response.data.main.temp;
    });
    openModal();
  };
  
  const locationData = (event) => {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(handlePosition);
  };
  let currentBtn = document.querySelector("#current-location-btn");
  currentBtn.addEventListener("click", locationData);
  
  search("Sydney");
  