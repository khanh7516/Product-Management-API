import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { HttpException } from '@nestjs/common';
import { ErrorResponseDto } from '../dtos/response/error-response.dto';

@Catch(HttpException)
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const message = exception.message || 'Internal server error';
    const error = exception.name;
    const errorResponse = new ErrorResponseDto(message, error);
    
    response
      .status(status)
      .json(errorResponse);
  }
}
