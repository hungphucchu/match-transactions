import { Controller, Post, Body, Get} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateMatchedRecordRequest, MatchedRecordRequest, UpdateMatchedRecordRequest } from 'src/dto/matched.record.dto';
import { OrderService } from 'src/service/order.service';

@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get('transactions')
  @ApiOperation({ summary: 'Create quizzes' })
  @ApiResponse({ status: 200, description: 'Successfully create quizzes.' })
  async getOrders() {
    return await this.orderService.getOrdersTransaction();
  }


}
