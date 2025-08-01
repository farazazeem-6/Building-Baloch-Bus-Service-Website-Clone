const Name = document.getElementById('name');
const Email = document.getElementById('email');
const Subject = document.getElementById('subject');
const PhoneNumber = document.getElementById('phonenumber');
const Message = document.getElementById('message');

function CheckValidtionsOfContactForm() {
    const GetName = Name.value.trim();
    const GetEmail = Email.value.trim();
    const GetSubject = Subject.value.trim();
    const GetPhoneNumber = PhoneNumber.value.trim();
    const GetMessage = Message.value.trim();

    let isValidContactsInput = true;

    document.querySelector('.contact-name-error').innerText = '';
    document.querySelector('.email-error').innerText = '';
    document.querySelector('.subject-error').innerText = '';
    document.querySelector('.phone-num-error').innerText = '';
    document.querySelector('.message-error').innerText = '';


    const nameRegex = /^[A-Za-z\s]+$/;
    const numberRegex = /^\d+$/;
    const alphaNumericOnly = /^[A-Za-z0-9]+$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const subjectRegex = /^[A-Za-z0-9 ,.'"-]{3,100}$/;
    const pkPhoneRegex = /^03\d{9}$/;
    const messageRegex = /^[A-Za-z0-9 @#&(),.?!'"%\-_\n]{5,1000}$/;




    if (GetName === "") {
        document.querySelector('.contact-name-error').innerText = 'Name required';
        isValidContactsInput = false;
    } else if (!nameRegex.test(GetName)) {
        document.querySelector('.contact-name-error').innerText = 'Invalid Name';
        isValidContactsInput = false;
    } else if (GetName.length < 3) {
        document.querySelector('.contact-name-error').innerText = 'Too short name';
        isValidContactsInput = false;
    } else if (GetName.length > 15) {
        document.querySelector('.contact-name-error').innerText = 'Too long name';
        isValidContactsInput = false;
    }




    if (GetEmail === "") {
        document.querySelector('.email-error').innerText = 'Email required';
        isValidContactsInput = false;

    }
    if (!emailRegex.test(GetEmail)) {
        document.querySelector('.email-error').innerText = 'Invalid email';
        isValidContactsInput = false;
    }


    if (GetSubject === "") {
        document.querySelector('.subject-error').innerText = 'Subject required';
        isValidContactsInput = false;
    }
    if (!subjectRegex.test(GetSubject)) {
        document.querySelector('.subject-error').innerText = 'Invalid subject(only characters)';
        isValidContactsInput = false;
    }

    if (GetPhoneNumber === "") {
        document.querySelector('.phone-num-error').innerText = 'Phone number required';
        isValidContactsInput = false;
    }

    if (!pkPhoneRegex.test(GetPhoneNumber)) {
        document.querySelector('.phone-num-error').innerText = 'Invalid number';
        isValidContactsInput = false;
    }


    if (GetMessage === "") {
        document.querySelector('.message-error').innerText = 'Message required';
        isValidContactsInput = false;
    }
    if (!messageRegex.test(GetMessage)) {
        document.querySelector('.message-error').innerText = 'Only text allowed. Minimum 5 characters';
        isValidContactsInput = false;
    }


    if (isValidContactsInput) {
        // document.querySelector('.message-error').innerText = ' ✅ Message Sent!';
        alert('Message Sent!')
        document.getElementById('contactForm').reset();
        document.getElementById('messageForm').reset();
      

    }
}
Name.addEventListener('input', () => {
    document.querySelector('.contact-name-error').innerText = '';
});
Email.addEventListener('input', () => {
    document.querySelector('.email-error').innerText = '';
});
Subject.addEventListener('input', () => {
    document.querySelector('.subject-error').innerText = '';
});
PhoneNumber.addEventListener('input', () => {
    document.querySelector('.phone-num-error').innerText = '';
});
Message.addEventListener('input', () => {
    document.querySelector('.message-error').innerText = '';
});