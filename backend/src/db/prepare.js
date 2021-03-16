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

const prepareResultEntries = async(resultEntries, entryTypes) => {
  return Promise.all(entryTypes.map((type) => {
    return resultEntries.get(`entries-${type}`)
      .then((entries) => {
        if (!entries) {
          logger.warn(`Result entries-${type} namespace not initialized! Initializing with an empty array...`);
          return resultEntries.set(`entries-${type}`, [])
            .then(() => {
              logger.info(`Initialized result entries-${type} namespace.`);
            });
        }
      });
  }));
};

module.exports = {
  dbURI,
  prepareDatabaseFileSync,
  prepareResultEntries
};
