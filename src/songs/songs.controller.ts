import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Scope,
} from '@nestjs/common';
import { Connection } from '../core/shared/constants/connection.js';
import { CreateSongDTO } from './dto/create-song-dto.js';
import { UpdateSongDto } from './dto/update-song-dto.js';
import { SongsService } from './songs.service';

@Controller({
  path: '/api/songs',
  scope: Scope.REQUEST,
})
export class SongsController {
  constructor(
    private readonly songsService: SongsService,
    @Inject('CONNECTION') private connection: Connection,
  ) {
    console.log(`This is CONNECTION STRING: ${this.connection.DB}`);
  }

  @Post('/create-many')
  createMany() {
    return 'This action adds a list of new song';
  }

  @Post('/create-one')
  createOne(@Body() createSongDTO: CreateSongDTO) {
    return this.songsService.create(createSongDTO);
  }

  @Get('/find-all')
  findAll() {
    try {
      return this.songsService.findAll();
    } catch (e) {
      throw new HttpException(
        'server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: e },
      );
    }
  }

  @Get('/find-one/:id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.songsService.findOne(id);
    // `This action returns one song by id ${typeof id}`;
  }

  @Put('/update-one/:id')
  update(
    @Param('id', new ParseIntPipe())
    id: number,
    @Body() updateSongDto: UpdateSongDto,
  ) {
    return this.songsService.update(id, updateSongDto);
    // 'This action updates one song by id';
  }

  @Delete('/delete-all')
  deleteAll() {
    return 'This action deletes all songs';
  }

  @Delete('/delete-one/:id')
  deleteOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.songsService.remove(id);
    // 'This action deletes one song by id';
  }
}
