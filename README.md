https://github.com/Toufik353/internshala-weatherApp

Here's a README file for your Weather Dashboard project:

markdown
Copy code
# Weather Dashboard

## Overview

The Weather Dashboard is a simple web application that provides weather information and a 5-day forecast for a specified city. It allows users to search for weather data by city name or by using their current location. The application uses the OpenWeatherMap API to fetch weather data.

## Features

- **City Search**: Enter a city name to get current weather information and a 5-day forecast.
- **Current Location**: Use your current geographical location to get weather data.
- **Recent Cities**: View and select from a dropdown list of recently searched cities.
- **Weather Data Storage**: Recent searches and weather data are stored in the browser's local storage.

## Technologies Used

- HTML
- CSS (Tailwind CSS)
- JavaScript
- OpenWeatherMap API

## Setup

1. **Clone the repository**:


   git clone <repository-url>
Navigate to the project directory:

bash
Copy code
cd weather-dashboard
Open index.html in your web browser to view the application.

Files
index.html: The main HTML file containing the structure of the application.
style.css: Custom styles for the application.
script.js: JavaScript file containing the logic for fetching and displaying weather data.
API Key
Replace YOUR_API_KEY_HERE in script.js with your own OpenWeatherMap API key. You can get a free API key by signing up on the OpenWeatherMap website.

Usage
Search for a city: Enter a city name in the input field and click the "Search" button.
Use current location: Click the "Use Current Location" button to get weather data based on your current geographical location.
Select from recent cities: Use the dropdown menu to select from a list of recently searched cities.
Local Storage
Recent Cities: Stores the last 5 searched cities.
Weather Data: Stores the weather data for each city.
Forecast Data: Stores the 5-day forecast data for each city.
Troubleshooting
No data displayed: Ensure you have a valid OpenWeatherMap API key and that your browser has access to the internet.
Geolocation issues: Check that your browser has permission to access your location and that geolocation is enabled.
