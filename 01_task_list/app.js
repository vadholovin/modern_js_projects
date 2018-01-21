// Define UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const taskInput = document.querySelector('#task');
const filter = document.querySelector('#filter');

// load all event listeners
loadEventListeners();

// load all event listeners
function loadEventListeners() {
  // add task event
  form.addEventListener('submit', addTask);
}

// Add task
function addTask(e) {
  // Prevent adding empty entry
  if (taskInput.value === '') {
    alert('Add a task');
  } else {
    createAndAddTask();
  }

  e.preventDefault();

  function createAndAddTask() {
    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create link
    const link = document.createElement('a');
    // Set attribute href
    link.setAttribute('href', '#');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon
    link.innerHTML = '<i class="fa fa-remove"></li>';
    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);

    // Clear input
    taskInput.value = '';
  }
}