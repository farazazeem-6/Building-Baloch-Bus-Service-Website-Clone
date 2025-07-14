// ------------------ Hamburger Menu ------------------
const hamburgerBtn = document.querySelector('.ham-burger-btn');
const navButtons = document.querySelector('.nav-buttons');
const cargoContainer = document.querySelector('.cargo-container');

if (hamburgerBtn && navButtons && cargoContainer) {
  hamburgerBtn.addEventListener('click', (e) => {
    e.preventDefault();
    navButtons.classList.toggle('show');
    cargoContainer.classList.toggle('show');
  });
}

// ------------------ Search Validation ------------------
const searchBtn = document.getElementsByClassName('search-button');
const Origin = document.getElementById('origin');
const Des = document.getElementById('destination');

if (Origin && Des) {
  Origin.addEventListener('change', function () {
    document.querySelector('.dep-error-div').innerText = '';
  });

  Des.addEventListener('change', function () {
    document.querySelector('.des-error-div').innerText = '';
  });
}

function CheckValidation() {
  const DesError = document.querySelector('.des-error-div');
  const DepError = document.querySelector('.dep-error-div');

  const OriginValue = Origin?.value.trim();
  const DesValue = Des?.value.trim();
  const travelDate = document.getElementById('datepicker')?.value.trim();

  if (DesError) DesError.innerText = '';
  if (DepError) DepError.innerText = '';

  if (!OriginValue) {
    if (DepError) DepError.innerText = 'Select a departure city';
    return;
  }

  if (!DesValue) {
    if (DesError) DesError.innerText = 'Select a destination city';
    return;
  }

  if (OriginValue === DesValue) {
    if (DesError) DesError.innerText = 'Departure and Destination cities cannot be same';
    return;
  }

  localStorage.setItem("originCity", OriginValue);
  localStorage.setItem("destinationCity", DesValue);
  localStorage.setItem("travelDate", travelDate);

  setTimeout(() => {
    if (DesError) DesError.innerText = '';
    window.location.href = "ticket-section.html";
  }, 1000);
}

// ------------------ Card Carousel ------------------
const cards = document.querySelectorAll('.card');
let currentCard = 0;
const totalCards = cards.length;

function updateCards() {
  cards.forEach((card, index) => {
    card.classList.remove('active', 'prev', 'next');

    if (index === currentCard) {
      card.classList.add('active');
    } else if (index === (currentCard - 1 + totalCards) % totalCards) {
      card.classList.add('prev');
    } else if (index === (currentCard + 1) % totalCards) {
      card.classList.add('next');
    }
  });
}

function nextCard() {
  currentCard = (currentCard + 1) % totalCards;
  updateCards();
}

function previousCard() {
  currentCard = (currentCard - 1 + totalCards) % totalCards;
  updateCards();
}

if (cards.length > 0) {
  updateCards();

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') previousCard();
    else if (e.key === 'ArrowRight') nextCard();
  });

  let startX = 0, endX = 0;

  document.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });

  document.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
  });

  function handleSwipe() {
    const threshold = 50;
    const diff = startX - endX;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) nextCard();
      else previousCard();
    }
  }

  // startAutoPlay();
}

// ------------------ Modal Subscription ------------------
const forgetModal = document.getElementById('forget-modal');
const emailInput = document.getElementById('subscribe-email');
const closeIcon = document.querySelector('.cross-img img');
const form = document.getElementById("subscribe-form");

if (closeIcon && forgetModal) {
  closeIcon.addEventListener('click', () => {
    forgetModal.style.display = 'none';
    document.body.classList.remove('no-scroll');
  });
}

if (form && emailInput && forgetModal) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const emailValue = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailPattern.test(emailValue)) {
      forgetModal.style.display = "flex";
      document.body.classList.add("no-scroll");
    } else {
      alert("Please enter a valid email address.");
    }
  });
}

// Optional function if you call showSubModal() inline in HTML
function showSubModal() {
  if (forgetModal) {
    forgetModal.style.display = 'flex';
    document.body.classList.add("no-scroll");
  }
}
