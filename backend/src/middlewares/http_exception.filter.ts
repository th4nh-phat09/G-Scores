import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const resp = exception.getResponse() as any;

    // message của HttpException có thể là string | string[] | object
    const message =
      typeof resp === 'string'
        ? resp
        : Array.isArray(resp?.message)
          ? resp.message.join(', ')
          : (resp?.message ?? exception.message);

    res.status(status).json({
      success: false,
      statusCode: status,
      message,
      code: resp?.code ?? exception.name,
      path: req.url,
      timestamp: new Date().toISOString(),
    });
  }
}
