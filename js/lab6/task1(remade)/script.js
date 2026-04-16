let state = {
  products: [],
  filter: 'all',
  sort: null,
  editingId: null
};

const addProduct = (products, product) => [...products, product];

const deleteProduct = (products, id) =>
  products.filter(p => p.id !== id);

const updateProduct = (products, updated) =>
  products.map(p => p.id === updated.id ? updated : p);

const filterProducts = (products, filter) =>
  filter === 'all' ? products : products.filter(p => p.category === filter);

const sortProducts = (products, sort) => {
  if (!sort) return products;

  return [...products].sort((a, b) => {
    if (sort === 'price') return a.price - b.price;
    if (sort === 'created') return a.created - b.created;
    if (sort === 'updated') return a.updated - b.updated;
  });
};

const calcTotal = products =>
  products.reduce((sum, p) => sum + p.price, 0);

// UI
const render = () => {
  const list = document.getElementById('products');
  const empty = document.getElementById('empty');

  let data = filterProducts(state.products, state.filter);
  data = sortProducts(data, state.sort);

  list.innerHTML = '';

  if (data.length === 0) {
    empty.innerText = "Наразі список товарів пустий.";
  } else {
    empty.innerText = "";
  }

  data.forEach(p => {
    const div = document.createElement('div');
    div.className = 'card';

    div.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <p>ID: ${p.id}</p>
      <p>${p.name}</p>
      <p>${p.price} грн</p>
      <p>${p.category}</p>
      <button onclick="editProduct(${p.id})">Редагувати</button>
      <button onclick="removeProduct(${p.id})">Видалити</button>
    `;

    list.appendChild(div);
  });

  document.getElementById('total').innerText = calcTotal(state.products);
};

const showToast = (text) => {
  const toast = document.getElementById('toast');
  toast.innerText = text;
  toast.classList.add('show');

  setTimeout(() => toast.classList.remove('show'), 2000);
};

// ACTIONS
const openModal = () => {// vidkruv vikno pru add btn
  document.getElementById('modal').style.display = 'flex';
};

const closeModal = () => {
  document.getElementById('modal').style.display = 'none';
  document.getElementById('form').reset();
  state.editingId = null;
};

document.getElementById('form').onsubmit = (e) => {
  e.preventDefault();

  const product = {
    id: state.editingId ?? Date.now(),
    name: document.getElementById('name').value,
    price: Number(price.value),
    category: category.value,
    image: image.value,
    created: Date.now(),
    updated: Date.now()
  };

  if (state.editingId) {
    state.products = updateProduct(state.products, product);
    showToast(`Оновлено: ${product.name}`);
  } else {
    state.products = addProduct(state.products, product);
  }

  closeModal();
  render();
};

const removeProduct = (id) => {
  state.products = deleteProduct(state.products, id);
  render();
  showToast("Товар видалено");
};

const editProduct = (id) => {
  const p = state.products.find(p => p.id === id);

  name.value = p.name;
  price.value = p.price;
  category.value = p.category;
  image.value = p.image;

  state.editingId = id;
  openModal();
};

// FILTER
const setFilter = (f) => {
  state.filter = f;
  render();
};

// SORT
const setSort = (s) => {
  state.sort = s;
  render();
};

const resetSort = () => {
  state.sort = null;
  render();
};

// INIT
render();