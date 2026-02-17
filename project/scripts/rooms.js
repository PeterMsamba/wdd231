const url = 'data/rooms.json';
export async function fetchRooms(limit = null) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            let rooms = data.rooms;

            // If a limit is passed (e.g., 3 for index.html), shuffle and slice
            if (limit) {
                rooms = rooms.sort(() => 0.5 - Math.random()).slice(0, limit);
            }

            displayRooms(rooms);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function displayRooms(rooms) {
    // The selector matches the IDs in your HTML
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
            <p class="price">$${room.price}/month</p>
            <button class="details-btn" data-id="${room.id}">View Details</button>
        `;
        container.appendChild(card);
    });
}