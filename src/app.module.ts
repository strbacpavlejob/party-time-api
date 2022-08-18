import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PartiesModule } from './parties/parties.module';
import { AttendsModule } from './attends/attends.module';
import { FavoritesModule } from './favorites/favorites.module';
import mongodbConfig from './shared/config/mongodb.config';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [mongodbConfig],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService): MongooseModuleOptions => ({
        uri: configService.get<string>('mongodb.uri'),
        dbName: configService.get<string>('mongodb.dbName'),
        // user: process.env.MONGO_USERNAME,
        // pass: process.env.MONGO_PASSWORD,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    PartiesModule,
    AttendsModule,
    FavoritesModule,
  ],
})
export class AppModule {}
