// define UI vars

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners

const loadEventListeners = () => {
    // DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);    
    //add task event
    form.addEventListener('submit', addTask);
    // remove task event
    taskList.addEventListener('click', removeTask);
    // clear task event
    clearBtn.addEventListener('click', clearTasks);
    // filter tasks event
    filter.addEventListener('keyup', filterTasks);
}

// Get tasks from LS

const getTasks = () => {
    let tasks;
    if(localStorage.getItem('tasks') === null){
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach((task) => {
        // Create li element
        const li = document.createElement('li');
        // Add class
        li.className = 'collection-item';
        // Create text node and append to li
        li.appendChild(document.createTextNode(task));
        // Create new link element - for delete
        const link = document.createElement('a');
        // Add class
        link.className = 'delete-item secondary-content';
        //add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // Append the link to li
        li.appendChild(link);
        // Append li to ul
        taskList.appendChild(li);
    })

}

//Add Task
const addTask = (e) => {
    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item animated fadeInLeft';
    // Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link element - for delete
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    //add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);
    // Store in LS
    storeTaskInLocalStorage(taskInput.value);
    //clear input
    taskInput.value = '';

    e.preventDefault();
}

// Store in local storage

const storeTaskInLocalStorage = (task) => {
    let tasks;
    if(localStorage.getItem('tasks') === null){
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
  
    tasks.push(task);
  
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove task
const removeTask = (e) => {
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are you sure?')){
            e.target.parentElement.parentElement.remove();

            // Remove from LS
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }  
    }
}

// Remove from LS

const removeTaskFromLocalStorage = (taskItem) => {
    let tasks;
    if(localStorage.getItem('tasks') === null){
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach((task, index) => {
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

const clearTasks = () => {
    // taskList.innerHTML = '';

    // Faster
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    // Clear from LS
    localStorage.clear();
}


const filterTasks = (e) => {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach((task) =>{
        const item = task.firstChild.textContent;
        if(item.toLowerCase().includes(text)){
            task.style.display = 'block';
        } else{
            task.style.display = 'none';
        }
    })
}

loadEventListeners();