const cityName = document.querySelector('#current-temp');
const temp = document.querySelector('#weather-desc');
const maxTemp = document.querySelector('#high-temp');
const lowTemp = document.querySelector('#low-temp');
const humidity = document.querySelector('#humidity');
const sunrise = document.querySelector('#sunrise');
const sunset = document.querySelector('#sunset');


const apiKey = "ea58459c4528ad7d78f4ab0049e9af18";
const lat = "-14.018328899103812";
const log = "33.67028255534242";
const url = `//api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${log}&appid=${apiKey}`

async function apiFetch() {
  try {
    const response = await fetch(url);
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
 
}

apiFetch();