// ── SAMPLE DATA ──────────────────────────────────────────────────────
const ITEMS = [
  { name: '(1) Egg Classic Breakfast (2)',  code: 46,  price: '$5.00',  pos: true,  olo: true,  kiosk: true,  inStock: true,  catering: false, cateringName: '', cateringTaxCategory: '', quantityUnit: '', utensils: false },
  { name: '(1) French Toast 1',             code: 41,  price: '$2.00',  pos: true,  olo: true,  kiosk: true,  inStock: true,  catering: false, cateringName: '', cateringTaxCategory: '', quantityUnit: '', utensils: false },
  { name: '(2) Blueberry Pancakes',         code: 39,  price: '$5.50',  pos: true,  olo: true,  kiosk: true,  inStock: true,  catering: false, cateringName: '', cateringTaxCategory: '', quantityUnit: '', utensils: false },
  { name: '(2) French Toast',               code: 42,  price: '$3.00',  pos: true,  olo: true,  kiosk: true,  inStock: true,  catering: false, cateringName: '', cateringTaxCategory: '', quantityUnit: '', utensils: false },
  { name: '(2) Jalapenos',                  code: 231, price: '$0.99',  pos: true,  olo: true,  kiosk: true,  inStock: true,  catering: false, cateringName: '', cateringTaxCategory: '', quantityUnit: '', utensils: false },
  { name: '(3) Avocado Toast',              code: 57,  price: '$8.00',  pos: true,  olo: true,  kiosk: true,  inStock: true,  catering: false, cateringName: '', cateringTaxCategory: '', quantityUnit: '', utensils: false },
  { name: '(3) Bacon & Eggs',               code: 58,  price: '$7.50',  pos: true,  olo: true,  kiosk: false, inStock: false,  catering: false, cateringName: '', cateringTaxCategory: '', quantityUnit: '', utensils: false },
  { name: '(4) Belgian Waffle',             code: 63,  price: '$6.00',  pos: true,  olo: true,  kiosk: true,  inStock: true,  catering: false, cateringName: '', cateringTaxCategory: '', quantityUnit: '', utensils: false },
  { name: '(4) Breakfast Burrito',          code: 64,  price: '$9.00',  pos: true,  olo: false, kiosk: true,  inStock: true,  catering: false, cateringName: '', cateringTaxCategory: '', quantityUnit: '', utensils: false },
  { name: '(5) Cinnamon Roll',              code: 71,  price: '$4.50',  pos: true,  olo: true,  kiosk: true,  inStock: true,  catering: false, cateringName: '', cateringTaxCategory: '', quantityUnit: '', utensils: false },
  { name: '(5) Cold Brew Coffee',           code: 72,  price: '$4.00',  pos: true,  olo: true,  kiosk: true,  inStock: true,  catering: false, cateringName: '', cateringTaxCategory: '', quantityUnit: '', utensils: false },
  { name: '(6) Denver Omelette',            code: 83,  price: '$10.00', pos: true,  olo: true,  kiosk: true,  inStock: false, catering: false, cateringName: '', cateringTaxCategory: '', quantityUnit: '', utensils: false },
  { name: '(6) Fresh Orange Juice',         code: 88,  price: '$3.50',  pos: true,  olo: true,  kiosk: true,  inStock: true,  catering: false, cateringName: '', cateringTaxCategory: '', quantityUnit: '', utensils: false },
  { name: '(7) Greek Yogurt Parfait',       code: 92,  price: '$5.00',  pos: false, olo: true,  kiosk: true,  inStock: true,  catering: false, cateringName: '', cateringTaxCategory: '', quantityUnit: '', utensils: false },
  { name: '(7) Ham & Cheese Omelette',      code: 96,  price: '$8.50',  pos: true,  olo: true,  kiosk: true,  inStock: true,  catering: false, cateringName: '', cateringTaxCategory: '', quantityUnit: '', utensils: false },
];

// ── STATE ─────────────────────────────────────────────────────────────
let currentView = 'grid';
let currentItemIndex = -1;

// ── HELPERS ───────────────────────────────────────────────────────────
function getDisplayString(item) {
  const parts = [];
  if (item.pos)      parts.push('POS');
  if (item.olo)      parts.push('OLO');
  if (item.kiosk)    parts.push('KIOSK');
  if (item.catering) parts.push('CATERING');
  return parts.join(', ') || '—';
}

// ── RENDER ITEMS TABLE ────────────────────────────────────────────────
function renderItems() {
  const tbody = document.getElementById('items-tbody');

  const list = currentView === 'catering'
    ? ITEMS.filter(item => item.catering)
    : ITEMS;

  if (list.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" style="text-align:center;padding:48px 0;color:#bbb;font-size:14px">
          No catering items yet. Click any item row and check <strong>Catering</strong> under "Show This Item On".
        </td>
      </tr>`;
    return;
  }

  tbody.innerHTML = list.map(item => {
    const realIndex = ITEMS.indexOf(item);
    return `
      <tr data-item-index="${realIndex}">
        <td class="col-name">${item.name}</td>
        <td class="col-code">${item.code}</td>
        <td class="col-price">${item.price}</td>
        <td class="col-display">${getDisplayString(item)}</td>
        <td class="col-stock">
          <span class="badge ${item.inStock ? 'badge-in-stock' : 'badge-out-of-stock'}">
            ${item.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </td>
      </tr>`;
  }).join('');

  tbody.querySelectorAll('tr[data-item-index]').forEach(row => {
    row.addEventListener('click', () => {
      const idx = parseInt(row.dataset.itemIndex, 10);
      if (isNaN(idx)) return;
      openFlyout(idx);
    });
  });
}

// ── NAVIGATION ────────────────────────────────────────────────────────
function navigate(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById('page-' + pageId);
  if (target) target.classList.add('active');
  document.querySelectorAll('.nav-sub-item').forEach(el =>
    el.classList.toggle('active', el.dataset.page === pageId)
  );
  document.querySelectorAll('.nav-item').forEach(el =>
    el.classList.toggle('active', el.dataset.page === pageId)
  );
}

// ── BIND SIDEBAR CLICKS ───────────────────────────────────────────────
document.querySelectorAll('[data-page]').forEach(el => {
  el.addEventListener('click', () => navigate(el.dataset.page));
});

// ── VIEW TOGGLE ───────────────────────────────────────────────────────
document.querySelectorAll('.view-btn[data-view]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentView = btn.dataset.view;
    renderItems();
  });
});

// ── FLYOUT ────────────────────────────────────────────────────────────
const overlay    = document.getElementById('flyout-overlay');
const flyout     = document.getElementById('edit-flyout');
const stockSel   = document.getElementById('f-stock');
const stockBadge = document.getElementById('f-stock-badge');

function openFlyout(index) {
  currentItemIndex = index;
  const item = ITEMS[index];

  document.getElementById('f-item-name').value    = item.name;
  document.getElementById('f-item-code').value    = item.code;
  document.getElementById('f-prep-ticket').value  = item.name;
  document.getElementById('f-receipt-name').value = item.name;

  const rawPrice = parseFloat(item.price.replace('$', ''));
  document.getElementById('f-price').value     = rawPrice.toFixed(2);
  document.getElementById('f-price-tax').value = (rawPrice * 1.16).toFixed(2);

  document.getElementById('f-show-pos').checked      = item.pos;
  document.getElementById('f-show-olo').checked      = item.olo;
  document.getElementById('f-show-kiosk').checked    = item.kiosk;
  document.getElementById('f-show-catering').checked = item.catering;

  document.getElementById('f-catering-name').value          = item.cateringName || '';
  document.getElementById('f-catering-tax-category').value  = item.cateringTaxCategory || '';
  document.getElementById('f-catering-quantity-unit').value = item.quantityUnit || '';
  document.getElementById('f-catering-utensils').checked    = item.utensils || false;
  document.getElementById('catering-fields-section').style.display = item.catering ? '' : 'none';

  const stockVal = item.inStock ? 'in' : 'out';
  stockSel.value = stockVal;
  updateStockBadge(stockVal);

  switchFlyoutTab('details');
  overlay.classList.add('open');
  flyout.classList.add('open');
}

function closeFlyout() {
  overlay.classList.remove('open');
  flyout.classList.remove('open');
  currentItemIndex = -1;
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
  const labels  = { in: 'In Stock', out: 'Out of Stock', limited: 'Limited' };
  const classes = { in: 'badge-in-stock', out: 'badge-out-of-stock', limited: 'badge-limited' };
  stockBadge.textContent = labels[val] || 'In Stock';
  stockBadge.className   = 'flyout-stock-badge ' + (classes[val] || 'badge-in-stock');
}

// Live-update Display On when "Show This Item On" checkboxes change
['f-show-pos', 'f-show-olo', 'f-show-kiosk', 'f-show-catering'].forEach(id => {
  document.getElementById(id).addEventListener('change', () => {
    if (currentItemIndex < 0) return;
    const item = ITEMS[currentItemIndex];
    item.pos      = document.getElementById('f-show-pos').checked;
    item.olo      = document.getElementById('f-show-olo').checked;
    item.kiosk    = document.getElementById('f-show-kiosk').checked;
    item.catering = document.getElementById('f-show-catering').checked;
    document.getElementById('catering-fields-section').style.display = item.catering ? '' : 'none';
    renderItems();
  });
});

// Live-update catering fields
['f-catering-name', 'f-catering-tax-category', 'f-catering-quantity-unit', 'f-catering-utensils'].forEach(id => {
  document.getElementById(id).addEventListener('change', () => {
    if (currentItemIndex < 0) return;
    const item = ITEMS[currentItemIndex];
    item.cateringName        = document.getElementById('f-catering-name').value;
    item.cateringTaxCategory = document.getElementById('f-catering-tax-category').value;
    item.quantityUnit        = document.getElementById('f-catering-quantity-unit').value;
    item.utensils            = document.getElementById('f-catering-utensils').checked;
  });
});

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
