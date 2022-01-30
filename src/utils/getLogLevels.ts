import { LogLevel } from '@nestjs/common/services/logger.service';

export function getLogLevels(val?: string): LogLevel[] {
  switch (val) {
    case '0':
      return ['error'];
    case '1':
      return ['warn', 'error'];
    case '2':
      return ['log', 'warn', 'error'];
    case '3':
      return ['error', 'warn', 'log', 'verbose'];
    case '4':
      return ['error', 'warn', 'log', 'verbose', 'debug'];
    default:
      return ['log', 'warn', 'error'];
  }
}
