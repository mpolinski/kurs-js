const express = require('express');
const cors = require('cors');
const Article = require('./article');

const app = express();
app.use(cors());

const ARTICLES = [
  new Article("Adam Mickiewicz", "Dziady", "Ciemno wszędzie"),
  new Article("Juliusz Słowacki", "Balladyna", "Nigdy nei lubiłam Aliny"),
  new Article("Aleksander Fredro", "Zemsta", "Mocium panie")
]

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.get('/api/articles', (req, res) => {
  res.json(ARTICLES);
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
