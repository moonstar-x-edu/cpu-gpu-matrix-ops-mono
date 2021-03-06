/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
const { HTTP_CODES, DEFAULT_MESSAGES } = require('../constants');

const responseDecorators = {
  _successfulOperation: (res, data) => {
    res.data = data;
  },
  _failedOperationWithError: (res, error, message) => {
    res.success = false;
    res.message = message;

    if (error instanceof Error) {
      res.error = error.message;
    } else {
      res.error = error;
    }
  },
  _failedOperationNoError: (res, message) => {
    res.success = false;
    res.message = message;
  }
};
responseDecorators[HTTP_CODES.OK] = (res, data) => responseDecorators._successfulOperation(res, data);
responseDecorators[HTTP_CODES.CREATED] = (res, data) => responseDecorators._successfulOperation(res, data);
responseDecorators[HTTP_CODES.BAD_REQUEST] = (res, error) => responseDecorators._failedOperationWithError(res, error, DEFAULT_MESSAGES[res.status]);
responseDecorators[HTTP_CODES.NOT_FOUND] = (res, error) => responseDecorators._failedOperationWithError(res, error, DEFAULT_MESSAGES[res.status]);
responseDecorators[HTTP_CODES.METHOD_NOT_ALLOWED] = (res) => responseDecorators._failedOperationNoError(res, DEFAULT_MESSAGES[res.status]);
responseDecorators[HTTP_CODES.INTERNAL_SERVER_ERROR] = (res, error) => responseDecorators._failedOperationWithError(res, error, DEFAULT_MESSAGES[res.status]);

const generateResponse = (status, content = null) => {
  const response = {
    success: true,
    status
  };

  responseDecorators[status](response, content);

  return response;
};

module.exports = {
  generateResponse
};
