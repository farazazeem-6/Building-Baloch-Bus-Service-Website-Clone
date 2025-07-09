const hamburgerBtn = document.querySelector('.ham-burger-btn');
const navButtons = document.querySelector('.nav-buttons');
const cargoContainer = document.querySelector('.cargo-container');

hamburgerBtn.addEventListener('click', (e) => {
  e.preventDefault();
  navButtons.classList.toggle('show');
  cargoContainer.classList.toggle('show');
});



const Origin = document.getElementById('origin');
const Des = document.getElementById('destination');

function CheckValidation() {
  const DesError = document.querySelector('.des-error-div');
  const DepError = document.querySelector('.dep-error-div');

  const OriginValue = Origin.value.trim();
  const DesValue = Des.value.trim();

  DesError.innerText = '';
  DepError.innerText = '';

  if (OriginValue === "") {
    DepError.innerText = 'Select a departure city';
    return;
  }

  if (DesValue === "") {
    DesError.innerText = 'Select a destination city';
    return;
  }

  if (OriginValue === DesValue) {
    DesError.innerText = 'Departure and Destination cities cannot be same';
    return;
  }

  DesError.innerText = '✅ Search successful!';
  DesError.style.color = '#008000';
  setTimeout(() => {
    DesError.innerText = '';
  }, 5000);
}

Origin.addEventListener('change', function () {
  document.querySelector('.dep-error-div').innerText = '';
});

Des.addEventListener('change', function () {
  document.querySelector('.des-error-div').innerText = '';
});




// Cards JS 

let currentCard = 0;
const cards = document.querySelectorAll('.card');
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

// Optional: Auto-play functionality
function startAutoPlay() {
  setInterval(nextCard, 4000); // Change card every 4 seconds
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    previousCard();
  } else if (e.key === 'ArrowRight') {
    nextCard();
  }
});

// Touch/swipe support for mobile
let startX = 0;
let endX = 0;

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
    if (diff > 0) {
      nextCard();
    } else {
      previousCard();
    }
  }
}

// Initialize
updateCards();

// Uncomment the line below to enable auto-play
// startAutoPlay();

