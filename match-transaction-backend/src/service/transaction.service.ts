import { BadRequestException, Injectable } from '@nestjs/common';
import { Transaction, Order } from '@prisma/client';
import { TransactionRepository } from 'src/dao/prisma/repository/transaction.repository';
import { OrderRepository } from 'src/dao/prisma/repository/order.repository';
import { CreateTransactionRequest } from 'src/dto/transaction.dto';

@Injectable()
export class TransactionService {
  constructor(
    private transactionRepository: TransactionRepository,
    private orderRepository: OrderRepository
  ) {}

  async createTransaction(orderUuid: string, newTransactionRequest: CreateTransactionRequest) {
    
    const existingOrder: Order = await this.orderRepository.findUnique({
      where: { order_uuid: orderUuid },
    });

    if (!existingOrder) {
      throw new BadRequestException(
        `Order with UUID ${newTransactionRequest.orderId} does not exist!`
      );
    }

    const existTransaction = await this.transactionRepository.findFirst({
      where: {
        customerName: newTransactionRequest.customerName,
        product: newTransactionRequest.product,
        date: new Date(newTransactionRequest.date),
        transactionDate: new Date(newTransactionRequest.transactionDate),
      },
    });

    if (existTransaction) {
      throw new BadRequestException(`Transaction already exists!`);
    }

    
    const newTransaction: Transaction = await this.transactionRepository.create({
      data: {
        ...newTransactionRequest,
        order_id: existingOrder.order_id, 
        date: new Date(newTransactionRequest.date),
        transactionDate: new Date(newTransactionRequest.transactionDate),
      },
    });

    return {
      success: true,
      data: {
        transaction_uuid: newTransaction.transaction_uuid,
        ...newTransactionRequest,
        date: new Date(newTransactionRequest.date),
        transactionDate: new Date(newTransactionRequest.transactionDate),
      },
    };
  }

  async getTransactions() {
    const transactions = await this.transactionRepository.findAll();
    return {
      success: true,
      data: transactions,
    };
  }

  async deleteTransaction(data: any) {
    return await this.transactionRepository.delete(data);
   
  }
  
}
