/* eslint-disable max-params */
const { HTTP_CODES } = require('../constants');
const { generateResponse } = require('../utils');
const { InvalidBodyError, KeyNotFoundError } = require('../errors');

const allowCORS = (_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
};

const onlySupportedMethods = (methods) => {
  return (_, res) => {
    res.header('Access-Control-Allow-Methods', methods.join(' '));
    return res.status(HTTP_CODES.METHOD_NOT_ALLOWED)
      .send(generateResponse(HTTP_CODES.METHOD_NOT_ALLOWED));
  };
};

const handleError = (error, req, res, next) => {
  if (error instanceof InvalidBodyError) {
    res.status(HTTP_CODES.BAD_REQUEST)
      .send(generateResponse(HTTP_CODES.BAD_REQUEST, error));
  } else if (error instanceof KeyNotFoundError) {
    res.status(HTTP_CODES.NOT_FOUND)
      .send(generateResponse(HTTP_CODES.NOT_FOUND, error));
  } else {
    res.status(HTTP_CODES.INTERNAL_SERVER_ERROR)
      .send(generateResponse(HTTP_CODES.INTERNAL_SERVER_ERROR, error));
  }

  next();
};

module.exports = {
  allowCORS,
  onlySupportedMethods,
  handleError
};
