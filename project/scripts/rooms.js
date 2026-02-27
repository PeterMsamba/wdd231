// scripts/rooms.js
const url = 'data/rooms.json';

export async function fetchRooms(limit = null) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            let rooms = data.rooms;

            if (limit) {
                rooms = rooms.sort(() => 0.5 - Math.random()).slice(0, limit);
            }

            displayRooms(rooms);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function displayRooms(rooms) {
    const container = document.querySelector("#featured-grid") || document.querySelector("#all-rooms-grid");
    if (!container) return;

    container.innerHTML = ""; 

    rooms.forEach(room => {
        let card = document.createElement("section");
        card.className = "card";
        card.innerHTML = `
            <img src="${room.image}" alt="${room.name}" loading="lazy" width="300" height="200">
            <h3>${room.name}</h3>
            <p><strong>Type:</strong> ${room.type}</p>
            <p><strong>Amenities:</strong> ${room.amenities}</p>
            <button class="cta-btn details-btn" data-id="${room.id}">View Details</button>
        `;
        container.appendChild(card);
    });

    // Event delegation for "View Details" buttons
    container.addEventListener('click', (e) => {
        if (e.target.classList.contains('details-btn')) {
            const roomId = e.target.getAttribute('data-id');
            openRoomModal(roomId);
        }
    });
}

async function openRoomModal(id) {
    const modal = document.querySelector('#room-modal');
    const content = document.querySelector('#modal-content');
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        const room = data.rooms.find(r => r.id == id);

        if (room) {
            content.innerHTML = `
                <h2>${room.name}</h2>
                <img src="${room.image}" alt="${room.name}" style="width:100%; border-radius:8px;">
                <p style="margin: 1rem 0;">${room.description || 'Premium student accommodation.'}</p>
                <ul style="list-style: none; padding: 0;">
                    <li><strong>Price:</strong> MWK${room.price}</li>
                    <li><strong>Status:</strong> ${room.type}</li>
                    <li><strong>Includes:</strong> ${room.amenities}</li>
                </ul>
            `;
            modal.showModal();
        }
    } catch (err) {
        console.error("Error loading room details", err);
    }
}

// Global modal close logic
document.querySelector('#close-modal')?.addEventListener('click', () => {
    document.querySelector('#room-modal').close();
});