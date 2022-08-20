import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateAttendDto } from './dto/create-attend.dto';
import { UpdateAttendDto } from './dto/update-attend.dto';
import { Attend, AttendDocument } from './schemas/attend.schema';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { PartiesService } from 'src/parties/parties.service';

@Injectable()
export class AttendsService {
  constructor(
    @InjectModel(Attend.name) private attendModel: Model<AttendDocument>,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    @Inject(forwardRef(() => PartiesService))
    private readonly partiesService: PartiesService,
  ) {}

  async checkPartyAndUserId(partyId: string, userId: string): Promise<boolean> {
    const foundUser = await this.usersService.findOne(userId);
    const foundParty = await this.partiesService.findOne(partyId);
    if (!foundUser || !foundParty) {
      return false;
    }
    return true;
  }

  async create(
    createAttendDto: CreateAttendDto,
  ): Promise<Attend | HttpException> {
    Logger.verbose(
      `Creates one attend for party: ${createAttendDto.partyId} by user: ${createAttendDto.userId}`,
    );
    // if (
    //   this.checkPartyAndUserId(createAttendDto.partyId, createAttendDto.userId)
    // ) {
    //   throw new HttpException(
    //     `The partyId or userId doesn't exist`,
    //     HttpStatus.FORBIDDEN,
    //   );
    // }
    return this.attendModel.create(createAttendDto);
  }
  async findAll() {
    Logger.verbose(`This action returns all attends`);
    const attends = await this.attendModel.find().lean();
    return attends;
  }

  async findOne(id: string) {
    Logger.verbose(`This action returns an #${id} attend`);
    const attend = await this.attendModel.findById(id).lean();
    return attend;
  }

  async findByPartyIdAndUserId(partyId: string, userId: string) {
    Logger.verbose(
      `This action returns an attend by partyId: #${partyId} and userId: #${userId}`,
    );
    const attend = await this.attendModel.findOne({ partyId, userId }).lean();
    return attend;
  }

  async update(id: string, updateAttendDto: UpdateAttendDto) {
    Logger.verbose(`This action updates an #${id} attend`);
    return this.attendModel.findByIdAndUpdate(id, updateAttendDto, {
      new: true,
    });
  }

  async remove(id: string) {
    Logger.verbose(`This action removes an #${id} attend`);
    return this.attendModel.findByIdAndRemove(id);
  }
}
