import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @IsString()
  @ApiProperty()
  customerId: string;

  @IsNotEmpty()
  @ApiProperty({ type: () => CreateOrderItemDto, isArray: true })
  orderItems: CreateOrderItemDto[];
}

export class CreateOrderItemDto {
  @IsString()
  @ApiProperty()
  productId: string;

  @IsNumber()
  @ApiProperty()
  quantity: number;

  @IsNumber()
  @ApiProperty()
  totalPrice: number;
}
