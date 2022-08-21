import { forwardRef, Module } from '@nestjs/common';
import { PartiesService } from './parties.service';
import { PartiesController } from './parties.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Party, PartySchema } from './schemas/party.schema';
import { AttendsModule } from 'src/attends/attends.module';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Party.name, schema: PartySchema }]),
    forwardRef(() => UsersModule),
    forwardRef(() => AttendsModule),
    forwardRef(() => FavoritesModule),
  ],
  controllers: [PartiesController],
  providers: [PartiesService],
  exports: [PartiesService],
})
export class PartiesModule {}
