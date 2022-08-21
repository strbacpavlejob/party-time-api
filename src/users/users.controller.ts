import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/utils/guards/jwt-guard.guard';
import { GetCurrentUserById } from 'src/utils';
import { GenericUserResponse, UserListResponse } from './types/user.response.type';
import { createGenericResponse } from 'src/common/http/response';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOkResponse({
    type: GenericUserResponse,
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOkResponse({
    type: UserListResponse,
  })
  async findAll() {
    const data = await this.usersService.findAll();
    return createGenericResponse(data);
  }

  @Get(':id')
  @ApiOkResponse({
    type: GenericUserResponse,
  })
  async findOne(@Param('id') id: string) {
    const data = await this.usersService.findOne(id);
    return createGenericResponse(data);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOkResponse({
    type: GenericUserResponse,
  })
  update(
    @Param('id') id: string,
    @GetCurrentUserById() userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, userId, updateUserDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOkResponse({
    type: GenericUserResponse,
  })
  remove(@Param('id') id: string, @GetCurrentUserById() userId: string) {
    return this.usersService.remove(id, userId);
  }
}
