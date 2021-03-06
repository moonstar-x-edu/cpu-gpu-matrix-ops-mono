const HTTP_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  INTERNAL_SERVER_ERROR: 500
};

const HTTP_STATUS = Object.keys(HTTP_CODES).reduce((statuses, status) => {
  const code = HTTP_CODES[status];
  statuses[code] = status;
  return statuses;
}, {});

const DEFAULT_STATUS_MESSAGES = {
  [HTTP_CODES.BAD_REQUEST]: "The server couldn't process your request.",
  [HTTP_CODES.NOT_FOUND]: 'The requested resource was not found. Please check that the endpoint is written correctly.',
  [HTTP_CODES.METHOD_NOT_ALLOWED]: 'This method is not allowed on this endpoint.',
  [HTTP_CODES.INTERNAL_SERVER_ERROR]: 'Something went wrong when accessing the requested resource.'
};

module.exports = {
  HTTP_CODES,
  HTTP_STATUS,
  DEFAULT_STATUS_MESSAGES
};
