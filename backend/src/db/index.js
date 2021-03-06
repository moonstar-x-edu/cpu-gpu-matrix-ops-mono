const Keyv = require('keyv');
const logger = require('@greencoast/logger');
const { v4: uuid } = require('uuid');
const { dbURI, prepareDatabaseFileSync } = require('./prepare');
const { KeyNotFoundError } = require('../errors');

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

const prepareResultEntries = async() => {
  const entries = await resultEntries.get('entries');
  if (!entries) {
    await resultEntries.set('entries', []);
    logger.warn('Initialized result entries namespace.');
  }
};
prepareResultEntries();

const createResult = async(data) => {
  const id = uuid();
  data.id = id;

  await results.set(id, data);

  const entries = await resultEntries.get('entries');
  entries.push(id);
  await resultEntries.set('entries', entries);

  return data;
};

const getResult = (id) => {
  return results.get(id);
};

const getAllResults = async() => {
  const entries = await resultEntries.get('entries');

  return Promise.all(entries.map((entry) => getResult(entry)));
};

const deleteResult = async(id) => {
  const data = await results.get(id);
  const deleted = await results.delete(id);

  if (!deleted) {
    throw new KeyNotFoundError(`Result entry for ${id} does not exist!`);
  }

  const entries = await resultEntries.get('entries');
  const newEntries = entries.filter((entry) => entry !== id);
  await resultEntries.set('entries', newEntries);

  return data;
};

const updateResult = async(id, newData) => {
  newData.id = id;

  const entries = await resultEntries.get('entries');
  const isResultInEntries = entries.includes(id);

  if (!isResultInEntries) {
    throw new KeyNotFoundError(`Result entry for ${id} does not exist!`);
  }

  await results.set(id, newData);

  return newData;
};

module.exports = {
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
