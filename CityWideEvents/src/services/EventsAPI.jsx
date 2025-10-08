//define functions to get events by calling the API.
import axios from "axios";

// NOTE: backend in this repo listens on port 3000. Update this if your server uses a different port.
const API_BASE_URL = "http://localhost:3000/api/events";

// Get all events
export const getAllEvents = async () => {
    try {
        const response = await axios.get(API_BASE_URL);
        // Some backends return { events: [...] } while others return the array directly.
        const raw = response.data && response.data.events ? response.data.events : response.data;
        const data = Array.isArray(raw)
            ? raw.map(e => ({ ...e, imageUrl: e.imageUrl || e.imageurl || e.image || e.img || null }))
            : [];
        return data;
    } catch (error) {
        console.error("Error fetching events:", error);
        // Return an empty array so the UI can render a friendly fallback instead of crashing.
        return [];
    }
};

// Get event by ID
export const getEventById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${id}`);
        const e = response.data;
        if (!e) return null;
        return { ...e, imageUrl: e.imageUrl || e.imageurl || e.image || e.img || null };
    } catch (error) {
        console.error(`Error fetching event with ID ${id}:`, error);
        throw error;
    }
};

