import { Module } from '@nestjs/common';
import { MySqlClient } from 'src/dao/prisma/client/mysql.client';
import { OrderRepository } from 'src/dao/prisma/repository/order.repository';
import { TransactionRepository } from 'src/dao/prisma/repository/transaction.repository';
import { TransactionService } from 'src/service/transaction.service';
@Module({
  imports: [],
  controllers: [],
  providers: [
    TransactionService,
    TransactionRepository,
    OrderRepository,
    MySqlClient,
  ],
  exports: [TransactionService],
})
export class TransactionModule {}
