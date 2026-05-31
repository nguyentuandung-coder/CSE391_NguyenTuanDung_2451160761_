const products = [
  {
    id: 1,
    name: "iPhone 16",
    price: 25990000,
    category: "phone",
    image: "https://placehold.co/200",
    rating: 4.5,
    inStock: true,
  },
  {
    id: 2,
    name: "Samsung S24",
    price: 22990000,
    category: "phone",
    image: "https://placehold.co/200",
    rating: 4.4,
    inStock: true,
  },
  {
    id: 3,
    name: "Pixel 9",
    price: 19990000,
    category: "phone",
    image: "https://placehold.co/200",
    rating: 4.6,
    inStock: true,
  },

  {
    id: 4,
    name: "MacBook Pro",
    price: 45990000,
    category: "laptop",
    image: "https://placehold.co/200",
    rating: 4.8,
    inStock: true,
  },
  {
    id: 5,
    name: "Dell XPS 15",
    price: 35990000,
    category: "laptop",
    image: "https://placehold.co/200",
    rating: 4.7,
    inStock: true,
  },
  {
    id: 6,
    name: "ThinkPad X1",
    price: 32990000,
    category: "laptop",
    image: "https://placehold.co/200",
    rating: 4.5,
    inStock: false,
  },

  {
    id: 7,
    name: "iPad Air",
    price: 16990000,
    category: "tablet",
    image: "https://placehold.co/200",
    rating: 4.6,
    inStock: false,
  },
  {
    id: 8,
    name: "Xiaomi Pad 6",
    price: 7990000,
    category: "tablet",
    image: "https://placehold.co/200",
    rating: 4.2,
    inStock: true,
  },
  {
    id: 9,
    name: "Galaxy Tab S9",
    price: 18990000,
    category: "tablet",
    image: "https://placehold.co/200",
    rating: 4.4,
    inStock: true,
  },

  {
    id: 10,
    name: "AirPods Pro",
    price: 6990000,
    category: "accessory",
    image: "https://placehold.co/200",
    rating: 4.3,
    inStock: true,
  },
  {
    id: 11,
    name: "Galaxy Buds",
    price: 3490000,
    category: "accessory",
    image: "https://placehold.co/200",
    rating: 4.1,
    inStock: true,
  },
  {
    id: 12,
    name: "Magic Mouse",
    price: 2490000,
    category: "accessory",
    image: "https://placehold.co/200",
    rating: 4.0,
    inStock: true,
  },
];

const productGrid = document.querySelector("#productGrid");
const searchInput = document.querySelector("#searchInput");
const categoryButtons = document.querySelector("#categoryButtons");
const sortSelect = document.querySelector("#sortSelect");
const cartBadge = document.querySelector("#cartBadge");
const darkModeBtn = document.querySelector("#darkModeBtn");
const modal = document.querySelector("#modal");
const modalBody = document.querySelector("#modalBody");
const closeModal = document.querySelector("#closeModal");

let currentCategory = "all";
let cartCount = 0;

function formatPrice(price) {
  return price.toLocaleString("vi-VN") + "đ";
}

function createProductCard(product) {
  const card = document.createElement("article");
  card.className = "card";
  card.dataset.id = product.id;

  const img = document.createElement("img");
  img.src = product.image;
  img.alt = product.name;

  const title = document.createElement("h3");
  title.textContent = product.name;

  const price = document.createElement("p");
  price.className = "price";
  price.textContent = formatPrice(product.price);

  const rating = document.createElement("p");
  rating.textContent = `⭐ ${product.rating}`;

  const stock = document.createElement("p");
  stock.className = "stock";
  stock.textContent = product.inStock ? "Còn hàng" : "Hết hàng";

  const button = document.createElement("button");
  button.className = "add-cart";
  button.textContent = "Thêm giỏ";
  button.disabled = !product.inStock;

  card.appendChild(img);
  card.appendChild(title);
  card.appendChild(price);
  card.appendChild(rating);
  card.appendChild(stock);
  card.appendChild(button);

  return card;
}

function getFilteredProducts() {
  const keyword = searchInput.value.trim().toLowerCase();

  let result = products.filter((product) => {
    const matchSearch = product.name.toLowerCase().includes(keyword);
    const matchCategory =
      currentCategory === "all" || product.category === currentCategory;

    return matchSearch && matchCategory;
  });

  if (sortSelect.value === "price-asc") {
    result = [...result].sort((a, b) => a.price - b.price);
  } else if (sortSelect.value === "price-desc") {
    result = [...result].sort((a, b) => b.price - a.price);
  } else if (sortSelect.value === "name-az") {
    result = [...result].sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortSelect.value === "rating-desc") {
    result = [...result].sort((a, b) => b.rating - a.rating);
  }

  return result;
}

function renderProducts() {
  productGrid.textContent = "";

  const filteredProducts = getFilteredProducts();

  if (filteredProducts.length === 0) {
    const empty = document.createElement("p");
    empty.textContent = "Không tìm thấy sản phẩm.";
    productGrid.appendChild(empty);
    return;
  }

  filteredProducts.forEach((product) => {
    const card = createProductCard(product);
    productGrid.appendChild(card);
  });
}

function renderCategories() {
  const categories = [
    "all",
    ...new Set(products.map((product) => product.category)),
  ];

  categories.forEach((category) => {
    const button = document.createElement("button");

    button.className = "category-btn";
    button.dataset.category = category;
    button.textContent = category === "all" ? "All" : category;

    if (category === "all") {
      button.classList.add("active");
    }

    categoryButtons.appendChild(button);
  });
}

function openModal(product) {
  modalBody.textContent = "";

  const title = document.createElement("h2");
  title.textContent = product.name;

  const img = document.createElement("img");
  img.src = product.image;
  img.alt = product.name;
  img.style.width = "100%";
  img.style.borderRadius = "14px";

  const price = document.createElement("p");
  price.textContent = `Giá: ${formatPrice(product.price)}`;

  const category = document.createElement("p");
  category.textContent = `Danh mục: ${product.category}`;

  const rating = document.createElement("p");
  rating.textContent = `Đánh giá: ${product.rating}`;

  const stock = document.createElement("p");
  stock.textContent = product.inStock
    ? "Tình trạng: Còn hàng"
    : "Tình trạng: Hết hàng";

  modalBody.appendChild(title);
  modalBody.appendChild(img);
  modalBody.appendChild(price);
  modalBody.appendChild(category);
  modalBody.appendChild(rating);
  modalBody.appendChild(stock);

  modal.classList.remove("hidden");
}

searchInput.addEventListener("input", renderProducts);

sortSelect.addEventListener("change", renderProducts);

categoryButtons.addEventListener("click", function (event) {
  if (!event.target.classList.contains("category-btn")) {
    return;
  }

  const buttons = document.querySelectorAll(".category-btn");

  buttons.forEach((button) => button.classList.remove("active"));

  event.target.classList.add("active");
  currentCategory = event.target.dataset.category;

  renderProducts();
});

productGrid.addEventListener("click", function (event) {
  const card = event.target.closest(".card");

  if (!card) return;

  const id = Number(card.dataset.id);
  const product = products.find((product) => product.id === id);

  if (!product) return;

  if (event.target.classList.contains("add-cart")) {
    event.stopPropagation();

    cartCount++;
    cartBadge.textContent = cartCount;

    return;
  }

  openModal(product);
});

closeModal.addEventListener("click", function () {
  modal.classList.add("hidden");
});

modal.addEventListener("click", function (event) {
  if (event.target === modal) {
    modal.classList.add("hidden");
  }
});

darkModeBtn.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    darkModeBtn.textContent = "☀️ Light";
  } else {
    darkModeBtn.textContent = "🌙 Dark";
  }
});

renderCategories();
renderProducts();
