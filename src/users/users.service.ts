import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto) {
    Logger.verbose(`Creates one user: ${createUserDto.firstName}`);

    const saltOrRounds = 10;
    const passwordHash = await bcrypt.hash(
      createUserDto.password,
      saltOrRounds,
    );

    return this.userModel.create({
      email: createUserDto.email,
      passwordHash,
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
    });
  }

  async findAll() {
    Logger.verbose(`This action returns all users`);
    const users = await this.userModel.find().lean();
    return users;
  }

  async findOneByEmail(email: string) {
    Logger.verbose(`This action returns a user with ${email}`);
    const user = await this.userModel.findOne({ email }).lean();
    return user;
  }

  async findOne(id: string) {
    Logger.verbose(`This action returns a #${id} user`);
    const user = await this.userModel.findById(id).lean();
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    Logger.verbose(`This action updates a #${id} user`);
    return this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
  }

  async remove(id: string) {
    Logger.verbose(`This action removes a #${id} user`);
    return this.userModel.findByIdAndRemove(id);
  }
}
