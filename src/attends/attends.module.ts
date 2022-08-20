import { forwardRef, Module } from '@nestjs/common';
import { AttendsService } from './attends.service';
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
  providers: [AttendsService],
  exports: [AttendsService],
})
export class AttendsModule {}
