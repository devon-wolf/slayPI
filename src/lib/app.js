const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1/characters', require('./controllers/characters'));
app.use('/api/v1/scrapedCharacters', require('./controllers/scrapedCharacters'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
