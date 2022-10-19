async function login() {
    let email = document.getElementById("SignEmail").value;
    let password = document.getElementById("SignPassword").value;
    try {
        const response = await fetch("/api/user/" + email + "/" + password);

        if (!response.ok) {
            const data = await response.json()
            throw new Error("Status Code is: " + " " + response.status + " Error is :" + data.message);
        }

        const data = await response.json()
        if (!data.success) {
            alert(data.message)
            return;
        }

        if (data.message==null) {
            alert("user isn't find try again! status code is 204")
            return;
        }
        
        console.log(data)
        window.location.href = "HelloPage.html?firstName=" + data.message.firstName + "?lastName+" + data.message.lastName
        sessionStorage.setItem("user", JSON.stringify(data.message))

    } catch (err) {
        alert(err)
    }
}

function creatNewUser() {
    document.getElementById("newUserDiv").style.display = "block";
}

async function Save() {
    let user = {
        firstName: document.getElementById("SaveFirstName").value,
        lastName: document.getElementById("SaveLastName").value,
        password: document.getElementById("SavePassword").value,
        email: document.getElementById("SaveEmail").value,
        address: []
    };
    try {
        const response = await fetch("/api/user/", {
            method: 'POST',
            headers: { 'content-Type': 'application/json; charset=utf-8' },
            body: JSON.stringify(user),
        })
        if (response.ok) {
            alert("You have successfully registered")
        }
        else {
            const data = await response.json()
            console.log(JSON.stringify(data.message));
            throw new Error("Status Code is: " + " " + response.status + " Error is :" + data.message);
        }
    } catch (err) {
        alert(err)
    }

}

function UpdateUser() {
    document.getElementById("updateUserDiv").style.display = "block";
}

async function updateDetailes() {
    let oldUser = JSON.parse(sessionStorage.getItem("user"));
    console.log(oldUser._id)
    let user = {
        firstName: document.getElementById("UpdateFirstName").value,
        lastName: document.getElementById("UpdateLastName").value,
        password: document.getElementById("UpdatePassword").value,
        email: document.getElementById("UpdateEmail").value,
        address: []
    };
    try {
        const response = await fetch("api/user/" + oldUser._id, {
            headers: { 'content-Type': 'application/json; charset=utf-8' },
            method: 'PUT',
            body: JSON.stringify(user),
        })
        const data = await response.json()
        if (response.ok) {
            alert("The changes were successfully saved")
            sessionStorage.setItem("user", JSON.stringify(data.message))
            window.location.href = "HelloPage.html"
        }
        else {
            console.log(JSON.stringify(data.message));
            throw new Error("Status Code is: " + " " + response.status + " error is: " + data.message);
        }
    } catch (err) {
        alert(err)
    }
}

function loadDetails() {
    let user = JSON.parse(sessionStorage.getItem("user"));
    document.getElementById("UpdateFirstName").value = user.firstName
    document.getElementById("UpdateLastName").value = user.lastName
    document.getElementById("UpdateEmail").value = user.email
    document.getElementById("UpdatePassword").value = user.password
}
