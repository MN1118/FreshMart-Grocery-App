function getCart() {
    return JSON.parse(localStorage.getItem("cart") || "[]");
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

function updateCartCount() {
    let countBox = document.getElementById("cartCount");
    if (countBox) {
        countBox.innerText = getCart().length;
    }
}

function changeQty(id, qty) {
    let cart = getCart();
    let item = cart.find(p => p.product_id === id);

    if (item) {
        item.quantity = Math.max(1, parseInt(qty) || 1);
        saveCart(cart);
    }
}

function removeItem(id) {
    let cart = getCart().filter(p => p.product_id !== id);
    saveCart(cart);
}

function clearCart() {
    localStorage.removeItem("cart");
    renderCart();
}

function renderCart() {
    let cart = getCart();
    let box = document.getElementById("cartItems");
    let total = 0;

    updateCartCount();

    if (cart.length === 0) {
        box.innerHTML = `
            <div class="cart-item">
                <h3>Your cart is empty</h3>
                <p>Please add products from home page.</p>
                <br>
                <a class="btn" href="/">Start Shopping</a>
            </div>
        `;
        document.getElementById("cartTotal").innerText = "";
        return;
    }

    box.innerHTML = "";

    cart.forEach(item => {
        total += Number(item.price) * item.quantity;

        let image = item.image_url || "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600";

        box.innerHTML += `
            <div class="cart-item" style="display:grid;grid-template-columns:120px 1fr auto;gap:20px;align-items:center;">

                <img src="${image}" 
                     alt="${item.name}" 
                     style="width:120px;height:100px;object-fit:cover;border-radius:14px;"
                     onerror="this.src='https://images.unsplash.com/photo-1542838132-92c53300491e?w=600'">

                <div>
                    <h3>${item.name}</h3>
                    <p>${item.description || ""}</p>
                    <h3 class="price">Rs. ${item.price}</h3>

                    <label>Quantity</label>
                    <input 
                        type="number" 
                        min="1" 
                        value="${item.quantity}" 
                        onchange="changeQty(${item.product_id}, this.value)"
                        style="max-width:100px;">
                </div>

                <div>
                    <button onclick="removeItem(${item.product_id})">
                        Remove
                    </button>
                </div>

            </div>
        `;
    });

    document.getElementById("cartTotal").innerText = "Total: Rs. " + total;
}

renderCart();