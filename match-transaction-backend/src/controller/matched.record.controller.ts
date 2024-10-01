import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CreateMatchedRecordRequest,
  MatchedRecordRequest,
  UpdateMatchedRecordRequest,
} from 'src/dto/matched.record.dto';
import { MatchRecordService } from 'src/service/matched.record.service';

@ApiTags('match')
@Controller('match')
export class MatchedRecordController {
  constructor(private matchRecordService: MatchRecordService) {}

  @Post('transactions')
  @ApiOperation({ summary: 'Match Transactions' })
  @ApiResponse({ status: 200, description: 'Successfully match transactions.' })
  async matchTransactions(@Body() body: MatchedRecordRequest) {
    const { orders, transactions } = body;
    return await this.matchRecordService.matchTransactionRecords(
      orders,
      transactions,
    );
  }

  @Post('transactions/preferences')
  @ApiOperation({ summary: 'Update match transaction preference' })
  @ApiResponse({
    status: 200,
    description: 'Successfully update match transaction preference.',
  })
  updateMatchPreference(@Body() body: UpdateMatchedRecordRequest) {
    return this.matchRecordService.updateMatchPreference(body);
  }

  @Post('transactions/create')
  @ApiOperation({ summary: 'Create match transaction' })
  @ApiResponse({
    status: 200,
    description: 'Successfully create match transaction.',
  })
  async createMatchTransactions(@Body() body: CreateMatchedRecordRequest) {
    return await this.matchRecordService.createMatchTransactionRecords(body);
  }
}
