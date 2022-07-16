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
  function displayTemperature(response) {
    let temperatureElement = document.querySelector("#temperature");
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

// function displayCityName(response){
//     let nameOfTheCurrentCity = response.data.city;
//     let city = document.querySelector("#current-city");
//     city.innerHTML = `${nameOfTheCurrentCity}`
// }

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

 
