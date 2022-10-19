// window.addEventListener("load", async (event) => {
//     onLoad()
// })

function onLoad() {
    showCounterAndSum()
    drewSelecteditems()
}
function showCounterAndSum() {
    document.getElementById("itemCount").innerText = sessionStorage.getItem("counter")
    document.getElementById("totalAmount").innerText = calculateTotalAmount()
}

function calculateTotalAmount(){
    let totalAmount = 0
    const products = JSON.parse(sessionStorage.getItem("cards"))
    products.forEach(element=>{
        totalAmount+=parseInt(element.product.price) * parseInt(element.count)
    })
    globalSum=totalAmount;
    return totalAmount
}
function drewSelecteditems() {
    const prodTemplate = document.getElementById("temp-row");
    const productsList = document.querySelector("tbody")
    const products = JSON.parse(sessionStorage.getItem("cards"))
    products.forEach(element => {
        const newProdTemp = prodTemplate.content.cloneNode(true);
        newProdTemp.querySelector(".image").src = "./Images/" + element.product.imageURL + ".jpg";
        newProdTemp.querySelector(".itemName").innerText = element.product.name;
        newProdTemp.querySelector(".count").innerText = element.count;
        const totalPrice = parseInt(element.product.price) * parseInt(element.count)
        newProdTemp.querySelector(".price").innerText = totalPrice.toString() + " " + "שקל";
        newProdTemp.querySelector(".itemNumber").innerText = parseInt(element.product._id);
        newProdTemp.querySelector(".Hide").addEventListener("click", (e) => {
            deleteItemFromShoppingBag(element, products)
        });
        productsList.appendChild(newProdTemp)
    });
}

function deleteItemFromShoppingBag(element, products) {
    const productsList = document.querySelector("tbody")
    if (element.count > 1) {
        element.count -= 1
    }
    else {
        const index = products.indexOf(element)
        if (index > -1) {
            products.splice(index, 1);
        }
    }
    sessionStorage.setItem("cards", JSON.stringify(products))
    let counter = parseInt(sessionStorage.getItem("counter"))
    counter--
    sessionStorage.setItem("counter", counter)
    sessionStorage.setItem("cards", JSON.stringify(products))
    productsList.innerHTML = ""
    onLoad()
}


async function placeOrder() {
    const products = JSON.parse(sessionStorage.getItem("cards"))
    const user = JSON.parse(sessionStorage.getItem("user"))
    const sum = calculateTotalAmount()
    let productObjects = []
    products.forEach((element) => {
        let productObj = {
            prod_id: element.product._id,
            quntity: element.count
        }
        productObjects.push(productObj)
    })
    let orderObj = {
        userId: user._id,
        date: new Date(),
        sum: sum,
        products: productObjects
    }
    try {
        const response = await fetch("/api/order/", {
            method: 'POST',
            headers: { 'content-Type': 'application/json; charset=utf-8' },
            body: JSON.stringify(orderObj),
        })
        if (response.ok) {
            cleanOrderDetails()
            alert("The order was successfully placed")
            window.location.href = "Products.html"
        }
        else {
            const data = await response.json();
            console.log(JSON.stringify(data.message));
            throw new Error("Status Code is: " + " " + response.status+" error is: "+data.message);
        }
    } catch (err) {
        alert(err)
    }
}

function cleanOrderDetails() {
    sessionStorage.removeItem("cards")
    sessionStorage.removeItem("counter")
}




