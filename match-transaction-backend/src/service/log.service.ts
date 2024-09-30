import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LogService {
  private logger = new Logger('AppLogger');

  log(message: string) {
    this.logger.log(message);
  }

  error(message: string) {
    this.logger.error(message);
  }

  warn(message: string) {
    this.logger.warn(message);
  }
}
