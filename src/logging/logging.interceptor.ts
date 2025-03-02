import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, body, ip, headers } = request;
    const userAgent = headers['user-agent'] || 'unknown';
    
    const now = Date.now();
    
    this.logger.log(
      `Request: ${method} ${url} - Body: ${JSON.stringify(body)} - IP: ${ip} - User Agent: ${userAgent}`,
    );

    return next.handle().pipe(
      tap({
        next: (_data) => {
          const response = context.switchToHttp().getResponse();
          const delay = Date.now() - now;
          
          this.logger.log(
            `Response: ${method} ${url} - Status: ${response.statusCode} - Delay: ${delay}ms`,
          );
        },
        error: (error) => {
          const delay = Date.now() - now;
          
          this.logger.error(
            `Error: ${method} ${url} - Status: ${error.status} - Message: ${error.message} - Delay: ${delay}ms`,
          );
        },
      }),
    );
  }
} 