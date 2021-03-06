const Keyv = require('keyv');
const logger = require('@greencoast/logger');
const { v4: uuid } = require('uuid');
const { dbURI, prepareDatabaseFileSync } = require('./prepare');

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

module.exports = {
  db: {
    results,
    resultEntries,
    ops: {
      createResult,
      getResult,
      getAllResults
    }
  }
};
