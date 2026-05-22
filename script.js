// LIBRARY

const myLibrary = [];

// track active filter
let activeFilter = "All";

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
        const modalEditBtn = document.createElement("button");
        const modalDeleteBtn = document.createElement("button");
        const editIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        const deleteIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        const useEditIcon = document.createElementNS("http://www.w3.org/2000/svg", "use");
        const useDeleteIcon = document.createElementNS("http://www.w3.org/2000/svg", "use");

        card.classList.add("card");
        card.dataset.id = book.id;
        selectBookRead.classList.add("select-read-status");
        modalEditBtn.classList.add("modal-btn");
        modalDeleteBtn.classList.add("modal-btn");
        modalEditBtn.setAttribute("command", "show-modal");
        modalEditBtn.setAttribute("commandfor", "edit-modal");
        modalDeleteBtn.setAttribute("popovertarget", "delete-modal");
        editIcon.classList.add("card-icon");
        deleteIcon.classList.add("card-icon");
        useEditIcon.setAttribute("href", "./svg/feather-sprite.svg#edit-3");
        useDeleteIcon.setAttribute("href", "./svg/feather-sprite.svg#trash-2");

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

        card.append(bookTitle, bookAuthor, bookPages, selectBookRead, modalEditBtn, modalDeleteBtn);
        modalEditBtn.appendChild(editIcon);
        modalDeleteBtn.appendChild(deleteIcon);
        editIcon.appendChild(useEditIcon);
        deleteIcon.appendChild(useDeleteIcon);

        // select read status dropdown menu
        selectBookRead.addEventListener("change", (e) => {
            const book = myLibrary.find(el => el.id === card.dataset.id);
            book.read = e.target.value;
            updateStatsBooks();
        })

        // open edit modal, store book id
        modalEditBtn.addEventListener("click", () => {
            selectedBookId = card.dataset.id;
            fillEditModal(card.dataset.id);
        });

        // open delete modal, store book id
        modalDeleteBtn.addEventListener("click", () => {
            selectedBookId = card.dataset.id;
        })

        return card;
    };

// loops through the library array and displays each book on the page as a card
function displayBooks() {
    const container = document.querySelector(".library");
    container.innerHTML = "";
    getFilteredBooks().forEach(book => container.appendChild(createCard(book)));
}

// edit modal
function fillEditModal(bookId) {
    const book = myLibrary.find(el => el.id === bookId);

    document.getElementById("edit-title").value = book.title;
    document.getElementById("edit-author").value = book.author;
    document.getElementById("edit-pages").value = book.pages;
   
    const radio = document.querySelector(`input[name="edit-read"][value="${book.read}"]`);
    if (radio) radio.checked = true;
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

// edit book details from user form inputs, update book
const editBook = document.getElementById("edit-form");

editBook.addEventListener("submit", (e) => {
    e.preventDefault();
    const book = myLibrary.find(el => el.id === selectedBookId);

    book.title = document.getElementById("edit-title").value;
    book.author = document.getElementById("edit-author").value;
    book.pages = document.getElementById("edit-pages").value;
    book.read = document.querySelector("input[name='edit-read']:checked")?.value || book.read;

    displayBooks();
    updateStatsBooks();
    document.getElementById("edit-modal").close();
});

// FILTER

// filter array, called by displayBooks()
function getFilteredBooks() {
    if (activeFilter === "All") return myLibrary;
    return myLibrary.filter(book => book.read === activeFilter);
}

// store activeFilter -> call displayBooks(), add button class active for underline, toggle filter with double click
const filterContainer = document.querySelector(".filters");
const filterBtns = document.querySelectorAll(".filter-btn");

filterContainer.addEventListener("click", (e) => {
    if (!e.target.matches("button")) return;

    const isAll = e.target.dataset.filter === "All";
    const isActive = e.target.classList.contains("active");

    if (isActive && !isAll) {
        filterBtns.forEach(b => b.classList.remove("active"));
        document.querySelector("[data-filter='All']").classList.add("active");
        activeFilter = "All";
    } else {
        filterBtns.forEach(b => b.classList.remove("active"));
        e.target.classList.add("active");
        activeFilter = e.target.dataset.filter;
    }

    displayBooks();
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