const { PORT } = require('./common/config');
const fastify = require('./app');

fastify.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);
