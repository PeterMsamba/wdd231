// scripts/main.js
import { fetchRooms } from './rooms.js';

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Navigation & UI Elements
    const menuBtn = document.querySelector('#menu-button');
    const navMenu = document.querySelector('#nav-menu');
    const year = document.querySelector('#year');
    const lastMod = document.querySelector('#lastModified');

    // Hamburger toggle logic
    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('open');
            menuBtn.innerHTML = isOpen ? '&times;' : '&#9776;';
        });
    }

    // 2. Footer Info
    if (year) year.textContent = new Date().getFullYear();
    if (lastMod) lastMod.textContent = document.lastModified;

    // 3. Dynamic Page Loading
    const featuredContainer = document.querySelector('#featured-grid');
    const allRoomsContainer = document.querySelector('#all-rooms-grid');

    if (featuredContainer) {
        fetchRooms(3); // Home page: 3 random rooms
    } else if (allRoomsContainer) {
        fetchRooms();  // Rooms page: all rooms
    }

    // 4. Initialize Booking logic if on booking page
    if (document.querySelector('#booking-form')) {
        const { initBooking } = await import('./booings.js'); 
        initBooking();
    }
});