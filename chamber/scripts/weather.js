const apiKey = 'YOUR_API_KEY_HERE';
const city = 'YourCityName';
const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;

async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      displayWeather(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

function displayWeather(data) {
  const currentTemp = document.querySelector('#current-temp');
  const weatherDesc = document.querySelector('#weather-desc');
  
  currentTemp.innerHTML = `${Math.round(data.list[0].main.temp)}&deg;F`;
  weatherDesc.textContent = data.list[0].weather[0].description;

  // Filter for forecast (example: taking noon data for the next 3 days)
  const forecast = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);
  // Loop through forecast to update your UI labels
}