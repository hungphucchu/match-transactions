import { BadRequestException, Injectable } from '@nestjs/common';
import { Order } from '@prisma/client';
import { OrderRepository } from 'src/dao/prisma/repository/order.repository';
import { CreateOrderRequest } from 'src/dto/order.dto';

@Injectable()
export class OrderService {
  constructor(private orderRepository: OrderRepository) {}

  async createOrder(newOrderRequest: CreateOrderRequest) {
    const existOrder = await this.orderRepository.findFirst({
      where: { 
        customerName: newOrderRequest.customerName,
        orderId: newOrderRequest.orderId,
        product: newOrderRequest.product,
       },
    });
    if (existOrder)
      throw new BadRequestException(`Order with customer name ${newOrderRequest.customerName} and orderId ${newOrderRequest.orderId} and product ${newOrderRequest.product} already exists!`);
     
    const newOrder: Order = await this.orderRepository.create({
      data: {
        ...newOrderRequest,
        date: new Date(newOrderRequest.date),
      },
    });
    return {
      success: true,
      data: {
        order_uuid: newOrder.order_uuid,
        ...newOrderRequest,
        date: newOrder.date, 
      },
    };
  }

  async getOrders() {
    const orders: any = await this.orderRepository.findAll();
    return {
      success: true,
      data: orders,
    };
  }

  async getOrdersTransaction() {
    const ordersWithTransactions = await this.orderRepository.findMany({
      include: {
        transactions: true, 
      },
    });

    return {
      success: true,
      data: ordersWithTransactions,
    };
  }
}
