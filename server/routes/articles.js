// routes/articles.js (ESM)
import { Router } from 'express';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'url';

const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const DATA_FILE  = path.join(__dirname, '..', 'data', 'articles.json');

async function loadArticles() {
  const raw = await readFile(DATA_FILE, 'utf8');
  return JSON.parse(raw);
}

// GET /api/articles  -> list
router.get('/', async (req, res, next) => {
  try {
    res.json(await loadArticles());
  } catch (e) { next(e); }
});

// GET /api/articles/:slug -> one
router.get('/:slug', async (req, res, next) => {
  try {
    const articles = await loadArticles();
    const article = articles.find(a => a.slug === req.params.slug);
    if (!article) return res.status(404).json({ error: 'Article not found' });
    res.json(article);
  } catch (e) { next(e); }
});

export default router;
