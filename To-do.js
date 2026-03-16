// 1. Select DOM Elements
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// 2. Initialize state from localStorage (or empty array if null)
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// 3. Helper function to save tasks to localStorage
const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

// 4. Render tasks to the DOM
const renderTasks = () => {
    // Clear the current list
    taskList.innerHTML = ''; 

    // Use ES6 template literals to generate HTML dynamically
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task}</span>
            <div class="action-btns">
                <button class="edit-btn" data-index="${index}">Edit</button>
                <button class="delete-btn" data-index="${index}">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    });
};

// 5. Add a new task
const addTask = () => {
    const taskText = taskInput.value.trim();
    
    if (taskText !== '') {
        tasks.push(taskText);
        saveTasks();
        renderTasks();
        taskInput.value = ''; // Clear input field
    }
};

// 6. Delete a task
const deleteTask = (index) => {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
};

// 7. Edit a task
const editTask = (index) => {
    const currentTask = tasks[index];
    const updatedTask = prompt('Edit your task:', currentTask);
    
    // Check if the user cancelled the prompt or left it blank
    if (updatedTask !== null && updatedTask.trim() !== '') {
        tasks[index] = updatedTask.trim();
        saveTasks();
        renderTasks();
    }
};

// 8. Event Listeners
addBtn.addEventListener('click', addTask);

// Allow pressing "Enter" to add a task
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

// Event Delegation for Edit and Delete buttons
taskList.addEventListener('click', (e) => {
    // Extract the index from the data-index attribute we set in HTML
    const index = e.target.dataset.index;
    
    if (e.target.classList.contains('delete-btn')) {
        deleteTask(index);
    } else if (e.target.classList.contains('edit-btn')) {
        editTask(index);
    }
});

// 9. Initial Render when page loads
renderTasks();