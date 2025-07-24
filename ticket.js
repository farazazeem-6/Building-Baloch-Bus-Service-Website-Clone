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
    const match = text.match(/\d+/g);
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

    updateNextButtonState();
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

            localStorage.setItem("selectedSeats", JSON.stringify(selectedSeats));
            localStorage.setItem("totalPrice", totalPrice.innerText);

            updateNextButtonState();
        }

        genderModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        selectedSeat = null;
    });
});






// Modal Buttons JS 


const Modalpage1 = document.querySelector('.modal-seats-div');
const Modalpage2 = document.querySelector('.select-terminal-container');
const ModalBtn1 = document.querySelector('#select-seat-btn');
const ModalBtn2 = document.querySelector('#select-terminal-btn');
const ModalBackBtn = document.querySelector('#modal-back-btn');
const ModalNextBtn = document.querySelector('#modal-next-btn');

ModalBtn1.addEventListener('click', function (e) {
    e.preventDefault();
    Modalpage1.style.display = 'flex';
    Modalpage2.style.display = 'none';

    ModalBtn1.style.backgroundColor = '#008000';
    ModalBtn1.style.color = 'white';

    ModalBtn2.style.backgroundColor = '#ece8e8';
    ModalBtn2.style.color = '#000';

    ModalNextBtn.innerText = 'Next';
});

ModalBtn2.addEventListener('click', function (e) {
    e.preventDefault();
    Modalpage1.style.display = 'none';
    Modalpage2.style.display = 'block';

    ModalBtn2.style.backgroundColor = '#008000';
    ModalBtn2.style.color = '#ece8e8';

    ModalBtn1.style.backgroundColor = '#ece8e8';
    ModalBtn1.style.color = '#000';

    ModalNextBtn.innerText = 'Check Out'
});

ModalBackBtn.addEventListener('click', function (e) {
    e.preventDefault();
    Modalpage1.style.display = 'flex';
    Modalpage2.style.display = 'none';


    ModalBtn1.style.backgroundColor = '#008000';
    ModalBtn1.style.color = 'white';

    ModalBtn2.style.backgroundColor = '#ece8e8';
    ModalBtn2.style.color = '#000';


    ModalNextBtn.innerText = 'Next';
});



function updateNextButtonState() {
    const selectedSeats = document.querySelector('.seat-counts p span').innerText.split(',').filter(Boolean);

    if (selectedSeats.length === 0) {
        ModalNextBtn.style.pointerEvents = 'none';
        ModalNextBtn.style.opacity = '0.9';
        ModalNextBtn.style.backgroundColor = '#008000';
        ModalNextBtn.style.color = 'white';
        ModalNextBtn.removeAttribute('href');
    } else {
        ModalNextBtn.style.pointerEvents = 'auto';
        ModalNextBtn.style.opacity = '1';
        ModalNextBtn.style.bakgroundColor = '#008000';
        ModalNextBtn.setAttribute('href', 'payment.html');
    }
}

document.addEventListener('DOMContentLoaded', updateNextButtonState);




ModalNextBtn.addEventListener('click', function (e) {
    e.preventDefault();

    // Get values from localStorage
    const departureCity = localStorage.getItem("originCity") || '';
    const destinationCity = localStorage.getItem("destinationCity") || '';
    const travelDate = localStorage.getItem("travelDate") || '';

    // Get values from DOM
    const selectedTerminal = document.querySelector('#selected-terminal')?.value || '';
    const totalPrice = document.querySelector('.total-amount-of-seat p span')?.innerText || '0';
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats")) || [];

    // Save to localStorage
    const bookingInfo = {
        departureCity,
        destinationCity,
        travelDate,
        selectedTerminal,
        selectedSeats,
        totalTicketPrice: totalPrice
    };

    localStorage.setItem('bookingInfo', JSON.stringify(bookingInfo));


    window.location.href = 'payment.html';
});
