import { ApiProperty } from '@nestjs/swagger';
import * as moment from 'moment';

export class CreatePartyDto {
  @ApiProperty({ example: 'Super Party' })
  title: string;
  @ApiProperty({ example: 44.783245277970835 })
  latitude: number;
  @ApiProperty({ example: 20.473739616572853 })
  longitude: number;
  @ApiProperty({ example: moment().add(10, 'days') })
  date: Date;
  @ApiProperty({ example: moment().add(10, 'hours') })
  startTime: Date;
  @ApiProperty({ example: moment().add(12, 'hours') })
  endTime: Date;
  @ApiProperty({ example: 20 })
  ticketPrice: number;
  @ApiProperty({ example: 100 })
  maxPeople: number;
  @ApiProperty({ example: ['pop', 'rock', '90s'] })
  tags: Array<string>;
  @ApiProperty({ example: 'A3PsUnNvXDNeJ2XTKVRCkhJliB73' })
  userId: string;
  @ApiProperty({ example: new Date() })
  createdAt: Date;
}
