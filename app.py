from flask import Flask, render_template, request, redirect, url_for, jsonify
import psycopg2
import json

app = Flask(__name__)

def get_connection():
    return psycopg2.connect(
        host="localhost",
        database="ecommerce_db",
        user="postgres",
        password="admin",
        port="5432"
    )

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/cart")
def cart():
    return render_template("cart.html")

@app.route("/checkout")
def checkout():
    return render_template("checkout.html")

@app.route("/api/products")
def api_products():
    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT product_id, name, description, price, image_url
        FROM products
        ORDER BY product_id
    """)

    rows = cur.fetchall()

    cur.close()
    conn.close()

    products = []

    for row in rows:
        products.append({
            "product_id": row[0],
            "name": row[1],
            "description": row[2],
            "price": float(row[3]),
            "image_url": row[4]
        })

    return jsonify(products)

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        email = request.form["email"]
        password = request.form["password"]

        conn = get_connection()
        cur = conn.cursor()

        cur.execute(
            "SELECT * FROM users WHERE email=%s AND password=%s",
            (email, password)
        )

        user = cur.fetchone()

        cur.close()
        conn.close()

        if user:
            return redirect(url_for("home"))
        else:
            return "Invalid Email or Password"

    return render_template("login.html")

@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        full_name = request.form["full_name"]
        email = request.form["email"]
        password = request.form["password"]

        conn = get_connection()
        cur = conn.cursor()

        cur.execute(
            """
            INSERT INTO users(full_name,email,password)
            VALUES(%s,%s,%s)
            """,
            (full_name, email, password)
        )

        conn.commit()
        cur.close()
        conn.close()

        return redirect(url_for("login"))

    return render_template("register.html")

@app.route("/place_order", methods=["POST"])
def place_order():
    customer_name = request.form["customer_name"]
    email = request.form["email"]
    address = request.form["address"]
    cart_data = request.form.get("cart_data", "[]")

    cart = json.loads(cart_data)

    total = 0
    for item in cart:
        total += float(item["price"]) * int(item["quantity"])

    conn = get_connection()
    cur = conn.cursor()

    cur.execute(
        """
        INSERT INTO orders(customer_name,email,address,total_amount)
        VALUES(%s,%s,%s,%s)
        RETURNING order_id
        """,
        (customer_name, email, address, total)
    )

    order_id = cur.fetchone()[0]

    for item in cart:
        cur.execute(
            """
            INSERT INTO order_items(order_id,product_id,quantity,price)
            VALUES(%s,%s,%s,%s)
            """,
            (
                order_id,
                item["product_id"],
                item["quantity"],
                item["price"]
            )
        )

    conn.commit()
    cur.close()
    conn.close()

    return f"""
    <h1>Order Placed Successfully</h1>
    <h3>Order ID: {order_id}</h3>
    <h3>Total: Rs. {total}</h3>
    <script>localStorage.removeItem('cart');</script>
    <a href="/">Continue Shopping</a>
    """

if __name__ == "__main__":
    app.run(debug=True)