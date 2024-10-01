import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MatchedRecordModule } from './module/matched.record.module';
import { LogService } from './service/log.service';
import { LoggingMiddleware } from './middleware/logging.middleware';

@Module({
  imports: [MatchedRecordModule],
  providers: [LogService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
