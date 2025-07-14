const Username = document.getElementById('username');
const UserPassword = document.getElementById('password');


function CheckValidationsForLogin() {
    const GetUserName = Username.value.trim();
    const GetUserPassword = UserPassword.value.trim();

    let isValidLoginInput = true;

    document.querySelector('.username-error').innerText = '';
    document.querySelector('.password-error').innerText = '';

    // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,16}$/;

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
        alert('Logged in');
        document.getElementById('form-1').reset();
        document.getElementById('radio-form').reset();

    }

}
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

closeIcon1.addEventListener('click', () => {
    forgetModal1.style.display = 'none';
    document.body.classList.remove('modal-open');
});

function showForgetModal() {
    document.getElementById('forget-modal-1').style.display = 'flex';
    document.body.classList.add('modal-open'); // disables page scroll
}



function CheckForgetValidation() {
    const emailRegex = /^[\w.-]+@[a-zA-Z_-]+?\.[a-zA-Z]{2,3}$/;

    const GetforgetValue = forgetEmail.value.trim();

    let isValidForgetEmail = true;

    document.querySelector('.invalid-forget-email').innerText = ''

    if (GetforgetValue === "") {
        document.querySelector('.invalid-forget-email').innerText = 'Email require';
        isValidForgetEmail = false;
    }
    else if (!emailRegex.test(GetforgetValue)) {
        document.querySelector('.invalid-forget-email').innerText = 'Invalid email';
        isValidForgetEmail = false;

    }

    if (isValidForgetEmail) {
        alert('Verification Link Sent!');
        forgetModal.style.display = 'none';
        document.body.classList.remove('modal-open');
    }
}

forgetEmail.addEventListener('input', () => {
    document.querySelector('.invalid-forget-email').innerText = '';
})