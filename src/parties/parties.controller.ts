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
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/utils/guards/jwt-guard.guard';
import { GetCurrentUserById } from 'src/utils';
import {
  GenericPartyResponse,
  PartyListResponse,
  PartyPartialResponse,
} from './types/party.response.type';
import { FilterPartyDto } from './dto/filter-party.dto';

@Controller('parties')
@ApiTags('Parties')
export class PartiesController {
  constructor(private readonly partiesService: PartiesService) {}

  @ApiBearerAuth()
  @Post('filter')
  @ApiOkResponse({
    type: GenericPartyResponse,
  })
  filter(
    @Body() filterPartyDto: FilterPartyDto,
    @GetCurrentUserById() userId: any,
  ) {
    return this.partiesService.filterParties(userId, filterPartyDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOkResponse({
    type: GenericPartyResponse,
  })
  create(
    @Body() createPartyDto: CreatePartyDto,
    @GetCurrentUserById() userId: string,
  ) {
    console.log('userId', userId);
    return this.partiesService.create(userId, createPartyDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    type: PartyListResponse,
  })
  @Get(`hosted-parties`)
  findAllHosted(@GetCurrentUserById() userId: string) {
    return this.partiesService.findAllHosted(userId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    type: PartyListResponse,
  })
  @Get(`feeded-parties`)
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

  @ApiOkResponse({
    type: PartyListResponse,
  })
  @Get()
  findAll(@GetCurrentUserById() userId: string) {
    return this.partiesService.findAll(userId);
  }

  @Get(':id')
  @ApiOkResponse({
    type: GenericPartyResponse,
  })
  findOne(@GetCurrentUserById() userId: string, @Param('id') id: string) {
    return this.partiesService.findOne(userId, id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOkResponse({
    type: PartyPartialResponse,
  })
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
  @ApiOkResponse({
    type: GenericPartyResponse,
  })
  remove(@Param('id') id: string, @GetCurrentUserById() userId: string) {
    return this.partiesService.remove(id, userId);
  }
}
