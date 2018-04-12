//'use strict';

const mongoose  = require('mongoose');
const increment = require('mongoose-auto-increment');

const nconf     = require('nconf');

const HOST     = nconf.get('mongo:host');
const PORT     = nconf.get('mongo:port');
const DATABASE = nconf.get('mongo:database');

const db = mongoose.connection;

// plugins

increment.initialize(db);

db.on('error', (err) => console.log(err));
db.on('open' , () => console.log('Connected'));