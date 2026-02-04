const url = "data/members.json";
const container = document.querySelector("#member-container");
const gridBtn = document.querySelector("#grid-view");
const listBtn = document.querySelector("#list-view");
const menuBtn = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

// Fetch and display members
async function getMembers() {
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

const displayMembers = (members) => {
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
};

// View Toggles
gridBtn.addEventListener("click", () => {
  container.classList.add("grid");
  container.classList.remove("list");
});

listBtn.addEventListener("click", () => {
  container.classList.add("list");
  container.classList.remove("grid");
});

// Mobile Menu Toggle
menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('open');
  navigation.classList.toggle('open');
});

// Footer Info
document.querySelector("#current-year").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = `Last Modified: ${document.lastModified}`;

getMembers();