const cityName = document.querySelector('#city');
const temp = document.querySelector('#temperature');
const desc = document.querySelector('#description');
const maxTemp = document.querySelector('max-temp');
const minTemp = document.querySelector('#min-temp');
const humidity = document.querySelector('#humid');

const apiKey = "ea58459c4528ad7d78f4ab0049e9af18";
const lat = "-14.01915542210118";
const log = "33.67055919535546";
const link = `//api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${log}&appid=${apiKey}`

async function apiFetch() {
  try {
    const response = await fetch(link);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      displayResults(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}
function displayResults(data) {
  cityName.innerHTML = data.name;
  desc.innerHTML = data.weather[0].description;
  temp.innerHTML = `${data.main.temp}&deg;F`;
  maxTemp.innerHTML = `${data.main.temp_max}`
  humidity.innerHTML = `${data.main.humidity}`
  const graphic = document.querySelector('#graphic');
  const iconLink = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  console.log(iconLink);
  graphic.setAttribute('SRC', iconLink);
  graphic.setAttribute('alt', data.weather[0].description);
}

apiFetch();