{
  'use strict';

  this.data = dataSource;

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

  let favoritesBooks = [];
  let filters = [];

  class BookList {

    constructor() {
      const thisBookList = this;

      thisBookList.getElements();
      thisBookList.renderRatings();
      thisBookList.renderBooksList();
      thisBookList.initAction();
    }

    getElements () {
      const thisBookList = this;

      thisBookList.dom = {};
      thisBookList.dom.filtersContainer = document.querySelector(select.containerOf.form);
      thisBookList.dom.bookList = document.querySelector(select.books.list);
    }

    renderRatings() {
      for (let book of dataSource.books) {
        const bookRating = book.rating;
        const ratingWidth = bookRating * 10;
        book.ratingWidth = ratingWidth;
        let ratingColor = '';
        if (bookRating < 6) {
          ratingColor = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
        } else if (bookRating > 6 && bookRating <= 8) {
          ratingColor = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
        } else if (bookRating > 8 && bookRating <= 9) {
          ratingColor = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
        } else if (bookRating > 9) {
          ratingColor = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
        }
        book.ratingBgc = ratingColor;
      }
    }

    renderBooksList() {
      for (let book of dataSource.books) {
        const codeHTML = templates.bookTemplate(book);
        const domElement = utils.createDOMFromHTML(codeHTML);
        const bookList = document.querySelector(select.books.list);
        bookList.appendChild(domElement);
      }
    }

    addToFavorites(clickedBook) {
      event.preventDefault();
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

    filterBooks(input) {
      if (input.checked) {
        filters.push(input.value);
      } else {
        const filterIndex = filters.indexOf(input.value);
        filters.splice(filterIndex, 1);
      }
    }

    hideBooks(){
      for (const book of dataSource.books){
        let shouldBeHidden = false;
        for (let filter of filters) {
          if (book.details[filter] === false && book.id) {
            shouldBeHidden = true;
          } else if (book.details[filter] === true && book.id) {
            shouldBeHidden = false;
          }
        }
        const bookImage = document.querySelector('.book__image[data-id="' + book.id + '"]');
        if (book.id && shouldBeHidden) {
          bookImage.classList.add('hidden');
        } else if (!shouldBeHidden) {
          bookImage.classList.remove('hidden');
        }
      }
    }

    initAction() {
      const thisBookList = this;

      thisBookList.dom.bookList.addEventListener('dblclick', (event) => {
        const bookLink = event.target.offsetParent;
        if (bookLink.classList.contains('book__image')){
          thisBookList.addToFavorites(bookLink);
        }
      });
    
      thisBookList.dom.filtersContainer.addEventListener('click', (event) => {
        const filterInput = event.target;
        if (filterInput.tagName === 'INPUT' && filterInput.getAttribute('type') === 'checkbox' && filterInput.getAttribute('name') === 'filter') {
          thisBookList.filterBooks(filterInput);
          thisBookList.hideBooks(filterInput);
        }
      });
    }
  }
  
  this.app = new BookList();
}























































