import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { CreateSongDTO } from './dto/create-song-dto.js';
import { SongsService } from './songs.service';

@Controller('/api/songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Post('/create-many/')
  createMany() {
    return 'This action adds a list of new song';
  }

  @Post('/create-one/')
  createOne(@Body() createSongDTO: CreateSongDTO) {
    return this.songsService.createOneSong(createSongDTO);
  }

  @Get('/find-all/')
  findAll() {
    return this.songsService.findAll();
  }

  @Get('/find-one/:id')
  findOne() {
    return 'This action returns one song by id';
  }

  @Put('/update-one/:id')
  update() {
    return 'This action updates one song by id';
  }

  @Delete('/delete-all/')
  deleteAll() {
    return 'This action deletes all songs';
  }

  @Delete('/delete-one/:id')
  deleteOne() {
    return 'This action deletes one song by id';
  }
}
