'use strict';

const Hapi   = require('hapi');
const router = require('hapi-router');
const nconf  = require('nconf');

const properties = process.env.PROPERTIES || './config/env/test.json';

nconf
	.argv()
	.env({separator: '__'})
	.file(properties);

const mongo = require('./config/mongo');
const auth = require('./config/auth');

const server = Hapi.server({
  port: 3000,
  host: 'localhost'
});

const init = async () => {
	await loadAuth(server);
  await loadRouters(server);
	await loadLog(server);

	await server.start();
	
	console.log(`Server running at: ${server.info.uri}`);
};

const loadRouters = (server) => {
  server.register({
    plugin : router, 
    options  : {
      routes : '**/api/*.js'
    } 
  })

  return Promise.resolve();
}

const loadLog = (server) => {
  server.register({
    plugin: require('hapi-pino'),
    options: {
      prettyPrint: true,
      logEvents: ['response']
    }
  });

  return Promise.resolve();
}

const loadAuth = (server) => {
	return auth.config(server);
}

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
