import { Body, Controller, Post } from '@nestjs/common';
import { CreatePlayListDto } from './dto/create-playlist-dto.js';
import { Playlist } from './playlist.entity.js';
import { PlaylistService } from './playlist.service.js';

@Controller('/api/playlists')
export class PlaylistController {
  constructor(private playListService: PlaylistService) {}

  @Post('/create-one')
  create(
    @Body()
    playlistDTO: CreatePlayListDto,
  ): Promise<Playlist> {
    return this.playListService.create(playlistDTO);
  }
}
