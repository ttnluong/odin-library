// LIBRARY

const myLibrary = [];

// constructor for books
function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}


// store new book object into the library array
function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
}


// stored book id for deletion
let selectedBookId = null;


// loops through the library array and displays each book on the page as a card, each card has a toggle read button and delete book button
function displayBooks() {
    const container = document.querySelector(".library");
    container.innerHTML = "";

    // create card for every book
    myLibrary.forEach(book => {
        const card = document.createElement("article");
        const bookTitle = document.createElement("h3");
        const bookAuthor = document.createElement("p");
        const bookPages = document.createElement("p");
        const bookReadBtn = document.createElement("button");
        const modalDeleteBtn = document.createElement("button");
        const deleteIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        const useElem = document.createElementNS("http://www.w3.org/2000/svg", "use");

        card.classList.add("card");
        card.dataset.id = book.id;

        card.appendChild(bookTitle);
        card.appendChild(bookAuthor);
        card.appendChild(bookPages);
        card.appendChild(bookReadBtn);
        card.appendChild(modalDeleteBtn);

        bookTitle.textContent = book.title;
        bookAuthor.textContent = book.author;
        bookPages.textContent = `${book.pages} p.`;
        bookReadBtn.textContent = book.read;
        bookReadBtn.classList.add("read-btn");
        modalDeleteBtn.classList.add("modal-delete-btn");
        modalDeleteBtn.setAttribute("popovertarget", "delete-modal");

        modalDeleteBtn.appendChild(deleteIcon);
        deleteIcon.appendChild(useElem);

        deleteIcon.classList.add("delete-icon");
        useElem.setAttribute("href", "./svg/feather-sprite.svg#trash-2");

        // toggle read status 
        bookReadBtn.addEventListener("click", (e) => {
            const bookId = e.target.closest(".card").dataset.id;
            const book = myLibrary.find(element => element.id === bookId);
            book.toggleRead();
            displayBooks();
        })

        // toggle delete modal, store book id
        modalDeleteBtn.addEventListener("click", (e) => {
            selectedBookId = e.target.closest(".card").dataset.id;
        })

        container.appendChild(card);
    });
}


// delete modal
const deleteBtn = document.querySelector(".delete-btn");

deleteBtn.addEventListener("click", (e) => {
        const findBook = myLibrary.findIndex(element => element.id === selectedBookId)
        myLibrary.splice(findBook, 1);
        displayBooks(); // re-render instead of manually removing card
        updateStatsBooks();
    });


// get book details from user form inputs, add book to library
const addBook = document.getElementById("form");

addBook.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.querySelector("input[name='read']:checked")?.value || "No status";

    addBookToLibrary(title, author, pages, read);
    displayBooks();
    updateStatsBooks();
    form.reset();
});


// toggle read status prototype function
Book.prototype.toggleRead = function () {
    if (this.read === "Read") {
        this.read = "Still reading";
    } else if (this.read === "Still reading") {
        this.read = "Not read";
    } else {
        this.read = "Read";
    }
    
    updateStatsBooks();
}

// display examples
addBookToLibrary("The Hobbit", "Tolkien", 310, "Read");
addBookToLibrary("1984", "Orwell", 328, "Not read");
addBookToLibrary("Dune is jaf lkentkl asjfhasj itewqjhoi asnflknl", "Herbert", 412, "Read");

displayBooks();


// STATISTICS

const statsTotal = document.getElementById("stat-total");
const statsRead = document.getElementById("stat-read");
const statsStillReading = document.getElementById("stat-still-reading");
const statsNotRead = document.getElementById("stat-not-read");

function updateStatsBooks() {
    const statRead = myLibrary.filter(book => book.read === "Read");
    const statStillReading = myLibrary.filter(book => book.read === "Still reading");
    const statNotRead = myLibrary.filter(book => book.read === "Not read");

    statsTotal.textContent = myLibrary.length;
    statsRead.textContent = statRead.length;
    statsStillReading.textContent = statStillReading.length;
    statsNotRead.textContent = statNotRead.length;
}

updateStatsBooks();

// TO DO

// add: edit details books feature
// add: categories