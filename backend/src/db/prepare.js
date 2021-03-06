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
    logger.warn('Data folder created!');
  }

  if (!fs.existsSync(dbFilePath)) {
    logger.warn('Database file not found, creating...');
    fs.writeFileSync(dbFilePath, '');
    logger.warn('Database file created!');
  }
};

module.exports = {
  dbURI,
  prepareDatabaseFileSync
};
