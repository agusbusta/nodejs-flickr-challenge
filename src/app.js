require('dotenv').config();
const express = require('express');
const photoRoutes = require('./routes/photoRoutes');
const tagRoutes = require('./routes/tagRoutes');
const fetchAndStorePhotos = require('./services/fetchPhotos');
require('./services/scheduler');

const app = express();
app.use(express.json());
app.use(express.static('public'));

app.use('/photos', photoRoutes);
app.use('/tags', tagRoutes);

app.listen(3006, () => {
    console.log('Server started on http://localhost:3006');
    fetchAndStorePhotos();
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
  });
  

module.exports = app;
