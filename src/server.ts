import { PORT } from './common/config';
import { server } from './app';

/**
 * Handle errors when App is running
 * @returns void
 */

const appRunLogging = (err: Error) => {
  if (err) {
    server.log.fatal(err);
    process.exit(1);
  }
};

server.listen(PORT || 4000, appRunLogging);
