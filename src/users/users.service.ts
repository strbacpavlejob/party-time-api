import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { throwError } from 'src/common/error/domain';
import { UserErrors } from 'src/common/error/user.errors';
import { PartiesService } from 'src/parties/parties.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @Inject(forwardRef(() => PartiesService))
    private readonly partiesService: PartiesService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    Logger.verbose(`Creates one user: ${createUserDto.firstName}`);

    const saltOrRounds = 10;
    const passwordHash = await bcrypt.hash(
      createUserDto.password,
      saltOrRounds,
    );

    const user = await this.userModel.create({
      email: createUserDto.email,
      passwordHash,
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
    });
    return this.formatUserData(user);
  }
  async formatUserData(user: User & { _id: Types.ObjectId }) {
    return {
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };
  }

  async formatUserListData(users: Array<User & { _id: Types.ObjectId }>) {
    const usersExtended = [];
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      const formatedUser = await this.formatUserData(user);
      usersExtended.push(formatedUser);
    }
    return usersExtended;
  }

  async findAll() {
    Logger.verbose(`This action returns all users`);
    const users = await this.userModel.find().lean();
    return this.formatUserListData(users);
  }

  async findOneByEmail(email: string) {
    Logger.verbose(`This action returns a user with ${email}`);
    const user = await this.userModel.findOne({ email }).lean();
    return user;
  }

  async findOne(id: string) {
    Logger.verbose(`This action returns a #${id} user`);
    const user = await this.userModel.findById(id).lean();
    if (!user) throwError(UserErrors.USER_NOT_FOUND);
    return this.formatUserData(user);
  }

  async update(id: string, userId: string, updateUserDto: UpdateUserDto) {
    Logger.verbose(`This action updates a #${id} user`);
    if (id !== userId) throwError(UserErrors.USER_HAS_NO_PERMISION);

    let updateData: any = updateUserDto;

    if (!updateUserDto.password) {
      const saltOrRounds = 10;
      const passwordHash = await bcrypt.hash(
        updateUserDto?.password,
        saltOrRounds,
      );
      updateData = { ...updateUserDto, passwordHash };
    }

    const updatedUser = await this.userModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    return this.formatUserData(updatedUser);
  }

  async remove(id: string, userId: string) {
    Logger.verbose(`This action removes a #${id} user`);
    if (id !== userId) throwError(UserErrors.USER_HAS_NO_PERMISION);
    await this.partiesService.removeAllByUserId(userId);
    const deltedUser = await this.userModel.findByIdAndRemove(id);
    return this.formatUserData(deltedUser);
  }
}
