const getUsers = async () => {
    try {
        const result = await fetch("https://win23.azurewebsites.net/api/users")
        const users = await result.json()

        return users
    }
    catch (error) {
        console.error('couldnt print data')
    }
}

const getUser = async (id) => {
    try {
        const result = await fetch(`https://win23.azurewebsites.net/api/users/${id}`)
        const user = await result.json()

        return user
    }
    catch (error) {
        console.error('couldnt print profile data')
    }
}

const displayUsers = async () => {
    const users = await getUsers()

    for (let user of users) {

        console.log(user)
        document.getElementById("result").innerHTML +=
            `
            <div>
                <a href="profile.html?id=${user.id}" class="list-group-item list-group-item-action py-3">
                    <div><strong>${user.firstName} ${user.lastName}</strong></div>
                    <div><small>${user.email}</small></div>
                </a>                
            </div>
        `
    }
}

const displayUser = async () => {
    const params = new URLSearchParams(window.location.search)
    const id = params.get('id')
    const user = await getUser(id)
 
    document.getElementById("profile-result").innerHTML =
            `
                <div>
                        <div class="mb-3">
                            <div>Id</div>               
                            <div class="text-muted">${user.id}</div>                  
                        </div>                            
                        <div class="mb-3">
                            <div>Name</div>               
                            <div>${user.firstName} ${user.lastName}</div>               
                        </div>               
                        <div class="mb-3">
                            <div>E-mail</div>               
                            <div>${user.email}</div>               
                        </div>
                        
                        <div>
                            <button onclick="deleteUser('${id}')" class="btn btn-danger me-2">DELETE</button>
                            <a href="edit.html?id=${id}" class="btn btn-warning">EDIT</a>
                        </div>
                </div>
            `
            console.log(id)
}

const displayEditUser = async () => {
    const params = new URLSearchParams(window.location.search)
    const id = params.get('id')
    
    const user = await getUser(id)
   
    
    document.getElementById("id").value = user.id
    document.getElementById("firstName").value = user.firstName
    document.getElementById("lastName").value = user.lastName
    document.getElementById("email").value = user.email
}

const handleEdit = async (event) => {
    event.preventDefault()
    const id = event.target['id'].value
   
    try {
        const json  = JSON.stringify({
            firstName: event.target['firstName'].value,
            lastName: event.target['lastName'].value,
            email: event.target['email'].value,
            password: event.target['password'].value,
            confirmPassword: event.target['confirmPassword'].value,
            streetName: event.target['streetName'].value,
            postalCode: event.target['postalCode'].value,
            city: event.target['city'].value
        })

    
        const result = await fetch(`https://win23.azurewebsites.net/api/users/${id}`, {
            method: "put",
            headers: {
                "Content-type": "application/json",
            },
            body: json
        })
        const user = await result.json
        window.location.replace(`profile.html?id=${id}`)

        
        console.log(result.status)
        console.log(result)
    }
    catch (error) {
    console.error(error)
    }
}

const deleteUser = async (id) => {
    const result = await fetch(`https://win23.azurewebsites.net/api/users/${id}`, {
            method: "delete",
    })

    if (result.status === 204)
        window.location.replace('formget.html')
}

