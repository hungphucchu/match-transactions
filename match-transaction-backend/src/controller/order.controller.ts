import { Controller, Post, Body, Get, Delete} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateMatchedRecordRequest, MatchedRecordRequest, UpdateMatchedRecordRequest } from 'src/dto/matched.record.dto';
import { GetOrderRequest } from 'src/dto/order.dto';
import { OrderService } from 'src/service/order.service';

@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post('transactions')
  @ApiOperation({ summary: 'Create quizzes' })
  @ApiResponse({ status: 200, description: 'Successfully create quizzes.' })
  async getOrders(@Body() body: GetOrderRequest) {
    return await this.orderService.getOrdersTransaction(body);
  }

  @Delete('transactions')
  @ApiOperation({ summary: 'Create quizzes' })
  @ApiResponse({ status: 200, description: 'Successfully create quizzes.' })
  async deleteOrdersTransaction(@Body() body: GetOrderRequest) {
    return await this.orderService.deleteOrdersTransaction(body);
  }

}
