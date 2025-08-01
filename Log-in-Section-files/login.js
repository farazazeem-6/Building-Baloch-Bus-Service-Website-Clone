const Username = document.getElementById('username');
const UserPassword = document.getElementById('password');

Username.addEventListener('input', function () {
    document.querySelector('.username-error').innerText = '';
})
UserPassword.addEventListener('input', function () {
    document.querySelector('.password-error').innerText = '';
})

const forgetModal1 = document.getElementById('forget-modal-1');
const forgetEmail = document.getElementById('forget-email');
const closeIcon1 = document.querySelector('.cross-img-1 img');
const SubmitBtn = document.getElementsByClassName('send-email-btn');
const ForgetBtn = document.querySelector('.forgot-password')

closeIcon1.addEventListener('click', () => {
    forgetModal1.style.display = 'none';
    document.body.classList.remove('modal-open');
});

function showForgetModal() {
    document.getElementById('forget-modal-1').style.display = 'flex';
    document.body.classList.add('modal-open');
}
ForgetBtn.addEventListener('click', function (e) {
    e.preventDefault()
    showForgetModal()
})


import { app } from "/JS-firebase-config-js/JSfirebase-config.js"
import {
    getAuth,
    signInWithEmailAndPassword,
    sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";


const auth = getAuth(app);

window.CheckValidationsForLogin = function () {
    const email = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const GetUserName = Username.value.trim();
    const GetUserPassword = UserPassword.value.trim();

    let isValidLoginInput = true;

    document.querySelector('.username-error').innerText = '';
    document.querySelector('.password-error').innerText = '';


    const emailRegex = /^[\w.-]+@[a-zA-Z_-]+?\.[a-zA-Z]{2,3}$/;
    const usernameRegex = /^[a-zA-Z0-9._]{4,20}$/;


    if (GetUserName === "") {
        document.querySelector('.username-error').innerText = 'Username or email required';
        isValidLoginInput = false;
    } else if (!emailRegex.test(GetUserName) && !usernameRegex.test(GetUserName)) {
        document.querySelector('.username-error').innerText = 'Invalid username or email';
        isValidLoginInput = false;
    }

    if (GetUserPassword === "") {
        document.querySelector('.password-error').innerText = 'Password required';
        isValidLoginInput = false;
    }

    else if (GetUserPassword.length < 8) {
        document.querySelector('.password-error').innerText = 'Password must be at least 8 characters';
        isValidLoginInput = false;
    }
    else if (GetUserPassword.length > 20) {
        document.querySelector('.password-error').innerText = 'Too long password (maximum-20)';
        isValidLoginInput = false;
    }

    if (isValidLoginInput) {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential);
                alert("Login successful!", userCredential);
                window.location.href = "/Home-Section-files/index.html";
            })
            .catch((error) => {
                document.querySelector(".username-error").textContent = 'invalid email or password';
                document.querySelector(".password-error").textContent = "";
            });
    }

};

// Make sure this is exposed to global scope:
window.CheckForgetValidation = function () {
    const emailRegex = /^[\w.-]+@[a-zA-Z_-]+?\.[a-zA-Z]{2,3}$/;
    const GetforgetValue = forgetEmail.value.trim();
    const errorDiv = document.querySelector('.invalid-forget-email');

    let isValidForgetEmail = true;
    errorDiv.innerText = '';

    if (GetforgetValue === "") {
        errorDiv.innerText = 'Email required';
        isValidForgetEmail = false;
    } else if (!emailRegex.test(GetforgetValue)) {
        errorDiv.innerText = 'Invalid email';
        isValidForgetEmail = false;
    }

    if (isValidForgetEmail) {
        sendPasswordResetEmail(auth, GetforgetValue)
            .then(() => {
                alert('Verification link sent!');
                forgetModal1.style.display = 'none';
                document.body.classList.remove('modal-open');
                forgetEmail.value = ""; 
            })
            .catch((error) => {
                // Firebase error handling
                if (error.code === 'auth/user-not-found') {
                    errorDiv.innerText = 'No account found with this email.';
                } else if (error.code === 'auth/invalid-email') {
                    errorDiv.innerText = 'Invalid email format.';
                } else {
                    errorDiv.innerText = 'Error: ' + error.message;
                }
            });
    }
};

// Clear error on typing again
forgetEmail.addEventListener('input', () => {
    document.querySelector('.invalid-forget-email').innerText = '';
});