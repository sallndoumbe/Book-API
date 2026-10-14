const Book = require('./models/Book');
require('dotenv').config({ path: './config/.env' });
const connectDB = require('./config/db');const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

const books = [
    { id: 1, title: 'Book 1', author: 'Author 1' },
    { id: 2, title: 'Book 2', author: 'Author 2' },
    { id: 3, title: 'Book 3', author: 'Author 3' },
  ];



app.get('/', (req, res) => {
  res.send('Bienvenue sur Book API de MERN-PROJECT');
});

app.get('/api/books/:id', async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findById(bookId);

    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/api/books',async (req, res) => {
  try {
    const books = await Book.find();
    console.log(books);
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.post('/api/books', async (req, res) => {
  try {
    const newBook = await Book.create(req.body);
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.patch('/api/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find(b => b.id === bookId);

  if (book) {
    if (req.body.title !== undefined) {
      book.title = req.body.title;
    }

    res.json(book);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

app.delete('/api/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const bookIndex = books.findIndex(b => b.id === bookId);

  if (bookIndex !== -1) {
    const deletedBook = books.splice(bookIndex, 1);
    res.json(deletedBook[0]);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});