function processInput(element, regexRequirement) {
    let requirement = regexRequirement.test(element.value);
    if (requirement) {
        element.classList.remove('invalid');
        element.classList.add('valid');
        return 1;
    } else {
        element.classList.remove('valid');
        element.classList.add('invalid');
        return 0;
    }
}

function checkPasswordMatching(password, confirmPassword) {
    let confirmPasswordDiv = document.querySelector('.confirm-password');
    if (password.value != confirmPassword.value) {
        if (!document.querySelector('.passwords-do-not-match-div')) {
            let errorDiv = document.createElement('div');
            errorDiv.classList.add('passwords-do-not-match-div', 'invalid');
            errorDiv.textContent = 'Passwords do not match';
            confirmPasswordDiv.appendChild(errorDiv);
        }
        confirmPassword.classList.remove('valid');
        confirmPassword.classList.add('invalid');
    } else if (document.querySelector('.passwords-do-not-match-div')) {
        confirmPasswordDiv.removeChild(document.querySelector('.passwords-do-not-match-div'));
        confirmPassword.classList.remove('invalid');
        confirmPassword.classList.add('valid');
    }
}

let requiredData = {
    firstName: document.querySelector("#first_name"),
    email: document.querySelector('#email'),
    password: document.querySelector('#password'),
    confirmPassword: document.querySelector('#confirm_password'),
};

let optionalData = {
    lastName: document.querySelector("#last_name"),
    phoneNumber: document.querySelector("#phone_number"),
};

for (let key in requiredData) {
    requiredData[key].classList.add('invalid');
}

for (let name of [requiredData.firstName, optionalData.lastName]) {
    name.addEventListener('keyup', () => {
        processInput(name, /^[a-zA-Zа-яА-Я]{2,}$/);
    });
}

requiredData.email.addEventListener('keyup', () => {
    let returnCode = processInput(requiredData.email, /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
    if (!returnCode) {
        if (!document.querySelector('.invalid-pattern-email')) {
            let errorDiv = document.createElement('div');
            errorDiv.classList.add('invalid-pattern-email', 'invalid');
            errorDiv.textContent = 'Invalid pattern';
            document.querySelector('.email').appendChild(errorDiv);
        }
    } else if (document.querySelector('.invalid-pattern-email')) {
        document.querySelector('.email').removeChild(document.querySelector('.invalid-pattern-email'));
    }
});

optionalData.phoneNumber.addEventListener('keyup', () => {
    let returnCode = processInput(optionalData.phoneNumber, /^[\+]?[0-9]{0,3}[-\s\.]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/);
    if (!returnCode) {
        if (!document.querySelector('.invalid-pattern-phone')) {
            let errorDiv = document.createElement('div');
            errorDiv.classList.add('invalid-pattern-phone', 'invalid');
            errorDiv.textContent = 'Invalid pattern';
            document.querySelector('.phone-number').appendChild(errorDiv);
        }
    } else if (document.querySelector('.invalid-pattern-phone')) {
        document.querySelector('.phone-number').removeChild(document.querySelector('.invalid-pattern-phone'));
    }
});

requiredData.password.addEventListener('keyup', () => {
    let pwd = requiredData.password;
    processInput(pwd, /[a-zA-Z0-9\-\!\@\#\$\%\^\&]{8,}/);
    if (pwd.value.length < 8) {
        if (!document.querySelector('.invalid-length-div')) {
            let errorDiv = document.createElement('div');
            errorDiv.classList.add('invalid-length-div', 'invalid');
            errorDiv.textContent = 'Password is too short';
            document.querySelector('.password').appendChild(errorDiv);
        }
    } else if (document.querySelector('.invalid-length-div')) {
        document.querySelector('.password').removeChild(document.querySelector('.invalid-length-div'));
    }
    checkPasswordMatching(requiredData.password, requiredData.confirmPassword);
});
requiredData.confirmPassword.addEventListener('keyup', () => {
    processInput(requiredData.confirmPassword, /[a-zA-Z0-9\-\!\@\#\$\%\^\&]{8,}/);
    checkPasswordMatching(requiredData.password, requiredData.confirmPassword);
});


let form = document.querySelector("#signup-form");
let submitButton = document.querySelector(".submit-button");
submitButton.addEventListener('click', () => {
    if (document.getElementsByClassName('invalid').length == 0) {
        form.submit();
        window.location.href = window.location.href;
    } 
})