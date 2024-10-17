let orders = [];
let totalItems = 0;
let totalPrice = 0;

// Example function to add items to the order
function addToOrder(item, price) {
    orders.push({ name: item, price: price, quantity: 1 });
    updateOrderList();
}

// Function to update the order list dynamically
function updateOrderList() {
    const orderList = document.getElementById("order-list");
    const totalItemsSpan = document.getElementById("total-items");
    const totalPriceSpan = document.getElementById("total-price");

    // Reset list
    orderList.innerHTML = '';

    if (orders.length === 0) {
        orderList.innerHTML = '<p>No orders placed yet.</p>';
        totalItemsSpan.innerText = '0';
        totalPriceSpan.innerText = '0.00';
        return;
    }

    orders.forEach((order, index) => {
        const orderItem = document.createElement('div');
        orderItem.className = 'order-item';
        orderItem.innerHTML = `
            <h4>${order.name}</h4>
            <div class="item-details">
                <div class="quantity-adjust">
                    <button onclick="decreaseQuantity(${index})">-</button>
                    <input type="text" value="${order.quantity}" readonly>
                    <button onclick="increaseQuantity(${index})">+</button>
                </div>
            </div>
            <button class="remove-btn" onclick="removeOrder(${index})">Remove</button>
        `;
        orderList.appendChild(orderItem);
    });

    totalItems = orders.reduce((acc, order) => acc + order.quantity, 0);
    totalPrice = orders.reduce((acc, order) => acc + (order.price * order.quantity), 0);

    totalItemsSpan.innerText = totalItems;
    totalPriceSpan.innerText = totalPrice.toFixed(2);
}

// Function to increase quantity
function increaseQuantity(index) {
    orders[index].quantity += 1;
    updateOrderList();
}

// Function to decrease quantity
function decreaseQuantity(index) {
    if (orders[index].quantity > 1) {
        orders[index].quantity -= 1;
        updateOrderList();
    }
}

// Function to remove an order
function removeOrder(index) {
    orders.splice(index, 1);
    updateOrderList();
}

// Function to finalize the order and navigate to Billing
function finalizeOrder() {
    alert('Order finalized! Redirecting to billing...');
    displayOrderInBilling();

    // Navigate to the Billing section using scrollIntoView
    const billingSection = document.getElementById('billing');
    if (billingSection) {
        billingSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Function to display the order summary in the Billing section
function displayOrderInBilling() {
    const billSummary = document.getElementById('bill-summary');

    if (orders.length === 0) {
        billSummary.innerHTML = '<p>No orders placed yet.</p>';
        return;
    }

    // Generate a detailed order list
    const orderList = orders.map(order => {
        const subtotal = (order.price * order.quantity).toFixed(2);
        return `
            <li class="order-item">
                <span class="item-name">${order.name}</span>
                <span class="item-quantity">Quantity: ${order.quantity}</span>
                <span class="item-price">Price: $${order.price.toFixed(2)}</span>
                <span class="item-subtotal">Subtotal: $${subtotal}</span>
            </li>
        `;
    }).join('');

    const totalPrice = orders.reduce((acc, order) => acc + (order.price * order.quantity), 0).toFixed(2);

    // Display the order summary
    billSummary.innerHTML = `
        <h3>Your Order Summary</h3>
        <ul class="order-list">${orderList}</ul>
        <p class="total-price"><strong>Total: $${totalPrice}</strong></p>
    `;
}


// Function to process payment
function processPayment() {
    alert('Payment processed! Thank you for your purchase.');
    orders = [];  // Clear orders after payment
    updateOrderList();
    displayOrderInBilling();  // Clear billing section after payment
}

// Other functions remain unchanged...

// Reservation Management
document.getElementById('reservation-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const partySize = document.getElementById('party-size').value;
    const reservationList = document.getElementById('reservation-list');
    
    reservationList.innerHTML += `<p>Reservation: ${date} at ${time}, Party Size: ${partySize}</p>`;
});

// Billing System
function processPayment() {
    const total = orders.reduce((acc, order) => acc + order.price, 0);
    const billSummary = document.getElementById('bill-summary');
    billSummary.innerHTML = `<p>Total: $${total.toFixed(2)}</p>`;
    alert('Payment Processed!');
}

// CRM - Feedback System
document.getElementById('feedback-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const feedback = document.getElementById('feedback').value;
    
    alert(`Thank you, ${name}! Your feedback has been submitted.`);
});

// Reporting & Analytics
function generateReport() {
    const reportOutput = document.getElementById('report-output');
    const totalSales = orders.reduce((acc, order) => acc + order.price, 0);
    
    reportOutput.innerHTML = `<p>Total Sales: $${totalSales.toFixed(2)}</p>`;
}
// staff management
function addStaff() {
    // Get the form input values
    const name = document.getElementById('staff-name').value;
    const joiningDate = document.getElementById('joining-date').value;
    const jobRole = document.getElementById('job-role').value;

    // Create a new list item
    const staffList = document.getElementById('staff-list').querySelector('ul');
    const newStaff = document.createElement('li');
    newStaff.textContent = `${name} - Joined on: ${joiningDate}, Job: ${jobRole}`;

    // Add the new staff to the list
    staffList.appendChild(newStaff);

    // Clear the form
    document.getElementById('staff-form').reset();
}
