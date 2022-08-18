import { forwardRef, Module } from '@nestjs/common';
import { AttendsService } from './attends.service';
import { AttendsController } from './attends.controller';
import { Attend, AttendSchema } from './schemas/attend.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';
import { PartiesModule } from 'src/parties/parties.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Attend.name, schema: AttendSchema }]),
    forwardRef(() => UsersModule),
    forwardRef(() => PartiesModule),
  ],
  controllers: [AttendsController],
  providers: [AttendsService],
  exports: [AttendsService],
})
export class AttendsModule {}
