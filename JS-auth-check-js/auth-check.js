
import { app } from "/JS-firebase-config-js/JSfirebase-config.js"; // Adjust path as needed if using modular Firebase
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";


const auth = getAuth(app);
const db = getFirestore(app);

onAuthStateChanged(auth, async (user) => {
    const dropdown = document.querySelector(".custom-dropdown");
    const loginSignupBtn = document.querySelector("#loginSignup-li");

    if (!dropdown || !loginSignupBtn) return;

    if (user) {
        dropdown.style.display = "block";
        loginSignupBtn.style.display = "none";

        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
            const userData = userDoc.data();
            document.getElementById("customDropdownBtn").innerHTML =
                `<span><i class="fa-solid fa-user"></i></span> ${userData.firstName} ${userData.lastName} ▾`;

            localStorage.setItem('first-name', userData.firstName);
            localStorage.setItem('last-name', userData.lastName);
            localStorage.setItem('email', userData.email);
            localStorage.setItem('phone', userData.phone);
            localStorage.setItem('cnic', userData.cnic);
            localStorage.setItem('gender', userData.gender);

        }
    } else {
        dropdown.style.display = "none";
        loginSignupBtn.style.display = "block";
    }
});

// Logout button functionality
document.addEventListener("DOMContentLoaded", () => {
    const logoutBtn = document.querySelector('#log-out');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            signOut(auth).then(() => {
                alert("Logged out!");
                window.location.href = "/Home-Section-files/index.html";
            });
        });
    }
});
