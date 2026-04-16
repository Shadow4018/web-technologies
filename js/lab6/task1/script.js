'use strict';

/**
 * 1. ЧИСТІ ФУНКЦІЇ (PURE FUNCTIONS)
 */
const addProduct = (products, productData) => {
    const newProduct = {
        id: crypto.randomUUID().slice(0, 8), 
        name: productData.productName,
        price: parseFloat(productData.productPrice),
        category: productData.productCategory,
        image: productData.productImage,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    return [...products, newProduct];
};

const deleteProduct = (products, productId) => {
    return products.filter(product => product.id !== productId);
};

const updateProduct = (products, productId, productData) => {
    return products.map(product => 
        product.id === productId 
            ? { 
                ...product, 
                ...productData, 
                price: parseFloat(productData.productPrice),
                updatedAt: new Date().toISOString() 
              }
            : product
    );
};

const calculateTotalPrice = (products) => {
    return products.reduce((total, p) => total + p.price, 0).toFixed(2);
};

const getProcessedProducts = (products, filter, sort) => {
    let result = filter === 'all' ? [...products] : products.filter(p => p.category === filter);

    if (sort) {
        result.sort((a, b) => {
            if (sort === 'price') return a.price - b.price;
            if (sort === 'createdAt') return new Date(a.createdAt) - new Date(b.createdAt);
            if (sort === 'updatedAt') return new Date(a.updatedAt) - new Date(b.updatedAt);
            return 0;
        });
    }
    return result;
};

/**
 * 2. УПРАВЛІННЯ СТАНОМ ТА ЕЛЕМЕНТИ
 */
let state = {
    products: [],
    currentFilter: 'all',
    currentSort: null,
    editingId: null
};

const elements = {
    list: document.getElementById('js-product-list'),
    totalPrice: document.getElementById('js-total-price'),
    emptyMsg: document.getElementById('js-empty-message'),
    modal: document.getElementById('js-modal'),
    modalTitle: document.getElementById('js-modal-title'),
    form: document.getElementById('js-product-form'),
    snackbar: document.getElementById('js-snackbar'),
    addBtn: document.getElementById('js-add-product-btn'),
    closeModalBtn: document.getElementById('js-close-modal')
};

/**
 * 3. ФУНКЦІЇ ВІДОБРАЖЕННЯ (RENDER)
 */
const showSnackbar = (message) => {
    elements.snackbar.textContent = message;
    elements.snackbar.classList.add('show');
    setTimeout(() => elements.snackbar.classList.remove('show'), 3000);
};

const render = () => {
    const filtered = getProcessedProducts(state.products, state.currentFilter, state.currentSort);
    
    // Показуємо/ховаємо повідомлення про пустий список [cite: 23]
    elements.emptyMsg.style.display = filtered.length === 0 ? 'block' : 'none';
    
    // Очищуємо список та рендеримо картки [cite: 13, 28]
    elements.list.innerHTML = '';
    filtered.forEach(product => {
        const card = document.createElement('article');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <p class="product-id">ID: ${product.id}</p>
                <h3>${product.name}</h3>
                <p class="product-category">${product.category}</p>
                <p><strong>${product.price} ₴</strong></p>
                <div class="button-group">
                    <button class="btn btn-outline js-edit" data-id="${product.id}">Редагувати</button>
                    <button class="btn btn-primary js-delete" data-id="${product.id}">Видалити</button>
                </div>
            </div>
        `;
        elements.list.appendChild(card);
    });

    elements.totalPrice.textContent = calculateTotalPrice(state.products);
};

/**
 * 4. ОБРОБНИКИ ПОДІЙ (EVENT LISTENERS)
 */

// Відкриття модального вікна для додавання
elements.addBtn.addEventListener('click', () => {
    state.editingId = null;
    elements.modalTitle.textContent = "Додати новий товар";
    elements.form.reset();
    elements.modal.classList.add('active');
});

// Закриття модального вікна
elements.closeModalBtn.addEventListener('click', () => {
    elements.modal.classList.remove('active');
});

// Сабміт форми (Додавання або Редагування) [cite: 22, 33]
elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(elements.form);
    const data = Object.fromEntries(formData.entries());

    if (state.editingId) {
        state.products = updateProduct(state.products, state.editingId, data);
        showSnackbar(`Оновлено: ${state.editingId} - ${data.productName}`);
    } else {
        state.products = addProduct(state.products, data);
        showSnackbar("Товар успішно додано!");
    }

    elements.modal.classList.remove('active');
    render();
});

// Видалення та Редагування (через делегування подій) [cite: 30, 33]
elements.list.addEventListener('click', (e) => {
    const id = e.target.dataset.id;
    if (!id) return;

    if (e.target.classList.contains('js-delete')) {
        const card = e.target.closest('.product-card');
        card.classList.add('removing'); // Анімація 
        setTimeout(() => {
            state.products = deleteProduct(state.products, id);
            render();
            showSnackbar("Товар видалено!");
        }, 400);
    }

    if (e.target.classList.contains('js-edit')) {
        const product = state.products.find(p => p.id === id);
        state.editingId = id;
        elements.modalTitle.textContent = "Редагувати товар";
        
        // Заповнюємо форму даними
        elements.form.productName.value = product.name;
        elements.form.productPrice.value = product.price;
        elements.form.productCategory.value = product.category;
        elements.form.productImage.value = product.image;
        
        elements.modal.classList.add('active');
    }
});

// Фільтрація [cite: 40, 41]
document.getElementById('js-filter-buttons').addEventListener('click', (e) => {
    if (e.target.classList.contains('btn')) {
        state.currentFilter = e.target.dataset.category;
        
        // Оновлення активної кнопки
        document.querySelectorAll('#js-filter-buttons .btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        
        render();
    }
});

// Сортування [cite: 44, 46]
document.querySelectorAll('[data-sort]').forEach(button => {
    button.addEventListener('click', (e) => {
        state.currentSort = e.target.dataset.sort;
        render();
    });
});

// Скидання [cite: 42, 47]
document.getElementById('js-reset-filter').addEventListener('click', () => {
    state.currentFilter = 'all';
    render();
});

document.getElementById('js-reset-sort').addEventListener('click', () => {
    state.currentSort = null;
    render();
});

// Ініціалізація
render();

// Функція для візуального перемикання активної кнопки (хелпер)
const updateActiveFilterButton = (category) => {
    const buttons = document.querySelectorAll('#js-filter-buttons .btn');
    buttons.forEach(btn => {
        if (btn.dataset.category === category) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
};

// Оновлений обробник кліку по кнопках фільтрації
document.getElementById('js-filter-buttons').addEventListener('click', (e) => {
    if (e.target.classList.contains('btn')) {
        state.currentFilter = e.target.dataset.category; // 
        updateActiveFilterButton(state.currentFilter);
        render();
    }
});

// Оновлений обробник скидання фільтра
document.getElementById('js-reset-filter').addEventListener('click', () => {
    state.currentFilter = 'all'; // 
    updateActiveFilterButton('all');
    render();
});

/**
 * ХЕЛПЕР ДЛЯ ВІЗУАЛЬНОГО ОНОВЛЕННЯ КНОПОК СОРТУВАННЯ
 */
const updateActiveSortButton = (sortType) => {
    const sortButtons = document.querySelectorAll('[data-sort]');
    sortButtons.forEach(btn => {
        if (btn.dataset.sort === sortType) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
};

/**
 * ОБРОБНИКИ ПОДІЙ ДЛЯ СОРТУВАННЯ [cite: 46]
 */
document.querySelectorAll('[data-sort]').forEach(button => {
    button.addEventListener('click', (e) => {
        // Встановлюємо тип сортування у стан
        state.currentSort = e.target.dataset.sort; 
        
        // Оновлюємо вигляд кнопок
        updateActiveSortButton(state.currentSort);
        
        // Перемальовуємо список [cite: 46]
        render();
    });
});

/**
 * СКИНУТИ СОРТУВАННЯ 
 */
document.getElementById('js-reset-sort').addEventListener('click', () => {
    state.currentSort = null;
    updateActiveSortButton(null);
    render();
});