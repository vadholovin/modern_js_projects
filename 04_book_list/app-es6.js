/*----------------------------------------------------*/
/*  CLASSES
/*----------------------------------------------------*/

// Book class
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}


// UI class
class UI {
  addBook(book) {
    // Get list
    const list = document.getElementById('book-list');
    
    // Create row (tr)
    const row = document.createElement('tr');
    
    // Add content to row
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="delete">X</a></td>
    `;
    
    // Add row to list
    list.appendChild(row);
  }

  showAlert(message, className) {
    // Create div
    const div = document.createElement('div');
    div.className = className;
    
    // Add text
    div.appendChild(document.createTextNode(message));

    // Get place to insert div
    const container = document.querySelector('.container'),
          form = document.querySelector('#book-form');

    // Insert div
    container.insertBefore(div, form);

    // Remove div after 3 sec
    setTimeout(function(){
      div.remove();
    }, 3000);
  }

  deleteBook(target) {
    target.parentElement.parentElement.remove();
  }

  static clearList() {
    document.getElementById('book-list').innerHTML = '';
  }
}


// LS class
class Store {
  static getBook() {
    var books;

    // Check if books are in LS
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static displayBook() {
    const books = Store.getBook();
    const ui = new UI();

    books.forEach(function(book) {
      ui.addBook(book);
    });
  }

  static addBookToLS(book) {
    const books = Store.getBook();

    books.push(book);

    // Update LS
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBookFromLS(isbn) {
    const books = Store.getBook();

    books.forEach(function(book, index) {
      if (book.isbn == isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeAllBooks() {
    delete localStorage.books;
  }
}


/*----------------------------------------------------*/
/*  EVENT LISTENERS
/*----------------------------------------------------*/

// Event listener for DOM load
document.addEventListener('DOMContentLoaded', Store.displayBook);


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

  // Validate form fields
  if (title === '' || author === '' || isbn === '') {
    // Error alert
    ui.showAlert('Please fill in all fields', 'error');
  } else {
    // Add book to list
    ui.addBook(book);

    // Add book to LS
    Store.addBookToLS(book);

    // Success alert
    ui.showAlert('Book added!', 'success');

    // Clear fields
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }

  e.preventDefault();
});

// Event listener for deleting book
document.getElementById('book-list').addEventListener('click', function(e) {
  
  // Instantiate UI
  const ui = new UI();

  if (e.target.classList.contains('delete')) {
    const warning = confirm('Delete book?');
    
    if (warning == true) {
      // Delete book
      ui.deleteBook(e.target);

      // Remove book from LS
      Store.removeBookFromLS(e.target.parentElement.previousElementSibling.textContent);

      // Show alert
      ui.showAlert('Book removed!', 'success');
    }
  }

  e.preventDefault();
});

// Event listener for clearing list
document.getElementById('clear').addEventListener('click', function(e) {
  const warning = confirm('Clear whole list?');

  if (warning == true) {
    UI.clearList();
    Store.removeAllBooks();
  }

  e.preventDefault();
});