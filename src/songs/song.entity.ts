import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Artist } from '../artists/artist.entity.js';

@Entity('songs')
export class Song {
  // @PrimaryGeneratedColumn()
  // id: number;

  // @Column()
  // title: string;

  // // @Column('varchar', { array: true })
  // // artists: string[];

  // @Column('date')
  // releasedDate: Date;

  // @Column('time')
  // duration: Date;

  // @Column('text')
  // lyrics: string;

  // /**
  //  * Many songs can belong to many artists
  //  *
  //  */
  // @ManyToMany(() => Artist, (artist) => artist.songs, { cascade: true })
  // @JoinTable({ name: 'songs_artists' })
  // artists: Artist[];

  // /**
  //  * Many songs can belong to playlist for each unique user
  //  */
  // @ManyToOne(() => Playlist, (playList) => playList.songs)
  // playList: Playlist;

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  // @Column('varchar', { array: true })
  // artists: string[];

  @Column('date')
  releasedDate: Date;

  @Column('time')
  duration: Date;

  @Column('text')
  lyrics: string;

  @ManyToMany(() => Artist, (artist) => artist.songs, { cascade: true })
  @JoinTable({ name: 'songs_artists' })
  artists: Artist[];
}
