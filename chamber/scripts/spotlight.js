const url = "data/members.json";

async function getSpotlights() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    // 1. Filter for Gold (3) and Silver (2) levels
    // Note: Since your JSON is a top-level array, we use 'data.filter' 
    // instead of 'data.members.filter'
    const eligibleMembers = data.filter(m => m.membershipLevel === 3 || m.membershipLevel === 2);

    // 2. Shuffle and pick 3
    const shuffled = eligibleMembers.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);

    // 3. Render cards
    const spotlightContainer = document.querySelector('#spotlights');
    spotlightContainer.innerHTML = ""; // Clear existing content

    selected.forEach(member => {
      // Determine level name for display
      const levelName = member.membershipLevel === 3 ? "Gold" : "Silver";

      let card = `
        <div class="spotlight-card">
          <h4>${member.name}</h4>
          <p class="tagline"><em>${member.tagline}</em></p>
          <img src="${member.image}" alt="${member.name} logo">
          <div class="contact-info">
            <p>${member.phone}</p>
            <p>${member.address}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
          </div>
          <p class="level">Level: ${levelName}</p>
        </div>
      `;
      spotlightContainer.innerHTML += card;
    });
  } catch (error) {
    console.error("Error fetching spotlight data:", error);
  }
}

// IMPORTANT: Call the function to run on page load
getSpotlights();