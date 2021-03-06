class KeyNotFoundError extends Error {
  constructor(message) {
    super(message);

    this.name = 'KeyNotFoundError';
  }
}

module.exports = KeyNotFoundError;
