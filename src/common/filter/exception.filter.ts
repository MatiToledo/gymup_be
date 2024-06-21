import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { LoggerService } from '../logger/logger.service';
import { I18nService, I18nContext } from 'nestjs-i18n';

interface IError {
  message: string;
  code_error?: string;
}

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly logger: LoggerService,
    private readonly i18n: I18nService<Record<string, unknown>>,
  ) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request: any = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let errorMessage: string;
    if (exception instanceof HttpException) {
      const response = exception.getResponse();
      if (typeof response === 'string') {
        errorMessage = response;
      } else if (
        typeof response === 'object' &&
        response !== null &&
        'message' in response
      ) {
        errorMessage = (response as any).message;
      } else {
        errorMessage = 'unknown_error';
      }
    } else {
      errorMessage = exception.message || 'unknown_error';
    }

    const translatedMessage = this.i18n.t(errorMessage, {
      lang: I18nContext.current().lang,
    });

    const responseData = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: translatedMessage,
    };

    this.logMessage(request, errorMessage, status, exception);

    response.status(status).json(responseData);
  }

  private logMessage(
    request: any,
    message: string,
    status: number,
    exception: any,
  ) {
    if (status === 500) {
      this.logger.error(
        `End Request for ${request.path}`,
        `method=${request.method} status=${status} message=${message}`,
        status >= 500 ? exception.stack : '',
      );
    } else {
      this.logger.warn(
        `End Request for ${request.path}`,
        `method=${request.method} status=${status} message=${message}`,
      );
    }
  }
}
