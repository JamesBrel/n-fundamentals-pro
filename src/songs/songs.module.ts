import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from '../artists/artist.entity.js';
import { connection } from '../core/shared/constants/connection.js';
import { Song } from './song.entity.js';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service.js';

const mockSongsService = {
  findAll() {
    return [
      {
        id: 1,
        title: 'lasting lover',
        artists: ['shawn mendes, camila cabello'],
        releaseDate: new Date(),
        duration: new Date(),
      },
    ];
  },
};
@Module({
  imports: [TypeOrmModule.forFeature([Song, Artist])],
  controllers: [SongsController],

  providers: [
    SongsService,
    // {
    //   provide: SongsService,
    //   useClass: SongsService,
    // },

    // {
    //   provide: SongsService,
    //   useValue: mockSongsService,
    // },
    {
      provide: 'CONNECTION',
      useValue: connection,
    },
  ],
})
export class SongsModule {}
