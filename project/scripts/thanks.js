// scripts/thanks.js

document.addEventListener('DOMContentLoaded', () => {
  const resultsElement = document.querySelector('#results');

  // Get the URL search parameters
  const urlParams = new URLSearchParams(window.location.search);

  if (urlParams.has('fname')) {
    // Create an array of the keys/values to display
    const displayData = [
      { label: 'First Name', value: urlParams.get('fname') },
      { label: 'Last Name', value: urlParams.get('lname') },
      { label: 'Email', value: urlParams.get('email') },
      { label: 'Room Type', value: urlParams.get('room-type') },
      { label: 'Arrival Date', value: urlParams.get('arrival') }
    ];

    // Use template literals to generate the list
    resultsElement.innerHTML = `
            <ul>
                ${displayData.map(item => `
                    <li><strong>${item.label}:</strong> ${item.value}</li>
                `).join('')}
            </ul>
        `;
  } else {
    resultsElement.innerHTML = `<p>No reservation data found. Please return to the booking page.</p>`;
  }
});