const express = require("express");
const app = express();

app.use(express.json());

// ------------------ SAMPLE DATA ------------------
let books = [
  { id: 1, title: "Atomic Habits", authorId: 1 },
  { id: 2, title: "Deep Work", authorId: 2 }
];

let authors = [
  { id: 1, name: "James Clear" },
  { id: 2, name: "Cal Newport" }
];

// ------------------ MIDDLEWARE ------------------
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// ------------------ BOOK ROUTES ------------------

// Get all books
app.get("/books", (req, res) => {
  res.json(books);
});

// Get book by ID
app.get("/books/:id", (req, res) => {
  const book = books.find(b => b.id == req.params.id);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  res.json(book);
});

// Add a new book
app.post("/books", (req, res) => {
  const { title, authorId } = req.body;

  if (!title || !authorId) {
    return res.status(400).json({ message: "Title and authorId required" });
  }

  const newBook = {
    id: books.length + 1,
    title,
    authorId
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

// Update a book
app.put("/books/:id", (req, res) => {
  const book = books.find(b => b.id == req.params.id);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  const { title, authorId } = req.body;

  if (title) book.title = title;
  if (authorId) book.authorId = authorId;

  res.json(book);
});

// Delete a book
app.delete("/books/:id", (req, res) => {
  const exists = books.some(b => b.id == req.params.id);

  if (!exists) {
    return res.status(404).json({ message: "Book not found" });
  }

  books = books.filter(b => b.id != req.params.id);
  res.json({ message: "Book deleted successfully" });
});

// ------------------ AUTHOR ROUTES ------------------

// Get all authors
app.get("/authors", (req, res) => {
  res.json(authors);
});

// Get author by ID
app.get("/authors/:id", (req, res) => {
  const author = authors.find(a => a.id == req.params.id);

  if (!author) {
    return res.status(404).json({ message: "Author not found" });
  }

  res.json(author);
});

// Add a new author
app.post("/authors", (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Author name required" });
  }

  const newAuthor = {
    id: authors.length + 1,
    name
  };

  authors.push(newAuthor);
  res.status(201).json(newAuthor);
});

// Get all books by a specific author
app.get("/authors/:id/books", (req, res) => {
  const author = authors.find(a => a.id == req.params.id);

  if (!author) {
    return res.status(404).json({ message: "Author not found" });
  }

  const authorBooks = books.filter(b => b.authorId == req.params.id);
  res.json(authorBooks);
});

// ------------------ SERVER ------------------
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});