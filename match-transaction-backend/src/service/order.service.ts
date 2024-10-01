import { BadRequestException, Injectable } from '@nestjs/common';
import { Order } from '@prisma/client';
import { OrderRepository } from 'src/dao/prisma/repository/order.repository';
import { CreateOrderRequest, DeleteOrderRequest, GetOrderRequest } from 'src/dto/order.dto';
import { TransactionService } from './transaction.service';

@Injectable()
export class OrderService {
  constructor(
    private orderRepository: OrderRepository,
    private transactionService: TransactionService,
  ) {}

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

  async getOrdersTransaction(body: GetOrderRequest) {

    const searchData: any = {
      include: {
        transactions: true, 
      },
    };

    if (body?.ordersId){
      const { ordersId } = body;
      if (ordersId.length > 0) searchData.where =  { orderId: { in: ordersId } };
    }
    const ordersWithTransactions = await this.orderRepository.findMany(searchData);

    return {
      success: true,
      data: ordersWithTransactions,
    };
  }

  async deleteOrdersTransaction(body: DeleteOrderRequest) {
    const { ordersId } = body;

  
    if (!ordersId || ordersId.length === 0) {
      throw new BadRequestException('No ordersId provided');
    }
  
    
    const orderPromises = ordersId.map(async (orderId) => {
    
      const existOrder: any = await this.orderRepository.findFirst({
        where: { orderId: orderId },
        include: {
          transactions: true, 
        },
      });
  
      
      if (!existOrder) throw new BadRequestException(`Order ${orderId} not exists!`);

      console.log("existOrder.transactions = ");
    console.log(existOrder.transactions);
  
    if (existOrder.transactions.length > 0){
      
      const transactionPromises = existOrder.transactions.map(async (transaction) => {
        console.log("transaction = ");
    console.log(transaction);
        return await this.transactionService.deleteTransaction({ 
          where: { transaction_id: transaction.transaction_id }
        });
      });
  
      
      await Promise.all(transactionPromises);
    }

    
  
  
      await this.orderRepository.delete({
        where: { order_id: existOrder.order_id },
      });


    
    });
  
    await Promise.all(orderPromises);
  
    return {
      success: true,
      message: 'Orders and their transactions have been deleted successfully',
    };
  }
  
}
