// Footer Dates
const currentYear = new Date().getFullYear();
document.querySelector('#currentyear').textContent = currentYear;

const lastMod = document.querySelector('#lastModified');
lastMod.textContent = `Last Modification: ${document.lastModified}`;

// Menu Toggle
const menuBtn = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('open');
    navigation.classList.toggle('open');
});

// Course List Array
const courses = [
    { subject: 'CSE', number: 110, title: 'Intro to Programming', credits: 2, completed: true },
    { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 2, completed: true },
    { subject: 'CSE', number: 111, title: 'Programming Functions', credits: 2, completed: false },
    { subject: 'WDD', number: 131, title: 'Web Frontend 1', credits: 2, completed: true },
    { subject: 'WDD', number: 231, title: 'Web Frontend 2', credits: 2, completed: false },
    { subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 2, completed: false }
];

const courseContainer = document.querySelector('#course-container');
const totalCreditsDisplay = document.querySelector('#total-credits');

function displayCourses(filteredCourses) {
    courseContainer.innerHTML = "";
    filteredCourses.forEach(course => {
        const li = document.createElement('li');
        li.textContent = `${course.subject} ${course.number}`;
        if (course.completed) {
            li.classList.add('completed');
        }
        courseContainer.appendChild(li);
    });

    const total = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    totalCreditsDisplay.textContent = total;
}

// Initial display
displayCourses(courses);

// Event Listeners for Filters
document.querySelector('#all').addEventListener('click', () => displayCourses(courses));
document.querySelector('#cse').addEventListener('click', () => {
    displayCourses(courses.filter(c => c.subject === 'CSE'));
});
document.querySelector('#wdd').addEventListener('click', () => {
    displayCourses(courses.filter(c => c.subject === 'WDD'));
});