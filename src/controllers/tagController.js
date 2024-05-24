const db = require('../config/db');


exports.getTags = async (req, res) => {
    try {
        const result = await db.query('SELECT tags, COUNT(*) as count FROM photos GROUP BY tags ORDER BY count DESC LIMIT 10');
        const tags = result.rows; // Obtener las filas de resultados

        res.json(tags);
    } catch (error) {
        console.error('Error fetching tags:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.getPhotosByTag = async (req, res) => {
    const [photos] = await db.query('SELECT * FROM photos WHERE tags LIKE ? ORDER BY published_date DESC LIMIT 10 OFFSET ?', [`%${req.params.tag}%`, (req.query.page - 1) * 10]);
    res.json(photos);
};
