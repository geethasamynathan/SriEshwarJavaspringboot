let products = [];


/*
-----------------------------------------
LOAD PRODUCTS FROM SPRING BOOT
-----------------------------------------
*/

async function loadProducts() {

    const response =
        await fetch("http://localhost:8080/api/products");

    products =
        await response.json();

    displayProducts(products);
}


/*
-----------------------------------------
DISPLAY PRODUCTS
-----------------------------------------
*/

function displayProducts(productList) {

    const container =
        document.getElementById("products");

    container.innerHTML = "";

    productList.forEach(product => {

        const card =
            document.createElement("div");

        card.className =
            "product-card";


        const stockStatus =
            product.stockQuantity > 0
                ? `<p class="stock">
                    In Stock (${product.stockQuantity})
                   </p>`
                : `<p class="out-stock">
                    Out of Stock
                   </p>`;


        const disabled =
            product.stockQuantity === 0
                ? "disabled"
                : "";


        card.innerHTML = `

            <img
                src="${product.imageUrl}"
                alt="${product.name}">

            <h3>
                ${product.name}
            </h3>

            <p>
                ${product.category}
            </p>

            <p class="price">
                ₹${product.price}
            </p>

            ${stockStatus}

            <button
                ${disabled}
                onclick="addToCart(${product.id})">

                ${
                    product.stockQuantity === 0
                        ? "Out of Stock"
                        : "Add to Cart"
                }

            </button>

        `;

        container.appendChild(card);
    });
}


/*
-----------------------------------------
FILTER PRODUCTS
-----------------------------------------
*/

function filterProducts() {

    const searchValue =
        document
            .getElementById("search")
            .value
            .toLowerCase();


    const category =
        document
            .getElementById("category")
            .value;


    const stockFilter =
        document
            .getElementById("stockFilter")
            .value;


    const filtered =
        products.filter(product => {


            const matchesSearch =
                product.name
                    .toLowerCase()
                    .includes(searchValue);


            const matchesCategory =
                category === "all"
                ||
                product.category === category;


            let matchesStock = true;


            if (stockFilter === "in") {

                matchesStock =
                    product.stockQuantity > 0;
            }


            if (stockFilter === "out") {

                matchesStock =
                    product.stockQuantity === 0;
            }


            return (
                matchesSearch &&
                matchesCategory &&
                matchesStock
            );

        });


    displayProducts(filtered);
}


/*
-----------------------------------------
ADD PRODUCT TO CART
-----------------------------------------
*/

async function addToCart(productId) {

    const response =
        await fetch(
            `http://localhost:8080/api/cart/${productId}`,
            {
                method: "POST"
            }
        );


    if (!response.ok) {

        alert(
            "Unable to add product"
        );

        return;
    }


    await loadCart();

    alert(
        "Product added to cart"
    );
}


/*
-----------------------------------------
LOAD CART
-----------------------------------------
*/

async function loadCart() {

    const response =
        await fetch(" http://localhost:8080/api/cart");


    const cart =
        await response.json();


    const container =
        document.getElementById(
            "cart-items"
        );


    container.innerHTML = "";


    let total = 0;

    let totalQuantity = 0;


    cart.forEach(item => {


        const itemTotal =
            item.product.price *
            item.quantity;


        total += itemTotal;

        totalQuantity +=
            item.quantity;


        const div =
            document.createElement("div");


        div.className =
            "cart-item";


        div.innerHTML = `

            <div>

                <strong>
                    ${item.product.name}
                </strong>

                <br>

                ₹${item.product.price}
                ×
                ${item.quantity}

            </div>


            <div>

                ₹${itemTotal}

                <button
                    class="remove-button"
                    onclick="removeCartItem(${item.id})">

                    Remove

                </button>

            </div>

        `;


        container.appendChild(div);

    });


    document
        .getElementById(
            "cart-total"
        )
        .textContent =
            total.toFixed(2);


    document
        .getElementById(
            "cart-count"
        )
        .textContent =
            totalQuantity;
}


/*
-----------------------------------------
REMOVE CART ITEM
-----------------------------------------
*/

async function removeCartItem(
    cartItemId) {

    await fetch(
        ` http://localhost:8080/api/cart/${cartItemId}`,
        {
            method: "DELETE"
        }
    );


    loadCart();
}


/*
-----------------------------------------
CART DISPLAY
-----------------------------------------
*/

function toggleCart() {

    document
        .getElementById(
            "cart-section"
        )
        .scrollIntoView({
            behavior: "smooth"
        });
}


/*
-----------------------------------------
START APPLICATION
-----------------------------------------
*/

loadProducts();

loadCart();