const modifySearchBtn = document.querySelector('.right-booking-heading a');
const targetElement = document.querySelector('.search-form');

modifySearchBtn.addEventListener('click', (e) => {
    e.preventDefault(); 
    targetElement.classList.toggle('active-2');
});




function formatDate(dateString) {
    const date = new Date(dateString); 

    const options = { month: 'short', day: 'numeric', weekday: 'long' };
    const formatted = date.toLocaleDateString('en-US', options); 

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
            seatModal.style.display = 'none';
            document.body.classList.remove('seat-modal-open');

            resetUserSelectedSeats();
        });
    } else {
        console.warn('Modal or close icon not found in the DOM when script ran.');
    }
});

function showSeatModal() {
    document.querySelector('.seat-modal-overlay').style.display = 'flex';
    document.body.classList.add('seat-modal-open');
}


function resetUserSelectedSeats() {
    const allSeats = document.querySelectorAll('.seat');

    document.querySelector('.seat-counts p span').innerText = '';
    document.querySelector('.total-amount-of-seat p span').innerText = '0';

    allSeats.forEach(seat => {
        const bgColor = window.getComputedStyle(seat).backgroundColor;

        if (bgColor === 'rgb(0, 128, 0)') {
            seat.style.backgroundColor = 'white';
            seat.style.border = '1px solid black';
            seat.style.color = 'black';
        }
    });
}



// Seat Selection JS:

const seats = document.querySelectorAll('.seat');
const genderModal = document.getElementById('genderModal');
const closeGenderModal = document.getElementById('closeGenderModal');
const maleBtn = document.getElementById('maleBtn');
const femaleBtn = document.getElementById('femaleBtn');
const seatNo = document.querySelector('.seat-counts p span');
const seatPrice = document.querySelector('.price');
const totalPrice = document.querySelector('.total-amount-of-seat p span');

let selectedSeat = null;

function extractPrice(text) {
    const match = text.match(/\d+/g); // Find all numbers
    return match ? parseInt(match.join("")) : 0;
}

function getSelectedSeats() {
    return seatNo.innerText
        .replace("Seat No: ", "")
        .split(", ")
        .filter(Boolean);
}

function updateSeatListText(seatsArray) {
    seatNo.innerText = `${seatsArray.join(", ")}`;
    const pricePerSeat = extractPrice(seatPrice.innerText);
    totalPrice.innerText = seatsArray.length * pricePerSeat;
}

seats.forEach(seat => {
    seat.addEventListener('click', () => {
        const bg = window.getComputedStyle(seat).backgroundColor;
        const seatText = seat.innerText.trim();
        let selectedSeats = getSelectedSeats();

        if (bg === 'rgb(255, 255, 255)') {
            if (selectedSeats.length >= 5) {
                alert("You can only select up to 5 seats.");
                return;
            }
            selectedSeat = seat;
            genderModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }

        else if (bg === 'rgb(0, 128, 0)') {
            seat.style.backgroundColor = 'white';
            seat.style.color = 'black';
            seat.style.border = '1px solid black';

            const updatedSeats = selectedSeats.filter(s => s !== seatText);
            updateSeatListText(updatedSeats);
        }

    });
});

closeGenderModal.addEventListener('click', () => {
    genderModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    selectedSeat = null;
});

[maleBtn, femaleBtn].forEach(btn => {
    btn.addEventListener('click', () => {
        if (selectedSeat) {
            selectedSeat.style.backgroundColor = '#008000';
            selectedSeat.style.color = 'white';
            selectedSeat.style.border = 'none';

            let selectedSeats = getSelectedSeats();
            const seatText = selectedSeat.innerText;

            if (!selectedSeats.includes(seatText)) {
                selectedSeats.push(seatText);
            }
            updateSeatListText(selectedSeats);
        }

        genderModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        selectedSeat = null;
    });
});




