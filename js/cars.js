const porscheContainer = document.querySelector(".porsche-list");
const lamboContainer = document.querySelector(".lambo-list");
const hondaContainer = document.querySelector(".honda-list");

const isProductDetail = document.querySelector(".product-detail");
const isCartPage = document.querySelector(".cart");

function showSelectedCarSection() {
  const hash = window.location.hash;
  const sections = document.querySelectorAll('.car-section');

  sections.forEach(sec => sec.classList.remove('active'));

  if (hash) {
    const section = document.querySelector(hash);
    if (section) section.classList.add('active');
  } else {
    document.querySelector('#porsche').classList.add('active');
  }
}
window.addEventListener('DOMContentLoaded', showSelectedCarSection);
window.addEventListener('hashchange', showSelectedCarSection);

if (typeof porsche !== 'undefined' && porscheContainer) {
  displayCars(porsche, porscheContainer, 'porsche');
}
if (typeof lamborghini !== 'undefined' && lamboContainer) {
  displayCars(lamborghini, lamboContainer, 'lamborghini');
}
if (typeof honda !== 'undefined' && hondaContainer) {
  displayCars(honda, hondaContainer, 'honda');
}

if (isProductDetail) {
  displayProductDetail();
}

function displayCars(carList, container, brand) {
  carList.forEach(product => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");

    productCard.innerHTML = `
      <div class="img-box">
        <img src="${product.colors[0].mainImage}" alt="${product.title}">
      </div>
      <h2 class="title">${product.title}</h2>
      <span class="price">${product.price}</span>
    `;

    productCard.onclick = () => {
      product.brand = brand;
      localStorage.setItem('selectedProduct', JSON.stringify(product));
      window.location.href = '../html/car-detail.html';
    };

    container.appendChild(productCard);
  });
}

function displayProductDetail() {
  const productData = JSON.parse(localStorage.getItem("selectedProduct"));

  const titleEl = document.querySelector(".title");
  const priceEl = document.querySelector(".price");
  const descriptionEl = document.querySelector(".description");
  const mainImageContainer = document.querySelector(".main-img");
  const colorContainer = document.querySelector(".color-options");
  const addToCartBtn = document.querySelector("#add-cart-btn");

  let selectedColor = productData.colors[0];

  function updateProductDisplay(colorData) {
    mainImageContainer.innerHTML = `<img src="${colorData.mainImage}" alt="${productData.title}">`;

    colorContainer.innerHTML = "";
    productData.colors.forEach(color => {
      const img = document.createElement("img");
      img.src = color.mainImage;
      if (color.name === colorData.name) img.classList.add("selected");

      colorContainer.appendChild(img);

      img.addEventListener("click", () => {
        selectedColor = color;
        updateProductDisplay(color);
      });
    });

    titleEl.textContent = productData.title;
    priceEl.textContent = productData.price;
    descriptionEl.textContent = productData.description;
  }

  updateProductDisplay(selectedColor);

  addToCartBtn.addEventListener("click", () => {
    addToCart(productData, selectedColor);
  });
}

function addToCart(product, color) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingItem = cart.find(item => item.id === product.id && item.color === color.name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      image: color.mainImage,
      color: color.name,
      quantity: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  showNotification("Đã thêm vào giỏ hàng!");
}

function showNotification(message = "Đã thêm vào giỏ hàng!") {
  const noti = document.getElementById("notification");
  noti.textContent = message;
  noti.classList.remove("hidden");

  setTimeout(() => {
    noti.classList.add("hidden");
  }, 2000);
}
