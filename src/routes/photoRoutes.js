const express = require('express');
const router = express.Router();
const photoController = require('../controllers/photoController');

router.get('/', photoController.getPhotos);
router.delete('/:id', photoController.deletePhoto);

module.exports = router;
