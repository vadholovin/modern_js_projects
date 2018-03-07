// Book constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI constructor
function UI() {}

// Add book to list
UI.prototype.addBook = function(book) {
  
  // Get list (tbody)
  const list = document.getElementById('book-list');

  // Create list item (tr)
  const row = document.createElement('tr');
  
  // Add content to list item
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
  `;

  // Add item to list
  list.appendChild(row);
};

// Delete book from list
UI.prototype.deleteBook = function(target) {
  target.parentElement.parentElement.remove();
};

// Show alert
UI.prototype.showAlert = function(message, className) {
  
  // Create div
  const div = document.createElement('div');

  // Add class
  div.className = className;

  // Add message to div
  div.appendChild(document.createTextNode(message));

  // Get container
  const container = document.querySelector('.container');
  
  // Get form
  const form = document.querySelector('#book-form');

  // Insert div
  container.insertBefore(div, form);

  // Hide after 3 sec
  setTimeout(function() {
    div.remove();
  }, 3000);
};


// Local Storage constructor
function Store() {}

// Get book(s) from LS
Store.getBook = function() {
  var books;
  
  // Check if books are available
  if (localStorage.getItem('books') === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem('books'));
  }

  return books;
};

// Display books
Store.displayBooks = function() {
  const books = Store.getBook();
  const ui = new UI();

  books.forEach(function(book) {
    ui.addBook(book);
  });
};

// Add book to LS
Store.addBookToLS = function(book) {
  const books = Store.getBook();
  
  books.push(book);

  // Update LS
  localStorage.setItem('books', JSON.stringify(books));
};

// Remove book from LS
Store.removeBookFromLS = function(isbn) {
  const books = Store.getBook();

  books.forEach(function(book, index) {
    if (book.isbn === isbn) {
      books.splice(index, 1);
    }
  });

  // Update LS
  localStorage.setItem('books', JSON.stringify(books));
};

// Remove all books from LS
Store.clearBookList = function() {
  delete localStorage.books;
};


// Event listener for DOM load
document.addEventListener('DOMContentLoaded', Store.displayBooks);

// Event listener for adding book
document.getElementById('book-form').addEventListener('submit', function(e) {
  
  // Get form values
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;

  // Instantiate Book
  const book = new Book(title, author, isbn);
  // Instantiate UI
  const ui = new UI();

  // Validate form
  if (title === '' || author === '' || isbn === '') {
    // Error alert
    ui.showAlert('Please fill in all fields', 'error');
  } else {
    // Add book to list
    ui.addBook(book);

    // Add book to LS
    Store.addBookToLS(book);

    // Clear fields
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';

    // Success alert
    ui.showAlert('Book added!', 'success');
  }

  e.preventDefault();
});

// Event listener for deleting book
document.getElementById('book-list').addEventListener('click', function(e) {
  
  // Instantiate UI
  const ui = new UI();

  if (e.target.classList.contains('delete')) {
    // Delete book
    ui.deleteBook(e.target);

    // Remove book from LS
    Store.removeBookFromLS(e.target.parentElement.previousElementSibling.textContent);

    // Show alert
    ui.showAlert('Book removed!', 'success');
  }

  e.preventDefault();
});

// Event listener for clear list
document.getElementById('clear').addEventListener('click', function(e) {
  // Clear list
  document.getElementById('book-list').innerHTML = '';

  // Clear LS
  Store.clearBookList();
  
  e.preventDefault();
});