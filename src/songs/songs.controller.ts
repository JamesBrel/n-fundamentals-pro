import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  Scope,
  UseGuards,
} from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ArtistJwtGuard } from '../auth/artists-jwt-guard.js';
import { Connection } from '../core/shared/constants/connection.js';
import { CreateSongDTO } from './dto/create-song-dto.js';
import { UpdateSongDto } from './dto/update-song-dto.js';
import { Song } from './song.entity.js';
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
  @UseGuards(ArtistJwtGuard)
  createOne(@Body() createSongDTO: CreateSongDTO, @Req() req) {
    console.log(req.user);

    return this.songsService.create(createSongDTO);
  }

  @Get('/find-all')
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe)
    page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe)
    limit = 10,
  ): Promise<Pagination<Song>> {
    limit = limit > 100 ? 100 : limit;
    return this.songsService.paginate({
      page,
      limit,
    });
  }
  // findAll() {
  //   try {
  //     return this.songsService.findAll();
  //   } catch (e) {
  //     throw new HttpException(
  //       'server error',
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //       { cause: e },
  //     );
  //   }
  // }

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
