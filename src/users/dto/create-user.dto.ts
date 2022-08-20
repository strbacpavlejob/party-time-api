import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'john@smith.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'somesecret' })
  @IsString()
  password: string;

  @ApiProperty({ example: 'John' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Za-z0-9- ]+$/, {
    message:
      'Invalid firstName, accepts only alphabets, numbers, the special character - and white spaces (\\s)',
  })
  firstName: string;

  @ApiProperty({ example: 'Smith' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Za-z0-9- ]+$/, {
    message:
      'Invalid lastName, accepts only alphabets, numbers, the special character - and white spaces (\\s)',
  })
  lastName: string;
}
