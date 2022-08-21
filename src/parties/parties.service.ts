import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePartyDto } from './dto/create-party.dto';
import { UpdatePartyDto } from './dto/update-party.dto';
import { Party, PartyDocument } from './schemas/party.schema';
import { Model, Types } from 'mongoose';
import { AttendsService } from 'src/attends/attends.service';
import { FavoritesService } from 'src/favorites/favorites.service';
import * as moment from 'moment';
import { UsersService } from 'src/users/users.service';
import { throwError } from 'src/common/error/domain';
import { UserErrors } from 'src/common/error/user.errors';
import { PartyErrors } from 'src/common/error/party.errors';

@Injectable()
export class PartiesService {
  constructor(
    @InjectModel(Party.name) private partyModel: Model<PartyDocument>,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    @Inject(forwardRef(() => AttendsService))
    private readonly attendsService: AttendsService,
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
  ) {}
  async create(userId: string, createPartyDto: CreatePartyDto) {
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

    const party = await this.partyModel.create({
      userId,
      title: createPartyDto.title,
      latitude: createPartyDto.latitude,
      longitude: createPartyDto.longitude,
      startDateTime: newStartTimeDate.toDate(),
      endDateTime: newEndTimeDate.toDate(),
      ticketPrice: createPartyDto.ticketPrice,
      numberOfGuests: createPartyDto.numberOfGuests,
      tags: createPartyDto.tags,
    });
    return this.formatPartyData(userId, party);
  }

  async formatPartyData(
    userId: string | undefined,
    party: Party & { _id: Types.ObjectId },
  ) {
    return {
      _id: party._id,
      userId: party.userId,
      title: party.title,
      latitude: party.latitude,
      longitude: party.longitude,
      startDateTime: party.startDateTime,
      endDateTime: party.endDateTime,
      ticketPrice: party.ticketPrice,
      numberOfGuests: party.numberOfGuests,
      tags: party.tags,
      isAttended: userId
        ? await this.attendsService.isAttended(userId, party._id.toString())
        : false,
      isFavorite: userId
        ? await this.favoritesService.isFavorite(userId, party._id.toString())
        : false,
      currentNumberOfGuests: await this.attendsService.getCurrentNumberOfGuests(
        party._id.toString(),
      ),
    };
  }

  async formatPartyListData(
    userId: string | undefined,
    parties: Array<Party & { _id: Types.ObjectId }>,
  ) {
    const partiesExtended = [];
    for (let i = 0; i < parties.length; i++) {
      const party = parties[i];
      const extendedParty = await this.formatPartyData(userId, party);
      partiesExtended.push(extendedParty);
    }
    return partiesExtended;
  }

  async findAllHosted(userId: string) {
    Logger.verbose(`This action returns all parties hosted by the user`);
    const parties = await this.partyModel
      .find({ userId: { $eq: userId } })
      .lean();

    return this.formatPartyListData(userId, parties);
  }

  async findAllFeeded(userId: string) {
    Logger.verbose(`This action returns all parties from feed`);
    const parties = await this.partyModel
      .find({ userId: { $ne: userId } })
      .lean();
    return this.formatPartyListData(userId, parties);
  }

  async attendParty(partyId: string, userId: string) {
    Logger.verbose(`This action toggles attend flag for single party`);

    const foundParty = await this.partyModel.findOne({ _id: partyId });
    if (!foundParty) throwError(PartyErrors.PARTY_NOT_FOUND);
    if (foundParty.userId.toString() === userId)
      throwError(PartyErrors.ATTEND_ACTION_FORBIDDEN);

    const foundAttend = await this.attendsService.findByPartyIdAndUserId(
      partyId,
      userId,
    );
    if (!foundAttend) {
      await this.attendsService.create({ partyId, userId });
      return `Party attend status is set to: ${true}`;
    }
    await this.attendsService.remove(foundAttend._id);
    return `Party attend status is set to: ${false}`;
  }
  async favoriteParty(partyId: string, userId: string) {
    Logger.verbose(`This action toggles favorite flag for single party`);

    const foundParty = await this.partyModel.findOne({ _id: partyId });
    if (!foundParty) throwError(PartyErrors.PARTY_NOT_FOUND);
    if (foundParty.userId.toString() === userId)
      throwError(PartyErrors.FAVORITE_ACTION_FORBIDDEN);

    const foundFavorite = await this.favoritesService.findByPartyIdAndUserId(
      partyId,
      userId,
    );
    if (!foundFavorite) {
      await this.favoritesService.create({ partyId, userId });
      return `Party favorite status is set to: ${true}`;
    } else {
      await this.favoritesService.remove(foundFavorite._id);
      return `Party favorite status is set to: ${false}`;
    }
  }
  async findAll() {
    Logger.verbose(`This action returns all parties`);
    const parties = await this.partyModel.find().lean();
    return this.formatPartyListData(undefined, parties);
  }

  async findOne(id: string) {
    Logger.verbose(`This action returns a #${id} party`);
    const party = await this.partyModel.findById(id).lean();
    if (!party) throwError(PartyErrors.PARTY_NOT_FOUND);
    return party;
  }

  async update(id: string, userId: string, updatePartyDto: UpdatePartyDto) {
    Logger.verbose(`This action updates a #${id} party`);
    const foundParty = this.partyModel.findOne({ userId });
    if (!foundParty) throwError(UserErrors.USER_HAS_NO_PERMISION);
    const updatedParty = await this.partyModel.findByIdAndUpdate(
      id,
      updatePartyDto,
      {
        new: true,
      },
    );
    return this.formatPartyData(userId, updatedParty);
  }

  async remove(id: string, userId: string) {
    Logger.verbose(`This action removes a #${id} party`);
    const foundParty = await this.partyModel.findOne({ userId, _id: id });
    if (!foundParty) throwError(UserErrors.USER_HAS_NO_PERMISION);
    const extendedPartyData = await this.formatPartyData(userId, foundParty);

    await this.attendsService.removeByAllByPartyId(id);
    await this.favoritesService.removeByAllByPartyId(id);

    await this.partyModel.findByIdAndRemove(id);

    return extendedPartyData;
  }

  async removeAllByUserId(userId: string) {
    Logger.verbose(`This action removes all parties by userId #${userId}`);
    await this.attendsService.removeByAllByUserId(userId);
    await this.favoritesService.removeByAllByUserId(userId);
    await this.partyModel.remove({ userId });
  }
}
