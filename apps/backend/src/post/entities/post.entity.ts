import { User } from 'src/user/entities/user.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  JoinTable,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'post' })
export class Post {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  caption: string;

  @Column()
  image: string;

  @ManyToOne(() => User, (user) => user.posts, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  author: User;

  @ManyToMany(() => User, (user) => user.likedPosts)
  @JoinTable()
  likes: User[];

  @ManyToMany(() => User, (user) => user.bookmarks)
  @JoinTable()
  bookmarkedBy: User[];

  @OneToMany(() => Comment, (comment) => comment.post, { cascade: true })
  comments: Comment[];
}
