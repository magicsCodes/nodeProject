
function writeTheUserName(){
    let user = JSON.parse(sessionStorage.getItem("user"))
    document.getElementById("hello").innerText="hello to "+user.firstName+" "+user.lastName
}

function update(){
    window.location.href = "updateUserPage.html"
}

function toStore(){
    window.location.href = "Products.html"
}

function toOrdersPage(){
    window.location.href="Orders.html"
}