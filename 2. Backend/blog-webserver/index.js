import express from 'express'
import cors from 'cors'
import { Article } from './article.js'

import { fileURLToPath } from 'url'
import path from 'path'
import { JSONFilePreset } from 'lowdb/node'
import { json } from 'stream/consumers'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Step 1: Setup
const defaultData = { articles: [] }
const db = await JSONFilePreset(__dirname + '/db.json', defaultData)

const app = express();
app.use(cors());

// const ARTICLES = [
//   new Article("Adam Mickiewicz", "Dziady", "Ciemno wszędzie"),
//   new Article("Juliusz Słowacki", "Balladyna", "Nigdy nie lubiłam Aliny"),
//   new Article("Aleksander Fredro", "Zemsta", "Mocium panie")
// ]


async function getArticles() {
  await db.read()
  if (!db.data) {
    db.data = { articles: [] };
  }
  return db.data.articles;
}

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.get('/api/articles', async (req, res) => {
  const articles = await getArticles();
  res.json(articles);
});

app.put('/api/articles', express.json(), async (req, res) => {
  let articles = req.body;
  db.data.articles = articles;
  await db.write();
  res.status(201).json(articles);
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
