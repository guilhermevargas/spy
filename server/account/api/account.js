'use strict'

const create = {
	method: 'GET',
	path: '/account',
	handler: async (request, reply) => {
		return 'my account was create!';
	}
}

module.exports = [ create ];