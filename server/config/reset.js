import './dotenv.js'
import { pool } from './database.js'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'url'

// locate articles.json
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const DATA_FILE = path.join(__dirname, '..', 'data', 'articles.json')

// create articles table
const createArticlesTable = async () => {
    try {
        // Drop table first to ensure a clean state
        await pool.query('DROP TABLE IF EXISTS articles')

        const createTableQuery = `
        CREATE TABLE IF NOT EXISTS articles (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            content TEXT NOT NULL,
            author VARCHAR(100) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`

        await pool.query(createTableQuery)
        console.log('Articles table created successfully')
    } catch (error) {
        console.error('Error creating articles table:', error)
        throw error
    }
}

// seed the articles table with some initial data (parameterized to avoid SQL issues)
const seedArticlesTable = async () => {
    try {
        // read articles from JSON and insert first 4 items
        const raw = await readFile(DATA_FILE, 'utf8')
        const articles = JSON.parse(raw)
        const toInsert = articles.slice(0, 4) // seed 4 articles

        const insertQuery = `INSERT INTO articles (title, content, author) VALUES ($1, $2, $3)`

        for (const a of toInsert) {
            const title = a.title || ''
            // JSON uses `body` for article text; map that to DB `content` column
            const content = a.body || a.content || a.summary || ''
            const author = a.author || 'Unknown'
            await pool.query(insertQuery, [title, content, author])
        }

        console.log('Articles table seeded successfully')
    } catch (error) {
        console.error('Error seeding articles table:', error)
        throw error
    }
}

const resetDatabase = async () => {
    try {
        await createArticlesTable()
        await seedArticlesTable()
    } catch (err) {
        console.error('Reset database failed:', err)
    } finally {
        // ensure the pool is closed and wait for it
        await pool.end()
    }
}

resetDatabase()
