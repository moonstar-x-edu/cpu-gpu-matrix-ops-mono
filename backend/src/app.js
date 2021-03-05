require('dotenv').config();
const express = require('express');
const logger = require('@greencoast/logger');
const { allowCORS } = require('./middleware');
const { HTTP_CODES } = require('./constants');

const HTTP_PORT = process.env.HTTP_PORT || 8080;

const app = express();
app.use(allowCORS);

app.get('/', (req, res) => {
  res.status(HTTP_CODES.OK).send('IT WORKS!');
});

app.all('*', (req, res) => {
  res.status(HTTP_CODES.NOT_FOUND).send('Not Found...');
});

app.listen(HTTP_PORT, () => {
  logger.info(`API listening on ${HTTP_PORT}`);
});
