

let headingName = document.getElementById('heading-name')
const firstName = localStorage.getItem('first-name');
const lastName = localStorage.getItem('last-name');
const email = localStorage.getItem('email');
const phone = localStorage.getItem('phone');
const cnic = localStorage.getItem('cnic');
const gender = localStorage.getItem('gender');

window.onload = function () {
    document.getElementById("first-name").value = firstName;
    document.getElementById("last-name").value = lastName;
    document.getElementById("email").value = email;
    document.getElementById("phone").value = phone;
    document.getElementById("cnic").value = cnic;
    headingName.innerText=`${firstName} ${lastName}`
};
