import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  HttpStatus,
  HttpException,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { writeToLogs } from '../utils';

@Catch()
export class ErrorFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    if (
      exception instanceof QueryFailedError &&
      (exception as QueryFailedError).driverError.routine === 'string_to_uuid'
    ) {
      response.status(status).send({
        statusCode: status,
        error: 'id must be UUID format',
      });
      writeToLogs('id wrong format', 'warn');
    } else {
      let res: HttpException;
      switch (status) {
        case HttpStatus.BAD_REQUEST:
          res = exception as BadRequestException;
          response.status(status).send(res.getResponse());
          writeToLogs(`BadRequestException: ${res.message}`, 'warn', res.stack);
          break;
        case HttpStatus.NOT_FOUND:
          res = exception as NotFoundException;
          response.status(status).send(res.getResponse());
          writeToLogs(`NotFoundException: ${res.message}`, 'warn', res.stack);
          break;
        case HttpStatus.UNAUTHORIZED:
          res = exception as UnauthorizedException;
          response.status(status).send(res.getResponse());
          writeToLogs(
            `UnauthorizedException: ${res.message}`,
            'warn',
            res.stack,
          );
          break;
        case HttpStatus.FORBIDDEN:
          res = exception as ForbiddenException;
          response.status(status).send(res.getResponse());
          writeToLogs(`ForbiddenException: ${res.message}`, 'warn', res.stack);
          break;
        default:
          response.status(status).send({
            statusCode: status,
            error: 'Internal server error',
          });
          writeToLogs(exception.message, 'error', exception.stack);
      }
    }
  }
}
