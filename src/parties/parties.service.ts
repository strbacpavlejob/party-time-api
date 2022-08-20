import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePartyDto } from './dto/create-party.dto';
import { UpdatePartyDto } from './dto/update-party.dto';
import { Party, PartyDocument } from './schemas/party.schema';
import { Model } from 'mongoose';
import { AttendsService } from 'src/attends/attends.service';
import { FavoritesService } from 'src/favorites/favorites.service';
import * as moment from 'moment';

@Injectable()
export class PartiesService {
  constructor(
    @InjectModel(Party.name) private partyModel: Model<PartyDocument>,
    @Inject(forwardRef(() => AttendsService))
    private readonly attendsService: AttendsService,
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
  ) {}
  async create(createPartyDto: CreatePartyDto) {
    Logger.verbose(`Creates one party: ${createPartyDto.title}`);

    const newStartTimeDate = moment(
      `${createPartyDto.date} ${createPartyDto.startTime}:00`,
    ).add(1, 'day');

    const newEndTimeDate = moment(
      `${createPartyDto.date} ${createPartyDto.endTime}:00`,
    ).add(1, 'day');

    const startTime = moment(createPartyDto.startTime, 'HH:MM');
    const endTime = moment(createPartyDto.endTime, 'HH:MM');
    if (endTime.isBefore(startTime)) {
      newEndTimeDate.add(1, 'day');
    }

    console.log(`newStartTimeDate`, newStartTimeDate.toDate());
    console.log(`newEndTimeDate`, newEndTimeDate.toDate());

    return this.partyModel.create({
      userId: createPartyDto.userId,
      title: createPartyDto.title,
      latitude: createPartyDto.latitude,
      longitude: createPartyDto.longitude,
      startDateTime: newStartTimeDate.toDate(),
      endDateTime: newEndTimeDate.toDate(),
      ticketPrice: createPartyDto.ticketPrice,
      numberOfPeople: createPartyDto.numberOfPeople,
      tags: createPartyDto.tags,
    });
  }

  async findAllHosted(userId: string) {
    Logger.verbose(`This action returns all parties hosted by the user`);
    const parties = await this.partyModel
      .find({ userId: { $eq: userId } })
      .lean();
    return parties;
  }

  async findAllFeeded(userId: string) {
    Logger.verbose(`This action returns all parties from feed`);
    const parties = await this.partyModel
      .find({ userId: { $ne: userId } })
      .lean();
    return parties;
  }

  async attendParty(partyId: string, userId: string) {
    Logger.verbose(`This action toggles attend flag for single party`);
    const foundAttend = await this.attendsService.findByPartyIdAndUserId(
      partyId,
      userId,
    );
    if (foundAttend) {
      await this.attendsService.create({ partyId, userId });
      return `Party attend status: ${true}`;
    }
    await this.attendsService.remove(foundAttend._id);
    return `Party attend status: ${false}`;
  }
  async favoriteParty(partyId: string, userId: string) {
    Logger.verbose(`This action toggles favorite flag for single party`);
    const foundFavorite = await this.favoritesService.findByPartyIdAndUserId(
      partyId,
      userId,
    );
    if (foundFavorite) {
      await this.favoritesService.create({ partyId, userId });
    } else {
      await this.favoritesService.remove(foundFavorite._id);
    }
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
