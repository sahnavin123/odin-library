let myLibrary = [];
let toggled = true;

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

const addBookToLibrary = () => {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").checked;

  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);

  displayBooks();

  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("pages").value = "";
  document.getElementById("read").checked = false;

  document.getElementById("new-form").style.display = "none";
};

const displayBooks = () => {
  const bookList = document.querySelector("#book-lists");
  bookList.innerHTML = "";

  myLibrary.forEach((book, index) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    const title = document.createElement("h2");
    title.textContent = book.title;

    const author = document.createElement("p");
    author.textContent = `Author: ${book.author}`;

    const pages = document.createElement("p");
    pages.textContent = `Pages: ${book.pages}`;

    const read = document.createElement("p");
    read.textContent = book.read ? "Read" : "Not Read";

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => {
      removeBook(index);
    });

    const toggleReadButton = document.createElement("button");
    toggleReadButton.textContent = "Toggle Read";
    toggleReadButton.addEventListener("click", () => {
      toggleRead(index);
    });

    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(pages);
    bookCard.appendChild(read);
    bookCard.appendChild(removeButton);
    bookCard.appendChild(toggleReadButton);

    bookList.appendChild(bookCard);
  });
};

const removeBook = (index) => {
  myLibrary = myLibrary.filter((book, i) => i !== index);
  displayBooks();
};

const toggleRead = (index) => {
  myLibrary[index].read = !myLibrary[index].read;
  displayBooks();
};

document.getElementById("add-book").addEventListener("click", () => {
  toggled
    ? (document.getElementById("new-form").style.display = "block")
    : (document.getElementById("new-form").style.display = "none");

  toggled = !toggled;
});

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  addBookToLibrary();
  toggled = !toggled;
});
