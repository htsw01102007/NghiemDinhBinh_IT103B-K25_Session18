// ===== LOCALSTORAGE =====
const STORAGE_KEY = 'products_data';
let products = [];
let productIdCounter = 1;
let editingProductId = null;

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ products, productIdCounter }));
}
function loadData() {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (data) {
    products = data.products || [];
    productIdCounter = data.idCounter || 1;
  }
}

// ===== DOM ELEMENTS =====
const form = document.getElementById('productForm');
const nameEl = document.getElementById('productName');
const categoryEl = document.getElementById('productCategory');
const priceEl = document.getElementById('productPrice');
const quantityEl = document.getElementById('productQuantity');
const descEl = document.getElementById('productDescription');

const tableBody = document.getElementById('productTableBody');
const emptyState = document.getElementById('emptyState');
const totalProducts = document.getElementById('totalProducts');
const totalValue = document.getElementById('totalValue');
const totalQuantity = document.getElementById('totalQuantity');

const searchInput = document.getElementById('searchInput');
const filterCategory = document.getElementById('filterCategory');
const formTitle = document.getElementById('formTitle');
const submitBtn = document.getElementById('submitBtn');
const cancelBtn = document.getElementById('cancelBtn');
const clearAllBtn = document.getElementById('clearAllBtn');

// ===== INIT =====
function init() {
  loadData();
  renderProducts();
  updateStats();

  form.addEventListener('submit', handleSubmit);
  cancelBtn.addEventListener('click', resetForm);
  clearAllBtn.addEventListener('click', clearAll);
  searchInput.addEventListener('input', handleSearch);
  filterCategory.addEventListener('change', handleSearch);
}

// ===== FORM =====
function handleSubmit(e) {
  e.preventDefault();
  const name = nameEl.value.trim();
  const category = categoryEl.value;
  const price = parseFloat(priceEl.value);
  const quantity = parseInt(quantityEl.value);
  const desc = descEl.value.trim();

  if (!name || !category || isNaN(price) || isNaN(quantity) || price < 0 || quantity < 0) {
    alert('Vui lòng nhập đúng dữ liệu!');
    return;
  }

  if (editingProductId) {
    updateProduct(editingProductId, name, category, price, quantity, desc);
  } else {
    addProduct(name, category, price, quantity, desc);
  }
  resetForm();
}

// ===== CRUD =====
function addProduct(name, category, price, quantity, desc) {
  products.push({ id: productIdCounter++, name, category, price, quantity, description: desc });
  saveData(); renderProducts(); updateStats();
}
function updateProduct(id, name, category, price, quantity, desc) {
  const p = products.find(p => p.id === id);
  if (!p) return;
  Object.assign(p, { name, category, price, quantity, description: desc });
  saveData(); renderProducts(); updateStats();
}
function deleteProduct(id) {
  if (confirm('Xóa sản phẩm này?')) {
    products = products.filter(p => p.id !== id);
    saveData(); renderProducts(); updateStats();
    if (editingProductId === id) resetForm();
  }
}
function editProduct(id) {
  const p = products.find(p => p.id === id);
  if (!p) return;
  nameEl.value = p.name;
  categoryEl.value = p.category;
  priceEl.value = p.price;
  quantityEl.value = p.quantity;
  descEl.value = p.description || '';
  formTitle.textContent = 'Chỉnh Sửa Sản Phẩm';
  submitBtn.textContent = '💾 Cập Nhật';
  cancelBtn.style.display = 'block';
  editingProductId = id;
}
function resetForm() {
  form.reset();
  formTitle.textContent = 'Thêm Sản Phẩm Mới';
  submitBtn.textContent = '➕ Thêm Sản Phẩm';
  cancelBtn.style.display = 'none';
  editingProductId = null;
}
function clearAll() {
  if (confirm('Xóa tất cả sản phẩm?')) {
    products = []; productIdCounter = 1;
    saveData(); renderProducts(); updateStats();
  }
}

// ===== RENDER =====
function renderProducts(list = products) {
  tableBody.innerHTML = '';
  if (list.length === 0) { emptyState.classList.add('show'); return; }
  emptyState.classList.remove('show');
  list.forEach(p => {
    tableBody.innerHTML += `
      <tr>
        <td>${p.id}</td><td>${p.name}</td><td>${p.category}</td>
        <td>${formatPrice(p.price)}</td>
        <td>${p.quantity}</td><td>${p.description || 'Không có mô tả'}</td>
        <td>
            <div class=""action-buttons"">
              <button class="btn-edit" onclick="editProduct(${p.id})">✏️ Sửa</button>
              <button class="btn-delete" onclick="deleteProduct(${p.id})">🗑️ Xóa</button>
            </div>
        </td>
      </tr>`;
  });
}
function formatPrice(price) {
  return new Intl.NumberFormat('vi-VN',{style:'currency',currency:'VND'}).format(price);
}

// ===== SEARCH & FILTER =====
function handleSearch() {
  const term = searchInput.value.toLowerCase().trim();
  const cat = filterCategory.value;
  let list = products;
  if (term) list = list.filter(p => p.name.toLowerCase().includes(term) || p.description.toLowerCase().includes(term));
  if (cat) list = list.filter(p => p.category === cat);
  renderProducts(list);
}

// ===== STATS =====
function updateStats() {
  totalProducts.textContent = products.length;
  totalValue.textContent = formatPrice(products.reduce((s,p)=>s+p.price*p.quantity,0));
  totalQuantity.textContent = products.reduce((s,p)=>s+p.quantity,0);
}

// ===== START =====
init();
