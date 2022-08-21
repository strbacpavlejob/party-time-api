import { Injectable, Logger } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { Favorite, FavoriteDocument } from './schemas/favorite.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectModel(Favorite.name) private favoriteModel: Model<FavoriteDocument>,
  ) {}
  async create(createFavoriteDto: CreateFavoriteDto) {
    Logger.verbose(
      `Creates one favorite for party: ${createFavoriteDto.partyId} by user: ${createFavoriteDto.userId}`,
    );
    return this.favoriteModel.create(createFavoriteDto);
  }

  async isFavorite(userId: string, partyId: string) {
    const foundFavorite = await this.favoriteModel.findOne({ userId, partyId });
    if (!foundFavorite) return false;
    return true;
  }

  async findAll() {
    Logger.verbose(`This action returns all favorites`);
    const favorites = await this.favoriteModel.find().lean();
    return favorites;
  }

  async findOne(id: number) {
    Logger.verbose(`This action returns a #${id} favorite`);
    const favorite = await this.favoriteModel.findById(id).lean();
    return favorite;
  }
  async findByPartyIdAndUserId(partyId: string, userId: string) {
    Logger.verbose(
      `This action returns a favorite by partyId: #${partyId} and userId: #${userId}`,
    );
    const favorite = await this.favoriteModel.findOne({ partyId, userId }).lean();
    return favorite;
  }

  async update(id: number, updateFavoriteDto: UpdateFavoriteDto) {
    Logger.verbose(`This action updates a #${id} favorite`);
    return this.favoriteModel.findByIdAndUpdate(id, updateFavoriteDto, {
      new: true,
    });
  }

  async remove(id: number) {
    Logger.verbose(`This action removes a #${id} favorite`);
    return this.favoriteModel.findByIdAndRemove(id);
  }

  async removeByAllByUserId(userId: string) {
    Logger.verbose(`This action removes favorites by userId #${userId}`);
    await this.favoriteModel.remove({ userId });
  }

  async removeByAllByPartyId(partyId: string) {
    Logger.verbose(`This action removes favorites by partyId #${partyId}`);
    await this.favoriteModel.remove({ partyId });
  }
}
