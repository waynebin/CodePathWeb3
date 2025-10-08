import axios from 'axios';

const API_URL = 'http://localhost:3000/api/locations';

export const getLocations = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching locations:', error);
        throw error;
    }
};