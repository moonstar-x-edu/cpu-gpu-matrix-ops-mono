const express = require('express');
const bodyParser = require('body-parser');
const { db } = require('../db');
const { HTTP_CODES, DEFAULT_MESSAGES } = require('../constants');
const { generateResponse } = require('../utils');
const { onlySupportedMethods } = require('../middleware');
const { InvalidBodyError } = require('../errors');
const { ResultsCreateSchema } = require('../schemas/results');

const router = express.Router();
router.use(bodyParser.json());

router.get('/results', (req, res, next) => {
  const { resultType } = req;

  return db.ops.getAllResults(resultType)
    .then((data) => {
      return res.status(HTTP_CODES.OK)
        .send(generateResponse(HTTP_CODES.OK, data));
    })
    .catch(next);
});

router.all('/results', onlySupportedMethods(['GET']));

router.post('/result', (req, res, next) => {
  const { body, resultType } = req;

  if (!body || Object.keys(body).length < 1) {
    throw new InvalidBodyError(DEFAULT_MESSAGES.MISSING_JSON_BODY);
  }

  const { error: validationError, value: validatedData } = ResultsCreateSchema.validate(body, { convert: false });

  if (validationError) {
    throw new InvalidBodyError(validationError);
  }

  return db.ops.createResult(resultType, validatedData)
    .then((created) => {
      return res.status(HTTP_CODES.CREATED)
        .send(generateResponse(HTTP_CODES.CREATED, created));
    })
    .catch(next);
});

router.post('/result', onlySupportedMethods(['POST']));

router.delete('/result/:id', (req, res, next) => {
  const { resultType, params: { id } } = req;

  return db.ops.deleteResult(resultType, id)
    .then((deleted) => {
      return res.status(HTTP_CODES.OK)
        .send(generateResponse(HTTP_CODES.OK, deleted));
    })
    .catch(next);
});

router.all('/result/:id', onlySupportedMethods(['DELETE']));

module.exports = router;
