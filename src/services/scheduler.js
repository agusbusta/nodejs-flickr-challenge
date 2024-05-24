const schedule = require('node-schedule');
const fetchAndStorePhotos = require('./fetchPhotos');

schedule.scheduleJob('0 * * * *', () => {
    fetchAndStorePhotos();
});
