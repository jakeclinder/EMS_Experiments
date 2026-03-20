// ── SAMPLE DATA ──────────────────────────────────────────────────────
const ITEMS = [
  { name: '(1) Egg Classic Breakfast (2)',  code: 46,  price: '$5.00',  displayOn: 'POS, OLO, KIOSK', inStock: true  },
  { name: '(1) French Toast 1',             code: 41,  price: '$2.00',  displayOn: 'POS, OLO, KIOSK', inStock: true  },
  { name: '(2) Blueberry Pancakes',         code: 39,  price: '$5.50',  displayOn: 'POS, OLO, KIOSK', inStock: true  },
  { name: '(2) French Toast',               code: 42,  price: '$3.00',  displayOn: 'POS, OLO, KIOSK', inStock: true  },
  { name: '(2) Jalapenos',                  code: 231, price: '$0.99',  displayOn: 'POS, OLO, KIOSK', inStock: true  },
  { name: '(3) Avocado Toast',              code: 57,  price: '$8.00',  displayOn: 'POS, OLO, KIOSK', inStock: true  },
  { name: '(3) Bacon & Eggs',               code: 58,  price: '$7.50',  displayOn: 'POS, OLO',        inStock: false },
  { name: '(4) Belgian Waffle',             code: 63,  price: '$6.00',  displayOn: 'POS, OLO, KIOSK', inStock: true  },
  { name: '(4) Breakfast Burrito',          code: 64,  price: '$9.00',  displayOn: 'POS, KIOSK',      inStock: true  },
  { name: '(5) Cinnamon Roll',              code: 71,  price: '$4.50',  displayOn: 'POS, OLO, KIOSK', inStock: true  },
  { name: '(5) Cold Brew Coffee',           code: 72,  price: '$4.00',  displayOn: 'POS, OLO, KIOSK', inStock: true  },
  { name: '(6) Denver Omelette',            code: 83,  price: '$10.00', displayOn: 'POS, OLO, KIOSK', inStock: false },
  { name: '(6) Fresh Orange Juice',         code: 88,  price: '$3.50',  displayOn: 'POS, OLO, KIOSK', inStock: true  },
  { name: '(7) Greek Yogurt Parfait',       code: 92,  price: '$5.00',  displayOn: 'OLO, KIOSK',      inStock: true  },
  { name: '(7) Ham & Cheese Omelette',      code: 96,  price: '$8.50',  displayOn: 'POS, OLO, KIOSK', inStock: true  },
];

// ── RENDER ITEMS TABLE ────────────────────────────────────────────────
function renderItems() {
  const tbody = document.getElementById('items-tbody');
  tbody.innerHTML = ITEMS.map(item => `
    <tr>
      <td class="col-name">${item.name}</td>
      <td class="col-code">${item.code}</td>
      <td class="col-price">${item.price}</td>
      <td class="col-display">${item.displayOn}</td>
      <td class="col-stock">
        <span class="badge ${item.inStock ? 'badge-in-stock' : 'badge-out-of-stock'}">
          ${item.inStock ? 'In Stock' : 'Out of Stock'}
        </span>
      </td>
    </tr>
  `).join('');
}

// ── NAVIGATION ────────────────────────────────────────────────────────
function navigate(pageId) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

  // Show target page
  const target = document.getElementById('page-' + pageId);
  if (target) target.classList.add('active');

  // Update sidebar active states
  document.querySelectorAll('.nav-sub-item').forEach(el => {
    el.classList.toggle('active', el.dataset.page === pageId);
  });
  document.querySelectorAll('.nav-item').forEach(el => {
    el.classList.toggle('active', el.dataset.page === pageId);
  });
}

// ── BIND SIDEBAR CLICKS ───────────────────────────────────────────────
document.querySelectorAll('[data-page]').forEach(el => {
  el.addEventListener('click', () => navigate(el.dataset.page));
});

// ── INIT ──────────────────────────────────────────────────────────────
renderItems();
navigate('items');
