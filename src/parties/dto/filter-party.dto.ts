import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import * as moment from 'moment';

export class FilterPartyDto {
  @ApiProperty({ example: 'rock' })
  @IsOptional()
  @IsString()
  searchedWords: string;

  @ApiProperty({ example: moment().add(10, 'days').format('YYYY-MM-DD') })
  @IsOptional()
  @IsString()
  dateMin: string;
  @ApiProperty({ example: moment().add(20, 'days').format('YYYY-MM-DD') })
  @IsOptional()
  @IsString()
  dateMax: string;

  // @ApiProperty({ example: moment().add(8, 'hours').format('HH:MM') })
  // startTime: string;
  // @ApiProperty({ example: moment().add(10, 'hours').format('HH:MM') })
  // endTime: string;

  @ApiProperty({ example: 20 })
  @IsOptional()
  @IsNumber()
  ticketPriceMin: number;
  @ApiProperty({ example: 40 })
  @IsOptional()
  @IsNumber()
  ticketPriceMax: number;

  @ApiProperty({ example: 50 })
  @IsOptional()
  @IsNumber()
  numberOfGuestsMin: number;
  @ApiProperty({ example: 100 })
  @IsOptional()
  @IsNumber()
  numberOfGuestsMax: number;

  @ApiProperty({ example: 'A3PsUnNvXDNeJ2XTKVRCkhJliB73' })
  @IsOptional()
  @IsString()
  userId: string;
}
