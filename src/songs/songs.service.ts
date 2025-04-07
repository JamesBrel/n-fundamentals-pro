import { Injectable } from '@nestjs/common';

@Injectable()
export class SongsService {
  private readonly songs: any[] = [];

  /**
   * createOneSong
   * @description this method creates one song
   * @param {any} song
   * @return {any[]}
   */
  public createOneSong(song: any) {
    this.songs.push(song);
    return this.songs;
  }

  /**
   * findAll
   */
  public findAll(): any[] {
    return this.songs;
  }
}
