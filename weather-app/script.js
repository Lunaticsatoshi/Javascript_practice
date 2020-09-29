const apiKey = 'df1a35037a8ad1317de7d18b27f90340'
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
/* const API_URL = `https://cors-anywhere.herokuapp.com/https://api` */
const BASE_URL = (location) => `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;

async function getWeather(location) {
    const response = await fetch(BASE_URL(location));
    const data = await response.json()

    addWeatherToPage(data)
}

function addWeatherToPage (data) {
    const temp = KtC(data.main.temp);

    const weather = document.createElement('div');
    weather.classList.add('weather');

    weather.innerHTML = `
        <small>Currently</small>
        <h1> <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"/> ${temp} °C </h1>
        <h4>${data.weather[0].main}</h4>
        <h5> in ${search.value} </h5>
    `;
    /* main.remove() */

    //Remove previous search
    main.innerHTML = "";
    main.appendChild(weather);
}

function KtC (K) {
    return (K-273.15).toFixed(2);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    

    const location = search.value;

    if(location) {
        getWeather(location)
    }
})