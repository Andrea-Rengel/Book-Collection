class Book {
    constructor(author, title, isbn){
        this.author = author;
        this.title = title;
        this.isbn = isbn;
    }
}

class UI {
    static showBook(){
        const books = Data.bringBook();
        books.forEach((book) => UI.addBookList(book));
    } 

    static addBookList(book){
        const list = document.querySelector('.list');
        const row = document.createElement('tr');
        const tdone = document.createElement('td');
        const tdtwo = document.createElement('td');
        const tdthree = document.createElement('td');
        const tdbutton = document.createElement('td');
        const button = document.createElement('button');
        
        button.textContent = 'x';
        button.className = 'delete-btn';
        tdone.textContent = book.title;
        tdtwo.textContent = book.author;
        tdthree.textContent = book.isbn;

        row.appendChild(tdone);
        row.appendChild(tdtwo);
        row.appendChild(tdthree);
        tdbutton.appendChild(button);
        row.appendChild(tdbutton);
        list.appendChild(row);

    }

    static deleteBook(el){
        if(el.classList.contains('delete-btn')) {
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, classAlert){
        const div = document.querySelector('.alerts');
        const p = document.createElement('p');
        p.textContent = message;
        p.className = classAlert;
        div.appendChild(p);

        setTimeout(() => p.remove(), 3000);
    }

    static cleanFields(){
        document.querySelector('.author').value = '';
        document.querySelector('.title').value = '';
        document.querySelector('.isbn').value = '';
    }
}

class Data {
    static bringBook() {
       let book;
       if(localStorage.getItem('books') === null){
           book = [];
       } else {
           book = JSON.parse(localStorage.getItem('books'));
       }
       return book;
    }

    static addBook(book){
        const books = Data.bringBook();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn){
        const books = Data.bringBook();
        
        books.forEach((book, index) => {
           if(book.isbn === isbn){
               books.splice(index, 1);
           }
        })
        localStorage.setItem('books', JSON.stringify(books));
    }
}

document.addEventListener('DOMContentLoaded', UI.showBook());

document.querySelector('.form').addEventListener('submit', (e) => {
    e.preventDefault();

    const author = document.querySelector('.author').value;
    const title = document.querySelector('.title').value;
    const isbn = document.querySelector('.isbn').value;

    if(author === '' || title === '' || isbn === ''){
        UI.showAlert('Fill in the fields', 'error');
    } else {
        const book = new Book(author, title, isbn);
        Data.addBook(book);
        UI.addBookList(book);
        UI.showAlert('Book added to the collection', 'success');
        UI.cleanFields();
    }
})

document.querySelector('.list').addEventListener('click', (e) => {
    UI.deleteBook(e.target);
    Data.removeBook(e.target.parentElement.previousElementSibling.textContent);
    UI.showAlert('Book successfully removed', 'remove');
})