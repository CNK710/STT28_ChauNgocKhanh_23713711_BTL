function displayCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const cartItemContainer = document.querySelector(".cart-list");
  const subtotalEl = document.querySelector(".subtotal");
  const grandTotalEl = document.querySelector(".grand-total");

  cartItemContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemContainer.innerHTML = "<p>Giỏ Hàng Của Bạn Đang Trống. Hãy Chọn Xe Của Chúng Tôi.</p>";
    subtotalEl.textContent = "0 VNĐ";
    grandTotalEl.textContent = "0 VNĐ";
    return;
  }

  let subtotal = 0;

  cart.forEach((item, index) => {
    const numericPrice = parseFloat(item.price.replace(/[^\d]/g, ""));
    const itemTotal = numericPrice * item.quantity;
    subtotal += itemTotal;

    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
      <div class="product">
        <img src="${item.image}" alt="${item.title}">
        <div class="item-detail">
          <p>${item.title}</p>
          ${item.type === 'car' && item.color !== 'default' ? `
            <div class="color-box">
              <div class="color">${item.color}</div>
            </div>` : ''}
        </div>
      </div>
      <span class="price">${item.price}</span>
      <div class="quantity"><input type="number" value="${item.quantity}" min="1" data-index="${index}"></div>
      <span class="total-price">${itemTotal.toLocaleString()} VNĐ</span>
      <button class="remove" data-index="${index}"><i class='bx bx-x'></i></button>
    `;

    cartItemContainer.appendChild(cartItem);
  });

  subtotalEl.textContent = `${subtotal.toLocaleString()} VNĐ`;
  grandTotalEl.textContent = `${subtotal.toLocaleString()} VNĐ`;

  removeCartItem();
  updateCartQuantity();
}


function removeCartItem() {
  document.querySelectorAll(".remove").forEach(button => {
    button.addEventListener("click", function () {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const index = this.getAttribute("data-index");
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      displayCart();
      updateCartCount();
    });
  });
}

function updateCartQuantity() {
  document.querySelectorAll(".quantity input").forEach(input => {
    input.addEventListener("change", function () {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const index = this.getAttribute("data-index");
      cart[index].quantity = parseInt(this.value);
      localStorage.setItem("cart", JSON.stringify(cart));
      displayCart();
      updateCartCount();
    });
  });
}

function addToCart(product, color = {}) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const productType = product.type || "car";
  const productId = product.id + "-" + productType;
  const colorName = productType === "car" && color.name ? color.name : "default";
  const image = productType === "car" && color.mainImage ? color.mainImage : product.image;

  const existingItem = cart.find(
    item => item.id === productId && item.color === colorName
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: productId,
      title: product.title,
      price: product.price,
      image: image,
      color: colorName,
      quantity: 1,
      type: productType
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
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

window.addEventListener("DOMContentLoaded", displayCart);


