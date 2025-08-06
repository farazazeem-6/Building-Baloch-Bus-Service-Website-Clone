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
const ForgetBtn = document.querySelector('.forgot-password');
const googleBtn = document.querySelector('#google-btn');
const phoneBtn = document.querySelector('#phone-login');
const phoneDiv = document.querySelector('.phoneModal-overlay');
const closeIcon2 = document.querySelector('.close-phonebtn');

phoneBtn.addEventListener('click', (e) => {
    e.preventDefault()
    phoneDiv.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    

});
closeIcon2.addEventListener('click', () => {
    phoneDiv.style.display = 'none';
    document.body.style.overflow = 'auto';
})

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
    sendPasswordResetEmail,
    signInWithPopup,
    GoogleAuthProvider,
    FacebookAuthProvider,
    GithubAuthProvider

} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";


const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const fbProvider = new FacebookAuthProvider();
const Gitprovider = new GithubAuthProvider();


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


// Login With Google JS:

window.loginWithGoogle = function () {
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            // console.log("Google login successful:", user);
            // Save user info in localStorage
            localStorage.setItem("user", JSON.stringify({
                name: user.displayName,
                email: user.email,
                photo: user.photoURL,
                uid: user.uid
            }));

            // alert("Welcome, " + user.displayName);
            window.location.href = "/Home-Section-files/index.html";
        })
        .catch((error) => {
            // console.error("Google login failed:", error);
            // document.querySelector('.username-error').innerText = 'Google login failed:';
            alert("Login failed: " + error.message);
        });
};


// Log in with FaceBook:


window.loginWithFacebook = function () {
    console.log("Triggering Facebook login");
    signInWithPopup(auth, fbProvider)
        .then((result) => {
            const user = result.user;
            console.log(" Facebook login successful:", user);
            // alert(`Welcome, ${user.displayName}`);
            window.location.href = "/Home-Section-files/index.html";

            // Optional: store user info
            localStorage.setItem("user", JSON.stringify({
                name: user.displayName,
                email: user.email,
                photo: user.photoURL,
                uid: user.uid
            }));
        })
        .catch((error) => {
            console.error("Facebook login failed:", error);
            // document.querySelector('.username-error').innerText = 'Facebook login failed:';
            alert(`Login failed: ${error.message}`);
        });
};

// Login in with GitHub:

document.getElementById("github-login").addEventListener("click", () => {
    signInWithPopup(auth, Gitprovider)
        .then((result) => {
            const user = result.user;
            console.log("GitHub login successful:", user);

            // Save user info in localStorage
            localStorage.setItem("user", JSON.stringify({
                name: user.displayName,
                email: user.email,
                photo: user.photoURL,
                uid: user.uid
            }));

            // alert("Login successful! Welcome " + user.displayName);
            window.location.href = "/Home-Section-files/index.html";
        })
        .catch((error) => {
            console.error("GitHub login failed:", error);
            // document.querySelector('.username-error').innerText = 'Github login failed:';
            alert("Login failed: " + error.message);
        });
});
forgetEmail.addEventListener('input', () => {
    document.querySelector('.invalid-forget-email').innerText = '';
});