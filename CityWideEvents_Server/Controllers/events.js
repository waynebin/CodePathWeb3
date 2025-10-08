// get events from the Events table
import { pool } from '../config/database.js'

// get all events from the Events table
export const getEvents = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Events')
        res.json(result.rows)
    } catch (error) {
        console.error('Error fetching Events table:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}
export const getEventById = async (req, res) => {
    const { id } = req.params
    try {
        const result = await pool.query('SELECT * FROM Events WHERE id = $1', [id])
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Event not found' })
        }
        res.json(result.rows[0])
    } catch (error) {
        console.error('Error fetching event by ID:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}