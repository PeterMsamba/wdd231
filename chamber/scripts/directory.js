const url = "data/members.json";
const container = document.querySelector("#member-container");
const gridBtn = document.querySelector("#grid-view");
const listBtn = document.querySelector("#list-view");
const menuBtn = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

// Fetch and display members
async function getMembers() {
  // Only run if the container exists on the current page
  if (container) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch data");
      const data = await response.json();
      displayMembers(data);
    } catch (error) {
      console.error("Error:", error);
      container.innerHTML = "<p>Unable to load directory at this time.</p>";
    }
  }
}

const displayMembers = (members) => {
  if (container) {
    container.innerHTML = ""; 
    members.forEach((member) => {
      let card = document.createElement("section");
      card.innerHTML = `
        <img src="${member.image}" alt="${member.name} logo" loading="lazy">
        <h3>${member.name}</h3>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <p><a href="${member.website}" target="_blank">Visit Website</a></p>
        <p class="membership">Level: ${member.membershipLevel}</p>
      `;
      container.appendChild(card);
    });
  }
};

// View Toggles - Only add listeners if buttons exist
if (gridBtn && listBtn) {
    gridBtn.addEventListener("click", () => {
      container.classList.add("grid");
      container.classList.remove("list");
    });

    listBtn.addEventListener("click", () => {
      container.classList.add("list");
      container.classList.remove("grid");
    });
}

// Mobile Menu Toggle (Runs on all pages)
if (menuBtn && navigation) {
    menuBtn.addEventListener('click', () => {
      menuBtn.classList.toggle('open');
      navigation.classList.toggle('open');
    });
}

// Footer Info (Runs on all pages)
const yearSpan = document.querySelector("#current-year");
const modSpan = document.querySelector("#lastModified");

if (yearSpan) yearSpan.textContent = new Date().getFullYear();
if (modSpan) modSpan.textContent = `Last Modified: ${document.lastModified}`;

getMembers();