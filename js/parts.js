const partsContainer = document.querySelector(".part-list");

function displayParts(partsList) {
  partsList.forEach(part => {
    const partCard = document.createElement("div");
    partCard.classList.add("product-card");

    partCard.innerHTML = `
      <div class="img-box">
        <img src="${part.image}" alt="${part.title}">
      </div>
      <h2 class="title">${part.title}</h2>
      <span class="price">${part.price}</span>
    `;

    // Thêm sự kiện khi nhấp vào phụ tùng để lưu vào giỏ hàng
    partCard.onclick = () => {
      localStorage.setItem('selectedPart', JSON.stringify(part));
      window.location.href = '../html/part-detail.html';
    };

    partsContainer.appendChild(partCard);
  });
}

function addToCart(part) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingItem = cart.find(item => item.id === part.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: part.id,
      title: part.title,
      price: part.price,
      image: part.image,
      quantity: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  showNotification("Đã thêm phụ tùng vào giỏ hàng!");
}

function showNotification(message = "Đã thêm vào giỏ hàng!") {
  const noti = document.getElementById("notification");
  noti.textContent = message;
  noti.classList.remove("hidden");

  setTimeout(() => {
    noti.classList.add("hidden");
  }, 2000);
}

if (typeof parts !== 'undefined' && partsContainer) {
  displayParts(parts);
}
