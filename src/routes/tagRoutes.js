const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tagController');

router.get('/', tagController.getTags);
router.get('/:tag', tagController.getPhotosByTag);

module.exports = router;
