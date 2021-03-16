const Keyv = require('keyv');
const logger = require('@greencoast/logger');
const { v4: uuid } = require('uuid');
const { dbURI, prepareDatabaseFileSync, prepareResultEntries } = require('./prepare');
const { KeyNotFoundError, InvalidTypeError } = require('../errors');

const RESULT_TYPES = ['everyone', 'particular'];

prepareDatabaseFileSync();

const results = new Keyv(dbURI, { namespace: 'results' });
const resultEntries = new Keyv(dbURI, { namespace: 'resultEntries' });

results.on('error', (error) => {
  logger.error('A database connection error has ocurred in namespace results.');
  logger.error(error);
});

resultEntries.on('error', (error) => {
  logger.error('A database connection error has ocurred in namespace resultEntries.');
  logger.error(error);
});

prepareResultEntries(resultEntries, RESULT_TYPES);

const validateType = (type) => {
  if (!RESULT_TYPES.includes(type)) {
    throw new InvalidTypeError(`Results type ${type} is invalid!`);
  }
};

const createResult = async(type, data) => {
  validateType(type);

  const id = uuid();
  data.id = id;
  data.type = type;

  await results.set(id, data);

  const entries = await resultEntries.get(`entries-${type}`);
  entries.push(id);
  await resultEntries.set(`entries-${type}`, entries);

  return data;
};

const getResult = (id) => {
  return results.get(id)
    .then((data) => {
      if (!data) {
        throw new KeyNotFoundError(`Result entry for ${id} does not exist!`);
      }

      return data;
    });
};

const getAllResults = async(type) => {
  validateType(type);

  const entries = await resultEntries.get(`entries-${type}`);

  return Promise.all(entries.map((entry) => getResult(entry)));
};

const deleteResult = async(type, id) => {
  validateType(type);

  const data = await results.get(id);
  const deleted = await results.delete(id);

  if (!deleted) {
    throw new KeyNotFoundError(`Result entry for ${id} does not exist!`);
  }

  const entries = await resultEntries.get(`entries-${type}`);
  const newEntries = entries.filter((entry) => entry !== id);
  await resultEntries.set(`entries-${type}`, newEntries);

  return data;
};

const updateResult = async(id, newData) => {
  const oldData = await results.get(id);

  if (!oldData) {
    throw new KeyNotFoundError(`Result entry for ${id} does not exist!`);
  }

  const mergedData = { ...oldData, ...newData };
  await results.set(id, mergedData);

  return mergedData;
};

module.exports = {
  RESULT_TYPES,
  db: {
    results,
    resultEntries,
    ops: {
      createResult,
      getResult,
      getAllResults,
      deleteResult,
      updateResult
    }
  }
};
