const loadProductsBtn = document.getElementById("loadProductsBtn");
const productSelect = document.getElementById("productSelect");
const loadDetailsBtn = document.getElementById("loadDetailsBtn");
const productCard = document.getElementById("productCard");
let products = [];

loadProductsBtn.addEventListener("click", function() {
    // productSelect.innerHTML = '<option>Loading products...</option>';

    let xhr = new XMLHttpRequest();
    xhr.open("GET", "https://fakestoreapi.com/products");
    xhr.onload = function() {
        if (xhr.status === 200) {
            products = JSON.parse(xhr.responseText);
            productSelect.innerHTML = "";
            products.forEach(product => {
                let option = document.createElement("option");
                option.value = product.id;
                option.textContent = product.title;
                productSelect.appendChild(option);
            });
            productSelect.disabled = false;
            loadDetailsBtn.disabled = false;
        }
    };
    xhr.send();
});

loadDetailsBtn.addEventListener("click", function() {
    let productId = productSelect.value;
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `https://fakestoreapi.com/products/${productId}`);
    xhr.onload = function() {
        if (xhr.status === 200) {
            let product = JSON.parse(xhr.responseText);
            productCard.innerHTML = `
                <div class="card">
                    <img src="${product.image}" ">
                    <h3>${product.title}</h3>
                    <p>Price: $${product.price}</p>
                    <p>${product.description}</p>
                </div>
            `;
        }
    };
    xhr.send();
});
