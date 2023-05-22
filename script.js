let myLibrary = [];
let addBookBtnToggle = true;

const Book = (title, author, pages, read) => {
  return { title, author, pages, read };
};

const addBookToLibrary = () => {
  const titleInput = document.getElementById("title");
  const authorInput = document.getElementById("author");
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").checked;

  const title = titleInput.value;
  const author = authorInput.value;

  if (title.length > 20 && author.length > 20) {
    alert("Title and author character limit exceeded (20 characters maximum)!");
    return;
  } else if (title.length > 20) {
    alert("Title character limit exceeded (20 characters maximum)!");
    return;
  } else if (author.length > 20) {
    alert("Author character limit exceeded (20 characters maximum)!");
    return;
  }

  const newBook = Book(title, author, pages, read);
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
    read.textContent = book.read ? "Status: Read" : "Status: Not Read";

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
  addBookBtnToggle
    ? (document.getElementById("new-form").style.display = "block")
    : (document.getElementById("new-form").style.display = "none");

  addBookBtnToggle = !addBookBtnToggle;
});

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  addBookToLibrary();
  addBookBtnToggle = !addBookBtnToggle;
});
