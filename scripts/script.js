function handleForm(event) {
    event.preventDefault()

    let errors = []

    for ( let i= 0; i < event.target.length; i++ ) {
        if (event.target[i].required) {
            errors.push(validate(event.target[i]))
        }
    }

    console.log(errors)

    if (errors.includes(false)) {
        console.log("innehåller fel")
    }
    else {
        console.log("skicka iväg informationen")

    }

}

function validate(element) {
    let result = false
    const errorMessage = {
        firstName: "You must enter a valid first name",
        lastName: "You must enter a valid last name",
        email: "You must enter a valid e-mail",
        password: "You must enter a valid password",
        confirmPassword: "Your passwords don't match",
    }

    switch(element.type) {
        case 'text':
            result = nameValidator(element.value)
            break;
        case 'email':
            result = emailValidator(element.value)
            break;
        case 'password':
            result = passwordValidator(element.value)
            break;
    }

    if (result) {
        document.getElementById(`${element.id}`).classList.remove('error')
        document.getElementById(`${element.id}-error`).innerText = ''
    }
    else {
        document.getElementById(`${element.id}`).classList.add('error')
        document.getElementById(`${element.id}-error`).innerText = errorMessage[element.id]
    }

    return result
}


// text and name validator
const nameValidator = (value) => {
    if (/^[a-zA-Z-'\s].{1,}$/.test(value)) {
        return true
    }
    return false
}

// email validator
const emailValidator = (value) => {
    if (/^\w+([\.-]?w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/.test(value)) {
        return true
    }    
    return false
}

// password validator
const passwordValidator = (value) => {
    if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{12,}$/.test(value)) {
        return true
    }
    return false
}