import { ApiResponseProperty, PartialType } from '@nestjs/swagger';
import * as moment from 'moment';
import { GenericResponse, ListResponse } from 'src/common/http/response';

export class PartyResponse {
  @ApiResponseProperty({ example: 'A3PsUnNvXDNeJ2XTKVRCkhJliB73' })
  _id: string;
  @ApiResponseProperty({ example: 'Super Party' })
  title: string;
  @ApiResponseProperty({ example: 44.783245277970835 })
  latitude: number;
  @ApiResponseProperty({ example: 20.473739616572853 })
  longitude: number;
  @ApiResponseProperty({
    example: moment().add(10, 'days').format('YYYY-MM-DD'),
  })
  date: string;
  @ApiResponseProperty({ example: moment().add(10, 'hours').format('HH:MM') })
  startTime: string;
  @ApiResponseProperty({ example: moment().add(12, 'hours').format('HH:MM') })
  endTime: string;
  @ApiResponseProperty({ example: 20 })
  ticketPrice: number;
  @ApiResponseProperty({ example: 100 })
  numberOfGuests: number;
  @ApiResponseProperty({ example: ['pop', 'rock', '90s'] })
  tags: Array<string>;
  @ApiResponseProperty({ example: false })
  isAttended: boolean;
  @ApiResponseProperty({ example: true })
  isFavorite: boolean;
  @ApiResponseProperty({ example: 45 })
  currentNumberOfGuests: number;
}

export class PartyListResponse extends ListResponse<PartyResponse> {
  @ApiResponseProperty({ type: [PartyResponse] })
  data: PartyResponse[];
}

export class GenericPartyResponse extends GenericResponse<PartyResponse> {
  @ApiResponseProperty({ type: PartyResponse })
  data: PartyResponse;
}

export class PartyPartialResponse extends GenericResponse<
  Partial<PartyResponse>
> {
  @ApiResponseProperty({ type: PartialType(PartyResponse) })
  data: Partial<PartyResponse>;
}
