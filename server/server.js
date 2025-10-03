import express from 'express';
import './config/dotenv.js'; // Load environment variables
import path from 'path';
import { fileURLToPath } from 'url';
import articlesRouter from './routes/articles.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

// define CLIENT_DIR once and reuse it
const CLIENT_DIR = path.join(__dirname, '..', 'Client');

app.use(express.static(CLIENT_DIR));

// API routes (JSON)
app.use('/api/articles', articlesRouter);

// Home page
app.get('/', (req, res) => {
  res.sendFile(path.join(CLIENT_DIR, 'index.html'));
});

// Serve the same template file for any article slug (detail page)
// URL stays /articles/:slug while we serve Client/articles.html
app.get('/articles/:slug', (req, res) => {
  res.sendFile(path.join(CLIENT_DIR, 'articles.html'));
});

// Optional: listing page at /articles reusing same template
app.get('/articles', (req, res) => {
  res.sendFile(path.join(CLIENT_DIR, 'articles.html'));
});

// 404
app.use((req, res) => res.status(404).send('Not Found'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
