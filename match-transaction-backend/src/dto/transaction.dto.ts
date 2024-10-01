import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsDateString, IsOptional } from 'class-validator';

export class CreateTransactionRequest {
  @ApiProperty({
    description: 'The type of the transaction, e.g. payment, refund',
  })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiProperty({
    description: 'The name of the customer associated with the transaction',
  })
  @IsString()
  customerName: string;

  @ApiProperty({ description: 'The order ID associated with the transaction' })
  @IsString()
  orderId: string;

  @ApiProperty({ description: 'The date when the transaction was made' })
  @IsDateString()
  date: string;

  @ApiProperty({
    description: 'The name of the product related to the transaction',
  })
  @IsString()
  product: string;

  @ApiProperty({
    description: 'The price of the product related to the transaction',
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    description:
      'The specific type of the transaction, such as paymentReceived, refundIssued',
  })
  @IsString()
  transactionType: string;

  @ApiProperty({ description: 'The date the transaction occurred' })
  @IsDateString()
  transactionDate: string;

  @ApiProperty({ description: 'The amount involved in the transaction' })
  @IsNumber()
  transactionAmount: number;
}
