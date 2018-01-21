// Define UI variables
const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const taskList = document.querySelector('.collection');
const filter = document.querySelector('#filter');;
const clearBtn = document.querySelector('.clear-tasks');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // DOM Load event
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add task event
  form.addEventListener('submit', addTask);
  // Remove task event
  taskList.addEventListener('click', removeTask);
  // Clear tasks event
  clearBtn.addEventListener('click', clearTasks);
  // Filter tasks
  filter.addEventListener('keyup', filterTasks);
}

// Get tasks from local storage
function getTasks() {
  let tasks;

  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task) {
    const li = document.createElement('li');
    const deleteBtn = document.createElement('a');
    
    // Add attr, class and icon to delete button
    deleteBtn.setAttribute('href', '#');
    deleteBtn.className = 'delete-item secondary-content';
    deleteBtn.innerHTML = '<i class="fa fa-remove"></i>';

    // Add class to li
    li.className = 'collection-item';
    // Append taskText and deleteBtn to li
    li.appendChild(document.createTextNode(task));
    li.appendChild(deleteBtn);

    // Append li to ul
    taskList.appendChild(li);
  })
}

// Add task
function addTask(e) {
  if (!taskInput.value) {
    alert('Add a task');
  } else {
    createAndAddTask();
  }

  function createAndAddTask() {
    const li = document.createElement('li');
    const taskText = taskInput.value;
    const deleteBtn = document.createElement('a');
    
    // Add attr, class and icon to delete button
    deleteBtn.setAttribute('href', '#');
    deleteBtn.className = 'delete-item secondary-content';
    deleteBtn.innerHTML = '<i class="fa fa-remove"></i>';

    // Add class to li
    li.className = 'collection-item';
    // Append taskText and deleteBtn to li
    li.appendChild(document.createTextNode(taskText));
    li.appendChild(deleteBtn);

    // Append li to ul
    taskList.appendChild(li);

    // Store to localStorage
    storeTaskInLocalStorage(taskText);

    // Clear task input
    taskInput.value = '';
  }

  e.preventDefault();
}

// Store task
function storeTaskInLocalStorage(task) {
  let tasks;

  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove task
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Remove this task?')) {
      e.target.parentElement.parentElement.remove();

      // Remove from Local storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }

  e.preventDefault();
}

// Remove from Local storage
function removeTaskFromLocalStorage(taskItem) {
  const tasks = JSON.parse(localStorage.getItem('tasks'));

  tasks.forEach(function(task, i) {
    if (task === taskItem.textContent) {
      tasks.splice(i, 1);
    }
  })

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear tasks
function clearTasks(e) {
  if (confirm('Remove all tasks?')) {
    while (taskList.firstChild) {
      taskList.firstChild.remove();
    }

    // Clear from Local storage
    clearTasksFromLocalStorage();
  }

  e.preventDefault();
}

// Clear tasks from Local storage
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// Filter tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  const lisList = document.querySelectorAll('.collection-item');

  lisList.forEach(function(task) {
    const itemText = task.firstChild.textContent.toLowerCase();

    if (itemText.indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}

