import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LogService } from 'src/service/log.service';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private readonly logService: LogService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();
    this.logService.log(`Received request: ${req.method} ${req.originalUrl}`);

    res.on('finish', () => {
      const duration = Date.now() - start;
      this.logService.log(
        `Request to ${req.method} ${req.originalUrl} took ${duration}ms`,
      );
    });

    next();
  }
}
