import { ApiProperty } from '@nestjs/swagger';

export class CreateFavoriteDto {
  @ApiProperty({ example: '87RwhVigSJPByAtK5VLuc2Xm4iB3' })
  partyId: string;
  @ApiProperty({ example: 'A3PsUnNvXDNeJ2XTKVRCkhJliB73' })
  userId: string;
}
