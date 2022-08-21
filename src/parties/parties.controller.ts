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
import { PartiesService } from './parties.service';
import { CreatePartyDto } from './dto/create-party.dto';
import { UpdatePartyDto } from './dto/update-party.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/utils/guards/jwt-guard.guard';
import { GetCurrentUserById } from 'src/utils';

@Controller('parties')
@ApiTags('Parties')
export class PartiesController {
  constructor(private readonly partiesService: PartiesService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createPartyDto: CreatePartyDto,
    @GetCurrentUserById() userId: string,
  ) {
    console.log('userId', userId);
    return this.partiesService.create(userId, createPartyDto);
  }

  // list all hosted by user

  // filter-parties feeded-hosted, all other filters
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(`hosted-parties`)
  findAllHosted(@GetCurrentUserById() userId: string) {
    return this.partiesService.findAllHosted(userId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(`feeded-parties/`)
  findAllFeeded(@GetCurrentUserById() userId: string) {
    return this.partiesService.findAllFeeded(userId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(`attend/:id`)
  attendParty(@Param('id') id: string, @GetCurrentUserById() userId: string) {
    return this.partiesService.attendParty(id, userId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(`favorite/:id`)
  favoriteParty(@Param('id') id: string, @GetCurrentUserById() userId: string) {
    return this.partiesService.favoriteParty(id, userId);
  }

  @Get()
  findAll() {
    return this.partiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.partiesService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @GetCurrentUserById() userId: string,
    @Body() updatePartyDto: UpdatePartyDto,
  ) {
    return this.partiesService.update(id, userId, updatePartyDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @GetCurrentUserById() userId: string) {
    return this.partiesService.remove(id, userId);
  }
}
