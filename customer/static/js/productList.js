const productList = document.querySelector('.products')

export const setupProducts = (data) => {
    if (data.length) {
        let html = ""
        data.forEach(doc => {
            const product = doc.data()
            const li = `
            <li class="list-group-item list-group-item-action list-group-item-dark>
                <h5>${product.nombre}</h5>
                <p>${product.precio}</p>
            </li>
            `
            html += li
        })
        productList.innerHTML = html
    } else {
        productList.innerHTML = '<h1>There are no products</h1>'
    }
}

export const setupPromos = (data) => {
    if(data == "true") {
        productList.innerHTML += "<h1>Here you'll see promotions</h1>"
    }
} 