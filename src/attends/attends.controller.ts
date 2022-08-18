import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AttendsService } from './attends.service';
import { CreateAttendDto } from './dto/create-attend.dto';
import { UpdateAttendDto } from './dto/update-attend.dto';

@Controller('attends')
@ApiTags('Attends')
export class AttendsController {
  constructor(private readonly attendsService: AttendsService) {}

  @Post()
  create(@Body() createAttendDto: CreateAttendDto) {
    return this.attendsService.create(createAttendDto);
  }

  @Get()
  findAll() {
    return this.attendsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attendsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAttendDto: UpdateAttendDto) {
    return this.attendsService.update(id, updateAttendDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attendsService.remove(id);
  }
}
