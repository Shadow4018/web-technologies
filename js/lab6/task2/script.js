

const createTask = (tasks, text) => [
    ...tasks, 
    { 
        id: Date.now(), 
        text, 
        completed: false, 
        createdAt: new Date(), 
        updatedAt: new Date() 
    }
];

const removeTask = (tasks, id) => tasks.filter(t => t.id !== id);

const toggleTaskStatus = (tasks, id) => tasks.map(t => 
    t.id === id ? { ...t, completed: !t.completed, updatedAt: new Date() } : t
);

const updateTaskText = (tasks, id, newText) => tasks.map(t => 
    t.id === id ? { ...t, text: newText, updatedAt: new Date() } : t
);

const sortTasks = (tasks, criteria) => {
    const sorted = [...tasks];
    if (criteria === 'createdAt') return sorted.sort((a, b) => b.createdAt - a.createdAt);
    if (criteria === 'completed') return sorted.sort((a, b) => a.completed - b.completed);
    if (criteria === 'updatedAt') return sorted.sort((a, b) => b.updatedAt - a.updatedAt);
    return sorted;
};

let state = {
    tasks: [],
    currentSort: 'createdAt'
};

const elements = {
    list: document.getElementById('js-todo-list'),
    form: document.getElementById('js-todo-form'),
    input: document.getElementById('js-todo-input')
};

const render = () => {
    const processedTasks = sortTasks(state.tasks, state.currentSort);
    
    elements.list.innerHTML = '';
    processedTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `todo-item ${task.completed ? 'completed' : ''}`;
        li.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} class="js-toggle" data-id="${task.id}">
            <span class="todo-text" contenteditable="true" data-id="${task.id}">${task.text}</span>
            <button class="btn-delete js-delete" data-id="${task.id}">&times;</button>
        `;
        elements.list.appendChild(li);
    });
};

elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    state.tasks = createTask(state.tasks, elements.input.value);
    elements.input.value = '';
    render();
});

elements.list.addEventListener('click', (e) => {
    const id = Number(e.target.dataset.id);
    if (!id) return;

    // Видалення [cite: 65]
    if (e.target.classList.contains('js-delete')) {
        const item = e.target.closest('.todo-item');
        item.classList.add('removing');
        setTimeout(() => {
            state.tasks = removeTask(state.tasks, id);
            render();
        }, 300);
    }

    if (e.target.classList.contains('js-toggle')) {
        state.tasks = toggleTaskStatus(state.tasks, id);
        render();
    }
});

elements.list.addEventListener('blur', (e) => {
    if (e.target.classList.contains('todo-text')) {
        const id = Number(e.target.dataset.id);
        state.tasks = updateTaskText(state.tasks, id, e.target.textContent);
        render();
    }
}, true);
 
document.querySelectorAll('[data-sort]').forEach(btn => {
    btn.addEventListener('click', (e) => {
        state.currentSort = e.target.dataset.sort;
        document.querySelectorAll('[data-sort]').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        render();
    });
});

render();