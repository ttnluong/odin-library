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

// create card for a book, the card has a select status dropdown menu and delete book button
function createCard(book) {
        const card = document.createElement("article");
        const bookTitle = document.createElement("h3");
        const bookAuthor = document.createElement("p");
        const bookPages = document.createElement("p");
        const selectBookRead = document.createElement("select");
        const modalDeleteBtn = document.createElement("button");
        const deleteIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        const useElem = document.createElementNS("http://www.w3.org/2000/svg", "use");

        card.classList.add("card");
        card.dataset.id = book.id;
        selectBookRead.classList.add("select-read-status");
        modalDeleteBtn.classList.add("modal-delete-btn");
        modalDeleteBtn.setAttribute("popovertarget", "delete-modal");
        deleteIcon.classList.add("delete-icon");
        useElem.setAttribute("href", "./svg/feather-sprite.svg#trash-2");

        ["Read", "Still reading", "Not read"].forEach(status => {
            const option = document.createElement("option");
            option.value = status;
            option.textContent = status;
            selectBookRead.appendChild(option);
        });

        bookTitle.textContent = book.title;
        bookAuthor.textContent = book.author;
        bookPages.textContent = `${book.pages} p.`;
        selectBookRead.value = book.read;

        card.append(bookTitle, bookAuthor, bookPages, selectBookRead, modalDeleteBtn);
        modalDeleteBtn.appendChild(deleteIcon);
        deleteIcon.appendChild(useElem);

        // toggle read status 
        selectBookRead.addEventListener("change", (e) => {
            const book = myLibrary.find(element => element.id === card.dataset.id);
            book.read = e.target.value;
            updateStatsBooks();
        })

        // toggle delete modal, store book id
        modalDeleteBtn.addEventListener("click", () => {
            selectedBookId = card.dataset.id;
        })

        return card;
    };

// loops through the library array and displays each book on the page as a card
function displayBooks() {
    const container = document.querySelector(".library");
    container.innerHTML = "";
    myLibrary.forEach(book => container.appendChild(createCard(book)));
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
    const author = document.getElementById("author")?.value || "-";
    const pages = document.getElementById("pages")?.value || "#";
    const read = document.querySelector("input[name='read']:checked")?.value || "";

    addBookToLibrary(title, author, pages, read);
    displayBooks();
    updateStatsBooks();
    form.reset();
});


// display examples
addBookToLibrary("The Darkroom of Damocles", "Willem Frederik Hermans", 416, "Read");
addBookToLibrary("The Fall of Public Man", "Richard Sennett", 512, "Still reading");
addBookToLibrary("1984", "George Orwell", 328, "Read");
addBookToLibrary("The Dispossessed: An Ambiguous Utopia", "Ursula K. Le Guin", 387, "Not read");
addBookToLibrary("Labyrinths: Selected Stories & Other Writings", "Jorge Luis Borges", 260, "Not read");
addBookToLibrary("Peace Is Every Step", "Thich Nhat Hanh", 157, "Still reading");
addBookToLibrary("The Complete Stories", "Flannery O'Connor", 555, "Not read");
addBookToLibrary("Being and Time", "Martin Heidegger", 589, "Not read");
addBookToLibrary("The Discovery of Heaven", "Harry Mulisch", 730, "Read");
addBookToLibrary("The Philosophy of Dress", "Oscar Wilde", 7, "Read");

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