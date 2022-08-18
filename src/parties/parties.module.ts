import { Module } from '@nestjs/common';
import { PartiesService } from './parties.service';
import { PartiesController } from './parties.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Party, PartySchema } from './schemas/party.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Party.name, schema: PartySchema }]),
  ],
  controllers: [PartiesController],
  providers: [PartiesService],
  exports: [PartiesService],
})
export class PartiesModule {}
