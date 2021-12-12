import { PORT } from './common/config';
import { server } from './app';

/**
 * Logging when App is running
 * @returns void
 */

const appRunLogging = () => {
  console.log(`App is running on http://localhost:${PORT}`);
};

server.listen(PORT || 4000, appRunLogging);
