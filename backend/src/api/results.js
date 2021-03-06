const express = require('express');
const bodyParser = require('body-parser');
const { db } = require('../db');
const { HTTP_CODES, DEFAULT_MESSAGES } = require('../constants');
const { generateResponse } = require('../utils');
const { onlySupportedMethods } = require('../middleware');
const { InvalidBodyError, KeyNotFoundError } = require('../errors');

const router = express.Router();
router.use(bodyParser.json());

router.get('/results', (req, res) => {
  return db.ops.getAllResults()
    .then((data) => {
      return res.status(HTTP_CODES.OK)
        .send(generateResponse(HTTP_CODES.OK, data));
    })
    .catch((error) => {
      return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR)
        .send(generateResponse(HTTP_CODES.INTERNAL_SERVER_ERROR, error));
    });
});

router.all('/results', onlySupportedMethods(['GET']));

router.post('/result', (req, res) => {
  const { body } = req;

  if (!body || Object.keys(body).length < 1) {
    return res.status(HTTP_CODES.BAD_REQUEST)
      .send(generateResponse(HTTP_CODES.BAD_REQUEST, new InvalidBodyError(DEFAULT_MESSAGES.MISSING_JSON_BODY)));
  }

  return db.ops.createResult(body)
    .then((created) => {
      return res.status(HTTP_CODES.CREATED)
        .send(generateResponse(HTTP_CODES.CREATED, created));
    })
    .catch((error) => {
      return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR)
        .send(generateResponse(HTTP_CODES.INTERNAL_SERVER_ERROR, error));
    });
});

router.post('/result', onlySupportedMethods(['POST']));

router.get('/result/:id', (req, res) => {
  const { id } = req.params;

  return db.ops.getResult(id)
    .then((data) => {
      return res.status(HTTP_CODES.OK)
        .send(generateResponse(HTTP_CODES.OK, data));
    })
    .catch((error) => {
      if (error instanceof KeyNotFoundError) {
        return res.status(HTTP_CODES.NOT_FOUND)
          .send(generateResponse(HTTP_CODES.NOT_FOUND, error));
      }

      return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR)
        .send(generateResponse(HTTP_CODES.INTERNAL_SERVER_ERROR, error));
    });
});

router.delete('/result/:id', (req, res) => {

});

router.put('/result/:id', (req, res) => {

});

router.all('/result/:id', onlySupportedMethods(['GET, DELETE, PUT']));

module.exports = router;
