import { Module } from '@nestjs/common';
import { MatchedRecordController } from 'src/controller/matched.record.controller';
import { MatchTransactionService } from 'src/service/match.transaction.service';
import { MatchRecordService } from 'src/service/matched.record.service';
import { TransactionModule } from './transaction.module';
import { OrderModule } from './order.module';
import { MySqlClient } from 'src/dao/prisma/client/mysql.client';
import { LogService } from 'src/service/log.service';
@Module({
  imports: [TransactionModule, OrderModule],
  controllers: [MatchedRecordController],
  providers: [MatchRecordService, MatchTransactionService,MySqlClient, LogService],
})
export class MatchedRecordModule {}
