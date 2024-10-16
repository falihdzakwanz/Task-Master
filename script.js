const todoList = document.getElementById('todo-list');
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoButton = document.getElementById('todo-button');

const mobileMenu = document.querySelector('.mobile-menu');
const nav = document.querySelector('nav');

let todos = [];

document.addEventListener('DOMContentLoaded', () => {
    loadTodos();
    renderTodoList();
});

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
        todos = JSON.parse(storedTodos);
    }
}

todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const todoText = todoInput.value.trim();
    if (todoText) {
        const todo = {
            text: todoText,
            completed: false
        };
        todos.push(todo);
        todoInput.value = '';
        saveTodos()
        renderTodoList();
    }
});

function renderTodoList() {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        const todoItem = document.createElement('li');
        todoItem.classList.add('todo-item');
        todoItem.textContent = todo.text;
        if (todo.completed) {
            todoItem.style.textDecoration = 'line-through';
            const undoButton = document.createElement('img');
            undoButton.setAttribute('src', 'assets/back-arrow.png')

            undoButton.addEventListener('click', function () {
                todo.completed = false;
                saveTodos()
                renderTodoList();
            });
            todoItem.append(undoButton);
        } else {
            const checkButton = document.createElement('img');
            checkButton.setAttribute('src', 'assets/check.png')
            checkButton.addEventListener('click', function () {
                todo.completed = true;
                saveTodos()
                renderTodoList();
            });
            todoItem.append(checkButton);
        }
        todoList.appendChild(todoItem);
    });
}

todoList.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
        const todoIndex = Array.prototype.indexOf.call(todoList.children, e.target);
        todos[todoIndex].completed = !todos[todoIndex].completed;
        renderTodoList();
    }
});

mobileMenu.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
});