import { auth, db } from "/JS-auth-check-js/auth-check.js";
import {
    updateEmail,
    updatePassword,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import {
    doc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const updateBtn = document.querySelector(".Update-Btn");

updateBtn.addEventListener("click", async (e) => {
    e.preventDefault();

   
    const firstName = document.getElementById("first-name").value.trim();
    const lastName = document.getElementById("last-name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const cnic = document.getElementById("cnic").value.trim();
    const gender = document.getElementById("Gender").value;
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirm-password").value.trim();
    const street = document.getElementById("street-no").value.trim();
    const city = document.getElementById("city-name").value.trim();
    const state = document.getElementById("state").value.trim();
    const zipCode = document.getElementById("zip-code").value.trim();

    let isValid = true;

    if (firstName.length < 3 || firstName.length > 20) {
        document.querySelector('.first-name-error').innerText = 'A valid name required';

        isValid = false;
    }

    if (lastName.length < 3 || lastName.length > 20) {
        document.querySelector('.last-name-error').innerText = 'A valid name required';
        isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.querySelector('.email-error').innerText = 'Invalid email';
        isValid = false;
    }

    const phoneRegex = /^03\d{9}$/;
    if (!phoneRegex.test(phone)) {
        document.querySelector('.phone-no-error').innerText = 'Invalid phone number';
        isValid = false;
    }

    const cnicRegex = /^\d{13}$/;
    if (!cnicRegex.test(cnic)) {
        document.querySelector('.cnic-error').innerText = 'Invalid CNIC';
        isValid = false;
    }

    if (gender === "") {
        document.querySelector('.gender-error').innerText = 'Choose a Gender';
        isValid = false;
    }

    if (password || confirmPassword) {
        if (password !== confirmPassword) {
            document.querySelector('.confirm-password-error').innerText = 'Confirm password should be same to Password';
            isValid = false;
        }

        if (password.length < 6) {
            document.querySelector('.password-error2').innerText = 'Too short (at least 8 char)';
            isValid = false;
        }
    }

    if (!street) {
        document.querySelector('.street-name-error').innerText = 'Street required'
        isValid = false;
    }
    if (!city) {
        document.querySelector('.city-name-error').innerText = 'City required'
        isValid = false;
    }
    if (!state) {
        document.querySelector('.state-error').innerText = 'State required'
        isValid = false;
    }
    if (!city) {
        document.querySelector('.zip-code-error').innerText = 'Zip code required'
        isValid = false;
    }

    if (!isValid) return;

    // Proceed to update if validation passed
    onAuthStateChanged(auth, async (user) => {
        if (!user) {
            alert("User not logged in!");
            return;
        }

        const userRef = doc(db, "users", user.uid);

        try {
            // Update email if changed
            if (email !== user.email) {
                await updateEmail(user, email);
            }

            // Update password if provided
            if (password) {
                await updatePassword(user, password);
            }

            // Update Firestore document
            await updateDoc(userRef, {
                firstName,
                lastName,
                email,
                phone,
                cnic,
                gender,
                address: {
                    street,
                    city,
                    state,
                    zipCode,
                }
            });

            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Error: " + error.message);
        }
    });
});


let headingName = document.getElementById('heading-name')
const firstName1 = localStorage.getItem('first-name');
const lastName1 = localStorage.getItem('last-name');
const email1 = localStorage.getItem('email');
const phone1 = localStorage.getItem('phone');
const cnic1 = localStorage.getItem('cnic');
const gender1 = localStorage.getItem('gender');

window.onload = function () {
    document.getElementById("first-name").value = firstName1;
    document.getElementById("last-name").value = lastName1;
    document.getElementById("email").value = email1;
    document.getElementById("phone").value = phone1;
    document.getElementById("cnic").value = cnic1;
    headingName.innerText = `${firstName1} ${lastName1}`
};

