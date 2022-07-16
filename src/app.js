
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

function search (event){
    event.preventDefault();
    let city = document.querySelector("#city-input").value;
    let apiKey = '854e33f61b08418023d6baae98ed2380'
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    axios.get(apiUrl).then(showTemperature);
    axios.get(apiUrl).then(showDesc);
    let cityElement = document.querySelector("#current-city");
    cityElement.innerHTML = city;
} 
function showDesc(response) {
    console.log(response.data.weather[0].description);
    let desc = response.data.weather[0].description;
    let descElement = document.getElementById('desc');
    descElement.innerHTML = `${desc}`;
}

function showTemperature(response) {
    console.log(response.data);
    let temperature = Math.round(response.data.main.temp);
    let temperatureElement = document.getElementById('temperature');
    temperatureElement.innerHTML = `${temperature}&#8451;`;
    let humidity = response.data.main.humidity;
    let humidityElement = document.getElementById("humidity");
    humidityElement.innerHTML = `${humidity}%`
    let wind = Math.round(response.data.wind.speed);
    let windElement = document.getElementById("wind");
    windElement.innerHTML = `${wind} km/h`
    let currentDateElement = document.getElementById("date");
    currentDateElement.innerHTML = formattedDate(response.data.dt * 1000);
    let iconElement = document.getElementById("icon");
    iconElement.setAttribute("alt",response.data.weather[0].description);
    iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
}

function displayCityName(response){
    let nameOfTheCurrentCity = response.data.city;
    let city = document.querySelector("#current-city");
    city.innerHTML = `${nameOfTheCurrentCity}`

}

function showPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let cityNameApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}`
    let apiKey = '854e33f61b08418023d6baae98ed2380'
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    axios.get(apiUrl).then(showTemperature);
    axios.get(apiUrl).then(showDesc);
    axios.get(`${cityNameApiUrl}`).then(displayCityName);
  }
  function getCurrentPosition() {
    navigator.geolocation.getCurrentPosition(showPosition);
  }

  let button = document.querySelector("#current-location-btn");
  button.addEventListener("click", getCurrentPosition);

  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", search);

 
