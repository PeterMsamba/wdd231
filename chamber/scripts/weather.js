const url = 'https://api.openweathermap.org/data/2.5/weather?lat=YOUR_LAT&lon=YOUR_LON&units=imperial&appid=YOUR_API_KEY';

async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      displayResults(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

function displayResults(data) {
  document.querySelector('#current-temp').innerHTML = `${Math.round(data.main.temp)}`;
  document.querySelector('#weather-desc').textContent = data.weather[0].description;
  document.querySelector('#high-temp').textContent = Math.round(data.main.temp_max);
  document.querySelector('#low-temp').textContent = Math.round(data.main.temp_min);
  document.querySelector('#humidity').textContent = data.main.humidity;

  // Formatting time for Sunrise/Sunset
  const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  document.querySelector('#sunrise').textContent = sunriseTime;

  const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  document.querySelector('#weather-icon').setAttribute('src', iconsrc);
}

apiFetch();