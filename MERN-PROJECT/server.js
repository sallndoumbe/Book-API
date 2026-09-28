const express = require("express");
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

app.get('/api/books/:id', (req, res) => { 
  const bookId = parseInt(req.params.id);
  const book = books.find(b => b.id === bookId);
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

app.get('/api/books', (req, res) => {
  res.json(books);
});


app.post('/api/books', (req, res) => {
  const newBook = req.body;
  newBook.id = books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1;
  books.push(newBook);

  res.status(201).json(newBook);
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});