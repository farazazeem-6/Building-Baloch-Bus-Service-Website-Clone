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





// Range Slider JS 

document.addEventListener("DOMContentLoaded", function () {
    const minSlider = document.getElementById('minSlider');
    const maxSlider = document.getElementById('maxSlider');
    const minPrice = document.getElementById('minPrice');
    const maxPrice = document.getElementById('maxPrice');
    const sliderRange = document.getElementById('sliderRange');
    const currentRange = document.getElementById('currentRange');
    const decreaseBtn = document.getElementById('decreaseBtn');
    const increaseBtn = document.getElementById('increaseBtn');

    const MIN_VALUE = 500;
    const MAX_VALUE = 3000;
    const STEP = 50;

    function updateSlider() {
        const minValue = parseInt(minSlider.value);
        const maxValue = parseInt(maxSlider.value);

        if (minValue >= maxValue) minSlider.value = maxValue - 1;
        if (maxValue <= minValue) maxSlider.value = minValue + 1;

        const finalMinValue = parseInt(minSlider.value);
        const finalMaxValue = parseInt(maxSlider.value);

        minPrice.textContent = `PKR ${finalMinValue}`;
        maxPrice.textContent = `PKR ${finalMaxValue}`;
        currentRange.textContent = `Range: PKR ${finalMinValue} - PKR ${finalMaxValue}`;

        const minPercent = ((finalMinValue - MIN_VALUE) / (MAX_VALUE - MIN_VALUE)) * 100;
        const maxPercent = ((finalMaxValue - MIN_VALUE) / (MAX_VALUE - MIN_VALUE)) * 100;

        sliderRange.style.left = `${minPercent}%`;
        sliderRange.style.width = `${maxPercent - minPercent}%`;
    }

    function increaseBoth() {
        const minValue = parseInt(minSlider.value);
        const maxValue = parseInt(maxSlider.value);
        if (maxValue + STEP <= MAX_VALUE) {
            minSlider.value = minValue + STEP;
            maxSlider.value = maxValue + STEP;
            updateSlider();
        }
    }

    function decreaseBoth() {
        const minValue = parseInt(minSlider.value);
        const maxValue = parseInt(maxSlider.value);
        if (minValue - STEP >= MIN_VALUE) {
            minSlider.value = minValue - STEP;
            maxSlider.value = maxValue - STEP;
            updateSlider();
        }
    }

    // Event listeners
    minSlider.addEventListener('input', updateSlider);
    maxSlider.addEventListener('input', updateSlider);
    increaseBtn.addEventListener('click', increaseBoth);
    decreaseBtn.addEventListener('click', decreaseBoth);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowUp' || e.key === '+') {
            e.preventDefault();
            increaseBoth();
        } else if (e.key === 'ArrowDown' || e.key === '-') {
            e.preventDefault();
            decreaseBoth();
        }
    });

    // Smooth transitions
    minSlider.addEventListener('mousedown', () => minSlider.style.transition = 'none');
    maxSlider.addEventListener('mousedown', () => maxSlider.style.transition = 'none');
    minSlider.addEventListener('mouseup', () => minSlider.style.transition = 'all 0.1s ease');
    maxSlider.addEventListener('mouseup', () => maxSlider.style.transition = 'all 0.1s ease');

    updateSlider();
});





// Seat modal js 




document.addEventListener('DOMContentLoaded', () => {
    const seatModal = document.querySelector('.seat-modal-overlay');
    const seatcloseIcon = document.querySelector('.modal-cross-icon img');

    if (seatModal && seatcloseIcon) {
        seatcloseIcon.addEventListener('click', () => {
            console.log("Close icon clicked"); // optional test
            seatModal.style.display = 'none';
            document.body.classList.remove('seat-modal-open');
        });
    } else {
        console.warn('Modal or close icon not found in the DOM when script ran.');
    }
});

function showSeatModal() {
    document.querySelector('.seat-modal-overlay').style.display = 'flex';
    document.body.classList.add('seat-modal-open');
}




// Seat Selection JS 

const seats = document.querySelectorAll('.seat');
const genderModal = document.getElementById('genderModal');
const closeGenderModal = document.getElementById('closeGenderModal');
const maleBtn = document.getElementById('maleBtn');
const femaleBtn = document.getElementById('femaleBtn');

let selectedSeat = null;



seats.forEach(seat => {
    seat.addEventListener('click', () => {
        const bg = window.getComputedStyle(seat).backgroundColor;

        if (bg === 'rgb(255, 255, 255)') {
            selectedSeat = seat;
            genderModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
        else if (bg === 'rgb(0, 128, 0)') {
            seat.style.backgroundColor = 'white';
            seat.style.color = 'black';
            seat.style.border = '1px solid black';
        } else {
            // alert("Sorry, this seat is already booked.");
        }
    });
});

closeGenderModal.addEventListener('click', () => {
    genderModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    selectedSeat = null;
});


maleBtn.addEventListener('click', () => {
    if (selectedSeat) {
        selectedSeat.style.backgroundColor = '#008000';
        selectedSeat.style.color = 'white';
        selectedSeat.style.border = 'none';
    }
    genderModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    selectedSeat = null;
});


femaleBtn.addEventListener('click', () => {
    if (selectedSeat) {
        selectedSeat.style.backgroundColor = '#008000';
        selectedSeat.style.color = 'white';
        selectedSeat.style.border = 'none';
    }
    genderModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    selectedSeat = null;
});
