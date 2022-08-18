import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePartyDto } from './dto/create-party.dto';
import { UpdatePartyDto } from './dto/update-party.dto';
import { Party, PartyDocument } from './schemas/party.schema';
import { Model } from 'mongoose';

@Injectable()
export class PartiesService {
  constructor(
    @InjectModel(Party.name) private partyModel: Model<PartyDocument>,
  ) {}
  async create(createPartyDto: CreatePartyDto) {
    Logger.verbose(`Creates one party: ${createPartyDto.title}`);
    return this.partyModel.create(createPartyDto);
  }

  async findAll() {
    Logger.verbose(`This action returns all parties`);
    const parties = await this.partyModel.find().lean();
    return parties;
  }

  async findOne(id: string) {
    Logger.verbose(`This action returns a #${id} party`);
    const party = await this.partyModel.findById(id).lean();
    return party;
  }

  async update(id: string, updatePartyDto: UpdatePartyDto) {
    Logger.verbose(`This action updates a #${id} party`);
    return this.partyModel.findByIdAndUpdate(id, updatePartyDto, {
      new: true,
    });
  }

  async remove(id: string) {
    Logger.verbose(`This action removes a #${id} party`);
    return this.partyModel.findByIdAndRemove(id);
  }
}
