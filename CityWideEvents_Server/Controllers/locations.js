import { pool } from '../config/database.js'

export const getLocations = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM locations ORDER BY state, city')
        res.json(result.rows)
    } catch (error) {
        console.error('Error fetching locations table:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}