function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const count = cart.reduce((s, i) => s + i.quantity, 0);
  const countEl = document.querySelector('.cart-item-count');

  if (countEl) {
    countEl.textContent = count;
    countEl.style.display = count > 0 ? 'flex' : 'none';
  }
}

// render detail
function renderDetails() {
  const prod = JSON.parse(localStorage.getItem('selectedProduct') || '{}');
  if (!prod.id) return;
  const ctn = document.getElementById('detail-container');
  const card = document.createElement('div');
  card.className = 'detail-card';
  card.innerHTML = `
    <h2>${prod.title}</h2>
    <div class="price">${prod.price}</div>
    <div class="detail-img-box"><img src="${prod.colors[0].mainImage}"></div>
    <div class="description">${prod.description}</div>
    <div class="color-options">
      ${prod.colors.map((c, i) => `<button data-index="${i}"${i == 0 ? ' class="active"' : ''}>${c.name}</button>`).join('')}
    </div>
    <button class="add-cart-btn">Thêm vào giỏ</button>
  `;
  ctn.appendChild(card);

  const imgEl = card.querySelector('img');
  card.querySelectorAll('.color-options button').forEach(btn => {
    btn.onclick = () => {
      card.querySelectorAll('.color-options button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      imgEl.src = prod.colors[btn.dataset.index].mainImage;
    };
  });

  card.querySelector('.add-cart-btn').onclick = () => {
    const selectedBtn = card.querySelector('.color-options button.active');
    const selectedIndex = +selectedBtn.dataset.index;

    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const idx = cart.findIndex(
      i => i.id === prod.id && i.colorIndex === selectedIndex
    );

    if (idx > -1) {
      cart[idx].quantity++;
    } else {
      cart.push({
        id: prod.id,
        title: prod.title,
        price: prod.price,
        colorIndex: selectedIndex,
        image: prod.colors[selectedIndex].mainImage,
        quantity: 1
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert('Đã thêm vào giỏ!');
  };
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  renderDetails();
});
