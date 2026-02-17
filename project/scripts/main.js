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