
/* =========================================
   SWEET MOMENTS - COMPLETE CUSTOMER WEBSITE
========================================= */


/* 1. PRODUCT COLLECTION */

const products = [

  // CAKES & BAKERY

  {
    id: 1,
    name: "Pink Velvet Cake",
    category: "cakes",
    price: 4500,
    image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800",
    description: "An elegant pink celebration cake with beautiful decoration."
  },

  {
    id: 2,
    name: "Chocolate Fudge Cake",
    category: "cakes",
    price: 3800,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800",
    description: "Rich chocolate layers with smooth chocolate frosting."
  },

  {
    id: 3,
    name: "Strawberry Cream Cake",
    category: "cakes",
    price: 4200,
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800",
    description: "A delightful strawberry-inspired cream cake."
  },

  {
    id: 4,
    name: "Luxury Cupcake Box",
    category: "cakes",
    price: 2200,
    image: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=800",
    description: "Beautifully decorated cupcakes for sweet celebrations."
  },

  {
    id: 5,
    name: "Wedding Floral Cake",
    category: "cakes",
    price: 8500,
    image: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=800",
    description: "An elegant floral cake for your special day."
  },


  // GIFTS & FLOWERS - UPDATED COLLECTION

  {
    id: 6,
    name: "Luxury Chocolate Bouquet",
    category: "gifts",
    price: 5500,
    image: "images/Chocolate-bouquet.jpg",
    description: "A trendy surprise filled with delicious chocolates, sweet treats and beautiful wrapping."
  },

  {
    id: 7,
    name: "Romantic Rose Bouquet",
    category: "gifts",
    price: 3500,
    image: "images/rose-bouquet.jpg",
    description: "A gorgeous bouquet of romantic fresh red roses, wrapped with love."
  },

  {
    id: 8,
    name: "Chocolate Gift Box",
    category: "gifts",
    price: 2800,
    image: "images/Chocolate-box.jpg",
    description: "A luxury chocolate gift box filled with delicious chocolate treats."
  },

  {
    id: 9,
    name: "Pink Rose Bouquet",
    category: "gifts",
    price: 4200,
    image: "images/Pink-rose-bouquet.jpg",
    description: "A dreamy arrangement of pretty pink roses for someone special."
  },

  {
    id: 10,
    name: "Personalized Gift Box",
    category: "gifts",
    price: 3200,
    image: "images/personalized-gift-box.jpg",
    description: "A beautifully presented surprise box with ribbons and thoughtful little gifts."
  },


  // WEDDINGS & EVENTS

  {
    id: 11,
    name: "Luxury Wedding Stage",
    category: "events",
    price: 85000,
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
    description: "A luxurious wedding stage with elegant floral decoration."
  },

  {
    id: 12,
    name: "Birthday Balloon Setup",
    category: "events",
    price: 15000,
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800",
    description: "A beautiful balloon arrangement for birthday parties."
  },

  {
    id: 13,
    name: "Engagement Decoration",
    category: "events",
    price: 35000,
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800",
    description: "Romantic decoration for your engagement celebration."
  },

  {
    id: 14,
    name: "Garden Wedding Setup",
    category: "events",
    price: 95000,
    image: "https://images.unsplash.com/photo-1507504031003-b417219a0fde?w=800",
    description: "A dreamy outdoor wedding setup."
  },

  {
    id: 15,
    name: "Anniversary Celebration",
    category: "events",
    price: 22000,
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800",
    description: "A romantic decoration setup for anniversaries."
  }

];


/* 2. STORAGE */

const CART_KEY = "sweetMomentsCustomerCart";
const ORDER_KEY = "sweetMomentsOrders";

let cart = [];

try {
  const storedCart = JSON.parse(
    localStorage.getItem(CART_KEY) || "[]"
  );

  if (Array.isArray(storedCart)) {
    cart = storedCart.filter(item =>
      products.some(product => product.id === item.id) &&
      Number.isInteger(item.quantity) &&
      item.quantity > 0
    );
  }
} catch {
  cart = [];
}


/* 3. CURRENCY */

function formatPrice(amount) {
  return "Rs. " + Number(amount).toLocaleString("en-PK");
}


/* 4. SAVE CART */

function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}


/* 5. RENDER PRODUCTS */

function renderProducts(category = "all") {

  const grid = document.getElementById("productGrid");

  const selectedProducts = category === "all"
    ? products
    : products.filter(product =>
        product.category === category
      );

  if (!selectedProducts.length) {
    grid.innerHTML = "<p>No products available.</p>";
    return;
  }

  grid.innerHTML = selectedProducts.map(product => `

    <article class="product-card">

      <img
        src="${product.image}"
        alt="${product.name}"
        loading="lazy"
      >

      <div class="product-info">

        <span class="product-category">
          ${
            product.category === "cakes"
              ? "CAKES & BAKERY"
              : product.category === "gifts"
              ? "GIFTS & FLOWERS"
              : "WEDDINGS & EVENTS"
          }
        </span>

        <h3>${product.name}</h3>

        <p class="product-description">
          ${product.description}
        </p>

        <div class="product-bottom">

          <span class="price">
            ${formatPrice(product.price)}
          </span>

          <button
            class="add-button"
            data-add="${product.id}"
          >
            Add to Bag +
          </button>

        </div>

      </div>

    </article>

  `).join("");

}


/* 6. FILTER PRODUCTS */

document.querySelectorAll(".filter").forEach(button => {

  button.addEventListener("click", () => {

    document.querySelectorAll(".filter").forEach(filter => {
      filter.classList.remove("active");
    });

    button.classList.add("active");

    renderProducts(button.dataset.filter);

  });

});


/* 7. CATEGORY CARD NAVIGATION */

document.querySelectorAll(".category-card").forEach(card => {

  card.addEventListener("click", () => {

    const category = card.dataset.category;

    document.querySelectorAll(".filter").forEach(button => {

      button.classList.toggle(
        "active",
        button.dataset.filter === category
      );

    });

    renderProducts(category);

    document.getElementById("shop").scrollIntoView({
      behavior: "smooth"
    });

  });

});


/* 8. ADD TO CART */

function addToCart(id) {

  const product = products.find(item => item.id === id);

  if (!product) return;

  const existingItem = cart.find(item => item.id === id);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({
      id: id,
      quantity: 1
    });
  }

  saveCart();
  updateCart();

}


/* 9. UPDATE QUANTITY */

function changeQuantity(id, amount) {

  const item = cart.find(item => item.id === id);

  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    cart = cart.filter(item => item.id !== id);
  }

  saveCart();
  updateCart();

}


/* 10. REMOVE ITEM */

function removeItem(id) {

  cart = cart.filter(item => item.id !== id);

  saveCart();
  updateCart();

}


/* 11. CALCULATE TOTAL */

function getTotal() {

  return cart.reduce((total, item) => {

    const product = products.find(p => p.id === item.id);

    return total + (
      product
        ? product.price * item.quantity
        : 0
    );

  }, 0);

}


/* 12. UPDATE CART */

function updateCart() {

  const container = document.getElementById("cartItems");

  const count = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  document.getElementById("cartCount").textContent = count;

  if (cart.length === 0) {

    container.innerHTML = `
      <p>Your shopping bag is empty. ♡</p>
    `;

  } else {

    container.innerHTML = cart.map(item => {

      const product = products.find(p => p.id === item.id);

      if (!product) return "";

      return `

        <div class="cart-item">

          <img src="${product.image}" alt="${product.name}">

          <div>

            <h4>${product.name}</h4>

            <p>${formatPrice(product.price * item.quantity)}</p>

            <div class="quantity-controls">

              <button data-minus="${product.id}">−</button>

              <span>${item.quantity}</span>

              <button data-plus="${product.id}">+</button>

            </div>

          </div>

          <button class="remove-button"
            data-remove="${product.id}">×</button>

        </div>

      `;

    }).join("");

  }

  document.getElementById("cartSubtotal").textContent =
    formatPrice(getTotal());

  document.getElementById("checkoutTotal").textContent =
    formatPrice(getTotal());

  saveCart();

}


/* 13. CART BUTTON EVENTS */

document.addEventListener("click", event => {

  const add = event.target.closest("[data-add]");
  const plus = event.target.closest("[data-plus]");
  const minus = event.target.closest("[data-minus]");
  const remove = event.target.closest("[data-remove]");

  if (add) {
    addToCart(Number(add.dataset.add));
  }

  if (plus) {
    changeQuantity(Number(plus.dataset.plus), 1);
  }

  if (minus) {
    changeQuantity(Number(minus.dataset.minus), -1);
  }

  if (remove) {
    removeItem(Number(remove.dataset.remove));
  }

});


/* 14. OPEN AND CLOSE CART */

const cartDrawer = document.getElementById("cartDrawer");
const overlay = document.getElementById("overlay");

function openCart() {
  cartDrawer.classList.add("active");
  overlay.classList.add("active");
}

function closeCart() {
  cartDrawer.classList.remove("active");
  overlay.classList.remove("active");
}

document.getElementById("openCart").addEventListener(
  "click",
  openCart
);

document.getElementById("closeCart").addEventListener(
  "click",
  closeCart
);

overlay.addEventListener("click", closeCart);


/* 15. MOBILE NAVIGATION */

document.getElementById("menuToggle").addEventListener(
  "click",
  () => {
    document.getElementById("nav").classList.toggle("active");
  }
);

document.querySelectorAll(".nav a").forEach(link => {

  link.addEventListener("click", () => {
    document.getElementById("nav").classList.remove("active");
  });

});


/* 16. CHECKOUT */

const checkoutSection =
  document.getElementById("checkoutSection");

document.getElementById("checkoutButton").addEventListener(
  "click",
  () => {

    if (cart.length === 0) {
      alert("Your shopping bag is empty!");
      return;
    }

    closeCart();

    checkoutSection.classList.add("active");

    const dateInput = document.querySelector(
      '[name="deliveryDate"]'
    );

    dateInput.min = new Date().toLocaleDateString("en-CA");

  }
);


document.getElementById("closeCheckout").addEventListener(
  "click",
  () => {
    checkoutSection.classList.remove("active");
  }
);


/* 17. PLACE DEMO ORDER */

document.getElementById("checkoutForm").addEventListener(
  "submit",
  event => {

    event.preventDefault();

    if (cart.length === 0) {
      alert("Your shopping bag is empty!");
      return;
    }

    const formData = new FormData(event.target);

    const orderNumber =
      "SM-" + Date.now().toString().slice(-7);

    const order = {

      id: orderNumber,

      customer: {
        name: formData.get("name"),
        phone: formData.get("phone"),
        email: formData.get("email"),
        address: formData.get("address"),
        city: formData.get("city")
      },

      payment: formData.get("payment"),

      deliveryDate: formData.get("deliveryDate"),

      notes: formData.get("notes"),

      total: getTotal(),

      items: cart.map(item => {

        const product = products.find(p => p.id === item.id);

        return {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: item.quantity
        };

      }),

      status: "Pending",

      date: new Date().toISOString()

    };


    try {

      const savedOrders = JSON.parse(
        localStorage.getItem(ORDER_KEY) || "[]"
      );

      if (!Array.isArray(savedOrders)) {
        throw new Error("Invalid order data");
      }

      savedOrders.push(order);

      localStorage.setItem(
        ORDER_KEY,
        JSON.stringify(savedOrders)
      );

    } catch (error) {

      alert("Order could not be saved. Please try again.");

      return;

    }


    document.getElementById("orderReference").textContent =
      "Order Number: " + orderNumber +
      " | Total: " + formatPrice(order.total);


    cart = [];

    saveCart();

    updateCart();

    event.target.reset();

    checkoutSection.classList.remove("active");

    document.getElementById("confirmation")
      .classList.add("active");

  }

);


/* 18. CONTINUE SHOPPING */

document.getElementById("continueShopping")
  .addEventListener("click", () => {

    document.getElementById("confirmation")
      .classList.remove("active");

    document.getElementById("shop")
      .scrollIntoView({
        behavior: "smooth"
      });

  });


/* 19. CONTACT FORM */

document.getElementById("contactForm")
  .addEventListener("submit", event => {

    event.preventDefault();

    const data = new FormData(event.target);

    const message = [

      "Hello Sweet Moments!",

      "Name: " + data.get("name"),

      "Phone: " + data.get("phone"),

      "Email: " + data.get("email"),

      "Interested in: " + data.get("subject"),

      "Message: " + data.get("message")

    ].join("\n");

    const email = "YOUR-EMAIL@example.com";

    window.location.href =
      "mailto:" + email +
      "?subject=" + encodeURIComponent("Sweet Moments Enquiry") +
      "&body=" + encodeURIComponent(message);

  });


/* 20. FOOTER YEAR */

document.getElementById("year").textContent =
  new Date().getFullYear();


/* 21. INITIALIZE */

renderProducts();

updateCart();

console.log("Sweet Moments customer website is ready!");

