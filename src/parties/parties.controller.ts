import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PartiesService } from './parties.service';
import { CreatePartyDto } from './dto/create-party.dto';
import { UpdatePartyDto } from './dto/update-party.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('parties')
@ApiTags('Parties')
export class PartiesController {
  constructor(private readonly partiesService: PartiesService) {}

  @Post()
  create(@Body() createPartyDto: CreatePartyDto) {
    return this.partiesService.create(createPartyDto);
  }

  @Get()
  findAll() {
    return this.partiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.partiesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePartyDto: UpdatePartyDto) {
    return this.partiesService.update(+id, updatePartyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.partiesService.remove(+id);
  }
}
