//  index.js
const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

// In-memory book storage
let books = [
  { id: 1, title: "The Hobbit", author: "J.R.R. Tolkien", publishedYear: 1937, available: true },
  { id: 2, title: "The Catcher in the Rye", author: "J.D. Salinger", publishedYear: 1951, available: false },
  { id: 3, title: "Pride and Prejudice", author: "Jane Austen", publishedYear: 1813, available: true }
];

//  GET all books
app.get("/api/books", (req, res) => {
  res.json(books);
});

//  GET a book by ID
app.get("/api/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find(b => b.id === bookId);
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json(book);
});

//  POST create a new book
app.post("/api/books", (req, res) => {
  const { title, author, publishedYear, available } = req.body;
  const newBook = {
    id: books.length + 1,
    title,
    author,
    publishedYear,
    available
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

//  PUT update a book
app.put("/api/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const { title, author, publishedYear, available } = req.body;
  const bookIndex = books.findIndex(b => b.id === bookId);
  if (bookIndex === -1) return res.status(404).json({ message: "Book not found" });

  books[bookIndex] = { id: bookId, title, author, publishedYear, available };
  res.json(books[bookIndex]);
});

//  DELETE a book
app.delete("/api/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  books = books.filter(b => b.id !== bookId);
  res.json({ message: "Book deleted successfully." });
});

//  Start the server
app.listen(port, () => {
  console.log(`Library API is running at http://localhost:${port}`);
});
