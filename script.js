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

// loops through the library array and displays each book on the page
function displayBooks() {
  const container = document.querySelector(".library");
  container.innerHTML = "";

  myLibrary.forEach(book => {
    const card = document.createElement("div");
    const bookTitle = document.createElement("h3");
    const bookAuthor = document.createElement("p");
    const bookPages = document.createElement("p");
    const bookReadBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");
    const deleteIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const useElem = document.createElementNS("http://www.w3.org/2000/svg", "use");

    card.classList.add("card");
    card.dataset.id = book.id;

    card.appendChild(bookTitle);
    card.appendChild(bookAuthor);
    card.appendChild(bookPages);
    card.appendChild(bookReadBtn);
    card.appendChild(deleteBtn);

    bookTitle.textContent = book.title;
    bookAuthor.textContent = book.author;
    bookPages.textContent = book.pages;
    bookReadBtn.textContent = book.read;
    bookReadBtn.classList.add("read-btn");
    deleteBtn.classList.add("delete-btn");

    deleteBtn.appendChild(deleteIcon);
    deleteIcon.appendChild(useElem);

    deleteIcon.classList.add("delete-icon");
    useElem.setAttribute("href", "./svg/feather-sprite.svg#trash-2");

    // read status button
    bookReadBtn.addEventListener("click", (e) => {
        const bookId = e.target.closest(".card").dataset.id;
        const book = myLibrary.find(element => element.id === bookId);
        book.toggleRead();
        displayBooks();
    })

    // attach event listener to each card's delete button
    deleteBtn.addEventListener("click", (e) => {
        const bookId = e.target.closest(".card").dataset.id;
        const findBook = myLibrary.findIndex(element => element.id === bookId)
        myLibrary.splice(findBook, 1);
        displayBooks(); // re-render instead of manually removing card
    });

    container.appendChild(card);
  });
}

// get book details from user form input, add book to library
const addBook = document.getElementById("form");

addBook.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.querySelector("input[name='read']:checked")?.value || "No status";

    addBookToLibrary(title, author, pages, read);
    displayBooks();
    form.reset();
});

// toggle read status prototype
Book.prototype.toggleRead = function () {
    if (this.read === "Read") {
        this.read = "Still reading";
    } else if (this.read === "Still reading") {
        this.read = "Not read";
    } else {
        this.read = "Read";
    }
}

// display examples
addBookToLibrary("The Hobbit", "Tolkien", 310, "Read");
addBookToLibrary("1984", "Orwell", 328, "Not read");
addBookToLibrary("Dune", "Herbert", 412, "Read");

displayBooks();