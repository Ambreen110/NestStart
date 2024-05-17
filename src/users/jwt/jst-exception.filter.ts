import {
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  ExceptionFilter,
} from '@nestjs/common';

@Catch(HttpException)
export class JwtExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (
      exception instanceof HttpException &&
      exception.getStatus() === HttpStatus.UNAUTHORIZED
    ) {
      // Handle unauthorized exception
      response.status(HttpStatus.UNAUTHORIZED).json({
        message: 'Invalid JWT token',
      });
    }

    // Handle other exceptions as needed
  }
}
