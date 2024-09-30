import { Controller, Post, Body} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateMatchedRecordRequest, MatchedRecordRequest, UpdateMatchedRecordRequest } from 'src/dto/matched.record.dto';
import { MatchRecordService } from 'src/service/matched.record.service';

@ApiTags('match')
@Controller('match')
export class MatchedRecordController {
  constructor(private matchRecordService: MatchRecordService) {}

  @Post('transactions')
  @ApiOperation({ summary: 'Create quizzes' })
  @ApiResponse({ status: 200, description: 'Successfully create quizzes.' })
  async matchTransactions(@Body() body: MatchedRecordRequest) {
    const {orders, transactions} = body;
    return this.matchRecordService.matchTransactionRecords(orders, transactions);
  }

  @Post('transactions/update')
  @ApiOperation({ summary: 'Retrieve all quizzes' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved quizzes.' })
  async updateMatchTransactions(@Body() body: UpdateMatchedRecordRequest) {
    return this.matchRecordService.updateMatchTransactionRecords(body);
  }

  @Post('transactions/create')
  @ApiOperation({ summary: 'Create quizzes' })
  @ApiResponse({ status: 200, description: 'Successfully create quizzes.' })
  async createMatchTransactions(@Body() body: CreateMatchedRecordRequest) {
    return this.matchRecordService.createMatchTransactionRecords(body);
  }
}
