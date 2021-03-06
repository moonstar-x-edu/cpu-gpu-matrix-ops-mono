const { HTTP_CODES } = require('../constants');
const { generateResponse } = require('../utils');

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

module.exports = {
  allowCORS,
  onlySupportedMethods
};
