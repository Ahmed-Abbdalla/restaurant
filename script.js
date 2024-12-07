// Parent of all cards
const CardParent = document.querySelector(".content-parent");
const CartContainer = document.querySelector(".cart-container");

// عنصر عرض المجموع الكلي
const totalPriceElement = document.createElement("div");
totalPriceElement.className = "total-price";
totalPriceElement.innerHTML = "<h3>Total: $0.00</h3>";
CartContainer.appendChild(totalPriceElement);

let totalPrice = 0; // المجموع الكلي

// Dessert data
const categoreOfDessert = [
  {
    category: "Waffle",
    name: "Waffle with Berries",
    image: "image-waffle-desktop.jpg",
    price: 5.5,
  },
  {
    category: "Creme Brülée",
    name: "Vanilla Bean Creme Brülée",
    image: "image-creme-brulee-desktop.jpg",
    price: 4.9,
  },
  {
    category: "Macaron",
    name: "Macaron Mix Of Five",
    image: "image-macaron-desktop.jpg",
    price: 3,
  },
  {
    category: "Tiramisu",
    name: "Classic Tiramisu",
    image: "image-tiramisu-desktop.jpg",
    price: 3.5,
  },
  {
    category: "Baklava",
    name: "Pistachio Baklava",
    image: "image-baklava-desktop.jpg",
    price: 7.5,
  },
  {
    category: "Cake",
    name: "Red Velvet Cake",
    image: "image-cake-desktop.jpg",
    price: 4.5,
  },
  {
    category: "Panna Cotta",
    name: "Vanilla Panna Cotta",
    image: "image-panna-cotta-desktop.jpg",
    price: 4,
  },
];

// Generate card HTML
const cards = categoreOfDessert
  .map(
    (item) => `
    <div class="card">
      <div class="img-container">
        <img src="${item.image}" alt="${item.category}" />
      </div>
      <div class="card-content">
        <h3>${item.category}</h3>
        <p>${item.name}</p>
        <div class="price" data-price="${item.price}">$${item.price.toFixed(
      2
    )}</div>
        <div class="add-to-cart">
          <i class="fas fa-shopping-cart"></i> Add to Cart
        </div>
        <div class="add-to-cart-on-hover" style="display: none;">
          <span class="minus"><i class="fa-solid fa-minus"></i></span>
          <div class="product-count">1</div>
          <span class="plus"><i class="fas fa-plus"></i></span>
        </div>
      </div>
      <div class="confirm-ignore-wrapper" style="display: none;">
        <button class="confirm-order" title="Confirm Order">
          <i class="fa fa-check"></i>
        </button>
      </div>
    </div>
    `
  )
  .join("");

// Add cards to parent
CardParent.innerHTML = `<h1 class="heading">Desserts</h1>${cards}`;

// Add event listeners for dynamic elements
CardParent.addEventListener("click", (event) => {
  const target = event.target;

  // Handle "Add to Cart" button
  if (target.closest(".add-to-cart")) {
    const cardContent = target.closest(".card-content");
    cardContent.querySelector(".add-to-cart").style.display = "none";
    cardContent.querySelector(".add-to-cart-on-hover").style.display = "flex";
    cardContent.parentElement.querySelector(
      ".confirm-ignore-wrapper"
    ).style.display = "flex";
  }

  // Handle "Plus" button
  if (target.closest(".plus")) {
    const cardContent = target.closest(".card-content");
    const countElement = cardContent.querySelector(".product-count");
    const priceElement = cardContent.querySelector(".price");
    const pricePerUnit = parseFloat(priceElement.dataset.price);

    let currentCount = parseInt(countElement.textContent, 10);
    currentCount++;
    countElement.textContent = currentCount;
    priceElement.textContent = `$${(currentCount * pricePerUnit).toFixed(2)}`;
  }

  // Handle "Minus" button
  if (target.closest(".minus")) {
    const cardContent = target.closest(".card-content");
    const countElement = cardContent.querySelector(".product-count");
    const priceElement = cardContent.querySelector(".price");
    const pricePerUnit = parseFloat(priceElement.dataset.price);

    let currentCount = parseInt(countElement.textContent, 10);
    if (currentCount > 1) {
      currentCount--;
      countElement.textContent = currentCount;
      priceElement.textContent = `$${(currentCount * pricePerUnit).toFixed(2)}`;
    }
  }

  // Handle "Confirm Order" button
  if (target.closest(".confirm-order")) {
    const card = target.closest(".card");
    const cardContent = card.querySelector(".card-content");
    const productName = cardContent.querySelector("p").textContent;
    const productCategory = cardContent.querySelector("h3").textContent;
    const priceElement = cardContent.querySelector(".price");
    const pricePerUnit = parseFloat(priceElement.dataset.price);
    const countElement = cardContent.querySelector(".product-count");
    const count = parseInt(countElement.textContent, 10);
    const totalItemPrice = (count * pricePerUnit).toFixed(2);

    // Add item to cart
    const cartItem = `
      <div class="item-container">
        <div class="item-details">
          <p>${productName} <span>(${productCategory})</span></p>
          <p>Units: ${count}</p>
        </div>
        <div class="item-actions">
          <p>Price: $${totalItemPrice}</p>
          <button class="remove-btn">&times;</button>
        </div>
      </div>
    `;
    CartContainer.insertAdjacentHTML("beforeend", cartItem);

    // Update total price
    totalPrice += parseFloat(totalItemPrice);
    updateTotalPrice();
    const x = document.querySelector(".cart-container").children.length - 1;

    document.querySelector(".cart-container h2 span").innerHTML = `(${x - 1})`;
  }
});

// Handle removing items from cart
CartContainer.addEventListener("click", (event) => {
  if (event.target.closest(".remove-btn")) {
    const itemContainer = event.target.closest(".item-container");
    const priceElement = itemContainer.querySelector(".item-actions p");
    const price = parseFloat(priceElement.textContent.replace("Price: $", ""));
    totalPrice -= price;
    itemContainer.remove();
    updateTotalPrice();
  }
});

// Update total price display
function updateTotalPrice() {
  totalPriceElement.innerHTML = `<h3>Total: $${totalPrice.toFixed(2)}</h3>`;
}
