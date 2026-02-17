const urlsptlight = "data/members.json";

async function getSpotlights() {
  try {
    const response = await fetch(urlsptlight);
    if (!response.ok) throw new Error("Could not load members.json");
    
    const data = await response.json();
    
    // FIX: Check if your JSON is an object with a 'members' key, or just a plain array
    const membersArray = Array.isArray(data) ? data : data.members;

    if (!membersArray) {
      console.error("JSON structure error: Could not find the members array.");
      return;
    }

    // 1. Filter for Gold (3) and Silver (2) levels
    // This check works whether your JSON has 3 or "Gold"
    const eligibleMembers = membersArray.filter(m => 
      m.membershipLevel === 3 || 
      m.membershipLevel === 2 || 
      m.membershipLevel === "Gold" || 
      m.membershipLevel === "Silver"
    );

    // 2. Shuffle and pick 2 or 3
    const shuffled = eligibleMembers.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);

    // 3. Render cards
    const spotlightContainer = document.querySelector('#spotlights-section');
    if (!spotlightContainer) return; // Exit if the ID doesn't exist in HTML
    
    spotlightContainer.innerHTML = ""; 

    selected.forEach(member => {
      // Logic to handle both number and string membership levels for display
      let levelDisplay = member.membershipLevel;
      if (levelDisplay === 3) levelDisplay = "Gold";
      if (levelDisplay === 2) levelDisplay = "Silver";

      const card = `
        <div class="spotlight-card card">
          <h4>${member.name}</h4>
          ${member.tagline ? `<p class="tagline"><em>${member.tagline}</em></p>` : ''}
          <img src="${member.image}" alt="${member.name} logo" loading="lazy">
          <div class="contact-info">
            <p>${member.phone}</p>
            <p>${member.address}</p>
            <a href="${member.website}" target="_blank" class="member-link">Visit Website</a>
          </div>
          <p class="level-tag"><strong>Level:</strong> ${levelDisplay}</p>
        </div>
      `;
      spotlightContainer.insertAdjacentHTML('beforeend', card);
    });
  } catch (error) {
    console.error("Error fetching spotlight data:", error);
  }
}

getSpotlights();