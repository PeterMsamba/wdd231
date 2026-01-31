const apiKey = "ea58459c4528ad7d78f4ab0049e9af18";
const lat = "-14.0183";
const lon = "33.6703";

// URLs
const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
const membersUrl = "data/members.json"; // Path to your JSON file

async function init() {
  try {
    const response = await fetch(weatherUrl);
    if (response.ok) {
      const data = await response.json();
      displayWeather(data);
    }
    fetchSpotlights();
  } catch (error) {
    console.error(error);
  }
}

function displayWeather(data) {
  const current = data.list[0];

  // Current Weather
  document.querySelector('#current-temp').innerHTML = Math.round(current.main.temp);
  document.querySelector('#weather-desc').textContent = current.weather[0].description;
  document.querySelector('#weather-icon').setAttribute('src', `https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`);
  document.querySelector('#humidity').textContent = current.main.humidity;

  // Forecast (Filtering for 12:00:00 for the next 3 days)
  const forecastContainer = document.querySelector('#forecast-details');
  const dailyData = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);

  dailyData.forEach(day => {
    const date = new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' });
    forecastContainer.innerHTML += `<p>${date}: <strong>${Math.round(day.main.temp)}°F</strong></p>`;
  });
}

async function fetchSpotlights() {
  try {
    const response = await fetch(membersUrl);
    const data = await response.json();

    // 1. Filter for Gold (3) or Silver (2) members
    // Note: 'data' is the array itself based on your members.json
    const eliteMembers = data.filter(m => m.membershipLevel === 2 || m.membershipLevel === 3);

    // 2. Shuffle and pick 3 randomly
    const shuffled = eliteMembers.sort(() => 0.5 - Math.random()).slice(0, 3);

    const container = document.querySelector('#business-spotlights');
    container.innerHTML = ""; // Clear container before adding

    shuffled.forEach(member => {
      // Determine level name for display
      const levelName = member.membershipLevel === 3 ? "Gold" : "Silver";

      container.innerHTML += `
        <div class="biz-card">
          <h3>${member.name}</h3>
          <p class="tagline"><em>${member.tagline}</em></p>
          <hr>
          <div class="biz-details">
            <img src="${member.image}" alt="${member.name} Logo" style="width:100px; height:auto;">
            <div>
              <p><strong>PH:</strong> ${member.phone}</p>
              <p><strong>ADDR:</strong> ${member.address}</p>
              <p><strong>WEB:</strong> <a href="${member.website}" target="_blank">Website</a></p>
              <p><strong>LEVEL:</strong> ${levelName}</p>
            </div>
          </div>
        </div>`;
    });
  } catch (error) {
    console.error("Error loading spotlights:", error);
  }
}

init();