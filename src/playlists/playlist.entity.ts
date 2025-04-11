import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/user.entity.js';

@Entity('playlists')
export class Playlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  /**
   * Each Playlist will have multiple songs
   */
  // @OneToMany(() => Song, (song) => song.playList)
  // songs: Song[];

  /**
   * Many Playlist can belong to a single unique user
   */

  @ManyToOne(() => User, (user) => user.playLists)
  user: User | null;
}
