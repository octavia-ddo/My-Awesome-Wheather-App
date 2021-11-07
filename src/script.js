function formatDate(timestamp) {
  //calculate the dateb
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thuerday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row>`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
          <div class="col-2">
            <div class="weather-forecast-date">${formatDay(
              forecastDay.dt
            )}</div>
            
            
            <img 
            src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png" 
            alt="" 
            width="42"/>
            <div class="weather-forecast-temperatures"></div>
              <span class="weather-forecast-temperatures-max">${Math.round(
                forecastDay.temp.max
              )}°</span>
              <span class="weather-forecast-temperatures-min">${Math.round(
                forecastDay.temp.min
              )}°</span>
            </div>
          </div>
`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  //console.log(forecastHTML);
}

function getForecast(coordinates) {
  //console.log(coordinates);
  let apiKey = "0aad4c0893e446f9a51692da9cd797e8";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  //console.log(apiURL);
  axios.get(apiURL).then(displayForecast);
}

function displayTemperature(response) {
  //console.log(response.data);
  //console.log(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  temperatureElement.innerHTML = Math.round(response.data.main.temp); //temperature will receive the value of response.data.main.temp
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000); //* 1000 to convert in miliseconds
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  //console.log(response.data);
  //getforecast(response.data.coord);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "0aad4c0893e446f9a51692da9cd797e8";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault(); //prevent the page from reloading
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
  //console.log(cityInputElement.value); //to check
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (temperatureElement.innerHTML * 9) / 5 + 32;
  //alert(fahrenheitTemperature);

  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

search("New York");
displayForecast();

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

//let fahrenheitLink = document.querySelector("#fahrenheit-link");
//fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);
