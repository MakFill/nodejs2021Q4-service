import { PORT } from './common/config';
import { server } from './app';

const appRunLogging = (err: Error) => {
  if (err) {
    server.log.fatal(err);
    process.exit(1);
  }
};

server.listen(PORT ?? 4000, '0.0.0.0', appRunLogging);
