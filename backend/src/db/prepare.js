const fs = require('fs');
const path = require('path');
const logger = require('@greencoast/logger');

const dataFolderPath = path.join(__dirname, '../../data');
const dbFilePath = path.join(dataFolderPath, 'data.sqlite');
const dbURI = `sqlite://${dbFilePath}`;

const prepareDatabaseFileSync = () => {
  if (!fs.existsSync(dataFolderPath)) {
    logger.warn('Data folder not found, creating...');
    fs.mkdirSync(dataFolderPath);
    logger.info('Data folder created!');
  }

  if (!fs.existsSync(dbFilePath)) {
    logger.warn('Database file not found, creating...');
    fs.writeFileSync(dbFilePath, '');
    logger.info('Database file created!');
  }
};

const prepareResultEntries = async(resultEntries) => {
  const entries = await resultEntries.get('entries');
  if (!entries) {
    logger.warn('Result entries namespace not initialized! Initializing with an empty array...');
    await resultEntries.set('entries', []);
    logger.info('Initialized result entries namespace.');
  }
};

module.exports = {
  dbURI,
  prepareDatabaseFileSync,
  prepareResultEntries
};
