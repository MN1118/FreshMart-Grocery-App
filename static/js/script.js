function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    let countBox = document.getElementById("cartCount");

    if (countBox) {
        countBox.innerText = cart.length;
    }
}

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");

    let found = cart.find(item => item.product_id === product.product_id);

    if (found) {
        found.quantity += 1;
    } else {
        product.quantity = 1;
        cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();

    alert(product.name + " added to cart");
}

fetch("/api/products")
    .then(res => res.json())
    .then(products => {
        let box = document.getElementById("products");
        box.innerHTML = "";

        products.forEach(p => {
            let image = p.image_url;

            if (!image || image.trim() === "") {
                image = "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600";
            }

            box.innerHTML += `
                <div class="product-card">
                    <img src="${image}" alt="${p.name}"
                    onerror="this.src='https://images.unsplash.com/photo-1542838132-92c53300491e?w=600'">

                    <div>
                        <h3>${p.name}</h3>
                        <p>${p.description}</p>

                        <div class="price">Rs. ${p.price}</div>

                        <button onclick='addToCart(${JSON.stringify(p)})'>
                            Add to Cart
                        </button>
                    </div>
                </div>
            `;
        });

        updateCartCount();
    })
    .catch(() => {
        document.getElementById("products").innerHTML =
            "<p>Unable to load products. Check Flask API and database.</p>";
    });

updateCartCount();