let products = new Map();
let orders = new Set();
let history = new WeakMap();
let processed = new WeakSet();

let idCounter = 1;

function addProduct(name, price, quantity) {
  let product = {
    id: idCounter++,
    name,
    price,
    quantity
  };

  products.set(product.id, product);
  history.set(product, [`Створено товар ${name}`]);

  console.log("Додано:", product);
}

function deleteProduct(id) {
  if (products.has(id)) {
    products.delete(id);
    console.log("Видалено товар з id:", id);
  }
}

function updateProduct(id, newPrice, newQty) {
  let product = products.get(id);

  if (!product) return;

  product.price = newPrice;
  product.quantity = newQty;

  let logs = history.get(product) || [];
  logs.push("Оновлено товар");
  history.set(product, logs);

  console.log("Оновлено:", product);
}

function findProduct(name) {
  for (let product of products.values()) {
    if (product.name === name) {
      console.log("Знайдено:", product);
      return product;
    }
  }
  console.log("Не знайдено");
}

function makeOrder(id, amount) {
  let product = products.get(id);

  if (!product || product.quantity < amount) {
    console.log("Недостатньо товару");
    return;
  }

  product.quantity -= amount;

  let order = { productId: id, amount };
  orders.add(order);

  processed.add(order);

  console.log("Замовлення оформлено:", order);
}

addProduct("Телефон", 10000, 5);
addProduct("Ноутбук", 30000, 3);

findProduct("Телефон");

updateProduct(1, 9000, 4);

makeOrder(1, 2);

deleteProduct(2);