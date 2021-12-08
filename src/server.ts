import { PORT } from './common/config';
import { server } from './app';

server.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);
