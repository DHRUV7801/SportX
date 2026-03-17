// SPORTX — main.js

const products = [
  { id:1, name:"Pro Resistance Band Set",    category:"Strength",        price:1299,  compare:1999,  save:"35%", badge:"HOT",        badgeClass:"badge-hot",  img:"productImage/resistance_band.png",  rating:4.9, reviews:2341 },
  { id:2, name:"Performance Yoga Mat Pro",   category:"Yoga & Recovery", price:2499,  compare:3499,  save:"29%", badge:"BESTSELLER", badgeClass:"badge-hot",  img:"productImage/yoga_mat.png",         rating:4.8, reviews:1876 },
  { id:3, name:"SportX Hydration Vest",      category:"Running",         price:3299,  compare:4499,  save:"27%", badge:"NEW",        badgeClass:"badge-new",  img:"productImage/running_pack.png",     rating:4.9, reviews:987  },
  { id:4, name:"Heavy Duty Jump Rope",       category:"Cardio",          price:699,   compare:999,   save:"30%", badge:"SALE",       badgeClass:"badge-sale", img:"productImage/jump_rope.png",        rating:4.7, reviews:3210 },
  { id:5, name:"Adjustable Dumbbell Set",    category:"Strength",        price:8999,  compare:12999, save:"31%", badge:"HOT",        badgeClass:"badge-hot",  img:"productImage/dumbell.png",          rating:4.8, reviews:654  },
  { id:6, name:"Pro Boxing Gloves",          category:"Combat",          price:2199,  compare:2999,  save:"27%", badge:"NEW",        badgeClass:"badge-new",  img:"productImage/boxing_glove.png",     rating:4.9, reviews:1102 },
  { id:7, name:"Compression Shorts 3-Pack",  category:"Apparel",         price:1799,  compare:2499,  save:"28%", badge:"HOT",        badgeClass:"badge-hot",  img:"productImage/athelete_shorts.png",  rating:4.6, reviews:2890 },
  { id:8, name:"Foam Roller Elite",          category:"Recovery",        price:1499,  compare:1999,  save:"25%", badge:"SALE",       badgeClass:"badge-sale", img:"productImage/foam_roller.png",      rating:4.7, reviews:743  },
];

let cart = [];

function renderProducts() {
  document.getElementById('productsGrid').innerHTML = products.map(p => `
    <div class="product-card">
      <div class="product-image-wrap">
        <img src="${p.img}" alt="${p.name}" loading="lazy" />
        <span class="product-badge ${p.badgeClass}">${p.badge}</span>
        <button class="product-wishlist">♡</button>
        <div class="product-quick-add" onclick="addToCart(${p.id},event)">⚡ Quick Add</div>
      </div>
      <div class="product-info">
        <div class="product-category">${p.category}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-rating">
          <span class="stars">★★★★★</span>
          <span class="rating-count">${p.rating} (${p.reviews.toLocaleString()})</span>
        </div>
        <div class="product-pricing">
          <span class="price-current">₹${p.price.toLocaleString()}</span>
          <span class="price-compare">₹${p.compare.toLocaleString()}</span>
          <span class="price-save">-${p.save}</span>
        </div>
        <button class="add-to-cart-btn" onclick="addToCart(${p.id},event)">🛒 Add to Cart</button>
      </div>
    </div>
  `).join('');
}

function addToCart(id, event) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(i => i.id === id);
  if (existing) existing.qty++;
  else cart.push({ ...product, qty: 1 });
  updateCart();
  openCart();
  if (event && event.target) {
    const btn = event.target.closest('button') || event.target.closest('.product-quick-add');
    if (btn) {
      const orig = btn.innerHTML;
      btn.innerHTML = '✅ Added!';
      setTimeout(() => { btn.innerHTML = orig; }, 1500);
    }
  }
}

function updateCart() {
  const count = cart.reduce((a,i) => a + i.qty, 0);
  const total = cart.reduce((a,i) => a + i.price * i.qty, 0);
  document.getElementById('cartBadge').textContent = count;
  document.getElementById('navCartCount').textContent = count;
  document.getElementById('cartTotal').textContent = '₹' + total.toLocaleString();
  const body = document.getElementById('cartBody');
  const footer = document.getElementById('cartFooter');
  if (cart.length === 0) {
    body.innerHTML = `<div class="cart-empty"><span class="cart-empty-icon">🛍️</span><div class="cart-empty-text">Your cart is empty</div><p style="font-size:14px;margin-top:8px;color:var(--gray-mid)">Add some gear to get started!</p></div>`;
    footer.style.display = 'none';
  } else {
    body.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div class="cart-item-thumb"><img src="${item.img}" alt="${item.name}" /></div>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">₹${item.price.toLocaleString()}</div>
          <div class="cart-item-qty">
            <button class="qty-btn" onclick="changeQty(${item.id},-1)">−</button>
            <span class="qty-num">${item.qty}</span>
            <button class="qty-btn" onclick="changeQty(${item.id},1)">+</button>
          </div>
        </div>
      </div>`).join('');
    footer.style.display = 'block';
  }
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(i => i.id !== id);
  updateCart();
}

function openCart() {
  document.getElementById('cartDrawer').classList.add('open');
  document.getElementById('cartOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeCart() {
  document.getElementById('cartDrawer').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('open');
  document.body.style.overflow = '';
}
function openMobileNav() {
  document.getElementById('mobileNav').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeMobileNav() {
  document.getElementById('mobileNav').classList.remove('open');
  document.body.style.overflow = '';
}
function closePopup() {
  document.getElementById('popup').classList.remove('open');
  document.body.style.overflow = '';
}
function scrollToProducts() {
  document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

setTimeout(() => {
  document.getElementById('popup').classList.add('open');
  document.body.style.overflow = 'hidden';
}, 3500);

function startCountdown() {
  let total = (8 * 3600) + (45 * 60);
  setInterval(() => {
    if (total <= 0) return;
    total--;
    document.getElementById('cdH').textContent = String(Math.floor(total/3600)).padStart(2,'0');
    document.getElementById('cdM').textContent = String(Math.floor((total%3600)/60)).padStart(2,'0');
    document.getElementById('cdS').textContent = String(total%60).padStart(2,'0');
  }, 1000);
}

document.addEventListener('click', e => {
  if (e.target.classList.contains('product-wishlist'))
    e.target.textContent = e.target.textContent === '♡' ? '❤️' : '♡';
});

window.addEventListener('scroll', () => {
  document.querySelector('.navbar').style.boxShadow =
    window.scrollY > 80 ? '0 4px 40px rgba(0,0,0,0.5)' : 'none';
});

document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  startCountdown();
});
