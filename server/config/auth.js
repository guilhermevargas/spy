'use strict';

const nconf =  require('nconf');
const jwt   =  require('hapi-auth-jwt2');

const Promise = require("bluebird");

const JWT_SECRET    = nconf.get('auth:jwt:secret');

module.exports.config = (server) => {
	const promises = [
		loadJWTAuth(server)
	];

	return Promise.promisifyAll(promises);
}

const loadJWTAuth = (server) => {


	return Promise.promisify(server.register(jwt, (err) => {
    
    server.auth.strategy('token', 'jwt', {
      key: JWT_SECRET,
      validateFunc: validate,
      verifyOptions: { algorithms: [ 'HS256' ] }  // only allow HS256 algorithm
    });
  
    server.auth.default('jwt');
  }));
}

const validate = (decoded, request, callback) => {
	return Promise.promisify(() => {
		callback(null, true);
	})
}
