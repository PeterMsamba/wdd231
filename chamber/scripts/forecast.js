const cityName = document.querySelector('#city');
const temp = document.querySelector('#temperature');
const desc = document.querySelector('#description');
// Fixed: added # and corrected id names to match HTML
const maxTemp = document.querySelector('#max-temp'); 
const humidity = document.querySelector('#humid');

const apiKey = "ea58459c4528ad7d78f4ab0049e9af18";
const lat = "-14.01"; 
const lon = "33.78"; 
// Added &units=imperial for Fahrenheit
const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

async function apiFetch() {
  try {
    // Fetch Current Weather
    const response = await fetch(currentUrl);
    if (response.ok) {
      const data = await response.json();
      displayResults(data);
    }

    // Fetch Forecast
    const fResponse = await fetch(forecastUrl);
    if (fResponse.ok) {
      const fData = await fResponse.json();
      displayForecast(fData);
    }
  } catch (error) {
    console.log(error);
  }
}

function displayResults(data) {
  cityName.innerHTML = data.name;
  desc.innerHTML = `Condition: ${data.weather[0].description}`;
  temp.innerHTML = `Current: ${Math.round(data.main.temp)}&deg;F`;
  maxTemp.innerHTML = `High: ${Math.round(data.main.temp_max)}&deg;F`;
  humidity.innerHTML = `Humidity: ${data.main.humidity}%`;
}

function displayForecast(data) {
  // Filters data to get one reading per day (at 12:00 PM)
  const threeDayData = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);
  
  const days = ['today', 'wednesday', 'thursday']; // Note: You might want to calculate day names dynamically
  threeDayData.forEach((day, index) => {
    document.getElementById(days[index]).innerHTML = `: ${Math.round(day.main.temp)}&deg;F`;
  });
}

apiFetch();