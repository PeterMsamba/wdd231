export async function initRooms() {
    const grid = document.querySelector('#all-rooms-grid');
    
    try {
        const response = await fetch('data/rooms.json');
        if (!response.ok) throw new Error('Failed to fetch room data');
        
        const data = await response.json();
        renderRooms(data.rooms, grid);
    } catch (error) {
        grid.innerHTML = `<p class="error">Error loading rooms: ${error.message}</p>`;
    }
}

function renderRooms(rooms, container) {
    container.innerHTML = rooms.map(room => `
        <section class="card">
            <img src="${room.image}" alt="${room.name}" loading="lazy">
            <h3>${room.name}</h3>
            <p><strong>Type:</strong> ${room.type}</p>
            <p><strong>Amenities:</strong> ${room.amenities}</p>
            <p><strong>Price:</strong> $${room.price}/mo</p>
            <button class="details-btn" onclick="alert('Booking feature coming soon!')">View Details</button>
        </section>
    `).join('');
}