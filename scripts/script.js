async function handleForm(event) {
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

        const res = await fetch('https://win23.azurewebsites.net/api/users', {
            method: "post",
            headers: {
                "Content-type": "application/json",
            },
            body: json
        })

        let data 
        if (res.status === 201) {
            data = await res.json()
            document.getElementById('statusMessages').innerHTML =`
            <div class="alert alert-success" role="alert">
                Snyggt där!<i class="fa-light fa-thumbs-up"></i>
            </div>`
            console.log(data)
        }
        else  {
            data = await res.text()
            document.getElementById('statusMessages').innerHTML =`
            <div class="alert alert-warning" role="alert">
                ${data}
            </div>`
            console.log(data)
        }

        
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
    if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/.test(value)) {
        return true
    }
    return false
}