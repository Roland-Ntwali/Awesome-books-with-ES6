/* eslint-disable */
import { DateTime, Duration, FixedOffsetZone, IANAZone, Info, Interval, InvalidZone, Settings, SystemZone, VERSION, Zone } from "./module/luxon.js";
let bookArr = JSON.parse(localStorage.getItem('book')) || [];
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  addBook = () => {
    document.querySelector('.form').addEventListener('submit', () => {
      const title = document.getElementById('title').value;
      const author = document.getElementById('author').value;
      if (title && author) {
        const newBook = {
          title,
          author,
        };
        bookArr.push(newBook);
        localStorage.setItem('book', JSON.stringify(bookArr));
        this.showBooks();
      }
    });
  };

  showBooks = () => {
    if (!bookArr.length) {
      document.querySelector('.book-list').innerHTML = 'No books added';
    } else {
      let markup = '';
      bookArr.forEach((elem, index) => {
        markup += `<div class='book'>
        <p> " ${elem.title} " by ${elem.author}</p>
        <button type="button" class="remove-btn" id="${index}">Remove</button>
      </div>`;
      });
      document.querySelector('.book-list').innerHTML = markup;
    }
    const removeBook = () => {
      const removeBtn = document.querySelectorAll('.remove-btn');

      removeBtn.forEach((item) => item.addEventListener('click', () => {
        const removeId = parseInt(item.id, 10);
        let obj = JSON.parse(localStorage.getItem('book'));
        bookArr = obj;
        bookArr = bookArr.filter((element, index) => index !== removeId);
        obj = bookArr;
        localStorage.setItem('book', JSON.stringify(obj));
        this.showBooks();
      }));
    };
    removeBook();
  };
}

const booksSec = document.querySelector('.books');
const bookCreate = document.querySelector('.book-create');
const contact = document.querySelector('.contact');
const booksLink = document.getElementById('books');
const addBookLink = document.getElementById('add-book');
const contactLink = document.getElementById('contact');
const date = document.querySelector('.date');

function now() {
  const time = DateTime.local();
  date.innerHTML = time;
}
window.onload = now();

function refresh() {
  contact.style.display = 'none';
  bookCreate.style.display = 'none';
  booksSec.style.display = 'block';
}
window.onload = refresh();

const navigation = () => {
  booksLink.addEventListener('click', (e) => {
    e.preventDefault();
    booksSec.style.display = 'block';
    bookCreate.style.display = 'none';
    contact.style.display = 'none';
  });

  addBookLink.addEventListener('click', (e) => {
    e.preventDefault();
    bookCreate.style.display = 'block';
    booksSec.style.display = 'none';
    contact.style.display = 'none';
  });

  contactLink.addEventListener('click', (e) => {
    e.preventDefault();
    bookCreate.style.display = 'none';
    booksSec.style.display = 'none';
    contact.style.display = 'block';
  });
};
const awesomeBooks = new Book();
awesomeBooks.addBook();
awesomeBooks.showBooks();
navigation();