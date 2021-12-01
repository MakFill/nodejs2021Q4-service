const {
  getBoardOpts,
  getBoardsOpts,
  postBoardOpts,
  deleteBoardOpts,
  putBoardOpts,
} = require('./board.schemas');

function boardRoutes(fastify, options, done) {
  fastify.get('/boards', getBoardsOpts);

  fastify.get('/boards/:boardId', getBoardOpts);

  fastify.post('/boards', postBoardOpts);

  fastify.delete('/boards/:boardId', deleteBoardOpts);

  fastify.put('/boards/:boardId', putBoardOpts);

  done();
}

module.exports = boardRoutes;
