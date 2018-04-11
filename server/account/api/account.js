'use strict'

const create = {
	method: 'POST',
	path: '/account',
	handler: async (request, reply) => {
		console.log('my account was create!');
	}
}

module.exports = [ create ];