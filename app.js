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
  tbody.innerHTML = ITEMS.map((item, i) => `
    <tr data-item-index="${i}">
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

  tbody.querySelectorAll('tr').forEach(row => {
    row.addEventListener('click', () => {
      const idx = parseInt(row.dataset.itemIndex, 10);
      openFlyout(ITEMS[idx]);
    });
  });
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

// ── FLYOUT ────────────────────────────────────────────────────────────
const overlay   = document.getElementById('flyout-overlay');
const flyout    = document.getElementById('edit-flyout');
const stockSel  = document.getElementById('f-stock');
const stockBadge = document.getElementById('f-stock-badge');

function openFlyout(item) {
  // Populate fields
  document.getElementById('f-item-name').value   = item.name;
  document.getElementById('f-item-code').value   = item.code;
  document.getElementById('f-prep-ticket').value  = item.name;
  document.getElementById('f-receipt-name').value = item.name;

  const rawPrice = parseFloat(item.price.replace('$', ''));
  document.getElementById('f-price').value     = rawPrice.toFixed(2);
  document.getElementById('f-price-tax').value = (rawPrice * 1.16).toFixed(2);

  // Display On checkboxes
  const display = item.displayOn;
  document.getElementById('f-show-pos').checked   = display.includes('POS');
  document.getElementById('f-show-olo').checked   = display.includes('OLO');
  document.getElementById('f-show-kiosk').checked = display.includes('KIOSK');

  // Stock tab
  const stockVal = item.inStock ? 'in' : 'out';
  stockSel.value = stockVal;
  updateStockBadge(stockVal);

  // Reset to details tab
  switchFlyoutTab('details');

  overlay.classList.add('open');
  flyout.classList.add('open');
}

function closeFlyout() {
  overlay.classList.remove('open');
  flyout.classList.remove('open');
}

function switchFlyoutTab(tabId) {
  document.querySelectorAll('.flyout-tab').forEach(t =>
    t.classList.toggle('active', t.dataset.flyoutTab === tabId)
  );
  document.querySelectorAll('.flyout-tab-content').forEach(c =>
    c.classList.toggle('active', c.id === 'flyout-tab-' + tabId)
  );
  document.getElementById('flyout-footer-details').style.display = tabId === 'details' ? '' : 'none';
  document.getElementById('flyout-footer-stock').style.display   = tabId === 'stock'   ? '' : 'none';
}

function updateStockBadge(val) {
  const labels = { in: 'In Stock', out: 'Out of Stock', limited: 'Limited' };
  const classes = { in: 'badge-in-stock', out: 'badge-out-of-stock', limited: 'badge-limited' };
  stockBadge.textContent = labels[val] || 'In Stock';
  stockBadge.className = 'flyout-stock-badge ' + (classes[val] || 'badge-in-stock');
}

// Flyout tab switching
document.querySelectorAll('.flyout-tab').forEach(tab => {
  tab.addEventListener('click', () => switchFlyoutTab(tab.dataset.flyoutTab));
});

// Close handlers
overlay.addEventListener('click', closeFlyout);
document.getElementById('flyout-close-btn').addEventListener('click', closeFlyout);
document.querySelectorAll('.flyout-cancel-btn').forEach(btn =>
  btn.addEventListener('click', closeFlyout)
);

// Stock badge live update
stockSel.addEventListener('change', () => updateStockBadge(stockSel.value));

// ── INIT ──────────────────────────────────────────────────────────────
renderItems();
navigate('items');
