import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateOrderRequest } from './order.dto';
import { CreateTransactionRequest } from './transaction.dto';

export class MatchedRecordRequest {
  @ApiProperty({
    description:
      'Array of order information associated with the matched record',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderRequest)
  orders: CreateOrderRequest[];

  @ApiProperty({
    description: 'Array of transactions associated with the matched record',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTransactionRequest)
  transactions: CreateTransactionRequest[];
}

export class MatchedRecordData {
  @ApiProperty({
    description: 'Order information associated with the matched record',
  })
  @IsNotEmpty()
  @Type(() => CreateOrderRequest)
  order: CreateOrderRequest;

  @ApiProperty({
    description: 'Array of transactions associated with the matched record',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTransactionRequest)
  transactions: CreateTransactionRequest[];
}

export class CreateMatchedRecordRequest {
  @ApiProperty({ description: 'The data to create match record request' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MatchedRecordData)
  data: MatchedRecordData[];
}

export enum MatchType {
  FULL_MATCH = 'full_match',
  PARTIAL_MATCH = 'partial_match',
}

export class UpdateMatchedRecordRequest {
  @ApiProperty({
    description: 'The name of the customer associated with the transaction',
  })
  @IsOptional()
  @IsEnum(MatchType)
  customerName?: MatchType;

  @ApiProperty({ description: 'The order ID associated with the transaction' })
  @IsOptional()
  @IsEnum(MatchType)
  orderId?: MatchType;

  @ApiProperty({
    description: 'The name of the product related to the transaction',
  })
  @IsOptional()
  @IsEnum(MatchType)
  product?: MatchType;
}
