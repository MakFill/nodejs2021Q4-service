import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  HttpStatus,
  HttpException,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
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
    } else if (status === HttpStatus.BAD_REQUEST) {
      const res = exception as BadRequestException;
      response.status(status).send(res.getResponse());
      writeToLogs(`BadRequestException: ${res.message}`, 'warn', res.stack);
    } else if (status === HttpStatus.NOT_FOUND) {
      const res = exception as NotFoundException;
      response.status(status).send(res.getResponse());
      writeToLogs(`NotFoundException: ${res.message}`, 'warn', res.stack);
    } else if (status === HttpStatus.UNAUTHORIZED) {
      const res = exception as UnauthorizedException;
      response.status(status).send(res.getResponse());
      writeToLogs(`UnauthorizedException: ${res.message}`, 'warn', res.stack);
    } else {
      response.status(status).send({
        statusCode: status,
        error: 'Internal server error',
      });
      writeToLogs(exception.message, 'error', exception.stack);
    }
  }
}
