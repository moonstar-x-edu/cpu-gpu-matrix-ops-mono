const express = require('express');
const bodyParser = require('body-parser');
const { db } = require('../db');
const { HTTP_CODES, DEFAULT_MESSAGES } = require('../constants');
const { generateResponse } = require('../utils');
const { onlySupportedMethods } = require('../middleware');
const { InvalidBodyError } = require('../errors');
const { ResultsUpdateSchema } = require('../schemas/results');

const router = express.Router();
router.use(bodyParser.json());

router.get('/result/:id', (req, res, next) => {
  const { id } = req.params;

  return db.ops.getResult(id)
    .then((data) => {
      return res.status(HTTP_CODES.OK)
        .send(generateResponse(HTTP_CODES.OK, data));
    })
    .catch(next);
});

router.put('/result/:id', (req, res, next) => {
  const { body, params: { id } } = req;

  if (!body || Object.keys(body).length < 1) {
    throw new InvalidBodyError(DEFAULT_MESSAGES.MISSING_JSON_BODY);
  }

  const { error: validationError, value: validatedData } = ResultsUpdateSchema.validate(body, { convert: false });

  if (validationError) {
    throw new InvalidBodyError(validationError);
  }

  return db.ops.updateResult(id, validatedData)
    .then((updated) => {
      return res.status(HTTP_CODES.OK)
        .send(generateResponse(HTTP_CODES.OK, updated));
    })
    .catch(next);
});

router.all('/result/:id', onlySupportedMethods(['GET, PUT']));

module.exports = router;
