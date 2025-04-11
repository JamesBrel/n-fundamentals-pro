import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from '../songs/song.entity.js';
import { User } from '../users/user.entity.js';
import { PlaylistController } from './playlist.controller.js';
import { Playlist } from './playlist.entity.js';
import { PlaylistService } from './playlist.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([Playlist, Song, User])],
  controllers: [PlaylistController],
  providers: [PlaylistService],
})
export class PlaylistModule {}
