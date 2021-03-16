require('dotenv').config();
const express = require('express');
const logger = require('@greencoast/logger');
const cors = require('cors');
const { onlySupportedMethods, handleError, logRequests } = require('./middleware');
const resultsRouter = require('./api/results');
const { HTTP_CODES } = require('./constants');
const { generateResponse } = require('./utils');

const HTTP_PORT = process.env.HTTP_PORT || 8080;

const app = express();
app.use(cors());
app.use(logRequests);

app.options('*', cors());

app.use('/', resultsRouter);

app.get('/', (req, res) => {
  res.status(HTTP_CODES.OK).send(generateResponse(HTTP_CODES.OK, 'It works!'));
});

app.all('/', onlySupportedMethods(['GET']));

app.all('*', (req, res) => {
  res.status(HTTP_CODES.NOT_FOUND).send(generateResponse(HTTP_CODES.NOT_FOUND, new Error('This route is not handled by the server.')));
});

app.use(handleError);

app.listen(HTTP_PORT, () => {
  logger.info(`API listening on ${HTTP_PORT}`);
});
