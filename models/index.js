'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(module.filename);
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

// const env = process.env.NODE_ENV || 'development';
// const config = require(path.join(__dirname, '/../config/config.json'))[env];
const db = {};

// Setting environment variables
const dotenv = require('dotenv');
dotenv.config();

// Destructuring env variables
const {
  DB: dbTitle,
  DB_USER: dbUser,
  DB_PASS: dbPass,
  DB_HOST: dbHost,
  JAWSDB_URL: dbJawsUrl
} = process.env;

// Starting sequelize connection with env variables
const sequelize = new Sequelize(dbJawsUrl || dbTitle, dbUser, dbPass, {
  host: dbHost,
  dialect: 'mysql'
});

// Requiring in function for converting JAWSDB_URL
const uriToObject = require('../lib/uriToObject');

// setting options depending on environment
const prodOptions = dbJawsUrl ? uriToObject(dbJawsUrl) : undefined;
const devOptions = {
  host: dbHost,
  port: 3306,
  user: dbUser,
  password: dbPass,
  database: dbTitle
};
console.log(prodOptions);
// Connecting to connection store
const mysqlStore = new MySQLStore(prodOptions || devOptions);

// Compiling models
fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach(file => {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.mysqlStore = mysqlStore;

module.exports = db;
