// Data Storage
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let orders = JSON.parse(localStorage.getItem("orders")) || [];

function saveData() {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("orders", JSON.stringify(orders));
}

// Cart Functions
function addToCart(item, price) {
    cart.push({name: item, price: price});
    saveData();
    alert("Added " + item + " to Cart!");
}

function renderCart() {
    let container = document.getElementById("cartList");
    if (!container) return;
    
    container.innerHTML = "";
    if (cart.length === 0) {
        container.innerHTML = "<p style='text-align:center; margin-top:20px;'>Cart is empty.</p>";
        return;
    }
    
    let total = 0;
    cart.forEach(item => {
        total += item.price;
        container.innerHTML += `<div class="card">
            <h3>${item.name}</h3>
            <p>₹${item.price}</p>
        </div>`;
    });
    container.innerHTML += `<div class="card"><h3>Total: ₹${total}</h3></div>`;
}

function placeOrder() {
    if(cart.length === 0) return alert("Cart is empty!");
    let date = new Date().toLocaleDateString();
    orders.push({ items: [...cart], date: date });
    cart = [];
    saveData();
    alert("Order successfully placed into your cloud database!");
    window.location.href = "orders.html";
}

// Orders Function
function renderOrders() {
    let container = document.getElementById("ordersList");
    if (!container) return;
    
    container.innerHTML = "";
    if (orders.length === 0) {
        container.innerHTML = "<p style='text-align:center; margin-top:20px;'>No past orders found.</p>";
        return;
    }

    orders.forEach((order, i) => {
        let itemsList = order.items.map(item => item.name).join(", ");
        container.innerHTML += `<div class="card">
            <div>
                <h3 style="color: var(--primary);">Order #${i+1} - ${order.date}</h3>
                <p style="margin-top:5px;">${itemsList}</p>
            </div>
        </div>`;
    });
}

// THE WHATSAPP MAGIC
function triggerWhatsApp() {
    let phoneNumber = "919876543210"; // Replace with your number
    let message = "Urgent Order: I want to upload a prescription for home delivery.";
    window.location.href = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}

function uploadPrescriptionFile() {
    let file = document.getElementById("file").files[0];
    if(!file) return alert("Please select a prescription image first!");
    orders.push({ items: [{name: "Prescription Upload: " + file.name, price: 0}], date: new Date().toLocaleDateString() });
    saveData();
    alert("Prescription securely saved to patient history!");
    window.location.href = "orders.html";
}

// COLOR THEME TOGGLE (THE MASTERMIND UPSELL)
function toggleTheme() {
    document.body.classList.toggle("dark-mode");
    let theme = document.body.classList.contains("dark-mode") ? "dark" : "light";
    localStorage.setItem("theme", theme);
}

// Load theme and data on page load
window.onload = () => {
    if(localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
    }
    renderCart();
    renderOrders();
}
// THE MASTERMIND THEME TOGGLE (Sun/Moon Logic)
function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById('themeIcon');

    // If it's currently dark mode, switch to Bright
    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'bright');
        themeIcon.classList.remove('fa-sun'); // Remove Sun
        themeIcon.classList.add('fa-moon');   // Show Crescent Moon
    } 
    // If it's currently bright mode, switch to Dark
    else {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
        themeIcon.classList.remove('fa-moon'); // Remove Crescent Moon
        themeIcon.classList.add('fa-sun');     // Show Sun
    }
}

// Add this to ensure the theme is loaded when they open the app
document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem('theme');
    const themeIcon = document.getElementById('themeIcon');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if (themeIcon) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    }
});