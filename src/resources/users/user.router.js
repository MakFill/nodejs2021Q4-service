const {
  getUserOpts,
  getUsersOpts,
  postUserOpts,
  deleteUserOpts,
  putUserOpts,
} = require('./user.schemas');

function userRoutes(fastify, options, done) {
  fastify.get('/users', getUsersOpts);

  fastify.get('/users/:userId', getUserOpts);

  fastify.post('/users', postUserOpts);

  fastify.delete('/users/:userId', deleteUserOpts);

  fastify.put('/users/:userId', putUserOpts);

  done();
}

module.exports = userRoutes;
