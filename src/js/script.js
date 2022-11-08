const select = {
  containerOf: {
    app: '.container',
    form: '.filters',
    books: '.books-panel',
  }, 
  books: {
    list: '.books-list',
    book: '.book',
    bookLink: 'a.book__image',
  },
  templateOf: {
    book: '#template-book',
  },
};

const templates = {
  bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
};

function renderBooksList() {
  for (let book of dataSource.books) {
    const codeHTML = templates.bookTemplate(book);
    const domElement = utils.createDOMFromHTML(codeHTML);
    const bookList = document.querySelector(select.books.list);
    bookList.appendChild(domElement);
  }
}
renderBooksList();

let favoritesBooks = [];
function addToFavorites(event) {
  event.preventDefault();
  let clickedBook = this;
  const bookId = clickedBook.getAttribute('data-id');
  const bookIndex = favoritesBooks.indexOf(bookId);
  if (bookIndex < 0) {
    clickedBook.classList.add('favorite');
    favoritesBooks.push(bookId);
  } else if (bookIndex >= 0) {
    clickedBook.classList.remove('favorite');
    favoritesBooks.splice(bookIndex, 1);
  }
}
  
function initAction() {
  const bookLink = document.querySelectorAll(select.books.bookLink);
  for (let link of bookLink) {
    link.addEventListener('dblclick', addToFavorites);
  }
}
initAction();























































