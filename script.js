// Dark mode functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', currentTheme);

// Theme toggle event listener
themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Todo app functionality
const todoinput = document.getElementById("todo-input");
const addtaskbtn = document.getElementById("add-task-btn");
const todolist = document.getElementById("todo-list");

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Load tasks when page loads
document.addEventListener('DOMContentLoaded', function() {
    renderTasks();
});

addtaskbtn.addEventListener('click', function () {
        const tasktest = todoinput.value.trim()
        if (tasktest === "") return;
        const newtask = {
                id: Date.now(),
                text: tasktest,
                completed: false
        }
        tasks.push(newtask);
        saveTasks();
        todoinput.value = ""; //clear input
        renderTasks();
})

function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add Enter key support
todoinput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addtaskbtn.click();
    }
});

// Render tasks function
function renderTasks() {
    todolist.innerHTML = '';
    
    if (tasks.length === 0) {
        todolist.innerHTML = '<li class="empty-state">No tasks yet. Add one above!</li>';
        return;
    }
    
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        
        li.innerHTML = `
            <span class="todo-text">${task.text}</span>
            <div class="task-buttons">
                <button class="complete-btn" onclick="toggleComplete(${task.id})">
                    ${task.completed ? '↶' : '✓'}
                </button>
                <button class="edit-btn" onclick="editTask(${task.id})">
                    ✎
                </button>
                <button class="delete-btn" onclick="deleteTask(${task.id})">
                    ×
                </button>
            </div>
        `;
        
        todolist.appendChild(li);
    });
}

// Toggle task completion
function toggleComplete(id) {
    tasks = tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
    );
    saveTasks();
    renderTasks();
}

// Edit task
function editTask(id) {
    const task = tasks.find(task => task.id === id);
    if (task) {
        const newText = prompt('Edit task:', task.text);
        if (newText !== null && newText.trim() !== '') {
            tasks = tasks.map(task => 
                task.id === id ? { ...task, text: newText.trim() } : task
            );
            saveTasks();
            renderTasks();
        }
    }
}

// Delete task
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}