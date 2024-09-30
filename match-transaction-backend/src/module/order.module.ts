import { Module } from '@nestjs/common';
import { OrderController } from 'src/controller/order.controller';
import { MySqlClient } from 'src/dao/prisma/client/mysql.client';
import { OrderRepository } from 'src/dao/prisma/repository/order.repository';
import { OrderService } from 'src/service/order.service';
@Module({
  imports: [],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository, MySqlClient],
  exports: [OrderService], 
})
export class OrderModule {}