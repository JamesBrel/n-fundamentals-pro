import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { dataSourceOptions } from '../db/data-source.js';
import { ArtistsModule } from './artists/artists.module';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './core/shared/middlewares/logger/logger.middleware.js';
import { DevConfigService } from './core/shared/providers/devConfig.service.js';
import { PlaylistModule } from './playlists/playlist.module.js';
import { SongsController } from './songs/songs.controller.js';
import { SongsModule } from './songs/songs.module';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(
      dataSourceOptions,

      // {
      // type: 'postgres',
      // database: 'spotify-clone-3',
      // host: 'localhost',
      // port: 5432,
      // username: 'postgres',
      // password: 'root',
      // entities: [
      //   Song,
      //   Artist,
      //   User,
      //   // Playlist
      // ],
      // synchronize: true,
      // }
    ),
    SongsModule,
    PlaylistModule,
    AuthModule,
    UsersModule,
    ArtistsModule,
  ],
  controllers: [AppController, UsersController],
  providers: [
    AppService,
    {
      provide: DevConfigService,
      useClass: DevConfigService,
    },
  ],
})
export class AppModule implements NestModule {
  constructor(private dataSources: DataSource) {
    console.log('dbName', this.dataSources.options.database);
  }
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('*'); // optiosn 1
    // consumer.apply(LoggerMiddleware).forRoutes('/api/songs/find-all'); // optiosn 2
    // consumer
    //   .apply(LoggerMiddleware)
    //   .forRoutes({ path: '/api/songs/create-one', method: RequestMethod.POST }); //option 3

    consumer.apply(LoggerMiddleware).forRoutes(SongsController);
  }
}
