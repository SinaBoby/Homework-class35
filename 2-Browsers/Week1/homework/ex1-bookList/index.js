//cspell: disable
/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Homework/tree/main/2-Browsers/Week1#exercise-1-the-book-list

I'd like to display my three favorite books inside a nice webpage!

1. Iterate through the array of books.
2. For each book, create a `<p>`
element with the book title and author.
3. Use a `<ul>`  and `<li>` to display the books.
4. Add an `<img>` to each book that links to a URL of the book cover.
5. Change the style of the book depending on whether you have read it(green) or not(red).

The end result should look something like this:
https: //hyf-js2-week1-makeme-ex1-demo.herokuapp.com/

-----------------------------------------------------------------------------*/
//cspell: enable

function createBookList(books) {
  const bookList = document.createElement('ul');
  document.getElementById('bookList').appendChild(bookList);

  for (const book of books) {
    const bookTitle = document.createElement('p');
    bookTitle.textContent = `${book.title} - ${book.author}`;
    const item = document.createElement('li');
    bookList.appendChild(item);
    item.appendChild(bookTitle);
    item.style.listStyle = 'none';
    Object.assign(bookList.style, {
      listStyle: 'none',
      display: 'flex',
      flexWrap: 'wrap',
      padding: '20px',
      width: 'calc( 100% - 41px)',
    });
    if (book.alreadyRead === true) {
      item.style.backgroundColor = 'green';
    } else {
      item.style.backgroundColor = 'red';
    }
    item.style.width = 'calc(25% - 51px)';
    item.style.padding = '10px';
    item.style.minWidth = '350px';
    item.style.margin = '15px';
    const image = document.createElement('img');

    Object.assign(image.style, {
      width: '70%',
      height: '85%',
    });
    item.appendChild(image);
  }

  console.log(document.querySelectorAll('img'));
  const images = document.querySelectorAll('img');
  images[0].setAttribute('src', './assets/the_design_of_everyday_things.jpg');
  images[0].setAttribute('alt', 'Don-Norman-book');
  images[1].setAttribute('src', './assets/the_most_human_human.jpg');
  images[1].setAttribute('alt', 'Brian_book');
  images[2].setAttribute('src', './assets/the_pragmatic_programmer.jpg');
  images[2].setAttribute('alt', 'Andrew-book');
}

function main() {
  const myBooks = [
    {
      title: 'The Design of Everyday Things',
      author: 'Don Norman',
      isbn: '978-0465050659',
      alreadyRead: false,
    },
    {
      title: 'The Most Human Human',
      author: 'Brian Christian',
      isbn: '978-1617933431',
      alreadyRead: true,
    },
    {
      title: 'The Pragmatic Programmer',
      author: 'Andrew Hunt',
      isbn: '978-0201616224',
      alreadyRead: true,
    },
  ];

  const ulElement = createBookList(myBooks);
  document.querySelector('#bookList').appendChild(ulElement);
}

window.addEventListener('load', main);
