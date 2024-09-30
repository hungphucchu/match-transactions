import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsDateString, IsOptional } from 'class-validator';

export class CreateOrderRequest {
  @ApiProperty({ description: 'The type of the order' })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiProperty({ description: 'The name of the customer' })
  @IsString()
  @IsNotEmpty()
  customerName: string;

  @ApiProperty({ description: 'The unique order identifier' })
  @IsString()
  @IsNotEmpty()
  orderId: string;

  @ApiProperty({ description: 'The date of the order' })
  @IsDateString()
  date: string;

  @ApiProperty({ description: 'The product ordered' })
  @IsString()
  @IsNotEmpty()
  product: string;

  @ApiProperty({ description: 'The price of the order' })
  @IsNumber()
  price: number;
}
