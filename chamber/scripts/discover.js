import { attractions } from '../data/discover.mjs';

// --- 1. Visitor Message (localStorage) ---
const messageDisplay = document.querySelector("#visitor-message");
const lastVisit = localStorage.getItem("lastVisitDate");
const now = Date.now();

if (!lastVisit) {
    messageDisplay.textContent = "Welcome! Let us know if you have any questions.";
} else {
    const difference = now - parseInt(lastVisit);
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));

    if (difference < 86400000) { // Less than 1 day
        messageDisplay.textContent = "Back so soon! Awesome!";
    } else {
        messageDisplay.textContent = `You last visited ${days} ${days === 1 ? "day" : "days"} ago.`;
    }
}
localStorage.setItem("lastVisitDate", now);

// --- 2. Build Cards ---
const cardElements = document.querySelectorAll(".card");
attractions.forEach((item, index) => {
    if (cardElements[index]) {
        cardElements[index].innerHTML = `
            <h2>${item.name}</h2>
            <figure><img src="${item.image}" alt="${item.name}" loading="lazy"></figure>
            <address>${item.address}</address>
            <p>${item.description}</p>
            <button>Learn More</button>
        `;
    }
});

// --- 3. Standard Footer/Menu Logic ---
document.querySelector("#current-year").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = `Last Modified: ${document.lastModified}`;

const menuBtn = document.querySelector('#menu');
const nav = document.querySelector('.navigation');
menuBtn.addEventListener('click', () => {
    nav.classList.toggle('open');
    menuBtn.classList.toggle('open');
});