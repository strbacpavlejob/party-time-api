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


@Controller('parties')
@ApiTags('Parties')
export class PartiesController {
  constructor(private readonly partiesService: PartiesService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createPartyDto: CreatePartyDto) {
    return this.partiesService.create(createPartyDto);
  }

  @Get(`hosted/:userId`)
  findAllHosted(@Param('userId') userId: string) {
    return this.partiesService.findAllHosted(userId);
  }
  @Get(`feeded/:userId`)
  findAllFeeded(@Param('userId') userId: string) {
    return this.partiesService.findAllFeeded(userId);
  }

  @Patch(`attend/:partyId/user/:userId`)
  attendParty(
    @Param('partyId') partyId: string,
    @Param('userId') userId: string,
  ) {
    return this.partiesService.attendParty(partyId, userId);
  }

  @Patch(`favorite/:partyId/user/:userId`)
  favoriteParty(
    @Param('partyId') partyId: string,
    @Param('userId') userId: string,
  ) {
    return this.partiesService.favoriteParty(partyId, userId);
  }

  @Get()
  findAll() {
    return this.partiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.partiesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePartyDto: UpdatePartyDto) {
    return this.partiesService.update(id, updatePartyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.partiesService.remove(id);
  }
}
