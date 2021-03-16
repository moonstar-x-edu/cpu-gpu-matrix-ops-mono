/* eslint-disable max-params */
const logger = require('@greencoast/logger');
const onFinished = require('on-finished');
const { HTTP_CODES } = require('../constants');
const { generateResponse } = require('../utils');
const { InvalidBodyError, KeyNotFoundError } = require('../errors');

const onlySupportedMethods = (methods) => {
  return (_, res) => {
    res.header('Access-Control-Allow-Methods', `${methods.join(' ')} OPTIONS`);
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

const logRequests = (req, res, next) => {
  onFinished(res, (error, res) => {
    if (error) {
      logger.error(error);
      return;
    }

    logger.info(`${req.method}:${req.path} ${res.statusCode} (${req.ip})`);
  });
  next();
};

module.exports = {
  onlySupportedMethods,
  handleError,
  logRequests
};
