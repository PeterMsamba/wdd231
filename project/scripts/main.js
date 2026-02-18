// Wayfinding and Menu
document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.querySelector('#menu-button');
    const navMenu = document.querySelector('#nav-menu');
    const year = document.querySelector('#year');
    const lastMod = document.querySelector('#lastModified');

   

    // Hamburger toggle
    menuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        menuBtn.innerHTML = navMenu.classList.contains('open') ? '&times;' : '&#9776;';
    });

    // Footer info
    if (year) year.textContent = new Date().getFullYear();
    if (lastMod) lastMod.textContent = document.lastModified;

    // Initialize specific page logic
    if (document.querySelector('#all-rooms-grid')) {
        import('./rooms.js').then(module => module.initRooms());
    }
});
import { fetchRooms } from './rooms.js';

document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.querySelector('#menu-button');
    const navMenu = document.querySelector('#nav-menu');

    if (menuButton && navMenu) {
        menuButton.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            menuButton.innerHTML = navMenu.classList.contains('open') ? '&times;' : '&#9776;';
        });
    }

    // 2. Room Loading Logic
    const featuredContainer = document.querySelector('#featured-grid');
    const allRoomsContainer = document.querySelector('#all-rooms-grid');

    if (featuredContainer) {
        // We are on the HOME PAGE: Request only 3 random rooms
        fetchRooms(3);
    } else if (allRoomsContainer) {
        // We are on the ROOMS PAGE: Request all 15 rooms
        fetchRooms();
    }

    // 3. Footer Dates
    document.querySelector('#year').textContent = new Date().getFullYear();
    document.querySelector('#lastModified').textContent = document.lastModified;
});