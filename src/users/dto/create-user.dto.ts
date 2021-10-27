import { IsString, IsNotEmpty, IsNumber, IsEmail, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { DataType } from './properties/properties';
export class CreateUserDto {
  @ApiProperty({
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  first_name: string;

  @ApiProperty({
    type: String,
    required: true,
  })

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  last_name: string;

  @IsString()
  @MaxLength(60)
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: Number,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  @MinLength(11)
  phone: number;

  @ApiProperty({ enum: ['string', 'number', 'boolean']})
  type: DataType;
}
