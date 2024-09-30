import { Transaction } from '@prisma/client';
import { BaseRepository } from './base.repository';
import { Injectable } from '@nestjs/common';
import { MySqlClient } from '../client/mysql.client';

@Injectable()
export class TransactionRepository extends BaseRepository<Transaction> {
  constructor(private readonly mysqlClient: MySqlClient) {
    super(mysqlClient.transaction);
  }
}
