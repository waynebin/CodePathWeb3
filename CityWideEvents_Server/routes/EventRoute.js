import express from 'express'
// import controllers for events 
import { getEvents, getEventById } from '../Controllers/events.js'




const router = express.Router()

// define routes for events
router.get('/', getEvents)
router.get('/:id', getEventById)

export default router