const getUsers = async () => {
    const result = await fetch("https://win23.azurewebsites.net/api/users")
    const users = await result.json()

    for (let user of users) {

        console.log(user)
        document.getElementById("result").innerHTML +=
        `
            <div>
                <div>${user.firstName} ${user.lastName}</div>
                <div>${user.email}</div>
                
            </div>
        `
    }

    document.getElementById("result").innerHTML +=
    `
        <div>d</div>
    `
}


getUsers()
