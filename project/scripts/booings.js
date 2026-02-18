export function initBooking() {
    const form = document.querySelector("#booking-form");
    const nameDisplay = document.querySelector("#welcome-back");
    const savedName = localStorage.getItem("userName");
    if (savedName && nameDisplay) {
        nameDisplay.textContent = `Welcome back, ${savedName}! Ready to book?`;
    }

    if (form) {
        form.addEventListener("submit", (e) => {
            const firstName = document.querySelector("#fname").value;
            localStorage.setItem("userName", firstName);
        });
    }
}