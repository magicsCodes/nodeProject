
var bottonsClick = []

window.addEventListener("load", async (event) => {
    if (sessionStorage.getItem("cards") != null) {
        document.getElementById("ItemsCountText").innerText = sessionStorage.getItem("counter")
    }
    else {
        document.getElementById("ItemsCountText").innerText = 0;
    }
    const dataProducts = await getProducts();
    await getCategories(dataProducts);
})


//products
function drawProduct(data) {
    document.getElementById("counter").innerText = data.length;
    const cardTemplate = document.getElementById("temp-card");
    const productList = document.getElementById("PoductList")
    data.forEach(element => {
        const newCardTemp = cardTemplate.content.cloneNode(true);
        newCardTemp.querySelector("img").src = "./Images/" + element.imageURL + ".jpg";
        newCardTemp.querySelector(".name").innerText = element.name;
        newCardTemp.querySelector(".price").innerText = element.price + " " + "שקל";
        newCardTemp.querySelector(".description").innerText = element.description;

        newCardTemp.querySelector("button").addEventListener("click", (e) => {
            addToShoppingBag(element)
            updateCounter()
        });
        const cardDiv = newCardTemp.querySelector(".card")
        var newInput = document.createElement("INPUT");
        newInput.setAttribute("type", "hidden");
        newInput.setAttribute("value", element.categoryId);
        newInput.setAttribute("id", "elementId");
        cardDiv.appendChild(newInput)
        productList.appendChild(newCardTemp)
    });
}


async function getProducts() {
    try {
        const response = await fetch("/api/product/");
        const data = await response.json();
        if (response.ok) {
            console.log("success to get products")
            drawProduct(data.message)
            return data.message;
        }
        else {
            throw new Error("Status Code is: " + " " + response.status+" error is: "+data.message);
        }
    } catch (err) {
        alert(Error);
        return [];
    }
}

//category
function drawCategories(data, dataProducts) {
    var dict = new Object();
    amountOfEachCategory(dict, dataProducts);
    const categoryTenplate = document.getElementById('temp-category')
    const categoryElement = document.getElementById("filters")
    let i = 0;
    data.forEach(element => {
        const newCategoryTemplate = categoryTenplate.content.cloneNode(true);
        newCategoryTemplate.querySelector(".OptionName").innerText = element.name
        newCategoryTemplate.querySelector(".Count").innerText = dict[element._id]
        newCategoryTemplate.querySelector(".opt").setAttribute("id", i);
        i++;
        let botton = newCategoryTemplate.querySelector(".opt")
        botton.addEventListener("change", (e) => {
            const productList = document.getElementById("PoductList")
            cardsList = productList.children;
            if (e.target.checked) {
                bottonsClick[botton.id] = element._id
            }
            else {
                bottonsClick[botton.id] = 0
            }
            filterElements(dict, cardsList)
        })
        categoryElement.appendChild(newCategoryTemplate)
    })

}

async function getCategories(dataProducts) {
    try {

        const response = await fetch("/api/category/");
        const data = await response.json();
        if (response.ok) {
            console.log("sucsess to get categories")
            bottonsClick = new Array(data.message.length).fill(0);
            drawCategories(data.message, dataProducts);
            return data.message;
        }
        else {
            throw new Error("Status Code is: " + " " + response.status+" error is: "+data.message);
        }
    }
    catch (err) {
        alert(err);
        return [];
    }
}


function addToShoppingBag(element) {
    let cards = [];
    if (!sessionStorage.getItem("cards")) {
        sessionStorage.setItem("cards", JSON.stringify(cards))
    }
    let tempCards = JSON.parse(sessionStorage.getItem("cards"))
    const res = tempCards.find(obj => obj.product._id == element._id)
    if (res != undefined) {
        res.count++;
        sessionStorage.setItem("cards", JSON.stringify(tempCards))
    }
    else {
        let obj = {
            product: element,
            count: 1
        }
        tempCards.push(obj)
        sessionStorage.setItem("cards", JSON.stringify(tempCards))
    }
    alert("The product has been successfully added")

}


function filterElements(dict, cardsList) {
    numberOfElementsFiltered = countNunberOfElementsShow(dict)
    if (numberOfElementsFiltered != 0) {
        for (let i = 0; i < cardsList.length; i++) {
            const cardItem = cardsList.item(i)
            const cardId = cardItem.querySelector("INPUT").value;
            let isEqual=checkIfIdsEqual(cardId)
            if (!isEqual) {
                cardItem.style.display = "none"
            }
            else{
                if(cardItem.style.display = "none"){
                    cardItem.style.display = ""
                }
            }
        }
        document.getElementById("counter").innerText = numberOfElementsFiltered;
    }
    else{
        showAllElements(cardsList)
    }
}

function checkIfIdsEqual(cardId){
    for (let j = 0; j < bottonsClick.length; j++) {
        if(bottonsClick[j] == cardId){
            return true
        } 
    }
    return false;
}

function showAllElements(cardsList) {
    document.getElementById("counter").innerText = cardsList.length;
    for (let i = 0; i < cardsList.length; i++) {
        const cardItem = cardsList.item(i)
        cardItem.style.display = ""
    }
}


function updateCounter() {
    let counter = document.getElementById("ItemsCountText").innerText;
    counter++
    document.getElementById("ItemsCountText").innerText = counter;
    if (sessionStorage.getItem("counter")) {
        sessionStorage.setItem("counter", counter)
    }
    else {
        sessionStorage.setItem("counter", 1)
    }
}

function amountOfEachCategory(dict, dataProducts) {
    dataProducts.forEach(e => {
        if (dict.hasOwnProperty(e.categoryId)) {
            dict[e.categoryId]++;
        }
        else {
            dict[e.categoryId] = 1
        }
    })
}


function countNunberOfElementsShow(dict) {
    let counter = 0
    bottonsClick.forEach(element => {
        if (element != 0) {
            counter = counter + dict[element]
        }
    })
    return counter
}
