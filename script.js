const myLibrary = [];

function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

function displayBooks() {
  const container = document.querySelector(".library");
  container.innerHTML = "";

  myLibrary.forEach(book => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.id = book.id;

    card.innerHTML = `
      <h3>${book.title}</h3>
      <p>Author: ${book.author}</p>
      <p>Pages: ${book.pages}</p>
      <p>Read: ${book.read ? "Yes" : "No"}</p>
    `;

    container.appendChild(card);
  });
}


addBookToLibrary("The Hobbit", "Tolkien", 310, true);
addBookToLibrary("1984", "Orwell", 328, false);
addBookToLibrary("Dune", "Herbert", 412, true);

displayBooks();

console.log(myLibrary);