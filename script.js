const apiKey = "26181f04028d934078a63571ad9ca7a2";
const searchBtn = document.getElementById('search-btn');
const currentLocationBtn = document.getElementById('current-location-btn');
const cityInput = document.getElementById('city-input');
const weatherInfo = document.getElementById('weather-info');
const cityName = document.getElementById('city-name');
const currentWeather = document.getElementById('current-weather');
const currentIcon = document.getElementById('current-icon');
const extendedForecast = document.getElementById('extended-forecast');
const recentCitiesDropdown = document.getElementById('recent-cities');

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeatherData(city);
        updateRecentCities(city);
    } else {
        alert('Please enter a city name.');
    }
});

currentLocationBtn.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            fetchWeatherData(null, latitude, longitude);
        }, () => {
            alert('Unable to retrieve your location.');
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
});

recentCitiesDropdown.addEventListener('change', (event) => {
    const city = event.target.value;
    if (city) {
        fetchWeatherData(city);
    }
});

function fetchWeatherData(city, lat, lon) {
    let url = '';
    if (city) {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    } else {
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    }
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                displayWeather(data);
                fetchExtendedForecast(data.coord.lat, data.coord.lon);
                saveWeatherData(city || data.name, data);
            } else {
                alert('City not found. Please enter a valid city name.');
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Error fetching weather data.');
        });
}

function displayWeather(data) {
    cityName.textContent = `${data.name} (${new Date().toLocaleDateString()})`;
    currentWeather.innerHTML = `
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Wind: ${data.wind.speed} m/s</p>
        <p>Humidity: ${data.main.humidity}%</p>
    `;
    currentIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}">`;
    weatherInfo.classList.remove('hidden');
}

function fetchExtendedForecast(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayExtendedForecast(data);
            saveExtendedForecast(data);
        })
        .catch(error => {
            console.error('Error fetching extended forecast:', error);
            alert('Error fetching extended forecast.');
        });
}

function displayExtendedForecast(data) {
    extendedForecast.innerHTML = '';
    for (let i = 0; i < data.list.length; i += 8) {
        const forecast = data.list[i];
        const date = new Date(forecast.dt * 1000).toLocaleDateString();
        extendedForecast.innerHTML += `
            <div class="bg-gray-200 p-2 rounded">
                <p>${date}</p>
                <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="${forecast.weather[0].description}">
                <p>Temp: ${forecast.main.temp}°C</p>
                <p>Wind: ${forecast.wind.speed} m/s</p>
                <p>Humidity: ${forecast.main.humidity}%</p>
            </div>
        `;
    }
}

function updateRecentCities(city) {
    let recentCities = JSON.parse(localStorage.getItem('recentCities')) || [];
    if (!recentCities.includes(city)) {
        recentCities.push(city);
        if (recentCities.length > 5) {
            recentCities.shift(); // Keep only the last 5 cities
        }
        localStorage.setItem('recentCities', JSON.stringify(recentCities));
        populateRecentCitiesDropdown();
    }
}

function populateRecentCitiesDropdown() {
    const recentCities = JSON.parse(localStorage.getItem('recentCities')) || [];
    if (recentCities.length > 0) {
        recentCitiesDropdown.innerHTML = '<option value="">Select a city</option>';
        recentCities.forEach(city => {
            recentCitiesDropdown.innerHTML += `<option value="${city}">${city}</option>`;
        });
        recentCitiesDropdown.classList.remove('hidden');
    } else {
        recentCitiesDropdown.classList.add('hidden');
    }
}

function saveWeatherData(city, data) {
    let weatherData = JSON.parse(localStorage.getItem('weatherData')) || {};
    weatherData[city] = data;
    localStorage.setItem('weatherData', JSON.stringify(weatherData));
}

function saveExtendedForecast(data) {
    let forecastData = JSON.parse(localStorage.getItem('forecastData')) || {};
    forecastData[data.city.name] = data;
    localStorage.setItem('forecastData', JSON.stringify(forecastData));
}

function loadStoredData() {
    const recentCities = JSON.parse(localStorage.getItem('recentCities')) || [];
    if (recentCities.length > 0) {
        const lastCity = recentCities[recentCities.length - 1];
        const weatherData = JSON.parse(localStorage.getItem('weatherData')) || {};
        const forecastData = JSON.parse(localStorage.getItem('forecastData')) || {};
        if (weatherData[lastCity]) {
            displayWeather(weatherData[lastCity]);
        }
        if (forecastData[lastCity]) {
            displayExtendedForecast(forecastData[lastCity]);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    populateRecentCitiesDropdown();
    loadStoredData();
});
