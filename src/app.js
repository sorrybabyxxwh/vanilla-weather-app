let city = "Kiev";
function formattedDate(timestamp) { 
    let date = new Date(timestamp);
    let daylist = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday ",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let monthList = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    let day = date.getDay();
    let dateNum = date.getDate();
    let month = date.getMonth();
    return `${daylist[day]} ${dateNum} ${monthList[month]}`;
  }
  
  function formatDayForecast(timestamp){
      let date = new Date(timestamp * 1000);
      let day = date.getDay();
      let days = [
      "Sun",
      "Mon",
      "Tue",
      "Wed",
      "Thur",
      "Fri",
      "Sat",
    ];
      return days[day];
  }


  function displayForecast(response) {
    let forecast = response.data.daily;
    let forecastElement = document.querySelector('#forecast');

    let forecastHTML = `
              <div class="container">
                <div class="row g-2">`;
    forecast.forEach(function(forecastDay, index){
        if (index < 6) {
               forecastHTML = forecastHTML + `
                    <div class="col-2 mx-auto">
                      <div class="p-3 block-day">
                        <div class="weather-forecast-date">${formatDayForecast(forecastDay.dt)}</div>
                        <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" width="35px" />
                        <span class="weather-forecast-temperature-max">${Math.round(forecastDay.temp.max)}°</span>
                        <span class="weather-forecast-temperature-min">${Math.round(forecastDay.temp.min)}°</span>
                      </div>
                  </div>`;
              }
            });
           
    forecastHTML = forecastHTML + ` 
                </div>
              </div>`;
 forecastElement.innerHTML = forecastHTML;

  }

  function getForecast(coords){
    console.log(coords);
    let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}&units=metric`;
    console.log(apiUrl);
    axios.get(apiUrl).then(displayForecast);
  }

  function displayTemperature(response) {
    let temperatureElement = document.querySelector("#temperatureCelcium");
    let temperatureElementF = document.querySelector("#temperatureFarenheit");
    let cityElement = document.querySelector("#current-city");
    let descriptionElement = document.querySelector("#desc");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon");
  


    celsiusTemperature = response.data.main.temp;
    temperatureElement.innerHTML = Math.round(celsiusTemperature) + "&#8451";
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity + "%";
    windElement.innerHTML = Math.round(response.data.wind.speed) + "km/h";
    dateElement.innerHTML = formattedDate(response.data.dt * 1000);
    iconElement.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    iconElement.setAttribute("alt", response.data.weather[0].description);

    getForecast(response.data.coord)
  }

  function search(city) {
    let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
  }
  search("Kiev");

  function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
  }


function showPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let cityNameApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}`
    let apiKey = '854e33f61b08418023d6baae98ed2380'
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    axios.get(apiUrl).then(displayTemperature);
    axios.get(`${cityNameApiUrl}`);
  }
  function getCurrentPosition() {
    navigator.geolocation.getCurrentPosition(showPosition);
  }

  let button = document.querySelector("#current-location-btn");
  button.addEventListener("click", getCurrentPosition);

  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", handleSubmit);

 
