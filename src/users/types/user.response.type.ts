import { ApiResponseProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import { GenericResponse, ListResponse } from 'src/common/http/response';

export class UserResponse {
  @ApiResponseProperty({ example: 'A3PsUnNvXDNeJ2XTKVRCkhJliB73' })
  @IsString()
  _id: string;
  
  @ApiResponseProperty({ example: 'john@smith.com' })
  @IsEmail()
  email: string;

  @ApiResponseProperty({ example: 'John' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Za-z0-9- ]+$/, {
    message:
      'Invalid firstName, accepts only alphabets, numbers, the special character - and white spaces (\\s)',
  })
  firstName: string;

  @ApiResponseProperty({ example: 'Smith' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Za-z0-9- ]+$/, {
    message:
      'Invalid lastName, accepts only alphabets, numbers, the special character - and white spaces (\\s)',
  })
  lastName: string;
}

export class UserListResponse extends ListResponse<UserResponse> {
  @ApiResponseProperty({ type: [UserResponse] })
  data: UserResponse[];
}

export class GenericUserResponse extends GenericResponse<UserResponse> {
  @ApiResponseProperty({ type: UserResponse })
  data: UserResponse;
}

export class UserPartialResponse extends GenericResponse<
  Partial<UserResponse>
> {
  @ApiResponseProperty({ type: PartialType(UserResponse) })
  data: Partial<UserResponse>;
}
