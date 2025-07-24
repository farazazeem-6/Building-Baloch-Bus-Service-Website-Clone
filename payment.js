const bookingInfo = JSON.parse(localStorage.getItem('bookingInfo'));

if (bookingInfo) {
    console.log("Booking Info:", bookingInfo);
}