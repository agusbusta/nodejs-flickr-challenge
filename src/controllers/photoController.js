const db = require('../config/db');

exports.getPhotos = async (req, res) => {
    const [photos] = await db.query('SELECT * FROM photos ORDER BY published_date DESC LIMIT 10 OFFSET ?', [(req.query.page - 1) * 10]);
    res.json(photos);
};

exports.deletePhoto = async (req, res) => {
    await db.query('DELETE FROM photos WHERE id = ?', [req.params.id]);
    res.sendStatus(204);
};
