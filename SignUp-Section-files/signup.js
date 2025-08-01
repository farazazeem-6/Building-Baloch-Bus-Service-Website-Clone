// SignUp FireBase JS: 

import { app } from "/JS-firebase-config-js/JSfirebase-config.js"
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const auth = getAuth(app);
const db = getFirestore(app);



const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const cnic = document.getElementById('cnic');
const password = document.getElementById('password');
const Confirmpassword = document.getElementById('confirm-password');
const Gender = document.getElementById('Gender')

function checkValidationSignUp() {
    let getFirstName = firstName.value.trim();
    let getLasttName = lastName.value.trim();
    let getEmail = email.value.trim();
    let getPhone = phone.value.trim();
    let getCnic = cnic.value.trim();
    let getPassword = password.value.trim();
    let getConfirmPassword = Confirmpassword.value.trim();
    let GenderValue = Gender.value

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
    document.querySelector('.gender-error').innerText = '';



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
        isValidSignUp = false
    }

    else if (getPassword.length < 8) {
        document.querySelector('.password-error2').innerText = 'Too short (at least 8 char)';
        isValidSignUp = false
    }
    else if (getPassword.length > 20) {
        document.querySelector('.password-error2').innerText = 'Too long (maximum 20 char)';
        isValidSignUp = false
    }

    if (getConfirmPassword === "") {
        document.querySelector('.confirm-password-error').innerText = 'Confirm Password required';
        isValidSignUp = false
    }
    else if (getConfirmPassword !== getPassword) {
        document.querySelector('.confirm-password-error').innerText = 'Confirm password should be same to Password';
        isValidSignUp = false
    }

    if (GenderValue === '') {
        document.querySelector('.gender-error').innerText = 'Choose a Gender';
        isValidSignUp = false
    }

    if (isValidSignUp) {
        createUserWithEmailAndPassword(auth, getEmail, getPassword)
            .then(async (userCredential) => {
                const user = userCredential.user;

                try {
                    await setDoc(doc(db, "users", user.uid), {
                        firstName: getFirstName,
                        lastName: getLasttName,
                        email: getEmail,
                        phone: getPhone,
                        cnic: getCnic,
                        gender: GenderValue,
                        createdAt: new Date()
                    });

                    alert("Signup successful");
                    window.location.href = "/Home-Section-files/index.html";
                } catch (firestoreError) {
                    alert("Signup succeeded but failed to save info: " + firestoreError.message);
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                if (errorCode === 'auth/email-already-in-use') {
                    document.querySelector('.email-error').innerText = 'This email is already registered';
                } else if (errorCode === 'auth/invalid-email') {
                    document.querySelector('.email-error').innerText = 'Invalid email format';
                } else if (errorCode === 'auth/weak-password') {
                    document.querySelector('.password-error2').innerText = 'Weak password. Try a stronger one';
                } else {
                    alert("Signup failed: " + errorMessage);
                }
            });
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
Gender.addEventListener('input', () => {
    document.querySelector('.gender-error').innerText = '';
});

const signUpBtn = document.getElementById('signup-btn');

if (signUpBtn) {
    signUpBtn.addEventListener('click', checkValidationSignUp);
}
