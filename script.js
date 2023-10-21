function register(event) {
    event.preventDefault();

    for (let element of event.target.elements) {
        if (element.required) {
            validateFormField(element);
        }
    }
}

function validateFormField(element) {
    const errorMessages = {
        firstName_required: "Du måste ange ett förnamn",
        firstName_invalid: "Du måste ange ett giltigt förnamn",
        lastName_required: "Du måste ange ett efternamn",
        lastName_invalid: "Du måste ange ett giltigt efternamn",
        email_required: "Du måste ange en e-postadress",
        email_invalid: "Du måste ange en giltig e-postadress",
        password_required: "Du måste ange ett lösenord",
        password_invalid: "Du måste ange ett giltigt lösenord",
        confirmPassword_required: "Du måste bekräfta lösenord",
        confirmPassword_invalid: "Du måste bekräfta lösenord",
    };

    if (!validateLength(element.value, 1)) {
        setFieldError(element, errorMessages[`${element.id}_required`]);
    } else {
        let result = false

        switch (element.type) {
            case 'text':
                result = validateLength(element.value);
                break;
            case 'email':
                result = validateEmail(element.value);
                break;
            case 'password':
                result = validatePassword(element);
                break;
        }

        if (!result) {
            setFieldError(element, errorMessages[`${element.id}_invalid`]);
        } else {
            clearFieldError(element);
        }
    }
}

function setFieldError(element, message) {
    document.getElementById(element.id).classList.add('error');
    document.getElementById(`${element.id}-error`).innerHTML = message;
}

function clearFieldError(element) {
    document.getElementById(element.id).classList.remove('error');
    document.getElementById(`${element.id}-error`).innerHTML = "";
}

function validateLength(value, minLength = 2) {
    return value.length >= minLength;
}

function validateEmail(value) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
}

function validatePassword(element) {
    if (element.getAttribute('data-comparewith') !== null) {
        return compareValues(element);
    }

    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{4,15}$/.test(element.value);
}

function compareValues(element) {
    let compareElement = document.getElementById(element.getAttribute('data-comparewith'));
    return element.value === compareElement.value;
}
