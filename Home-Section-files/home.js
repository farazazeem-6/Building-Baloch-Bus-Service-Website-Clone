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
const OrigindropdownMenu = document.getElementById('origin-dropdown-menu');
const DesdropdownMenu = document.getElementById('destination-dropdown-menu');


let selectedOrigin = null;

OrigindropdownMenu.addEventListener('click', function (event) {
  const clickedOption = event.target.closest('.selection-dropdown-option');

  if (clickedOption) {
    selectedOrigin = clickedOption.getAttribute('data-value');
    console.log('Selected origin:', selectedOrigin);
    document.querySelector('.dep-error-div').innerText = '';

    // Optional: highlight selected option
    document.querySelectorAll('.selection-dropdown-option').forEach(option => {
      option.classList.remove('selected');
    });
    // clickedOption.classList.add('selected');
  }
});





let selectedDes = null;


DesdropdownMenu.addEventListener('click', function (event) {
  const clickedOption = event.target.closest('.selection-dropdown-option');

  if (clickedOption) {
    selectedDes = clickedOption.getAttribute('data-value');
    console.log('Selected Des:', selectedDes);
    document.querySelector('.des-error-div').innerText = '';

    // Optional: highlight selected option
    document.querySelectorAll('.selection-dropdown-option').forEach(option => {
      option.classList.remove('selected');
    });
    // clickedOption.classList.add('selected');
  }
});


function CheckValidation() {
  const DesError = document.querySelector('.des-error-div');
  const DepError = document.querySelector('.dep-error-div');

  const OriginValue = selectedOrigin
  const DesValue = selectedDes
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
    window.location.href = "/Ticket-Section-files/ticket-section.html";
  }, 1000);
}

// // ------------------ Card Carousel ------------------
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

function showSubModal() {
  if (forgetModal) {
    forgetModal.style.display = 'flex';
    document.body.classList.add("no-scroll");

  }
}


// dropdown js 


class CustomDropdown {
  constructor(buttonId, menuId, textId, placeholder = "Select an option...") {
    this.button = document.getElementById(buttonId);
    this.menu = document.getElementById(menuId);
    this.text = document.getElementById(textId);
    this.isOpen = false;
    this.placeholder = placeholder;

    if (!this.button || !this.menu || !this.text) {
      console.error('Dropdown elements not found:', { buttonId, menuId, textId });
      return;
    }

    this.init();
  }

  init() {
    this.button.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggle();
    });

    this.menu.addEventListener('click', (e) => {
      if (e.target.classList.contains('selection-dropdown-option')) {
        this.selectOption(e.target);
      }
    });

    document.addEventListener('click', (e) => {
      if (this.isOpen && !this.button.contains(e.target) && !this.menu.contains(e.target)) {
        this.close();
      }
    });

    this.menu.addEventListener('click', (e) => {
      e.stopPropagation();
    });


    window.addEventListener('resize', () => {
      if (this.isOpen) {
        this.updatePosition();
      }
    });
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    this.closeOtherDropdowns();

    this.isOpen = true;
    this.button.classList.add('active');
    this.updatePosition();
    this.menu.classList.add('show');

    
    const firstOption = this.menu.querySelector('.selection-dropdown-option');
    if (firstOption) {
      firstOption.focus();
    }
  }

  close() {
    this.isOpen = false;
    this.button.classList.remove('active');
    this.menu.classList.remove('show', 'show-up');
    this.button.focus();
  }

  closeOtherDropdowns() {
    
    if (window.dropdownInstances) {
      window.dropdownInstances.forEach(instance => {
        if (instance !== this && instance.isOpen) {
          instance.close();
        }
      });
    }
  }

  updatePosition() {
    const buttonRect = this.button.getBoundingClientRect();
    const menuHeight = this.menu.scrollHeight;
    const viewportHeight = window.innerHeight;
    const spaceBelow = viewportHeight - buttonRect.bottom;
    const spaceAbove = buttonRect.top;

    // Remove existing position classes
    this.menu.classList.remove('show-up');

    // Always show upward as requested
    this.menu.classList.add('show-up');
  }

  selectOption(option) {
    const value = option.getAttribute('data-value');
    const text = option.textContent;

    this.text.textContent = text;
    this.button.classList.remove('placeholder');
    this.close();

    // Trigger custom event
    const event = new CustomEvent('dropdownChange', {
      detail: { value, text, dropdown: this }
    });
    this.button.dispatchEvent(event);
  }

  setValue(value) {
    const option = this.menu.querySelector(`[data-value="${value}"]`);
    if (option) {
      this.selectOption(option);
    }
  }


}

// Initialize dropdowns and store instances globally
window.dropdownInstances = [];

const originDropdown = new CustomDropdown('origin-dropdown-btn', 'origin-dropdown-menu', 'origin-dropdown-text', 'Select Origin');
const destinationDropdown = new CustomDropdown('destination-dropdown-btn', 'destination-dropdown-menu', 'destination-dropdown-text', 'Select Destination');

window.dropdownInstances.push(originDropdown, destinationDropdown);





// custom dropdown for profile :

 const dropdownBtn = document.getElementById('customDropdownBtn');
  const dropdownMenu = document.getElementById('customDropdownMenu');

  dropdownMenu.style.display = 'none';

  dropdownBtn.addEventListener('click', (e) => {
    e.stopPropagation(); 
    const isVisible = dropdownMenu.style.display === 'block';
    dropdownMenu.style.display = isVisible ? 'none' : 'block';
  });

  document.addEventListener('click', () => {
    dropdownMenu.style.display = 'none';})