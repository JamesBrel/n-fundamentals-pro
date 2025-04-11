import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateSongDTO } from './dto/create-song-dto.js';
import { UpdateSongDto } from './dto/update-song-dto.js';
import { Song } from './song.entity.js';

@Injectable({
  scope: Scope.TRANSIENT,
})
export class SongsService {
  constructor(
    @InjectRepository(Song)
    private songsRepository: Repository<Song>,
  ) {}
  // private readonly songs: any[] = [];

  // /**
  //  * createOneSong
  //  * @description this method creates one song
  //  * @param {any} song
  //  * @return {any[]}
  //  */
  // public createOneSong(song: any) {
  //   this.songs.push(song);
  //   return this.songs;
  // }

  // /**
  //  * findAll
  //  */
  // public findAll(): any[] {
  //   // throw new Error('Error in Db while fetching data or record');
  //   return this.songs;
  // }

  create(songDTO: CreateSongDTO): Promise<Song> {
    const song = new Song();
    song.title = songDTO.title;
    song.artists = songDTO.artists;
    song.duration = songDTO.duration;
    song.lyrics = songDTO.lyrics;
    song.releasedDate = songDTO.releasedDate;

    return this.songsRepository.save(song);
  }

  findAll(): Promise<Song[]> {
    return this.songsRepository.find();
  }

  findOne(id: number): Promise<Song | null> {
    return this.songsRepository.findOneBy({ id });
  }

  remove(id: number): Promise<DeleteResult> {
    return this.songsRepository.delete(id);
  }

  update(id: number, recordToUpdate: UpdateSongDto): Promise<UpdateResult> {
    return this.songsRepository.update(id, recordToUpdate);
  }

  // async paginate(options: IPaginationOptions): Promise<Pagination<Song>> {
  //   const queryBuilder = this.songsRepository.createQueryBuilder('c');
  //   queryBuilder.orderBy('c.releasedDate', 'DESC');

  //   return paginate<Song>(queryBuilder, options);
  // }
}
