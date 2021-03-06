const express = require('express');
const bodyParser = require('body-parser');
const { db } = require('../db');
const { HTTP_CODES, DEFAULT_MESSAGES } = require('../constants');
const { generateResponse } = require('../utils');
const { onlySupportedMethods } = require('../middleware');
const { InvalidBodyError } = require('../errors');

const router = express.Router();
router.use(bodyParser.json());

router.get('/results', (req, res, next) => {
  return db.ops.getAllResults()
    .then((data) => {
      return res.status(HTTP_CODES.OK)
        .send(generateResponse(HTTP_CODES.OK, data));
    })
    .catch(next);
});

router.all('/results', onlySupportedMethods(['GET']));

router.post('/result', (req, res, next) => {
  const { body } = req;

  if (!body || Object.keys(body).length < 1) {
    throw new InvalidBodyError(DEFAULT_MESSAGES.MISSING_JSON_BODY);
  }

  return db.ops.createResult(body)
    .then((created) => {
      return res.status(HTTP_CODES.CREATED)
        .send(generateResponse(HTTP_CODES.CREATED, created));
    })
    .catch(next);
});

router.post('/result', onlySupportedMethods(['POST']));

router.get('/result/:id', (req, res, next) => {
  const { id } = req.params;

  return db.ops.getResult(id)
    .then((data) => {
      return res.status(HTTP_CODES.OK)
        .send(generateResponse(HTTP_CODES.OK, data));
    })
    .catch(next);
});

router.delete('/result/:id', (req, res, next) => {
  const { id } = req.params;

  return db.ops.deleteResult(id)
    .then((deleted) => {
      return res.status(HTTP_CODES.OK)
        .send(generateResponse(HTTP_CODES.OK, deleted));
    })
    .catch(next);
});

router.put('/result/:id', (req, res, next) => {
  const { body, params: { id } } = req;

  if (!body || Object.keys(body).length < 1) {
    throw new InvalidBodyError(DEFAULT_MESSAGES.MISSING_JSON_BODY);
  }

  return db.ops.updateResult(id, body)
    .then((updated) => {
      return res.status(HTTP_CODES.OK)
        .send(generateResponse(HTTP_CODES.OK, updated));
    })
    .catch(next);
});

router.all('/result/:id', onlySupportedMethods(['GET, DELETE, PUT']));

module.exports = router;
