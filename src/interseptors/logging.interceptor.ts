import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { writeToLogs } from '../utils';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const req = context.switchToHttp().getRequest();
    const url = process.env.USE_FASTIFY === 'true' ? req.url : req.originalUrl;

    return next.handle().pipe(
      tap(() => {
        const res = context.switchToHttp().getResponse();

        const logData = `
url: ${url}
statusCode: ${res.statusCode} 
method: ${req.method} 
query: ${JSON.stringify(req.query)}
body: ${
          req.body
            ? JSON.stringify(
                req.body.password
                  ? { ...req.body, password: '******' }
                  : req.body,
              )
            : ''
        }`;

        writeToLogs(logData, 'log');
      }),
    );
  }
}
