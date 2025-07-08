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
