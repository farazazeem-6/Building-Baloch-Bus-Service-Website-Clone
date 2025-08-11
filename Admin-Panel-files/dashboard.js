const routecancelbtn = document.querySelector('.route-cancel-btn');
const routesubmitbtn = document.querySelector('.route-submit-btn');
const addroutebtn = document.querySelector('#add-route-btn');
const routemodaloverlay = document.querySelector('.route-modal-overlay');
const viewmodaloverlay = document.querySelector('#view-modal-overlay');
const crossIcon = document.querySelector('.cross-img img');

const Departure = document.getElementById('departure');
const Destination = document.getElementById('destination');
const Dates = document.getElementById('Date');
const DepartureTime = document.getElementById('DepartureTime');
const DestinationTime = document.getElementById('DestinationTime');
const BusType = document.getElementById('busType');
const terminal = document.querySelector('.terminal');
const fare = document.querySelector('#fare');
const noCardDiv = document.querySelector(".no-bus-text");
const cardsContainer = document.querySelector('.cards-container');

let cardsData = JSON.parse(localStorage.getItem("cardsData")) || [];
let editIndex = null;

window.addEventListener("DOMContentLoaded", () => {
    cardsData.forEach((data, index) => createCard(data, index));
    toggleNoCardMessage();
});

if (crossIcon) {
    crossIcon.addEventListener('click', () => {
        viewmodaloverlay.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
}

if (addroutebtn) {
    addroutebtn.addEventListener('click', () => {
        editIndex = null;
        clearForm();
        routemodaloverlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
}

if (routecancelbtn) {
    routecancelbtn.addEventListener('click', () => {
        routemodaloverlay.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
}




function saveCardsToLocalStorage() {
    localStorage.setItem("cardsData", JSON.stringify(cardsData));
}

function toggleNoCardMessage() {
    noCardDiv.style.display = cardsData.length === 0 ? 'flex' : 'none';
}

function clearForm() {
    Departure.value = "";
    Destination.value = "";
    Dates.value = "";
    DepartureTime.value = "";
    DestinationTime.value = "";
    BusType.value = "";
    terminal.value = '';
    fare.value = '';
}

function createCard(data, indexFromStorage = null) {
    let cardIndex;
    if (indexFromStorage !== null) {
        cardIndex = indexFromStorage;
    } else {
        cardIndex = cardsData.length;
        cardsData.push(data);
        saveCardsToLocalStorage();
    }

    const card = document.createElement("div");
    card.classList.add("card-1");
    card.setAttribute("data-index", cardIndex);

    const imgSection = document.createElement("div");
    imgSection.classList.add("card-img-section");
    const img = document.createElement("img");
    img.src = "/images/bus (1).png";
    img.alt = "";
    imgSection.appendChild(img);

    const mainContent = document.createElement("div");
    mainContent.classList.add("main-content");

    const title = document.createElement("h2");
    title.classList.add("service-title");
    title.innerText = `${data.departure} to ${data.destination}`;

    const serviceDetails = document.createElement("div");
    serviceDetails.classList.add("service-details");

    const departureCity = document.createElement("span");
    departureCity.classList.add("departure-city");
    departureCity.innerText = data.departure;

    const destinationCity = document.createElement("span");
    destinationCity.classList.add("destination-city");
    destinationCity.innerText = data.destination;

    const busType = document.createElement("span");
    busType.classList.add("bus-type");
    busType.innerText = data.type;

    serviceDetails.append(departureCity, destinationCity, busType);

    const actionButtons = document.createElement("div");
    actionButtons.classList.add("action-buttons");
    actionButtons.innerHTML = `
        <button class="btn btn-edit"><span><i class="fa-solid fa-pen-to-square"></i></span>Edit</button>
        <button class="btn btn-view"><span><i class="fa-regular fa-eye"></i></span>View</button>
        <button class="btn btn-delete"><span><i class="ri-delete-bin-line"></i></span>Delete</button>
    `;

    mainContent.append(title, serviceDetails, actionButtons);
    card.append(imgSection, mainContent);

    document.querySelector(".cards-container").appendChild(card);
    toggleNoCardMessage();
}



cardsContainer.addEventListener("click", function (event) {
    const card = event.target.closest(".card-1");
    if (!card) return;
    const index = parseInt(card.getAttribute("data-index"), 10);


    if (event.target.closest(".btn-view")) {
        const routeData = cardsData[index];
        viewmodaloverlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        document.querySelector('.dep').innerText = routeData.departure;
        document.querySelector('.des').innerText = routeData.destination;
        document.querySelector('.dep-date').innerText = routeData.date;
        document.querySelector('.dep-time').innerText = routeData.departureTime;
        document.querySelector('.arr-time').innerText = routeData.destinationTime;
        document.querySelector('.terminal-name').innerText = routeData.terminal;
        document.querySelector('.show-fare').innerText = routeData.fare;
    }


    if (event.target.closest(".btn-delete")) {
        cardsData.splice(index, 1);
        saveCardsToLocalStorage();
        card.remove();
        toggleNoCardMessage();

        document.querySelectorAll(".card-1").forEach((c, i) => {
            c.setAttribute("data-index", i);
        });
    }


    if (event.target.closest(".btn-edit")) {
        const routeData = cardsData[index];
        editIndex = index;
        Departure.value = routeData.departure;
        Destination.value = routeData.destination;
        Dates.value = routeData.date;
        DepartureTime.value = routeData.departureTime;
        DestinationTime.value = routeData.destinationTime;
        BusType.value = routeData.type;
        terminal.value = routeData.terminal;
        fare.value = routeData.fare;

        routemodaloverlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
});

function addOrEditRoute() {
    const GetDeparture = Departure.value;
    const GetDestination = Destination.value;
    const GetDate = Dates.value;
    const GetDepartureTime = DepartureTime.value;
    const GetDestinationTime = DestinationTime.value;
    const GetBusType = BusType.value;
    const GetTerminal = terminal.value;
    const GetFare = fare.value.trim();

    let Flag = true;

    document.querySelector('.dep-error').innerText = '';
    document.querySelector('.dis-error').innerText = '';
    document.querySelector('.date-error').innerText = '';
    document.querySelector('.departure-time-error').innerText = '';
    document.querySelector('.destination-time-error').innerText = '';
    document.querySelector('.bustype-error').innerText = '';
    document.querySelector('.terminal-error').innerText = '';
    document.querySelector('.fare-error').innerText = '';

    if (GetDeparture === "") {
        document.querySelector('.dep-error').innerText = 'Please select a departure city';
        Flag = false;
    }
    if (GetDestination === "") {
        document.querySelector('.dis-error').innerText = 'Please select a destination city';
        Flag = false;
    }
    if (GetDeparture !== "" && GetDestination !== "" && GetDeparture === GetDestination) {
        document.querySelector('.dis-error').innerText = 'Departure and destination cannot be the same';
        Flag = false;
    }
    if (GetDepartureTime === "") {
        document.querySelector('.departure-time-error').innerText = 'Departure time required';
        Flag = false;
    }
    if (GetDestinationTime === "") {
        document.querySelector('.destination-time-error').innerText = 'Destination time required';
        Flag = false;
    }
    if (GetDate === "") {
        document.querySelector('.date-error').innerText = 'Please select a date';
        Flag = false;
    }
    if (GetBusType === "") {
        document.querySelector('.bustype-error').innerText = 'Please select bus type';
        Flag = false;
    }
    if (GetTerminal === '') {
        document.querySelector('.terminal-error').innerText = 'Please select terminal';
        Flag = false;
    }
    if (GetFare === '') {
        document.querySelector('.fare-error').innerText = 'Please enter the fare';
        Flag = false;
    }
    if (isNaN(GetFare)) {
        document.querySelector('.fare-error').innerText = 'Only digits allowed';
        Flag = false;
    }

    if (Flag) {
        const newData = {
            departure: GetDeparture,
            destination: GetDestination,
            date: GetDate,
            departureTime: GetDepartureTime,
            destinationTime: GetDestinationTime,
            type: GetBusType,
            terminal: GetTerminal,
            fare: GetFare
        };

        if (editIndex !== null) {
            cardsData[editIndex] = newData;
            saveCardsToLocalStorage();

            const card = document.querySelector(`.card-1[data-index="${editIndex}"]`);
            card.querySelector(".service-title").innerText = `${newData.departure} to ${newData.destination}`;
            const details = card.querySelector(".service-details").children;
            details[0].innerText = newData.departure;
            details[1].innerText = newData.destination;
            details[2].innerText = newData.type;

            editIndex = null;
        } else {

            createCard(newData);
        }

        routemodaloverlay.style.display = 'none';
        document.body.style.overflow = 'auto';
        clearForm();
    }
}

if (routesubmitbtn) {
    routesubmitbtn.addEventListener('click', addOrEditRoute);
}



[Departure, Destination, Dates, DepartureTime, DestinationTime, BusType, terminal, fare].forEach((input, i) => {
    input.addEventListener('input', () => {
        const errors = ['.dep-error', '.dis-error', '.date-error', '.departure-time-error', '.destination-time-error', '.bustype-error', '.terminal-error', '.fare-error'];
        document.querySelector(errors[i]).innerText = '';
    });
});
