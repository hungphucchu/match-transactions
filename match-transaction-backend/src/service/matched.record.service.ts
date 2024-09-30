import {
  Injectable,
} from '@nestjs/common';
import { MatchTransactionService } from './match.transaction.service';
import { CreateTransactionRequest } from 'src/dto/transaction.dto';
import { CreateOrderRequest } from 'src/dto/order.dto';
import { CreateMatchedRecordRequest, UpdateMatchedRecordRequest } from 'src/dto/matched.record.dto';
import { OrderService } from './order.service';
import { TransactionService } from './transaction.service';

@Injectable()
export class MatchRecordService {
  constructor(
    private matchTransactionService: MatchTransactionService,
    private orderService: OrderService,
    private transactionService: TransactionService,
  ) {}

  async matchTransactionRecords(orders: CreateOrderRequest[], transactions: CreateTransactionRequest[]) {
    try {
      const matchRecords = this.matchTransactionService.matchOrdersAndTransactions(orders,transactions);
      return {
        success: true,
        data: matchRecords,
      };
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async updateMatchTransactionRecords(updateMatchedRecordRequest: UpdateMatchedRecordRequest) {
    try {
      this.matchTransactionService.updateMatchPreference(updateMatchedRecordRequest);
      
      return {
        success: true,
        data: "Successfully Update the match transactions",
      };
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async createMatchTransactionRecords(createMatchedRecordRequest: CreateMatchedRecordRequest) {
      const orderPromises = createMatchedRecordRequest.data.map(async (matchTransactionItem) => {
        const newOrder = matchTransactionItem.order;
        const { customerName, orderId, date, product, price } = newOrder;
  
        const createNewOrder = await this.orderService.createOrder({
          customerName,
          orderId,
          date,
          product,
          price,
        });
  
        if (createNewOrder.success) {
          const transactionPromises = matchTransactionItem.transactions.map(transaction => {
            const {
              customerName,
              orderId,
              date,
              product,
              price,
              transactionType,
              transactionDate,
              transactionAmount,
            } = transaction;
  
           
            return this.transactionService.createTransaction(createNewOrder.data.order_uuid, {
              customerName,
              orderId,
              date,
              product,
              price,
              transactionType,
              transactionDate,
              transactionAmount,
            });
          });
  
          
          return Promise.all(transactionPromises);
        }
      });
  
      
      await Promise.all(orderPromises);
  
      return {
        success: true,
        data: createMatchedRecordRequest,
      };
    
  }
  

  

}


