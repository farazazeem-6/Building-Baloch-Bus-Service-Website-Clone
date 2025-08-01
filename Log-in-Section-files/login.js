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

closeIcon1.addEventListener('click', () => {
    forgetModal1.style.display = 'none';
    document.body.classList.remove('modal-open');
});

function showForgetModal() {
    document.getElementById('forget-modal-1').style.display = 'flex';
    document.body.classList.add('modal-open');
}
