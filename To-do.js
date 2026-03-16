
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};


const renderTasks = () => {
   
    taskList.innerHTML = ''; 

    
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


const addTask = () => {
    const taskText = taskInput.value.trim();
    
    if (taskText !== '') {
        tasks.push(taskText);
        saveTasks();
        renderTasks();
        taskInput.value = ''; 
    }
};


const deleteTask = (index) => {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
};


const editTask = (index) => {
    const currentTask = tasks[index];
    const updatedTask = prompt('Edit your task:', currentTask);
    
    
    if (updatedTask !== null && updatedTask.trim() !== '') {
        tasks[index] = updatedTask.trim();
        saveTasks();
        renderTasks();
    }
};


addBtn.addEventListener('click', addTask);


taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});


taskList.addEventListener('click', (e) => {
   
    const index = e.target.dataset.index;
    
    if (e.target.classList.contains('delete-btn')) {
        deleteTask(index);
    } else if (e.target.classList.contains('edit-btn')) {
        editTask(index);
    }
});


renderTasks();