function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const count = cart.reduce((s, i) => s + i.quantity, 0);
  const countEl = document.querySelector('.cart-item-count');

  if (countEl) {
    countEl.textContent = count;
    countEl.style.display = count > 0 ? 'flex' : 'none';
  }
}

function renderPartDetails() {
  const partData = JSON.parse(localStorage.getItem("selectedPart"));

  if (!partData || partData.type !== "part") return;

  document.querySelector(".title").textContent = partData.title;
  document.querySelector(".price").textContent = partData.price;
  document.querySelector(".description").textContent = partData.description || "Chưa có mô tả";
  document.querySelector(".main-img").innerHTML = `<img src="${partData.image}" alt="${partData.title}">`;

  const addToCartBtn = document.getElementById('add-cart-btn');
  if (addToCartBtn) {
    addToCartBtn.onclick = () => {
      addToCart(partData);

      const noti = document.getElementById("notification");
      noti.classList.remove("hidden");
      setTimeout(() => noti.classList.add("hidden"), 2000);
    };
  }
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  renderPartDetails();
});

