import './dotenv.js'
import { pool } from './database.js'
import { events } from '../data/Eventsdata.js'

const createEventsTable = async () => {
    await pool.query('DROP TABLE IF EXISTS events CASCADE')

    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        date DATE NOT NULL,
        description TEXT,
        location VARCHAR(255),
        imageUrl TEXT
    );
    `
    await pool.query(createTableQuery)
    console.log('✅ events table created successfully')
}

const seedEventsTable = async () => {
    const insertQuery = `INSERT INTO events (title, date, description, location, imageUrl) VALUES ($1, $2, $3, $4, $5)`

    for (const e of events) {
        await pool.query(insertQuery, [e.title, e.date, e.description, e.location, e.imageUrl])
    }
    console.log('✅ events table seeded successfully')
}

const createLocationsTable = async () => {
    await pool.query('DROP TABLE IF EXISTS locations');
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS locations (
            id SERIAL PRIMARY KEY,
            city VARCHAR(255) NOT NULL,
            state VARCHAR(255) NOT NULL,
            UNIQUE(city, state)
        );
    `;
    await pool.query(createTableQuery);
    console.log('✅ locations table created successfully');
}

const seedLocationsTable = async () => {
    const uniqueLocations = [...new Set(events.map(e => e.location))];
    const locationsToInsert = uniqueLocations.map(l => {
        const parts = l.split(', ');
        return { city: parts[0], state: parts[1] };
    });

    const insertQuery = `INSERT INTO locations (city, state) VALUES ($1, $2) ON CONFLICT (city, state) DO NOTHING`;
    for (const loc of locationsToInsert) {
        if (loc.city && loc.state) {
            await pool.query(insertQuery, [loc.city, loc.state]);
        }
    }
    console.log('✅ locations table seeded successfully');
}

const resetDatabase = async () => {
    try {
        await createEventsTable()
        await seedEventsTable()
        await createLocationsTable()
        await seedLocationsTable()
        console.log('✅ Database reset complete')
    } catch (err) {
        console.error('❌ Reset database failed:', err)
    } finally {
        await pool.end()
    }
}

resetDatabase()