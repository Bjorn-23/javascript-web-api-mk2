function handleForm(event) {
    event.preventDefault()

    let errors = []

    for ( let i= 0; i < event.target.length; i++ ) {
        if (event.target[i].required) {
            errors.push(validate(event.target[i]))
        }
    }

    // console.log(errors)

    if (!errors.includes(false)) {
        console.log("skicka iväg informationen")

        const json = JSON.stringify({
            firstName: event.target['firstName'].value,
            lastName: event.target['lastName'].value,
            email: event.target['email'].value,
            password: event.target['password'].value,
            confirmPassword: event.target['confirmPassword'].value,
            streetName: event.target['streetName'].value,
            postalCode: event.target['postalCode'].value,
            city: event.target['city'].value,
        })

        fetch('https://win23.azurewebsites.net/api/users', {
            method: "post",
            headers: {
                "Content-type": "application/json",
            },
            body: json
        })
        .then(res => {
            if (res.status === 201) {
                document.getElementById('statusMessages').innerHTML = `<div class="alert alert-success" role="alert">
                A simple success alert—check it out!
              </div>`
                return res.json()
            }
            else {
                document.getElementById('statusMessages').innerHTML = `<div class="alert alert-warning" role="alert">
                A simple warning alert—check it out!
              </div>`
              return res.text()
            }
        })  
        .then(data => {
            console.log(data)
            // localStorage.setItem("user", JSON.stringify(data))
        })
        

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