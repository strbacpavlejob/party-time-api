import { ApiProperty } from '@nestjs/swagger';
import * as moment from 'moment';

export class CreatePartyDto {
  @ApiProperty({ example: 'rock' })
  searchedWords: string;

  @ApiProperty({ example: moment().add(10, 'days').format('YYYY-MM-DD')})
  dateMin: string;
  @ApiProperty({ example: moment().add(20, 'days').format('YYYY-MM-DD') })
  dateMax: string;

  @ApiProperty({ example: moment().add(8, 'hours').format('HH:MM') })
  startTime: string;
  @ApiProperty({ example: moment().add(10, 'hours').format('HH:MM') })
  endTime: string;

  @ApiProperty({ example: 20 })
  ticketPriceMin: number;
  @ApiProperty({ example: 40 })
  ticketPriceMax: number;

  @ApiProperty({ example: 50 })
  numberOfGuestsMin: number;
  @ApiProperty({ example: 100 })
  numberOfGuestsMax: number;
}
