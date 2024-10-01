import { Controller, Post, Body, Delete } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetOrderRequest } from 'src/dto/order.dto';
import { OrderService } from 'src/service/order.service';

@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post('transactions')
  @ApiOperation({ summary: 'Get order transactions' })
  @ApiResponse({
    status: 200,
    description: 'Successfully get order transactions',
  })
  async getOrders(@Body() body: GetOrderRequest) {
    return await this.orderService.getOrdersTransaction(body);
  }

  @Delete('transactions')
  @ApiOperation({ summary: 'Delete order transactions' })
  @ApiResponse({
    status: 200,
    description: 'Successfully delete order transactions.',
  })
  async deleteOrdersTransaction(@Body() body: GetOrderRequest) {
    return await this.orderService.deleteOrdersTransaction(body);
  }
}
