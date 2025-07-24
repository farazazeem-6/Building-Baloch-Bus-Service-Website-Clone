
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

    updateSlider();
});


