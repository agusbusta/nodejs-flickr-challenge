const axios = require('axios');
const pool = require('../config/db');
require('dotenv').config();

async function fetchAndStorePhotos() {
    try {
        const response = await axios.get('https://api.flickr.com/services/rest', {
            params: {
                method: 'flickr.photos.search',
                api_key: process.env.FLICKR_API_KEY,
                tags: 'cat',
                format: 'json',
                nojsoncallback: 1,
                per_page: 500
            }
        });

        const photos = response.data.photos.photo.map(photo => ({
            published_date: new Date(),
            image_url: `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`,
            tags: photo.tags ? photo.tags.join(', ') : '' 
        }));

        const query = 'INSERT INTO photos (published_date, image_url, tags) VALUES ?';
        const values = photos.map(photo => [photo.published_date, photo.image_url, photo.tags]);

        await pool.query(query, [values]);
    } catch (error) {
        console.error('Error fetching or storing photos:', error);
    }
}

module.exports = fetchAndStorePhotos;
