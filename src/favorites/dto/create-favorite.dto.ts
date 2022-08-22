import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateFavoriteDto {
  @ApiProperty({ example: '87RwhVigSJPByAtK5VLuc2Xm4iB3' })
  @IsString()
  partyId: string;
  @ApiProperty({ example: 'A3PsUnNvXDNeJ2XTKVRCkhJliB73' })
  @IsString()
  userId: string;
}
