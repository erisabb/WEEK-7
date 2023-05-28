function displayDate(date) {
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
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[now.getMonth()];
  let monthDate = now.getDate();
  let hours = ("0" + now.getHours()).slice(-2);
  let minutes = ("0" + now.getMinutes()).slice(-2);
  let formattedDate = `${day} ${month} ${monthDate}, ${hours}:${minutes}`;
  return formattedDate;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
let currentDate = document.querySelector(".date");
currentDate.innerHTML = displayDate(new Date());

function cityName(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-name");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;
  let city = document.querySelector("#city-name").value;
  let apiKey = "75e5c0679220bdae6719f0490660f35d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}
let searchBar = document.querySelector("#search-city");
searchBar.addEventListener("submit", cityName);

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#number");
  celsiusTemperature = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let iconElement = document.querySelector("#weather-icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}
function getCurrentPosition(event) {
  navigator.geolocation.getCurrentPosition(showPosition);
}
function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "75e5c0679220bdae6719f0490660f35d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showLocalTemperature);
  axios.get(apiUrl).then(showLocalCity);
  axios.get(apiUrl).then(displayTemperature);
}
function showLocalTemperature(response) {
  let localTemp = Math.round(response.data.main.temp);
  let currentLocalTemp = document.querySelector("#number");
  currentLocalTemp.innerHTML = localTemp;
}

function showLocalCity(response) {
  let localCity = response.data.name;
  let currentLocalCity = document.querySelector("h1");
  currentLocalCity.innerHTML = localCity;
}
let currentLocation = document.querySelector("#location-button");
currentLocation.addEventListener("click", getCurrentPosition);

function showCelsius(event) {
  event.preventDefault();
  celsiusLinkElement.classList.add("active");
  fahrenheitLinkElement.classList.remove("active");
  let temperatureElement = document.querySelector("#number");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let celsiusLinkElement = document.querySelector("#celsius-temperature");
celsiusLinkElement.addEventListener("click", showCelsius);

function showFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#number");
  let fahrenheit = (celsiusTemperature * 9) / 5 + 32;
  celsiusLinkElement.classList.remove("active");
  fahrenheitLinkElement.classList.add("active");

  temperatureElement.innerHTML = Math.round(fahrenheit);
}
let fahrenheitLinkElement = document.querySelector("#fahrenheit-temperature");
fahrenheitLinkElement.addEventListener("click", showFahrenheit);
