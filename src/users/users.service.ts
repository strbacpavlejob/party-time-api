import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { createCipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto) {
    Logger.verbose(`Creates one user: ${createUserDto.firstName}`);

    const iv = randomBytes(16);
    const password = process.env.PASSWORD_HASH_SECRET;

    const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
    const cipher = createCipheriv('aes-256-ctr', key, iv);

    const passwordHash = Buffer.concat([
      cipher.update(createUserDto.password),
      cipher.final(),
    ]);

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

  async findOne(id: number) {
    Logger.verbose(`This action returns a #${id} user`);
    const user = await this.userModel.findById(id).lean();
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    Logger.verbose(`This action updates a #${id} user`);
    return this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
  }

  async remove(id: number) {
    Logger.verbose(`This action removes a #${id} user`);
    return this.userModel.findByIdAndRemove(id);
  }
}
