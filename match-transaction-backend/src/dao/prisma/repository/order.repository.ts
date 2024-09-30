import { Order } from '@prisma/client';
import { BaseRepository } from './base.repository';
import { Injectable } from '@nestjs/common';
import { MySqlClient } from '../client/mysql.client';

@Injectable()
export class OrderRepository extends BaseRepository<Order> {
  constructor(private readonly mysqlClient: MySqlClient) {
    super(mysqlClient.order);
  }
}
