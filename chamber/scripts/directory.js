//menu
const menuBtn = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('open');
    navigation.classList.toggle('open');
});
const url = "data/members.json";
const container = document.querySelector('#directory-container');
const gridBtn = document.querySelector('#grid');
const listBtn = document.querySelector('#list');

async function getMembers() {
  const response = await fetch(url);
  const data = await response.json();
  displayMembers(data);
}

const displayMembers = (members) => {
  container.innerHTML = ""; // Clear existing content
  members.forEach((member) => {
    let card = document.createElement('section');

    card.innerHTML = `
            <img src="${member.image}" alt="${member.name}" loading="lazy">
            <h3>${member.name}</h3>
            <p>${member.tagline}</p>
            <address>${member.address}</address>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">Website</a>
        `;
    container.appendChild(card);
  });
}

gridBtn.addEventListener('click', () => {
  container.classList.add('grid');
  container.classList.remove('list');
});

listBtn.addEventListener('click', () => {
  container.classList.add('list');
  container.classList.remove('grid');
});

getMembers();