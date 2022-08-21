import { ApiProperty } from '@nestjs/swagger';
import * as moment from 'moment';

export class CreatePartyDto {
  @ApiProperty({ example: 'Super Party' })
  title: string;
  @ApiProperty({ example: 44.783245277970835 })
  latitude: number;
  @ApiProperty({ example: 20.473739616572853 })
  longitude: number;
  @ApiProperty({ example: moment().add(10, 'days').format('YYYY-MM-DD') })
  date: string;
  @ApiProperty({ example: moment().add(10, 'hours').format('HH:MM') })
  startTime: string;
  @ApiProperty({ example: moment().add(12, 'hours').format('HH:MM') })
  endTime: string;
  @ApiProperty({ example: 20 })
  ticketPrice: number;
  @ApiProperty({ example: 100 })
  numberOfGuests: number;
  @ApiProperty({ example: ['pop', 'rock', '90s'] })
  tags: Array<string>;
}
