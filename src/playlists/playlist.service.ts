import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Song } from '../songs/song.entity.js';
import { User } from '../users/user.entity.js';
import { CreatePlayListDto } from './dto/create-playlist-dto.js';
import { Playlist } from './playlist.entity.js';

@Injectable()
export class PlaylistService {
  constructor(
    @InjectRepository(Playlist)
    private playListRepo: Repository<Playlist>,

    @InjectRepository(Song)
    private songsRepo: Repository<Song>,

    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(playListDTO: CreatePlayListDto): Promise<Playlist> {
    const playList = new Playlist();
    playList.name = playListDTO.name;

    // songs will be the array of ids that we are getting from the DTO object
    const songs = await this.songsRepo.findByIds(playListDTO.songs);
    // set the relation for the songs with playlist entity
    // playList.songs = songs;

    // A user will be the id of the user we are getting from the request
    // when we implemented the user authentication this id will become the loggedIn user id
    // const user = await this.userRepo.findOneBy({ id: playListDTO.user });
    // playList.user = user;

    return this.playListRepo.save(playList);
  }
}
