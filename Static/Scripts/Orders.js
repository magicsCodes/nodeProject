async function showOrders() {
    let user = JSON.parse(sessionStorage.getItem("user"));
    try {
        const response = await fetch("/api/user/" + user._id)
        if (response.ok) {
            alert("success to load your orders")
            const data = await response.json()
            console.log(data.message)
        }
        else {
            throw new Error("status cod is :" + " " + response.status+" Error is: "+ data.message)
        }
    } catch (err) {
        alert(err)
    }
}

window.addEventListener('load', (event) => {
   showOrders();
  });

