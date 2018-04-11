'use strict';

const Hapi   = require('hapi');
const router = require('hapi-router');
const nconf  = require('nconf');

const properties = process.env.PROPERTIES || './config/env/test.json';

nconf
	.argv()
	.env({separator: '__'})
	.file(properties);

require('./config/mongo');
const auth = require('./config/auth');

const server = Hapi.server({
  port: 3000,
  host: 'localhost'
});

const init = async () => {
  await server.start();
	
	console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
