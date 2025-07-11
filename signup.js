const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const cnic = document.getElementById('cnic');
const password = document.getElementById('password');
const Confirmpassword = document.getElementById('confirm-password');

function checkValidationSignUp() {
    let getFirstName = firstName.value.trim();
    let getLasttName = lastName.value.trim();
    let getEmail = email.value.trim();
    let getPhone = phone.value.trim();
    let getCnic = cnic.value.trim();
    let getPassword = password.value.trim();
    let getConfirmPassword = Confirmpassword.value.trim();

    const nameRegex = /^[A-Za-z\s]+$/;
    const alphaNumericOnly = /^[A-Za-z0-9]+$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const subjectRegex = /^[A-Za-z0-9 ,.'"-]{3,100}$/;
    const pkPhoneRegex = /^03\d{9}$/;
    const messageRegex = /^[A-Za-z0-9 @#&(),.?!'"%\-_\n]{5,1000}$/;
    const cnicRegex = /^\d{13}$/;

    let isValidSignUp = true;

    document.querySelector('.first-name-error').innerText = '';
    document.querySelector('.last-name-error').innerText = '';
    document.querySelector('.email-error').innerText = '';
    document.querySelector('.phone-no-error').innerText = '';
    document.querySelector('.cnic-error').innerText = '';
    document.querySelector('.password-error2').innerText = '';
    document.querySelector('.confirm-password-error').innerText = '';



    if (getFirstName === "") {
        document.querySelector('.first-name-error').innerText = 'First Name required';
        isValidSignUp = false;
    }
    else if (!nameRegex.test(getFirstName)) {
        document.querySelector('.first-name-error').innerText = 'Invalid Name';
        isValidSignUp = false;
    }

    if (getLasttName === "") {
        document.querySelector('.last-name-error').innerText = 'Last Name required';
        isValidSignUp = false;
    }
    else if (!nameRegex.test(getLasttName)) {
        document.querySelector('.last-name-error').innerText = 'Invalid Name';
        isValidSignUp = false;
    }

    if (getEmail === "") {
        document.querySelector('.email-error').innerText = 'Email required';
        isValidSignUp = false;
    }
    else if (!emailRegex.test(getEmail)) {
        document.querySelector('.email-error').innerText = 'Invalid email';
        isValidSignUp = false;
    }

    if (getPhone === "") {
        document.querySelector('.phone-no-error').innerText = 'Phone number required';
        isValidSignUp = false;
    }
    else if (!pkPhoneRegex.test(getPhone)) {
        document.querySelector('.phone-no-error').innerText = 'Invalid phone number';
        isValidSignUp = false;
    }

    if (getCnic === "") {
        document.querySelector('.cnic-error').innerText = 'CNIC required';
        isValidSignUp = false
    }
    else if (!cnicRegex.test(getCnic)) {
        document.querySelector('.cnic-error').innerText = 'Invalid CNIC';
        isValidSignUp = false
    }


    if (getPassword === "") {
        document.querySelector('.password-error2').innerText = 'Password required';
        let isValidSignUp = false
    }

    else if (getPassword.length < 8) {
        document.querySelector('.password-error2').innerText = 'Too short (at least 8 char)';
        let isValidSignUp = false
    }
    else if (getPassword.length > 20) {
        document.querySelector('.password-error2').innerText = 'Too long (maximum 20 char)';
        let isValidSignUp = false
    }

    if (getConfirmPassword === "") {
        document.querySelector('.confirm-password-error').innerText = 'Confirm Password required';
        let isValidSignUp = false
    }
    else if (getConfirmPassword !== getPassword) {
        document.querySelector('.confirm-password-error').innerText = 'Confirm password should be same to Password';
        let isValidSignUp = false
    }


    if (isValidSignUp) {
        alert('You Signed In!');
        document.getElementsByClassName('form-no-1').reset();
        document.getElementsByClassName('form-no-2').reset();
        document.getElementsByClassName('form-no-3').reset();
        document.getElementsByClassName('form-no-4').reset();
    }
}


firstName.addEventListener('input', () => {
    document.querySelector('.first-name-error').innerText = '';
});
lastName.addEventListener('input', () => {
    document.querySelector('.last-name-error').innerText = '';
});
email.addEventListener('input', () => {
    document.querySelector('.email-error').innerText = '';
});
phone.addEventListener('input', () => {
    document.querySelector('.phone-no-error').innerText = '';
});
cnic.addEventListener('input', () => {
    document.querySelector('.cnic-error').innerText = '';
});
password.addEventListener('input', () => {
    document.querySelector('.password-error2').innerText = '';
});
Confirmpassword.addEventListener('input', () => {
    document.querySelector('.confirm-password-error').innerText = '';
});