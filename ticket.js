const modifySearchBtn = document.querySelector('.right-booking-heading a');
const targetElement = document.querySelector('.search-form');

modifySearchBtn.addEventListener('click', (e) => {
    e.preventDefault(); // avoid scroll to top
    targetElement.classList.toggle('active-2');
});




function formatDate(dateString) {
    const date = new Date(dateString); // Converts "2025-07-11" to a Date object

    const options = { month: 'short', day: 'numeric', weekday: 'long' };
    const formatted = date.toLocaleDateString('en-US', options); // e.g., "Fri, Jul 11"

    // Rearranging to match: "Jul 11, Friday"
    const parts = formatted.split(', ');
    return `${parts[1]}, ${parts[0]}`;
}



const origin = localStorage.getItem("originCity");
const destination = localStorage.getItem("destinationCity");
const date = localStorage.getItem("travelDate");

const headingContainer = document.querySelector('.left-booking-heading');
const headingTitle = headingContainer.querySelector('h4');
const headingDate = headingContainer.querySelector('p');

if (headingTitle && headingDate) {
    headingTitle.innerText = `${origin} - ${destination}`;
    headingDate.innerText = formatDate(date);
}
function capitalizeWords(str) {
    return str
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}


const formattedOrigin = capitalizeWords(origin);
const formattedDestination = capitalizeWords(destination);

// Apply to elements (if multiple exist)
document.querySelectorAll('.dep-location').forEach(el => {
    el.innerText = formattedDestination;
});

document.querySelectorAll('.des-location').forEach(el => {
    el.innerText = formattedOrigin;
});

document.querySelectorAll('.date').forEach(da => {
    da.innerText = formatDate(date);
})