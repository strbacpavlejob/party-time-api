import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import * as moment from 'moment';

export class CreatePartyDto {
  @ApiProperty({ example: 'Super Party' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 44.783245277970835 })
  @IsNumber()
  latitude: number;

  @ApiProperty({ example: 20.473739616572853 })
  @IsNumber()
  longitude: number;

  @ApiProperty({ example: moment().add(10, 'days').format('YYYY-MM-DD') })
  @IsString()
  @IsNotEmpty()
  date: string;

  @ApiProperty({ example: moment().add(10, 'hours').format('HH:MM') })
  @IsString()
  @IsNotEmpty()
  startTime: string;

  @ApiProperty({ example: moment().add(12, 'hours').format('HH:MM') })
  @IsString()
  @IsNotEmpty()
  endTime: string;

  @ApiProperty({ example: 20 })
  @IsNumber()
  @IsPositive()
  ticketPrice: number;

  @ApiProperty({ example: 100 })
  @IsNumber()
  @IsPositive()
  numberOfGuests: number;

  @ApiProperty({ example: ['pop', 'rock', '90s'] })
  @IsArray()
  tags: Array<string>;
}
