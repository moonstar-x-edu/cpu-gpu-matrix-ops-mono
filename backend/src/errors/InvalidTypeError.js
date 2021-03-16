class InvalidTypeError extends Error {
  constructor(message) {
    super(message);

    this.name = 'InvalidTypeError';
  }
}

module.exports = InvalidTypeError;
