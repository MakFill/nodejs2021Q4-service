import { Logger } from '@nestjs/common';
import { appendFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

export function writeToLogs(
  data: string | object,
  logLvl: 'log' | 'warn' | 'error' = 'log',
  errorStack?: string,
) {
  const dirPath = join(__dirname, '../../', 'logs');
  const date = new Date();
  const time = `[${date.getDate()}/${('0' + (date.getMonth() + 1)).slice(
    -2,
  )}/${date.getFullYear()}, ${date.getHours()}:${(
    '0' +
    (date.getMinutes() + 1)
  ).slice(-2)}:${('0' + (date.getSeconds() + 1)).slice(-2)}]`;

  if (!existsSync(dirPath)) {
    mkdirSync(dirPath);
  }

  const fileName =
    logLvl === 'warn' || logLvl === 'error' ? 'errors.log' : 'info.log';

  const writeData = errorStack ? errorStack : data;

  appendFileSync(join(dirPath, fileName), time + writeData + '\n' + '\n', {
    flag: 'a',
    encoding: 'utf8',
  });

  Logger[logLvl](data);
}
