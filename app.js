// define UI vars

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners

const loadEventListeners = () => {
    //add task event
    form.addEventListener('submit', addTask);
}

//Add Task
const addTask = (e) => {
    if(taskInput.value === ''){
        alert("Add a task");
    } 

    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
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

    //clear input
    taskInput.value = '';

    e.preventDefault();
}

loadEventListeners();